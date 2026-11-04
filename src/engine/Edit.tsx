import React, {useMemo} from 'react';
import {AbsoluteFill, Audio, interpolate, OffthreadVideo, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Clip, sec, TAIL, Timeline} from './timeline';
import {SAFE, TOP_BAND} from './theme';

export type Sfx = {t: number; f: string; v: number};

/** Everything that makes one video unique. Shared look/mix logic lives in <Edit>. */
export type VideoDef = {
  id: string;                         // asset folder: public/<id>/source/{video,video_4k}.mp4 + voice.wav
  tl: Timeline;
  Overlays: React.FC<{hq: boolean}>;  // B-roll + motion graphics
  sfx: Sfx[];
  punches: number[];                  // output seconds of quick zoom punch-ins
  zoom: Record<string, number[]>;     // per-section base zoom pattern, alternates per cut
  music: {file: string; startAt: number};
};

export type EditProps = {preview: boolean; showSafeZones: boolean; hq?: boolean};

/* camera: per-cut zoom + punch-ins. Origin on the face, max 1.16 → face never cropped/covered. */
const ClipVideo: React.FC<{def: VideoDef; clip: Clip; idx: number; hq: boolean}> = ({def, clip, idx, hq}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const clips = def.tl.edl.clips;
  const sectionIdx = clips.filter((c, i) => i < idx && c.section === clip.section).length;
  const pattern = def.zoom[clip.section] ?? [1, 1.06];
  const base = pattern[sectionIdx % pattern.length];
  const drift = interpolate(frame, [0, clip.durationInFrames], [0, 0.025]);
  const g = clip.outFrom + frame;
  const punch = def.punches.map(sec).reduce((acc, p) => {
    if (g < p || g > p + 40) return acc;
    const s = spring({frame: g - p, fps, config: {damping: 9, stiffness: 160, mass: 0.6}});
    return acc + 0.06 * s * interpolate(g - p, [18, 40], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  }, 0);
  return (
    <AbsoluteFill style={{transform: `scale(${Math.min(1.16, base + drift + punch)})`, transformOrigin: '50% 36%'}}>
      <OffthreadVideo src={staticFile(`${def.id}/source/${hq ? 'video_4k' : 'video'}.mp4`)} startFrom={clip.srcFrom} muted style={{width: '100%', height: '100%'}} />
    </AbsoluteFill>
  );
};

const edgeFade = (f: number, d: number) =>
  d < 6 ? 1 : interpolate(f, [0, 2, d - 2, d], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

// Music ducking: low under speech (≈ -24 dB below voice), lifts in gaps, fast duck / slow release.
const MUSIC_UNDER = 0.075;
const MUSIC_GAP = 0.15;
const useDuckCurve = (tl: Timeline) =>
  useMemo(() => {
    const total = tl.total;
    const speaking = new Array(total).fill(false);
    tl.words.forEach((w) => {
      for (let f = sec(w.start - 0.12); f <= sec(w.end + 0.35); f++) if (f >= 0 && f < total) speaking[f] = true;
    });
    const out: number[] = [];
    let v = MUSIC_GAP;
    for (let f = 0; f < total; f++) {
      const target = speaking[f] ? MUSIC_UNDER : MUSIC_GAP;
      v += (target - v) * (target < v ? 0.35 : 0.06);
      out.push(v);
    }
    return out;
  }, [tl]);

const SafeZones: React.FC = () => (
  <AbsoluteFill style={{pointerEvents: 'none'}}>
    <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: SAFE.top, background: 'rgba(255,0,0,0.28)'}} />
    <div style={{position: 'absolute', left: 0, right: 0, top: SAFE.bottom, bottom: 0, background: 'rgba(255,0,0,0.28)'}} />
    <div style={{position: 'absolute', left: SAFE.right, width: 1080 - SAFE.right, top: SAFE.top, bottom: 1920 - SAFE.bottom, background: 'rgba(255,0,0,0.2)'}} />
    <div style={{position: 'absolute', left: 0, width: SAFE.left, top: SAFE.top, bottom: 1920 - SAFE.bottom, background: 'rgba(255,0,0,0.2)'}} />
    <div style={{position: 'absolute', left: SAFE.left, width: SAFE.right - SAFE.left, top: TOP_BAND.y, height: TOP_BAND.h, border: '4px dashed #00e5ff'}} />
  </AbsoluteFill>
);

export const Edit: React.FC<EditProps & {def: VideoDef}> = ({def, preview, showSafeZones, hq = false}) => {
  const duck = useDuckCurve(def.tl);
  const frame = useCurrentFrame();
  const clips = def.tl.edl.clips;
  const total = def.tl.total;
  const {Overlays} = def;
  return (
    <AbsoluteFill style={{backgroundColor: 'black'}}>
      {clips.map((c, i) => (
        <Sequence key={i} from={c.outFrom} durationInFrames={i === clips.length - 1 ? c.durationInFrames + TAIL : c.durationInFrames}>
          <ClipVideo def={def} clip={c} idx={i} hq={hq} />
          <Audio src={staticFile(`${def.id}/source/voice.wav`)} startFrom={c.srcFrom} endAt={c.srcFrom + c.durationInFrames} volume={(f) => edgeFade(f, c.durationInFrames)} />
        </Sequence>
      ))}

      {/* subtle vignette keeps graphics readable without touching the face */}
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 28%, rgba(0,0,0,0) 58%, rgba(0,0,0,0.35) 100%)'}} />

      <Overlays hq={hq} />

      <Audio
        src={staticFile(`music/${def.music.file}`)}
        startFrom={sec(def.music.startAt)}
        volume={(f) => duck[Math.min(f, duck.length - 1)] * interpolate(f, [total - 50, total], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
      />
      {def.sfx.map((s, i) => (
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
