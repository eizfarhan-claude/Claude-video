# Standing brief — gold-savings talking-head edits (TikTok / IG Reels, 1080×1920)

The owner sends raw talking-head clips (Google Drive links, Malay). Every new video follows this brief
without being asked again. Reply to the owner in Malay.

## Workflow (always in this order)
1. Download → `VIVID=1 scripts/prep-source.sh <id> raw.mov` (next free id: v20, v21, …).
2. **Transcribe first** (`scripts/transcribe.py <id>`) and plan cuts, graphics and SFX from the transcript.
3. **Cut**: remove retakes, repeated sentences/words (e.g. "ramai yang tanya … ramai yang tanya", "dan dan"),
   stray "terima kasih kerana menonton", awkward pauses. Never clip a word: check edges with
   `scripts/energy.py`, verify with a verbatim window transcription, use `"12.34!"` hard edges when needed.
4. Captions from the **edited** voice (`scripts/build-captions.py`, then `scripts/postfix-captions.py`);
   graphics anchors (`at()`) come from `captions.json`.
5. **Preview only** (`npm run preview:<id>`, half res) → send to the owner. **Never render final until approved.**
6. On approval: `scripts/final.sh <id> <Comp>` → send all three files.

## Every video must have
- **Animated hook title intro** at the very start: `TitleIntro` (tag + line 1 white + line 2 gold, slam-in,
  gold line sweep, shine) + `IntroFlash`, with whoosh-impact / zoom-impact / deep-impact / sparkle SFX.
  Title = the video's hook question/promise. It replaces any other card during the hook.
- **Intro focus**: background blurs and the speaker is pushed forward during the hook
  (`focus: {to: E('hook') + 0.1}` in the VideoDef, then `python3 scripts/cutout-focus.py <id>` — generates the
  speaker cut-outs for every clip inside the focus window → `public/<id>/fg/`; a missing frame fails the render).
- Motion graphics + premium SFX layer (kit / kit2 cards) where the speech calls for them.
- **Never cover the face**: cards only in the top band (above the head) or bottom band (chest);
  subtitles on the chest only when nothing animates.
- **TikTok + IG safe zones** (`SAFE` in `src/engine/theme.ts`).
- Background music, ducked under speech (voice must never drown) — alternate `bgm`, `curiosity`, `lofi04`, `mornings`.
- **Covers**: add an entry to `COVERS` in `src/covers/Cover.tsx` (tag, line1, line2, sub) and pick an expressive
  frame (`scripts/cover-frame.sh <id> <frame>`); face clear, title on the chest, inside TikTok 3:4 and IG 4:5 grid crops.

## Final deliverable (each video)
`out/final/<id>_<Comp>/`: `<Comp>_final.mp4` (full res, crf 16, 320k audio) + `cover_tiktok.png` (1080×1920)
+ `cover_instagram.png` (1080×1350).

## Git
Commit and push work to the session branch. Raw video, `public/` assets, `out/` stay out of git.
