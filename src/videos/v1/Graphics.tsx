import React from 'react';
import {AbsoluteFill, interpolate, Sequence, useCurrentFrame, Easing} from 'remotion';
import {at, FPS, sec, sectionEnd} from './timeline';
import {FONT, FONT2, GOLD_SOLID, GREEN} from '../../engine/theme';
import {
  Card, GoldText, IconArrowUp, IconBank, IconCard, IconCheck, IconClock, IconCoin, IconPin, IconTarget, IconTruck,
  Label, Shine, TopBand, useEnvelope, usePop,
} from '../../engine/ui';

type Ev = Record<string, number>; // local frame events
type GP = {dur: number; ev: Ev};

const rel = (from: number, t: number) => sec(t) - sec(from);
const pop = (p: number): React.CSSProperties => ({
  transform: `scale(${0.6 + 0.4 * p})`,
  opacity: Math.min(1, p * 1.5),
});

/* 1. HOOK — RM8,000 -> RM11,700 counter */
const PriceJump: React.FC<GP> = ({dur, ev}) => {
  const {v, frame} = useEnvelope(dur);
  const pOld = usePop(ev.old);
  const pNew = usePop(ev.now);
  const pBadge = usePop(ev.badge, 9);
  const count = interpolate(frame, [ev.now, ev.countEnd], [8000, 11700], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
  });
  return (
    <TopBand v={v}>
      <Card style={{display: 'flex', alignItems: 'center', gap: 26, padding: '24px 34px', position: 'relative'}}>
        <div style={{textAlign: 'center', ...pop(pOld)}}>
          <Label size={24}>2 tahun lepas</Label>
          <div style={{fontWeight: 900, fontSize: 64, color: 'rgba(255,255,255,0.75)', textDecoration: pNew > 0.5 ? 'line-through' : 'none', textDecorationColor: '#E5484D', textDecorationThickness: 6}}>
            RM8,000
          </div>
        </div>
        <div style={{opacity: pNew, transform: `translateX(${(1 - pNew) * -30}px)`}}>
          <IconArrowUp size={58} />
        </div>
        <div style={{textAlign: 'center', ...pop(pNew)}}>
          <Label size={24} color={GOLD_SOLID}>Hari ini</Label>
          <GoldText size={78}>RM{Math.round(count / 10) * 10 >= 11700 ? '11,700' : Math.round(count).toLocaleString('en-US')}</GoldText>
        </div>
        <div
          style={{
            position: 'absolute', right: -26, top: -30, background: GREEN, color: '#04210f', fontWeight: 900, fontSize: 38,
            padding: '6px 18px', borderRadius: 18, transform: `rotate(8deg) scale(${pBadge})`, boxShadow: '0 8px 20px rgba(0,0,0,0.35)',
          }}
        >
          +46%
        </div>
      </Card>
    </TopBand>
  );
};

