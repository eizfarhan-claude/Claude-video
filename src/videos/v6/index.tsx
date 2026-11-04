/* v6 — 2 punca masalah kewangan */
import React from 'react';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {Choices, CycleCard, DebtBar, EscalateCard, GItem, IconChat, IconShield, IconWarn, IconX, Schedule, StepCard, Subtitles, TitleCard, motionBusy} from '../../engine/kit';

const tl = makeTimeline(edlJson as Edl);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  hook: 0.05,
  dua: at('hook', 'dua'),
  maksudnya: at('hook', 'maksudnya'),
  p1: S('p1'),
  tabungan1: at('p1', 'tabungan'),
  kedua: at('p2', 'kedua'),
  kecemasan2: at('p2', 'kecemasan'),
  berhutang2: at('p2', 'berhutang'),
  punca: S('punca'),
  besar: at('punca', 'besar'),
  kesudahan: at('punca', 'kesudahan'),
  spiral: S('spiral'),
  kecemasan3: at('spiral', 'kecemasan'),
  berhutang3: at('spiral', 'berhutang'),
  tambah: at('spiral', 'tambah'),
  makin: at('spiral', 'makin'),
  perit: at('spiral', 'perit'),
  pedih: at('spiral', 'pedih'),
  menjerat: at('spiral', 'menjerat'),
  solusi: S('solusi'),
  solve: S('solve'),
  w1: at('solve', 'wujudkan', 0),
  w2: at('solve', 'wujudkan', 1),
  kurangkan: at('solve', 'kurangkan'),
  daripada: at('solve', 'daripada'),
  settlekan: at('solve', 'settlekan'),
  settle: at('solve', 'settle'),
  punca2: at('solve', 'punca'),
  takkan: at('solve', 'takkan'),
  outro: S('outro'),
};

const ITEMS: GItem[] = [
  {from: M.hook, to: E('hook') + 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconWarn size={86} />} label="Masalah kewangan sebenarnya" title="CUMA 2 PUNCA" size={68} sub="settle dua ni = kewangan normal" subAt={r(M.maksudnya)} shine />
  )},
  {from: M.p1 + 0.05, to: E('p1') + 0.15, render: (d, r) => (
    <StepCard dur={d} n={1} total={2} title="TAK ADA SIMPANAN" sub="tiada tabungan" subAt={r(M.tabungan1)} icon={<IconX size={70} />} />
  )},
  {from: M.kedua - 0.1, to: E('p2') - 0.1, render: (d, r) => (
    <StepCard dur={d} n={2} total={2} title="TERPAKSA BERHUTANG" sub="bila berlaku kecemasan" subAt={r(M.kecemasan2)} icon={<IconX size={70} />} />
  )},
  {from: M.punca + 0.05, to: E('punca') + 0.05, render: (d, r) => (
    <TitleCard dur={d} icon={<IconWarn size={84} />} label="Dua punca inilah" title="MASALAH MAKIN BESAR" gold={false} size={56} sub="tanpa ada kesudahan" subAt={r(M.kesudahan)} />
  )},
  {from: M.spiral + 0.1, to: M.makin - 0.15, render: (d, r) => (
    <CycleCard dur={d} label="Kitaran hutang" loopAt={r(M.tambah)} nodes={[
      {text: 'Tiada simpanan', at: 4},
      {text: 'Kecemasan', at: r(M.kecemasan3) - 15},
      {text: 'Hutang', at: r(M.berhutang3)},
    ]} />
  )},
  {from: M.makin - 0.15, to: E('spiral') + 0.25, render: (d, r) => (
    <EscalateCard dur={d} label="Makin lama, makin…" words={[
      {text: 'PERIT', at: r(M.perit)},
      {text: 'PEDIH', at: r(M.pedih)},
      {text: 'MENJERAT', at: r(M.menjerat)},
    ]} />
  )},
  {from: M.solusi, to: M.solve - 0.05, render: (d) => (
    <TitleCard dur={d} label="Jadi" title="SOLUSINYA?" size={72} />
  )},
  {from: M.solve - 0.05, to: M.daripada - 0.15, render: (d, r) => (
    <Choices dur={d} items={[
      {top: 'Wujudkan', main: 'Tabungan', at: r(M.w1), good: true},
      {top: 'Wujudkan', main: 'Simpanan', at: r(M.w2), good: true},
      {top: 'Kurangkan', main: 'Hutang', at: r(M.kurangkan), good: true},
    ]} />
  )},
  {from: M.daripada - 0.15, to: M.takkan - 0.2, render: (d, r) => (
    <DebtBar dur={d} label="Hutang · settle sedikit demi sedikit" drain0={r(M.settlekan)} drain1={r(M.settle)} doneAt={r(M.punca2) - 6} done="2 punca masalah SETTLE" />
  )},
  {from: M.takkan - 0.2, to: M.outro, render: (d) => (
    <TitleCard dur={d} icon={<IconShield size={84} />} label="Takkan lagi ada masalah" title="KEWANGAN STABIL" size={64} shine />
  )},
  {from: M.outro, to: 9999, render: (d) => (
    <TitleCard dur={d} icon={<IconChat size={80} />} label="Komen di bawah" title="DAPAT SESUATU?" gold={false} size={62} />
  )},
];

