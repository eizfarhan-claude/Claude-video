"""Print an energy map (dB per 40ms) of public/<id>/source/voice.wav. usage: energy.py v2 25.3:30.0 [...]
Each row = 1s; '#' speech (>-35dB), '+' soft (-35..-50), '.' silence."""
import sys, wave, numpy as np
vid = sys.argv[1]
w = wave.open(f'public/{vid}/source/voice.wav'); sr = w.getframerate()
a = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768
for spec in sys.argv[2:]:
    t0, t1 = map(float, spec.split(':'))
    print(f'== {vid} {spec}')
    t = t0
    while t < t1:
        row = ''
        for k in range(25):
            s = t + k * 0.04
            seg = a[int(s * sr):int((s + 0.04) * sr)]
            db = 20 * np.log10(np.sqrt(np.mean(seg ** 2)) + 1e-9) if len(seg) else -99
            row += '#' if db > -35 else '+' if db > -50 else '.'
        print(f'{t:7.2f} {row}')
        t += 1.0
