/* v15 — Harga emas jatuh: tenang, emas untuk orang yang sabar (jangka panjang) */
import React from 'react';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {ChainCard, Choices, GItem, IconCalendar, IconChartDown, IconGrad, IconShield, IconWarn, IconX, QuoteStack, Schedule, StepCard, Subtitles, TitleCard, WaveIcon, motionBusy} from '../../engine/kit';
import {IconClock, IconCoin} from '../../engine/ui';

const tl = makeTimeline(edlJson as Edl, 30);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  hook: 0.05,
  rendah: at('hook', 'rendah'),
  reaksi: S('reaksi'),
  seronok: at('reaksi', 'seronok'),
  marah: at('reaksi', 'marah'),
  panik: at('reaksi', 'panik'),
  stres: at('reaksi', 'stres'),
  ok1: at('reaksi', 'ok'),
  stress2: at('reaksi', 'stress'),
  faham: S('faham'),
  saham: at('faham', 'saham'),
  sabar: S('sabar'),
  sabarW: at('sabar', 'sabar'),
  tahun: at('sabar', 'tahun'),
  beli: S('beli'),
  dua: at('beli', '2'),
  jadiB: at('beli', 'jadi'),
  tenang: at('beli', 'tenang-tenang'),
  pattern: S('pattern'),
  naik: at('pattern', 'naik'),
  dan: at('pattern', 'dan', 1),
  jangan: at('pattern', 'jangan'),
  kec: S('kecemasan'),
  platform: at('kecemasan', 'emas'),
  cepat: at('kecemasan', 'cepat'),
  kekal: at('kecemasan', 'kekal'),
  panjang: S('panjang'),
  p1: at('panjang', 'panjang', 0),
  p2: at('panjang', 'panjang', 1),
  p3: at('panjang', 'panjang', 2),
  janganF: at('panjang', 'jangan'),
  pendek: S('pendek'),
  jatuhP: at('pendek', 'jatuh'),
  jual: at('pendek', 'jual'),
  rugi: at('pendek', 'rugi'),
  konsep: S('konsep'),
  ilmu: at('konsep', 'ilmu'),
  senyum: S('senyum'),
  senyumW: at('senyum', 'senyum'),
  gembira: at('senyum', 'gembira'),
  kekalkan: at('senyum', 'kekalkan'),
  end: S('end'),
};

const ITEMS: GItem[] = [
  {from: M.hook, to: E('hook') + 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconChartDown size={86} />} label="Hari ni" title="HARGA EMAS JATUH" gold={false} size={62} sub="berbanding harga tertinggi" subAt={r(M.rendah)} />
  )},
  {from: M.reaksi + 0.05, to: M.ok1 - 0.1, render: (d, r) => (
    <ChainCard dur={d} label="Pelbagai reaksi" arrows={false} bad steps={[
      {text: 'SERONOK', at: r(M.seronok)},
      {text: 'MARAH', at: r(M.marah)},
      {text: 'PANIK', at: r(M.panik)},
      {text: 'STRES', at: r(M.stres)},
    ]} />
  )},
  {from: M.ok1 - 0.1, to: E('reaksi') + 0.1, render: (d, r) => (
    <QuoteStack dur={d} label="Biasa dengar…" quotes={[
      {text: 'Panik: terus jual, takut jatuh lagi!', at: r(M.ok1) + 6},
      {text: 'Stres: tak nak turun, nak naik!', at: r(M.stress2)},
    ]} />
  )},
  {from: M.faham + 0.05, to: E('faham') + 0.1, render: (d, r) => (
    <StepCard dur={d} n={1} total={2} title="EMAS BUKAN SAHAM" sub="faham satu benda ni" subAt={10} icon={<IconX size={70} />} />
  )},
  {from: M.sabar + 0.05, to: E('sabar') + 0.1, render: (d, r) => (
    <StepCard dur={d} n={2} total={2} title="BUKAN CEPAT UNTUNG" sub="untuk orang sabar · 2–3 tahun+" subAt={r(M.sabarW)} icon={<IconClock size={70} />} />
  )},
  {from: M.beli + 0.05, to: M.jadiB - 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCalendar size={80} />} label="Beli tahun ni = baru < 12 bulan" title="SIMPAN 2–3 TAHUN+" size={62} sub="baru nampak hasil" subAt={r(M.dua)} />
  )},
  {from: M.jadiB - 0.1, to: E('beli') + 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconShield size={80} />} label="Jatuh mendadak?" title="TENANG-TENANG SAHAJA" size={50} shine />
  )},
  {from: M.pattern + 0.05, to: M.dan - 0.1, render: (d) => (
    <TitleCard dur={d} icon={<WaveIcon size={86} />} label="Pattern harga emas" title="ADA NAIK, ADA TURUN" size={58} />
  )},
  {from: M.dan - 0.1, to: E('pattern') + 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconWarn size={80} />} label="Tak boleh sabar 2–3 tahun?" title="JANGAN SIMPAN EMAS" gold={false} size={56} />
  )},
  {from: M.kec + 0.05, to: M.platform - 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconShield size={80} />} label="Sebaiknya" title="DANA KECEMASAN DULU" size={54} />
  )},
  {from: M.platform - 0.1, to: E('kecemasan') + 0.1, render: (d, r) => (
    <Choices dur={d} items={[
      {top: 'Emas BUKAN untuk', main: 'CEPAT KAYA', sub: 'cepat untung', at: r(M.cepat), bad: true},
      {top: 'Emas untuk', main: 'KEKAL KAYA', sub: 'nilai lebih stabil', at: r(M.kekal), good: true},
    ]} />
  )},
  {from: M.panjang + 0.05, to: E('panjang') + 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCalendar size={80} />} label="Fokus kita" title="JANGKA MASA PANJANG" size={56} sub="jangan fikir jangka pendek" subAt={r(M.janganF)} shine />
  )},
  {from: M.pendek + 0.05, to: E('pendek') + 0.1, render: (d, r) => (
    <ChainCard dur={d} label="Bila fikir jangka pendek…" bad steps={[
      {text: 'HARGA JATUH', at: r(M.jatuhP)},
      {text: 'TAKUT', at: r(M.jatuhP) + 8},
      {text: 'JUAL MURAH', at: r(M.jual)},
      {text: 'RUGI', at: r(M.rugi)},
    ]} />
  )},
  {from: M.konsep + 0.05, to: E('konsep') + 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconGrad size={80} />} label="Faham konsep simpanan" title="SIMPAN DENGAN ILMU" size={58} sub="insyaAllah" subAt={r(M.ilmu)} />
  )},
  {from: M.senyum + 0.05, to: M.kekalkan - 0.1, render: (d, r) => (
    <Choices dur={d} items={[
      {top: 'Harga naik', main: 'SENYUM', at: r(M.senyumW), good: true},
      {top: 'Harga jatuh', main: 'GEMBIRA', at: r(M.gembira), good: true},
    ]} />
  )},
  {from: M.kekalkan - 0.1, to: 9999, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCoin size={88} />} label="Kekalkan kekayaan" title="SIMPAN JANGKA PANJANG" size={54} sub="dalam bentuk simpanan emas" subAt={12} shine />
  )},
];

