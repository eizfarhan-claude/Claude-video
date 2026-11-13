/* v11 — emas perhiasan vs gold bar & dinar: apa beza? */
import React from 'react';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {ChecklistCard, GItem, IconChat, IconRings, IconWarn, Schedule, StepCard, Subtitles, TitleCard, motionBusy} from '../../engine/kit';
import {IconCoin, IconTarget} from '../../engine/ui';
import {SpreadCard, VsCard} from '../../engine/kit2';

const tl = makeTimeline(edlJson as Edl, 15);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  perhiasan0: at('hook', 'perhiasan'),
  goldbar0: at('hook', 'gold bar'),
  bezanya: at('hook', 'bezanya'),
  basic: S('basic'),
  ramai: at('basic', 'ramai'),
  p1: S('p1'),
  matlamat: at('p1', 'matlamat'),
  kalau1: at('p1', 'kalau', 0),
  cantik1: at('p1', 'kecantikan', 0),
  panjang1: at('p1', 'panjang'),
  goldbar1: at('p1', 'gold bar'),
  p2: S('p2'),
  tidak: at('p2', 'tidak'),
  pertama2: at('p2', 'pertama'),
  design: at('p2', 'design'),
  upah: at('p2', 'upahnya'),
  spread: S('spread'),
  spreadW: at('spread', 'spreadnya'),
  s25: at('spread', '25'),
  pakai: S('pakai'),
  takJual: at('pakai', 'tak'),
  tahun: at('pakai', 'tahun'),
  gb: S('gb'),
  premium: at('gb', 'premium'),
  rendah: at('gb', 'rendah'),
  s6: at('gb', '6'),
  cta: S('cta'),
  isi: at('cta', 'isi'),
  anda2: at('cta', 'anda', 1),
  g999a: at('cta', '999', 0),
  melalui: at('cta', 'melalui'),
  outro: S('outro'),
};

const ITEMS: GItem[] = [
  {from: 0.05, to: E('hook') + 0.1, render: (d, r) => (
    <VsCard dur={d} label="Apa bezanya?" a={{top: 'Emas', main: 'PERHIASAN', at: r(M.perhiasan0)}} b={{top: 'Emas', main: 'GOLD BAR & DINAR', at: r(M.goldbar0)}} />
  )},
  {from: M.basic + 0.05, to: E('basic') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconChat size={80} />} label="Soalan basic, tapi…" title="RAMAI BELUM TAHU" size={64} sub="tonton sampai habis" subAt={r(M.ramai)} />
  )},
  {from: M.p1 + 0.05, to: M.kalau1 - 0.1, render: (d, r) => (
    <StepCard dur={d} n={1} total={2} title="SEMAK MATLAMAT" sub="simpan emas untuk apa?" subAt={r(M.matlamat)} icon={<IconTarget size={74} />} />
  )},
  {from: M.kalau1 - 0.1, to: E('p1') + 0.15, render: (d, r) => (
    <VsCard dur={d} label="Ikut matlamat" a={{top: 'Untuk kecantikan', main: 'PERHIASAN', at: r(M.cantik1)}} b={{top: 'Simpanan jangka panjang', main: 'GOLD BAR & DINAR', at: r(M.panjang1)}} winner="b" winAt={r(M.goldbar1)} />
  )},
  {from: M.p2 + 0.05, to: M.pertama2 - 0.1, render: (d, r) => (
    <StepCard dur={d} n={2} total={2} title="TAK SESUAI DISIMPAN" sub="emas perhiasan · 916" subAt={r(M.tidak)} icon={<IconWarn size={70} />} />
  )},
  {from: M.pertama2 - 0.1, to: E('p2') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconRings size={84} />} label="Design cantik, tapi" title="UPAH LEBIH MAHAL" size={60} gold={false} sub="anda bayar untuk design" subAt={r(M.upah) + 10} />
  )},
  {from: M.spread + 0.05, to: E('spread') + 0.15, render: (d, r) => (
    <SpreadCard dur={d} label="Bila jual balik nanti · spread" rows={[{name: 'Perhiasan', lo: 25, hi: 40, at: r(M.s25) - 4, bad: true}]} sub="spread tinggi = rugi bila jual" subAt={r(M.s25) + 22} />
  )},
  {from: M.pakai + 0.05, to: E('pakai') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconRings size={84} />} label="Jadi, emas perhiasan" title="BELI UNTUK PAKAI" size={62} sub="plan tak jual · 30–40 tahun lagi" subAt={r(M.takJual)} />
  )},
  {from: M.gb + 0.05, to: E('gb') + 0.15, render: (d, r) => (
    <SpreadCard dur={d} label="Spread · bandingkan" rows={[
      {name: 'Perhiasan', lo: 25, hi: 40, at: 0, bad: true},
      {name: 'Gold bar & dinar', lo: 6, hi: 9, at: r(M.s6) - 4},
    ]} sub="premium lebih murah ✓" subAt={r(M.premium)} />
  )},
  {from: M.cta + 0.05, to: M.anda2 - 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCoin size={84} />} label="Nak mula simpan emas?" title="ISI BEG BIRU" size={70} sub="saya bantu step by step" subAt={r(M.isi)} shine />
  )},
  {from: M.anda2 - 0.1, to: M.outro, render: (d, r) => (
    <ChecklistCard dur={d} label="Simpanan jangka panjang" rows={[
      {text: 'Gold bar 999', at: r(M.g999a)},
      {text: 'Dinar emas 999', at: r(M.g999a) + 8},
      {text: 'Melalui Public Gold', at: r(M.melalui)},
    ]} />
  )},
  {from: M.outro, to: 9999, render: (d) => (
    <TitleCard dur={d} icon={<IconChat size={80} />} label="Komen di bawah" title="DAPAT SESUATU?" gold={false} size={62} />
  )},
];

