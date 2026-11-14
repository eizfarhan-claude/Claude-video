/* v18 — Harga paling murah belum tentu untung (take 2, dengan CTA Public Gold) */
import React from 'react';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {ChecklistCard, CtaCard, GItem, IconStore, IconX, Schedule, Subtitles, TitleCard, motionBusy} from '../../engine/kit';
import {IconCoin, IconTarget} from '../../engine/ui';

const tl = makeTimeline(edlJson as Edl, 15);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  hook: 0.05,
  belum: at('hook', 'belum'),
  kes: S('kes'),
  target: at('kes', 'target'),
  tetapi: at('kes', 'tetapi'),
  sebab: at('kes', 'sebab'),
  kunci: S('kunci'),
  spread: at('kunci', 'spread'),
  susah: at('kunci', 'susah'),
  tiada: at('kunci', 'tiada'),
  cerewet: at('kunci', 'cerewet'),
  company: S('company'),
  meroket: at('company', 'meroket'),
  rugi: at('company', 'rugi'),
  sebelum: S('sebelum'),
  package: at('sebelum', 'package'),
  siapa: at('sebelum', 'siapa'),
  berapa: at('sebelum', 'berapa'),
  jaminan: at('sebelum', 'jaminan'),
  pastikan: S('pastikan'),
  platform: at('pastikan', 'platform'),
  cta: S('cta'),
  boleh: at('cta', 'boleh'),
  video: at('cta', 'video'),
  bantu: at('cta', 'bantu'),
  miliki: at('cta', 'miliki'),
};

const ITEMS: GItem[] = [
  {from: M.hook, to: M.belum - 0.08, render: (d) => (
    <TitleCard dur={d} icon={<IconCoin size={84} />} label="Harga paling murah" title="DI PASARAN" size={72} />
  )},
  {from: M.belum - 0.08, to: E('hook') + 0.1, render: (d) => (
    <TitleCard dur={d} icon={<IconX size={84} />} label="Belum tentu" title="PALING UNTUNG" gold={false} size={68} />
  )},
  {from: M.target - 0.1, to: M.sebab - 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCoin size={80} />} label="Target beli paling murah" title="TAPI TAK UNTUNG" gold={false} size={60} sub="bila nak jual" subAt={r(M.tetapi)} />
  )},
  {from: M.kunci + 0.05, to: E('kunci') + 0.15, render: (d, r) => (
    <ChecklistCard dur={d} label="Kuncinya" rows={[
      {text: 'Spread tinggi', at: r(M.spread), bad: true},
      {text: 'Susah nak jual', at: r(M.susah), bad: true},
      {text: 'Beli balik cerewet', at: r(M.tiada), bad: true},
    ]} />
  )},
  {from: M.company + 0.05, to: E('company') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconStore size={80} />} label="Company tak beli balik?" title="SPREAD MEROKET" gold={false} size={60} sub="jual tempat lain = rugi" subAt={r(M.rugi)} />
  )},
  {from: M.sebelum + 0.05, to: M.siapa - 0.1, render: (d) => (
    <TitleCard dur={d} icon={<IconTarget size={80} />} label="Jangan sekadar tengok harga" title="TENGOK BY PACKAGE" size={56} />
  )},
  {from: M.siapa - 0.1, to: E('sebelum') + 0.15, render: (d, r) => (
    <ChecklistCard dur={d} label="Semak dulu" rows={[
      {text: 'Siapa beli balik nanti', at: r(M.siapa)},
      {text: 'Berapa spread', at: r(M.berapa)},
      {text: 'Jaminan beli balik', at: r(M.jaminan)},
    ]} />
  )},
  {from: M.pastikan + 0.05, to: E('pastikan') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCoin size={84} />} label="Pastikan pilih" title="COMPANY YANG BETUL" size={58} sub="platform untung jangka panjang" subAt={r(M.platform)} shine />
  )},
  {from: M.cta + 0.05, to: 9999, render: (d, r) => (
    <CtaCard dur={d} head="Mula bersama Public Gold" pin={r(M.video)} guide={r(M.bantu)} guideText="Step by step" final={r(M.miliki)} finalLabel="Spread rendah · harga berpatutan" finalTitle="EMAS FIZIKAL" />
  )},
];

const SFX: Sfx[] = [
  {t: M.hook, f: 'whoosh_cine', v: 0.45},
  {t: M.hook + 0.05, f: 'gold_prize', v: 0.22},
  {t: M.belum - 0.08, f: 'impact_deep', v: 0.3},
  {t: M.target - 0.1, f: 'whoosh_pop', v: 0.38},
  {t: M.tetapi, f: 'pop_msg', v: 0.3},
  {t: M.kunci + 0.05, f: 'whoosh_small', v: 0.3},
  {t: M.spread + 0.2, f: 'pop_msg', v: 0.3},
  {t: M.susah + 0.2, f: 'pop_msg', v: 0.3},
  {t: M.tiada + 0.2, f: 'pop_msg', v: 0.3},
  {t: M.company + 0.05, f: 'whoosh_pop', v: 0.36},
  {t: M.meroket, f: 'impact_deep', v: 0.28},
  {t: M.sebelum + 0.05, f: 'whoosh_cine', v: 0.3},
  {t: M.siapa - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.siapa + 0.2, f: 'click_select', v: 0.32},
  {t: M.berapa + 0.2, f: 'click_select', v: 0.32},
  {t: M.jaminan + 0.2, f: 'click_select', v: 0.32},
  {t: M.pastikan + 0.05, f: 'whoosh_pop', v: 0.38},
  {t: M.platform, f: 'sparkle', v: 0.24},
  {t: M.cta + 0.05, f: 'whoosh_cine', v: 0.32},
  {t: M.video, f: 'pop_hard', v: 0.34},
  {t: M.bantu, f: 'click_select', v: 0.32},
  {t: M.miliki, f: 'gold_prize', v: 0.24},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <Schedule items={ITEMS} total={tl.total} />
    <Subtitles words={captionsJson as Word[]} busy={motionBusy(ITEMS, SFX)} />
  </>
);

export const v18: VideoDef = {
  id: 'v18', tl, Overlays, sfx: SFX,
  punches: [M.belum, M.tetapi, M.cerewet, M.meroket, M.platform, M.miliki],
  zoom: {hook: [1.1], kes: [1.0, 1.06], kunci: [1.0], company: [1.07, 1.0], sebelum: [1.0, 1.06], pastikan: [1.04], cta: [1.0, 1.06]},
  music: {file: 'bgm.mp3', startAt: 45},
};
export const MurahTake2: React.FC<EditProps> = (p) => <Edit def={v18} {...p} />;
