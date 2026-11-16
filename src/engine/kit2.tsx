/* v11+ additions: more motion-graphic cards. Same rules as kit.tsx: top band (above head) or bottom band (chest), never the face. */
import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
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
