/* v14 — Kaedah 3 bank (A: kecemasan, B: jangka pendek, C: emas jangka panjang) */
import React from 'react';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {ChecklistCard, Choices, CtaCard, GItem, IconCalendar, IconShield, IconWallet, Schedule, StepCard, Subtitles, TitleCard, motionBusy} from '../../engine/kit';
import {IconBank, IconCoin} from '../../engine/ui';

const tl = makeTimeline(edlJson as Edl, 15);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  hook: 0.05,
  gunakan: at('hook', 'gunakan'),
  bank3: at('hook', '3'),
  A: at('hook', 'a'), B: at('hook', 'b'), C: at('hook', 'c'),
  a: S('a'),
  ataupun: at('a', 'ataupun'),
  tunai: at('a', 'tunai'),
  b: S('b'),
  sekitar: at('b', 'sekitar'),
  kahwin: at('b', 'kahwin'),
  danB: at('b', 'dan', 0),
  asbB: at('b', 'asb'),
  c: S('c'),
  haji: at('c', 'haji,'),
  kita: at('c', 'kita', 1),
  emasC: at('c', 'emas'),
  gaji: S('gaji'),
  penuhkan: at('gaji', 'penuhkan'),
  dana: at('gaji', 'dana'),
  pendek: at('gaji', 'matlamat', 1),
  ketiga: at('gaji', 'ketiga,'),
  cta: S('cta'),
  boleh: at('cta', 'boleh'),
  pin: at('cta', 'pin'),
  bantu: at('cta', 'bantu'),
  dapat: at('cta', 'dapat'),
};

const ITEMS: GItem[] = [
  {from: M.hook, to: M.gunakan - 0.1, render: (d) => (
    <TitleCard dur={d} icon={<IconWallet size={84} />} label="Gaji dah masuk" title="NAK SIMPAN DI MANA?" gold={false} size={54} />
  )},
  {from: M.gunakan - 0.1, to: M.A - 0.3, render: (d) => (
    <TitleCard dur={d} icon={<IconBank size={84} />} label="Gunakan kaedah" title="3 BANK" size={92} shine />
  )},
  {from: M.A - 0.3, to: E('hook') + 0.1, render: (d, r) => (
    <Choices dur={d} items={[
      {top: 'Bank', main: 'A', at: r(M.A)},
      {top: 'Bank', main: 'B', at: r(M.B)},
      {top: 'Bank', main: 'C', at: r(M.C), good: true},
    ]} />
  )},
  {from: M.a + 0.05, to: E('a') + 0.15, render: (d, r) => (
    <StepCard dur={d} n={1} total={3} title="BANK A · KECEMASAN" sub="bank biasa / ASB · tunai segera" subAt={r(M.ataupun)} icon={<IconShield size={70} />} />
  )},
  {from: M.b + 0.05, to: M.danB - 0.1, render: (d, r) => (
    <StepCard dur={d} n={2} total={3} title="BANK B · JANGKA PENDEK" sub="1–2 tahun · cth: kahwin tahun depan" subAt={r(M.sekitar)} icon={<IconCalendar size={70} />} />
  )},
  {from: M.danB - 0.1, to: E('b') + 0.15, render: (d) => (
    <TitleCard dur={d} icon={<IconBank size={80} />} label="Bank B simpan di" title="ASB & TABUNG HAJI" size={58} />
  )},
  {from: M.c + 0.05, to: M.kita - 0.1, render: (d, r) => (
    <StepCard dur={d} n={3} total={3} title="BANK C · JANGKA PANJANG" sub="2 tahun + · cth: pergi haji 5 tahun lagi" subAt={r(M.haji)} icon={<IconCoin size={70} />} />
  )},
  {from: M.kita - 0.1, to: E('c') + 0.15, render: (d) => (
    <TitleCard dur={d} icon={<IconCoin size={88} />} label="Bank C" title="SIMPANAN EMAS" size={70} sub="jangka masa panjang" subAt={10} shine />
  )},
  {from: M.gaji + 0.05, to: M.penuhkan - 0.1, render: (d) => (
    <TitleCard dur={d} icon={<IconCalendar size={80} />} label="Setiap kali dapat gaji" title="ALIHKAN KE 3 BANK" size={58} />
  )},
  {from: M.penuhkan - 0.1, to: E('gaji') + 0.2, render: (d, r) => (
    <ChecklistCard dur={d} label="Penuhkan satu persatu" rows={[
      {text: 'A · Kecemasan 3 bulan gaji', at: r(M.dana)},
      {text: 'B · Jangka pendek', at: r(M.pendek)},
      {text: 'C · Jangka panjang', at: r(M.ketiga)},
    ]} />
  )},
  {from: M.cta + 0.05, to: M.boleh - 0.1, render: (d) => (
    <TitleCard dur={d} icon={<IconCoin size={84} />} label="Nak bina bank ketiga?" title="BANK SIMPAN EMAS" size={60} />
  )},
  {from: M.boleh - 0.1, to: 9999, render: (d, r) => (
    <CtaCard dur={d} head="Nak mula Bank C?" pin={r(M.pin)} guide={r(M.bantu)} guideText="Saya bantu" final={r(M.dapat)} finalLabel="Komen di bawah" finalTitle="DAPAT SESUATU?" />
  )},
];

const SFX: Sfx[] = [
  {t: M.hook, f: 'whoosh_cine', v: 0.45},
  {t: M.hook + 0.05, f: 'impact_deep', v: 0.26},
  {t: M.gunakan - 0.1, f: 'whoosh_pop', v: 0.4},
  {t: M.bank3, f: 'pop_hard', v: 0.34},
  {t: M.A, f: 'click_select', v: 0.34},
  {t: M.B, f: 'click_select', v: 0.34},
  {t: M.C, f: 'gold_prize', v: 0.24},
  {t: M.a + 0.05, f: 'whoosh_pop', v: 0.4},
  {t: M.tunai, f: 'money_bag', v: 0.26},
  {t: M.b + 0.05, f: 'whoosh_pop', v: 0.4},
  {t: M.kahwin, f: 'sparkle', v: 0.2},
  {t: M.danB - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.c + 0.05, f: 'whoosh_pop', v: 0.4},
  {t: M.kita - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.emasC, f: 'coins', v: 0.32},
  {t: M.gaji + 0.05, f: 'whoosh_cine', v: 0.3},
  {t: M.penuhkan - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.dana + 0.15, f: 'ding_correct', v: 0.26},
  {t: M.pendek + 0.15, f: 'ding_correct', v: 0.26},
  {t: M.ketiga + 0.15, f: 'ding_correct', v: 0.28},
  {t: M.cta + 0.05, f: 'whoosh_pop', v: 0.38},
  {t: M.boleh - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.pin, f: 'pop_hard', v: 0.34},
  {t: M.bantu, f: 'click_select', v: 0.32},
  {t: M.dapat, f: 'bell_notif', v: 0.26},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <Schedule items={ITEMS} total={tl.total} />
    <Subtitles words={captionsJson as Word[]} busy={motionBusy(ITEMS, SFX)} />
  </>
);

export const v14: VideoDef = {
  id: 'v14', tl, Overlays, sfx: SFX,
  punches: [M.bank3, M.C, M.tunai, M.asbB, M.emasC, M.ketiga],
  zoom: {hook: [1.1, 1.04], a: [1.0, 1.06], b: [1.06, 1.0], c: [1.0, 1.06], gaji: [1.06, 1.0], cta: [1.0, 1.06]},
  music: {file: 'bgm.mp3', startAt: 60},
};
export const TigaBank: React.FC<EditProps> = (p) => <Edit def={v14} {...p} />;
