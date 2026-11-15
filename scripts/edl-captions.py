"""Captions straight from the EDL's re-timed words (config fixes/drops already applied).
Optional data/<id>/caption_fix.json {"wrong": "right"} on top. usage: edl-captions.py v12 [v13 ...]"""
import sys, json, re, pathlib
for vid in sys.argv[1:]:
    words = json.load(open(f'src/videos/{vid}/edl.json'))['words']
    fp = pathlib.Path(f'data/{vid}/caption_fix.json'); fix = json.load(open(fp)) if fp.exists() else {}
    for w in words:
        bare = re.sub(r'[.,?!]+$', '', w['text']); tail = w['text'][len(bare):]
        if bare in fix: w['text'] = fix[bare] + tail
        if w['text'] == '%': w['text'] = 'peratus'
    words = [w for w in words if w['text']]
    # straddling retake words: same word twice within 0.5s -> keep the later one
    norm = lambda t: re.sub(r'[.,?!%]+$', '', t).lower()
    words = [w for i, w in enumerate(words) if not (i + 1 < len(words) and norm(w['text']) == norm(words[i + 1]['text']) and words[i + 1]['start'] - w['start'] < 0.5)]
    json.dump(words, open(f'src/videos/{vid}/captions.json', 'w'), ensure_ascii=False, indent=0)
    print(vid, ' '.join(w['text'] for w in words))
