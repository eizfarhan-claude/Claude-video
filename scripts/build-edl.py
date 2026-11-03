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
MIN_CLIP = 6  # frames; drop micro-slivers

cfg = json.load(open(D / "config.json"))
RANGES = [tuple(r) for r in cfg["ranges"]]
CUTS = [tuple(c) for c in cfg.get("cuts", [])]
FIX = cfg.get("fix", {})
DROP = {(round(s, 2), w) for s, w in cfg.get("drop", [])}
# ---------------------------------------------------------------------------------------------
# Audio-aware edges ("on point" cuts). Speech/silence is measured on the cleaned voice track in
# 20 ms frames: silence = below SIL_DB. Every range edge is moved so that:
#   - an END never lands inside a word: if speech is still going, extend to the first real silence;
#     if it lands in silence, pull it back to last speech + PAD_OUT (no dead air).
#   - a START never clips an onset: if inside speech, move back to the preceding silence;
#     if in silence, push it forward to first speech - PAD_IN (no delay before the first word).
# Internal pauses longer than MAX_GAP are squeezed to PAD_OUT + PAD_IN.
SIL_DB = -50.0
FR = 0.02
PAD_IN, PAD_OUT = 0.10, 0.14
MAX_GAP = 0.40
import wave, numpy as np
wf = wave.open(str(ROOT / "public" / VID / "source" / "voice.wav")); sr = wf.getframerate()
audio = np.frombuffer(wf.readframes(wf.getnframes()), np.int16).astype(np.float32) / 32768
n = int(len(audio) / sr / FR)
db = np.array([20 * np.log10(np.sqrt(np.mean(audio[int(i * FR * sr):int((i + 1) * FR * sr)] ** 2)) + 1e-9) for i in range(n)])
speech = db > SIL_DB
def fi(t): return max(0, min(n - 1, int(round(t / FR))))
def quiet_run(i, k=3):  # k consecutive silent frames starting at i
    return all(not speech[j] for j in range(i, min(n, i + k)))

def run_len(i, step):  # length (frames) of the silent run starting at i going in direction step
    k = 0
    while 0 <= i + k * step < n and not speech[i + k * step]: k += 1
    return k

LIM = 0.35   # how far an edge may move to find real silence
DIP = 0.12   # otherwise: snap to the lowest-energy 20 ms within ±DIP (gap between connected words)
warn = []

def dip(i):
    lo, hi = max(0, i - int(DIP / FR)), min(n - 1, i + int(DIP / FR))
    return min(range(lo, hi + 1), key=lambda j: db[j])

def fix_end(b):
    i = fi(b)
    if speech[i] or speech[max(0, i - 1)]:                  # inside a word -> extend to silence
        j = i
        while j < min(n - 3, i + int(LIM / FR)) and not quiet_run(j): j += 1
        if not quiet_run(j):
            j = dip(i); warn.append(f"  ~ end {b:.2f}: connected speech, cut at dip {j * FR:.2f} ({db[j]:.0f}dB)")
            if speech[j]: return j * FR
            while j > 0 and not speech[j - 1]: j -= 1          # dip is a real gap -> hug the last word
    else:                                                   # in silence -> pull back to last speech
        j = i
        while j > 0 and not speech[j - 1] and j > i - int(1.5 / FR): j -= 1
    gap = run_len(j, +1) * FR                               # never pad into the next word
    return j * FR + min(PAD_OUT, gap * 0.5)

def fix_start(a):
    i = fi(a)
    if speech[i] or speech[min(n - 1, i + 1)]:              # inside a word -> back to silence
        j = i
        while j > max(3, i - int(LIM / FR)) and not quiet_run(j - 3): j -= 1
        if not quiet_run(j - 3):
            j = dip(i); warn.append(f"  ~ start {a:.2f}: connected speech, cut at dip {j * FR:.2f} ({db[j]:.0f}dB)")
            if speech[j]: return j * FR
            while j < n - 1 and not speech[j]: j += 1          # dip is a real gap -> hug the next word
    else:                                                   # in silence -> forward to first speech
        j = i
        while j < n - 1 and not speech[j] and j < i + int(1.5 / FR): j += 1
    gap = run_len(j - 1, -1) * FR
    return j * FR - min(PAD_IN, gap * 0.5)

# ranges that continue seamlessly in the source (prev end == next start) keep that shared edge as-is
_fixed = []
for k, (nm, a, b) in enumerate(RANGES):
    joined_prev = k > 0 and abs(RANGES[k - 1][2] - a) < 0.05
    joined_next = k + 1 < len(RANGES) and abs(RANGES[k + 1][1] - b) < 0.05
    _fixed.append((nm, a if joined_prev else round(fix_start(a), 3), b if joined_next else round(fix_end(b), 3)))
RANGES = _fixed
# CUTS: [s, e] removes s..e; s is treated as an END, e as a START
CUTS = [(round(fix_end(s), 3), round(fix_start(e), 3)) for s, e in CUTS]

# internal pauses from the energy map
sil, i = [], 0
while i < n:
    if not speech[i]:
        j = i
        while j < n and not speech[j]: j += 1
        if (j - i) * FR > MAX_GAP: sil.append((i * FR, j * FR))
        i = j
    else: i += 1

clips = []
for name, a, b in RANGES:
    cur = a
    removed = [(s + PAD_OUT, e - PAD_IN) for s, e in sil if s > a and e < b]
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
# join audit: energy right at each cut edge (should be silence)
bad = []
for k, c in enumerate(out_clips):
    s0 = c["srcFrom"] / FPS; s1 = (c["srcFrom"] + c["durationInFrames"]) / FPS
    e_in = db[fi(s0):fi(s0) + 2].max(); e_out = db[max(0, fi(s1) - 2):fi(s1)].max()
    prev = out_clips[k - 1] if k else None; nxt = out_clips[k + 1] if k + 1 < len(out_clips) else None
    if prev and prev["srcFrom"] + prev["durationInFrames"] == c["srcFrom"]: e_in = -99   # seamless
    if nxt and c["srcFrom"] + c["durationInFrames"] == nxt["srcFrom"]: e_out = -99
    if e_in > SIL_DB or e_out > SIL_DB:
        bad.append(f"  ! {c['section']} src {s0:.2f}-{s1:.2f}: start {e_in:.0f}dB end {e_out:.0f}dB")
print("\n".join(warn + bad) if (warn or bad) else "  all cut edges land in silence")
print(f"{VID}: {len(out_clips)} clips, output {t_out:.1f}s (from ~{src_len:.1f}s)")
