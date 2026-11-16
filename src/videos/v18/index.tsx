/* v18 — Simpanan 5 angka di usia 20-an */
import React from 'react';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {CtaCard, GItem, IconCalendar, IconChat, IconLeak, Schedule, Subtitles, TitleCard, motionBusy} from '../../engine/kit';
import {BigStat, KineticHook, PillRow, IntroFlash, TitleIntro} from '../../engine/kit2';
import {IconArrowUp, IconCoin} from '../../engine/ui';

const tl = makeTimeline({...(edlJson as Edl), words: captionsJson as Word[]}, 30);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  akhirnya: at('hook', 'akhirnya'),
  dicapai: at('hook', 'dicapai'),
  dulu: S('dulu'),
  angka: at('dulu', 'angka'),
  kisah: S('kisah'),
  n21: at('kisah', '21'),
  n30: at('kisah', '30'),
  muda: at('kisah', 'sangat'),
  sharing: S('sharing'),
  diploma: at('sharing', 'diploma'),
  part: at('sharing', 'part-time'),
  ptptn: at('sharing', 'ptptn'),
  raya: at('sharing', 'raya'),
  g30: at('sharing', '30 gram emas'),
  semua: S('semua'),
  anak: at('semua', 'anak'),
  bekerja: at('semua', 'bekerja'),
  stabil: at('semua', 'stabil'),
  pencen: at('semua', 'pencen'),
  mudah: S('mudah'),
  tabungan: at('mudah', 'tabungan'),
  bocor: S('bocor'),
  bocorW: at('bocor', 'bocor'),
  jadi: at('bocor', 'jadi'),
  tukar: at('bocor', 'tukar'),
  angka2: at('bocor', 'angka'),
  berita: S('berita'),
  rm100: at('berita', 'rm100'),
  konsisten: at('berita', 'konsisten'),
  cta: S('cta'),
  video: at('cta', 'video'),
  biru: at('cta', 'biru'),
};

const ITEMS: GItem[] = [
  {from: 0.0, to: E('hook') + 0.1, render: (d) => (
    <TitleIntro dur={d} tag="10 tahun lalu tak terfikir" line1="SIMPANAN 5 ANGKA" line2="DI USIA 20-AN" l2At={14} />
  )},
  {from: M.dulu + 0.05, to: E('dulu') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCalendar size={80} />} label="Usia 20-an · tak pernah terbayang" title="SIMPANAN 5 ANGKA" size={62} sub="RM10,000+" subAt={r(M.angka)} shine />
  )},
  {from: M.kisah + 0.05, to: M.n30 - 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconChat size={78} />} label="Update penyimpan emas saya" title="UMUR 21 TAHUN" size={66} gold={false} />
  )},
  {from: M.n30 - 0.15, to: E('kisah') + 0.15, render: (d, r) => (
    <BigStat dur={d} label="Simpanan dalam akaun" value={30} suffix=" GRAM" sub="pada usia yang sangat muda" subAt={r(M.muda)} icon={<IconCoin size={84} />} />
  )},
  {from: M.sharing + 0.05, to: E('sharing') + 0.15, render: (d, r) => (
    <PillRow dur={d} label="Hasil menabung zaman diploma" pills={[
      {text: 'PART-TIME', at: r(M.part)},
      {text: 'PTPTN', at: r(M.ptptn)},
      {text: 'DUIT RAYA', at: r(M.raya)},
      {text: '= 30 GRAM EMAS', at: r(M.g30), good: true},
    ]} />
  )},
  {from: M.semua + 0.05, to: E('semua') + 0.15, render: (d, r) => (
    <PillRow dur={d} label="Tak kiralah siapa pun" pills={[
      {text: 'ANAK MUDA', at: r(M.anak)},
      {text: 'DAH BEKERJA', at: r(M.bekerja)},
      {text: 'DAH STABIL', at: r(M.stabil)},
      {text: 'NAK PENCEN', at: r(M.pencen)},
    ]} />
  )},
  {from: M.mudah + 0.05, to: E('mudah') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCoin size={86} />} label="Cara paling mudah" title="TABUNG EMAS" size={72} shine />
  )},
  {from: M.bocor + 0.05, to: M.jadi - 0.1, render: (d) => (
    <TitleCard dur={d} icon={<IconLeak size={84} />} label="Masalahnya, tabungan selalu" title="BOCOR" size={84} gold={false} />
  )},
  {from: M.jadi - 0.1, to: E('bocor') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconArrowUp size={84} />} label="Tukar ke simpanan emas" title="TENGOK HASIL 2–3 TAHUN" size={50} sub="berapa angka anda boleh capai?" subAt={r(M.angka2)} />
  )},
  {from: M.berita + 0.05, to: E('berita') + 0.15, render: (d, r) => (
    <BigStat dur={d} label="Berita baik · akaun GAP" value={100} prefix="RM" countTo={r(M.rm100) + 10} sub="konsisten ikut bajet masing-masing" subAt={r(M.konsisten)} icon={<IconCoin size={84} />} />
  )},
  {from: M.cta, to: 9999, render: (d, r) => (
    <CtaCard dur={d} head="Belum ada akaun GAP?" pin={r(M.video)} guide={r(M.biru)} guideText="Isi BAG BIRU" />
  )},
];

