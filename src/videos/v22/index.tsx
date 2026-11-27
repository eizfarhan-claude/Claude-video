/* v22 — Kaya bukan gaji besar, tapi berapa banyak simpanan */
import React from 'react';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {ChecklistCard, Choices, CtaCard, EscalateCard, GItem, IconRepeat, IconX, Schedule, Subtitles, TitleCard, motionBusy} from '../../engine/kit';
import {IconCoin, IconTarget} from '../../engine/ui';

const tl = makeTimeline(edlJson as Edl, 15);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  hook: 0.05,
  membina: at('hook', 'membina'),
  ingat: S('ingat'),
  tetapi: at('ingat', 'tetapi'),
  kecil: S('kecil'),
  besar: at('besar', 'besar'),
  s0: at('besar', 'semakin', 0),
  s1: at('besar', 'semakin', 1),
  s2: at('besar', 'semakin', 2),
  last: at('besar', 'last'),
  mula: S('mula'),
  ubah: at('mula', 'ubah'),
  bermula: at('mula', 'bermula'),
  cara: S('cara'),
  alihkan: at('cara', 'alihkan'),
  bocor: at('emas', 'bocor'),
  tukarkan: at('emas', 'tukarkan'),
  plan: S('plan'),
  panjang: at('plan', 'panjang'),
  stabil: S('stabil'),
  keborosan: at('stabil', 'keborosan'),
  gap: S('gap'),
  rm100: at('gap', 'rm100'),
  konsisten: at('gap', 'konsisten'),
  kekayaan: at('gap', 'kekayaan'),
  cta: S('cta'),
  pin: at('cta', 'pin'),
  isi: at('cta', 'isi'),
};

const ITEMS: GItem[] = [
  {from: M.hook, to: E('hook') + 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconTarget size={86} />} label="Nak jadi kaya? Kena buat 1 benda" title="BINA SIMPANAN" size={70} sub="yang kita tak pernah buat sebelum ini" subAt={r(M.membina)} shine />
  )},
  {from: M.ingat + 0.05, to: M.kecil - 0.1, render: (d, r) => (
    <Choices dur={d} items={[
      {top: 'Ramai ingat kaya =', main: 'GAJI BESAR', at: 0, bad: true},
      {top: 'Sebenarnya kaya =', main: 'SIMPANAN', sub: 'berapa banyak yang ada', at: r(M.tetapi), good: true},
    ]} />
  )},
  {from: M.kecil - 0.1, to: M.s0 - 0.1, render: (d, r) => (
    <Choices dur={d} items={[
      {top: 'Gaji kecil', main: 'TAK SIMPAN', at: 0, bad: true},
      {top: 'Gaji besar pun', main: 'TAK SIMPAN', at: r(M.besar), bad: true},
    ]} />
  )},
  {from: M.s0 - 0.1, to: M.last - 0.1, render: (d, r) => (
    <EscalateCard dur={d} label="Semakin besar…" words={[
      {text: 'GAJI', at: r(M.s0)},
      {text: 'BELANJA', at: r(M.s1)},
      {text: 'HUTANG', at: r(M.s2)},
    ]} />
  )},
  {from: M.last - 0.1, to: E('besar') + 0.15, render: (d) => (
    <TitleCard dur={d} icon={<IconX size={80} />} label="Last-last sama sahaja" title="TAK ADA SIMPANAN" gold={false} size={62} />
  )},
  {from: M.mula + 0.05, to: E('mula') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCoin size={86} />} label="Gaji besar atau kecil" title="MULA DENGAN SIMPANAN" size={54} sub="ubah masa depan · kewangan kukuh" subAt={r(M.ubah)} shine />
  )},
  {from: M.cara + 0.05, to: E('emas') + 0.15, render: (d, r) => (
    <ChecklistCard dur={d} label="Setiap bulan bila dapat gaji" rows={[
      {text: 'Sebahagian → simpanan', at: r(M.alihkan)},
      {text: 'Kalis bocor & inflasi', at: r(M.bocor)},
      {text: 'Sebahagian lagi → EMAS', at: r(M.tukarkan)},
    ]} />
  )},
  {from: M.plan + 0.05, to: E('plan') + 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconTarget size={84} />} label="Ada plan nak ubah kewangan?" title="SIMPANAN JANGKA PANJANG" size={50} />
  )},
  {from: E('plan') + 0.1, to: E('stabil') + 0.15, render: (d, r) => (
    <ChecklistCard dur={d} label="Simpanan emas" rows={[
      {text: 'Lebih stabil', at: 4},
      {text: 'Kalis bocor', at: r(M.stabil) - 4},
      {text: 'Kalis keborosan', at: r(M.keborosan)},
    ]} />
  )},
  {from: M.gap + 0.05, to: M.konsisten - 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCoin size={86} />} label="Akaun GAP · hari ini" title="MULA RM100" size={70} sub="serendah RM100 dah boleh menabung" subAt={r(M.rm100)} shine />
  )},
  {from: M.konsisten - 0.1, to: E('gap') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconRepeat size={80} />} label="Konsisten dalam akaun" title="BINA KEKAYAAN" size={66} sub="untuk jangka masa panjang" subAt={r(M.kekayaan)} />
  )},
  {from: M.cta + 0.05, to: 9999, render: (d, r) => (
    <CtaCard dur={d} head="Nak mula simpan emas?" pin={r(M.pin)} guide={r(M.isi)} guideText="Isi BEG BIRU" />
  )},
];

