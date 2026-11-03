/* v2 — Dana Umrah 2 Tahun (simpanan emas) */
import React from 'react';
import edlJson from './edl.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline} from '../../engine/timeline';
import {BRollTrack, Choices, CtaCard, GItem, GoldProgress, IconCalendar, IconPlane, IconRepeat, Schedule, StepCard, TitleCard} from '../../engine/kit';
import {IconCoin, IconCheck} from '../../engine/ui';
import {GOLD_SOLID} from '../../engine/theme';

const tl = makeTimeline(edlJson as Edl);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  hook: 0.05,
  hookSub: at('hook', 'simpanan'),
  problem: S('problem'),
  bocor: at('problem', 'bocor'),
  emas: at('problem', 'emas'),
  dinar: at('problem', 'memiliki'),
  steps: S('steps'),
  s1: at('steps', 'pertama'),
  percuma: at('steps', 'percuma'),
  s2: at('steps', 'kedua'),
  gram: at('steps', 'gram'),
  s3: S('step3'),
  rm600: at('step3', 'rm600'),
  s3sub: at('step3', 'gram'),
  s4: S('step4'),
  g2125: at('step4', '21.25'),
  jual: at('step4', 'jual'),
  keluarkan: at('step4', 'keluarkan'),
  umrah: at('step4', 'umrah'),
  cta: S('cta'),
  pin: at('cta', 'pin'),
  guide: at('cta', 'guide'),
  final: at('cta', 'sampai'),
};

const ITEMS: GItem[] = [
  {from: M.hook, to: E('hook') + 0.2, render: (d, r) => (
    <TitleCard dur={d} icon={<IconPlane size={90} />} label="Jom target" title="UMRAH 2 TAHUN LAGI" size={62} sub="melalui simpanan emas" subAt={r(M.hookSub)} shine />
  )},
  {from: M.problem + 0.1, to: M.dinar - 0.1, render: (d, r) => (
    <Choices dur={d} items={[
      {top: 'Simpan duit', main: 'Selalu BOCOR', sub: 'terguna benda lain', at: r(M.bocor), bad: true},
      {top: 'Simpan emas', main: 'Target 2 tahun', sub: 'tak mudah terusik', at: r(M.emas), good: true},
    ]} />
  )},
  {from: M.dinar - 0.1, to: E('problem') + 0.3, render: (d) => (
    <TitleCard dur={d} icon={<IconCoin size={90} />} label="Dana umrah 1 orang" title="= 5 DINAR EMAS" size={66} shine />
  )},
  {from: M.steps + 0.1, to: M.s1 - 0.05, render: (d) => (
    <TitleCard dur={d} label="Caranya" title="4 LANGKAH MUDAH" gold size={66} />
  )},
  {from: M.s1 - 0.05, to: M.s2 - 0.05, render: (d, r) => (
    <StepCard dur={d} n={1} total={4} title="Daftar akaun GAP" sub={<><IconCheck size={32} /> PERCUMA</>} subAt={r(M.percuma)} />
  )},
  {from: M.s2 - 0.05, to: E('steps') + 0.25, render: (d, r) => (
    <StepCard dur={d} n={2} total={4} title="Konsisten setiap bulan" sub={<>1 gram × 1 bulan · 2 tahun</>} subAt={r(M.gram)} icon={<IconCalendar size={70} color={GOLD_SOLID} />} />
  )},
  {from: M.s3 + 0.05, to: E('step3') + 0.25, render: (d, r) => (
    <StepCard dur={d} n={3} total={4} title="Auto debit RM600 / bulan" sub={<>≈ 1 gram sebulan, tak miss</>} subAt={r(M.s3sub)} icon={<IconRepeat size={70} color={GOLD_SOLID} />} />
  )},
  {from: M.s4 + 0.05, to: M.g2125 + 1.2, render: (d) => (
    <StepCard dur={d} n={4} total={4} title="Cukup 21.25 gram" sub={<>dalam akaun GAP</>} subAt={10} />
  )},
  {from: M.g2125 + 1.2, to: E('step4') + 0.3, render: (d, r) => (
    <GoldProgress dur={d} label="Akaun GAP" target={21.25} fill0={0} fill1={r(M.jual)} doneAt={r(M.keluarkan)} done={<>Jual / keluarkan <span style={{color: GOLD_SOLID}}>5 Dinar</span> = umrah</>} />
  )},
  {from: M.cta + 0.2, to: 9999, render: (d, r) => (
    <CtaCard dur={d} head="Plan nak pergi umrah?" pin={r(M.pin)} guide={r(M.guide)} final={r(M.final)} finalLabel="Capai target simpanan" finalTitle="DANA UMRAH" />
  )},
];

const BROLL = [
  {file: 'v1/broll/coin.mp4', from: M.keluarkan - 0.1, to: M.umrah + 0.6, srcStart: 0.3},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <BRollTrack cuts={BROLL} />
    <Schedule items={ITEMS} total={tl.total} />
  </>
);

const SFX: Sfx[] = [
  {t: M.hook, f: 'whoosh_cine', v: 0.45},
  {t: M.hook + 0.05, f: 'impact_deep', v: 0.25},
  {t: M.hookSub, f: 'sparkle', v: 0.3},
  {t: M.problem, f: 'whoosh_small', v: 0.3},
  {t: M.bocor, f: 'pop_hard', v: 0.4},
  {t: M.emas, f: 'ding_correct', v: 0.32},
  {t: M.dinar - 0.1, f: 'gold_prize', v: 0.4},
  {t: M.steps, f: 'whoosh_small', v: 0.3},
  {t: M.s1 - 0.05, f: 'pop_msg', v: 0.42},
  {t: M.percuma, f: 'click_select', v: 0.4},
  {t: M.s2 - 0.05, f: 'pop_msg', v: 0.42},
  {t: M.gram, f: 'coins', v: 0.35},
  {t: M.s3, f: 'pop_msg', v: 0.42},
  {t: M.rm600, f: 'atm_key', v: 0.3},
  {t: M.s4, f: 'pop_msg', v: 0.42},
  {t: M.g2125, f: 'sparkle', v: 0.3},
  {t: M.keluarkan - 0.12, f: 'whoosh_small', v: 0.3},
  {t: M.keluarkan, f: 'ding_correct', v: 0.35},
  {t: M.cta, f: 'whoosh_small', v: 0.3},
  {t: M.pin, f: 'bell_notif', v: 0.32},
  {t: M.guide, f: 'pop_msg', v: 0.35},
  {t: M.final - 0.1, f: 'gold_prize', v: 0.4},
];

export const v2: VideoDef = {
  id: 'v2',
  tl,
  Overlays,
  sfx: SFX,
  punches: [M.bocor, M.percuma, M.rm600, M.g2125, M.pin],
  zoom: {hook: [1.1, 1.0], problem: [1.0, 1.07], steps: [1.06, 1.0], step3: [1.0, 1.07], step4: [1.07, 1.0], cta: [1.0, 1.08]},
  music: {file: 'bgm.mp3', startAt: 40},
};

export const Umrah: React.FC<EditProps> = (p) => <Edit def={v2} {...p} />;
