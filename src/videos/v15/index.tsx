/* v15 — RM10,000 selepas 10 tahun: nombor sama, nilai mengecil */
import React from 'react';
import {Easing, interpolate} from 'remotion';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {CtaCard, GItem, IconChartDown, Schedule, Subtitles, TitleCard, motionBusy, popStyle} from '../../engine/kit';
import {Card, GoldText, IconBank, IconCoin, IconTarget, Label, TopBand, useEnvelope, usePop} from '../../engine/ui';
import {FONT2, GOLD_SOLID} from '../../engine/theme';

const tl = makeTimeline(edlJson as Edl, 15);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  hook: 0.05,
  agak: at('hook', 'agak-agak'),
  n10: at('hook', '10'),
  jawab: S('jawab'),
  nombor: at('jawab', 'nombor'),
  mengecil: at('jawab', 'mengecil'),
  y2016: S('2016'),
  juta: at('2016', 'juta'),
  kg57: at('2016', '5.7'),
  y2026: S('2026'),
  kalau26: at('2026', 'kalau'),
  kg154: at('2026', '1.54'),
  susut: S('susut'),
  menyusut: at('susut', 'menyusutnya'),
  kalauBank: at('susut', 'kalau'),
  emas: S('emas'),
  tukarkan: at('emas', 'tukarkan'),
  gramnya: at('emas', 'gramnya'),
  berubah: at('emas', 'berubah'),
  nilai: S('nilai'),
  tapiN: at('nilai', 'tapi'),
  cta: S('cta'),
  anda: at('cta', 'anda', 1),
  pin: at('cta', 'pin'),
  bantu: at('cta', 'bantu'),
  tukarkanC: at('cta', 'tukarkan'),
};

