# Editing rules (apply to every new video)

## TikTok placement
- Every animation / card / subtitle must be **horizontally centred on x = 540** (centre of the 1080×1920 frame).
  Never lay a band out between `SAFE.left` and `SAFE.right` — that is asymmetric and puts the centre at x = 500.
- Use `BAND_X` and `CENTER_X` from `src/engine/theme.ts` (or the `TopBand` wrapper in `src/engine/ui.tsx`) for any new overlay.
- The top band height is approved as is (`TOP_BAND.y = 232`, just under TikTok's search bar) — do not move it; it stays above the head; graphics never cover the face.
- Before a final render, check a still with `--props='{"showSafeZones":true}'`: the cyan vertical line marks the centre.

# Every video must have (owner's standing request)
- **Animated hook title intro** from frame 0: `TitleIntro` + `IntroFlash` (`src/engine/kit2.tsx`), soft intro SFX
  (whoosh_impact .26, tech_slide .12, zoom_impact .18, impact_deep .13, sparkle .12), and **intro focus**
  (`focus: {to: E('hook') + 0.15}` in the VideoDef → background blurs, speaker cut-out pushed forward).
  Split the config so `hook` is only the first hook sentence (~4–6 s); run `python3 scripts/cutout-focus.py <id>`
  after the EDL/captions are final (a missing cut-out frame fails the render). See `.claude/skills/title-intro`.
- **Covers with every final**: Style B in `src/covers.tsx` (`COVERS`, stills `cover-tt-<id>` 1080×1920 and
  `cover-ig-<id>` 1080×1350). Face frame = `public/covers/<id>.png` (exact source frame): eyes open to camera,
  gesture, no pursed lips / half-closed eyes. Final folder: `out/final/<id>_<Comp>/` = video + cover_tiktok + cover_instagram.
- After an EDL change keep hand-fixed captions with `scripts/remap-captions.py <id> <old_edl.json>`, then
  `scripts/recaption.py` only on the windows around changed joins.
- Section splits inside continuous speech are no longer faded (Edit.tsx `joined()`), but a clip END must still sit
  after the last word has decayed (check `scripts/energy20.py`) — v11 "kaya" was clipped at 34.30 when the word ended at 34.44.
