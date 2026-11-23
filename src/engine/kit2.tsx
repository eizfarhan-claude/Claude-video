/* v11+ additions: more motion-graphic cards. Same rules as kit.tsx: top band (above head) or bottom band (chest), never the face. */
import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {sec} from './timeline';
import {FONT, FONT2, GOLD_SOLID, GREEN} from './theme';
import {Card, GoldText, Label, Shine, TopBand, useEnvelope, usePop} from './ui';
import {popStyle} from './kit';

const RED = '#E5484D';

/** Big counting number: "RM 0 → RM 100" style. `value` is the final number; prefix/suffix wrap it. */
export const BigStat: React.FC<{dur: number; label: string; value: number; prefix?: string; suffix?: string; decimals?: number; countTo?: number; sub?: string; subAt?: number; icon?: React.ReactNode}> = ({
  dur, label, value, prefix = '', suffix = '', decimals = 0, countTo = 18, sub, subAt = 99999, icon,
}) => {
  const {v, frame} = useEnvelope(dur);
  const k = interpolate(frame, [2, countTo], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const s = usePop(subAt);
  const sh = interpolate(frame, [countTo, countTo + 22], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const n = (value * k).toLocaleString('en-US', {minimumFractionDigits: decimals, maximumFractionDigits: decimals});
  const ip = usePop(0);
  return (
    <TopBand v={v}>
      <Card style={{display: 'flex', alignItems: 'center', gap: 24, padding: '18px 38px', position: 'relative', overflow: 'hidden'}}>
        {icon && <div style={popStyle(ip)}>{icon}</div>}
        <div>
          <Label size={24} color={GOLD_SOLID}>{label}</Label>
          <GoldText size={86} style={{whiteSpace: 'nowrap'}}>{prefix}{n}{suffix}</GoldText>
          {sub && <div style={{fontFamily: FONT2, fontWeight: 700, fontSize: 30, color: 'rgba(255,255,255,0.85)', marginTop: 4, ...popStyle(s), transformOrigin: 'left center', height: s > 0.01 ? undefined : 0}}>{sub}</div>}
        </div>
        <Shine progress={sh} />
      </Card>
    </TopBand>
  );
};

/** Myth gets struck through at `strikeAt`, then the fact pops in at `factAt`. */
export const MythFact: React.FC<{dur: number; myth: string; fact: string; strikeAt: number; factAt: number; mythLabel?: string; factLabel?: string}> = ({
  dur, myth, fact, strikeAt, factAt, mythLabel = 'Ramai sangka', factLabel = 'Hakikatnya',
}) => {
  const {v, frame} = useEnvelope(dur);
  const strike = interpolate(frame, [strikeAt, strikeAt + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const f = usePop(factAt, 10);
  const showFact = frame >= factAt;
  const fit = (t: string, max: number, room: number) => Math.min(max, Math.floor(room / (0.68 * t.length)));
  return (
    <TopBand v={v}>
      <Card style={{padding: '18px 34px', width: 880, position: 'relative', overflow: 'hidden', textAlign: 'center', borderColor: showFact ? 'rgba(43,213,118,0.8)' : undefined}}>
        {!showFact ? (
          <>
            <Label size={24} color="#FF8A8E">{mythLabel}</Label>
            <div style={{position: 'relative', display: 'inline-block', marginTop: 4}}>
              <div style={{fontWeight: 900, fontSize: fit(myth, 52, 800), lineHeight: 1.1, whiteSpace: 'nowrap', opacity: 1 - 0.4 * strike}}>{myth}</div>
              <div style={{position: 'absolute', left: -8, top: '52%', height: 9, borderRadius: 5, background: RED, width: `calc(${strike * 100}% + 16px)`, boxShadow: '0 0 14px rgba(229,72,77,0.8)'}} />
            </div>
          </>
        ) : (
          <div style={popStyle(f)}>
            <Label size={24} color={GREEN}>{factLabel}</Label>
            <GoldText size={fit(fact, 58, 800)} style={{whiteSpace: 'nowrap'}}>{fact}</GoldText>
          </div>
        )}
      </Card>
    </TopBand>
  );
};

/** A vs B with a pulsing VS badge; each side pops at its own time; optional winner highlight. */
export const VsCard: React.FC<{dur: number; a: {top: string; main: string; at: number}; b: {top: string; main: string; at: number}; winner?: 'a' | 'b'; winAt?: number}> = ({
  dur, a, b, winner, winAt = 99999,
}) => {
  const {v} = useEnvelope(dur);
  const frame = useCurrentFrame();
  const w = interpolate(frame, [winAt, winAt + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const side = (it: {top: string; main: string; at: number}, key: 'a' | 'b') => {
    const p = interpolate(frame - it.at, [0, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(2))});
    const win = winner === key ? w : 0;
    const lose = winner && winner !== key ? w : 0;
    return (
      <Card style={{textAlign: 'center', padding: '16px 18px', width: 340, ...popStyle(p), opacity: Math.min(1, p * 1.5) * (1 - 0.45 * lose),
        borderColor: win ? `rgba(43,213,118,${0.4 + 0.5 * win})` : undefined, boxShadow: win ? `0 0 ${40 * win}px rgba(43,213,118,0.55)` : undefined}}>
        <Label size={22} color={win ? GREEN : GOLD_SOLID}>{it.top}</Label>
        <div style={{fontWeight: 900, fontSize: Math.min(44, Math.floor(300 / (0.66 * it.main.length))), marginTop: 4, lineHeight: 1.1, whiteSpace: 'nowrap'}}>{it.main}</div>
      </Card>
    );
  };
  const vp = interpolate(frame - Math.min(a.at, b.at), [0, 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(3))});
  return (
    <TopBand v={v}>
      <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
        {side(a, 'a')}
        <div style={{width: 78, height: 78, borderRadius: 39, background: 'linear-gradient(180deg,#FFF1B8,#F2C14E 50%,#B07A1F)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 32, color: '#2a1a00', flexShrink: 0, transform: `scale(${vp * (1 + 0.05 * Math.sin(frame / 4))}) rotate(${(1 - vp) * -90}deg)`, boxShadow: '0 8px 24px rgba(0,0,0,0.5)'}}>VS</div>
        {side(b, 'b')}
      </div>
    </TopBand>
  );
};

/** Hook: big question with words landing one by one (kinetic), each at its own local frame. */
export const KineticHook: React.FC<{dur: number; label?: string; words: {text: string; at: number; gold?: boolean}[]; size?: number}> = ({dur, label, words, size = 64}) => {
  const {v} = useEnvelope(dur);
  const frame = useCurrentFrame();
  const lp = usePop(0);
  return (
    <TopBand v={v}>
      <Card style={{padding: '16px 30px', maxWidth: 900, textAlign: 'center'}}>
        {label && <Label size={24} color={GOLD_SOLID} style={popStyle(lp)}>{label}</Label>}
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', columnGap: 16, marginTop: 4}}>
          {words.map((w, i) => {
            const p = interpolate(frame - w.at, [0, 7], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(2.2))});
            const style: React.CSSProperties = {display: 'inline-block', opacity: Math.min(1, p * 1.6), transform: `translateY(${(1 - p) * 26}px) scale(${0.7 + 0.3 * p})`, whiteSpace: 'nowrap'};
            return w.gold
              ? <GoldText key={i} size={size} style={style}>{w.text}</GoldText>
              : <span key={i} style={{...style, fontFamily: FONT, fontWeight: 900, fontSize: size, lineHeight: 1.05, color: 'white'}}>{w.text}</span>;
          })}
        </div>
      </Card>
    </TopBand>
  );
};

/** Row of pills (tags) popping one by one under a label — for lists like "ASB · Tabung Haji · Emas". */
export const PillRow: React.FC<{dur: number; label: string; pills: {text: string; at: number; bad?: boolean; good?: boolean}[]}> = ({dur, label, pills}) => {
  const {v} = useEnvelope(dur);
  const frame = useCurrentFrame();
  return (
    <TopBand v={v}>
      <Card style={{padding: '18px 30px', maxWidth: 900, textAlign: 'center'}}>
        <Label size={24} color={GOLD_SOLID}>{label}</Label>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginTop: 12}}>
          {pills.map((p, i) => {
            const k = interpolate(frame - p.at, [0, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(2))});
            return (
              <div key={i} style={{...popStyle(k), padding: '10px 20px', borderRadius: 18, fontWeight: 900, fontSize: 32, whiteSpace: 'nowrap',
                background: p.good ? 'rgba(43,213,118,0.2)' : p.bad ? 'rgba(229,72,77,0.2)' : 'rgba(255,255,255,0.12)',
                border: `3px solid ${p.good ? GREEN : p.bad ? RED : 'rgba(247,215,116,0.6)'}`}}>{p.text}</div>
            );
          })}
        </div>
      </Card>
    </TopBand>
  );
};

/* ---------- title intro: cinematic hook title for the first seconds (top band, never over the face) ---------- */
/** Flash + gold line sweep, tag drops in, line 1 slams in (blur→sharp), line 2 (gold) slams in, shine, gentle float. */
export const TitleIntro: React.FC<{dur: number; tag: string; line1: string; line2: string; l2At?: number}> = ({dur, tag, line1, line2, l2At = 14}) => {
  const {v, frame} = useEnvelope(dur, 10);
  const ease = (a: number, b: number) => interpolate(frame, [a, b], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const line = ease(0, 10);
  const tagP = usePop(3, 10);
  const slam = (at: number) => {
    const k = interpolate(frame - at, [0, 7], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(1.8))});
    return {opacity: Math.min(1, k * 2), transform: `scale(${1.7 - 0.7 * k})`, filter: `blur(${(1 - Math.min(1, k)) * 14}px)`};
  };
  const fit = (t: string, max: number) => Math.min(max, Math.floor(860 / (0.7 * t.length)));
  const sh = interpolate(frame, [l2At + 6, l2At + 32], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const float = Math.sin(frame / 14) * 3;
  const glow = interpolate(frame, [l2At, l2At + 10, l2At + 30], [0, 1, 0.35], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <TopBand v={v}>
      <div style={{position: 'relative', width: 920, transform: `translateY(${float}px)`}}>
        {/* gold line sweeping out from the centre */}
        <div style={{position: 'absolute', left: '50%', top: -10, height: 6, borderRadius: 3, width: 900 * line, transform: 'translateX(-50%)', background: 'linear-gradient(90deg,transparent,#F7D774,#FFF1B8,#F7D774,transparent)', boxShadow: '0 0 24px rgba(247,215,116,0.9)'}} />
        <Card style={{padding: "14px 26px 16px", textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: `0 18px 50px rgba(0,0,0,0.45), 0 0 ${60 * glow}px rgba(247,215,116,${0.55 * glow})`}}>
          <div style={{display: 'inline-block', background: GOLD_SOLID, color: '#2a1a00', borderRadius: 14, padding: '4px 16px', fontFamily: FONT2, fontWeight: 700, fontSize: 24, letterSpacing: 2, textTransform: 'uppercase', ...popStyle(tagP)}}>{tag}</div>
          <div style={{fontFamily: FONT, fontWeight: 900, fontSize: fit(line1, 80), lineHeight: 1.05, color: 'white', marginTop: 8, whiteSpace: 'nowrap', ...slam(6)}}>{line1}</div>
          <div style={{marginTop: 2, ...slam(l2At)}}><GoldText size={fit(line2, 96)} style={{whiteSpace: 'nowrap'}}>{line2}</GoldText></div>
          <Shine progress={sh} />
        </Card>
      </div>
    </TopBand>
  );
};

/** quick full-frame light flash at the very start (transient, 8 frames) */
export const IntroFlash: React.FC = () => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 2, 9], [0, 0.55, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  if (f > 10) return null;
  return <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 22%, rgba(255,241,184,1) 0%, rgba(247,215,116,0.6) 35%, rgba(0,0,0,0) 70%)', opacity: o, pointerEvents: 'none'}} />;
};

