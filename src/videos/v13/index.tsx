/* v13 — 3 situasi penyimpan emas berilmu jual emas */
import React from 'react';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {ChecklistCard, CtaCard, GItem, IconHouse, IconWarn, Schedule, StepCard, Subtitles, TitleCard, motionBusy, IconGrad} from '../../engine/kit';
import {MythFact, PillRow} from '../../engine/kit2';
import {IconCoin, IconTarget} from '../../engine/ui';

const tl = makeTimeline({...(edlJson as Edl), words: captionsJson as Word[]}, 30);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  spek: at('hook', 'spekulasi'),
  tiga: at('hook2', '3'),
  s1: S('s1'),
  upgrade: at('s1', 'upgrade'),
  hartanah: at('s1', 'hartanah'),
  bisnes: at('s1', 'bisnes'),
  passive: at('s1', 'passive'),
  s2: S('s2'),
  matlamat: at('s2', 'matlamat'),
  contoh: at('s2', 'contohnya'),
  haji: at('s2', 'haji'),
  pend: at('s2', 'pendidikan'),
  umrah: at('s2', 'umrah'),
  cukup: at('s2', 'cukup'),
  jual: at('s2', 'jual'),
  s3: S('s3'),
  kecemasan: at('s3', 'kecemasan'),
  habis: at('s3', 'kehabisan'),
  recap: S('recap'),
  medium: at('recap', 'medium'),
  recap2: S('recap2'),
  pendapatan: at('recap2', 'pendapatan'),
  capai: at('recap2', 'capai'),
  backup: at('recap2', 'backup'),
  cta: S('cta'),
  video: at('cta', 'video'),
  biru: at('cta', 'biru'),
};

const ITEMS: GItem[] = [
  {from: 0.05, to: E('hook2') + 0.2, render: (d, r) => (
    <MythFact dur={d} mythLabel="Penyimpan emas berilmu TAK simpan untuk" myth="SPEKULASI HARGA" strikeAt={r(M.spek)} factLabel="Dia jual emas hanya bila" fact="3 SITUASI INI" factAt={r(M.tiga) - 4} />
  )},
  {from: M.s1 + 0.05, to: E('s1') + 0.1, render: (d, r) => (
    <StepCard dur={d} n={1} total={3} title="UPGRADE INVESTMENT" sub="hartanah · bisnes → passive income" subAt={r(M.hartanah)} icon={<IconHouse size={78} />} />
  )},
  {from: M.s2 + 0.05, to: M.contoh - 0.05, render: (d) => (
    <StepCard dur={d} n={2} total={3} title="CAPAI MATLAMAT" icon={<IconTarget size={78} />} />
  )},
  {from: M.contoh - 0.05, to: M.cukup - 0.15, render: (d, r) => (
    <PillRow dur={d} label="Contoh matlamat simpanan" pills={[
      {text: 'HAJI', at: r(M.haji)},
      {text: 'PENDIDIKAN ANAK', at: r(M.pend)},
      {text: 'UMRAH', at: r(M.umrah)},
    ]} />
  )},
  {from: M.cukup - 0.15, to: E('s2') + 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCoin size={84} />} label="Bila dah capai" title="CUKUP GRAM → JUAL" size={58} sub="guna untuk matlamat masing-masing" subAt={r(M.jual) + 10} shine />
  )},
  {from: M.s3 + 0.05, to: E('s3') + 0.15, render: (d, r) => (
    <StepCard dur={d} n={3} total={3} title="KECEMASAN" sub="bila dana kecemasan dah habis" subAt={r(M.habis) - 10} icon={<IconWarn size={78} />} />
  )},
  {from: M.recap + 0.05, to: M.recap2 - 0.05, render: (d, r) => (
    <TitleCard dur={d} icon={<IconGrad size={84} />} label="Penyimpan emas berilmu" title="EMAS = MEDIUM KAYA" size={60} shine />
  )},
  {from: M.recap2 - 0.05, to: E('recap2') + 0.15, render: (d, r) => (
    <ChecklistCard dur={d} label="Emas sebagai platform untuk" rows={[
      {text: 'Dana pendapatan pasif', at: r(M.pendapatan)},
      {text: 'Capai matlamat', at: r(M.capai)},
      {text: 'Backup dana kecemasan', at: r(M.backup)},
    ]} />
  )},
  {from: M.cta, to: 9999, render: (d, r) => (
    <CtaCard dur={d} head="Belum mula simpan emas?" pin={r(M.video)} guide={r(M.biru)} guideText="Isi BAG BIRU" />
  )},
];

const SFX: Sfx[] = [
  {t: 0.0, f: 'whoosh_impact', v: 0.4},
  {t: M.spek, f: 'swoosh_accent', v: 0.34},
  {t: M.spek + 0.1, f: 'buzzer', v: 0.14},
  {t: M.tiga - 0.13, f: 'zoom_impact', v: 0.32},
  {t: M.s1 + 0.05, f: 'tech_slide', v: 0.34},
  {t: M.hartanah, f: 'pop_msg', v: 0.3},
  {t: M.s2 + 0.05, f: 'tech_slide', v: 0.34},
  {t: M.contoh - 0.05, f: 'swoosh_fast', v: 0.28},
  {t: M.haji, f: 'bubble_pop', v: 0.3},
  {t: M.pend, f: 'bubble_pop', v: 0.3},
  {t: M.umrah, f: 'bubble_pop', v: 0.3},
  {t: M.cukup - 0.15, f: 'whoosh_small', v: 0.28},
  {t: M.jual, f: 'coin_win', v: 0.28},
  {t: M.s3 + 0.05, f: 'tech_slide', v: 0.34},
  {t: M.kecemasan, f: 'heartbeat', v: 0.3},
  {t: M.recap + 0.05, f: 'whoosh_cine', v: 0.3},
  {t: M.medium, f: 'sparkle', v: 0.24},
  {t: M.recap2 - 0.05, f: 'whoosh_small', v: 0.26},
  {t: M.pendapatan + 0.15, f: 'ui_click', v: 0.36},
  {t: M.capai + 0.15, f: 'ui_click', v: 0.36},
  {t: M.backup + 0.15, f: 'ui_click', v: 0.36},
  {t: M.cta, f: 'whoosh_pop', v: 0.34},
  {t: M.video, f: 'pop_msg', v: 0.3},
  {t: M.biru, f: 'bell_notif', v: 0.22},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <Schedule items={ITEMS} total={tl.total} />
    <Subtitles words={captionsJson as Word[]} busy={motionBusy(ITEMS, SFX)} />
  </>
);

export const v13: VideoDef = {
  id: 'v13', tl, Overlays, sfx: SFX,
  punches: [M.tiga, M.upgrade, M.matlamat, M.jual, M.kecemasan, M.medium],
  zoom: {hook: [1.1], hook2: [1.0], s1: [1.0, 1.06], s2: [1.06, 1.0], s3: [1.0], recap: [1.07], recap2: [1.0], cta: [1.06]},
  music: {file: 'bgm.mp3', startAt: 95},
};
export const TigaSituasi: React.FC<EditProps> = (p) => <Edit def={v13} {...p} />;
