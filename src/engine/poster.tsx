/* Lucky-winner poster rebuilt as crisp vector/text (instead of the low-res 686px JPEG), plus a full-frame cutaway. */
import React from 'react';
import {AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame} from 'remotion';
import '@fontsource/cinzel/700.css';
import '@fontsource/cinzel/900.css';
import {CENTER_X, FONT, FONT2} from './theme';
import {sec} from './timeline';

export type WinnerRow = {type: string; prize: string; winner: string; winnerCode: string; intro: string; introCode: string};

const PW = 1000; // design width; height follows content (~1572)
const COLS = [121, 136, 369, 334];
const GOLD_TXT = 'linear-gradient(180deg,#FFF6CF 0%,#F9DD86 30%,#E2B24A 58%,#B9822A 80%,#F3D27A 100%)';
const RED = '#8E0F14';

const goldText = (size: number, extra: React.CSSProperties = {}): React.CSSProperties => ({
  fontFamily: 'Cinzel, serif', fontWeight: 900, fontSize: size, lineHeight: 1, background: GOLD_TXT,
  WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', filter: 'drop-shadow(0 4px 6px rgba(60,0,0,0.55))', ...extra,
});

/** festive bunting hanging from a curved string */
const Bunting: React.FC<{x0: number; y0: number; x1: number; y1: number; sag: number; n: number; offset?: number}> = ({x0, y0, x1, y1, sag, n, offset = 0}) => {
  const colors = ['#FFD84A', '#9BE15D', '#FF8FB1', '#7EC8FF', '#FFFFFF'];
  const pt = (t: number) => {
    const x = x0 + (x1 - x0) * t;
    const y = y0 + (y1 - y0) * t + sag * 4 * t * (1 - t);
    return [x, y];
  };
  const flags = Array.from({length: n}, (_, i) => {
    const ta = (i + 0.1) / n, tb = (i + 0.9) / n;
    const [ax, ay] = pt(ta), [bx, by] = pt(tb), [mx, my] = pt((ta + tb) / 2);
    return <path key={i} d={`M${ax} ${ay} L${bx} ${by} L${mx} ${my + 62} Z`} fill={colors[(i + offset) % colors.length]} opacity={0.95} />;
  });
  const [cx, cy] = pt(0.5);
  return (
    <g>
      <path d={`M${x0} ${y0} Q${cx} ${2 * cy - (y0 + y1) / 2} ${x1} ${y1}`} stroke="rgba(255,255,255,0.7)" strokeWidth={2} fill="none" />
      {flags}
    </g>
  );
};

