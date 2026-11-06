/* v7 — Kenapa kena menabung? Checkpoint kehidupan */
import React from 'react';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {ChecklistCard, Choices, GItem, IconGrad, IconHouse, IconKid, IconPlane, IconRings, IconSun, IconWallet, IconChat, JourneyCard, QuoteStack, Schedule, Subtitles, TitleCard, motionBusy} from '../../engine/kit';
import {IconCoin, IconPin, IconTarget} from '../../engine/ui';

const tl = makeTimeline(edlJson as Edl, 15);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  hook: 0.05,
  menabung: at('hook', 'menabung'),
  objek: S('objek'),
  student0: at('objek', 'student'),
  baru: at('objek', 'baru'),
  tua: at('objek', 'tua'),
  answer: S('answer'),
  next: at('answer', 'next'),
  tenang: at('answer', 'tenang'),
  hutang: at('answer', 'hutang'),
  student: at('student', 'student'),
  kahwin: at('student', 'kahwin'),
  rumah: at('rumah', 'rumah'),
  haji: at('rumah', 'haji'),
  anak: at('rumah', 'anak'),
  bersara: at('retire', 'bersara'),
  why: S('why'),
  mesti: at('why', 'mesti'),
  smooth: at('why', 'smooth'),
  asb: at('asb', 'asb'),
  emas: at('emas', 'emas'),
  dapat: at('emas', 'dapat'),
  kenaikan: at('emas', 'kenaikan'),
  inflasi: at('emas', 'inflasi'),
  keborosan: at('emas', 'keborosan'),
  gap: S('gap'),
  gapWord: at('gap', 'gap'),
  keluarkan: at('gap', 'keluarkan'),
  cta: S('cta'),
  isi: at('cta', 'isi'),
  guide: at('cta', 'guide'),
  outro: at('cta', 'dapat'),
};

const ITEMS: GItem[] = [
  {from: M.hook, to: E('hook') + 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconWallet size={86} />} label="Pernah terfikir?" title="KENAPA KENA MENABUNG?" gold={false} size={52} sub="dan ada simpanan" subAt={r(M.menabung)} />
  )},
  {from: M.objek, to: E('objek') + 0.1, render: (d, r) => (
    <QuoteStack dur={d} label="Alasan biasa" quotes={[
      {text: '“Aku student kot…”', at: r(M.student0) - 6},
      {text: '“Baru je kahwin…”', at: r(M.baru)},
      {text: '“Aku dah tua…”', at: r(M.tua) - 6},
    ]} />
  )},
  {from: M.next - 0.2, to: E('answer') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconTarget size={84} />} label="Simpanan bantu capai" title="NEXT CHECKPOINT" size={64} sub="lebih tenang · lebih cepat · tanpa hutang" subAt={r(M.tenang)} shine />
  )},
  {from: M.student - 0.3, to: E('retire') + 0.3, render: (d, r) => (
    <JourneyCard dur={d} label="Checkpoint kehidupan" nodes={[
      {text: 'Student', icon: <IconGrad size={54} />, at: r(M.student)},
      {text: 'Kahwin', icon: <IconRings size={54} />, at: r(M.kahwin)},
      {text: 'Rumah', icon: <IconHouse size={50} />, at: r(M.rumah)},
      {text: 'Haji/Umrah', icon: <IconPlane size={50} />, at: r(M.haji)},
      {text: 'Anak', icon: <IconKid size={50} />, at: r(M.anak)},
      {text: 'Bersara', icon: <IconSun size={54} />, at: r(M.bersara)},
    ]} />
  )},
  {from: M.mesti - 0.15, to: E('why') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCoin size={84} />} label="Nak ke checkpoint seterusnya" title="MESTI ADA SIMPANAN" size={58} sub="perjalanan lebih smooth" subAt={r(M.smooth)} shine />
  )},
  {from: M.asb - 0.15, to: M.dapat - 0.15, render: (d, r) => (
    <Choices dur={d} items={[
      {top: 'Kurang 2 tahun', main: 'ASB / Tabung Haji', at: 0},
      {top: '2–3 tahun ke atas', main: 'EMAS FIZIKAL', sub: 'jangka masa panjang', at: r(M.emas), good: true},
    ]} />
  )},
  {from: M.dapat - 0.15, to: E('emas') + 0.2, render: (d, r) => (
    <ChecklistCard dur={d} label="Kelebihan emas fizikal" rows={[
      {text: 'Naik harga jangka panjang', at: r(M.kenaikan)},
      {text: 'Kalis inflasi', at: r(M.inflasi)},
      {text: 'Kalis boros & ketirisan', at: r(M.keborosan)},
    ]} />
  )},
  {from: M.gap + 0.05, to: E('gap') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCoin size={84} />} label="Akaun emas GAP" title="SEDIKIT DEMI SEDIKIT" size={58} sub="keluarkan item besar ikut matlamat" subAt={r(M.keluarkan)} shine />
  )},
  {from: M.cta + 0.05, to: M.outro - 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconPin size={80} />} label="Nak saya bantu?" title="ISI BEG BIRU" size={64} sub="saya guide step by step" subAt={r(M.guide)} />
  )},
  {from: M.outro - 0.1, to: 9999, render: (d) => (
    <TitleCard dur={d} icon={<IconChat size={80} />} label="Komen di bawah" title="DAPAT SESUATU?" gold={false} size={62} />
  )},
];