const SFX: Sfx[] = [
  {t: 0.0, f: 'whoosh_impact', v: 0.45},
  {t: 0.1, f: 'tech_slide', v: 0.22},
  {t: 0.2, f: 'zoom_impact', v: 0.32},
  {t: 0.47, f: 'impact_deep', v: 0.26},
  {t: 0.7, f: 'sparkle', v: 0.22},
  {t: M.dulu + 0.05, f: 'tech_slide', v: 0.3},
  {t: M.angka, f: 'coin_notif', v: 0.26},
  {t: M.kisah + 0.05, f: 'pop_msg', v: 0.32},
  {t: M.n30 - 0.15, f: 'whoosh_cine', v: 0.28},
  {t: M.n30, f: 'coins', v: 0.28},
  {t: M.sharing + 0.05, f: 'swoosh_fast', v: 0.28},
  {t: M.part, f: 'bubble_pop', v: 0.3},
  {t: M.ptptn, f: 'bubble_pop', v: 0.3},
  {t: M.raya, f: 'bubble_pop', v: 0.3},
  {t: M.g30, f: 'coin_win', v: 0.3},
  {t: M.semua + 0.05, f: 'tech_slide', v: 0.3},
  {t: M.anak, f: 'tech_select', v: 0.28},
  {t: M.bekerja, f: 'tech_select', v: 0.28},
  {t: M.stabil, f: 'tech_select', v: 0.28},
  {t: M.pencen, f: 'tech_select', v: 0.28},
  {t: M.mudah + 0.05, f: 'whoosh_cine', v: 0.3},
  {t: M.tabungan, f: 'sparkle', v: 0.22},
  {t: M.bocor + 0.05, f: 'whoosh_small', v: 0.26},
  {t: M.bocorW, f: 'buzzer', v: 0.13},
  {t: M.jadi - 0.1, f: 'swoosh_fast', v: 0.3},
  {t: M.angka2, f: 'pop_msg', v: 0.28},
  {t: M.berita + 0.05, f: 'tech_slide', v: 0.3},
  {t: M.rm100, f: 'coin_win', v: 0.28},
  {t: M.cta, f: 'whoosh_pop', v: 0.34},
  {t: M.video, f: 'pop_msg', v: 0.3},
  {t: M.biru, f: 'bell_notif', v: 0.22},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <IntroFlash />
    <Schedule items={ITEMS} total={tl.total} />
    <Subtitles words={captionsJson as Word[]} busy={motionBusy(ITEMS, SFX)} />
  </>
);

export const v18: VideoDef = {
  id: 'v18', tl, Overlays, sfx: SFX,
  punches: [M.dicapai, M.angka, M.n30, M.g30, M.bocorW, M.rm100],
  zoom: {hook: [1.1], dulu: [1.0], kisah: [1.06, 1.0], sharing: [1.0], semua: [1.06], mudah: [1.0], bocor: [1.07, 1.0], berita: [1.0], cta: [1.06]},
  music: {file: 'bgm.mp3', startAt: 60},
  focus: {to: E('hook') + 0.1},
};
export const LimaAngka: React.FC<EditProps> = (p) => <Edit def={v18} {...p} />;
