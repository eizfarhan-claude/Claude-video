"""dB per 20ms between t0 and t1. usage: fine.py v11 76.3 77.4"""
import sys, wave, numpy as np
w = wave.open(f'public/{sys.argv[1]}/source/voice.wav'); sr = w.getframerate()
a = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768
t, t1 = float(sys.argv[2]), float(sys.argv[3]); out = []
while t < t1:
    s = a[int(t * sr):int((t + 0.02) * sr)]; out.append(f'{t:.2f}:{20*np.log10(np.sqrt(np.mean(s**2))+1e-9):.0f}'); t += 0.02
print(' '.join(out))
