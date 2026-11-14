"""Verify every at('section','word',n) / S()/E() anchor in src/videos/<id>/index.tsx exists in its edl.json.
usage: check-anchors.py v11 [v12 ...]"""
import sys, json, re
for vid in sys.argv[1:]:
    src = open(f'src/videos/{vid}/index.tsx').read()
    words = json.load(open(f'src/videos/{vid}/edl.json'))['words']
    norm = lambda t: re.sub(r'[.,?!]+$', '', t).lower()
    bad = []
    for sec, w, n in re.findall(r"\bat\('([^']+)',\s*'([^']+)'(?:,\s*(\d+))?\)", src):
        hits = [x for x in words if x['section'] == sec and norm(x['text']) == w.lower()]
        if len(hits) <= int(n or 0): bad.append(f"at('{sec}','{w}',{n or 0}) hits={len(hits)}")
    secs = {x['section'] for x in words}
    for f, sec in re.findall(r"\b([SE])\('([^']+)'\)", src):
        if sec not in secs: bad.append(f"{f}('{sec}') missing")
    print(vid, 'OK' if not bad else 'BAD: ' + '; '.join(bad))