const SFX: Sfx[] = [
  {t: M.hook, f: 'whoosh_cine', v: 0.45},
  {t: M.hook + 0.05, f: 'impact_deep', v: 0.25},
  {t: M.menabung, f: 'pop_msg', v: 0.35},
  {t: M.student0 - 0.2, f: 'pop_msg', v: 0.42},
  {t: M.baru, f: 'pop_msg', v: 0.42},
  {t: M.tua - 0.2, f: 'pop_msg', v: 0.42},
  {t: M.next - 0.2, f: 'whoosh_small', v: 0.3},
  {t: M.tenang, f: 'sparkle', v: 0.26},
  {t: M.student - 0.3, f: 'whoosh_cine', v: 0.3},
  {t: M.student, f: 'click_select', v: 0.36},
  {t: M.kahwin, f: 'click_select', v: 0.36},
  {t: M.rumah, f: 'click_select', v: 0.36},
  {t: M.haji, f: 'click_select', v: 0.36},
  {t: M.anak, f: 'click_select', v: 0.36},
  {t: M.bersara, f: 'ding_correct', v: 0.32},
  {t: M.mesti - 0.15, f: 'whoosh_small', v: 0.3},
  {t: M.smooth, f: 'pop_msg', v: 0.35},
  {t: M.asb - 0.15, f: 'whoosh_small', v: 0.3},
  {t: M.emas, f: 'gold_prize', v: 0.28},
  {t: M.kenaikan + 0.15, f: 'click_select', v: 0.36},
  {t: M.inflasi + 0.15, f: 'click_select', v: 0.36},
  {t: M.keborosan + 0.15, f: 'ding_correct', v: 0.3},
  {t: M.gap + 0.05, f: 'whoosh_small', v: 0.3},
  {t: M.gapWord, f: 'coins', v: 0.32},
  {t: M.cta + 0.05, f: 'whoosh_pop', v: 0.4},
  {t: M.guide, f: 'pop_msg', v: 0.35},
  {t: M.outro - 0.1, f: 'bell_notif', v: 0.26},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <Schedule items={ITEMS} total={tl.total} />
    <Subtitles words={captionsJson as Word[]} busy={motionBusy(ITEMS, SFX)} />
  </>
);

export const v7: VideoDef = {
  id: 'v7', tl, Overlays, sfx: SFX,
  punches: [M.menabung, M.next, M.bersara, M.mesti, M.emas, M.gapWord],
  zoom: {hook: [1.12], objek: [1.0, 1.06], answer: [1.07, 1.0], student: [1.0], rumah: [1.06, 1.0, 1.06], retire: [1.08], why: [1.0, 1.06], asb: [1.0], emas: [1.07, 1.0], gap: [1.0, 1.06], cta: [1.06, 1.0]},
  music: {file: 'bgm.mp3', startAt: 20},
};
export const Checkpoint: React.FC<EditProps> = (p) => <Edit def={v7} {...p} />;