/* 2+3. "5 DINAR = ? GRAM" -> reveal 21.25 GRAM */
const GramReveal: React.FC<GP> = ({dur, ev}) => {
  const {v, frame} = useEnvelope(dur);
  const reveal = usePop(ev.reveal, 10);
  const wobble = Math.sin(frame / 4) * 8 * (1 - reveal);
  const shine = interpolate(frame, [ev.reveal + 4, ev.reveal + 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <TopBand v={v}>
      <Card style={{display: 'flex', alignItems: 'center', gap: 22, position: 'relative', overflow: 'hidden', padding: '20px 36px'}}>
        <IconCoin size={80} />
        <div style={{fontWeight: 900, fontSize: 52, color: 'white', whiteSpace: 'nowrap'}}>5 DINAR =</div>
        <div style={{position: 'relative', minWidth: 370, height: 110, display: 'flex', alignItems: 'center'}}>
          <div style={{position: 'absolute', fontWeight: 900, fontSize: 96, color: GOLD_SOLID, opacity: 1 - reveal, transform: `rotate(${wobble}deg)`}}>
            ? g
          </div>
          <div style={{position: 'absolute', ...pop(reveal), transformOrigin: 'left center'}}>
            <span style={{whiteSpace: 'nowrap'}}><GoldText size={84}>21.25</GoldText>
            <GoldText size={44} style={{marginLeft: 8}}>GRAM</GoldText></span>
          </div>
        </div>
        <Shine progress={shine} />
      </Card>
    </TopBand>
  );
};

/* 4. CASH TUNAI RM11,700 + CASH & CARRY stamp */
const CashCarry: React.FC<GP> = ({dur, ev}) => {
  const {v} = useEnvelope(dur);
  const stamp = usePop(ev.stamp, 8);
  return (
    <TopBand v={v}>
      <div style={{position: 'relative'}}>
        <Card style={{textAlign: 'center', padding: '22px 46px'}}>
          <Label size={26}>Ada cash tunai?</Label>
          <GoldText size={96}>RM11,700</GoldText>
        </Card>
        <div
          style={{
            position: 'absolute', right: -40, bottom: -34, fontFamily: FONT, fontWeight: 900, fontSize: 40, color: '#04210f',
            background: GREEN, padding: '8px 22px', borderRadius: 14, border: '4px solid white',
            transform: `rotate(-7deg) scale(${stamp === 0 ? 0 : 2.2 - 1.2 * stamp})`, opacity: stamp, boxShadow: '0 10px 24px rgba(0,0,0,0.4)',
          }}
        >
          CASH &amp; CARRY
        </div>
      </div>
    </TopBand>
  );
};

/* 5. Bayar penuh -> Hantar ke rumah */
const Delivery: React.FC<GP> = ({dur, ev}) => {
  const {v, frame} = useEnvelope(dur);
  const a = usePop(ev.a);
  const b = usePop(ev.b);
  const truckX = interpolate(frame, [ev.b, ev.b + 20], [-60, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(1.6))});
  const chip = (icon: React.ReactNode, top: string, bottom: string, p: number, extra?: React.CSSProperties) => (
    <Card style={{display: 'flex', alignItems: 'center', gap: 16, padding: '18px 24px', ...pop(p), ...extra}}>
      {icon}
      <div>
        <Label size={22}>{top}</Label>
        <div style={{fontWeight: 900, fontSize: 38, whiteSpace: 'nowrap'}}>{bottom}</div>
      </div>
    </Card>
  );
  return (
    <TopBand v={v}>
      <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
        {chip(<IconCard size={58} color={GOLD_SOLID} />, 'Step 1', 'Bayar penuh', a)}
        <div style={{fontSize: 54, color: GOLD_SOLID, fontWeight: 900, opacity: b}}>›</div>
        {chip(<div style={{transform: `translateX(${truckX}px)`}}><IconTruck size={58} color={GOLD_SOLID} /></div>, 'Step 2', 'Hantar ke rumah', b)}
      </div>
    </TopBand>
  );
};

/* 6. Bajet kecil? -> Akaun GAP serendah RM100 */
const GapStart: React.FC<GP> = ({dur, ev}) => {
  const {v} = useEnvelope(dur);
  const q = usePop(0);
  const ans = usePop(ev.ans, 10);
  return (
    <TopBand v={v}>
      <Card style={{display: 'flex', alignItems: 'center', gap: 24, padding: '22px 34px'}}>
        <div style={{...pop(q), textAlign: 'center'}}>
          <Label size={24}>Bajet kecil?</Label>
          <div style={{fontWeight: 900, fontSize: 52}}>Akaun GAP</div>
        </div>
        <div style={{width: 4, alignSelf: 'stretch', background: 'rgba(247,215,116,0.4)', borderRadius: 2, opacity: ans}} />
        <div style={{...pop(ans), textAlign: 'center'}}>
          <Label size={24} color={GOLD_SOLID}>serendah</Label>
          <GoldText size={88}>RM100</GoldText>
        </div>
      </Card>
    </TopBand>
  );
};

/* 7. Akaun Bank = RM  vs  Akaun GAP = gram emas */
const BankVsGap: React.FC<GP> = ({dur, ev}) => {
  const {v} = useEnvelope(dur);
  const a = usePop(ev.a);
  const b = usePop(ev.b);
  const row = (icon: React.ReactNode, name: string, unit: React.ReactNode, p: number, hl: boolean) => (
    <div style={{display: 'flex', alignItems: 'center', gap: 18, ...pop(p), transformOrigin: 'left center', opacity: p * (hl ? 1 : 0.85)}}>
      {icon}
      <div style={{fontWeight: 800, fontSize: 40, width: 270}}>{name}</div>
      <div style={{fontSize: 40, color: 'rgba(255,255,255,0.6)'}}>→</div>
      {unit}
    </div>
  );
  return (
    <TopBand v={v}>
      <Card style={{display: 'flex', flexDirection: 'column', gap: 14, padding: '22px 34px'}}>
        {row(<IconBank size={56} />, 'Akaun bank', <div style={{fontWeight: 900, fontSize: 52}}>RM</div>, a, false)}
        {row(<IconCoin size={56} />, 'Akaun GAP', <GoldText size={52}>gram emas</GoldText>, b, true)}
      </Card>
    </TopBand>
  );
};

