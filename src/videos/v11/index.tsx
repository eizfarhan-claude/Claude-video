/* v11 — Zakat emas perhiasan (kadar uruf ikut negeri) */
import React from 'react';
import {AbsoluteFill, Easing, interpolate, Img, Sequence, staticFile, useCurrentFrame} from 'remotion';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, sec, Word} from '../../engine/timeline';
import {Choices, GItem, IconChat, IconRings, IconWarn, Schedule, Subtitles, TitleCard, motionBusy, popStyle} from '../../engine/kit';
import {Card, GoldText, IconCoin, IconPin, Label, Shine, TopBand, useEnvelope, usePop} from '../../engine/ui';
import {FONT2, GOLD_SOLID, GREEN} from '../../engine/theme';

const tl = makeTimeline(edlJson as Edl, 30);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  hook: 0.05,
  kena: at('hook', 'kena', 0),
  tetapi: at('hook', 'tetapi'),
  kena2: at('hook', 'kena', 1),
  save: at('hook', 'save'),
  bd: S('bd'),
  n85: at('bd', '85'),
  tersimpan: at('bd', 'tersimpan'),
  wajib: at('bd', 'wajib'),
  dari: at('bd', 'dari'),
  hias: S('hias'),
  cuma: at('hias', 'cuma'),
  bukan: at('hias', 'bukan'),
  mengikut: at('hias', 'mengikut'),
  semak: S('semak'),
  kadar: at('semak', 'kadar'),
  uruf: S('uruf'),
  melebihi: at('uruf', 'melebihi'),
  barulah: at('uruf', 'barulah'),
  lebih: S('lebih'),
  bukan2: at('lebih', 'bukan'),
  hanya: at('lebih', 'hanya'),
  contoh: S('contoh'),
  selangor: at('contoh', 'selangor'),
  n800: at('contoh', '800'),
  puanA: S('puanA'),
  gelang: at('puanA', 'gelang'),
  total: at('puanA', 'total'),
  n900: at('puanA', '900'),
  uruf2: at('puanA', 'kadar', 0),
  lebih100: at('puanA', '100 gram'),
  darab: at('puanA', 'darab'),
  dikenakan: at('puanA', 'dikenakan'),
  pct: at('puanA', '2.5'),
  tutup: S('tutup'),
  perhiasan3: at('tutup', 'perhiasan'),
  terlebih: at('tutup', 'terlebih'),
  outro: S('outro'),
  follow: at('outro', 'follow'),
};

/* infographic over the frame at 50% opacity (face stays visible through it) */
const IMG_FROM = M.kadar - 0.25, IMG_TO = M.melebihi - 0.1;
const InfoInner: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const fade = interpolate(f, [0, 8, dur - 8, dur], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const pop = interpolate(f, [0, 12], [0.88, 1], {extrapolateRight: 'clamp', easing: Easing.out(Easing.back(1.5))});
  const push = interpolate(f, [0, dur], [1, 1.05]);
  return (
    <AbsoluteFill style={{opacity: 0.5 * fade, alignItems: 'center', justifyContent: 'center'}}>
      <Img src={staticFile('shared/zakat_uruf.png')} style={{width: 1080, transform: `translateY(-40px) scale(${pop * push})`}} />
    </AbsoluteFill>
  );
};
const InfoOverlay: React.FC = () => {
  const f0 = sec(IMG_FROM), dur = sec(IMG_TO) - f0;
  return <Sequence from={f0} durationInFrames={dur} layout="none"><InfoInner dur={dur} /></Sequence>;
};

