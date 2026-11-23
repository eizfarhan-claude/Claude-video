/* v11 — volume emas: kumpul gram, bukan kejar harga */
import React from 'react';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {CalcCard, Choices, CtaCard, GItem, GramTimeline, IconChartDown, Schedule, Subtitles, TitleCard, motionBusy} from '../../engine/kit';
import {IconArrowUp, IconCoin} from '../../engine/ui';

const tl = makeTimeline(edlJson as Edl, 15);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  hook: 0.05,
  kaya: at('hook', 'kaya'),
  fokus: at('hook', 'fokus'),
  gram: S('gram'),
  g1: at('gram', '1'),
  g2: at('gram', '2'),
  dinar: at('gram', 'kalau', 1),
  d2: at('gram', '2', 1),
  penting: S('penting'),
  bukan: at('penting', 'bukan'),
  tetapi: at('penting', 'tetapi'),
  contoh: S('contoh'),
  naik: at('contoh', 'naik'),
  satu: at('contoh', '1'),
  tak: at('contoh', 'tak'),
  volume: S('volume'),
  v100: at('volume', '100'),
  v1000: at('volume', '1000'),
  barulah: at('volume', 'barulah'),
  berbanding: at('volume', 'berbanding'),
  kecil: at('volume', 'kecil'),
  cta: S('cta'),
  peluang: at('cta', 'nak'),
  boleh: at('cta', 'boleh'),
  pin: at('cta', 'pin'),
  isi: at('cta', 'isi'),
};

const ITEMS: GItem[] = [
  {from: M.hook, to: E('hook') + 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCoin size={88} />} label="Alang-alang simpan emas" title="BIAR SAMPAI KAYA" size={66} sub="fokus: berapa banyak simpanan" subAt={r(M.fokus)} shine />
  )},
  {from: M.gram + 0.05, to: M.dinar - 0.1, render: (d, r) => (
    <GramTimeline dur={d} label="Setiap bulan, gram mesti bertambah" cols={[
      {top: 'Hari ini', grams: 1, at: r(M.g1)},
      {top: 'Bulan depan', grams: 2, at: r(M.g2), tag: 'pastikan bertambah', tagAt: r(M.g2) + 8},
    ]} />
  )},
  {from: M.dinar - 0.1, to: E('gram') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCoin size={80} />} label="Atau ikut dinar" title="1 DINAR → 2 DINAR" size={58} sub="bulan depan" subAt={r(M.d2)} />
  )},
  {from: M.penting + 0.05, to: M.bukan - 0.1, render: (d) => (
    <TitleCard dur={d} icon={<IconArrowUp size={80} />} label="Yang penting" title="GRAM SENTIASA BERTAMBAH" size={52} />
  )},
  {from: M.bukan - 0.1, to: E('penting') + 0.15, render: (d, r) => (
    <Choices dur={d} items={[
      {top: 'Bukan', main: 'HARGA TINGGI / RENDAH', at: r(M.bukan), bad: true},
      {top: 'Tapi', main: 'BERAPA BANYAK SIMPANAN', at: r(M.tetapi), good: true},
    ]} />
  )},
  {from: M.contoh + 0.05, to: E('contoh') + 0.15, render: (d, r) => (
    <Choices dur={d} items={[
      {top: 'Simpan pada', main: 'RM500', at: r(M.contoh + 0.4)},
      {top: 'Esok naik', main: 'RM1,000', at: r(M.naik)},
      {top: 'Tapi cuma', main: '1 GRAM', sub: '= tak kaya', at: r(M.satu), bad: true},
    ]} />
  )},
  {from: M.volume + 0.05, to: M.v100 - 0.1, render: (d) => (
    <TitleCard dur={d} icon={<IconCoin size={84} />} label="Sebab itu pentingnya" title="VOLUME" size={84} shine />
  )},
  {from: M.v100 - 0.1, to: M.berbanding - 0.1, render: (d, r) => (
    <CalcCard dur={d} label="Volume besar = untung besar" a="100 g" aAt={r(M.v100)} b="RM1,000" bAt={r(M.v1000)} result={100000} rAt={r(M.barulah)} sub="keuntungan besar · lebih kaya" subAt={r(M.barulah) + 20} />
  )},
  {from: M.berbanding - 0.1, to: E('volume') + 0.15, render: (d, r) => (
    <Choices dur={d} items={[
      {top: 'Volume besar · 100 g', main: 'RM100,000', at: 2, good: true},
      {top: 'Volume kecil · 1 g', main: 'RM1,000', at: r(M.kecil), bad: true},
    ]} />
  )},
  {from: M.cta + 0.05, to: M.boleh - 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconChartDown size={80} />} label="Belum mula simpan emas?" title="AMBIL PELUANG HARGA JATUH" size={48} gold sub="mulakan simpanan hari ini" subAt={r(M.peluang)} />
  )},
  {from: M.boleh - 0.1, to: 9999, render: (d, r) => (
    <CtaCard dur={d} head="Nak mula simpan emas?" pin={r(M.pin)} guide={r(M.isi)} guideText="Isi BEG BIRU" />
  )},
];

const SFX: Sfx[] = [
  {t: M.hook, f: 'whoosh_cine', v: 0.45},
  {t: M.hook + 0.05, f: 'impact_deep', v: 0.26},
  {t: M.kaya, f: 'sparkle', v: 0.26},
  {t: M.fokus, f: 'pop_msg', v: 0.32},
  {t: M.gram + 0.05, f: 'whoosh_pop', v: 0.38},
  {t: M.g1, f: 'coins', v: 0.28},
  {t: M.g2, f: 'gold_prize', v: 0.26},
  {t: M.dinar - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.d2, f: 'coins', v: 0.28},
  {t: M.penting + 0.05, f: 'whoosh_pop', v: 0.36},
  {t: M.bukan, f: 'pop_hard', v: 0.34},
  {t: M.tetapi, f: 'ding_correct', v: 0.3},
  {t: M.contoh + 0.05, f: 'whoosh_small', v: 0.28},
  {t: M.naik, f: 'pop_msg', v: 0.32},
  {t: M.satu, f: 'pop_hard', v: 0.36},
  {t: M.volume + 0.05, f: 'whoosh_cine', v: 0.32},
  {t: M.volume + 0.15, f: 'impact_deep', v: 0.22},
  {t: M.v100, f: 'click_select', v: 0.34},
  {t: M.v1000, f: 'click_select', v: 0.34},
  {t: M.barulah, f: 'money_bag', v: 0.32},
  {t: M.berbanding - 0.05, f: 'ding_correct', v: 0.26},
  {t: M.kecil, f: 'pop_hard', v: 0.32},
  {t: M.cta + 0.05, f: 'whoosh_small', v: 0.3},
  {t: M.boleh - 0.1, f: 'whoosh_pop', v: 0.32},
  {t: M.pin, f: 'bell_notif', v: 0.26},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <Schedule items={ITEMS} total={tl.total} />
    <Subtitles words={captionsJson as Word[]} busy={motionBusy(ITEMS, SFX)} />
  </>
);

export const v11: VideoDef = {
  id: 'v11', tl, Overlays, sfx: SFX,
  punches: [M.kaya, M.g2, M.bukan, M.satu, M.tak, M.volume + 0.1, M.barulah],
  zoom: {hook: [1.1], gram: [1.0, 1.06], penting: [1.06, 1.0], contoh: [1.0], volume: [1.07, 1.0], cta: [1.0, 1.08]},
  music: {file: 'bgm.mp3', startAt: 60},
};
export const VolumeEmas: React.FC<EditProps> = (p) => <Edit def={v11} {...p} />;
