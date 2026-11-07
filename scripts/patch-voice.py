"""Replace words in a voice track with audio taken from elsewhere in the same take.
config "voice_patch": [{"dst": [a, b], "src": [c, d]}]  (source seconds): a..b is muted and the
c..d audio is placed at a (10 ms crossfades). Reads voice_orig.wav (made once from voice.wav), writes voice.wav.
usage: patch-voice.py v9"""
import sys, json, wave, shutil, pathlib, numpy as np
vid = sys.argv[1]; d = pathlib.Path(f'public/{vid}/source')
if not (d / 'voice_orig.wav').exists(): shutil.copy(d / 'voice.wav', d / 'voice_orig.wav')
w = wave.open(str(d / 'voice_orig.wav')); sr = w.getframerate(); p = w.getparams()
a = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32)
out = a.copy(); f = int(0.01 * sr)
for pt in json.load(open(f'data/{vid}/config.json')).get('voice_patch', []):
    (x0, x1), (s0, s1) = pt['dst'], pt['src']
    i0, i1, j0, j1 = int(x0 * sr), int(x1 * sr), int(s0 * sr), int(s1 * sr)
    seg = a[j0:j1].copy(); seg[:f] *= np.linspace(0, 1, f); seg[-f:] *= np.linspace(1, 0, f)
    out[i0 - f:i0] *= np.linspace(1, 0, f); out[i1:i1 + f] *= np.linspace(0, 1, f)
    out[i0:i1] = 0; n = min(len(seg), i1 - i0); out[i0:i0 + n] = seg[:n]
    print(f'{vid}: {x0}-{x1} <- {s0}-{s1}')
o = wave.open(str(d / 'voice.wav'), 'wb'); o.setparams(p); o.writeframes(np.clip(out, -32768, 32767).astype(np.int16).tobytes())