/* 8. Progress bar 0 -> 21.25 g, unlock 5 dinar */
const Unlock: React.FC<GP> = ({dur, ev}) => {
  const {v, frame} = useEnvelope(dur);
  const fill = interpolate(frame, [ev.fill0, ev.fill1], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)});
  const done = usePop(ev.done, 9);
  const shine = interpolate(frame, [ev.done, ev.done + 24], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <TopBand v={v}>
      <Card style={{width: 800, padding: '22px 32px', position: 'relative', overflow: 'hidden'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
          <Label size={24}>Simpanan akaun GAP</Label>
          <div style={{fontWeight: 900, fontSize: 44, color: GOLD_SOLID}}>{(fill * 21.25).toFixed(2)} g</div>
        </div>
        <div style={{height: 34, borderRadius: 17, background: 'rgba(255,255,255,0.12)', marginTop: 12, overflow: 'hidden'}}>
          <div style={{width: `${fill * 100}%`, height: '100%', borderRadius: 17, background: 'linear-gradient(90deg,#B07A1F,#F7D774,#FFF1B8)', boxShadow: '0 0 24px rgba(247,215,116,0.8)'}} />
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 16, ...pop(done), transformOrigin: 'left center'}}>
          <IconCheck size={50} />
          <div style={{fontWeight: 900, fontSize: 38, whiteSpace: 'nowrap'}}>
            Cukup 21.25 g = <span style={{color: GOLD_SOLID}}>keluarkan 5 DINAR</span>
          </div>
        </div>
        <Shine progress={shine} />
      </Card>
    </TopBand>
  );
};

/* 9. Bajet besar vs bajet kecil */
const Budget: React.FC<GP> = ({dur, ev}) => {
  const {v} = useEnvelope(dur);
  const a = usePop(ev.a);
  const b = usePop(ev.b);
  const col = (top: string, main: string, sub: string, p: number) => (
    <Card style={{textAlign: 'center', padding: '18px 26px', width: 380, ...pop(p)}}>
      <Label size={24} color={GOLD_SOLID}>{top}</Label>
      <div style={{fontWeight: 900, fontSize: 44, marginTop: 4}}>{main}</div>
      <div style={{fontFamily: FONT2, fontWeight: 500, fontSize: 26, color: 'rgba(255,255,255,0.75)', marginTop: 4}}>{sub}</div>
    </Card>
  );
  return (
    <TopBand v={v}>
      <div style={{display: 'flex', gap: 20}}>
        {col('Bajet besar', 'Terus beli', 'cash & carry', a)}
        {col('Bajet kecil', 'Menabung', 'sedikit demi sedikit', b)}
      </div>
    </TopBand>
  );
};

/* 10. Target simpanan + tempoh */
const Target: React.FC<GP> = ({dur, ev}) => {
  const {v, frame} = useEnvelope(dur);
  const a = usePop(ev.a);
  const b = usePop(ev.b);
  const floatY = Math.sin(frame / 22) * 4;
  return (
    <TopBand v={v} y={floatY}>
      <Card style={{display: 'flex', flexDirection: 'column', gap: 12, padding: '22px 34px'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18, ...pop(a), transformOrigin: 'left center'}}>
          <IconTarget size={60} />
          <div>
            <Label size={22}>Target simpanan</Label>
            <GoldText size={64}>RM11k – RM12k</GoldText>
          </div>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 18, ...pop(b), transformOrigin: 'left center', height: b > 0.01 ? undefined : 0}}>
          <IconClock size={56} color={GOLD_SOLID} />
          <div style={{fontWeight: 900, fontSize: 46}}>
            dalam <span style={{color: GOLD_SOLID}}>2 – 3 tahun</span>
          </div>
        </div>
      </Card>
    </TopBand>
  );
};

/* 11. CTA */
const Cta: React.FC<GP> = ({dur, ev}) => {
  const {v, frame} = useEnvelope(dur, 6);
  const head = usePop(0);
  const pin = usePop(ev.pin, 9);
  const guide = usePop(ev.guide);
  const final = usePop(ev.final, 10);
  const phase2 = frame >= ev.final;
  const pulse = 1 + Math.sin(frame / 5) * 0.03 * pin;
  return (
    <TopBand v={v}>
      {!phase2 ? (
        <Card style={{textAlign: 'center', padding: '20px 36px'}}>
          <div style={{fontWeight: 900, fontSize: 50, ...pop(head)}}>Nak mula simpan emas?</div>
          <div style={{display: 'flex', gap: 16, justifyContent: 'center', marginTop: 14}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 10, background: GOLD_SOLID, color: '#2a1a00', borderRadius: 18, padding: '10px 20px', fontWeight: 900, fontSize: 32, whiteSpace: 'nowrap', ...pop(pin), transform: `scale(${(0.6 + 0.4 * pin) * pulse})`}}>
              <IconPin size={36} color="#2a1a00" /> Tengok PIN VIDEO
            </div>
            <div style={{display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.14)', borderRadius: 18, padding: '10px 20px', fontWeight: 800, fontSize: 30, whiteSpace: 'nowrap', ...pop(guide)}}>
              Guide step by step
            </div>
          </div>
        </Card>
      ) : (
        <Card style={{display: 'flex', alignItems: 'center', gap: 22, padding: '22px 36px', ...pop(final)}}>
          <IconCoin size={96} />
          <div>
            <Label size={24} color={GOLD_SOLID}>Simpanan fizikal pertama</Label>
            <GoldText size={70}>5 DINAR EMAS</GoldText>
          </div>
        </Card>
      )}
    </TopBand>
  );
};

