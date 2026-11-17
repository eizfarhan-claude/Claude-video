/* v12 — Konsep akaun emas GAP dalam 30 saat */
import React from 'react';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {ChecklistCard, CtaCard, GItem, Schedule, StepCard, Subtitles, motionBusy} from '../../engine/kit';
import {KineticHook, PillRow, IntroFlash, TitleIntro} from '../../engine/kit2';
import {IconClock, IconCoin} from '../../engine/ui';

const tl = makeTimeline({...(edlJson as Edl), words: captionsJson as Word[]}, 30);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  konsep: at('hook', 'konsep'),
  gap: at('hook', 'gap'),
  n30: at('hook', '30'),
  p1: S('p1'),
  rm100: at('p1', 'rm100'),
  gram: at('p1', 'gram'),
  p2: S('p2'),
  jual: at('p2', 'jual'),
  pajak: at('p2', 'pajak'),
  withdraw: at('p2', 'withdraw'),
  p3: S('p3'),
  cas: at('p3', 'cas'),
  bila: at('p3', 'bila-bila'),
  expiry: at('p3', 'expiry'),
  cta: S('cta'),
  video: at('cta', 'video'),
  biru: at('cta', 'biru'),
};

const ITEMS: GItem[] = [
  {from: 0.0, to: E('hook') + 0.2, render: (d) => (
    <TitleIntro dur={d} tag="Akaun Emas GAP" line1="KONSEP AKAUN GAP" line2="DALAM 30 SAAT" l2At={14} />
  )},
  {from: M.p1 + 0.05, to: E('p1') + 0.1, render: (d, r) => (
    <StepCard dur={d} n={1} total={3} title="MULA DENGAN RM100" sub="setiap tabungan → gram emas" subAt={r(M.gram) - 6} icon={<IconCoin size={80} />} />
  )},
  {from: M.p2 + 0.05, to: E('p2') + 0.15, render: (d, r) => (
    <PillRow dur={d} label="② Dari akaun ini, boleh" pills={[
      {text: 'JUAL', at: r(M.jual)},
      {text: 'PAJAK', at: r(M.pajak)},
      {text: 'WITHDRAW FIZIKAL', at: r(M.withdraw), good: true},
    ]} />
  )},
  {from: M.p3 + 0.05, to: E('p3') + 0.15, render: (d, r) => (
    <ChecklistCard dur={d} label="③ Akaun emas GAP" rows={[
      {text: 'Tiada cas simpanan', at: r(M.cas)},
      {text: 'Simpan sampai bila-bila', at: r(M.bila)},
      {text: 'Tiada expiry date', at: r(M.expiry)},
    ]} />
  )},
  {from: M.cta, to: 9999, render: (d, r) => (
    <CtaCard dur={d} head="Nak simpan jangka panjang?" pin={r(M.video)} guide={r(M.biru)} guideText="Isi BAG BIRU" />
  )},
];

const SFX: Sfx[] = [
  {t: 0.0, f: 'whoosh_impact', v: 0.26},
  {t: 0.1, f: 'tech_slide', v: 0.12},
  {t: 0.2, f: 'zoom_impact', v: 0.18},
  {t: 0.47, f: 'impact_deep', v: 0.13},
  {t: 0.7, f: 'sparkle', v: 0.12},
  {t: M.p1 + 0.05, f: 'tech_slide', v: 0.34},
  {t: M.rm100, f: 'coin_win', v: 0.3},
  {t: M.gram - 0.2, f: 'coins', v: 0.26},
  {t: M.p2 + 0.05, f: 'swoosh_fast', v: 0.3},
  {t: M.jual, f: 'bubble_pop', v: 0.32},
  {t: M.pajak, f: 'bubble_pop', v: 0.32},
  {t: M.withdraw, f: 'money_bag', v: 0.3},
  {t: M.p3 + 0.05, f: 'tech_slide', v: 0.3},
  {t: M.cas + 0.15, f: 'ui_click', v: 0.36},
  {t: M.bila + 0.15, f: 'ui_click', v: 0.36},
  {t: M.expiry + 0.15, f: 'ui_click', v: 0.36},
  {t: M.cta, f: 'whoosh_pop', v: 0.34},
  {t: M.video, f: 'pop_msg', v: 0.3},
  {t: M.biru, f: 'bell_notif', v: 0.22},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <IntroFlash />
    <Schedule items={ITEMS} total={tl.total} />
    <Subtitles words={captionsJson as Word[]} busy={motionBusy(ITEMS, SFX)} />
  </>
);

export const v12: VideoDef = {
  id: 'v12', tl, Overlays, sfx: SFX,
  punches: [M.n30, M.rm100, M.withdraw, M.expiry],
  zoom: {hook: [1.1], p1: [1.0], p2: [1.06, 1.0], p3: [1.0, 1.06], cta: [1.07]},
  music: {file: 'curiosity.mp3', startAt: 2},
  focus: {to: E('hook') + 0.2},
};
export const KonsepGap: React.FC<EditProps> = (p) => <Edit def={v12} {...p} />;
