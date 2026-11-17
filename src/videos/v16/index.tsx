/* v16 — Gaji masuk: bayar diri sendiri dulu */
import React from 'react';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {Choices, GItem, IconChat, IconRepeat, IconShield, IconWallet, JourneyCard, Schedule, Subtitles, TitleCard, motionBusy} from '../../engine/kit';
import {KineticHook, PillRow, VsCard, IntroFlash, TitleIntro} from '../../engine/kit2';
import {IconCoin} from '../../engine/ui';

const tl = makeTimeline({...(edlJson as Edl), words: captionsJson as Word[]}, 30);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  siapa: at('hook', 'siapa'),
  bayar: at('hook', 'bayar'),
  dulu: at('hook', 'dulu'),
  p1: S('p1'),
  berjaya: at('p1', 'berjaya'),
  diri: at('p1', 'diri'),
  alihkan: at('p1', 'alihkan'),
  penat: at('p1', 'penat'),
  p2: S('p2'),
  sedang1: at('p2', 'sedang', 0),
  sedang2: at('p2', 'sedang', 1),
  lain: at('p2', 'lain', 1),
  auto: S('auto'),
  automatik: at('auto', 'automatik'),
  dapat: at('auto', 'dapat'),
  autoW: at('auto', 'auto'),
  simpanan: at('auto', 'simpanan', 0),
  konsisten: at('auto', 'ditukarkan'),
  paksa: S('paksa'),
  paksaW: at('paksa', 'paksa'),
  whatever: at('paksa', 'whatever'),
  lebih: S('lebih'),
  belanja: at('lebih', 'pembelanjaan'),
  komitmen: at('lebih', 'komitmen'),
  utama: S('utama'),
  diri2: at('utama', 'diri'),
  orang: at('utama', 'orang'),
  outro: S('outro'),
};

const ITEMS: GItem[] = [
  {from: 0.0, to: E('hook') + 0.15, render: (d) => (
    <TitleIntro dur={d} tag="Gaji dah masuk" line1="SIAPA ANDA" line2="BAYAR DULU?" l2At={14} />
  )},
  {from: M.p1 + 0.05, to: M.alihkan - 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconWallet size={84} />} label="Orang yang berjaya kewangan" title="BAYAR DIRI SENDIRI" size={58} sub="dulu — melalui simpanan" subAt={r(M.diri) + 6} shine />
  )},
  {from: M.alihkan - 0.15, to: E('p1') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCoin size={86} />} label="Alihkan sedikit gaji" title="→ SIMPANAN" size={70} sub="tanda penat lelah sebulan" subAt={r(M.penat)} />
  )},
  {from: M.p2 + 0.05, to: E('p2') + 0.15, render: (d, r) => (
    <VsCard dur={d} a={{top: 'Bayar diri sendiri', main: 'KAYAKAN DIRI', at: r(M.sedang1)}} b={{top: 'Bayar orang lain', main: 'KAYAKAN ORANG', at: r(M.sedang2)}} winner="a" winAt={r(M.lain) + 12} />
  )},
  {from: M.auto + 0.05, to: M.dapat - 0.1, render: (d) => (
    <TitleCard dur={d} icon={<IconRepeat size={84} color="#F5C84C" />} label="Kayakan diri dulu, secara" title="AUTOMATIK" size={74} shine />
  )},
  {from: M.dapat - 0.1, to: E('auto') + 0.15, render: (d, r) => (
    <JourneyCard dur={d} label="Supaya lebih konsisten" nodes={[
      {text: 'GAJI MASUK', icon: <IconWallet size={54} />, at: r(M.dapat)},
      {text: 'AUTO DEBIT', icon: <IconRepeat size={54} />, at: r(M.autoW)},
      {text: 'SIMPANAN', icon: <IconCoin size={54} />, at: r(M.simpanan)},
    ]} />
  )},
  {from: M.paksa + 0.05, to: E('paksa') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconShield size={84} />} label="Paksa diri bayar diri sendiri" title="WHATEVER HAPPEN" size={60} />
  )},
  {from: M.lebih + 0.05, to: E('lebih') + 0.15, render: (d, r) => (
    <PillRow dur={d} label="Baki gaji, barulah untuk orang lain" pills={[
      {text: 'PEMBELANJAAN', at: r(M.belanja)},
      {text: 'KOMITMEN', at: r(M.komitmen)},
    ]} />
  )},
  {from: M.utama + 0.05, to: E('utama') + 0.15, render: (d, r) => (
    <Choices dur={d} items={[
      {top: 'Keutamaan #1', main: 'DIRI SENDIRI', at: r(M.diri2), good: true},
      {top: 'Kemudian', main: 'ORANG LAIN', at: r(M.orang)},
    ]} />
  )},
  {from: M.outro, to: 9999, render: (d) => (
    <TitleCard dur={d} icon={<IconChat size={80} />} label="Komen di bawah" title="DAPAT SESUATU?" gold={false} size={62} />
  )},
];

