"""Builds src/edl.json: which source ranges to keep (in what order), with long pauses
squeezed out, plus every spoken word re-timed onto the output timeline (for captions)."""
import json, pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
FPS = 30
# Story order (source seconds). Hook first = strongest line.
RANGES = [
    ("hook",     20.90, 26.98),  # 2 tahun lepas ... RM8,000. Hari ni dah RM11,700.
    ("question",  2.20,  5.58),  # Anda tahu tak ... berapa gram?
    ("weight",    9.30, 13.30),  # 5 dinar emas ni beratnya adalah 21.25 gram  (false start removed)
    ("body",     27.12, 79.85),  # cash & carry -> akaun GAP -> bajet besar/kecil
    # 81-100 & 103-112: repeated takes of the savings-target line -> dropped
    ("target",  113.98, 131.74), # best take of the savings-target line
    ("cta",     131.74, 146.97), # CTA  (outtake "Dapat sesuatu?" dropped)
]
# Stumbles / repeated words removed inside a range (source seconds)
CUTS = [
    (53.88, 54.96),  # "dia akan auto…" (repeated) -> keep "dia akan auto rekod"
    (67.78, 69.06),  # "Jadi ikut… jadi tengok" -> keep "Jadi tengok"
]
MAX_GAP, KEEP_PAD = 0.30, 0.10   # pauses longer than this get squeezed to 2*KEEP_PAD
FIX = {"serdah": "serendah", "betul.": "bentuk", "kek": "GAP", "RM11,000,": "RM11,000", "RM12,000,": "RM12,000"}
DROP = {(56.48, "Untuk")}       # stumble: "dalam betul. Untuk gram emas" -> "dalam bentuk gram emas"

sil = [tuple(map(float, l.split())) for l in open(ROOT/"data/silences.txt") if l.strip()]
clips = []
for name, a, b in RANGES:
    cur = a
    removed = [(s + KEEP_PAD, e - KEEP_PAD) for s, e in sil if s > a and e < b and e - s > MAX_GAP]
    removed += [(s, e) for s, e in CUTS if s > a and e < b]
    merged = []
    for s, e in sorted(removed):
        if merged and s <= merged[-1][1]: merged[-1] = (merged[-1][0], max(merged[-1][1], e))
        else: merged.append((s, e))
    for s, e in merged:
        clips.append((name, cur, s)); cur = e
    clips.append((name, cur, b))

# words, merging split numbers ("21" ".25", "RM11" ",700.")
words = []
for seg in json.load(open(ROOT/"data/transcript.json")):
    for w in seg["words"]:
        t = w["w"].strip()
        if words and (t[:1] in ".,-" ) and len(t) > 1 and (t[1].isdigit() or t[0] == "-"):
            words[-1]["w"] += t; words[-1]["e"] = w["e"]
        else:
            words.append({"w": t, "s": w["s"], "e": w["e"]})

out_clips, words_out, t_out, clip_spans = [], [], 0.0, []
for name, a, b in clips:
    f0, f1 = round(a * FPS), round(b * FPS)
    if f1 - f0 < 6: continue  # micro-slivers between squeezed pauses
    start_out = t_out
    out_clips.append({"section": name, "srcFrom": f0, "durationInFrames": f1 - f0, "outFrom": round(start_out * FPS)})
    clip_spans.append((a, b, start_out))
    t_out += (f1 - f0) / FPS
for w in words:
    if (round(w["s"], 2), w["w"]) in DROP: continue
    best = max(clip_spans, key=lambda c: min(w["e"], c[1]) - max(w["s"], c[0]))
    a, b, so = best
    if min(w["e"], b) - max(w["s"], a) <= 0: continue
    s, e = max(w["s"], a), min(w["e"], b)
    sec = next(n for n, ra, rb in RANGES if ra <= a < rb)
    words_out.append({"text": FIX.get(w["w"], w["w"]), "start": round(so + s - a, 3), "end": round(so + e - a, 3), "section": sec})
words_out.sort(key=lambda w: w["start"])
json.dump({"fps": FPS, "durationInFrames": round(t_out * FPS), "clips": out_clips, "words": words_out},
          open(ROOT/"src/edl.json", "w"), ensure_ascii=False, indent=1)
print(f"{len(out_clips)} clips, output {t_out:.1f}s (from 149.5s)")
for c in out_clips: print(c)
