"""Rebuild the edited VOICE track straight from the EDL and verbatim-transcribe ±2s around every jump cut,
so clipped onsets/endings and leftover repeats are easy to spot. usage: check-joins.py v2 [v3 ...]"""
import sys, json, wave, numpy as np
from faster_whisper import WhisperModel
m = WhisperModel('large-v3', device='cpu', compute_type='int8', cpu_threads=4)
for vid in sys.argv[1:]:
    edl = json.load(open(f'src/videos/{vid}/edl.json')); fps = edl['fps']
    w = wave.open(f'public/{vid}/source/voice.wav'); sr = w.getframerate()
    a = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768
    parts, joins, t = [], [], 0.0
    for c in edl['clips']:
        seg = a[int(c['srcFrom'] / fps * sr):int((c['srcFrom'] + c['durationInFrames']) / fps * sr)].copy()
        f = int(2 / fps * sr); seg[:f] *= np.linspace(0, 1, f); seg[-f:] *= np.linspace(1, 0, f)
        parts.append(seg); t += len(seg) / sr; joins.append((t, c['section']))
    out = np.concatenate(parts)[::3]  # 48k -> 16k
    pad = np.zeros(8000, np.float32)
    print(f'##### {vid}: {len(out)/16000:.1f}s, {len(joins)-1} cuts', flush=True)
    for jt, sec in joins[:-1] + [joins[-1]]:
        t0, t1 = max(0, jt - 2.2), min(len(out) / 16000, jt + 1.8)
        x = np.concatenate([pad, out[int(t0 * 16000):int(t1 * 16000)], pad])
        segs, _ = m.transcribe(x, language='ms', beam_size=5, condition_on_previous_text=False,
                               initial_prompt=None, temperature=[0.0, 0.2, 0.4], no_speech_threshold=0.9, log_prob_threshold=-3)
        txt = ' '.join(s.text.strip() for s in segs)
        print(f'  cut @{jt:6.2f}s [{sec}]  …{txt}', flush=True)