/* ---------- proof screenshot cutaway (app balance, chat feedback…) ---------- */
/** Full-frame cutaway: blurred copy of the image as backdrop, framed image fitted inside the safe zone, slow push-in,
 *  optional label above and a pulsing highlight box (normalised x0,y0,x1,y1 of the image) from `hlAt` (output s). */
export const ShotCut: React.FC<{src: string; from: number; to: number; aspect: number; label?: string; hl?: [number, number, number, number]; hlAt?: number}> = (p) => {
  const f0 = sec(p.from); const dur = sec(p.to) - f0;
  if (dur <= 0) return null;
  return (
    <Sequence from={f0} durationInFrames={dur} layout="none">
      <ShotInner {...p} dur={dur} hlF={p.hlAt !== undefined ? sec(p.hlAt) - f0 : 10} />
    </Sequence>
  );
};
const ShotInner: React.FC<{src: string; aspect: number; label?: string; hl?: [number, number, number, number]; dur: number; hlF: number}> = ({src, aspect, label, hl, dur, hlF}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 6, dur - 6, dur], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const pop = interpolate(f, [0, 12], [0.86, 1], {extrapolateRight: 'clamp', easing: Easing.out(Easing.back(1.5))});
  const push = interpolate(f, [0, dur], [1, 1.05]);
  // fit inside x 70..1010 (940 wide) and y 330..1430 (1100 high): inside TikTok/IG safe zones
  const W = Math.min(940, 1100 * aspect); const H = W / aspect;
  const top = 330 + (1100 - H) / 2 + (label ? 30 : 0);
  const k = interpolate(f, [hlF, hlF + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const pulse = 1 + 0.025 * Math.sin((f - hlF) / 4) * k;
  const lp = interpolate(f, [2, 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill style={{opacity: o}}>
      <AbsoluteFill style={{background: '#0b0904'}} />
      <AbsoluteFill style={{backgroundImage: `url(${staticFile(src)})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(40px) brightness(0.4)', transform: 'scale(1.25)'}} />
      {label && (
        <div style={{position: 'absolute', left: 0, right: 0, top: top - 80, textAlign: 'center', opacity: lp, transform: `translateY(${(1 - lp) * -20}px)`}}>
          <span style={{display: 'inline-block', background: GOLD_SOLID, color: '#2a1a00', borderRadius: 16, padding: '8px 24px', fontFamily: FONT2, fontWeight: 700, fontSize: 30, letterSpacing: 2, textTransform: 'uppercase', boxShadow: '0 8px 24px rgba(0,0,0,0.5)'}}>{label}</span>
        </div>
      )}
      <div style={{position: 'absolute', left: 540 - W / 2, top, width: W, height: H, transform: `scale(${pop * push})`, transformOrigin: '50% 40%'}}>
        <Img src={staticFile(src)} style={{width: '100%', height: '100%', borderRadius: 26, boxShadow: '0 30px 80px rgba(0,0,0,0.65)', border: '4px solid rgba(247,215,116,0.85)'}} />
        {hl && (
          <div style={{position: 'absolute', left: hl[0] * W - 8, top: hl[1] * H - 8, width: (hl[2] - hl[0]) * W + 16, height: (hl[3] - hl[1]) * H + 16, borderRadius: 18,
            border: `6px solid ${GOLD_SOLID}`, boxShadow: '0 0 34px rgba(245,200,76,0.95)', opacity: k, transform: `scale(${pulse})`}} />
        )}
      </div>
    </AbsoluteFill>
  );
};

/** Full-frame B-roll clip (muted) with a soft punch-in; cards scheduled after it still render on top. */
export const BrollCut: React.FC<{src: string; from: number; to: number; srcStart?: number}> = ({src, from, to, srcStart = 0}) => {
  const f0 = sec(from); const dur = sec(to) - f0;
  if (dur <= 0) return null;
  return (
    <Sequence from={f0} durationInFrames={dur} layout="none">
      <BrollInner src={src} dur={dur} srcStart={srcStart} />
    </Sequence>
  );
};
const BrollInner: React.FC<{src: string; dur: number; srcStart: number}> = ({src, dur, srcStart}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 5, dur - 5, dur], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const sc = interpolate(f, [0, 8, dur], [1.14, 1.06, 1.0], {extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill style={{opacity: o}}>
      <AbsoluteFill style={{transform: `scale(${sc})`}}>
        <OffthreadVideo src={staticFile(src)} startFrom={sec(srcStart)} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 65%, rgba(0,0,0,0.5) 100%)'}} />
    </AbsoluteFill>
  );
};
