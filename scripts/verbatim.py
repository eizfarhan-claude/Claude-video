"""Verbatim look at the EDITED voice around reported times (owner's preview timestamps), keeping stutters/repeats.
Every word is printed with its output time and the source time it comes from, plus each cut position.
usage: python3 scripts/verbatim.py v15 18-22 28-32 ...   (output seconds; mm.ss like 1.01 is NOT accepted — use 61-64)"""
import sys, json, wave, numpy as np
from faster_whisper import WhisperModel
vid = sys.argv[1]
edl = json.load(open(f'src/videos/{vid}/edl.json')); fps = edl['fps']
w = wave.open(f'public/{vid}/source/voice.wav'); sr = w.getframerate()
a = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768
parts, spans, t = [], [], 0.0
for c in edl['clips']:
    s0 = c['srcFrom'] / fps; s1 = (c['srcFrom'] + c['durationInFrames']) / fps
    seg = a[int(s0 * sr):int(s1 * sr)]
    parts.append(seg); spans.append((t, t + len(seg) / sr, s0, c['section'])); t += len(seg) / sr
x = np.concatenate(parts)[::3]; R = 16000
def src(o):
    for t0, t1, s0, sec in spans:
        if t0 <= o < t1: return s0 + o - t0, sec
    return None, None
m = WhisperModel('large-v3', device='cpu', compute_type='int8', cpu_threads=4)
# a disfluent prompt nudges Whisper to keep repeats/false starts instead of cleaning them up
PROMPT = 'Saya, saya... eh, yang, yang pertama. Kita, kita boleh, boleh simpan. Ermm, jadi, jadi bagi anda.'
for spec in sys.argv[2:]:
    o0, o1 = map(float, spec.split('-'))
    pad = np.zeros(int(0.4 * R), np.float32)
    segs, _ = m.transcribe(np.concatenate([pad, x[int(o0 * R):int(o1 * R)], pad]), language='ms', word_timestamps=True, beam_size=5,
                           condition_on_previous_text=False, initial_prompt=PROMPT, temperature=[0.0, 0.2], no_speech_threshold=0.9, log_prob_threshold=-3)
    print(f'== {vid} out {o0}-{o1}')
    cuts = [round(s[0], 2) for s in spans if o0 < s[0] < o1]
    print('   cuts at out:', cuts)
    for s in segs:
        for wd in s.words:
            o = o0 + wd.start - 0.4; sv, sec = src(o)
            print(f'   {wd.word.strip():<16} out {o:6.2f}  src {sv if sv is None else round(sv, 2)}  [{sec}]')
