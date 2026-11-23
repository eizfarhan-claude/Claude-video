/* v12 — 3 strategi simpan emas yang betul */
import React from 'react';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {ChecklistCard, Choices, GItem, IconCalendar, IconChat, IconX, Schedule, StepCard, Subtitles, TitleCard, WaveIcon, motionBusy} from '../../engine/kit';
import {IconCheck, IconCoin, IconTarget} from '../../engine/ui';

const tl = makeTimeline(edlJson as Edl, 15);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  hook: 0.05,
  jatuh: at('hook', 'jatuh'),
  salah: S('salah'),
  kurang: at('salah', 'kurang'),
  betul: at('salah', 'strategi', 1),
  s1: S('s1'),
  fizikal: at('s1', 'fizikal'),
  s2: S('s2'),
  tapi: at('s2', 'tapi'),
  andai: at('s2', 'andai'),
  takPerlu: at('s2', 'tak', 1),
  cara: at('s2', 'cara'),
  purata: at('s2', 'purata'),
  s3: S('s3'),
  tahun: at('s3', 'tahun'),
  ringkas: S('ringkas'),
  jana: at('ringkas', 'jana'),
  cta: S('cta'),
  betulkan: at('cta', 'betulkan'),
  keuntungan: at('cta', 'keuntungan'),
  tenang: at('cta', 'tenang'),
  outro: S('outro'),
};

const ITEMS: GItem[] = [
  {from: M.hook, to: E('hook') + 0.1, render: (d, r) => (
    <Choices dur={d} items={[
      {top: 'Harga naik', main: 'TUKAR SEMUA', sub: 'duit jadi emas', at: 2},
      {top: 'Harga jatuh pun', main: 'TUKAR SEMUA', sub: 'duit jadi emas', at: r(M.jatuh)},
    ]} />
  )},
  {from: M.salah + 0.05, to: M.betul - 0.1, render: (d) => (
    <TitleCard dur={d} icon={<IconX size={80} />} label="Strategi ini" title="KURANG TEPAT" gold={false} size={72} />
  )},
  {from: M.betul - 0.1, to: E('salah') + 0.15, render: (d) => (
    <TitleCard dur={d} icon={<IconCheck size={80} />} label="Strategi yang lebih tepat" title="3 LANGKAH" size={76} shine />
  )},
  {from: M.s1 + 0.05, to: E('s1') + 0.2, render: (d, r) => (
    <StepCard dur={d} n={1} total={3} title="BELI EMAS FIZIKAL" sub="fokus dapat emas fizikal" subAt={r(M.fizikal) - 6} icon={<IconCoin size={80} />} />
  )},
  {from: M.s2 + 0.05, to: M.andai - 0.1, render: (d, r) => (
    <StepCard dur={d} n={2} total={3} title="SEDIKIT DEMI SEDIKIT" sub="tapi konsisten" subAt={r(M.tapi)} icon={<IconCalendar size={76} />} />
  )},
  {from: M.andai - 0.1, to: M.cara - 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconX size={80} />} label="Ada bajet besar?" title="TAK PERLU SEKALI GUS" gold={false} size={52} sub="semua sekali jadi emas" subAt={r(M.takPerlu) - 30} />
  )},
  {from: M.cara - 0.1, to: E('s2') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<WaveIcon size={86} />} label="Cara paling baik" title="MASUK SEDIKIT-SEDIKIT" size={50} sub="dapat purata harga" subAt={r(M.purata)} shine />
  )},
  {from: M.s3 + 0.05, to: E('s3') + 0.15, render: (d, r) => (
    <StepCard dur={d} n={3} total={3} title="SIMPAN 2–3 TAHUN +" sub="jangka masa panjang" subAt={r(M.tahun)} icon={<IconTarget size={76} />} />
  )},
  {from: M.ringkas + 0.05, to: E('ringkas') + 0.15, render: (d, r) => (
    <ChecklistCard dur={d} label="3 strategi paling efisien" rows={[
      {text: 'Beli emas fizikal', at: 8},
      {text: 'Sedikit demi sedikit', at: 20},
      {text: 'Simpan 2–3 tahun +', at: 32},
    ]} />
  )},
  {from: M.cta + 0.05, to: M.keuntungan - 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconTarget size={80} />} label="Dah jadi penyimpan emas?" title="BETULKAN STRATEGI" size={58} sub="betulkan cara menabung" subAt={r(M.betulkan) + 18} />
  )},
  {from: M.keuntungan - 0.15, to: M.outro, render: (d, r) => (
    <Choices dur={d} items={[
      {top: 'Jangka panjang', main: 'UNTUNG', at: 3, good: true},
      {top: 'Paling penting', main: 'LEBIH TENANG', at: r(M.tenang) - 6, good: true},
    ]} />
  )},
  {from: M.outro, to: 9999, render: (d) => (
    <TitleCard dur={d} icon={<IconChat size={80} />} label="Komen di bawah" title="DAPAT SESUATU?" gold={false} size={62} />
  )},
];

const SFX: Sfx[] = [
  {t: M.hook, f: 'whoosh_cine', v: 0.45},
  {t: M.hook + 0.05, f: 'impact_deep', v: 0.26},
  {t: M.jatuh, f: 'pop_hard', v: 0.34},
  {t: M.salah + 0.05, f: 'pop_hard', v: 0.36},
  {t: M.betul - 0.1, f: 'whoosh_pop', v: 0.36},
  {t: M.betul + 0.3, f: 'sparkle', v: 0.24},
  {t: M.s1 + 0.05, f: 'whoosh_pop', v: 0.4},
  {t: M.fizikal, f: 'coins', v: 0.3},
  {t: M.s2 + 0.05, f: 'whoosh_pop', v: 0.4},
  {t: M.tapi, f: 'click_select', v: 0.34},
  {t: M.andai - 0.1, f: 'pop_hard', v: 0.32},
  {t: M.cara - 0.1, f: 'whoosh_small', v: 0.3},
  {t: M.purata, f: 'ding_correct', v: 0.3},
  {t: M.s3 + 0.05, f: 'whoosh_pop', v: 0.4},
  {t: M.tahun, f: 'click_select', v: 0.34},
  {t: M.ringkas + 0.05, f: 'whoosh_small', v: 0.28},
  {t: M.ringkas + 0.45, f: 'click_select', v: 0.32},
  {t: M.ringkas + 0.85, f: 'click_select', v: 0.32},
  {t: M.ringkas + 1.25, f: 'click_select', v: 0.32},
  {t: M.jana, f: 'coins', v: 0.28},
  {t: M.cta + 0.05, f: 'whoosh_cine', v: 0.3},
  {t: M.keuntungan - 0.15, f: 'whoosh_small', v: 0.28},
  {t: M.keuntungan, f: 'ding_correct', v: 0.28},
  {t: M.tenang, f: 'sparkle', v: 0.26},
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
  punches: [M.jatuh, M.kurang, M.s1 + 0.1, M.s2 + 0.1, M.cara, M.s3 + 0.1, M.tenang],
  zoom: {hook: [1.1, 1.04], salah: [1.0, 1.07], s1: [1.06], s2: [1.0, 1.07, 1.0], s3: [1.06], ringkas: [1.0], cta: [1.07, 1.0], outro: [1.08]},
  music: {file: 'bgm.mp3', startAt: 120},
};
export const TigaStrategi: React.FC<EditProps> = (p) => <Edit def={v12} {...p} />;