/** "RM10,000" that stays the same number while the coin behind it shrinks */
const ShrinkCard: React.FC<{dur: number; shrinkAt: number}> = ({dur, shrinkAt}) => {
  const {v, frame} = useEnvelope(dur);
  const p = usePop(0);
  const k = interpolate(frame - shrinkAt, [0, 40], [1, 0.45], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)});
  return (
    <TopBand v={v}>
      <Card style={{display: 'flex', alignItems: 'center', gap: 26, padding: '18px 34px', width: 820, boxSizing: 'border-box'}}>
        <div style={{width: 110, height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{transform: `scale(${k})`, transition: 'none'}}><IconCoin size={110} /></div>
        </div>
        <div style={popStyle(p)}>
          <Label size={24} color={GOLD_SOLID}>Nombor tetap sama</Label>
          <GoldText size={78}>RM10,000</GoldText>
          <div style={{fontFamily: FONT2, fontWeight: 700, fontSize: 30, color: '#FF8A8E', opacity: interpolate(frame - shrinkAt, [0, 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>tapi nilainya semakin mengecil ↓</div>
        </div>
      </Card>
    </TopBand>
  );
};

/** RM1 juta in gold: 2016 vs 2026 (kg bars) */
const KgCompare: React.FC<{dur: number; aAt: number; bAt: number}> = ({dur, aAt, bAt}) => {
  const {v, frame} = useEnvelope(dur);
  const grow = (t: number, to: number) => to * interpolate(frame - t, [0, 18], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const row = (year: string, kg: number, t: number, gold: boolean) => (
    <div style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 12, opacity: interpolate(frame - t, [0, 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
      <div style={{width: 96, fontWeight: 900, fontSize: 34}}>{year}</div>
      <div style={{flex: 1, height: 40, borderRadius: 20, background: 'rgba(255,255,255,0.1)', overflow: 'hidden'}}>
        <div style={{width: `${grow(t, kg / 5.7) * 100}%`, height: '100%', borderRadius: 20, background: gold ? 'linear-gradient(90deg,#B07A1F,#F7D774,#FFF1B8)' : 'linear-gradient(90deg,#8a2a2d,#E5484D)'}} />
      </div>
      <div style={{width: 150, fontWeight: 900, fontSize: 36, color: gold ? GOLD_SOLID : '#FF8A8E', textAlign: 'right'}}>{(grow(t, kg)).toFixed(kg % 1 ? (kg * 10) % 1 ? 2 : 1 : 0)} kg</div>
    </div>
  );
  return (
    <TopBand v={v}>
      <Card style={{width: 860, padding: '16px 30px 20px', boxSizing: 'border-box'}}>
        <Label size={24} color={GOLD_SOLID}>RM1 juta ditukar ke emas</Label>
        {row('2016', 5.7, aAt, true)}
        {row('2026', 1.54, bAt, false)}
      </Card>
    </TopBand>
  );
};

const ITEMS: GItem[] = [
  {from: M.hook, to: M.agak - 0.1, render: (d) => (
    <TitleCard dur={d} icon={<IconBank size={84} />} label="Duit dalam akaun bank" title="RM10,000" size={88} />
  )},
  {from: M.agak - 0.1, to: E('hook') + 0.15, render: (d, r) => (
    <TitleCard dur={d} label="Agak-agak berapa nilainya" title="SELEPAS 10 TAHUN?" gold={false} size={60} />
  )},
  {from: M.nombor - 0.15, to: E('jawab') + 0.2, render: (d, r) => (
    <ShrinkCard dur={d} shrinkAt={r(M.mengecil) - 18} />
  )},
  {from: M.y2016 + 0.05, to: E('2026') + 0.2, render: (d, r) => (
    <KgCompare dur={d} aAt={r(M.kg57)} bAt={r(M.kg154)} />
  )},
  {from: M.susut + 0.05, to: M.kalauBank - 0.1, render: (d) => (
    <TitleCard dur={d} icon={<IconChartDown size={84} />} label="Dalam tempoh 10 tahun" title="NILAI MENYUSUT" gold={false} size={62} />
  )},
  {from: M.emas + 0.05, to: M.gramnya - 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCoin size={84} />} label="Plan jangka panjang?" title="TUKAR KE EMAS" size={66} />
  )},
  {from: M.gramnya - 0.1, to: E('emas') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCoin size={84} />} label="10 tahun akan datang" title="GRAM SAMA, NILAI NAIK" size={52} shine />
  )},
  {from: M.nilai + 0.05, to: E('nilai') + 0.2, render: (d, r) => (
    <TitleCard dur={d} icon={<IconTarget size={80} />} label="Jangan nilaikan dengan angka" title="NILAIKAN APA ANDA MILIKI" size={46} sub="hari ini & 10 tahun akan datang" subAt={r(M.tapiN)} />
  )},
  {from: M.cta + 0.05, to: M.anda - 0.1, render: (d) => (
    <TitleCard dur={d} icon={<IconBank size={80} />} label="Banyak duit dalam bank?" title="TUKAR KE BENTUK SELAMAT" size={48} />
  )},
  {from: M.anda - 0.1, to: 9999, render: (d, r) => (
    <CtaCard dur={d} head="Nak mula?" pin={r(M.pin)} guide={r(M.bantu)} guideText="Saya bantu" final={r(M.tukarkanC) + 10} finalLabel="Kekalkan nilai sampai bila-bila" finalTitle="SIMPANAN EMAS" />
  )},
];

const SFX: Sfx[] = [
  {t: M.hook, f: 'whoosh_cine', v: 0.45},
  {t: M.hook + 0.05, f: 'money_bag', v: 0.28},
  {t: M.agak - 0.1, f: 'whoosh_small', v: 0.3},
  {t: M.n10, f: 'pop_hard', v: 0.32},
  {t: M.nombor - 0.15, f: 'whoosh_pop', v: 0.38},
  {t: M.mengecil - 0.5, f: 'impact_deep', v: 0.26},
  {t: M.y2016 + 0.05, f: 'whoosh_cine', v: 0.32},
  {t: M.kg57, f: 'gold_prize', v: 0.26},
  {t: M.kg154, f: 'impact_deep', v: 0.3},
  {t: M.susut + 0.05, f: 'whoosh_pop', v: 0.38},
  {t: M.emas + 0.05, f: 'whoosh_pop', v: 0.38},
  {t: M.tukarkan, f: 'coins', v: 0.3},
  {t: M.gramnya - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.berubah, f: 'sparkle', v: 0.24},
  {t: M.nilai + 0.05, f: 'whoosh_cine', v: 0.3},
  {t: M.tapiN, f: 'pop_msg', v: 0.3},
  {t: M.cta + 0.05, f: 'whoosh_pop', v: 0.38},
  {t: M.anda - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.pin, f: 'pop_hard', v: 0.34},
  {t: M.bantu, f: 'click_select', v: 0.32},
  {t: M.tukarkanC + 0.33, f: 'gold_prize', v: 0.24},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <Schedule items={ITEMS} total={tl.total} />
    <Subtitles words={captionsJson as Word[]} busy={motionBusy(ITEMS, SFX)} />
  </>
);

export const v15: VideoDef = {
  id: 'v15', tl, Overlays, sfx: SFX,
  punches: [M.n10, M.mengecil, M.kg154, M.menyusut, M.berubah],
  zoom: {hook: [1.1], jawab: [1.0, 1.06], '2016': [1.0, 1.05], '2026': [1.07], susut: [1.0, 1.06], emas: [1.04, 1.0], nilai: [1.08], cta: [1.0, 1.06]},
  music: {file: 'bgm.mp3', startAt: 120},
};
export const NilaiRM10k: React.FC<EditProps> = (p) => <Edit def={v15} {...p} />;
