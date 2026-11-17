---
name: edit-video
description: Full procedure for editing the owner's Malay gold-savings talking-head clips into TikTok/IG Reels with Remotion — download, transcribe, stutter-free cuts, title intro with focus blur, motion graphics, premium SFX, ducked music, captions, covers, preview → final. Use for any new video (Google Drive links) or review round ("minit 0.45 terpotong", "render final").
---

# Edit-video skill (Remotion, 1080×1920, Malay)

Reply to the owner in **Malay**. Rules that never change are in `CLAUDE.md`; this file is the how-to.

## 0. Environment setup (fresh container)
```bash
npm install
pip install gdown faster-whisper mediapipe          # Whisper large-v3 downloads on first use
apt-get install -y libegl1 libgles2                 # needed by mediapipe (cut-outs)
scripts/fetch-assets.sh                             # SFX (Mixkit) + music beds + raw/selfie_multiclass.tflite
```
Download Drive links: `gdown "https://drive.google.com/uc?id=<ID>" -O raw/new/cN.mov` (several in parallel).
Duplicate links happen — dedupe IDs. A small low-res clip with no speech is usually **B-roll** for a specific video.

## 1. Prep + transcribe
```bash
VIVID=1 scripts/prep-source.sh v20 raw/new/c1.mov   # video.mp4 (graded) + voice.wav + silences
python3 scripts/transcribe.py v20                   # data/v20/transcript.json (word level)
python3 scripts/words.py v20                        # readable timeline with <gaps>
```
Speed: voice extraction is fast; run transcription before heavy video encodes (they fight for 4 CPUs).
For a big batch: extract voices first, transcribe all, encode videos 3 at a time with `-threads 2`.

## 2. Cut plan → `data/<id>/config.json`
```json
{"id":"v20","title":"…","ranges":[["hook",2.70,8.2],["p1","12.9!","19.5"],…],
 "cuts":[[41.5,43.42]],"fix":{"menabur":"menabung"},"drop":[],"pad_out":0.2}
```
- Ranges are **source seconds in output order**; section names become caption sections and `S()/E()` anchors.
- Pick the **last clean take** of every retake. The speaker repeats openers ("ramai yang tanya … ramai yang tanya").
- `"12.34!"` = exact edge (not snapped). Use it whenever a word sits close to the cut.
- `python3 scripts/build-edl.py v20` → `src/videos/v20/edl.json`; long pauses are squeezed automatically.

### Finding exact edges (the owner hears everything)
1. `python3 scripts/energy20.py v20 21.0:22.0` — 20 ms dB; words end where it drops below ≈ -40 dB.
2. `python3 scripts/win.py v20 20.4-21.7` — what a source range really says (Whisper word times are ±0.3 s off).
3. **Audition the join**: `python3 scripts/join-test.py v20 "19.6-21.72+30.2-31.6"` — try 2–4 candidate edges,
   keep the one that reads cleanly (no "-nya", "ya", double words, clipped endings).
4. After building, audition **every** join (loop over EDL clips, 1.6 s each side) and run
   `python3 scripts/qa-stutter.py v20` (whole-video verbatim, flags back-to-back repeats; `-anak/-masing/-bila`
   reduplications are fine; duplicated text around adjacent cuts in its printout is a window-overlap artefact).

Typical defects the owner reports: clipped last word of a clip ("datang", "kekayaan", "2026" — the year runs long),
leftover first syllable of the next take ("Pada | masa", "Last" split), doubled words across a cut
("Nak, nak", "jadi, jadi", "boleh, boleh"), stutter fragments ("sara… saranan", "ber… bermula"), silences > 0.3 s.

## 3. Captions
```bash
python3 scripts/build-captions.py v20 && python3 scripts/postfix-captions.py v20
```
- `data/<id>/caption_fix.json`: word map (`"beg":"bag"`, `"film":"pin"`, `"gap":"GAP"`, `"penyimpat":"penyimpan"`).
- `data/<id>/caption_post.json`: exact sequence fixes `[{"find":["2020,"],"replace":["2006,"]}]` (numbers/years,
  dropped words). `scripts/recaption.py v20 61.0 64.4` re-transcribes one window (then re-insert any lost words).
- **Read the full caption text** before rendering: Whisper drops words ("setiap tahun") and mishears.
- `python3 scripts/check-anchors.py v20` — every `at()` must exist (renders crash otherwise).

## 4. Composition `src/videos/<id>/index.tsx`
Copy a recent one (v15–v19). Pattern:
```tsx
const tl = makeTimeline({...(edlJson as Edl), words: captionsJson as Word[]}, 30);   // anchors from captions
const M = {n30: at('kisah', '30'), …};
ITEMS[0] = {from: 0.0, to: E('hook') + 0.15, render: (d) => <TitleIntro dur={d} tag="…" line1="…" line2="…" l2At={14} />};
SFX starts with the subtle intro set: whoosh_impact .26, tech_slide .12, zoom_impact .18, impact_deep .13, sparkle .12
Overlays: <IntroFlash/> [<ShotCut/> / <BrollCut/>] <Schedule/> <Subtitles busy={motionBusy(ITEMS, SFX, SHOTS)}/>
VideoDef: {..., music: {file: 'curiosity.mp3', startAt: 0}, focus: {to: E('hook') + 0.15}}
```
Register in `src/Root.tsx`, add `preview:<id>` to `package.json`, add a `COVERS` entry.
Cards (kit/kit2): TitleCard, StepCard, ChecklistCard (≤3 rows), Choices, VsCard, MythFact, BigStat (counting),
KineticHook, PillRow, GramTimeline, GoldProgress, JourneyCard, CtaCard (pin + "Isi BAG BIRU", optional final).
Full-frame: `ShotCut` (screenshot, blurred backdrop, label, pulsing highlight box — appear exactly when the thing
is said, e.g. on "30 gram"), `BrollCut` (muted clip; cards stay on top).
Then `python3 scripts/cutout-focus.py v20` (person cut-outs for the blurred-background intro).

## 5. Preview → review → final
```bash
npm run preview:v20            # out/preview_<Comp>.mp4 (half res, PREVIEW stamp)
npx remotion still cover-tt-v20 out/covers/v20_tiktok.png; npx remotion still cover-ig-v20 out/covers/v20_instagram.png
scripts/final.sh v20 <Comp>    # only after "render" from the owner → video + both covers in out/final/
```
- Send preview + both covers; finals = 3 files. Name finals clearly in the caption.
- Run Whisper jobs and renders **sequentially** (OOM otherwise); one `nohup bash script.sh` + Monitor on its log.
- Cover frame: `scripts/cover-frame.sh v20 <frame>`; build a contact sheet of candidates, pick eyes-to-camera,
  explaining/gesturing; avoid pursed lips, closed eyes, looking down.
- Visual checks: extract frames from the preview (`ffmpeg … tile`) for intro, cards, screenshots, B-roll.
- "Bunyi pelik" with a clean voice track → check music spectrogram; swap the bed.

## Owner preferences learned
- Intro SFX soft; title intro + blurred background on every video; covers for TT + IG on every final.
- Wants stutters/repeats removed aggressively; prefers dropping a broken sentence over a patched one.
- Screenshots of members' accounts/chats: blur names. CTA: "Tengok PIN VIDEO" / "Isi BAG BIRU".
- Timestamps like "0.45" / "1.11" = m.ss on the preview.