const SFX: Sfx[] = [
  {t: 0.05, f: 'whoosh_cine', v: 0.42},
  {t: 0.1, f: 'impact_deep', v: 0.26},
  {t: M.perhiasan0, f: 'pop_hard', v: 0.32},
  {t: M.goldbar0, f: 'pop_hard', v: 0.32},
  {t: M.goldbar0 + 0.12, f: 'coins', v: 0.22},
  {t: M.basic + 0.05, f: 'whoosh_small', v: 0.3},
  {t: M.ramai, f: 'pop_msg', v: 0.3},
  {t: M.p1 + 0.05, f: 'whoosh_pop', v: 0.38},
  {t: M.matlamat, f: 'click_select', v: 0.3},
  {t: M.kalau1 - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.cantik1, f: 'pop_hard', v: 0.3},
  {t: M.panjang1, f: 'pop_hard', v: 0.3},
  {t: M.goldbar1, f: 'ding_correct', v: 0.28},
  {t: M.p2 + 0.05, f: 'whoosh_pop', v: 0.38},
  {t: M.tidak, f: 'pop_msg', v: 0.3},
  {t: M.pertama2 - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.upah, f: 'money_bag', v: 0.26},
  {t: M.spread + 0.05, f: 'whoosh_pop', v: 0.36},
  {t: M.s25 - 0.13, f: 'impact_deep', v: 0.22},
  {t: M.pakai + 0.05, f: 'whoosh_small', v: 0.3},
  {t: M.takJual, f: 'click_select', v: 0.3},
  {t: M.gb + 0.05, f: 'whoosh_cine', v: 0.32},
  {t: M.premium, f: 'ding_correct', v: 0.26},
  {t: M.s6 - 0.13, f: 'sparkle', v: 0.26},
  {t: M.cta + 0.05, f: 'whoosh_cine', v: 0.32},
  {t: M.isi, f: 'pop_msg', v: 0.32},
  {t: M.anda2 - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.g999a + 0.15, f: 'click_select', v: 0.32},
  {t: M.g999a + 0.42, f: 'click_select', v: 0.32},
  {t: M.melalui + 0.15, f: 'click_select', v: 0.32},
  {t: M.outro, f: 'bell_notif', v: 0.26},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <Schedule items={ITEMS} total={tl.total} />
    <Subtitles words={captionsJson as Word[]} busy={motionBusy(ITEMS, SFX)} />
  </>
);

export const v11: VideoDef = {
  id: 'v11', tl, Overlays, sfx: SFX,
  punches: [M.goldbar0, M.ramai, M.goldbar1, M.tidak, M.upah, M.s25, M.s6],
  zoom: {hook: [1.08, 1.0], basic: [1.0, 1.06], p1: [1.0, 1.06], p2: [1.06, 1.0], spread: [1.08], pakai: [1.0], gb: [1.06], cta: [1.0, 1.05], outro: [1.08]},
  music: {file: 'bgm.mp3', startAt: 80},
};
export const EmasPerhiasan: React.FC<EditProps> = (p) => <Edit def={v11} {...p} />;
