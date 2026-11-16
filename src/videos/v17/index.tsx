/* v17 — Kos haji: mahal dalam ringgit, murah dalam emas */
import React from 'react';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {CtaCard, GItem, GoldProgress, GramTimeline, IconCalendar, Schedule, Subtitles, TitleCard, motionBusy} from '../../engine/kit';
import {BigStat, VsCard} from '../../engine/kit2';
import {IconCheck, IconCoin} from '../../engine/ui';

const tl = makeTimeline({...(edlJson as Edl), words: captionsJson as Word[]}, 30);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  mahal: at('hook', 'mahal'),
  murah: at('hook', 'murah'),
  emas: at('hook', 'emas'),
  y1998: S('y1998'),
  rm8: at('y1998', 'rm8,000'),
  g267: at('y1998', '267 gram emas'),
  kini: S('kini'),
  rm30: at('kini', 'rm30,000'),
  meningkat: at('kini', 'meningkat'),
  tetapi2: at('kini', 'tetapi', 1),
  g50: at('kini', '50'),
  menurun: at('kini', 'menurun'),
  sedia: S('sedia'),
  bersedia: at('sedia', 'bersedia'),
  plan: S('plan'),
  saranan: at('plan', 'saranan'),
  target: at('plan', 'target'),
  layak: at('plan', 'layak'),
  cta: S('cta'),
  pin: at('cta', 'pin'),
  biru: at('cta', 'biru'),
  rukun: at('cta', 'rukun'),
};

const ITEMS: GItem[] = [
  {from: 0.05, to: E('hook') + 0.15, render: (d, r) => (
    <VsCard dur={d} a={{top: 'Kos haji · ringgit', main: 'MAHAL', at: r(M.mahal) - 4}} b={{top: 'Kos haji · emas', main: 'MURAH', at: r(M.murah) - 4}} winner="b" winAt={r(M.emas)} />
  )},
  {from: M.y1998 + 0.05, to: E('y1998') + 0.15, render: (d, r) => (
    <BigStat dur={d} label="Kos haji · tahun 1998" value={8000} prefix="RM" countTo={r(M.rm8) + 10} sub="≈ 267 gram emas" subAt={r(M.g267)} icon={<IconCalendar size={80} />} />
  )},
  {from: M.kini + 0.05, to: M.tetapi2 - 0.1, render: (d, r) => (
    <BigStat dur={d} label="Kos haji · hari ini" value={30000} prefix="RM" countTo={r(M.rm30) + 10} sub="naik dari RM8,000" subAt={r(M.meningkat)} icon={<IconCalendar size={80} />} />
  )},
  {from: M.tetapi2 - 0.1, to: E('kini') + 0.15, render: (d, r) => (
    <GramTimeline dur={d} label="Kos haji dalam gram emas" cols={[
      {top: '1998', grams: 267, at: 4, tag: 'RM8,000', tagAt: 10},
      {top: 'Hari ini', grams: 50, at: r(M.g50), tag: 'RM30,000', tagAt: r(M.g50) + 10},
    ]} />
  )},
  {from: M.sedia + 0.05, to: E('sedia') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCheck size={84} />} label="Dah ada 50 gram emas?" title="DAH BOLEH KE HAJI" size={58} shine />
  )},
  {from: M.plan + 0.05, to: M.saranan - 0.1, render: (d) => (
    <TitleCard dur={d} icon={<IconCalendar size={80} />} label="Plan pergi haji" title="3–4 TAHUN LAGI?" size={62} gold={false} />
  )},
  {from: M.saranan - 0.1, to: E('plan') + 0.15, render: (d, r) => (
    <GoldProgress dur={d} label="Target dana haji" target={50} fill0={r(M.target)} fill1={r(M.layak)} doneAt={r(M.layak)} done="LAYAK KE HAJI" />
  )},
  {from: M.cta, to: 9999, render: (d, r) => (
    <CtaCard dur={d} head="Nak bina dana haji?" pin={r(M.pin)} guide={r(M.biru)} guideText="Isi BAG BIRU" final={r(M.rukun) - 6} finalLabel="Lengkapkan" finalTitle="RUKUN ISLAM KE-5" />
  )},
];

const SFX: Sfx[] = [
  {t: 0.0, f: 'whoosh_impact', v: 0.4},
  {t: M.mahal - 0.13, f: 'bubble_pop', v: 0.3},
  {t: M.murah - 0.13, f: 'bubble_pop', v: 0.3},
  {t: M.emas, f: 'ding_correct', v: 0.26},
  {t: M.y1998 + 0.05, f: 'tech_slide', v: 0.32},
  {t: M.rm8, f: 'typing', v: 0.2},
  {t: M.g267, f: 'coin_notif', v: 0.26},
  {t: M.kini + 0.05, f: 'swoosh_fast', v: 0.3},
  {t: M.rm30, f: 'typing', v: 0.2},
  {t: M.meningkat, f: 'impact_deep', v: 0.2},
  {t: M.tetapi2 - 0.1, f: 'whoosh_cine', v: 0.3},
  {t: M.g50, f: 'coins', v: 0.28},
  {t: M.menurun, f: 'swoosh_accent', v: 0.3},
  {t: M.sedia + 0.05, f: 'whoosh_pop', v: 0.34},
  {t: M.bersedia, f: 'sparkle', v: 0.24},
  {t: M.plan + 0.05, f: 'tech_slide', v: 0.3},
  {t: M.saranan - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.target, f: 'coins', v: 0.24},
  {t: M.layak, f: 'coin_win', v: 0.3},
  {t: M.cta, f: 'whoosh_pop', v: 0.34},
  {t: M.pin, f: 'pop_msg', v: 0.3},
  {t: M.biru, f: 'bell_notif', v: 0.22},
  {t: M.rukun - 0.2, f: 'gold_prize', v: 0.26},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <Schedule items={ITEMS} total={tl.total} />
    <Subtitles words={captionsJson as Word[]} busy={motionBusy(ITEMS, SFX)} />
  </>
);

export const v17: VideoDef = {
  id: 'v17', tl, Overlays, sfx: SFX,
  punches: [M.murah, M.rm8, M.rm30, M.g50, M.bersedia, M.layak],
  zoom: {hook: [1.1], y1998: [1.0], kini: [1.06, 1.0], sedia: [1.07], plan: [1.0, 1.06], cta: [1.06]},
  music: {file: 'curiosity.mp3', startAt: 20},
};
export const KosHaji: React.FC<EditProps> = (p) => <Edit def={v17} {...p} />;
