"""Check every at(section, word) anchor in src/videos/<id>/index.tsx exists in captions.json. usage: check-anchors.py v20 [..]"""
import re,json,sys
for v in sys.argv[1:]:
    src=open(f'src/videos/{v}/index.tsx').read(); ws=json.load(open(f'src/videos/{v}/captions.json'))
    norm=lambda t: re.sub(r'[.,?!]+$','',t.lower())
    for sec,t,n in re.findall(r"at\('([^']+)', '([^']+)'(?:, (\d))?\)",src):
        hits=[w for w in ws if w['section']==sec and norm(w['text'])==t.lower()]
        if len(hits)<=int(n or 0): print(v,'MISSING',sec,t,n, '| section words:',' '.join(w['text'] for w in ws if w['section']==sec)[:200])
    for sec in re.findall(r"S\('([^']+)'\)|E\('([^']+)'\)",src):
        s=[x for x in sec if x][0]
        if not any(w['section']==s for w in ws): print(v,'NO SECTION',s)
