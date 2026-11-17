"""20 ms energy (dB) of the source voice — find exact word edges/dips. usage: energy20.py v20 21.0:22.0 [..]"""
import sys,wave,numpy as np
vid=sys.argv[1]; w=wave.open(f'public/{vid}/source/voice.wav'); sr=w.getframerate()
a=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(np.float32)/32768
for spec in sys.argv[2:]:
    t0,t1=map(float,spec.split(':'))
    vals=[]
    t=t0
    while t<t1-1e-6:
        seg=a[int(t*sr):int((t+0.02)*sr)]; vals.append(int(20*np.log10(np.sqrt(np.mean(seg**2))+1e-9))); t+=0.02
    print(f'{vid} {t0:.2f}:', ' '.join(f'{v}' for v in vals))
