"""Builds src/videos/<id>/edl.json from data/<id>/config.json:
which source ranges to keep (story order, hook first), stumbles/repeats cut out,
long pauses squeezed, and every spoken word re-timed onto the output timeline.

Usage: python3 scripts/build-edl.py v2
Inputs : data/<id>/config.json, data/<id>/transcript.json, data/<id>/silences.txt
config : {"ranges": [[section, start, end], ...],   # source seconds, in output order
          "cuts":   [[start, end], ...],            # removed inside ranges (repeats/stumbles)
          "fix":    {"wrong": "right"},             # transcript word fixes
          "drop":   [[start, word], ...]}           # words to ignore
"""
import json, pathlib, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
VID = sys.argv[1] if len(sys.argv) > 1 else "v1"
D = ROOT / "data" / VID
FPS = 30
MAX_GAP, KEEP_PAD = 0.30, 0.10  # pauses longer than MAX_GAP get squeezed to 2*KEEP_PAD
MIN_CLIP = 6                    # frames; drop micro-slivers

cfg = json.load(open(D / "config.json"))
RANGES = [tuple(r) for r in cfg["ranges"]]
CUTS = [tuple(c) for c in cfg.get("cuts", [])]
FIX = cfg.get("fix", {})
DROP = {(round(s, 2), w) for s, w in cfg.get("drop", [])}
sil = [tuple(map(float, l.split())) for l in open(D / "silences.txt") if l.strip()]

# Optional: snap every range/cut boundary to the quietest 20ms within ±SNAP s (avoids clipping words)
SNAP = cfg.get("snap", 0)
if SNAP:
    import wave, numpy as np
    wf = wave.open(str(ROOT / "public" / VID / "source" / "voice.wav")); sr = wf.getframerate()
    audio = np.frombuffer(wf.readframes(wf.getnframes()), np.int16).astype(np.float32) / 32768
    def snap(t):
        best, bt = 1e9, t
        for c in np.arange(t - SNAP, t + SNAP + 1e-6, 0.01):
            i = int(c * sr); seg = audio[max(0, i - int(0.01 * sr)): i + int(0.01 * sr)]
            if len(seg) == 0: continue
            e = float(np.sqrt(np.mean(seg ** 2))) * (1 + 0.15 * abs(c - t) / SNAP)  # prefer staying close
            if e < best: best, bt = e, float(c)
        return round(bt, 3)
    RANGES = [(n, snap(a), snap(b)) for n, a, b in RANGES]
    CUTS = [(snap(a), snap(b)) for a, b in CUTS]

clips = []
for name, a, b in RANGES:
    cur = a
    removed = [(s + KEEP_PAD, e - KEEP_PAD) for s, e in sil if s > a and e < b and e - s > MAX_GAP]
    removed += [(s, e) for s, e in CUTS if s > a and e < b]
    merged = []
    for s, e in sorted(removed):
        if merged and s <= merged[-1][1]:
            merged[-1] = (merged[-1][0], max(merged[-1][1], e))
        else:
            merged.append((s, e))
    for s, e in merged:
        clips.append((name, cur, s)); cur = e
    clips.append((name, cur, b))

# words, merging split numbers ("21" ".25", "RM11" ",700.")
words = []
for seg in json.load(open(D / "transcript.json")):
    for w in seg["words"]:
        t = w["w"].strip()
        if words and t[:1] in ".,-" and len(t) > 1 and (t[1].isdigit() or t[0] == "-"):
            words[-1]["w"] += t; words[-1]["e"] = w["e"]
        else:
            words.append({"w": t, "s": w["s"], "e": w["e"]})

out_clips, spans, t_out = [], [], 0.0
for name, a, b in clips:
    f0, f1 = round(a * FPS), round(b * FPS)
    if f1 - f0 < MIN_CLIP:
        continue
    out_clips.append({"section": name, "srcFrom": f0, "durationInFrames": f1 - f0, "outFrom": round(t_out * FPS)})
    spans.append((f0 / FPS, f1 / FPS, t_out, name))
    t_out += (f1 - f0) / FPS

words_out = []
for w in words:
    if (round(w["s"], 2), w["w"]) in DROP:
        continue
    a, b, so, sec = max(spans, key=lambda c: min(w["e"], c[1]) - max(w["s"], c[0]))
    if min(w["e"], b) - max(w["s"], a) <= 0:
        continue
    s, e = max(w["s"], a), min(w["e"], b)
    words_out.append({"text": FIX.get(w["w"], w["w"]), "start": round(so + s - a, 3), "end": round(so + e - a, 3), "section": sec})
words_out.sort(key=lambda w: w["start"])

out = ROOT / "src" / "videos" / VID / "edl.json"
out.parent.mkdir(parents=True, exist_ok=True)
json.dump({"fps": FPS, "durationInFrames": round(t_out * FPS), "clips": out_clips, "words": words_out},
          open(out, "w"), ensure_ascii=False, indent=1)
src_len = max(s["end"] for s in json.load(open(D / "transcript.json")))
print(f"{VID}: {len(out_clips)} clips, output {t_out:.1f}s (from ~{src_len:.1f}s)")
