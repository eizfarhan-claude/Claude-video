/* v9 — 1 gram sebulan + GAP auto debit */
import React from 'react';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {ChecklistCard, CtaCard, GItem, GramTimeline, IconCalendar, IconRepeat, Schedule, Subtitles, TitleCard, motionBusy} from '../../engine/kit';
import {IconCoin} from '../../engine/ui';

const tl = makeTimeline(edlJson as Edl, 15);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  hook: 0.05,
  tetapi: at('hook', 'tetapi'),
  konsisten0: at('hook', 'konsisten'),
  g12: at('hook', '12'),
  g60: at('lima', '60'),
  haji: at('lima', 'haji'),
  g120: at('sepuluh', '120'),
  rumah: at('sepuluh', 'rumah'),
  habit: S('habit'),
  habitW: at('habit', 'habit'),
  gagal: at('habit', 'gagal'),
  hari: at('habit', 'hari'),
  gap: at('habit', 'gap'),
  automatik: at('habit', 'automatik'),
  auto: S('auto'),
  tercapai: at('auto', 'tercapai'),
  cepat: at('auto', 'cepat'),
  miss: at('auto', 'tak miss'),
  peluang: S('peluang'),
  terus: at('peluang', 'terus'),
  bayang: S('bayang'),
  berapa: at('bayang', 'berapa'),
  mula: S('mula'),
  rm100: at('mula', '100'),
  terus2: at('mula', 'terus'),
  cta: S('cta'),
  pin: at('cta', 'pin'),
  isi: at('cta', 'isi'),
  guide: at('cta', 'guide'),
};

const ITEMS: GItem[] = [
  {from: M.hook, to: M.konsisten0 - 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCoin size={88} />} label="Menabung" title="1 GRAM SEBULAN" size={66} sub="nampak kecil, tapi…" subAt={r(M.tetapi)} shine />
  )},
  {from: M.konsisten0 - 0.1, to: E('sepuluh') + 0.25, render: (d, r) => (
    <GramTimeline dur={d} label="Kalau konsisten 1g / bulan" cols={[
      {top: '1 tahun', grams: 12, at: r(M.g12)},
      {top: '5 tahun', grams: 60, at: r(M.g60), tag: 'Dana haji · Kahwin', tagAt: r(M.haji)},
      {top: '10 tahun', grams: 120, at: r(M.g120), tag: 'Rumah · Kecemasan', tagAt: r(M.rumah)},
    ]} />
  )},
  {from: M.habit + 0.05, to: M.hari - 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconRepeat size={80} />} label="Bukan kecil atau besar" title="BINA HABIT" size={70} sub="konsisten setiap bulan tanpa gagal" subAt={r(M.gagal) - 20} />
  )},
  {from: M.hari - 0.15, to: E('habit') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCalendar size={80} />} label="Kaedah paling mudah" title="GAP AUTO DEBIT" size={64} sub="automatik · tanpa perlu buat decision" subAt={r(M.automatik)} shine />
  )},
  {from: M.auto + 0.05, to: E('auto') + 0.15, render: (d, r) => (
    <ChecklistCard dur={d} label="Dengan auto debit" rows={[
      {text: 'Matlamat senang tercapai', at: r(M.tercapai)},
      {text: 'Lebih cepat', at: r(M.cepat)},
      {text: 'Tak miss setiap bulan', at: r(M.miss)},
    ]} />
  )},
  {from: M.peluang + 0.05, to: E('peluang') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCalendar size={80} />} label="Dah simpan emas, belum auto debit?" title="SET UP SEKARANG" size={62} sub="dan teruskan 5 tahun" subAt={r(M.terus)} />
  )},
  {from: M.bayang + 0.05, to: E('bayang') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconRepeat size={80} />} label="Bayangkan" title="KONSISTEN TANPA GAGAL" size={54} sub="berapa simpanan anda 5 tahun lagi?" subAt={r(M.berapa)} />
  )},
  {from: M.mula + 0.05, to: E('mula') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCoin size={86} />} label="Belum mula?" title="MULA DENGAN RM100" size={60} sub="+ terus set up auto debit" subAt={r(M.terus2)} shine />
  )},
  {from: M.cta + 0.05, to: 9999, render: (d, r) => (
    <CtaCard dur={d} head="Nak saya bantu?" pin={r(M.pin)} guide={r(M.isi)} guideText="Isi BEG BIRU" />
  )},
];

const SFX: Sfx[] = [
  {t: M.hook, f: 'whoosh_cine', v: 0.45},
  {t: M.hook + 0.05, f: 'impact_deep', v: 0.25},
  {t: M.tetapi, f: 'pop_msg', v: 0.35},
  {t: M.konsisten0 - 0.1, f: 'whoosh_small', v: 0.3},
  {t: M.g12, f: 'coins', v: 0.3},
  {t: M.g60, f: 'coins', v: 0.34},
  {t: M.g120, f: 'gold_prize', v: 0.3},
  {t: M.habit + 0.05, f: 'whoosh_small', v: 0.3},
  {t: M.habitW, f: 'pop_hard', v: 0.32},
  {t: M.hari - 0.15, f: 'whoosh_pop', v: 0.4},
  {t: M.gap, f: 'click_select', v: 0.36},
  {t: M.automatik, f: 'sparkle', v: 0.26},
  {t: M.auto + 0.05, f: 'whoosh_small', v: 0.28},
  {t: M.tercapai + 0.15, f: 'click_select', v: 0.36},
  {t: M.cepat + 0.15, f: 'click_select', v: 0.36},
  {t: M.miss + 0.15, f: 'ding_correct', v: 0.3},
  {t: M.peluang + 0.05, f: 'whoosh_small', v: 0.3},
  {t: M.terus, f: 'pop_msg', v: 0.35},
  {t: M.bayang + 0.05, f: 'whoosh_cine', v: 0.28},
  {t: M.berapa, f: 'pop_msg', v: 0.35},
  {t: M.mula + 0.05, f: 'whoosh_small', v: 0.3},
  {t: M.rm100, f: 'money_bag', v: 0.3},
  {t: M.cta + 0.05, f: 'whoosh_small', v: 0.3},
  {t: M.pin, f: 'bell_notif', v: 0.28},
  {t: M.isi, f: 'pop_msg', v: 0.35},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <Schedule items={ITEMS} total={tl.total} />
    <Subtitles words={captionsJson as Word[]} busy={motionBusy(ITEMS, SFX)} />
  </>
);

export const v9: VideoDef = {
  id: 'v9', tl, Overlays, sfx: SFX,
  punches: [M.g12, M.g60, M.g120, M.habitW, M.gap, M.rm100],
  zoom: {hook: [1.12], lima: [1.0], sepuluh: [1.06, 1.0], habit: [1.0, 1.06], auto: [1.07], peluang: [1.0], bayang: [1.08], mula: [1.0], cta: [1.06]},
  music: {file: 'bgm.mp3', startAt: 160},
};
export const SatuGram: React.FC<EditProps> = (p) => <Edit def={v9} {...p} />;
