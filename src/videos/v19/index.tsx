/* v19 — RM1 juta pada 2006: masih jutawan pada 2026? */
import React from 'react';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {ChecklistCard, CtaCard, GItem, IconChartDown, IconShield, Schedule, Subtitles, TitleCard, motionBusy} from '../../engine/kit';
import {BigStat, KineticHook, PillRow, IntroFlash, TitleIntro} from '../../engine/kit2';
import {IconCoin, IconPin, IconTarget} from '../../engine/ui';

const tl = makeTimeline({...(edlJson as Edl), words: captionsJson as Word[]}, 30);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  juta: at('hook', 'juta'),
  hook2: S('hook2'),
  masih: at('hook2', 'masih'),
  jutawan: at('hook2', 'jutawan'),
  y26: at('hook2', '2026'),
  hook3: S('hook3'),
  save: at('hook3', 'save'),
  y2006: S('y2006'),
  kg145: at('y2006', 'sekitar'),
  kini: S('kini'),
  kg154: at('kini', 'sekitar'),
  inflasi: S('inflasi'),
  menyusut: at('inflasi', 'menyusut'),
  lagi: at('inflasi', 'lagi'),
  nasihat: S('nasihat'),
  kekal: at('nasihat', 'kekal'),
  tukarkan: at('nasihat', 'tukarkan'),
  terjamin: at('nasihat', 'terjamin'),
  inflasiW: at('nasihat', 'inflasi'),
  nasihat2: S('nasihat2'),
  ekonomi: at('nasihat2', 'ekonomi'),
  politik: at('nasihat2', 'politik'),
  cta: S('cta'),
  video: at('cta2', 'video'),
  biru: at('cta2', 'biru'),
  outro: S('outro'),
};

const ITEMS: GItem[] = [
  {from: 0.0, to: E('hook2') + 0.15, render: (d) => (
    <TitleIntro dur={d} tag="RM1 juta pada tahun 2006" line1="MASIH JUTAWAN" line2="PADA 2026?" l2At={14} />
  )},
  {from: M.hook3 + 0.05, to: E('hook3') + 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconPin size={74} color="#F5C84C" />} label="Tonton sampai habis" title="SAVE VIDEO INI" size={64} gold={false} sub="untuk rujukan akan datang" subAt={r(M.save)} />
  )},
  {from: M.y2006 + 0.05, to: E('y2006') + 0.15, render: (d, r) => (
    <BigStat dur={d} label="RM1 juta → emas · 2006" value={14.5} decimals={1} suffix=" KG" countTo={r(M.kg145) + 16} sub="emas fizikal" subAt={r(M.kg145) + 20} icon={<IconCoin size={84} />} />
  )},
  {from: M.kini + 0.05, to: E('kini') + 0.15, render: (d, r) => (
    <BigStat dur={d} label="RM1 juta → emas · hari ini" value={1.54} decimals={2} suffix=" KG" countTo={r(M.kg154) + 16} sub="hanya ~10% daripada dulu" subAt={r(M.kg154) + 40} icon={<IconChartDown size={84} />} />
  )},
  {from: M.inflasi + 0.05, to: E('inflasi') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconChartDown size={84} />} label="Nilai mata wang" title="TERUS MENYUSUT" size={62} gold={false} sub="20 tahun lalu → 20 tahun akan datang" subAt={r(M.lagi)} />
  )},
  {from: M.nasihat + 0.05, to: M.tukarkan - 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconTarget size={84} />} label="Nak kekal jutawan" title="20 TAHUN LAGI?" size={66} />
  )},
  {from: M.tukarkan - 0.1, to: E('nasihat') + 0.15, render: (d, r) => (
    <ChecklistCard dur={d} label="Tukar ke simpanan emas" rows={[
      {text: 'Simpanan lebih terjamin', at: r(M.terjamin)},
      {text: 'Selamat daripada inflasi', at: r(M.inflasiW)},
    ]} />
  )},
  {from: M.nasihat2 + 0.05, to: E('nasihat2') + 0.15, render: (d, r) => (
    <PillRow dur={d} label="Lindungi kekayaan daripada" pills={[
      {text: 'MATA WANG JATUH', at: 2, bad: true},
      {text: 'EKONOMI', at: r(M.ekonomi), bad: true},
      {text: 'POLITIK', at: r(M.politik), bad: true},
    ]} />
  )},
  {from: M.cta, to: M.outro, render: (d, r) => (
    <CtaCard dur={d} head="Nak simpan kekayaan lebih selamat?" pin={r(M.video)} guide={r(M.biru)} guideText="Isi BAG BIRU" />
  )},
  {from: M.outro, to: 9999, render: (d) => (
    <TitleCard dur={d} icon={<IconShield size={84} />} label="Tukarkan kekayaan hari ini" title="NILAI LEBIH KUKUH" size={60} shine />
  )},
];