const SFX: Sfx[] = [
  {t: 0.0, f: 'whoosh_impact', v: 0.26},
  {t: 0.1, f: 'tech_slide', v: 0.12},
  {t: 0.2, f: 'zoom_impact', v: 0.18},
  {t: 0.47, f: 'impact_deep', v: 0.13},
  {t: 0.7, f: 'sparkle', v: 0.12},
  {t: M.p1 + 0.05, f: 'tech_slide', v: 0.32},
  {t: M.diri + 0.2, f: 'sparkle', v: 0.22},
  {t: M.alihkan - 0.15, f: 'swoosh_fast', v: 0.28},
  {t: M.alihkan + 0.3, f: 'coins', v: 0.26},
  {t: M.p2 + 0.05, f: 'swoosh_fast', v: 0.3},
  {t: M.sedang1, f: 'bubble_pop', v: 0.3},
  {t: M.sedang2, f: 'bubble_pop', v: 0.3},
  {t: M.lain + 0.4, f: 'ding_correct', v: 0.24},
  {t: M.auto + 0.05, f: 'whoosh_cine', v: 0.3},
  {t: M.dapat - 0.1, f: 'tech_slide', v: 0.3},
  {t: M.dapat, f: 'atm_key', v: 0.3},
  {t: M.autoW, f: 'tech_select', v: 0.32},
  {t: M.simpanan, f: 'coin_notif', v: 0.26},
  {t: M.paksa + 0.05, f: 'whoosh_pop', v: 0.34},
  {t: M.whatever, f: 'zoom_impact', v: 0.28},
  {t: M.lebih + 0.05, f: 'swoosh_fast', v: 0.28},
  {t: M.belanja, f: 'bubble_pop', v: 0.3},
  {t: M.komitmen, f: 'bubble_pop', v: 0.3},
  {t: M.utama + 0.05, f: 'tech_slide', v: 0.3},
  {t: M.diri2, f: 'ding_correct', v: 0.26},
  {t: M.orang, f: 'pop_msg', v: 0.28},
  {t: M.outro, f: 'bell_notif', v: 0.26},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <IntroFlash />
    <Schedule items={ITEMS} total={tl.total} />
    <Subtitles words={captionsJson as Word[]} busy={motionBusy(ITEMS, SFX)} />
  </>
);

export const v16: VideoDef = {
  id: 'v16', tl, Overlays, sfx: SFX,
  punches: [M.dulu, M.berjaya, M.lain, M.automatik, M.whatever, M.diri2],
  zoom: {hook: [1.1], p1: [1.0, 1.06], p2: [1.07], auto: [1.0, 1.06], paksa: [1.08], lebih: [1.0], utama: [1.06], outro: [1.08]},
  music: {file: 'bgm.mp3', startAt: 150},
  focus: {to: E('hook') + 0.15},
};
export const BayarDiri: React.FC<EditProps> = (p) => <Edit def={v16} {...p} />;
