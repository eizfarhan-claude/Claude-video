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

# Lessons from owner reviews (v11–v14) — check these on every new video before sending
Owner's timestamps ("0.58", "1.01") are m.ss on the delivered video = output seconds; map to source with the EDL clip list.

## Cuts
- **Drop "filler" set-up lines** that add nothing, e.g. "Caranya mudah saja." (v14) — go straight to the next point.
- **Start of every clip**: listen to the first ~0.5 s (`scripts/energy20.py`). Remove
  - leftover false starts before the real take: "jadi nak… Jadi, cara nak…" (v14), "andai kata… andai kata anda" (v12 —
    the duplicate sat *inside* the kept range, right after a pause), a stray "paling" before "Paling mudah…" (v14);
  - murmured / drawn-out connectors at -25…-40 dB ("Dan…" before a retake, v12 0.58 = "bunyi pelik") — start at the
    next clear word instead ("Yang paling penting…");
  - the tail of the previous take's last word (v11: second "gram" before "dah harga naik").
- **End of every clip** must sit after the last word has fully decayed (< -50 dB). v11 "kaya" ended 34.44 but the
  clip ended 34.30 → clipped + faded = "bunyi pelik".
- When the speaker says a line twice, use the take the owner prefers; default to the **more complete** sentence
  (v12: "kita lebih tenang dalam **membina simpanan emas**", not "…dalam menabung").
- Audition joins with `scripts/join-test.py`. Whisper sometimes *invents* a connector ("dan") across a join — if
  the clip transcribed alone doesn't contain it, the join is clean.

## Captions / on-screen text (Whisper mishearings)
- "kosmu asas" / "kos asas" → **"kos Muassasah"** (Tabung Haji cost term) — captions AND graphics.
- "RM50 / RM100 / RM1" when he says grams → "50 gram", "100 gram", "1 gram".
- "web biru / web miru" → "beg biru"; "baju yang besar" → "bajet yang besar"; "pemurahan / pengurataan harga" → "purata harga";
  "penyimpak / penyipat" → "penyimpan"; "menabur / menampung" → "menabung"; "gap" → "GAP"; "bocok" → "bocor".
- After re-cutting, words that straddle a new join are dropped by `remap-captions.py` — re-insert them
  ("Yang", "Kenapa", "dah", "dapat") and read the full caption text before rendering.

## Rendering
- Montserrat has no "±" glyph (renders like "2") — write "sekitar" or drop it.
- Intro-focus renders need `--timeout=180000` (two video decoders); stills `--timeout=120000`.
