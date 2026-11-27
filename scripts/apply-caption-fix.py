"""Re-apply data/<id>/caption_fix.json to an existing src/videos/<id>/captions.json (no re-transcription).
usage: apply-caption-fix.py v11 [v12 ...]"""
import sys, json, re, pathlib
for vid in sys.argv[1:]:
    words = json.load(open(f'src/videos/{vid}/captions.json'))
    fp = pathlib.Path(f'data/{vid}/caption_fix.json'); fix = json.load(open(fp)) if fp.exists() else {}
    for k, v in [(k, v) for k, v in fix.items() if ' ' in k]:
        ks, vs = k.lower().split(), v.split(); i = 0
        while i + len(ks) <= len(words):
            if [re.sub(r'[.,?!]+$', '', x['text']).lower() for x in words[i:i + len(ks)]] == [re.sub(r'[.,?!]+$', '', x) for x in ks]:
                tail = re.sub(r'^.*?([.,?!]*)$', r'\1', words[i + len(ks) - 1]['text']); end = words[i + len(ks) - 1]['end']
                grp = words[i:i + len(ks)]
                new = [dict(grp[min(j, len(grp) - 1)], text=t) for j, t in enumerate(vs)]
                new[-1]['end'] = end
                if not re.search(r'[.,?!]$', new[-1]['text']): new[-1]['text'] += tail
                words[i:i + len(ks)] = new; i += len(vs)
            else: i += 1
    for wd in words:
        key = wd['text']; bare = re.sub(r'[.,?!]+$', '', key); tail = key[len(bare):]
        if key in fix: wd['text'] = fix[key]
        elif bare in fix and ' ' not in fix[bare]: wd['text'] = fix[bare] + tail
    json.dump(words, open(f'src/videos/{vid}/captions.json', 'w'), ensure_ascii=False, indent=0)
    print(f'### {vid}: ' + ' '.join(w['text'] for w in words))
