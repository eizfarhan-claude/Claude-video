/* Reusable motion-graphic cards. All render inside the top band (above the head, inside TikTok/IG safe zone). */
import React from 'react';
import {AbsoluteFill, Easing, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {FONT2, GOLD_SOLID, GREEN} from './theme';
import {BandCtx, BandPos, Card, GoldText, IconCheck, IconCoin, IconPin, Label, Shine, TopBand, useEnvelope, usePop} from './ui';
import {Word} from './timeline';
import {useVideoConfig, spring} from 'remotion';
import {BOTTOM_BAND, FONT, SAFE} from './theme';
import {sec} from './timeline';

export const popStyle = (p: number): React.CSSProperties => ({transform: `scale(${0.6 + 0.4 * p})`, opacity: Math.min(1, p * 1.5)});

/* ---------- extra icons ---------- */
type IP = {size?: number; color?: string};
export const IconPlane: React.FC<IP> = ({size = 64, color = GOLD_SOLID}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill={color}>
    <path d="M60 30c0-2-2-3-4-3H40L26 6h-6l7 21H14l-5-7H4l3 12-3 12h5l5-7h13l-7 21h6l14-21h16c2 0 4-1 4-3z" />
  </svg>
);
export const IconCalendar: React.FC<IP> = ({size = 64, color = 'white'}) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <rect x="6" y="12" width="52" height="46" rx="7" fill="none" stroke={color} strokeWidth="5" />
    <rect x="6" y="12" width="52" height="13" rx="6" fill={color} />
    <rect x="17" y="4" width="6" height="14" rx="3" fill={color} />
    <rect x="41" y="4" width="6" height="14" rx="3" fill={color} />
  </svg>
);
export const IconLeak: React.FC<IP> = ({size = 64}) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <rect x="6" y="14" width="46" height="34" rx="7" fill="#E5484D" />
    <rect x="38" y="24" width="18" height="14" rx="4" fill="#B3262B" />
    <path d="M18 48 q3 6 0 10 q-3-4 0-10z M30 50 q3 5 0 9 q-3-4 0-9z" fill="#7cc7ff" />
  </svg>
);
export const IconRepeat: React.FC<IP> = ({size = 64, color = 'white'}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 28a20 20 0 0 1 36-10l4 4" />
    <path d="M50 10v12H38" />
    <path d="M54 36a20 20 0 0 1-36 10l-4-4" />
    <path d="M14 54V42h12" />
  </svg>
);
export const IconGift: React.FC<IP> = ({size = 64, color = GOLD_SOLID}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill={color}>
    <rect x="6" y="22" width="52" height="12" rx="3" />
    <rect x="10" y="34" width="44" height="24" rx="3" />
    <rect x="29" y="22" width="6" height="36" fill="#2a1a00" />
    <path d="M32 22c-6-12-20-12-16-2 2 4 10 2 16 2zm0 0c6-12 20-12 16-2-2 4-10 2-16 2z" />
  </svg>
);
export const IconShield: React.FC<IP> = ({size = 64, color = GREEN}) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <path d="M32 4l24 9v17c0 15-10 25-24 30C18 55 8 45 8 30V13z" fill={color} />
    <path d="M20 32l8 8 16-17" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const IconWarn: React.FC<IP> = ({size = 64}) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <path d="M32 5l29 52H3z" fill="#F5A524" />
    <rect x="29" y="22" width="6" height="20" rx="3" fill="#2a1a00" />
    <circle cx="32" cy="49" r="3.5" fill="#2a1a00" />
  </svg>
);

export const IconChartDown: React.FC<IP> = ({size = 64}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 6v52h52" stroke="rgba(255,255,255,0.7)" strokeWidth="4" />
    <path d="M12 16l12 12 9-6 12 16 9 6" stroke="#E5484D" strokeWidth="6" />
    <path d="M46 46h10V36" stroke="#E5484D" strokeWidth="6" />
  </svg>
);
export const IconChat: React.FC<IP> = ({size = 64, color = 'white'}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill={color}>
    <path d="M8 8h48a4 4 0 0 1 4 4v30a4 4 0 0 1-4 4H26L14 58V46H8a4 4 0 0 1-4-4V12a4 4 0 0 1 4-4z" />
    <circle cx="20" cy="27" r="4" fill="#111" /><circle cx="32" cy="27" r="4" fill="#111" /><circle cx="44" cy="27" r="4" fill="#111" />
  </svg>
);
export const IconStore: React.FC<IP> = ({size = 64, color = 'white'}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill={color}>
    <path d="M6 22l6-14h40l6 14z" /><rect x="10" y="26" width="44" height="32" rx="2" />
    <rect x="26" y="38" width="12" height="20" fill="#111" />
  </svg>
);

/* ---------- generic cards (each lives in its own <Sequence>, times are local frames) ---------- */