const SFX: Sfx[] = [
  {t: M.hook, f: 'whoosh_cine', v: 0.42},
  {t: M.hook + 0.05, f: 'impact_deep', v: 0.3},
  {t: M.reaksi + 0.05, f: 'whoosh_small', v: 0.28},
  {t: M.seronok, f: 'pop_msg', v: 0.3},
  {t: M.marah, f: 'pop_msg', v: 0.3},
  {t: M.panik, f: 'pop_hard', v: 0.3},
  {t: M.stres, f: 'pop_hard', v: 0.32},
  {t: M.ok1 + 0.2, f: 'pop_msg', v: 0.32},
  {t: M.stress2, f: 'pop_msg', v: 0.32},
  {t: M.faham + 0.05, f: 'whoosh_pop', v: 0.4},
  {t: M.saham, f: 'pop_hard', v: 0.3},
  {t: M.sabar + 0.05, f: 'whoosh_pop', v: 0.4},
  {t: M.sabarW, f: 'click_select', v: 0.3},
  {t: M.beli + 0.05, f: 'whoosh_small', v: 0.28},
  {t: M.jadiB - 0.1, f: 'whoosh_pop', v: 0.34},
  {t: M.tenang, f: 'sparkle', v: 0.22},
  {t: M.pattern + 0.05, f: 'whoosh_small', v: 0.28},
  {t: M.dan - 0.1, f: 'pop_hard', v: 0.3},
  {t: M.kec + 0.05, f: 'whoosh_pop', v: 0.36},
  {t: M.platform - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.cepat, f: 'pop_hard', v: 0.32},
  {t: M.kekal, f: 'ding_correct', v: 0.28},
  {t: M.panjang + 0.05, f: 'whoosh_cine', v: 0.3},
  {t: M.p2, f: 'click_select', v: 0.3},
  {t: M.p3, f: 'click_select', v: 0.32},
  {t: M.pendek + 0.05, f: 'whoosh_small', v: 0.28},
  {t: M.jatuhP, f: 'pop_hard', v: 0.28},
  {t: M.jual, f: 'pop_hard', v: 0.3},
  {t: M.rugi, f: 'impact_deep', v: 0.24},
  {t: M.konsep + 0.05, f: 'whoosh_pop', v: 0.36},
  {t: M.ilmu, f: 'sparkle', v: 0.22},
  {t: M.senyum + 0.05, f: 'whoosh_small', v: 0.28},
  {t: M.senyumW, f: 'ding_correct', v: 0.26},
  {t: M.gembira, f: 'coins', v: 0.3},
  {t: M.kekalkan - 0.1, f: 'whoosh_cine', v: 0.3},
  {t: M.kekalkan + 0.2, f: 'gold_prize', v: 0.2},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <Schedule items={ITEMS} total={tl.total} />
    <Subtitles words={captionsJson as Word[]} busy={motionBusy(ITEMS, SFX)} />
  </>
);

export const v15: VideoDef = {
  id: 'v15', tl, Overlays, sfx: SFX,
  punches: [M.rendah, M.stres, M.saham, M.sabarW, M.tenang, M.jangan, M.kekal, M.p1, M.p2, M.p3, M.rugi, M.gembira],
  zoom: {hook: [1.12], reaksi: [1.0], faham: [1.06], sabar: [1.0], beli: [1.06, 1.0], pattern: [1.0, 1.06], kecemasan: [1.0, 1.06], panjang: [1.07], pendek: [1.0], konsep: [1.06, 1.0], senyum: [1.0], end: [1.08]},
  music: {file: 'bgm.mp3', startAt: 60},
};
export const HargaTurun: React.FC<EditProps> = (p) => <Edit def={v15} {...p} />;
