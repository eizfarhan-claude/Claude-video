"""Show what is said around an OUTPUT time (preview timestamp) with source times + clip boundaries.
usage: at.py v11 26 [61 ...]   (seconds or m.ss like 1.01 -> pass as 61)"""
import sys, json
vid = sys.argv[1]; e = json.load(open(f'src/videos/{vid}/edl.json')); fps = e['fps']
def src(t):
    for c in e['clips']:
        a = c['outFrom'] / fps; b = a + c['durationInFrames'] / fps
        if a <= t < b: return c['srcFrom'] / fps + t - a, c
    return None, None
for T in map(float, sys.argv[2:]):
    print(f'=== {vid} @ {T:.1f}s out')
    for c in e['clips']:
        a = c['outFrom'] / fps; b = a + c['durationInFrames'] / fps
        if a - 6 < T < b + 6:
            print(f'   clip [{c["section"]}] out {a:6.2f}-{b:6.2f}  src {c["srcFrom"]/fps:7.2f}-{(c["srcFrom"]+c["durationInFrames"])/fps:7.2f}')
    print('   ' + ' '.join(f'{w["text"]}@{w["start"]:.1f}/{src(w["start"])[0] or 0:.1f}' for w in e['words'] if T - 5 < w['start'] < T + 5))
