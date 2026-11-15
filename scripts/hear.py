"""Verbatim word-timed transcript of the EDITED voice between output times. usage: hear.py v13 28 42 [60 70 ...]"""
import sys, json, wave, numpy as np
from faster_whisper import WhisperModel
m = WhisperModel('large-v3', device='cpu', compute_type='int8', cpu_threads=4)
vid = sys.argv[1]; e = json.load(open(f'src/videos/{vid}/edl.json')); fps = e['fps']
w = wave.open(f'public/{vid}/source/voice.wav'); sr = w.getframerate()
a = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768
x = np.concatenate([a[int(c['srcFrom'] / fps * sr):int((c['srcFrom'] + c['durationInFrames']) / fps * sr)] for c in e['clips']])[::3]
cuts = [c['outFrom'] / fps for c in e['clips']]
args = list(map(float, sys.argv[2:]))
for t0, t1 in zip(args[::2], args[1::2]):
    pad = np.zeros(8000, np.float32)
    segs, _ = m.transcribe(np.concatenate([pad, x[int(t0 * 16000):int(t1 * 16000)], pad]), language='ms', word_timestamps=True,
                           beam_size=5, condition_on_previous_text=False, temperature=[0.0, 0.2])
    ws = [f"{wd.word.strip()}@{t0 + wd.start - 0.5:.2f}" for s in segs for wd in s.words]
    print(f'== {vid} {t0}-{t1}  cuts: ' + ' '.join(f'{c:.2f}' for c in cuts if t0 <= c <= t1))
    print('   ' + ' '.join(ws), flush=True)
