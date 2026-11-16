/* v11 — Akaun GAP: wajib menabung setiap bulan? */
import React from 'react';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {ChecklistCard, Choices, CtaCard, GItem, IconCalendar, IconWarn, Schedule, Subtitles, TitleCard, motionBusy} from '../../engine/kit';
import {KineticHook, MythFact, PillRow} from '../../engine/kit2';
import {IconBank, IconCoin, IconTarget} from '../../engine/ui';

// anchors come from the captions (re-transcribed EDITED voice) so they match exactly what is heard
const tl = makeTimeline({...(edlJson as Edl), words: captionsJson as Word[]}, 30);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  wajib: at('hook', 'wajib'),
  setiap: at('hook', 'setiap'),
  kalau: at('hook', 'kalau'),
  miss: at('hook', 'ter-miss'),
  intro: S('intro'),
  bajet: at('intro', 'bajet'),
  tak: S('tak_wajib'),
  takw: at('tak_wajib', 'tak'),
  termiss: S('termiss'),
  charge: at('termiss', 'charge'),
  penalty: at('termiss', 'penalty'),
  platform: S('platform'),
  flex: S('fleksibel'),
  masa: at('fleksibel', 'masa'),
  bajet2: at('fleksibel', 'bajet'),
  min: at('fleksibel', 'minimum'),
  situasi: at('fleksibel', 'situasi'),
  kerap: S('kerap'),
  hari: at('kerap', 'hari'),
  sebulan: at('kerap', 'sebulan'),
  tiga: at('kerap', 'tiga'),
  kons: S('konsisten'),
  paksa: at('konsisten', 'paksa'),
  kekayaan: at('konsisten', 'kekayaan'),
  cta: S('cta'),
  video: at('cta', 'video'),
  biru: at('cta', 'biru'),
};

const ITEMS: GItem[] = [
  {from: 0.05, to: M.kalau - 0.1, render: (d, r) => (
    <KineticHook dur={d} label="Ramai tanya · akaun emas GAP" size={60} words={[
      {text: 'WAJIB', at: 4, gold: true},
      {text: 'MENABUNG', at: r(M.wajib)},
      {text: 'SETIAP BULAN?', at: r(M.setiap)},
    ]} />
  )},
  {from: M.kalau - 0.1, to: E('hook') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconWarn size={84} />} label="Kalau" title="TER-MISS?" gold={false} size={76} sub="macam mana?" subAt={r(M.miss) + 8} />
  )},
  {from: M.intro + 0.05, to: E('intro') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCoin size={88} />} label="Paling mudah untuk mula" title="AKAUN EMAS GAP" size={64} sub="bajet kecil · tiada komitmen bulanan" subAt={r(M.bajet)} shine />
  )},
  {from: M.tak + 0.05, to: E('tak_wajib') + 0.15, render: (d, r) => (
    <MythFact dur={d} myth="WAJIB SETIAP BULAN" strikeAt={r(M.takw)} factAt={r(M.takw) + 14} fact="TAK WAJIB!" />
  )},
  {from: M.termiss + 0.05, to: E('termiss') + 0.15, render: (d, r) => (
    <ChecklistCard dur={d} label="Ter-miss satu bulan?" rows={[
      {text: 'Tiada caj', at: r(M.charge)},
      {text: 'Tiada penalti', at: r(M.penalty)},
    ]} />
  )},
  {from: M.platform + 0.05, to: E('platform') + 0.1, render: (d) => (
    <TitleCard dur={d} icon={<IconBank size={80} />} label="Public Gold sediakan" title="PLATFORM TABUNGAN" size={58} />
  )},
  {from: M.flex + 0.05, to: E('fleksibel') + 0.15, render: (d, r) => (
    <PillRow dur={d} label="Isi tabungan ikut" pills={[
      {text: 'MASA KITA', at: r(M.masa)},
      {text: 'BAJET KITA', at: r(M.bajet2)},
      {text: 'MIN RM100', at: r(M.min), good: true},
      {text: 'SITUASI KITA', at: r(M.situasi)},
    ]} />
  )},
  {from: M.kerap + 0.05, to: E('kerap') + 0.15, render: (d, r) => (
    <Choices dur={d} items={[
      {top: 'Setiap hari', main: 'BOLEH', at: r(M.hari), good: true},
      {top: 'Sebulan sekali', main: 'BOLEH', at: r(M.sebulan), good: true},
      {top: '2–3 bulan sekali', main: 'BOLEH', at: r(M.tiga), good: true},
    ]} />
  )},
  {from: M.kons + 0.05, to: E('konsisten') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconTarget size={84} />} label="Paling baik" title="KONSISTEN SETIAP BULAN" size={52} sub="tambah simpanan → bina kekayaan" subAt={r(M.kekayaan) - 8} shine />
  )},
  {from: M.cta, to: 9999, render: (d, r) => (
    <CtaCard dur={d} head="Belum ada akaun GAP?" pin={r(M.video)} guide={r(M.biru)} guideText="Isi BAG BIRU" />
  )},
];

const SFX: Sfx[] = [
  {t: 0.0, f: 'whoosh_impact', v: 0.42},
  {t: M.wajib, f: 'zoom_impact', v: 0.3},
  {t: M.setiap, f: 'pop_hard', v: 0.3},
  {t: M.kalau - 0.1, f: 'swoosh_fast', v: 0.3},
  {t: M.miss, f: 'glitch_text', v: 0.16},
  {t: M.intro + 0.05, f: 'tech_slide', v: 0.34},
  {t: M.bajet, f: 'coin_notif', v: 0.22},
  {t: M.tak + 0.05, f: 'whoosh_pop', v: 0.36},
  {t: M.takw, f: 'swoosh_accent', v: 0.34},
  {t: M.takw + 0.47, f: 'ding_correct', v: 0.26},
  {t: M.termiss + 0.05, f: 'tech_slide', v: 0.3},
  {t: M.charge + 0.15, f: 'ui_click', v: 0.36},
  {t: M.penalty + 0.15, f: 'ui_click', v: 0.36},
  {t: M.platform + 0.05, f: 'whoosh_small', v: 0.28},
  {t: M.flex + 0.05, f: 'swoosh_fast', v: 0.3},
  {t: M.masa, f: 'bubble_pop', v: 0.3},
  {t: M.bajet2, f: 'bubble_pop', v: 0.3},
  {t: M.min, f: 'coin_win', v: 0.3},
  {t: M.situasi, f: 'bubble_pop', v: 0.3},
  {t: M.hari, f: 'tech_select', v: 0.3},
  {t: M.sebulan, f: 'tech_select', v: 0.3},
  {t: M.tiga, f: 'tech_select', v: 0.3},
  {t: M.kons + 0.05, f: 'whoosh_cine', v: 0.3},
  {t: M.kekayaan - 0.25, f: 'sparkle', v: 0.24},
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

export const v11: VideoDef = {
  id: 'v11', tl, Overlays, sfx: SFX,
  punches: [M.wajib, M.miss, M.takw, M.min, M.paksa],
  zoom: {hook: [1.1], intro: [1.0], tak_wajib: [1.07], termiss: [1.0, 1.06], platform: [1.07], fleksibel: [1.0, 1.06], kerap: [1.06, 1.0], konsisten: [1.0, 1.07], cta: [1.06]},
  music: {file: 'bgm.mp3', startAt: 40},
};
export const WajibMenabung: React.FC<EditProps> = (p) => <Edit def={v11} {...p} />;
