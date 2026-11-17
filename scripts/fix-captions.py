"""Post-fix captions.json in place: merge/split/replace words by exact text sequence.
usage: fix-captions.py v11   (rules in data/<id>/caption_post.json: [[["old","words"],["new","words"]], ...])"""
import sys, json
vid = sys.argv[1]; p = f'src/videos/{vid}/captions.json'
W = json.load(open(p)); rules = json.load(open(f'data/{vid}/caption_post.json'))
for old, new in rules:
    i = 0
    while i + len(old) <= len(W):
        if [w['text'] for w in W[i:i + len(old)]] == old:
            grp = W[i:i + len(old)]; s, e = grp[0]['start'], grp[-1]['end']; n = max(1, len(new)); step = (e - s) / n
            W[i:i + len(old)] = [dict(grp[0], text=t, start=round(s + k * step, 3), end=round(s + (k + 1) * step, 3)) for k, t in enumerate(new)]
            if new: W[i + len(new) - 1]['end'] = e
            i += len(new)
        else: i += 1
json.dump(W, open(p, 'w'), ensure_ascii=False, indent=0)
print(' '.join(w['text'] for w in W))
