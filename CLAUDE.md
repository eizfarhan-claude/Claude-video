# Standing brief — gold-savings talking-head edits (TikTok / IG Reels, 1080×1920)

The owner sends raw talking-head clips (Google Drive links, Malay; speaker stutters a lot). Every new video
follows this brief without being asked again. **Reply to the owner in Malay.**
Full step-by-step procedure, tools and lessons learned: **`.claude/skills/edit-video/SKILL.md`**; the opening and the
covers have their own skills: **`.claude/skills/title-intro/SKILL.md`** and **`.claude/skills/cover/SKILL.md`**. Load them before
editing anything.

## Workflow (always in this order)
1. Download (`gdown`) → `VIVID=1 scripts/prep-source.sh <id> raw.mov` (next free id: v20, v21, …).
2. **Transcribe first** (`scripts/transcribe.py <id>`) and plan cuts, graphics and SFX from the transcript.
3. **Cut**: remove retakes, stutters ("dia, dia hanya…"), repeated words/sentences ("jadi, jadi", "nak, nak",
   "boleh… boleh"), false starts, stray "terima kasih kerana menonton" (Whisper hallucination = usually a retake
   or noise), awkward pauses and odd sounds. Never clip a word.
   - Plain Whisper hides stutters → use `scripts/verbatim.py` (disfluent prompt) and `scripts/qa-stutter.py`.
   - Place every edge with `scripts/energy.py` + 20 ms energy, use `"12.34!"` hard edges.
   - **Audition every join before rendering**: `scripts/join-test.py <id> "a-b+c-d"`.
4. Captions from the **edited** voice (`scripts/build-captions.py`, then `scripts/postfix-captions.py`); check the
   caption text for Whisper mishearings (numbers/years, "GAP", "bag biru", "simpanan") before rendering.
   Graphics anchors (`at()`) come from `captions.json`.
5. **Preview only** (`npm run preview:<id>`, half res) + covers → send to the owner. **Never render final until approved.**
6. On approval: `scripts/final.sh <id> <Comp>` → send all three files.
7. Owner's timestamps refer to the preview timeline (output seconds): map them to source with the EDL clip list.

## Every video must have
- **Animated hook title intro** at the very start: `TitleIntro` (tag + line 1 white + line 2 gold, slam-in,
  gold line sweep, shine) + `IntroFlash`, with whoosh-impact / zoom-impact / deep-impact / sparkle SFX kept subtle
  (≈0.26/0.18/0.13/0.12 — owner asked for softer intro SFX). Title = the hook question/promise; replaces other cards in the hook.
- **Intro focus**: background blurs and the speaker is pushed forward during the hook
  (`focus: {to: E('hook') + 0.1}` in the VideoDef, then `python3 scripts/cutout-focus.py <id>` — a missing cut-out frame fails the render).
- Motion graphics + premium SFX layer (kit / kit2 cards) where the speech calls for them.
- **Never cover the face**: cards only in the top band (above the head) or bottom band (chest);
  subtitles on the chest only when nothing animates. Full-frame cutaways (`ShotCut` screenshots, `BrollCut`) are allowed.
- **TikTok + IG safe zones** (`SAFE` in `src/engine/theme.ts`).
- Background music ducked under speech (voice must never drown) — alternate `bgm`, `curiosity`, `lofi04`, `mornings`.
  `bgm` ("Deep Urban") has odd synth "zap" FX in places; if the owner hears an odd sound and the voice is clean, swap the track.
- **Covers**: entry in `COVERS` (`src/covers/Cover.tsx`) + an expressive frame (`scripts/cover-frame.sh <id> <frame>`):
  eyes open to camera, mid-explanation or hand gesture — never mouth pursed/closed-eyes; title on the chest,
  inside TikTok 3:4 and IG 4:5 grid crops.
- Owner's assets (screenshots, B-roll) go in `public/<id>/img|broll/`; **blur third-party names** in screenshots.
- CTA wording: "Tengok PIN VIDEO" + "Isi BAG BIRU".

## Final deliverable (each video)
`out/final/<id>_<Comp>/`: `<Comp>_final.mp4` (full res, crf 16, 320k audio) + `cover_tiktok.png` (1080×1920)
+ `cover_instagram.png` (1080×1350).

## Machine limits
Whisper large-v3 (~4.5 GB) and Remotion renders together can OOM — run them **sequentially** in one script.

## Git
Commit and push work to the session branch. Raw video, `public/` assets, `out/` stay out of git.
