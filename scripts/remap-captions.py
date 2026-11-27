"""After an EDL change, move existing captions onto the new timeline via source time (keeps hand-fixed text).
Words whose source time is no longer in any clip are dropped. usage: remap-captions.py v11 <old_edl.json>"""
import sys, json
vid, old_path = sys.argv[1], sys.argv[2]
old = json.load(open(old_path)); new = json.load(open(f'src/videos/{vid}/edl.json')); fps = new['fps']
def to_src(t):
    for c in old['clips']:
        a = c['outFrom'] / fps; b = a + c['durationInFrames'] / fps
        if a <= t < b + 1e-6: return c['srcFrom'] / fps + (t - a)
def to_out(s):
    for c in new['clips']:
        a = c['srcFrom'] / fps; b = a + c['durationInFrames'] / fps
        if a - 1e-6 <= s < b: return c['outFrom'] / fps + (s - a), c['section']
cap = json.load(open(f'src/videos/{vid}/captions.json')); out = []
for w in cap:
    mid = to_src((w['start'] + w['end']) / 2)
    if mid is None or to_out(mid) is None: print('drop', w['text'], w['start']); continue
    s0, e0 = to_src(w['start']), to_src(w['end'] - 1e-3)
    ns = to_out(s0) if s0 is not None and to_out(s0) else to_out(mid)
    ne = to_out(e0) if e0 is not None and to_out(e0) else to_out(mid)
    out.append(dict(w, start=round(ns[0], 3), end=round(max(ne[0], ns[0] + 0.05), 3), section=to_out(mid)[1]))
json.dump(out, open(f'src/videos/{vid}/captions.json', 'w'), ensure_ascii=False, indent=0)
print(vid, ' '.join(w['text'] for w in out))
