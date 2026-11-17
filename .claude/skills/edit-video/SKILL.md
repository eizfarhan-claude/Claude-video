---
name: edit-video
description: Edit a talking-head gold/finance video (Malay, TikTok/IG Reels 1080x1920) with Remotion in this repo — download raw clips, transcribe, cut repeats/pauses, add motion graphics + premium SFX + ducked BGM, safe zones, preview first, final only on approval. Use whenever the user sends new raw video links/files to edit, or asks for revisions/previews/final renders of v11+ videos.
---

# Edit video (Remotion) — house workflow

The user (Malay speaker, gold-savings educator, Public Gold) sends raw iPhone clips (often Google Drive links)
and says things like "Edit video ni guna Remotion… transcribe dulu… jangan block muka… safe zone TikTok/IG…
BGM jangan tenggelamkan suara… buang repeat & awkward pause… tunjuk preview dulu". Reply in Malay.

## Standing preferences (learned from review rounds — always apply)
- **Preview first, never final** until the user says "render / render final" for that specific video.
- **Never cover the face** with graphics. Cards go in the band ABOVE the head (`TOP_BAND`), captions on the
  chest (`BOTTOM_BAND`). Exception: a reference image the user explicitly asks to overlay (e.g. zakat
  infographic) — full-frame at the opacity they ask (v11 settled on **60%**).
- **Colour: neutral grade, no yellow/warm skin, keep sharpness.** `scripts/prep-source.sh` now uses the
  neutral grade by default. Never reintroduce warm colorbalance. (Check: face B/R ratio ≈ raw, ~0.62.)
- **BGM low**: ducking in `src/engine/Edit.tsx` — `MUSIC_UNDER = 0.045`, `MUSIC_GAP = 0.09`. Voice ≈ −15 LUFS.
- **Cuts must be clean**: no repeated words/phrases (incl. half-word leaks like "Nom-", "Tak… Tak", "Jadi bagi… Jadi bagi"),
  no clipped word endings ("sahaja", "emas", "sebagainya", "mengejutkan anda"), no dead air, no breath clicks.
  The user WILL catch these — verify every join by listening (see Verify) before sending a preview.
- **Keep the closing sentence complete** (user complained when the last line was dropped — don't remove a
  closing line unless explicitly told, and end with a 1–1.5 s tail).
- CTA phrase "isi **beg biru**" is what he says — caption it as heard. Outro line is "**Dapat sesuatu?**".
- Whisper mishears: Public Gold ("Pak Bigul"), Tabung Haji ("tabah/tabuh"), menabung ("menabur/menabuk"),
  GAP, spread ("spray"), uruf ("urus/uruh"), Gold Bar & Dinar ("golongan badan dina"). Fix in captions.
- If two takes of the same topic exist, edit both and let the user choose. Drop aborted takes (say so).
- Fact-check on-screen claims against provided references; if speech contradicts an image (e.g. "Selangor
  paling tinggi" vs chart showing Terengganu), flag it and cut the wrong line.

## Pipeline (one raw clip = one video id, next free `vNN`)
```bash
pip install -q gdown faster-whisper            # if missing; npm install if node_modules missing
gdown "https://drive.google.com/uc?id=<ID>"   # into raw/<id>/ (gitignored)
scripts/prep-source.sh vNN raw/.../IMG_xxxx.MOV   # 1080x1920 neutral-graded video + cleaned voice + silences
scripts/fetch-assets.sh                           # Mixkit SFX + bgm (not committed)
python3 scripts/transcribe.py vNN                 # Whisper large-v3 word timestamps -> data/vNN/transcript.json
```
Running prep+transcribe for several clips is slow (~5 min prep, ~10 min transcribe each on 4 CPUs): run in background, work on finished ones meanwhile.

1. **Read transcript with word timings**, choose story ranges → `data/vNN/config.json`
   (`ranges: [[section, start, end]]`, edges as `"12.34!"` are exact; `fix`, `drop`). Skip false starts,
   keep the last clean take of each sentence.
2. `python3 scripts/build-edl.py vNN` → `src/videos/vNN/edl.json` (snaps edges to silence, squeezes pauses).
3. Inspect tricky edges: `python3 scripts/energy.py vNN 10:12`, `python3 scripts/fine.py vNN 10.2 10.9`
   (20 ms dB). Whisper word times are often ±0.3–0.5 s off — trust the energy dips, then set exact `"t!"` edges.
4. Captions: `python3 scripts/edl-captions.py vNN` (uses EDL words + `data/vNN/caption_fix.json`, dedupes
   straddling retakes). Hand-patch words that come from a take whose timestamps were cut.
5. `src/videos/vNN/index.tsx` — copy the pattern of v11–v19: `M` anchors via `at(section, word, nth)` /
   `S()` / `E()` (anchors are lowercase, **no punctuation**), `ITEMS` (TitleCard, StepCard, Choices,
   ChecklistCard ≤3 rows, CalcCard, CtaCard, custom cards) timed to the words, `SFX` on every card
   in/pop (whoosh_cine/pop/small, pop_hard, pop_msg, click_select, ding_correct, coins, gold_prize,
   sparkle, impact_deep, money_bag, atm_key, bell_notif at 0.2–0.45), `punches` on key words, `zoom` per
   section. Register in `src/Root.tsx` + `package.json` (`preview:vNN`, `render:vNN`).
6. `python3 scripts/check-anchors.py vNN` and `npx tsc --noEmit -p .` — a missing anchor breaks EVERY render.
7. Stills check (layout/safe zone/text overflow):
   `npx remotion still <Comp> out.png --frame=N --scale=0.3 --props='{"preview":true,"showSafeZones":true}'`
8. **Verify audio by listening**: `python3 scripts/hear.py vNN t0 t1 [...]` transcribes the EDITED voice
   around output times (and lists cut points). `python3 scripts/at.py vNN 26 61` maps preview timestamps
   (user's "minit 0.26" = 26 s) to source times/clips. Fix until no repeats/clipped words.
9. `npm run preview:vNN` (half-res) → send with SendUserFile. Wait for user notes.
10. On approval: `npm run render:vNN` (1080x1920, crf 16, 320k audio) → verify with ffprobe + ebur128 → send.
11. Commit + push config/edl/captions/index/package.json after each step (videos/raw/out are gitignored);
    remind the user to download finals (container is ephemeral).

## Handling review notes ("minit 0.26 ayat berulang, buang")
Map time with `at.py`, listen with `hear.py`, transcribe isolated source snippets if unsure, find the exact
dip with `fine.py`, split/trim ranges with exact edges, rebuild EDL + captions, re-check anchors (removed
words break `at()`), re-listen, re-render preview. Report each fix back per timestamp in Malay.

## Covers (after finals)
`src/covers.tsx`: per video add `COVERS.vNN` (face time `t`, kicker, 2 title lines with one gold keyword, red hook sub).
Pick an eyes-open frame: grid of face crops every 0.25 s around a candidate, then extract the exact frame with
ffmpeg → `public/covers/vNN.png` (don't use OffthreadVideo startFrom — it can land on a different frame).
Render: `npx remotion still Cover-vNN-TT` (1080x1920) and `Cover-vNN-IG` (1080x1440, 3:4 grid) → jpg → send.
All text stays in the centre 3:4 area so the TikTok cover also survives profile-grid crops.