const SFX: Sfx[] = [
  {t: M.hook, f: 'whoosh_cine', v: 0.45},
  {t: M.hook + 0.05, f: 'impact_deep', v: 0.25},
  {t: M.dua, f: 'pop_hard', v: 0.32},
  {t: M.maksudnya, f: 'pop_msg', v: 0.36},
  {t: M.p1, f: 'whoosh_pop', v: 0.4},
  {t: M.p1 + 0.1, f: 'pop_hard', v: 0.3},
  {t: M.kedua - 0.1, f: 'whoosh_pop', v: 0.4},
  {t: M.kedua, f: 'pop_hard', v: 0.3},
  {t: M.punca, f: 'whoosh_small', v: 0.3},
  {t: M.besar, f: 'impact_deep', v: 0.2},
  {t: M.spiral + 0.1, f: 'whoosh_small', v: 0.3},
  {t: M.kecemasan3 - 0.5, f: 'click_select', v: 0.35},
  {t: M.berhutang3, f: 'click_select', v: 0.35},
  {t: M.tambah, f: 'whoosh_small', v: 0.25},
  {t: M.perit, f: 'impact_deep', v: 0.18},
  {t: M.pedih, f: 'impact_deep', v: 0.22},
  {t: M.menjerat, f: 'impact_deep', v: 0.28},
  {t: M.solusi, f: 'whoosh_cine', v: 0.32},
  {t: M.w1, f: 'pop_msg', v: 0.38},
  {t: M.w2, f: 'pop_msg', v: 0.38},
  {t: M.kurangkan, f: 'pop_msg', v: 0.4},
  {t: M.daripada - 0.15, f: 'whoosh_small', v: 0.28},
  {t: M.settlekan, f: 'atm_key', v: 0.3},
  {t: M.punca2 - 0.2, f: 'ding_correct', v: 0.32},
  {t: M.takkan - 0.2, f: 'sparkle', v: 0.3},
  {t: M.outro, f: 'bell_notif', v: 0.26},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <Schedule items={ITEMS} total={tl.total} />
    <Subtitles words={captionsJson as Word[]} busy={motionBusy(ITEMS, SFX)} />
  </>
);

export const v6: VideoDef = {
  id: 'v6',
  tl,
  Overlays,
  sfx: SFX,
  punches: [M.dua, M.p1, M.kedua, M.besar, M.menjerat, M.kurangkan, M.takkan],
  zoom: {hook: [1.1, 1.0], intro: [1.0], p1: [1.07], p2: [1.0, 1.06], punca: [1.08], spiral: [1.0, 1.06], solusi: [1.1], solve: [1.0, 1.06], outro: [1.08]},
  music: {file: 'bgm.mp3', startAt: 150},
};

export const DuaPunca: React.FC<EditProps> = (p) => <Edit def={v6} {...p} />;
