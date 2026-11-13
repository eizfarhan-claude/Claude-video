/* v13 — 5 formula gaji (kereta, rumah, kecemasan, simpanan, persaraan) */
import React from 'react';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {GItem, IconHouse, IconShield, IconSun, Schedule, Subtitles, TitleCard, motionBusy} from '../../engine/kit';
import {FormulaCard, IconCar, IconFormula, IconPiggy, PrincipleCard, RecapCard} from '../../engine/kit2';

const tl = makeTimeline(edlJson as Edl, 30);
const {at, sectionStart: S, sectionEnd: E} = tl;
/** output second where a section's first clip begins (real audio onset, not Whisper's word guess) */
const C = (sec: string) => tl.edl.clips.find((c) => c.section === sec)!.outFrom / 30;

const M = {
  k: S('kereta'),
  kDarab: at('kereta', 'darab'),
  k12: at('kereta', '12'),
  kereta: at('kereta', 'kereta'),
  r: C('rumah') + 0.05,
  r12: at('rumah', 'dua'),
  rLima: at('rumah', 'lima'),
  rumah: at('rumah', 'rumah'),
  rDarab: at('rumah', 'darab', 0),
  c: C('kecemasan') + 0.05,
  c6: at('kecemasan', 'enam'),
  cDarab: at('kecemasan', 'darab'),
  cDana: at('kecemasan', 'kecemasan'),
  s: C('simpanan') + 0.05,
  s02: at('simpanan', '0.2'),
  sDarab: at('simpanan', 'darab'),
  sDana: at('simpanan', 'simpanan'),
  sBulan: at('simpanan', 'bulan'),
  p: S('persaraan'),
  penting: at('persaraan', 'penting'),
  p300: at('persaraan', '300'),
  pDarab: at('persaraan', 'darab'),
  pDana: at('persaraan', 'persaraan'),
  bersara: at('persaraan', 'bersara'),
  t: S('tutup'),
  beli1: at('tutup', 'membeli', 0),
  beli2: at('tutup', 'membeli', 1),
  urus: at('tutup', 'urus'),
  cerah: at('tutup', 'cerah'),
};
const END = tl.total / 30;

const ITEMS: GItem[] = [
  {from: 0, to: M.kDarab - 0.25, render: (d) => (
    <TitleCard dur={d} icon={<IconFormula size={84} />} label="Simpan video ni" title="5 FORMULA GAJI" size={70} shine />
  )},
  {from: M.kDarab - 0.25, to: E('kereta') + 0.15, render: (d, r) => (
    <FormulaCard dur={d} n={1} total={5} mult="12 BULAN" multAt={r(M.kDarab)} result="KERETA" resultAt={r(M.kereta)} icon={<IconCar size={60} color="#F5C84C" />} ex={{salary: 3000, mult: "12", value: 36000}} exAt={r(M.kereta) + 10} />
  )},
  {from: M.r + 0.05, to: E('rumah') + 0.15, render: (d, r) => (
    <FormulaCard dur={d} n={2} total={5} mult="12 BLN × 5 THN" multAt={r(M.rDarab)} result="RUMAH" resultAt={r(M.rumah)} icon={<IconHouse size={60} color="#F5C84C" />} ex={{salary: 3000, mult: "60", value: 180000}} exAt={r(M.rumah) + 10} />
  )},
  {from: M.c + 0.05, to: E('kecemasan') + 0.15, render: (d, r) => (
    <FormulaCard dur={d} n={3} total={5} mult="6 BULAN" multAt={r(M.cDarab)} result="KECEMASAN" resultAt={r(M.cDana)} icon={<IconShield size={58} />} ex={{salary: 3000, mult: "6", value: 18000}} exAt={r(M.cDana) + 10} good />
  )},
  {from: M.s + 0.05, to: E('simpanan') + 0.15, render: (d, r) => (
    <FormulaCard dur={d} n={4} total={5} mult="0.2" multAt={r(M.sDarab)} result="SIMPANAN" resultAt={r(M.sDana)} icon={<IconPiggy size={60} />} ex={{salary: 3000, mult: "0.2", value: 600, suffix: "/ bulan"}} exAt={r(M.sDana) + 10} />
  )},
  {from: M.p + 0.05, to: M.penting + 0.6, render: (d) => (
    <TitleCard dur={d} label="Paling penting" title="FORMULA 5" size={64} gold={false} />
  )},
  {from: M.penting + 0.6, to: E('persaraan') + 0.15, render: (d, r) => (
    <FormulaCard dur={d} n={5} total={5} mult="300 BULAN" multAt={r(M.pDarab)} result="PERSARAAN" resultAt={r(M.pDana)} icon={<IconSun size={58} />} ex={{salary: 3000, mult: "300", value: 900000}} exAt={r(M.pDana) + 10} />
  )},
  {from: M.t + 0.05, to: M.beli1 - 0.1, render: (d) => (
    <RecapCard dur={d} label="Gaji RM3,000 · plan anda" rows={[
      {l: 'Kereta', r: 'RM36,000', at: 2},
      {l: 'Rumah', r: 'RM180,000', at: 6},
      {l: 'Kecemasan', r: 'RM18,000', at: 10},
      {l: 'Simpanan', r: 'RM600 / bulan', at: 14},
      {l: 'Persaraan', r: 'RM900,000', at: 18},
    ]} />
  )},
  {from: M.beli1 - 0.1, to: END, render: (d, r) => (
    <PrincipleCard dur={d} label="Urus kewangan dengan baik" lines={[
      {text: 'Beli ikut kesesuaian', at: r(M.beli1)},
      {text: 'Beli ikut keperluan', at: r(M.beli2)},
      {text: 'Masa depan lebih cerah', at: r(M.cerah) - 6},
    ]} />
  )},
];

