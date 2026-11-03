/* v4 — Tunggu harga emas paling rendah? */
import React from 'react';
import edlJson from './edl.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline} from '../../engine/timeline';
import {Choices, GItem, IconChartDown, IconChat, IconStore, IconWarn, Schedule, TitleCard} from '../../engine/kit';
import {IconCoin} from '../../engine/ui';

const tl = makeTimeline(edlJson as Edl);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  hook: 0.05,
  hookSub: at('hook', 'mulakan'),
  context: S('context'),
  komen: at('context', 'tunggu'),
  answer: S('answer'),
  jatuh: at('answer', 'jatuh'),
  diskaun: at('answer', 'diskaun'),
  serbu: S('serbu'),
  ramai: at('serbu', 'ramai'),
  whynot: S('whynot'),
  pakar: at('whynot', 'pakar-pakar'),
  grab: at('grab', 'grab'),
  lagi: at('grab', 'andai'),
  better: S('better'),
  rebut: at('better', 'rebut'),
  habis: at('better', 'habis'),
  offer: S('offer'),
  convert: at('offer', 'convert'),
  gap: S('gap'),
  rm100: at('gap', 'rm100'),
  sampai: at('gap', 'sampai'),
};

const ITEMS: GItem[] = [
  {from: M.hook, to: E('hook') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconChartDown size={92} />} label="Berbaloi tak" title="Tunggu harga PALING RENDAH?" gold={false} size={48} sub="baru nak mula / tambah tabungan" subAt={r(M.hookSub)} />
  )},
  {from: M.komen - 0.2, to: E('context') + 0.2, render: (d) => (
    <TitleCard dur={d} icon={<IconChat size={80} />} label="Komen penonton" title="“Tunggu harga turun minimum”" gold={false} size={44} />
  )},
  {from: M.answer + 0.1, to: M.jatuh - 0.15, render: (d) => (
    <TitleCard dur={d} icon={<IconCoin size={86} />} label="Kata guru emas saya" title="Emas = aset MAHAL" size={60} shine />
  )},
  {from: M.jatuh - 0.15, to: E('answer') + 0.2, render: (d, r) => (
    <TitleCard dur={d} icon={<IconChartDown size={86} />} label="Bila harga jatuh" title="PELUANG HARGA DISKAUN" size={54} sub="beli pada harga lebih rendah" subAt={r(M.diskaun)} shine />
  )},
  {from: M.serbu + 0.1, to: E('serbu') + 0.2, render: (d, r) => (
    <TitleCard dur={d} icon={<IconStore size={80} />} label="Beberapa hari ini" title="KEDAI EMAS DISERBU" gold={false} size={54} sub="ramai rebut harga rendah" subAt={r(M.ramai)} />
  )},
  {from: M.whynot + 0.1, to: E('whynot') + 0.2, render: (d, r) => (
    <TitleCard dur={d} icon={<IconWarn size={80} />} label="Kenapa tak tunggu" title="HARGA MINIMUM?" gold={false} size={58} sub="Tiada pakar boleh ramal dengan tepat" subAt={r(M.pakar)} />
  )},
  {from: S('grab') + 0.1, to: E('grab') + 0.2, render: (d, r) => (
    <Choices dur={d} items={[
      {top: 'Harga jatuh', main: 'GRAB peluang', at: r(M.grab), good: true},
      {top: 'Jatuh lagi?', main: 'Tambah lagi', at: r(M.lagi), good: true},
    ]} />
  )},
  {from: M.better + 0.1, to: E('better') + 0.25, render: (d, r) => (
    <Choices dur={d} items={[
      {top: 'Rebut peluang', main: 'Beli masa jatuh', at: r(M.rebut), good: true},
      {top: 'Tunggu minimum', main: 'Duit habis', at: r(M.habis), bad: true},
    ]} />
  )},
  {from: M.offer + 0.1, to: E('offer') + 0.2, render: (d, r) => (
    <TitleCard dur={d} label="Ada lebihan duit 2–3 tahun?" title="MULA TABUNG EMAS" size={60} sub="convert simpanan duit → emas" subAt={r(M.convert)} shine />
  )},
  {from: M.gap + 0.1, to: 9999, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCoin size={90} />} label="Akaun GAP · konsisten" title="SERENDAH RM100" size={66} sub="sampai capai matlamat" subAt={r(M.sampai)} shine />
  )},
];

const Overlays: React.FC<{hq: boolean}> = () => <Schedule items={ITEMS} total={tl.total} />;

const SFX: Sfx[] = [
  {t: M.hook, f: 'whoosh_cine', v: 0.45},
  {t: M.hook + 0.05, f: 'impact_deep', v: 0.25},
  {t: M.hookSub, f: 'pop_msg', v: 0.35},
  {t: M.komen - 0.2, f: 'pop_msg', v: 0.42},
  {t: M.answer, f: 'whoosh_small', v: 0.3},
  {t: M.jatuh - 0.15, f: 'pop_hard', v: 0.38},
  {t: M.diskaun, f: 'coins', v: 0.35},
  {t: M.serbu, f: 'whoosh_small', v: 0.3},
  {t: M.ramai, f: 'money_bag', v: 0.35},
  {t: M.whynot, f: 'whoosh_small', v: 0.3},
  {t: M.pakar, f: 'pop_hard', v: 0.35},
  {t: M.grab, f: 'pop_msg', v: 0.42},
  {t: M.lagi, f: 'pop_msg', v: 0.42},
  {t: M.rebut, f: 'ding_correct', v: 0.33},
  {t: M.habis, f: 'pop_hard', v: 0.35},
  {t: M.offer, f: 'whoosh_cine', v: 0.3},
  {t: M.convert, f: 'sparkle', v: 0.3},
  {t: M.gap, f: 'whoosh_small', v: 0.3},
  {t: M.rm100, f: 'gold_prize', v: 0.4},
];

export const v4: VideoDef = {
  id: 'v4',
  tl,
  Overlays,
  sfx: SFX,
  punches: [M.jatuh, M.serbu + 0.3, M.pakar, M.grab, M.habis, M.rm100],
  zoom: {hook: [1.1], context: [1.0, 1.06], answer: [1.06, 1.0], serbu: [1.08], whynot: [1.0, 1.07], grab: [1.08, 1.0], better: [1.0], offer: [1.07, 1.0], gap: [1.0, 1.06]},
  music: {file: 'bgm.mp3', startAt: 90},
};

export const HargaEmas: React.FC<EditProps> = (p) => <Edit def={v4} {...p} />;
