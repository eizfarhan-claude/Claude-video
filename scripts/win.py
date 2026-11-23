"""Verbatim transcription of SOURCE windows (check what a range really contains). usage: win.py v20 12.3-14.0 [..]"""
import sys, wave, numpy as np
from faster_whisper import WhisperModel
m = WhisperModel('large-v3', device='cpu', compute_type='int8', cpu_threads=4)
vid=sys.argv[1]; w=wave.open(f'public/{vid}/source/voice.wav'); sr=w.getframerate()
a=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(np.float32)/32768
for spec in sys.argv[2:]:
    t0,t1=map(float,spec.split('-')); x=a[int(t0*sr):int(t1*sr)][::3]; pad=np.zeros(6400,np.float32)
    segs,_=m.transcribe(np.concatenate([pad,x,pad]),language='ms',word_timestamps=True,beam_size=5,condition_on_previous_text=False,temperature=[0,0.2,0.4],no_speech_threshold=0.9,log_prob_threshold=-3)
    print(vid,spec,' '.join(f"{wd.word.strip()}@{t0+wd.start-0.4:.2f}" for s in segs for wd in s.words),flush=True)
