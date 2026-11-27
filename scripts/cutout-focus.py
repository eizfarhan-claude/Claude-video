"""Generate every person cut-out the intro focus needs (all clips overlapping the focus window, not just the hook clip).
Reads `focus: {to: E('<section>') + <s>}` from src/videos/<id>/index.tsx and captions.json for timing.
usage: python3 scripts/cutout-focus.py v20 [v21 ...]"""
import json, os, re, subprocess, sys
for v in sys.argv[1:]:
    src = open(f'src/videos/{v}/index.tsx').read()
    m = re.search(r"focus: \{to: E\('([^']+)'\) \+ ([\d.]+)\}", src)
    if not m: print(v, 'no focus'); continue
    ws = json.load(open(f'src/videos/{v}/captions.json'))
    edl = json.load(open(f'src/videos/{v}/edl.json'))
    # the engine's E() reads the EDL words, captions may end earlier -> take the later of the two (+3 frames margin)
    end = max(max(w['end'] for w in ws if w['section'] == m.group(1)), max(w['end'] for w in edl['words'] if w['section'] == m.group(1)))
    fe = round((end + float(m.group(2))) * 30) + 3
    for c in edl['clips']:
        if c['outFrom'] >= fe: continue
        a = c['srcFrom']; b = a + min(c['durationInFrames'], fe - c['outFrom']) + 2
        miss = [f for f in range(a, b) if not os.path.exists(f'public/{v}/fg/{f}.webp')]
        if miss: subprocess.run(['python3', 'scripts/cutout.py', v, str(min(miss)), str(max(miss) + 1)], check=True)
    print(v, 'focus cut-outs complete')
