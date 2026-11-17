"""Whole-video verbatim QA of the EDITED voice: flags repeated words/phrases (stutters, retakes) and prints the
text around every cut so clipped words are easy to spot. usage: python3 scripts/qa-stutter.py v15 [v16 ...]"""
import sys, json, wave, re, numpy as np
from faster_whisper import WhisperModel
m = WhisperModel('large-v3', device='cpu', compute_type='int8', cpu_threads=4)
PROMPT = 'Saya, saya... eh, yang, yang pertama. Kita, kita boleh, boleh simpan. Ermm, jadi, jadi bagi anda.'
norm = lambda t: re.sub(r'[^\w]', '', t.lower())
for vid in sys.argv[1:]:
    edl = json.load(open(f'src/videos/{vid}/edl.json')); fps = edl['fps']
    w = wave.open(f'public/{vid}/source/voice.wav'); sr = w.getframerate()
    a = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768
    parts, cuts, t = [], [], 0.0
    for c in edl['clips']:
        seg = a[int(c['srcFrom'] / fps * sr):int((c['srcFrom'] + c['durationInFrames']) / fps * sr)]
        parts.append(seg); t += len(seg) / sr; cuts.append(t)
    x = np.concatenate(parts)[::3]; R = 16000; dur = len(x) / R
    e = np.array([np.sqrt(np.mean(x[i:i + 320] ** 2)) for i in range(0, len(x) - 320, 320)])
    bounds, cur = [0.0], 0.0
    while cur + 9 < dur:
        lo, hi = int((cur + 5) / 0.02), int(min(dur - 0.5, cur + 9) / 0.02)
        cur = (lo + int(np.argmin(e[lo:hi]))) * 0.02; bounds.append(cur)
    bounds.append(dur)
    words = []; pad = np.zeros(int(0.4 * R), np.float32)
    for t0, t1 in zip(bounds, bounds[1:]):
        segs, _ = m.transcribe(np.concatenate([pad, x[int(t0 * R):int(t1 * R)], pad]), language='ms', word_timestamps=True, beam_size=5,
                               condition_on_previous_text=False, initial_prompt=PROMPT, temperature=[0.0, 0.2], no_speech_threshold=0.9, log_prob_threshold=-3)
        words += [(t0 + wd.start - 0.4, wd.word.strip()) for s in segs for wd in s.words]
    print(f'##### {vid} ({dur:.1f}s)')
    print(' '.join(f'{w}' for _, w in words))
    flags = []
    for n in (1, 2, 3):   # repeated n-grams back to back
        for i in range(len(words) - 2 * n + 1):
            A = [norm(w) for _, w in words[i:i + n]]; B = [norm(w) for _, w in words[i + n:i + 2 * n]]
            if A == B and all(A) and not (n == 1 and A[0] in ('ada', 'yang', 'kita', 'dan')):
                flags.append(f'  REPEAT @{words[i][0]:.2f}: ' + ' '.join(w for _, w in words[i:i + 2 * n]))
    print('\n'.join(sorted(set(flags))) or '  no repeats')
    for c in cuts[:-1]:
        near = ' '.join(w for t, w in words if c - 1.2 < t < c + 1.0)
        print(f'  cut @{c:6.2f}: {near}')
