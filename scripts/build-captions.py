"""Subtitles from the EDITED voice track (so text matches exactly what is heard).
Rebuilds the voice from the EDL, transcribes it in silence-aligned chunks, applies data/<id>/caption_fix.json
({"wrong": "right"}), writes src/videos/<id>/captions.json. usage: build-captions.py v2 [v3 ...]"""
import sys, json, wave, re, pathlib, numpy as np
from faster_whisper import WhisperModel
m = WhisperModel('large-v3', device='cpu', compute_type='int8', cpu_threads=4)
for vid in sys.argv[1:]:
    edl = json.load(open(f'src/videos/{vid}/edl.json')); fps = edl['fps']
    w = wave.open(f'public/{vid}/source/voice.wav'); sr = w.getframerate()
    a = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768
    parts, spans, t = [], [], 0.0
    for c in edl['clips']:
        seg = a[int(c['srcFrom'] / fps * sr):int((c['srcFrom'] + c['durationInFrames']) / fps * sr)]
        parts.append(seg); spans.append((t, t + len(seg) / sr, c['section'])); t += len(seg) / sr
    x = np.concatenate(parts)[::3]; R = 16000; dur = len(x) / R
    # chunk boundaries at quiet points every ~10s
    e = np.array([np.sqrt(np.mean(x[i:i + 320] ** 2)) for i in range(0, len(x) - 320, 320)])  # 20ms
    bounds, cur = [0.0], 0.0
    while cur + 10 < dur:
        lo, hi = int((cur + 6) / 0.02), int(min(dur - 0.5, cur + 14) / 0.02)
        k = lo + int(np.argmin(e[lo:hi])); cur = k * 0.02; bounds.append(cur)
    bounds.append(dur)
    fix = {}
    fp = pathlib.Path(f'data/{vid}/caption_fix.json')
    if fp.exists(): fix = json.load(open(fp))
    pad = np.zeros(int(0.4 * R), np.float32); words = []
    for t0, t1 in zip(bounds, bounds[1:]):
        segs, _ = m.transcribe(np.concatenate([pad, x[int(t0 * R):int(t1 * R)], pad]), language='ms', word_timestamps=True,
                               beam_size=5, condition_on_previous_text=False,
                               initial_prompt='Simpanan emas, akaun GAP Public Gold, 5 dinar emas, 21.25 gram, RM100.')
        for s in segs:
            for wd in s.words:
                txt = wd.word.strip(); st = wd.start - 0.4 + t0; en = wd.end - 0.4 + t0
                if not txt or st < t0 - 0.2 or st > t1: continue
                if words and txt[:1] in '.,-' and len(txt) > 1 and txt[1].isdigit():
                    words[-1]['text'] += txt; words[-1]['end'] = round(en, 3); continue
                sec = next((sp[2] for sp in spans if sp[0] <= (st + en) / 2 < sp[1]), spans[-1][2])
                words.append({'text': txt, 'start': round(max(0, st), 3), 'end': round(en, 3), 'section': sec})
    for wd in words:
        key = wd['text']; bare = re.sub(r'[.,?!]+$', '', key); tail = key[len(bare):]
        if key in fix: wd['text'] = fix[key]
        elif bare in fix: wd['text'] = fix[bare] + tail
    json.dump(words, open(f'src/videos/{vid}/captions.json', 'w'), ensure_ascii=False, indent=0)
    print(f'### {vid}: ' + ' '.join(w['text'] for w in words), flush=True)
