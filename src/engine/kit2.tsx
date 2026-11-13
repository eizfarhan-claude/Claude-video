/* v11–v13 additions: formula cards, recap list, extra icons. Same rules as kit: top/bottom band only, never on the face. */
import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {FONT2, GOLD_SOLID, GREEN} from './theme';
import {Card, GoldText, Label, Shine, TopBand, useEnvelope, usePop} from './ui';
import {popStyle} from './kit';

type IP = {size?: number; color?: string};

export const IconCar: React.FC<IP> = ({size = 64, color = 'white'}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill={color}>
    <path d="M12 30l5-12c1-2.5 3-4 6-4h18c3 0 5 1.5 6 4l5 12c3 .5 5 3 5 6v10c0 1.7-1.3 3-3 3h-3a3 3 0 0 1-3-3v-2H16v2a3 3 0 0 1-3 3h-3a3 3 0 0 1-3-3V36c0-3 2-5.5 5-6zm6.5-1h27l-3.6-9c-.4-1-1.3-1.5-2.4-1.5H24.5c-1.1 0-2 .5-2.4 1.5zM16 41a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm32 0a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
  </svg>
);

export const IconPiggy: React.FC<IP> = ({size = 64, color = GOLD_SOLID}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill={color}>
    <path d="M50 26c-2-6-9-10-18-10-4 0-7.5.8-10.5 2.2L15 14v9c-3 2.6-5 6-5 10h-4v8h5c1.5 3 4 5.5 7 7v6h8v-4c2 .4 4 .6 6 .6s4-.2 6-.6v4h8v-6.5c3.5-2 6-5 7-8.5h3V26zm-8 6a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
    <rect x="26" y="9" width="12" height="5" rx="2.5" />
  </svg>
);

export const IconFormula: React.FC<IP> = ({size = 64, color = GOLD_SOLID}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth={5} strokeLinecap="round">
    <rect x="8" y="6" width="48" height="52" rx="8" />
    <path d="M18 18h28M20 32l8 8M28 32l-8 8M38 36h10M38 32h10" />
  </svg>
);

/**
 * "GAJI SEBULAN × N = RESULT" built term by term: salary chip, multiplier, result with icon.
 * n/total stepper on top. All `*At` are local frames.
 */
