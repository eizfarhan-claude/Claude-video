/* v17 — Emas paling murah belum tentu paling menguntungkan */
import React from 'react';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {ChecklistCard, GItem, IconChartDown, IconStore, IconWarn, IconX, Schedule, Subtitles, TitleCard, motionBusy} from '../../engine/kit';
import {IconCoin, IconTarget} from '../../engine/ui';

const tl = makeTimeline(edlJson as Edl, 40);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  hook: 0.05,
  belum: at('hook', 'belum'),
  kes: S('kes'),
  dia: at('kes', 'dia'),
  dan: at('kes', 'dan'),
  jual: S('jual'),
  kat2: at('jual', 'kat', 1),
  sebab: S('sebab'),
  spread: at('sebab', 'spread'),
  susahnya: at('sebab', 'susahnya'),
  cerewet: at('sebab', 'cerewet'),
  kurang: S('kurang'),
  plan: S('plan'),
  spreadP: at('plan', 'spread'),
  apakah: at('plan', 'apakah'),
  senang: at('plan', 'senang'),
  companyT: at('plan', 'company', 0),
  kalau: at('plan', 'kalau'),
  meroket: at('plan', 'meroket'),
  rugi: at('plan', 'rugi'),
  awal: S('awal'),
  bandingkan: at('awal', 'bandingkan'),
  pilih: S('pilih'),
  harga: at('pilih', 'harga'),
  spreadR: at('pilih', 'spread'),
  senangJ: at('pilih', 'senang'),
  jaminan: at('pilih', 'jaminan'),
  semak: S('semak'),
  keuntungan: at('semak', 'keuntungan'),
  walaupun: at('semak', 'walaupun'),
};

const ITEMS: GItem[] = [
  {from: M.hook, to: M.belum - 0.08, render: (d) => (
    <TitleCard dur={d} icon={<IconCoin size={84} />} label="Emas paling murah" title="DI PASARAN" size={72} />
  )},
  {from: M.belum - 0.08, to: E('hook') + 0.15, render: (d) => (
    <TitleCard dur={d} icon={<IconX size={84} />} label="Belum tentu" title="PALING UNTUNG" gold={false} size={68} />
  )},
  {from: M.dia - 0.1, to: E('kes') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCoin size={80} />} label="Banyak kes sebelum ni" title="BELI SEBAB MURAH" size={60} sub="harap untung besar bila harga naik" subAt={r(M.dan)} />
  )},
  {from: M.kat2 - 0.15, to: E('jual') + 0.15, render: (d) => (
    <TitleCard dur={d} icon={<IconWarn size={80} />} label="Harga murah bukan" title="FAKTOR UTAMA UNTUNG" size={54} />
  )},
  {from: M.sebab + 0.05, to: E('sebab') + 0.2, render: (d, r) => (
    <ChecklistCard dur={d} label="Bila nak jual, baru tahu" rows={[
      {text: 'Spread tinggi', at: r(M.spread), bad: true},
      {text: 'Susah nak jual', at: r(M.susahnya), bad: true},
      {text: 'Syarat cerewet', at: r(M.cerewet) - 8, bad: true},
    ]} />
  )},
  {from: M.kurang + 0.05, to: E('kurang') + 0.15, render: (d) => (
    <TitleCard dur={d} icon={<IconChartDown size={84} />} label="Inilah yang" title="KURANGKAN UNTUNG" gold={false} size={62} />
  )},
  {from: M.plan + 0.05, to: M.apakah - 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconTarget size={80} />} label="Sebelum pilih emas" title="PLAN BILA NAK JUAL" size={56} sub="berapa spread dikenakan?" subAt={r(M.spreadP)} />
  )},
  {from: M.apakah - 0.1, to: M.kalau - 0.1, render: (d, r) => (
    <ChecklistCard dur={d} label="Semak dulu" rows={[
      {text: 'Syarat nak jual', at: r(M.apakah)},
      {text: 'Senang atau susah jual', at: r(M.senang)},
      {text: 'Company beli balik?', at: r(M.companyT)},
    ]} />
  )},
  {from: M.kalau - 0.1, to: E('plan') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconStore size={80} />} label="Beli company A, jual company B" title="SPREAD MEROKET" gold={false} size={60} sub="anda pun rugi juga" subAt={r(M.rugi)} />
  )},
  {from: M.awal + 0.05, to: E('awal') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconTarget size={80} />} label="Plan awal-awal" title="BANDING PER PACKAGE" size={54} sub="tengok harga paling rendah" subAt={r(M.bandingkan) + 30} />
  )},
  {from: M.pilih + 0.05, to: M.senangJ - 0.1, render: (d, r) => (
    <ChecklistCard dur={d} label="Pilih company yang ada" rows={[
      {text: 'Harga berpatutan', at: r(M.harga)},
      {text: 'Spread rendah', at: r(M.spreadR)},
    ]} />
  )},
  {from: M.senangJ - 0.1, to: E('pilih') + 0.15, render: (d, r) => (
    <ChecklistCard dur={d} label="Dan juga" rows={[
      {text: 'Senang jual, tiada syarat', at: r(M.senangJ)},
      {text: 'Jaminan beli balik', at: r(M.jaminan)},
    ]} />
  )},
  {from: M.semak + 0.05, to: M.walaupun - 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCoin size={84} />} label="Semak syarat ini, baru jumpa" title="UNTUNG LEBIH BESAR" size={58} shine />
  )},
  {from: M.walaupun - 0.1, to: 9999, render: (d) => (
    <TitleCard dur={d} label="Walaupun harganya" title="BUKAN PALING MURAH" gold={false} size={60} />
  )},
];

