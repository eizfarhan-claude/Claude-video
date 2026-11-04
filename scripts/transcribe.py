"""Word-level Whisper large-v3 transcript of public/<id>/source/voice.wav -> data/<id>/transcript.json
Transcribed in ~6-12 s chunks split at the quietest point (whole-file decoding hallucinates on some takes).
usage: python3 scripts/transcribe.py v5 [v6 ...]"""
import sys, json, wave, numpy as np
from faster_whisper import WhisperModel
m = WhisperModel('large-v3', device='cpu', compute_type='int8', cpu_threads=4)
R = 16000
for vid in sys.argv[1:]:
    w = wave.open(f'public/{vid}/source/voice.wav')  # 48 kHz mono -> 16 kHz
    a = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32)[::3] / 32768
    dur = len(a) / R
    e = np.array([np.sqrt(np.mean(a[i:i + 320] ** 2)) for i in range(0, len(a) - 320, 320)])
    bounds, cur = [0.0], 0.0
    while cur + 12 < dur:
        lo, hi = int((cur + 6) / 0.02), int(min(dur - 0.5, cur + 12) / 0.02)
        cur = (lo + int(np.argmin(e[lo:hi]))) * 0.02; bounds.append(cur)
    bounds.append(dur)
    pad = np.zeros(int(0.3 * R), np.float32); out = []
    for t0, t1 in zip(bounds, bounds[1:]):
        segs, _ = m.transcribe(np.concatenate([pad, a[int(t0 * R):int(t1 * R)], pad]), language='ms', word_timestamps=True,
                               beam_size=5, condition_on_previous_text=False, temperature=[0.0, 0.2, 0.4],
                               no_speech_threshold=0.9, log_prob_threshold=-3)
        for s in segs:
            ws = [{'w': x.word, 's': round(max(t0, t0 + x.start - 0.3), 2), 'e': round(min(t1, t0 + x.end - 0.3), 2), 'p': x.probability} for x in s.words]
            ws = [x for x in ws if x['e'] > x['s'] - 0.01]
            if not ws: continue
            out.append({'start': ws[0]['s'], 'end': ws[-1]['e'], 'text': s.text, 'words': ws})
            print(f"[{ws[0]['s']:6.2f}-{ws[-1]['e']:6.2f}] {s.text}", flush=True)
    json.dump(out, open(f'data/{vid}/transcript.json', 'w'), ensure_ascii=False, indent=1)
    print(f'### {vid} done', flush=True)
