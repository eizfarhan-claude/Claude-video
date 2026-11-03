import React, {useMemo} from 'react';
import {AbsoluteFill, Audio, interpolate, OffthreadVideo, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import edl from './edl.json';
import {Captions} from './Captions';
import {Graphics, MOMENTS as M} from './Graphics';
import {sec, TAIL, words} from './timeline';
import {SAFE, TOP_BAND, CAPTION_Y} from './theme';

export type MainProps = {preview: boolean; showSafeZones: boolean};

type Clip = (typeof edl.clips)[number];
const clips = edl.clips as Clip[];
const TOTAL = edl.durationInFrames + TAIL;

/* ---------------- camera: per-cut zoom + punch-ins on key moments ----------------
   Scale origin sits on the face, max scale 1.16, so the face is never cropped or covered. */
const BASE: Record<string, number[]> = {
  hook: [1.12, 1.0],
  question: [1.0],
  weight: [1.1],
  body: [1.0, 1.07],
  target: [1.07, 1.0],
  cta: [1.0, 1.08],
};
const PUNCH = [M.rm11700 - 0.3, M.gramReveal, M.carry, M.rm100, M.unlocked, M.targetAmt, M.pin].map(sec);

const ClipVideo: React.FC<{clip: Clip; idx: number}> = ({clip, idx}) => {
  const frame = useCurrentFrame(); // local to the clip's Sequence
  const {fps} = useVideoConfig();
  const sectionIdx = clips.filter((c, i) => i < idx && c.section === clip.section).length;
  const pattern = BASE[clip.section] ?? [1];
  const base = pattern[sectionIdx % pattern.length];
  const drift = interpolate(frame, [0, clip.durationInFrames], [0, 0.025]);
  const g = clip.outFrom + frame;
  const punch = PUNCH.reduce((acc, p) => {
    if (g < p || g > p + 40) return acc;
    const s = spring({frame: g - p, fps, config: {damping: 9, stiffness: 160, mass: 0.6}});
    return acc + 0.06 * s * interpolate(g - p, [18, 40], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  }, 0);
  return (
    <AbsoluteFill style={{transform: `scale(${Math.min(1.16, base + drift + punch)})`, transformOrigin: '50% 36%'}}>
      <OffthreadVideo src={staticFile('source/video.mp4')} startFrom={clip.srcFrom} muted style={{width: '100%', height: '100%'}} />
    </AbsoluteFill>
  );
};

/* ---------------- audio ---------------- */
const edgeFade = (f: number, d: number) => d < 6 ? 1 : interpolate(f, [0, 2, d - 2, d], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

// Music ducking: low under speech, lifts in gaps, smooth attack/release.
const MUSIC_UNDER = 0.075; // ≈ -24 dB below voice
const MUSIC_GAP = 0.15;
const useDuckCurve = () =>
  useMemo(() => {
    const speaking = new Array(TOTAL).fill(false);
    words.forEach((w) => {
      for (let f = sec(w.start - 0.12); f <= sec(w.end + 0.35); f++) if (f >= 0 && f < TOTAL) speaking[f] = true;
    });
    const out: number[] = [];
    let v = MUSIC_GAP;
    for (let f = 0; f < TOTAL; f++) {
      const target = speaking[f] ? MUSIC_UNDER : MUSIC_GAP;
      v += (target - v) * (target < v ? 0.35 : 0.06); // fast duck, slow release
      out.push(v);
    }
    return out;
  }, []);

type Sfx = {t: number; f: string; v: number};
const SFX: Sfx[] = [
  {t: M.hookOpen, f: 'whoosh_cine', v: 0.45},
  {t: M.hookOpen + 0.05, f: 'impact_deep', v: 0.28},
  {t: M.rm8000, f: 'pop_hard', v: 0.35},
  {t: M.countStart, f: 'atm_key', v: 0.25},
  {t: M.rm11700 - 0.1, f: 'gold_prize', v: 0.4},
  {t: M.question - 0.12, f: 'whoosh_small', v: 0.3},
  {t: M.question + 0.05, f: 'pop_msg', v: 0.45},
  {t: M.gramReveal - 0.1, f: 'sparkle', v: 0.4},
  {t: M.gramReveal, f: 'impact_deep', v: 0.22},
  {t: M.cash - 0.05, f: 'money_bag', v: 0.42},
  {t: M.carry + 0.05, f: 'pop_hard', v: 0.4},
  {t: M.delivery - 0.1, f: 'whoosh_small', v: 0.3},
  {t: M.pay, f: 'click_select', v: 0.4},
  {t: M.ship, f: 'whoosh_pop', v: 0.5},
  {t: M.gap - 0.1, f: 'whoosh_pop', v: 0.45},
  {t: M.rm100, f: 'coins', v: 0.38},
  {t: M.bankCmp - 0.1, f: 'whoosh_small', v: 0.3},
  {t: M.bankRow, f: 'click_select', v: 0.4},
  {t: M.gapRow, f: 'coins', v: 0.35},
  {t: M.unlockCard - 0.1, f: 'whoosh_small', v: 0.3},
  {t: M.fill, f: 'sparkle', v: 0.22},
  {t: M.unlocked, f: 'ding_correct', v: 0.38},
  {t: M.budget - 0.1, f: 'whoosh_small', v: 0.3},
  {t: M.big, f: 'pop_msg', v: 0.42},
  {t: M.small, f: 'pop_msg', v: 0.42},
  {t: M.target - 0.1, f: 'whoosh_cine', v: 0.3},
  {t: M.targetAmt, f: 'money_bag', v: 0.35},
  {t: M.years, f: 'pop_hard', v: 0.35},
  {t: M.cta - 0.1, f: 'whoosh_small', v: 0.3},
  {t: M.pin, f: 'bell_notif', v: 0.32},
  {t: M.guide, f: 'pop_msg', v: 0.35},
  {t: M.final - 0.1, f: 'gold_prize', v: 0.4},
];

const SafeZones: React.FC = () => (
  <AbsoluteFill style={{pointerEvents: 'none'}}>
    <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: SAFE.top, background: 'rgba(255,0,0,0.28)'}} />
    <div style={{position: 'absolute', left: 0, right: 0, top: SAFE.bottom, bottom: 0, background: 'rgba(255,0,0,0.28)'}} />
    <div style={{position: 'absolute', left: SAFE.right, width: 1080 - SAFE.right, top: SAFE.top, bottom: 1920 - SAFE.bottom, background: 'rgba(255,0,0,0.2)'}} />
    <div style={{position: 'absolute', left: 0, width: SAFE.left, top: SAFE.top, bottom: 1920 - SAFE.bottom, background: 'rgba(255,0,0,0.2)'}} />
    <div style={{position: 'absolute', left: SAFE.left, width: SAFE.right - SAFE.left, top: TOP_BAND.y, height: TOP_BAND.h, border: '4px dashed #00e5ff'}} />
    <div style={{position: 'absolute', left: SAFE.left, width: SAFE.right - SAFE.left, top: CAPTION_Y, height: 200, border: '4px dashed #ffe600'}} />
  </AbsoluteFill>
);

export const Main: React.FC<MainProps> = ({preview, showSafeZones}) => {
  const duck = useDuckCurve();
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{backgroundColor: 'black'}}>
      {clips.map((c, i) => (
        <Sequence key={i} from={c.outFrom} durationInFrames={i === clips.length - 1 ? c.durationInFrames + TAIL : c.durationInFrames}>
          <ClipVideo clip={c} idx={i} />
          <Audio src={staticFile('source/voice.wav')} startFrom={c.srcFrom} endAt={c.srcFrom + c.durationInFrames} volume={(f) => edgeFade(f, c.durationInFrames)} />
        </Sequence>
      ))}

      {/* subtle vignette keeps graphics readable without touching the face */}
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 28%, rgba(0,0,0,0) 58%, rgba(0,0,0,0.35) 100%)'}} />

      <Graphics total={TOTAL} />
      <Captions />

      <Audio
        src={staticFile('music/bgm.mp3')}
        startFrom={sec(4)}
        volume={(f) => duck[f] * interpolate(f, [TOTAL - 30, TOTAL], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
      />
      {SFX.map((s, i) => (
        <Sequence key={i} from={Math.max(0, sec(s.t))} durationInFrames={sec(4.5)} layout="none">
          <Audio src={staticFile(`sfx/${s.f}.mp3`)} volume={s.v} />
        </Sequence>
      ))}

      {showSafeZones && <SafeZones />}
      {preview && (
        <div style={{position: 'absolute', left: 24, bottom: 24, fontFamily: 'Montserrat', fontWeight: 800, fontSize: 26, color: 'rgba(255,255,255,0.55)'}}>
          PREVIEW · {(frame / 30).toFixed(1)}s
        </div>
      )}
    </AbsoluteFill>
  );
};
