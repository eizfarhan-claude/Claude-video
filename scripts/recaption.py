"""Re-transcribe one window of the EDITED voice and replace the caption words inside it.
usage: recaption.py v7 105.5 120.5   (output seconds)"""
import sys, json, wave, re, pathlib, numpy as np
from faster_whisper import WhisperModel
vid, t0, t1 = sys.argv[1], float(sys.argv[2]), float(sys.argv[3])
edl = json.load(open(f'src/videos/{vid}/edl.json')); fps = edl['fps']
w = wave.open(f'public/{vid}/source/voice.wav'); sr = w.getframerate()
a = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768
parts, spans, t = [], [], 0.0
for c in edl['clips']:
    seg = a[int(c['srcFrom'] / fps * sr):int((c['srcFrom'] + c['durationInFrames']) / fps * sr)]
    parts.append(seg); spans.append((t, t + len(seg) / sr, c['section'])); t += len(seg) / sr
x = np.concatenate(parts)[::3]; R = 16000
m = WhisperModel('large-v3', device='cpu', compute_type='int8', cpu_threads=4)
pad = np.zeros(int(0.4 * R), np.float32)
segs, _ = m.transcribe(np.concatenate([pad, x[int(t0 * R):int(t1 * R)], pad]), language='ms', word_timestamps=True, beam_size=5,
                       condition_on_previous_text=False, temperature=[0.0, 0.2, 0.4], no_speech_threshold=0.9, log_prob_threshold=-3)
fix = {}
fp = pathlib.Path(f'data/{vid}/caption_fix.json')
if fp.exists(): fix = json.load(open(fp))
new = []
for s in segs:
    for wd in s.words:
        txt = wd.word.strip(); st = max(t0, wd.start - 0.4 + t0); en = max(st + 0.05, min(t1, wd.end - 0.4 + t0))
        if not txt: continue
        bare = re.sub(r'[.,?!]+$', '', txt); tail = txt[len(bare):]
        txt = fix.get(txt, fix[bare] + tail if bare in fix else txt)
        sec = next((sp[2] for sp in spans if sp[0] <= (st + en) / 2 < sp[1]), spans[-1][2])
        new.append({'text': txt, 'start': round(st, 3), 'end': round(en, 3), 'section': sec})
p = f'src/videos/{vid}/captions.json'
words = [wd for wd in json.load(open(p)) if not (t0 <= wd['start'] < t1)] + new
words.sort(key=lambda wd: wd['start'])
json.dump(words, open(p, 'w'), ensure_ascii=False, indent=0)
print(f'{vid} [{t0}-{t1}]: ' + ' '.join(wd['text'] for wd in new))
