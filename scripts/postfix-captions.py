"""Exact word-sequence fixes on src/videos/<id>/captions.json, from data/<id>/caption_post.json:
[{"find": ["Grand", "Emas."], "replace": [], "nth": 0}, ...]   (nth omitted = every occurrence; match is exact text)
Run after build-captions.py / recaption.py. usage: postfix-captions.py v17 [v19 ...]"""
import sys, json, pathlib
for vid in sys.argv[1:]:
    fp = pathlib.Path(f'data/{vid}/caption_post.json')
    if not fp.exists(): continue
    p = f'src/videos/{vid}/captions.json'; ws = json.load(open(p))
    for op in json.load(open(fp)):
        f, r, nth = op['find'], op['replace'], op.get('nth'); k = 0; i = 0
        while i + len(f) <= len(ws):
            if [w['text'] for w in ws[i:i + len(f)]] == f:
                if nth is None or k == nth:
                    grp = ws[i:i + len(f)]; s, e = grp[0]['start'], grp[-1]['end']; n = max(1, len(r))
                    new = [dict(grp[0], text=t, start=round(s + (e - s) * j / n, 3), end=round(s + (e - s) * (j + 1) / n, 3)) for j, t in enumerate(r)]
                    ws[i:i + len(f)] = new; i += len(new); k += 1; continue
                k += 1
            i += 1
    json.dump(ws, open(p, 'w'), ensure_ascii=False, indent=0)
    print(vid, 'post-fixed')