const SFX: Sfx[] = [
  {t: 0.0, f: 'whoosh_impact', v: 0.45},
  {t: 0.1, f: 'tech_slide', v: 0.22},
  {t: 0.2, f: 'zoom_impact', v: 0.32},
  {t: 0.47, f: 'impact_deep', v: 0.26},
  {t: 0.7, f: 'sparkle', v: 0.22},
  {t: M.hook3 + 0.05, f: 'pop_msg', v: 0.3},
  {t: M.save, f: 'shutter', v: 0.3},
  {t: M.y2006 + 0.05, f: 'news_intro', v: 0.2},
  {t: M.kg145 + 0.5, f: 'coin_win', v: 0.3},
  {t: M.kini + 0.05, f: 'swoosh_fast', v: 0.3},
  {t: M.kg154 + 0.5, f: 'impact_deep', v: 0.22},
  {t: M.inflasi + 0.05, f: 'whoosh_small', v: 0.28},
  {t: M.menyusut, f: 'heartbeat', v: 0.28},
  {t: M.nasihat + 0.05, f: 'tech_slide', v: 0.3},
  {t: M.kekal, f: 'pop_hard', v: 0.24},
  {t: M.tukarkan - 0.1, f: 'whoosh_cine', v: 0.28},
  {t: M.terjamin + 0.15, f: 'ui_click', v: 0.36},
  {t: M.inflasiW + 0.15, f: 'ui_click', v: 0.36},
  {t: M.nasihat2 + 0.05, f: 'swoosh_fast', v: 0.28},
  {t: M.nasihat2 + 0.12, f: 'bubble_pop', v: 0.28},
  {t: M.ekonomi, f: 'bubble_pop', v: 0.28},
  {t: M.politik, f: 'bubble_pop', v: 0.28},
  {t: M.cta, f: 'whoosh_pop', v: 0.34},
  {t: M.video, f: 'pop_msg', v: 0.3},
  {t: M.biru, f: 'bell_notif', v: 0.22},
  {t: M.outro, f: 'gold_prize', v: 0.26},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <IntroFlash />
    <Schedule items={ITEMS} total={tl.total} />
    <Subtitles words={captionsJson as Word[]} busy={motionBusy(ITEMS, SFX)} />
  </>
);

export const v19: VideoDef = {
  id: 'v19', tl, Overlays, sfx: SFX,
  punches: [M.juta, M.y26, M.kg145 + 0.5, M.kg154 + 0.5, M.menyusut, M.kekal],
  zoom: {hook: [1.1], hook2: [1.0], hook3: [1.06], y2006: [1.0], kini: [1.06, 1.0], inflasi: [1.0], nasihat: [1.06, 1.0], nasihat2: [1.0], cta: [1.06], cta2: [1.06], outro: [1.08]},
  music: {file: 'lofi04.mp3', startAt: 60},
  focus: {to: E('hook2') + 0.15},
};
export const Jutawan: React.FC<EditProps> = (p) => <Edit def={v19} {...p} />;