export const FormulaCard: React.FC<{
  dur: number; n: number; total: number; mult: string; multAt: number; result: string; resultAt: number;
  icon: React.ReactNode; base?: string; sub?: string; subAt?: number; good?: boolean;
  /** worked example row: "CONTOH  RM3,000 × mult = RMvalue" (value counts up from exAt) */
  ex?: {salary: number; mult: string; value: number; suffix?: string}; exAt?: number;
}> = ({dur, n, total, mult, multAt, result, resultAt, icon, base = 'GAJI', sub, subAt = 99999, good, ex, exAt = 99999}) => {
  const {v, frame} = useEnvelope(dur);
  const pg = usePop(0, 11), pm = usePop(multAt, 9), pr = usePop(resultAt, 9), ps = usePop(subAt), pe = usePop(exAt, 10);
  const exVal = ex ? Math.round(ex.value * interpolate(frame, [exAt + 4, exAt + 26], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)})) : 0;
  const rm = (x: number) => 'RM' + x.toLocaleString('en-US');
  const sh = interpolate(frame, [resultAt + 4, resultAt + 28], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const chip = (t: string, p: number, gold: boolean) => (
    <div style={{fontWeight: 900, fontSize: 40, padding: '8px 18px', borderRadius: 18, whiteSpace: 'nowrap', background: gold ? 'linear-gradient(180deg,#FFF1B8,#F2C14E 50%,#B07A1F)' : 'rgba(255,255,255,0.14)', color: gold ? '#2a1a00' : 'white', ...popStyle(p)}}>{t}</div>
  );
  const op = (t: string, p: number) => <div style={{fontWeight: 800, fontSize: 40, color: 'rgba(255,255,255,0.6)', opacity: Math.min(1, p * 1.5)}}>{t}</div>;
  const fit = Math.min(52, Math.floor(430 / (0.68 * result.length)));
  return (
    <TopBand v={v}>
      <Card style={{width: 860, boxSizing: 'border-box', padding: '16px 28px', position: 'relative', overflow: 'hidden', borderColor: good ? 'rgba(43,213,118,0.8)' : undefined}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <Label size={22} color={GOLD_SOLID} style={{whiteSpace: 'nowrap'}}>Formula {n}</Label>
          <div style={{display: 'flex', gap: 6, flex: 1}}>
            {Array.from({length: total}).map((_, i) => (
              <div key={i} style={{height: 8, flex: 1, borderRadius: 4, background: i < n ? GOLD_SOLID : 'rgba(255,255,255,0.18)'}} />
            ))}
          </div>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 12}}>
          {chip(base, pg, false)}
          {op('×', pm)}
          {chip(mult, pm, true)}
          {op('=', pr)}
          <div style={{display: 'flex', alignItems: 'center', gap: 10, ...popStyle(pr), transformOrigin: 'left center', minWidth: 0}}>
            <div style={{flexShrink: 0}}>{icon}</div>
            <GoldText size={fit} style={{whiteSpace: 'nowrap'}}>{result}</GoldText>
          </div>
        </div>
        {sub && <div style={{fontFamily: FONT2, fontWeight: 700, fontSize: 28, color: 'rgba(255,255,255,0.85)', marginTop: 8, ...popStyle(ps), transformOrigin: 'left center'}}>{sub}</div>}
        {ex && (
          <div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 12, padding: '8px 16px', borderRadius: 18, background: 'rgba(247,215,116,0.10)', border: '2px solid rgba(247,215,116,0.35)', whiteSpace: 'nowrap', ...popStyle(pe), transformOrigin: 'left center'}}>
            <Label size={20} color={GOLD_SOLID}>Contoh</Label>
            <div style={{fontWeight: 800, fontSize: 32, color: 'rgba(255,255,255,0.9)'}}>{rm(ex.salary)} × {ex.mult} =</div>
            <GoldText size={42}>{rm(exVal)}</GoldText>
            {ex.suffix && <div style={{fontFamily: FONT2, fontWeight: 700, fontSize: 26, color: 'rgba(255,255,255,0.8)'}}>{ex.suffix}</div>}
          </div>
        )}
        <Shine progress={sh} />
      </Card>
    </TopBand>
  );
};

/** Compact recap: rows of "left → right" popping in at their own frame */
export const RecapCard: React.FC<{dur: number; label: string; rows: {l: string; r: string; at: number}[]}> = ({dur, label, rows}) => {
  const {v} = useEnvelope(dur);
  const frame = useCurrentFrame();
  return (
    <TopBand v={v}>
      <Card style={{width: 800, boxSizing: 'border-box', padding: '14px 30px'}}>
        <Label size={22} color={GOLD_SOLID}>{label}</Label>
        {rows.map((r, i) => {
          const p = interpolate(frame - r.at, [0, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(2))});
          return (
            <div key={i} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, opacity: Math.min(1, p * 1.5), transform: `translateX(${(1 - p) * -30}px)`}}>
              <div style={{fontWeight: 900, fontSize: rows.length > 4 ? 30 : 36, color: GOLD_SOLID, whiteSpace: 'nowrap'}}>{r.l}</div>
              <div style={{fontWeight: 800, fontSize: rows.length > 4 ? 30 : 36, whiteSpace: 'nowrap'}}>{r.r}</div>
            </div>
          );
        })}
      </Card>
    </TopBand>
  );
};

/** Big pill line (e.g. a principle) with a check, used for closing statements */
export const PrincipleCard: React.FC<{dur: number; label: string; lines: {text: string; at: number}[]}> = ({dur, label, lines}) => {
  const {v} = useEnvelope(dur);
  const frame = useCurrentFrame();
  return (
    <TopBand v={v}>
      <Card style={{padding: '16px 34px', width: 780, boxSizing: 'border-box', borderColor: 'rgba(43,213,118,0.7)'}}>
        <Label size={22} color={GREEN}>{label}</Label>
        {lines.map((l, i) => {
          const p = interpolate(frame - l.at, [0, 9], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(2))});
          return (
            <div key={i} style={{fontWeight: 900, fontSize: 40, marginTop: 6, whiteSpace: 'nowrap', opacity: Math.min(1, p * 1.5), transform: `translateX(${(1 - p) * -40}px)`}}>
              <span style={{color: GREEN}}>✓</span> {l.text}
            </div>
          );
        })}
      </Card>
    </TopBand>
  );
};