const SFX: Sfx[] = [
  {t: M.hook, f: 'whoosh_cine', v: 0.45},
  {t: M.hook + 0.05, f: 'impact_deep', v: 0.26},
  {t: M.membina, f: 'sparkle', v: 0.26},
  {t: M.ingat + 0.05, f: 'whoosh_small', v: 0.3},
  {t: M.tetapi, f: 'ding_correct', v: 0.3},
  {t: M.kecil - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.besar, f: 'pop_hard', v: 0.34},
  {t: M.s0, f: 'pop_hard', v: 0.3},
  {t: M.s1, f: 'pop_hard', v: 0.34},
  {t: M.s2, f: 'impact_deep', v: 0.3},
  {t: M.last - 0.1, f: 'pop_msg', v: 0.32},
  {t: M.mula + 0.05, f: 'whoosh_pop', v: 0.4},
  {t: M.ubah, f: 'sparkle', v: 0.24},
  {t: M.cara + 0.05, f: 'whoosh_small', v: 0.28},
  {t: M.alihkan + 0.15, f: 'click_select', v: 0.36},
  {t: M.bocor + 0.15, f: 'click_select', v: 0.36},
  {t: M.tukarkan + 0.15, f: 'coins', v: 0.32},
  {t: M.plan + 0.05, f: 'whoosh_small', v: 0.3},
  {t: E('plan') + 0.1, f: 'whoosh_small', v: 0.26},
  {t: E('plan') + 0.25, f: 'click_select', v: 0.34},
  {t: M.stabil, f: 'click_select', v: 0.34},
  {t: M.keborosan + 0.15, f: 'ding_correct', v: 0.3},
  {t: M.gap + 0.05, f: 'whoosh_pop', v: 0.38},
  {t: M.rm100, f: 'money_bag', v: 0.3},
  {t: M.konsisten - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.kekayaan, f: 'sparkle', v: 0.26},
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

export const v22: VideoDef = {
  id: 'v22', tl, Overlays, sfx: SFX,
  punches: [M.membina, M.tetapi, M.s2, M.bermula, M.tukarkan, M.rm100],
  zoom: {hook: [1.12], ingat: [1.0, 1.06], kecil: [1.07], besar: [1.0, 1.06], mula: [1.08], cara: [1.0], emas: [1.06], plan: [1.0], stabil: [1.07], gap: [1.0, 1.06], cta: [1.0]},
  music: {file: 'bgm.mp3', startAt: 120},
};
export const KayaSimpanan: React.FC<EditProps> = (p) => <Edit def={v22} {...p} />;