/* 900g − 800g = 100g, then × harga semasa × 2.5% */
const ZakatCalc: React.FC<{dur: number; aAt: number; bAt: number; rAt: number; xAt: number; pAt: number}> = ({dur, aAt, bAt, rAt, xAt, pAt}) => {
  const {v, frame} = useEnvelope(dur);
  const pa = usePop(aAt), pb = usePop(bAt), pr = usePop(rAt, 9), px = usePop(xAt), pp = usePop(pAt, 9);
  const sh = interpolate(frame, [pAt + 4, pAt + 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const t = (s: string, p: number, c = 'white') => <div style={{fontWeight: 900, fontSize: 52, color: c, whiteSpace: 'nowrap', ...popStyle(p)}}>{s}</div>;
  const op = (s: string, p: number) => <div style={{fontWeight: 800, fontSize: 44, color: 'rgba(255,255,255,0.55)', opacity: p}}>{s}</div>;
  return (
    <TopBand v={v}>
      <Card style={{padding: '16px 30px', position: 'relative', overflow: 'hidden', textAlign: 'center', width: 860, boxSizing: 'border-box'}}>
        <Label size={24} color={GOLD_SOLID}>Kiraan zakat Puan A · Selangor</Label>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 6}}>
          <div style={{textAlign: 'center'}}>{t('900g', pa)}<div style={{fontFamily: FONT2, fontSize: 20, opacity: pa * 0.7}}>perhiasan</div></div>
          {op('−', pb)}
          <div style={{textAlign: 'center'}}>{t('800g', pb, '#ff8a8a')}<div style={{fontFamily: FONT2, fontSize: 20, opacity: pb * 0.7}}>kadar uruf</div></div>
          {op('=', pr)}
          <div style={{textAlign: 'center', ...popStyle(pr)}}><GoldText size={70}>100g</GoldText><div style={{fontFamily: FONT2, fontSize: 20, opacity: 0.8}}>yang lebih</div></div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', gap: 12, marginTop: 8, fontFamily: FONT2, fontWeight: 700, fontSize: 30}}>
          <span style={{...popStyle(px)}}>× harga semasa</span>
          <span style={{...popStyle(pp), color: GREEN}}>× 2.5% = ZAKAT</span>
        </div>
        <Shine progress={sh} />
      </Card>
    </TopBand>
  );
};

const ITEMS: GItem[] = [
  {from: M.hook, to: M.tetapi - 0.05, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCoin size={84} />} label="Ramai dah tahu" title="GOLD BAR & DINAR" size={60} sub="kena bayar zakat" subAt={r(M.kena)} />
  )},
  {from: M.tetapi - 0.05, to: M.kena2 + 1.0, render: (d, r) => (
    <TitleCard dur={d} icon={<IconRings size={84} />} label="Tapi tahu tak?" title="EMAS PERHIASAN PUN" size={56} sub="kena bayar zakat!" subAt={r(M.kena2)} shine />
  )},
  {from: M.save - 0.2, to: E('hook') + 0.15, render: (d) => (
    <TitleCard dur={d} icon={<IconPin size={76} />} label="Jangan lupa" title="SAVE VIDEO NI" gold={false} size={60} sub="untuk rujukan akan datang" subAt={8} />
  )},
  {from: M.bd + 0.05, to: M.wajib - 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCoin size={84} />} label="Gold Bar & Dinar" title="NISAB 85 GRAM" size={62} sub="tersimpan cukup setahun" subAt={r(M.tersimpan)} />
  )},
  {from: M.wajib - 0.1, to: E('bd') + 0.15, render: (d, r) => (
    <TitleCard dur={d} label="Wajib bayar zakat" title="2.5%" size={96} sub="dari nilai semasa" subAt={r(M.dari)} shine />
  )},
  {from: M.hias + 0.05, to: M.cuma - 0.1, render: (d) => (
    <TitleCard dur={d} icon={<IconRings size={84} />} label="Emas perhiasan" title="KENA ZAKAT JUGA" size={60} />
  )},
  {from: M.cuma - 0.1, to: E('hias') + 0.2, render: (d, r) => (
    <Choices dur={d} items={[
      {top: 'Bukan ikut', main: '85 GRAM', at: r(M.bukan), bad: true},
      {top: 'Tetapi ikut', main: 'KADAR URUF', sub: 'negeri masing-masing', at: r(M.mengikut), good: true},
    ]} />
  )},
  {from: M.melebihi - 0.1, to: E('uruf') + 0.2, render: (d, r) => (
    <TitleCard dur={d} icon={<IconWarn size={80} />} label="Pakai melebihi kadar uruf" title="BARU KENA ZAKAT" size={60} />
  )},
  {from: M.hanya - 0.1, to: E('lebih') + 0.15, render: (d) => (
    <TitleCard dur={d} label="Bukan semua · hanya" title="YANG LEBIH SAHAJA" size={62} shine />
  )},
  {from: M.contoh + 0.05, to: E('contoh') + 0.2, render: (d, r) => (
    <TitleCard dur={d} icon={<IconPin size={76} />} label="Contoh · Selangor" title="URUF 800 GRAM" size={64} sub="emas perhiasan" subAt={r(M.n800)} />
  )},
  {from: M.puanA + 0.05, to: M.total - 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconRings size={84} />} label="Contoh" title="PUAN A" size={72} sub="gelang · rantai · subang" subAt={r(M.gelang)} />
  )},
  {from: M.total - 0.1, to: E('puanA') + 0.3, render: (d, r) => (
    <ZakatCalc dur={d} aAt={r(M.n900)} bAt={r(M.uruf2)} rAt={r(M.lebih100)} xAt={r(M.darab)} pAt={r(M.pct)} />
  )},
  {from: M.tutup + 0.05, to: E('tutup') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconWarn size={80} />} label="Bukan Gold Bar & Dinar sahaja" title="PERHIASAN PUN ZAKAT" size={56} sub="kalau dah lebih uruf negeri" subAt={r(M.terlebih)} />
  )},
  {from: M.outro, to: 9999, render: (d, r) => (
    <TitleCard dur={d} icon={<IconChat size={80} />} label="Semoga bermanfaat" title="FOLLOW UNTUK ILMU" gold={false} size={58} sub="emas & simpanan" subAt={r(M.follow)} />
  )},
];