/** icon + small label + big line (gold or white), optional sub-line popping in at `subAt` */
export const TitleCard: React.FC<{
  dur: number; icon?: React.ReactNode; label?: string; title: string; gold?: boolean; size?: number;
  sub?: React.ReactNode; subAt?: number; shine?: boolean;
}> = ({dur, icon, label, title, gold = true, size = 64, sub, subAt = 0, shine}) => {
  const {v, frame} = useEnvelope(dur);
  const p = usePop(0);
  const s = usePop(subAt);
  const sh = interpolate(frame, [4, 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  // auto-fit title to one line (Montserrat 900 ≈ 0.68em per glyph)
  const room = icon ? 690 : 800;
  const fit = Math.min(size, Math.floor(room / (0.68 * title.length)));
  return (
    <TopBand v={v}>
      <Card style={{display: 'flex', alignItems: 'center', gap: 22, padding: '20px 34px', position: 'relative', overflow: 'hidden', maxWidth: 900}}>
        {icon && <div style={popStyle(p)}>{icon}</div>}
        <div>
          {label && <Label size={24} color={GOLD_SOLID}>{label}</Label>}
          {gold ? <GoldText size={fit} style={{whiteSpace: 'nowrap'}}>{title}</GoldText> : <div style={{fontWeight: 900, fontSize: fit, lineHeight: 1.05, whiteSpace: 'nowrap'}}>{title}</div>}
          {sub && (
            <div style={{fontFamily: FONT2, fontWeight: 700, fontSize: 30, color: 'rgba(255,255,255,0.85)', marginTop: 6, ...popStyle(s), transformOrigin: 'left center', height: s > 0.01 ? undefined : 0}}>
              {sub}
            </div>
          )}
        </div>
        {shine && <Shine progress={sh} />}
      </Card>
    </TopBand>
  );
};

/** Numbered step with a stepper (1..total) underneath */
export const StepCard: React.FC<{dur: number; n: number; total: number; title: string; sub?: React.ReactNode; subAt?: number; icon?: React.ReactNode}> = ({
  dur, n, total, title, sub, subAt = 0, icon,
}) => {
  const {v} = useEnvelope(dur);
  const p = usePop(0, 10);
  const s = usePop(subAt);
  return (
    <TopBand v={v}>
      <Card style={{display: 'flex', alignItems: 'center', gap: 22, padding: '18px 30px', width: 860}}>
        <div style={{width: 96, height: 96, borderRadius: 26, background: 'linear-gradient(180deg,#FFF1B8,#F2C14E 50%,#B07A1F)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 58, color: '#2a1a00', flexShrink: 0, ...popStyle(p)}}>
          {n}
        </div>
        <div style={{flex: 1, minWidth: 0}}>
          <div style={{display: 'flex', gap: 8, marginBottom: 8}}>
            {Array.from({length: total}).map((_, i) => (
              <div key={i} style={{height: 8, flex: 1, borderRadius: 4, background: i < n ? GOLD_SOLID : 'rgba(255,255,255,0.18)'}} />
            ))}
          </div>
          <div style={{fontWeight: 900, fontSize: title.length > 20 ? 38 : 44, lineHeight: 1.08, whiteSpace: 'nowrap'}}>{title}</div>
          {sub && (
            <div style={{display: 'flex', alignItems: 'center', gap: 10, fontFamily: FONT2, fontWeight: 700, fontSize: 30, color: GOLD_SOLID, marginTop: 4, ...popStyle(s), transformOrigin: 'left center'}}>
              {sub}
            </div>
          )}
        </div>
        {icon && <div style={{flexShrink: 0, ...popStyle(p)}}>{icon}</div>}
      </Card>
    </TopBand>
  );
};

/** Gold savings bar filling to `target` g, then a success line */
export const GoldProgress: React.FC<{dur: number; label: string; target: number; unit?: string; fill0: number; fill1: number; doneAt: number; done: React.ReactNode}> = ({
  dur, label, target, unit = 'g', fill0, fill1, doneAt, done,
}) => {
  const {v, frame} = useEnvelope(dur);
  const fill = interpolate(frame, [fill0, fill1], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)});
  const d = usePop(doneAt, 9);
  const sh = interpolate(frame, [doneAt, doneAt + 24], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <TopBand v={v}>
      <Card style={{width: 840, padding: '20px 32px', position: 'relative', overflow: 'hidden'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
          <Label size={24}>{label}</Label>
          <div style={{fontWeight: 900, fontSize: 44, color: GOLD_SOLID}}>
            {(fill * target).toFixed(2)} {unit}
          </div>
        </div>
        <div style={{height: 32, borderRadius: 16, background: 'rgba(255,255,255,0.12)', marginTop: 10, overflow: 'hidden'}}>
          <div style={{width: `${fill * 100}%`, height: '100%', borderRadius: 16, background: 'linear-gradient(90deg,#B07A1F,#F7D774,#FFF1B8)', boxShadow: '0 0 24px rgba(247,215,116,0.8)'}} />
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 14, ...popStyle(d), transformOrigin: 'left center', whiteSpace: 'nowrap'}}>
          <IconCheck size={46} />
          <div style={{fontWeight: 900, fontSize: 38}}>{done}</div>
        </div>
        <Shine progress={sh} />
      </Card>
    </TopBand>
  );
};

/** Two (or three) options side by side, each popping at its own time */
export const Choices: React.FC<{dur: number; items: {top: string; main: string; sub?: string; at: number; good?: boolean; bad?: boolean}[]}> = ({dur, items}) => {
  const {v} = useEnvelope(dur);
  const frame = useCurrentFrame();
  return (
    <TopBand v={v}>
      <div style={{display: 'flex', gap: 18}}>
        {items.map((it, i) => {
          const p = interpolate(frame - it.at, [0, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(2))});
          return (
            <Card key={i} style={{textAlign: 'center', padding: '16px 22px', width: items.length > 2 ? 270 : 400, borderColor: it.bad ? 'rgba(229,72,77,0.8)' : it.good ? 'rgba(43,213,118,0.8)' : undefined, ...popStyle(p)}}>
              <Label size={22} color={it.bad ? '#FF8A8E' : it.good ? GREEN : GOLD_SOLID}>{it.top}</Label>
              <div style={{fontWeight: 900, fontSize: items.length > 2 ? 36 : 42, marginTop: 4, lineHeight: 1.1}}>{it.main}</div>
              {it.sub && <div style={{fontFamily: FONT2, fontWeight: 500, fontSize: 25, color: 'rgba(255,255,255,0.75)', marginTop: 4}}>{it.sub}</div>}
            </Card>
          );
        })}
      </div>
    </TopBand>
  );
};

/** Standard closing CTA: header -> PIN VIDEO + guide pills -> optional final gold card */
export const CtaCard: React.FC<{dur: number; head: string; pin: number; guide: number; final?: number; finalLabel?: string; finalTitle?: string; guideText?: string}> = ({
  dur, head, pin, guide, final, finalLabel, finalTitle, guideText = 'Guide step by step',
}) => {
  const {v, frame} = useEnvelope(dur, 6);
  const h = usePop(0);
  const pp = usePop(pin, 9);
  const g = usePop(guide);
  const f = usePop(final ?? 99999, 10);
  const phase2 = final !== undefined && frame >= final;
  const pulse = 1 + Math.sin(frame / 5) * 0.03 * pp;
  return (
    <TopBand v={v}>
      {!phase2 ? (
        <Card style={{textAlign: 'center', padding: '20px 36px'}}>
          <div style={{fontWeight: 900, fontSize: 48, ...popStyle(h)}}>{head}</div>
          <div style={{display: 'flex', gap: 16, justifyContent: 'center', marginTop: 14}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 10, background: GOLD_SOLID, color: '#2a1a00', borderRadius: 18, padding: '10px 20px', fontWeight: 900, fontSize: 32, whiteSpace: 'nowrap', opacity: Math.min(1, pp * 1.5), transform: `scale(${(0.6 + 0.4 * pp) * pulse})`}}>
              <IconPin size={34} color="#2a1a00" /> Tengok PIN VIDEO
            </div>
            <div style={{display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.14)', borderRadius: 18, padding: '10px 20px', fontWeight: 800, fontSize: 30, whiteSpace: 'nowrap', ...popStyle(g)}}>
              {guideText}
            </div>
          </div>
        </Card>
      ) : (
        <Card style={{display: 'flex', alignItems: 'center', gap: 22, padding: '22px 36px', ...popStyle(f)}}>
          <IconCoin size={92} />
          <div>
            <Label size={24} color={GOLD_SOLID}>{finalLabel}</Label>
            <GoldText size={64}>{finalTitle}</GoldText>
          </div>
        </Card>
      )}
    </TopBand>
  );
};

/* ---------- scheduling helpers ---------- */
export type GItem = {from: number; to: number; pos?: BandPos; render: (dur: number, rel: (t: number) => number) => React.ReactNode};

/** Places each item in a Sequence; `rel(t)` converts an output-second to a frame local to that item. */
export const Schedule: React.FC<{items: GItem[]; total: number}> = ({items, total}) => (
  <AbsoluteFill>
    {items.map((it, i) => {
      const f0 = sec(it.from);
      const dur = Math.min(sec(it.to), total) - f0;
      if (dur <= 0) return null;
      return (
        <Sequence key={i} from={f0} durationInFrames={dur} layout="none">
          <BandCtx.Provider value={it.pos ?? 'top'}>{it.render(dur, (t) => sec(t) - f0)}</BandCtx.Provider>
        </Sequence>
      );
    })}
  </AbsoluteFill>
);

/** Full-frame B-roll cutaways; voice keeps running underneath. */
export type BCut = {file: string; from: number; to: number; srcStart: number};
const BClip: React.FC<{c: BCut; dur: number}> = ({c, dur}) => {
  const f = useCurrentFrame();
  const opacity = interpolate(f, [0, 5, dur - 5, dur], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const scale = interpolate(f, [0, 6, dur], [1.18, 1.08, 1.0], {extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill style={{opacity}}>
      <AbsoluteFill style={{transform: `scale(${scale})`}}>
        <OffthreadVideo src={staticFile(c.file)} startFrom={sec(c.srcStart)} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export const BRollTrack: React.FC<{cuts: BCut[]}> = ({cuts}) => (
  <AbsoluteFill>
    {cuts.map((c, i) => {
      const from = sec(c.from);
      const dur = sec(c.to) - from;
      return (
        <Sequence key={i} from={from} durationInFrames={dur} layout="none">
          <BClip c={c} dur={dur} />
        </Sequence>
      );
    })}
  </AbsoluteFill>
);

/** Full-frame cutaway of a still (e.g. a news screenshot): blurred backdrop + framed image, slow push-in. */
export const ImageCut: React.FC<{src: string; from: number; to: number; source?: string}> = ({src, from, to, source}) => {
  const f0 = sec(from);
  const dur = sec(to) - f0;
  return (
    <Sequence from={f0} durationInFrames={dur} layout="none">
      <ImageCutInner src={src} dur={dur} source={source} />
    </Sequence>
  );
};
const ImageCutInner: React.FC<{src: string; dur: number; source?: string}> = ({src, dur, source}) => {
  const f = useCurrentFrame();
  const opacity = interpolate(f, [0, 5, dur - 5, dur], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const pop = interpolate(f, [0, 10], [0.9, 1], {extrapolateRight: 'clamp', easing: Easing.out(Easing.back(1.6))});
  const push = interpolate(f, [0, dur], [1, 1.06]);
  return (
    <AbsoluteFill style={{opacity}}>
      <AbsoluteFill style={{backgroundImage: `url(${staticFile(src)})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(36px) brightness(0.45)', transform: 'scale(1.2)'}} />
      <div style={{position: 'absolute', left: 90, width: 900, top: 500, transform: `scale(${pop * push})`, transformOrigin: '50% 30%'}}>
        <img src={staticFile(src)} style={{width: '100%', borderRadius: 24, boxShadow: '0 30px 80px rgba(0,0,0,0.6)', border: '4px solid rgba(255,255,255,0.9)'}} />
        {source && (
          <div style={{marginTop: 14, fontFamily: FONT2, fontWeight: 700, fontSize: 26, color: 'rgba(255,255,255,0.8)', textAlign: 'right'}}>{source}</div>
        )}
      </div>
    </AbsoluteFill>
  );
};


/* ---------- subtitles: on the chest (below the chin, above TikTok/IG bottom UI); hidden during full-frame image cutaways ---------- */
type Page = {start: number; end: number; words: Word[]};
const makePages = (words: Word[]): Page[] => {
  const pages: Page[] = [];
  let cur: Word[] = [];
  const flush = () => { if (cur.length) pages.push({start: cur[0].start, end: cur[cur.length - 1].end, words: cur}); cur = []; };
  words.forEach((w) => {
    const prev = cur[cur.length - 1];
    const chars = cur.reduce((n, x) => n + x.text.length + 1, 0) + w.text.length;
    if (prev && (cur.length >= 5 || chars > 26 || w.start - prev.end > 0.45 || w.section !== prev.section)) flush();
    cur.push(w);
    if (/[.,?!]$/.test(w.text)) flush();
  });
  flush();
  pages.forEach((p, i) => { const nx = pages[i + 1]; p.end = nx ? Math.min(nx.start, p.end + 0.5) : p.end + 0.5; });
  return pages;
};
const EMPH = /^(rm[\d,.]+|[\d.]+|emas|gram|dinar|gap|umrah|kahwin|hutang|percuma|simpanan|minimum|peluang|diskaun|grab|target)$/i;
const clean = (t: string) => t.replace(/[.,?!]+$/, '').toUpperCase();

export const Subtitles: React.FC<{words: Word[]; busy: [number, number][]}> = ({words, busy}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pages = React.useMemo(() => makePages(words), [words]);
  const t = frame / fps;
  const page = pages.find((p) => t >= p.start - 0.05 && t < p.end);
  if (!page) return null;
  // calm-screen rule: a page is shown only if NOTHING animates during its whole span (no flicker, one focus at a time)
  if (busy.some(([a, b]) => page.start - 0.05 < b && page.end > a)) return null;
  const pf = Math.round((page.start - 0.05) * fps);
  const enter = spring({frame: frame - pf, fps, config: {damping: 15, stiffness: 220, mass: 0.5}});
  return (
    <div style={{position: 'absolute', left: SAFE.left + 10, width: SAFE.right - SAFE.left - 20, top: BOTTOM_BAND.y, height: BOTTOM_BAND.h, display: 'flex', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center', opacity: enter, transform: `translateY(${(1 - enter) * 20}px) scale(${0.92 + 0.08 * enter})`}}>
      {page.words.map((w, i) => {
        const active = t >= w.start - 0.03 && t < (page.words[i + 1]?.start ?? page.end);
        const said = t >= w.start - 0.03;
        const emph = EMPH.test(clean(w.text));
        return (
          <span key={i} style={{fontFamily: FONT, fontWeight: 900, fontSize: 54, lineHeight: 1.18, margin: '0 13px', color: active && emph ? GOLD_SOLID : said ? '#FFFFFF' : 'rgba(255,255,255,0.75)', WebkitTextStroke: '10px rgba(0,0,0,0.95)', paintOrder: 'stroke fill', textShadow: '0 6px 18px rgba(0,0,0,0.5)', display: 'inline-block', transform: `scale(${active ? 1.08 : 1})`}}>
            {clean(w.text)}
          </span>
        );
      })}
    </div>
  );
};
/** top-band busy intervals (seconds) from scheduled items */
export const busyTop = (items: GItem[], total: number): [number, number][] =>
  items.filter((i) => (i.pos ?? 'top') === 'top').map((i) => [i.from, Math.min(i.to, total / 30)] as [number, number]);

/* ---------- phone mockup cutaway (e.g. GAP app screenshot) ---------- */
export const PhoneCut: React.FC<{src: string; from: number; to: number; aspect: number; highlight?: [number, number]; highlightAt?: number; caption?: string}> = (p) => {
  const f0 = sec(p.from); const dur = sec(p.to) - f0;
  return (
    <Sequence from={f0} durationInFrames={dur} layout="none">
      <PhoneInner {...p} dur={dur} f0={f0} />
    </Sequence>
  );
};
const PhoneInner: React.FC<{src: string; aspect: number; highlight?: [number, number]; highlightAt?: number; caption?: string; dur: number; f0: number}> = ({src, aspect, highlight, highlightAt, caption, dur, f0}) => {
  const f = useCurrentFrame();
  const W = 450, H = W / aspect, B = 18;
  const opacity = interpolate(f, [0, 5, dur - 5, dur], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const rise = interpolate(f, [0, 14], [160, 0], {extrapolateRight: 'clamp', easing: Easing.out(Easing.back(1.3))});
  const hlAt = highlightAt !== undefined ? sec(highlightAt) - f0 : 8;
  const hl = interpolate(f, [hlAt, hlAt + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const pulse = 1 + 0.03 * Math.sin((f - hlAt) / 4) * hl;
  const top = 492;
  return (
    <AbsoluteFill style={{opacity}}>
      <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 55%, #3a2a08 0%, #120d03 70%)'}} />
      <AbsoluteFill style={{backgroundImage: `url(${staticFile(src)})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(40px) brightness(0.35)', transform: 'scale(1.2)', opacity: 0.8}} />
      <div style={{position: 'absolute', left: 540 - W / 2 - B, top: top + rise, width: W + 2 * B, height: H + 2 * B, borderRadius: 64, background: '#0b0b0d', boxShadow: '0 40px 90px rgba(0,0,0,0.7), inset 0 0 0 3px #3a3a40', padding: B}}>
        <div style={{position: 'relative', width: W, height: H, borderRadius: 48, overflow: 'hidden', background: 'white'}}>
          <img src={staticFile(src)} style={{width: '100%', display: 'block'}} />
          <div style={{position: 'absolute', top: 10, left: W / 2 - 60, width: 120, height: 30, borderRadius: 16, background: '#0b0b0d'}} />
          {highlight && (
            <div style={{position: 'absolute', left: 8, right: 8, top: highlight[0] * H - 6, height: (highlight[1] - highlight[0]) * H + 12, borderRadius: 14, border: `5px solid ${GOLD_SOLID}`, boxShadow: '0 0 30px rgba(245,200,76,0.9)', opacity: hl, transform: `scale(${pulse})`}} />
          )}
        </div>
      </div>
      {caption && (
        <div style={{position: 'absolute', left: 0, right: 0, top: top + rise + H + 2 * B + 8, textAlign: 'center', fontFamily: FONT2, fontWeight: 700, fontSize: 24, color: 'rgba(255,255,255,0.7)'}}>{caption}</div>
      )}
    </AbsoluteFill>
  );
};

/* ---------- real comment screenshot card ---------- */
export const CommentCard: React.FC<{dur: number; src: string; label?: string}> = ({dur, src, label}) => {
  const {v} = useEnvelope(dur);
  return (
    <TopBand v={v}>
      <div style={{width: 820}}>
        {label && <Label size={24} color={GOLD_SOLID} style={{marginBottom: 8, textShadow: '0 2px 8px rgba(0,0,0,0.8)'}}>{label}</Label>}
        <img src={staticFile(src)} style={{width: '100%', borderRadius: 26, boxShadow: '0 18px 50px rgba(0,0,0,0.5)', border: '3px solid rgba(247,215,116,0.7)'}} />
      </div>
    </TopBand>
  );
};

/** Moments when something on screen moves: card in/out, every SFX-cued pop/transition, plus full-frame cutaways. */
export const motionBusy = (items: GItem[], sfx: {t: number}[], extra: [number, number][] = []): [number, number][] => [
  ...items.flatMap((i) => [[i.from - 0.1, i.from + 0.8], [i.to - 0.4, i.to + 0.1]] as [number, number][]),
  ...sfx.map((s) => [s.t - 0.15, s.t + 0.7] as [number, number]),
  ...extra,
];

/* ---------- v5/v6 additions ---------- */
export const IconX: React.FC<IP> = ({size = 64, color = '#E5484D'}) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="29" fill={color} />
    <path d="M21 21 L43 43 M43 21 L21 43" stroke="white" strokeWidth="7" strokeLinecap="round" />
  </svg>
);
export const IconWallet: React.FC<IP> = ({size = 64, color = 'white'}) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <rect x="5" y="14" width="50" height="40" rx="8" fill="none" stroke={color} strokeWidth="5" />
    <path d="M10 14 L42 5 L46 14" fill="none" stroke={color} strokeWidth="5" strokeLinejoin="round" />
    <rect x="38" y="27" width="22" height="14" rx="5" fill={GOLD_SOLID} />
    <circle cx="46" cy="34" r="3" fill="#2a1a00" />
  </svg>
);

const countUp = (frame: number, at: number, len: number, to: number) =>
  Math.round(to * interpolate(frame, [at, at + len], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)}));
const rm = (n: number) => 'RM' + n.toLocaleString('en-US');

/** Equation that builds up term by term: [a] × [b] = [result counting up], optional sub-line */
export const CalcCard: React.FC<{dur: number; label: string; a: string; aAt: number; b: string; bAt: number; result: number; rAt: number; sub?: string; subAt?: number}> = ({
  dur, label, a, aAt, b, bAt, result, rAt, sub, subAt = 99999,
}) => {
  const {v, frame} = useEnvelope(dur);
  const pa = usePop(aAt), pb = usePop(bAt), pr = usePop(rAt, 9), ps = usePop(subAt);
  const sh = interpolate(frame, [rAt + 6, rAt + 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const term = (t: string, p: number, gold = false) => (
    <div style={{fontWeight: 900, fontSize: 40, color: gold ? GOLD_SOLID : 'white', ...popStyle(p), whiteSpace: 'nowrap'}}>{t}</div>
  );
  const op = (t: string, p: number) => <div style={{fontWeight: 800, fontSize: 36, color: 'rgba(255,255,255,0.55)', opacity: p}}>{t}</div>;
  return (
    <TopBand v={v}>
      <Card style={{padding: '18px 30px', position: 'relative', overflow: 'hidden', textAlign: 'center', width: 840, boxSizing: 'border-box'}}>
        <Label size={24} color={GOLD_SOLID}>{label}</Label>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 8}}>
          {term(a, pa)}{op('×', pb)}{term(b, pb)}{op('=', pr)}
          <div style={{...popStyle(pr), minWidth: 250, textAlign: 'left'}}><GoldText size={58}>{rm(countUp(frame, rAt, 18, result))}</GoldText></div>
        </div>
        {sub && <div style={{fontFamily: FONT2, fontWeight: 700, fontSize: 30, color: 'rgba(255,255,255,0.88)', marginTop: 8, ...popStyle(ps)}}>{sub}</div>}
        <Shine progress={sh} />
      </Card>
    </TopBand>
  );
};

/** Ticked checklist; each row pops + gets its tick at its own time */
export const ChecklistCard: React.FC<{dur: number; label: string; rows: {text: string; at: number; bad?: boolean}[]}> = ({dur, label, rows}) => {
  const {v} = useEnvelope(dur);
  const frame = useCurrentFrame();
  return (
    <TopBand v={v}>
      <Card style={{padding: '16px 34px', width: 760}}>
        <Label size={22} color={GOLD_SOLID}>{label}</Label>
        {rows.map((r, i) => {
          const p = interpolate(frame - r.at, [0, 9], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(2))});
          const tick = interpolate(frame - r.at, [5, 13], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          return (
            <div key={i} style={{display: 'flex', alignItems: 'center', gap: 18, marginTop: 8, opacity: Math.min(1, p * 1.5), transform: `translateX(${(1 - p) * -40}px)`}}>
              <div style={{transform: `scale(${0.4 + 0.6 * tick})`, opacity: tick}}>{r.bad ? <IconX size={46} /> : <IconCheck size={46} />}</div>
              <div style={{fontWeight: 900, fontSize: 42, whiteSpace: 'nowrap'}}>{r.text}</div>
            </div>
          );
        })}
      </Card>
    </TopBand>
  );
};

/** Vicious cycle: nodes light up in turn around a spinning ring */
export const CycleCard: React.FC<{dur: number; label: string; nodes: {text: string; at: number}[]; loopAt: number}> = ({dur, label, nodes, loopAt}) => {
  const {v, frame} = useEnvelope(dur);
  const spin = interpolate(frame, [loopAt, loopAt + 40], [0, 360], {extrapolateLeft: 'clamp', extrapolateRight: 'extend'});
  return (
    <TopBand v={v}>
      <Card style={{display: 'flex', alignItems: 'center', gap: 20, padding: '16px 28px', borderColor: 'rgba(229,72,77,0.75)'}}>
        <svg width={84} height={84} viewBox="0 0 64 64" style={{transform: `rotate(${spin}deg)`, flexShrink: 0}}>
          <path d="M32 6a26 26 0 1 1-24 16" fill="none" stroke="#E5484D" strokeWidth="6" strokeLinecap="round" />
          <path d="M2 18l7 7 6-9z" fill="#E5484D" />
        </svg>
        <div>
          <Label size={22} color="#FF8A8E">{label}</Label>
          <div style={{display: 'flex', alignItems: 'center', gap: 10, marginTop: 6}}>
            {nodes.map((n, i) => {
              const p = interpolate(frame - n.at, [0, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(2))});
              return (
                <React.Fragment key={i}>
                  {i > 0 && <div style={{fontWeight: 900, fontSize: 30, color: '#FF8A8E', opacity: p}}>→</div>}
                  <div style={{fontWeight: 900, fontSize: 30, whiteSpace: 'nowrap', background: 'rgba(229,72,77,0.18)', borderRadius: 14, padding: '6px 12px', ...popStyle(p)}}>{n.text}</div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </Card>
    </TopBand>
  );
};

/** Escalating words (e.g. PERIT → PEDIH → MENJERAT): each slams in bigger + redder, with a small shake */
export const EscalateCard: React.FC<{dur: number; label: string; words: {text: string; at: number}[]}> = ({dur, label, words}) => {
  const {v, frame} = useEnvelope(dur);
  const cur = words.reduce((k, w, i) => (frame >= w.at ? i : k), -1);
  const last = cur >= 0 ? words[cur].at : 0;
  const shake = cur >= 0 ? Math.sin((frame - last) * 2.2) * interpolate(frame - last, [0, 10], [10 + cur * 5, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 0;
  return (
    <TopBand v={v}>
      <div style={{textAlign: 'center', transform: `translateX(${shake}px)`}}>
        <Label size={26} color="rgba(255,255,255,0.85)" style={{textShadow: '0 2px 10px rgba(0,0,0,0.9)'}}>{label}</Label>
        <div style={{display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'center', marginTop: 8}}>
          {words.map((w, i) => {
            const p = interpolate(frame - w.at, [0, 7], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(2.4))});
            const red = ['#FFB547', '#FF7A45', '#E5484D'][Math.min(2, i)];
            return (
              <div key={i} style={{fontFamily: FONT, fontWeight: 900, fontSize: 48 + i * 8, color: red, WebkitTextStroke: '8px rgba(0,0,0,0.9)', paintOrder: 'stroke fill',
                opacity: Math.min(1, p * 1.5) * (i < cur ? 0.55 : 1), transform: `scale(${(2.2 - 1.2 * p)})`, whiteSpace: 'nowrap'}}>
                {w.text}
              </div>
            );
          })}
        </div>
      </div>
    </TopBand>
  );
};

/** Red debt bar draining to zero, then a success line */
export const DebtBar: React.FC<{dur: number; label: string; drain0: number; drain1: number; doneAt: number; done: string}> = ({dur, label, drain0, drain1, doneAt, done}) => {
  const {v, frame} = useEnvelope(dur);
  // drains in small steps ("sedikit demi sedikit")
  const raw = interpolate(frame, [drain0, drain1], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const steps = 6;
  const k = Math.floor(raw * steps), fr = raw * steps - k;
  const paid = Math.min(1, (k + Easing.out(Easing.cubic)(Math.min(1, fr * 2.5))) / steps);
  const d = usePop(doneAt, 9);
  const sh = interpolate(frame, [doneAt, doneAt + 24], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const left = 1 - paid;
  return (
    <TopBand v={v}>
      <Card style={{width: 840, padding: '18px 32px', position: 'relative', overflow: 'hidden'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
          <Label size={24}>{label}</Label>
          <div style={{fontWeight: 900, fontSize: 44, color: left > 0.01 ? '#FF6B6F' : GREEN}}>{Math.round(left * 100)}%</div>
        </div>
        <div style={{height: 30, borderRadius: 15, background: 'rgba(255,255,255,0.12)', marginTop: 10, overflow: 'hidden'}}>
          <div style={{width: `${left * 100}%`, height: '100%', borderRadius: 15, background: 'linear-gradient(90deg,#8E1B1F,#E5484D,#FF8A8E)', boxShadow: '0 0 20px rgba(229,72,77,0.7)'}} />
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 12, ...popStyle(d), transformOrigin: 'left center', whiteSpace: 'nowrap', height: d > 0.01 ? undefined : 0}}>
          <IconCheck size={44} />
          <div style={{fontWeight: 900, fontSize: 38}}>{done}</div>
        </div>
        <Shine progress={sh} />
      </Card>
    </TopBand>
  );
};

/* ---------- v7–v10 additions ---------- */
export const IconGrad: React.FC<IP> = ({size = 64, color = 'white'}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill={color}>
    <path d="M32 10 L62 24 L32 38 L2 24 Z" /><path d="M14 31 v12 c0 6 36 6 36 0 V31 L32 40 Z" />
    <rect x="55" y="24" width="3" height="18" rx="1.5" fill={GOLD_SOLID} /><circle cx="56.5" cy="44" r="3.5" fill={GOLD_SOLID} />
  </svg>
);
export const IconRings: React.FC<IP> = ({size = 64, color = GOLD_SOLID}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="5">
    <circle cx="24" cy="38" r="15" /><circle cx="40" cy="38" r="15" /><path d="M36 10 l4 -5 l4 5 l-4 5z" fill="white" stroke="white" strokeWidth="2" />
  </svg>
);
export const IconHouse: React.FC<IP> = ({size = 64, color = 'white'}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill={color}>
    <path d="M32 6 L60 30 H52 V58 H12 V30 H4 Z" /><rect x="27" y="38" width="10" height="20" fill="#111" />
  </svg>
);
export const IconKid: React.FC<IP> = ({size = 64, color = 'white'}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill={color}>
    <circle cx="32" cy="16" r="10" /><path d="M16 60 V40 c0-10 32-10 32 0 V60 Z" /><rect x="22" y="44" width="20" height="5" rx="2" fill={GOLD_SOLID} />
  </svg>
);
export const IconSun: React.FC<IP> = ({size = 64, color = GOLD_SOLID}) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <circle cx="32" cy="34" r="13" fill={color} />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
      <rect key={a} x="30" y="8" width="4" height="9" rx="2" fill={color} transform={`rotate(${a} 32 34)`} />
    ))}
    <rect x="4" y="54" width="56" height="5" rx="2.5" fill="white" />
  </svg>
);

/** Viewer objections / quotes as chat bubbles, one popping in per `at` */
export const QuoteStack: React.FC<{dur: number; label: string; quotes: {text: string; at: number}[]}> = ({dur, label, quotes}) => {
  const {v} = useEnvelope(dur);
  const frame = useCurrentFrame();
  return (
    <TopBand v={v}>
      <div style={{width: 820}}>
        <Label size={22} color={GOLD_SOLID} style={{textShadow: '0 2px 8px rgba(0,0,0,0.9)', marginBottom: 6}}>{label}</Label>
        {quotes.map((q, i) => {
          const p = interpolate(frame - q.at, [0, 9], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(2))});
          return (
            <div key={i} style={{display: 'flex', justifyContent: i % 2 ? 'flex-end' : 'flex-start', marginTop: 8}}>
              <div style={{background: i % 2 ? 'rgba(245,200,76,0.95)' : 'rgba(255,255,255,0.96)', color: '#16120a', fontFamily: FONT, fontWeight: 800, fontSize: 34,
                padding: '10px 22px', borderRadius: 26, borderBottomLeftRadius: i % 2 ? 26 : 6, borderBottomRightRadius: i % 2 ? 6 : 26,
                boxShadow: '0 10px 26px rgba(0,0,0,0.4)', whiteSpace: 'nowrap', opacity: Math.min(1, p * 1.5), transform: `scale(${0.6 + 0.4 * p})`, transformOrigin: i % 2 ? 'right bottom' : 'left bottom'}}>
                {q.text}
              </div>
            </div>
          );
        })}
      </div>
    </TopBand>
  );
};

/** Life checkpoints along a road: progress line fills to each node as it is mentioned */
export const JourneyCard: React.FC<{dur: number; label: string; nodes: {text: string; icon: React.ReactNode; at: number}[]}> = ({dur, label, nodes}) => {
  const {v, frame} = useEnvelope(dur);
  const n = nodes.length;
  const reached = nodes.reduce((k, nd, i) => (frame >= nd.at ? i : k), -1);
  const prevAt = reached >= 0 ? nodes[reached].at : 0;
  const seg = interpolate(frame - prevAt, [0, 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const fill = reached < 0 ? 0 : Math.max(0, (reached - 1 + seg)) / (n - 1);
  const W = 700, step = W / (n - 1);
  return (
    <TopBand v={v}>
      <Card style={{width: 860, padding: '14px 80px 16px', boxSizing: 'border-box'}}>
        <Label size={22} color={GOLD_SOLID} style={{marginLeft: -50}}>{label}</Label>
        <div style={{position: 'relative', height: 150, marginTop: 6}}>
          <div style={{position: 'absolute', left: 0, right: 0, top: 44, height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.15)'}} />
          <div style={{position: 'absolute', left: 0, width: `${fill * 100}%`, top: 44, height: 8, borderRadius: 4, background: 'linear-gradient(90deg,#B07A1F,#F7D774)', boxShadow: '0 0 16px rgba(247,215,116,0.8)'}} />
          {nodes.map((nd, i) => {
            const p = interpolate(frame - nd.at, [0, 9], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(2.2))});
            const on = frame >= nd.at;
            const cur = i === reached;
            return (
              <div key={i} style={{position: 'absolute', left: i * step - 60, width: 120, top: 0, textAlign: 'center'}}>
                <div style={{width: 96, height: 96, margin: '0 auto', borderRadius: 48, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: on ? (cur ? 'linear-gradient(180deg,#FFF1B8,#F2C14E 50%,#B07A1F)' : 'rgba(245,200,76,0.35)') : 'rgba(40,40,46,0.95)',
                  border: `3px solid ${on ? GOLD_SOLID : 'rgba(255,255,255,0.25)'}`, transform: `scale(${on ? (cur ? 1 + 0.1 * p : 0.86) : 0.72})`,
                  boxShadow: cur ? '0 0 26px rgba(247,215,116,0.9)' : 'none'}}>
                  <div style={{opacity: on ? 1 : 0.35}}>{nd.icon}</div>
                </div>
                <div style={{fontWeight: 900, fontSize: 24, marginTop: 6, color: on ? 'white' : 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap'}}>{nd.text}</div>
              </div>
            );
          })}
        </div>
      </Card>
    </TopBand>
  );
};

/** Same money, two prices: bar of grams grows longer when the price drops */
export const GramCompare: React.FC<{dur: number; label: string; aAt: number; bAt: number; sub?: string; subAt?: number}> = ({dur, label, aAt, bAt, sub, subAt = 99999}) => {
  const {v, frame} = useEnvelope(dur);
  const grow = (at: number, to: number) => to * interpolate(frame - at, [0, 16], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const ps = usePop(subAt);
  const row = (name: string, w: number, at: number, color: string, tag: string) => (
    <div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 10, opacity: interpolate(frame - at, [0, 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
      <div style={{width: 170, fontWeight: 800, fontSize: 26, whiteSpace: 'nowrap'}}>{name}</div>
      <div style={{flex: 1, height: 34, borderRadius: 17, background: 'rgba(255,255,255,0.1)', overflow: 'hidden'}}>
        <div style={{width: `${grow(at, w) * 100}%`, height: '100%', borderRadius: 17, background: color}} />
      </div>
      <div style={{width: 160, fontWeight: 900, fontSize: 24, color: GOLD_SOLID, whiteSpace: 'nowrap', textAlign: 'right'}}>{tag}</div>
    </div>
  );
  return (
    <TopBand v={v}>
      <Card style={{width: 860, padding: '16px 30px', boxSizing: 'border-box'}}>
        <Label size={22} color={GOLD_SOLID}>{label}</Label>
        {row('Harga biasa', 0.5, aAt, 'linear-gradient(90deg,#6b6b73,#a9a9b3)', 'gram')}
        {row('Harga jatuh', 0.85, bAt, 'linear-gradient(90deg,#B07A1F,#F7D774,#FFF1B8)', 'gram LEBIH')}
        {sub && <div style={{fontFamily: FONT2, fontWeight: 700, fontSize: 28, color: 'rgba(255,255,255,0.9)', marginTop: 10, ...popStyle(ps), transformOrigin: 'left center', height: ps > 0.01 ? undefined : 0}}>{sub}</div>}
      </Card>
    </TopBand>
  );
};

/** Gold bars per milestone (e.g. 1 / 5 / 10 years), each rising with a counting gram figure */
export const GramTimeline: React.FC<{dur: number; label: string; cols: {top: string; grams: number; at: number; tag?: string; tagAt?: number}[]}> = ({dur, label, cols}) => {
  const {v, frame} = useEnvelope(dur);
  const max = Math.max(...cols.map((c) => c.grams));
  return (
    <TopBand v={v}>
      <Card style={{width: 860, padding: '12px 30px 14px', boxSizing: 'border-box'}}>
        <Label size={22} color={GOLD_SOLID}>{label}</Label>
        <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: 172, marginTop: 4}}>
          {cols.map((c, i) => {
            const k = interpolate(frame - c.at, [0, 20], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
            const tp = interpolate(frame - (c.tagAt ?? 99999), [0, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
            const h = 18 + 82 * (c.grams / max) * k;
            return (
              <div key={i} style={{width: 240, textAlign: 'center', opacity: frame >= c.at ? 1 : 0.25}}>
                <div style={{fontWeight: 900, fontSize: 40, color: GOLD_SOLID, lineHeight: 1}}>{Math.round(c.grams * k)}g</div>
                <div style={{height: h, width: 86, margin: '6px auto 0', borderRadius: '12px 12px 4px 4px', background: 'linear-gradient(180deg,#FFF1B8,#F7D774 40%,#B07A1F)', boxShadow: k > 0 ? '0 0 20px rgba(247,215,116,0.6)' : 'none'}} />
                <div style={{fontWeight: 900, fontSize: 26, marginTop: 6}}>{c.top}</div>
                <div style={{fontFamily: FONT2, fontWeight: 700, fontSize: 20, color: 'rgba(255,255,255,0.85)', opacity: tp, height: 24, whiteSpace: 'nowrap'}}>{c.tag ?? ''}</div>
              </div>
            );
          })}
        </div>
      </Card>
    </TopBand>
  );
};

/** Self-drawing up/down price line (for "harga naik turun") */
export const WaveIcon: React.FC<{size?: number}> = ({size = 90}) => {
  const f = useCurrentFrame();
  const d = 'M4 44 L14 26 L22 38 L32 14 L40 34 L48 22 L60 48';
  const len = 140;
  const off = len * (1 - interpolate(f, [0, 22], [0, 1], {extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)}));
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4 V60 H60" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />
      <path d={d} stroke={GOLD_SOLID} strokeWidth="5" strokeDasharray={len} strokeDashoffset={off} />
    </svg>
  );
};

/* ---------- v11+ additions ---------- */
/** Cause → effect chain: gold pills joined by arrows, each lighting up when mentioned (the newest one glows). */
export const ChainCard: React.FC<{dur: number; label: string; steps: {text: string; at: number}[]; arrows?: boolean; bad?: boolean}> = ({dur, label, steps, arrows = true, bad = false}) => {
  const {v, frame} = useEnvelope(dur);
  const cur = steps.reduce((k, s, i) => (frame >= s.at ? i : k), -1);
  return (
    <TopBand v={v}>
      <Card style={{width: 900, padding: '16px 22px', boxSizing: 'border-box'}}>
        <Label size={22} color={GOLD_SOLID}>{label}</Label>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12}}>
          {steps.map((s, i) => {
            const p = interpolate(frame - s.at, [0, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(2.2))});
            const on = frame >= s.at;
            const now = i === cur;
            return (
              <React.Fragment key={i}>
                {i > 0 && arrows && (
                  <svg width={30} height={30} viewBox="0 0 30 30" style={{flexShrink: 0, opacity: on ? 1 : 0.25}}>
                    <path d="M4 15 H22 M15 7 L23 15 L15 23" stroke={GOLD_SOLID} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                <div style={{flex: 1, minWidth: 0, textAlign: 'center', padding: '12px 6px', borderRadius: 18, fontWeight: 900, fontSize: 25, lineHeight: 1.1,
                  background: now ? (bad ? 'linear-gradient(180deg,#FF9A9D,#E5484D)' : 'linear-gradient(180deg,#FFF1B8,#F2C14E 50%,#B07A1F)') : on ? 'rgba(245,200,76,0.22)' : 'rgba(255,255,255,0.07)',
                  color: now ? (bad ? 'white' : '#2a1a00') : on ? 'white' : 'rgba(255,255,255,0.3)', border: `2px solid ${on ? GOLD_SOLID : 'rgba(255,255,255,0.15)'}`,
                  boxShadow: now ? '0 0 26px rgba(247,215,116,0.8)' : 'none', transform: `scale(${on ? 0.9 + 0.1 * p : 0.9})`}}>
                  {s.text}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </Card>
    </TopBand>
  );
};
