/* v11 — 3 tips mudah menabung emas */
import React from 'react';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {BRollTrack, GItem, IconCalendar, IconChat, IconHouse, IconRepeat, IconRings, IconSun, Schedule, StepCard, Subtitles, TitleCard, JourneyCard, motionBusy} from '../../engine/kit';
import {IconCoin, IconTarget} from '../../engine/ui';

const tl = makeTimeline(edlJson as Edl, 30);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  hook: 0.05,
  menabung: at('hook', 'menabung'),
  t1: S('t1'),
  topup: at('t1', 'top'),
  t2: S('t2'),
  konsisten: at('t2', 'konsisten'),
  t3: S('t3'),
  gram: at('t3', 'gram'),
  kahwin: at('kahwin', 'kahwin'),
  haji: at('haji', 'haji'),
  rumah: at('rumah', 'rumah'),
  dana: at('rumah', 'dana'),
  kilogram: at('rumah', 'kilogram'),
  outro: S('outro'),
  follow: at('outro', 'follow'),
};

const ITEMS: GItem[] = [
  {from: M.hook, to: E('hook') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCoin size={92} />} label="Tips mudah" title="3 TIPS MENABUNG EMAS" size={56} shine />
  )},
  {from: M.t1 + 0.05, to: E('t1') + 0.15, render: (d, r) => (
    <StepCard dur={d} n={1} total={3} title="ADA DUIT? TERUS TOP UP" sub="akaun GAP / beli emas" subAt={r(M.topup)} icon={<IconCoin size={76} />} />
  )},
  {from: M.t2 + 0.05, to: E('t2') + 0.15, render: (d, r) => (
    <StepCard dur={d} n={2} total={3} title="KONSISTEN SETIAP BULAN" sub="harga tinggi atau rendah" subAt={r(M.konsisten)} icon={<IconRepeat size={76} />} />
  )},
  {from: M.t3 + 0.05, to: S('kahwin') - 0.1, render: (d, r) => (
    <StepCard dur={d} n={3} total={3} title="FOKUS PADA GRAM" sub="ikut matlamat & tujuan" subAt={r(M.gram)} icon={<IconTarget size={76} />} />
  )},
  {from: S('kahwin') - 0.1, to: M.dana - 0.1, render: (d, r) => (
    <JourneyCard dur={d} label="Contoh target gram" nodes={[
      {text: 'Kahwin 50g', icon: <IconRings size={56} />, at: r(M.kahwin)},
      {text: 'Haji 50g', icon: <IconSun size={56} />, at: r(M.haji)},
      {text: 'Rumah 100g', icon: <IconHouse size={56} />, at: r(M.rumah)},
    ]} />
  )},
  {from: M.dana - 0.1, to: M.outro, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCalendar size={84} />} label="Dana persaraan" title="TARGET 2 KG EMAS" size={60} sub="2,000 gram untuk hari tua" subAt={r(M.kilogram)} shine />
  )},
  {from: M.outro, to: 9999, render: (d, r) => (
    <TitleCard dur={d} icon={<IconChat size={80} />} label="Nak lebih ilmu?" title="FOLLOW UNTUK ILMU EMAS" gold={false} size={50} sub="emas & kewangan" subAt={r(M.follow)} />
  )},
];

const SFX: Sfx[] = [
  {t: M.hook, f: 'whoosh_cine', v: 0.45},
  {t: M.hook + 0.05, f: 'impact_deep', v: 0.26},
  {t: M.menabung, f: 'gold_prize', v: 0.22},
  {t: M.t1 + 0.05, f: 'whoosh_pop', v: 0.4},
  {t: M.topup, f: 'atm_key', v: 0.32},
  {t: M.t2 + 0.05, f: 'whoosh_pop', v: 0.4},
  {t: M.konsisten, f: 'click_select', v: 0.34},
  {t: M.t3 + 0.05, f: 'whoosh_pop', v: 0.4},
  {t: M.gram, f: 'coins', v: 0.3},
  {t: S('kahwin') - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.kahwin, f: 'pop_msg', v: 0.32},
  {t: M.haji, f: 'pop_msg', v: 0.32},
  {t: M.rumah, f: 'pop_msg', v: 0.32},
  {t: M.dana - 0.1, f: 'whoosh_cine', v: 0.3},
  {t: M.kilogram - 0.55, f: 'whoosh_small', v: 0.26},
  {t: M.kilogram, f: 'money_bag', v: 0.3},
  {t: at('kahwin', '50') - 0.2, f: 'whoosh_small', v: 0.24},
  {t: at('haji', '50') - 0.2, f: 'whoosh_small', v: 0.24},
  {t: at('rumah', '100') - 0.2, f: 'whoosh_small', v: 0.24},
  {t: at('rumah', '100'), f: 'gold_price', v: 0.18},
  {t: M.kilogram + 0.2, f: 'sparkle', v: 0.22},
  {t: M.outro, f: 'bell_notif', v: 0.26},
];

// Real gold-bar cutaways (voice keeps running): 50g, 100g, 1kg bars on the gram figures
const BROLL = [
  {file: 'v11/broll/g50.mp4', from: at('kahwin', '50') - 0.2, to: S('haji') - 0.1, srcStart: 9.5},
  {file: 'v11/broll/g50.mp4', from: at('haji', '50') - 0.2, to: S('rumah') - 0.15, srcStart: 13},
  {file: 'v11/broll/g100.mp4', from: at('rumah', '100') - 0.2, to: at('rumah', 'dan') + 0.2, srcStart: 2.5},
  {file: 'v11/broll/kg.mp4', from: M.kilogram - 0.55, to: M.outro - 0.05, srcStart: 19.5},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <BRollTrack cuts={BROLL} />
    <Schedule items={ITEMS} total={tl.total} />
    <Subtitles words={captionsJson as Word[]} busy={motionBusy(ITEMS, SFX, BROLL.map((b) => [b.from - 0.2, b.to + 0.2] as [number, number]))} />
  </>
);

export const v11: VideoDef = {
  id: 'v11', tl, Overlays, sfx: SFX,
  punches: [M.menabung, M.t1 + 0.1, M.t2 + 0.1, M.t3 + 0.1, M.kilogram],
  zoom: {hook: [1.12], t1: [1.0], t2: [1.06, 1.0], t3: [1.0], kahwin: [1.06], haji: [1.0], rumah: [1.06], outro: [1.08]},
  music: {file: 'bgm.mp3', startAt: 30},
};
export const TigaTips: React.FC<EditProps> = (p) => <Edit def={v11} {...p} />;
