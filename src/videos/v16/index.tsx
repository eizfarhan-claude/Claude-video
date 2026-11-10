/* v16 — Cita-cita 1 kilogram emas: menabung sedikit demi sedikit dalam akaun emas GAP */
import React from 'react';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {ChainCard, ChecklistCard, Choices, CtaCard, GItem, GramTimeline, IconRepeat, Schedule, Subtitles, TitleCard, motionBusy} from '../../engine/kit';
import {IconCoin, IconTarget} from '../../engine/ui';

const tl = makeTimeline(edlJson as Edl, 30);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  hook: 0.05,
  d5: at('hook', '5'),
  d10: at('hook', '10'),
  g50: at('hook', '50'),
  g100: at('hook', '100'),
  g250: at('hook', '250'),
  kg: at('hook', 'kilogram'),
  peluang: S('peluang'),
  sedikit: at('peluang', 'sedikit'),
  akaun: S('akaun'),
  gap: at('akaun', 'gap'),
  inilah: at('akaun', 'inilah'),
  serendah: at('akaun', 'serendah'),
  convert: at('akaun', 'convert'),
  contoh: S('contoh'),
  g1: at('contoh', '1'),
  g2: at('contoh', '2'),
  bajet: S('bajet'),
  bajetW: at('bajet', 'bajet'),
  wajib: at('bajet', 'wajib'),
  bulanan: at('bajet', 'bulanan'),
  ikut: at('bajet', 'ikut'),
  lebih: at('bajet', 'lebih'),
  kurang: at('bajet', 'kurang'),
  konsisten: at('bajet', 'konsisten'),
  pegang: at('bajet', 'pegang'),
  b100: at('bajet', '100'),
  b250: at('bajet', '250'),
  bkg: at('bajet', 'kilogram'),
  cta: S('cta'),
  pin: at('cta', 'pin'),
  klik: at('cta', 'klik'),
  sampai: at('cta', 'sampailah'),
};

const ITEMS: GItem[] = [
  {from: M.hook, to: M.d5 - 0.15, render: (d) => (
    <TitleCard dur={d} icon={<IconTarget size={80} />} label="Ramai ada cita-cita" title="EMAS YANG BESAR" size={64} shine />
  )},
  {from: M.d5 - 0.15, to: E('hook') + 0.1, render: (d, r) => (
    <ChainCard dur={d} label="Cita-cita simpanan emas" arrows={false} steps={[
      {text: '5 DINAR', at: r(M.d5)},
      {text: '10 DINAR', at: r(M.d10)},
      {text: '50g', at: r(M.g50)},
      {text: '100g', at: r(M.g100)},
      {text: '250g', at: r(M.g250)},
      {text: '1 KG', at: r(M.kg)},
    ]} />
  )},
  {from: M.peluang + 0.05, to: E('peluang') + 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCoin size={88} />} label="Semua orang berpeluang" title="SEDIKIT DEMI SEDIKIT" size={56} sub="menabung, bukan sekali gus" subAt={r(M.sedikit)} />
  )},
  {from: M.akaun + 0.05, to: M.inilah - 0.3, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCoin size={88} />} label="Cara paling baik" title="AKAUN EMAS GAP" size={66} shine />
  )},
  {from: M.inilah - 0.3, to: E('akaun') + 0.1, render: (d, r) => (
    <ChecklistCard dur={d} label="Akaun emas GAP" rows={[
      {text: 'Menabung serendah RM100', at: r(M.serendah)},
      {text: 'Auto convert jadi gram emas', at: r(M.convert)},
    ]} />
  )},
  {from: M.contoh + 0.05, to: E('contoh') + 0.1, render: (d, r) => (
    <GramTimeline dur={d} label="Contoh" cols={[
      {top: 'Mula hari ni', grams: 1, at: r(M.g1)},
      {top: 'Tambah 2g', grams: 3, at: r(M.g2)},
    ]} />
  )},
  {from: M.bajet + 0.05, to: M.ikut - 0.1, render: (d, r) => (
    <ChecklistCard dur={d} label="Dengan cara ini" rows={[
      {text: 'Tak perlu bajet besar', at: r(M.bajetW)},
      {text: 'Tak wajib setiap bulan', at: r(M.wajib)},
      {text: 'Tiada komitmen bulanan', at: r(M.bulanan)},
    ]} />
  )},
  {from: M.ikut - 0.1, to: M.konsisten - 0.1, render: (d, r) => (
    <Choices dur={d} items={[
      {top: 'Ada lebih', main: 'TABUNG LEBIH', at: r(M.lebih), good: true},
      {top: 'Ada kurang', main: 'SERENDAH RM100', at: r(M.kurang), good: true},
    ]} />
  )},
  {from: M.konsisten - 0.1, to: M.pegang - 0.1, render: (d) => (
    <TitleCard dur={d} icon={<IconRepeat size={80} />} label="Kuncinya" title="KONSISTEN SETIAP BULAN" size={50} />
  )},
  {from: M.pegang - 0.1, to: M.cta, render: (d, r) => (
    <ChainCard dur={d} label="One day, pegang emas fizikal yang besar" steps={[
      {text: '100 GRAM', at: r(M.b100)},
      {text: '250 GRAM', at: r(M.b250)},
      {text: '1 KILOGRAM', at: r(M.bkg)},
    ]} />
  )},
  {from: M.cta, to: 9999, render: (d, r) => (
    <CtaCard dur={d} head="Belum ada akaun emas?" pin={r(M.pin)} guide={r(M.klik)} guideText="Klik link biru" final={r(M.sampai)} finalLabel="Sampai one day" finalTitle="1 KILOGRAM EMAS" />
  )},
];

