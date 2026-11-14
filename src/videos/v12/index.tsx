/* v12 — ASB vs Tabung Haji vs Emas: ikut tempoh simpanan */
import React from 'react';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {Choices, GItem, IconChat, Schedule, Subtitles, TitleCard, motionBusy} from '../../engine/kit';
import {IconArrowUp, IconClock, IconCoin, IconPin, IconTarget} from '../../engine/ui';

const tl = makeTimeline(edlJson as Edl, 30);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  hook: 0.05,
  asb: at('hook', 'asb', 0),
  th: at('hook', 'tabung', 0),
  emas: at('hook', 'emas', 0),
  save: at('hook', 'save'),
  faktor: at('faktor', 'faktor'),
  tempoh: at('faktor', 'tempoh'),
  asbS: S('asb'),
  dividen: at('asb', 'dividen', 0),
  pct45: at('asb', '4-5'),
  manakala: at('asb', 'manakala'),
  kenaikan: at('asb', 'kenaikan'),
  pendek: S('pendek'),
  dana: at('pendek', 'dana'),
  tempat: at('pendek', 'tempat'),
  asb2: at('pendek', 'asb'),
  panjang: S('panjang'),
  dua3: at('panjang', '2'),
  emasS: S('emas'),
  n30: at('emas', '30'),
  kenaikan2: at('emas', 'kenaikan'),
  n10: at('emas', '10'),
  kunci: S('kunci'),
  matlamat: at('kunci', 'matlamat'),
  pendek2: at('kunci', 'pendek'),
  panjang2: at('kunci', 'panjang'),
  emas3: at('kunci', 'emas'),
  outro: S('outro'),
};

const ITEMS: GItem[] = [
  {from: M.hook, to: at('hook', 'bagi') - 0.05, render: (d, r) => (
    <Choices dur={d} items={[
      {top: 'Pilihan 1', main: 'ASB', at: r(M.asb)},
      {top: 'Pilihan 2', main: 'TABUNG HAJI', at: r(M.th)},
      {top: 'Pilihan 3', main: 'EMAS', at: r(M.emas), good: true},
    ]} />
  )},
  {from: M.save - 0.2, to: E('hook') + 0.15, render: (d) => (
    <TitleCard dur={d} icon={<IconPin size={76} />} label="Jangan lupa" title="SAVE VIDEO NI" gold={false} size={60} sub="untuk rujukan akan datang" subAt={8} />
  )},
  {from: M.faktor - 0.1, to: E('faktor') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconClock size={80} />} label="1 faktor yang ramai terlepas pandang" title="TEMPOH SIMPANAN" size={62} shine />
  )},
  {from: M.asbS + 0.05, to: E('asb') + 0.15, render: (d, r) => (
    <Choices dur={d} items={[
      {top: 'ASB & Tabung Haji', main: 'DIVIDEN 4–5%', sub: 'setiap tahun', at: r(M.dividen)},
      {top: 'Emas', main: 'TIADA DIVIDEN', sub: 'tapi harga naik jangka panjang', at: r(M.manakala)},
    ]} />
  )},
  {from: M.pendek + 0.05, to: M.tempat - 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconClock size={80} />} label="Simpanan jangka pendek" title="1 – 2 TAHUN" size={72} sub="dana kecemasan · matlamat dekat" subAt={r(M.dana)} />
  )},
  {from: M.tempat - 0.1, to: E('pendek') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCoin size={84} />} label="Tempat paling baik" title="ASB & TABUNG HAJI" size={60} shine />
  )},
  {from: M.panjang + 0.05, to: E('panjang') + 0.2, render: (d, r) => (
    <TitleCard dur={d} icon={<IconTarget size={80} />} label="Simpanan jangka panjang" title="2 – 3 TAHUN +" size={72} sub="pilih emas" subAt={r(M.dua3) + 20} />
  )},
  {from: M.emasS + 0.05, to: M.kenaikan2 - 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconArrowUp size={84} />} label="Emas · jangka panjang" title="PERTUMBUHAN LEBIH BAIK" size={52} sub="rekod 30 tahun lalu" subAt={r(M.n30)} />
  )},
  {from: M.kenaikan2 - 0.1, to: E('emas') + 0.2, render: (d) => (
    <TitleCard dur={d} label="Purata kenaikan harga emas" title="±10% SETAHUN" size={86} shine />
  )},
  {from: M.kunci + 0.05, to: M.pendek2 - 0.35, render: (d, r) => (
    <TitleCard dur={d} icon={<IconTarget size={80} />} label="Kuncinya · bukan pilih salah satu" title="IKUT MATLAMAT" size={66} />
  )},
  {from: M.pendek2 - 0.35, to: E('kunci') + 0.1, render: (d, r) => (
    <Choices dur={d} items={[
      {top: 'Jangka pendek', main: 'ASB · TABUNG HAJI', at: r(M.pendek2)},
      {top: 'Jangka panjang', main: 'EMAS', at: r(M.panjang2), good: true},
    ]} />
  )},
  {from: M.outro, to: 9999, render: (d) => (
    <TitleCard dur={d} icon={<IconChat size={80} />} label="Komen di bawah" title="DAPAT SESUATU?" gold={false} size={62} />
  )},
];