export const WinnerPoster: React.FC<{month: string; rows: WinnerRow[]}> = ({month, rows}) => (
  <div style={{width: PW, position: 'relative', overflow: 'hidden', borderRadius: 8, fontFamily: FONT,
    background: 'radial-gradient(ellipse at 50% 22%, #E2262B 0%, #C3151B 35%, #9C0D12 70%, #6E070B 100%)'}}>
    {/* stage glow */}
    <div style={{position: 'absolute', left: -200, right: -200, top: -260, height: 520, background: 'radial-gradient(ellipse at 50% 50%, rgba(255,240,190,0.85) 0%, rgba(255,210,120,0.35) 35%, rgba(255,200,120,0) 70%)'}} />
    <div style={{position: 'absolute', left: -150, right: -150, bottom: -220, height: 420, background: 'radial-gradient(ellipse at 50% 50%, rgba(255,235,210,0.5) 0%, rgba(255,200,160,0) 65%)'}} />
    <svg width={PW} height={260} style={{position: 'absolute', left: 0, top: 0}}>
      <Bunting x0={-20} y0={90} x1={400} y1={20} sag={60} n={8} />
      <Bunting x0={600} y0={20} x1={1020} y1={110} sag={60} n={8} offset={2} />
      <Bunting x0={-20} y0={175} x1={330} y1={110} sag={50} n={6} offset={3} />
      <Bunting x0={670} y0={110} x1={1020} y1={190} sag={50} n={6} offset={1} />
    </svg>

    <div style={{position: 'relative', textAlign: 'center', paddingTop: 165}}>
      <div style={{display: 'inline-flex', alignItems: 'baseline', gap: 4}}>
        <span style={goldText(44, {fontWeight: 700, letterSpacing: 1})}>PUBLIC</span>
        <span style={goldText(72, {fontWeight: 700, fontStyle: 'italic', marginLeft: -6})}>G</span>
        <span style={goldText(44, {fontWeight: 700, letterSpacing: 1})}>OLD</span>
      </div>
      <div style={{...goldText(104, {letterSpacing: 1}), marginTop: 30, whiteSpace: 'nowrap'}}>LUCKY WINNER</div>
      <div style={{fontWeight: 800, fontSize: 50, color: 'white', marginTop: 26, letterSpacing: 1, textShadow: '0 3px 8px rgba(60,0,0,0.5)'}}>GAP AUTO DEBIT CAMPAIGN</div>
      <div style={{fontWeight: 800, fontSize: 50, color: 'white', marginTop: 6, letterSpacing: 2, textShadow: '0 3px 8px rgba(60,0,0,0.5)'}}>({month})</div>
    </div>

    {/* table */}
    <div style={{position: 'relative', margin: '30px 20px 0', background: 'white', borderRadius: 6, overflow: 'hidden', boxShadow: '0 10px 30px rgba(40,0,0,0.45)'}}>
      <div style={{display: 'flex', background: 'linear-gradient(180deg,#FCE7A2 0%,#F3CB63 55%,#D9A43C 100%)', color: RED, fontWeight: 800, fontSize: 17, textAlign: 'center', alignItems: 'center', height: 58}}>
        {['TYPE', 'PRIZE', 'WINNER NAME &\nPG CODE', 'INTRODUCER NAME &\nPG CODE'].map((h, i) => (
          <div key={i} style={{width: COLS[i], whiteSpace: 'pre-line', lineHeight: 1.15, borderRight: i < 3 ? '1px solid rgba(142,15,20,0.25)' : undefined}}>{h}</div>
        ))}
      </div>
      {rows.map((r, k) => {
        const small = r.prize.length > 20;
        const cell = (w: number, c: React.ReactNode, last = false) => (
          <div style={{width: w, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRight: last ? undefined : '1px solid #E4E4E4', padding: '0 6px', boxSizing: 'border-box'}}>{c}</div>
        );
        const person = (name: string, code: string) => (
          <>
            <div style={{fontFamily: FONT2, fontWeight: 500, fontSize: 14.5, color: '#1b1b1b', lineHeight: 1.15, whiteSpace: 'nowrap'}}>{name}</div>
            <div style={{fontFamily: FONT2, fontWeight: 500, fontSize: 14.5, color: '#1b1b1b', lineHeight: 1.15}}>{code}</div>
          </>
        );
        return (
          <div key={k} style={{display: 'flex', height: 42, borderTop: '1px solid #E4E4E4', textAlign: 'center'}}>
            {cell(COLS[0], <div style={{fontWeight: 800, fontSize: 16, color: '#1b1b1b', whiteSpace: 'nowrap'}}>{r.type}</div>)}
            {cell(COLS[1], <div style={{fontFamily: FONT2, fontWeight: 500, fontSize: small ? 10.5 : 14, lineHeight: 1.12, color: '#1b1b1b'}}>{r.prize}</div>)}
            {cell(COLS[2], person(r.winner, r.winnerCode))}
            {cell(COLS[3], person(r.intro, r.introCode), true)}
          </div>
        );
      })}
    </div>
    <div style={{position: 'relative', textAlign: 'center', fontWeight: 800, fontStyle: 'italic', fontSize: 22, color: 'white', padding: '30px 0 42px', letterSpacing: 1}}>*&nbsp;&nbsp;&nbsp;TERMS AND CONDITIONS APPLY</div>
  </div>
);

/** Full-frame poster cutaway: blurred red backdrop, poster pops in centred on x=540, slow push toward the table. */
export const PosterCut: React.FC<{from: number; to: number; month: string; rows: WinnerRow[]}> = ({from, to, month, rows}) => {
  const f0 = sec(from);
  const dur = sec(to) - f0;
  return (
    <Sequence from={f0} durationInFrames={dur} layout="none">
      <PosterInner dur={dur} month={month} rows={rows} />
    </Sequence>
  );
};
const PosterInner: React.FC<{dur: number; month: string; rows: WinnerRow[]}> = ({dur, month, rows}) => {
  const f = useCurrentFrame();
  const opacity = interpolate(f, [0, 5, dur - 5, dur], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const pop = interpolate(f, [0, 10], [0.88, 1], {extrapolateRight: 'clamp', easing: Easing.out(Easing.back(1.6))});
  const push = interpolate(f, [10, dur], [1, 1.07], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad)});
  const s = 0.9 * pop * push; // poster ≈ 900 px wide, whole poster fits the frame
  return (
    <AbsoluteFill style={{opacity}}>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 40%, #7A0A0F 0%, #3A0306 70%, #1A0103 100%)'}} />
      <div style={{position: 'absolute', left: CENTER_X - PW / 2, top: 960, width: PW, transform: `translateY(-50%) scale(${s})`, transformOrigin: '50% 50%', boxShadow: '0 40px 100px rgba(0,0,0,0.6)', borderRadius: 8}}>
        <WinnerPoster month={month} rows={rows} />
      </div>
    </AbsoluteFill>
  );
};