const SFX: Sfx[] = [
  {t: M.hook, f: 'whoosh_cine', v: 0.45},
  {t: M.hook + 0.05, f: 'impact_deep', v: 0.26},
  {t: M.kena, f: 'coins', v: 0.3},
  {t: M.tetapi - 0.05, f: 'whoosh_pop', v: 0.4},
  {t: M.kena2, f: 'pop_hard', v: 0.36},
  {t: M.save - 0.2, f: 'click_select', v: 0.34},
  {t: M.bd + 0.05, f: 'whoosh_pop', v: 0.4},
  {t: M.n85, f: 'gold_prize', v: 0.22},
  {t: M.wajib - 0.1, f: 'whoosh_small', v: 0.3},
  {t: M.wajib + 0.2, f: 'pop_hard', v: 0.32},
  {t: M.hias + 0.05, f: 'whoosh_pop', v: 0.38},
  {t: M.cuma - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.bukan, f: 'pop_msg', v: 0.3},
  {t: M.mengikut, f: 'ding_correct', v: 0.28},
  {t: IMG_FROM, f: 'whoosh_cine', v: 0.36},
  {t: IMG_FROM + 0.25, f: 'sparkle', v: 0.22},
  {t: M.melebihi - 0.1, f: 'whoosh_small', v: 0.3},
  {t: M.hanya - 0.1, f: 'pop_hard', v: 0.32},
  {t: M.contoh + 0.05, f: 'whoosh_pop', v: 0.38},
  {t: M.n800, f: 'click_select', v: 0.34},
  {t: M.puanA + 0.05, f: 'whoosh_pop', v: 0.38},
  {t: M.gelang, f: 'sparkle', v: 0.2},
  {t: M.total - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.n900, f: 'atm_key', v: 0.34},
  {t: M.uruf2, f: 'atm_key', v: 0.34},
  {t: M.lebih100, f: 'ding_correct', v: 0.3},
  {t: M.darab, f: 'click_select', v: 0.32},
  {t: M.pct, f: 'coins', v: 0.32},
  {t: M.tutup + 0.05, f: 'whoosh_cine', v: 0.3},
  {t: M.terlebih, f: 'pop_msg', v: 0.3},
  {t: M.outro, f: 'bell_notif', v: 0.26},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <InfoOverlay />
    <Schedule items={ITEMS} total={tl.total} />
    <Subtitles words={captionsJson as Word[]} busy={motionBusy(ITEMS, SFX, [[IMG_FROM, IMG_TO]])} />
  </>
);

export const v11: VideoDef = {
  id: 'v11', tl, Overlays, sfx: SFX,
  punches: [M.kena2, M.wajib, M.bukan, M.hanya, M.lebih100, M.pct, M.perhiasan3],
  zoom: {hook: [1.1], bd: [1.0], hias: [1.06], semak: [1.0], uruf: [1.0], lebih: [1.07], contoh: [1.0], puanA: [1.04, 1.0], tutup: [1.08], outro: [1.0]},
  music: {file: 'bgm.mp3', startAt: 30},
};
export const ZakatEmas: React.FC<EditProps> = (p) => <Edit def={v11} {...p} />;