const SFX: Sfx[] = [
  {t: M.hook, f: 'whoosh_cine', v: 0.45},
  {t: M.hook + 0.05, f: 'gold_prize', v: 0.22},
  {t: M.belum - 0.08, f: 'impact_deep', v: 0.3},
  {t: M.dia - 0.1, f: 'whoosh_pop', v: 0.38},
  {t: M.dan, f: 'coins', v: 0.28},
  {t: M.kat2 - 0.15, f: 'pop_hard', v: 0.34},
  {t: M.sebab + 0.05, f: 'whoosh_small', v: 0.3},
  {t: M.spread + 0.2, f: 'pop_msg', v: 0.3},
  {t: M.susahnya + 0.2, f: 'pop_msg', v: 0.3},
  {t: M.cerewet - 0.05, f: 'pop_msg', v: 0.3},
  {t: M.kurang + 0.05, f: 'impact_deep', v: 0.26},
  {t: M.plan + 0.05, f: 'whoosh_pop', v: 0.38},
  {t: M.apakah - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.apakah + 0.2, f: 'click_select', v: 0.32},
  {t: M.senang + 0.2, f: 'click_select', v: 0.32},
  {t: M.companyT + 0.2, f: 'click_select', v: 0.32},
  {t: M.kalau - 0.1, f: 'whoosh_pop', v: 0.36},
  {t: M.meroket, f: 'impact_deep', v: 0.28},
  {t: M.awal + 0.05, f: 'whoosh_cine', v: 0.3},
  {t: M.pilih + 0.05, f: 'whoosh_small', v: 0.28},
  {t: M.harga + 0.2, f: 'ding_correct', v: 0.26},
  {t: M.spreadR + 0.2, f: 'ding_correct', v: 0.26},
  {t: M.senangJ - 0.1, f: 'whoosh_small', v: 0.26},
  {t: M.senangJ + 0.2, f: 'ding_correct', v: 0.26},
  {t: M.jaminan + 0.2, f: 'ding_correct', v: 0.28},
  {t: M.semak + 0.05, f: 'whoosh_cine', v: 0.3},
  {t: M.keuntungan, f: 'coins', v: 0.32},
  {t: M.walaupun - 0.1, f: 'whoosh_small', v: 0.28},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <Schedule items={ITEMS} total={tl.total} />
    <Subtitles words={captionsJson as Word[]} busy={motionBusy(ITEMS, SFX)} />
  </>
);

export const v17: VideoDef = {
  id: 'v17', tl, Overlays, sfx: SFX,
  punches: [M.belum, M.kat2, M.cerewet, M.meroket, M.jaminan, M.keuntungan],
  zoom: {hook: [1.1], kes: [1.0], jual: [1.06], sebab: [1.0], kurang: [1.08], plan: [1.0, 1.06], awal: [1.04], pilih: [1.0, 1.06], semak: [1.04, 1.0]},
  music: {file: 'bgm.mp3', startAt: 15},
};
export const MurahBelumUntung: React.FC<EditProps> = (p) => <Edit def={v17} {...p} />;