/** Two options with a VS badge; each side pops at its own frame, optional winner highlight */
export const VsCard: React.FC<{dur: number; label?: string; a: {top: string; main: string; at: number}; b: {top: string; main: string; at: number}; winner?: 'a' | 'b'; winAt?: number}> = ({
  dur, label, a, b, winner, winAt = 99999,
}) => {
  const {v} = useEnvelope(dur);
  const pa = usePop(a.at, 10), pb = usePop(b.at, 10), pv = usePop(Math.min(a.at, b.at) + 4, 8), pw = usePop(winAt, 10);
  const side = (s: {top: string; main: string}, p: number, win: boolean) => (
    <Card style={{flex: 1, textAlign: 'center', padding: '14px 16px', ...popStyle(p), borderColor: win ? `rgba(43,213,118,${0.55 + 0.4 * pw})` : undefined, boxShadow: win ? `0 0 ${40 * pw}px rgba(43,213,118,0.55)` : undefined}}>
      <Label size={20} color={win && pw > 0.5 ? GREEN : GOLD_SOLID}>{s.top}</Label>
      <div style={{fontWeight: 900, fontSize: s.main.length > 12 ? 34 : 42, lineHeight: 1.08, marginTop: 4}}>{s.main}</div>
    </Card>
  );
  return (
    <TopBand v={v}>
      <div style={{width: 860}}>
        {label && <Label size={22} color="white" style={{textAlign: 'center', marginBottom: 8, textShadow: '0 2px 10px rgba(0,0,0,0.9)'}}>{label}</Label>}
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          {side(a, pa, winner === 'a')}
          <div style={{width: 74, height: 74, borderRadius: 37, flexShrink: 0, background: 'linear-gradient(180deg,#FFF1B8,#F2C14E 50%,#B07A1F)', color: '#2a1a00', fontWeight: 900, fontSize: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.5)', ...popStyle(pv)}}>VS</div>
          {side(b, pb, winner === 'b')}
        </div>
      </div>
    </TopBand>
  );
};

/** Horizontal bars comparing a percentage range (e.g. spread); each bar grows at its own frame */
export const SpreadCard: React.FC<{dur: number; label: string; rows: {name: string; lo: number; hi: number; at: number; bad?: boolean}[]; max?: number; sub?: string; subAt?: number}> = ({
  dur, label, rows, max = 45, sub, subAt = 99999,
}) => {
  const {v, frame} = useEnvelope(dur);
  const ps = usePop(subAt);
  return (
    <TopBand v={v}>
      <Card style={{width: 860, boxSizing: 'border-box', padding: '14px 28px'}}>
        <Label size={22} color={GOLD_SOLID}>{label}</Label>
        {rows.map((r, i) => {
          const g = interpolate(frame, [r.at, r.at + 16], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
          const col = r.bad ? '#E5484D' : GREEN;
          return (
            <div key={i} style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 8, opacity: Math.min(1, g * 3)}}>
              <div style={{width: 250, fontWeight: 800, fontSize: 25, whiteSpace: 'nowrap'}}>{r.name}</div>
              <div style={{flex: 1, height: 30, borderRadius: 15, background: 'rgba(255,255,255,0.12)', position: 'relative', overflow: 'hidden'}}>
                <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${(g * r.hi / max) * 100}%`, borderRadius: 15, background: `linear-gradient(90deg, ${col}88, ${col})`, boxShadow: `0 0 18px ${col}aa`}} />
              </div>
              <div style={{width: 150, textAlign: 'right', fontWeight: 900, fontSize: 36, color: col, whiteSpace: 'nowrap'}}>{Math.round(g * r.lo)}–{Math.round(g * r.hi)}%</div>
            </div>
          );
        })}
        {sub && <div style={{fontFamily: FONT2, fontWeight: 700, fontSize: 28, color: 'rgba(255,255,255,0.85)', marginTop: 8, ...popStyle(ps), transformOrigin: 'left center'}}>{sub}</div>}
      </Card>
    </TopBand>
  );
};