/* ------------------------------------------------------------------------------------ */
type Item = {from: number; to: number; C: React.FC<GP>; ev: (from: number) => Ev};
const ITEMS: Item[] = [
  {from: 0.05, to: sectionEnd('hook') + 0.15, C: PriceJump, ev: (f) => ({old: rel(f, 0.25), now: rel(f, at('hook', 'hari')), countEnd: rel(f, at('hook', 'rm11,700') + 0.45), badge: rel(f, at('hook', 'rm11,700') + 0.55)})},
  {from: at('question', 'anda'), to: sectionEnd('weight') + 0.6, C: GramReveal, ev: (f) => ({reveal: rel(f, at('weight', '21.25'))})},
  {from: at('body', 'rm11,700') - 0.1, to: at('body', 'maksudnya') - 0.05, C: CashCarry, ev: (f) => ({stamp: rel(f, at('body', 'cash', 1))})},
  {from: at('body', 'maksudnya'), to: at('body', 'tapi') - 0.05, C: Delivery, ev: (f) => ({a: rel(f, at('body', 'bayar')), b: rel(f, at('body', 'dihantar'))})},
  {from: at('body', 'tapi') + 0.5, to: at('body', 'cuma') - 0.1, C: GapStart, ev: (f) => ({ans: rel(f, at('body', 'serendah'))})},
  {from: at('body', 'cuma'), to: at('body', 'jadi', 0) - 0.05, C: BankVsGap, ev: (f) => ({a: rel(f, at('body', 'bank', 1)), b: rel(f, at('body', 'gap', 1))})},
  {from: at('body', 'jadi', 0), to: at('body', 'tengok') - 0.05, C: Unlock, ev: (f) => ({fill0: rel(f, at('body', '21.25') - 0.2), fill1: rel(f, at('body', 'anda', 1)), done: rel(f, at('body', 'keluarkan'))})},
  {from: at('body', 'tengok'), to: sectionEnd('body') + 0.2, C: Budget, ev: (f) => ({a: rel(f, at('body', 'besar')), b: rel(f, at('body', 'kecil', 1))})},
  {from: at('target', 'simpanan') - 0.3, to: sectionEnd('target') + 0.3, C: Target, ev: (f) => ({a: rel(f, at('target', 'rm11,000')), b: rel(f, at('target', '2'))})},
  {from: at('cta', 'jadi') + 0.3, to: 999, C: Cta, ev: (f) => ({pin: rel(f, at('cta', 'pin')), guide: rel(f, at('cta', 'guide')), final: rel(f, at('cta', 'miliki'))})},
];

export const Graphics: React.FC<{total: number}> = ({total}) => (
  <AbsoluteFill>
    {ITEMS.map(({from, to, C, ev}, i) => {
      const f0 = sec(from);
      const dur = Math.min(sec(to), total) - f0;
      return (
        <Sequence key={i} from={f0} durationInFrames={dur} layout="none">
          <C dur={dur} ev={ev(from)} />
        </Sequence>
      );
    })}
  </AbsoluteFill>
);

/** moments for SFX + zoom punches, exported so audio and camera stay in sync with graphics */
export const MOMENTS = {
  hookOpen: 0,
  rm8000: at('hook', 'rm8,000'),
  countStart: at('hook', 'hari'),
  rm11700: at('hook', 'rm11,700') + 0.45,
  question: at('question', 'anda'),
  gramReveal: at('weight', '21.25'),
  cash: at('body', 'rm11,700') - 0.1,
  carry: at('body', 'cash', 1),
  delivery: at('body', 'maksudnya'),
  pay: at('body', 'bayar'),
  ship: at('body', 'dihantar'),
  gap: at('body', 'tapi') + 0.5,
  rm100: at('body', 'serendah'),
  bankCmp: at('body', 'cuma'),
  bankRow: at('body', 'bank', 1),
  gapRow: at('body', 'gap', 1),
  unlockCard: at('body', 'jadi', 0),
  fill: at('body', '21.25') - 0.2,
  unlocked: at('body', 'keluarkan'),
  budget: at('body', 'tengok'),
  big: at('body', 'besar'),
  small: at('body', 'kecil', 1),
  target: at('target', 'simpanan') - 0.3,
  targetAmt: at('target', 'rm11,000'),
  years: at('target', '2'),
  cta: at('cta', 'jadi') + 0.3,
  pin: at('cta', 'pin'),
  guide: at('cta', 'guide'),
  final: at('cta', 'miliki'),
};
export {FPS};
