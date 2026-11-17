"""Audition a candidate join before editing the config: concatenates source ranges (as the EDL would) and transcribes
the result verbatim. usage: python3 scripts/join-test.py v18 "109.3-110.14+110.71-111.6" "109.3-110.24+111.3-112.0" ..."""
import sys, wave, numpy as np
from faster_whisper import WhisperModel
vid = sys.argv[1]
w = wave.open(f'public/{vid}/source/voice.wav'); sr = w.getframerate()
a = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768
m = WhisperModel('large-v3', device='cpu', compute_type='int8', cpu_threads=4)
PROMPT = 'Saya, saya... eh, yang, yang pertama. Kita, kita boleh, boleh simpan.'
for opt in sys.argv[2:]:
    parts = []
    for r in opt.split('+'):
        s0, s1 = map(float, r.split('-')); seg = a[int(s0 * sr):int(s1 * sr)].copy()
        f = int(sr * 0.004); seg[:f] *= np.linspace(0, 1, f); seg[-f:] *= np.linspace(1, 0, f); parts.append(seg)
    x = np.concatenate(parts)[::3]; pad = np.zeros(6400, np.float32)
    segs, _ = m.transcribe(np.concatenate([pad, x, pad]), language='ms', beam_size=5, condition_on_previous_text=False,
                           initial_prompt=PROMPT, temperature=[0.0, 0.2])
    print(f'{vid} [{opt}] ->', ' '.join(s.text.strip() for s in segs), flush=True)