const SFX: Sfx[] = [
  {t: M.hook, f: 'whoosh_cine', v: 0.45},
  {t: M.hook + 0.05, f: 'impact_deep', v: 0.26},
  {t: M.asb, f: 'pop_hard', v: 0.32},
  {t: M.th, f: 'pop_hard', v: 0.32},
  {t: M.emas, f: 'gold_prize', v: 0.24},
  {t: M.save - 0.2, f: 'click_select', v: 0.34},
  {t: M.faktor - 0.1, f: 'whoosh_pop', v: 0.4},
  {t: M.tempoh, f: 'sparkle', v: 0.22},
  {t: M.asbS + 0.05, f: 'whoosh_small', v: 0.3},
  {t: M.dividen, f: 'pop_msg', v: 0.32},
  {t: M.manakala, f: 'pop_msg', v: 0.32},
  {t: M.pendek + 0.05, f: 'whoosh_pop', v: 0.38},
  {t: M.tempat - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.asb2, f: 'ding_correct', v: 0.28},
  {t: M.panjang + 0.05, f: 'whoosh_pop', v: 0.38},
  {t: M.emasS + 0.05, f: 'whoosh_cine', v: 0.32},
  {t: M.n30, f: 'click_select', v: 0.32},
  {t: M.kenaikan2 - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.n10, f: 'coins', v: 0.32},
  {t: M.kunci + 0.05, f: 'whoosh_cine', v: 0.32},
  {t: M.pendek2 - 0.35, f: 'whoosh_small', v: 0.28},
  {t: M.pendek2, f: 'pop_hard', v: 0.3},
  {t: M.panjang2, f: 'ding_correct', v: 0.3},
  {t: M.outro, f: 'bell_notif', v: 0.26},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <Schedule items={ITEMS} total={tl.total} />
    <Subtitles words={captionsJson as Word[]} busy={motionBusy(ITEMS, SFX)} />
  </>
);

export const v12: VideoDef = {
  id: 'v12', tl, Overlays, sfx: SFX,
  punches: [M.emas, M.tempoh, M.asb2, M.n10, M.emas3],
  zoom: {hook: [1.1], faktor: [1.0], asb: [1.06, 1.0], pendek: [1.0, 1.07], panjang: [1.08], emas: [1.0, 1.06], kunci: [1.04, 1.0], outro: [1.08]},
  music: {file: 'bgm.mp3', startAt: 90},
};
export const AsbThEmas: React.FC<EditProps> = (p) => <Edit def={v12} {...p} />;
