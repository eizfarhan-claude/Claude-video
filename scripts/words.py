"""Print the raw word timeline of data/<id>/transcript.json with gaps (planning cuts). usage: words.py v20"""
import json,sys
vid=sys.argv[1]
ws=[w for s in json.load(open(f'data/{vid}/transcript.json')) for w in s['words']]
line=[];prev=None
for w in ws:
    if prev is not None and w['s']-prev>0.35: print(' '.join(line)); line=[f'   <{w["s"]-prev:.2f}>']
    line.append(f"{w['w'].strip()}@{w['s']:.2f}")
    prev=w['e']
    if len(line)>9: print(' '.join(line)); line=[]
print(' '.join(line))