const SFX: Sfx[] = [
  {t: M.hook, f: 'whoosh_cine', v: 0.42},
  {t: M.hook + 0.05, f: 'impact_deep', v: 0.24},
  {t: M.d5 - 0.15, f: 'whoosh_small', v: 0.26},
  {t: M.d5, f: 'pop_msg', v: 0.3},
  {t: M.d10, f: 'pop_msg', v: 0.3},
  {t: M.g50, f: 'pop_msg', v: 0.3},
  {t: M.g100, f: 'pop_msg', v: 0.3},
  {t: M.g250, f: 'pop_msg', v: 0.3},
  {t: M.kg, f: 'gold_prize', v: 0.24},
  {t: M.peluang + 0.05, f: 'whoosh_pop', v: 0.36},
  {t: M.sedikit, f: 'coins', v: 0.28},
  {t: M.akaun + 0.05, f: 'whoosh_cine', v: 0.32},
  {t: M.akaun + 0.3, f: 'sparkle', v: 0.2},
  {t: M.inilah - 0.3, f: 'whoosh_small', v: 0.26},
  {t: M.serendah + 0.15, f: 'click_select', v: 0.34},
  {t: M.convert + 0.15, f: 'click_select', v: 0.34},
  {t: M.contoh + 0.05, f: 'whoosh_small', v: 0.28},
  {t: M.g1, f: 'coins', v: 0.28},
  {t: M.g2, f: 'coins', v: 0.3},
  {t: M.bajet + 0.05, f: 'whoosh_small', v: 0.28},
  {t: M.bajetW + 0.15, f: 'click_select', v: 0.34},
  {t: M.wajib + 0.15, f: 'click_select', v: 0.34},
  {t: M.bulanan + 0.15, f: 'click_select', v: 0.34},
  {t: M.ikut - 0.1, f: 'whoosh_small', v: 0.26},
  {t: M.lebih, f: 'pop_hard', v: 0.28},
  {t: M.kurang, f: 'pop_hard', v: 0.28},
  {t: M.konsisten - 0.1, f: 'whoosh_pop', v: 0.34},
  {t: M.pegang - 0.1, f: 'whoosh_small', v: 0.26},
  {t: M.b100, f: 'pop_msg', v: 0.3},
  {t: M.b250, f: 'pop_msg', v: 0.3},
  {t: M.bkg, f: 'money_bag', v: 0.3},
  {t: M.cta, f: 'whoosh_cine', v: 0.3},
  {t: M.pin, f: 'bell_notif', v: 0.24},
  {t: M.klik, f: 'click_select', v: 0.34},
  {t: M.sampai, f: 'whoosh_pop', v: 0.32},
  {t: M.sampai + 0.2, f: 'gold_prize', v: 0.22},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <Schedule items={ITEMS} total={tl.total} />
    <Subtitles words={captionsJson as Word[]} busy={motionBusy(ITEMS, SFX, [[M.akaun, M.cta + 2.5]])} />
  </>
);

export const v16: VideoDef = {
  id: 'v16', tl, Overlays, sfx: SFX,
  punches: [M.kg, M.sedikit, M.gap, M.g2, M.konsisten, M.bkg, M.sampai],
  zoom: {hook: [1.1, 1.0], peluang: [1.06], akaun: [1.0, 1.06], contoh: [1.0], bajet: [1.06, 1.0], cta: [1.0, 1.07]},
  music: {file: 'bgm.mp3', startAt: 120},
};
export const SatuKilo: React.FC<EditProps> = (p) => <Edit def={v16} {...p} />;