const SFX: Sfx[] = [
  {t: 0, f: 'whoosh_cine', v: 0.42},
  {t: 0.05, f: 'impact_deep', v: 0.26},
  {t: M.kDarab - 0.25, f: 'whoosh_pop', v: 0.3},
  {t: M.kDarab, f: 'pop_hard', v: 0.32},
  {t: M.kereta, f: 'ding_correct', v: 0.26},
  {t: M.kereta + 0.45, f: 'coins', v: 0.18},
  {t: M.r + 0.05, f: 'whoosh_pop', v: 0.3},
  {t: M.rDarab, f: 'pop_hard', v: 0.32},
  {t: M.rumah, f: 'ding_correct', v: 0.26},
  {t: M.rumah + 0.45, f: 'coins', v: 0.18},
  {t: M.c + 0.05, f: 'whoosh_pop', v: 0.3},
  {t: M.cDarab, f: 'pop_hard', v: 0.32},
  {t: M.cDana, f: 'bell_notif', v: 0.22},
  {t: M.cDana + 0.45, f: 'coins', v: 0.18},
  {t: M.s + 0.05, f: 'whoosh_pop', v: 0.3},
  {t: M.sDarab, f: 'pop_hard', v: 0.32},
  {t: M.sDana, f: 'coins', v: 0.3},
  {t: M.p + 0.05, f: 'whoosh_cine', v: 0.34},
  {t: M.penting + 0.6, f: 'whoosh_small', v: 0.3},
  {t: M.pDarab, f: 'pop_hard', v: 0.34},
  {t: M.pDana, f: 'gold_prize', v: 0.24},
  {t: M.pDana + 0.45, f: 'coins', v: 0.18},
  {t: M.t + 0.05, f: 'whoosh_small', v: 0.3},
  {t: M.t + 0.12, f: 'click_select', v: 0.24},
  {t: M.beli1 - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.beli2, f: 'click_select', v: 0.3},
  {t: M.cerah - 0.2, f: 'sparkle', v: 0.26},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <Schedule items={ITEMS} total={tl.total} />
    <Subtitles words={captionsJson as Word[]} busy={motionBusy(ITEMS, SFX)} />
  </>
);

export const v13: VideoDef = {
  id: 'v13', tl, Overlays, sfx: SFX,
  punches: [M.k12, M.rLima, M.c6, M.s02, M.p300, M.cerah],
  zoom: {kereta: [1.0], rumah: [1.06], kecemasan: [1.0], simpanan: [1.06], persaraan: [1.0, 1.08], tutup: [1.04, 1.0]},
  music: {file: 'bgm.mp3', startAt: 40},
};
export const FormulaGaji: React.FC<EditProps> = (p) => <Edit def={v13} {...p} />;
