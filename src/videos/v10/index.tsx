/* v10 — 3 risiko simpan emas */
import React from 'react';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {ChecklistCard, Choices, GItem, IconChat, IconShield, IconWarn, IconX, Schedule, StepCard, Subtitles, TitleCard, WaveIcon, motionBusy} from '../../engine/kit';
import {IconArrowUp} from '../../engine/ui';

const tl = makeTimeline(edlJson as Edl, 15);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  hook: 0.05,
  risiko: at('hook', 'risiko'),
  r1: S('r1'),
  naik: at('r1', 'naik'),
  r1tip: S('r1tip'),
  jangan: at('r1tip', 'jangan'),
  r2: S('r2'),
  income: at('r2', 'income'),
  melainkan: at('r2', 'melainkan'),
  r3: S('r3'),
  perbezaan: at('r3', 'perbezaan'),
  jadi3: at('r3', 'jadi'),
  rugi: at('r3', 'rugi'),
  dua: at('r3', 'dua'),
  keuntungan: at('untung', 'keuntungan'),
  ilmu: S('ilmu'),
  fahami: at('ilmu', 'fahami'),
  target: S('target'),
  n1: at('target', 'nombor', 0),
  n3: at('target', 'nombor', 1),
  n2: at('target', 'nombor', 2),
  bonus: at('target', 'bonus'),
  outro: S('outro'),
};

const ITEMS: GItem[] = [
  {from: M.hook, to: E('hook') + 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconWarn size={88} />} label="Sebelum simpan emas" title="3 RISIKO" size={80} sub="yang anda kena tahu" subAt={r(M.risiko)} />
  )},
  {from: M.r1 + 0.05, to: E('r1') + 0.15, render: (d, r) => (
    <StepCard dur={d} n={1} total={3} title="HARGA NAIK TURUN" sub="jangka pendek tak menentu" subAt={r(M.naik)} icon={<WaveIcon size={86} />} />
  )},
  {from: M.r1tip + 0.05, to: E('r1tip') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconX size={80} />} label="Matlamat kurang 2 tahun?" title="JANGAN SIMPAN EMAS" gold={false} size={56} />
  )},
  {from: M.r2 + 0.05, to: M.melainkan - 0.15, render: (d, r) => (
    <StepCard dur={d} n={2} total={3} title="TIADA DIVIDEN" sub="tiada income · bonus · imbuhan" subAt={r(M.income)} icon={<IconX size={70} />} />
  )},
  {from: M.melainkan - 0.15, to: E('r2') + 0.15, render: (d) => (
    <TitleCard dur={d} icon={<IconArrowUp size={80} />} label="Untung hanya dari" title="KENAIKAN HARGA" size={62} sub="jangka masa panjang" subAt={10} shine />
  )},
  {from: M.r3 + 0.05, to: M.jadi3 - 0.15, render: (d, r) => (
    <StepCard dur={d} n={3} total={3} title="ADA SPREAD" sub="beza harga jual & harga beli" subAt={r(M.perbezaan)} icon={<IconWarn size={70} />} />
  )},
  {from: M.jadi3 - 0.15, to: E('untung') + 0.15, render: (d, r) => (
    <Choices dur={d} items={[
      {top: 'Jual jangka pendek', main: 'RUGI', at: r(M.rugi), bad: true},
      {top: 'Simpan 2–3 tahun +', main: 'UNTUNG', sub: 'harga naik atasi spread', at: r(M.dua), good: true},
    ]} />
  )},
  {from: M.ilmu + 0.05, to: E('ilmu') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconShield size={84} />} label="Jadi" title="SIMPAN EMAS DENGAN ILMU" size={50} sub="fahami risikonya" subAt={r(M.fahami)} shine />
  )},
  {from: M.target + 0.05, to: M.n2 - 0.15, render: (d, r) => (
    <ChecklistCard dur={d} label="Target jangka panjang = settle" rows={[
      {text: 'Risiko #1 · harga naik turun', at: r(M.n1)},
      {text: 'Risiko #3 · spread', at: r(M.n3)},
    ]} />
  )},
  {from: M.n2 - 0.15, to: M.outro, render: (d, r) => (
    <TitleCard dur={d} icon={<IconWarn size={80} />} label="Risiko #2 · hati-hati" title="'UNTUNG SETIAP BULAN'" gold={false} size={50} sub="company offer bonus / dividen bulanan" subAt={r(M.bonus)} />
  )},
  {from: M.outro, to: 9999, render: (d) => (
    <TitleCard dur={d} icon={<IconChat size={80} />} label="Komen di bawah" title="DAPAT SESUATU?" gold={false} size={62} />
  )},
];

const SFX: Sfx[] = [
  {t: M.hook, f: 'whoosh_cine', v: 0.45},
  {t: M.hook + 0.05, f: 'impact_deep', v: 0.28},
  {t: M.risiko, f: 'pop_hard', v: 0.34},
  {t: M.r1 + 0.05, f: 'whoosh_pop', v: 0.4},
  {t: M.naik, f: 'click_select', v: 0.34},
  {t: M.r1tip + 0.05, f: 'pop_hard', v: 0.34},
  {t: M.r2 + 0.05, f: 'whoosh_pop', v: 0.4},
  {t: M.income, f: 'pop_msg', v: 0.34},
  {t: M.melainkan - 0.15, f: 'whoosh_small', v: 0.28},
  {t: M.melainkan + 0.3, f: 'sparkle', v: 0.24},
  {t: M.r3 + 0.05, f: 'whoosh_pop', v: 0.4},
  {t: M.perbezaan, f: 'pop_msg', v: 0.34},
  {t: M.jadi3 - 0.15, f: 'whoosh_small', v: 0.28},
  {t: M.rugi, f: 'pop_hard', v: 0.36},
  {t: M.dua, f: 'ding_correct', v: 0.3},
  {t: M.keuntungan, f: 'coins', v: 0.32},
  {t: M.ilmu + 0.05, f: 'whoosh_cine', v: 0.3},
  {t: M.fahami, f: 'sparkle', v: 0.26},
  {t: M.target + 0.05, f: 'whoosh_small', v: 0.28},
  {t: M.n1 + 0.15, f: 'click_select', v: 0.36},
  {t: M.n3 + 0.15, f: 'click_select', v: 0.36},
  {t: M.n2 - 0.15, f: 'whoosh_small', v: 0.3},
  {t: M.bonus, f: 'pop_hard', v: 0.34},
  {t: M.outro, f: 'bell_notif', v: 0.26},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <Schedule items={ITEMS} total={tl.total} />
    <Subtitles words={captionsJson as Word[]} busy={motionBusy(ITEMS, SFX)} />
  </>
);

export const v10: VideoDef = {
  id: 'v10', tl, Overlays, sfx: SFX,
  punches: [M.risiko, M.r1 + 0.1, M.jangan, M.r2 + 0.1, M.r3 + 0.1, M.rugi, M.fahami],
  zoom: {hook: [1.12], r1: [1.0], r1tip: [1.07], r2: [1.0, 1.06], r3: [1.06, 1.0], untung: [1.07], ilmu: [1.0], target: [1.06, 1.0], outro: [1.08]},
  music: {file: 'bgm.mp3', startAt: 200},
};
export const TigaRisiko: React.FC<EditProps> = (p) => <Edit def={v10} {...p} />;
