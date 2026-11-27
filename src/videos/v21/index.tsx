/* v21 — Menabung = bina kekayaan */
import React from 'react';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {IntroFlash, TitleIntro} from '../../engine/kit2';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {ChecklistCard, Choices, CtaCard, GItem, IconCalendar, IconWallet, Schedule, Subtitles, TitleCard, motionBusy} from '../../engine/kit';
import {IconArrowUp, IconCoin} from '../../engine/ui';

const tl = makeTimeline(edlJson as Edl, 15);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  hook: 0.05,
  berbelanja: at('lawan', 'berbelanja'),
  menabung1: at('lawan', 'menabung'),
  lawan: at('lawan', 'lawan'),
  belanja: S('belanja'),
  sikitkan: at('belanja', 'sikitkan'),
  kaya: S('kaya'),
  membina: at('kaya', 'membina'),
  paksa: S('paksa'),
  paksa1: at('paksa', 'paksa', 1),
  why: S('why'),
  hutang: at('why', 'hutang'),
  harta: at('why', 'harta'),
  kekayaan: at('why', 'kekayaan'),
  gaji: S('gaji'),
  bonus: at('gaji', 'bonus'),
  peluang: S('peluang'),
  cepat: at('peluang', 'cepat'),
  tukarkan: at('peluang', 'tukarkan'),
  positif: S('positif'),
  berubah: at('positif', 'berubah'),
  cta: S('cta'),
  pin: at('cta', 'pin'),
  isi: at('cta', 'isi'),
  convert: at('cta', 'convert'),
};

const ITEMS: GItem[] = [
  {from: 0.0, to: E('hook') + 0.15, render: (d) => (
    <TitleIntro dur={d} tag="Bila sebut tentang menabung" line1="TAK SEMUA ORANG" line2="SUKA MENABUNG" l2At={14} />
  )},
  {from: E('hook') + 0.15, to: M.menabung1 - 0.1, render: (d) => (
    <TitleCard dur={d} icon={<IconWallet size={86} />} label="Sebab kita lebih suka" title="BERBELANJA" gold={false} size={70} />
  )},
  {from: M.menabung1 - 0.1, to: M.kaya - 0.1, render: (d, r) => (
    <Choices dur={d} items={[
      {top: 'Menabung', main: 'SIMPAN', at: 0, good: true},
      {top: 'Lawan kepada', main: 'BELANJA', sub: 'kena sikitkan', at: r(M.lawan), bad: true},
    ]} />
  )},
  {from: M.kaya - 0.1, to: E('kaya') + 0.15, render: (d) => (
    <TitleCard dur={d} icon={<IconCoin size={86} />} label="Dengan tabungan, anda sedang" title="MEMBINA KEKAYAAN" size={60} shine />
  )},
  {from: M.paksa + 0.05, to: E('paksa') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCalendar size={80} />} label="Bila dapat gaji" title="PAKSA SIMPAN" size={70} sub="alihkan sebahagian gaji → simpanan" subAt={r(M.paksa1)} />
  )},
  {from: M.why + 0.05, to: E('why') + 0.15, render: (d, r) => (
    <ChecklistCard dur={d} label="Bahagian yang anda simpan untuk" rows={[
      {text: 'Settlekan hutang', at: r(M.hutang)},
      {text: 'Bina harta', at: r(M.harta)},
      {text: 'Bina kekayaan', at: r(M.kekayaan)},
    ]} />
  )},
  {from: M.gaji + 0.05, to: E('gaji') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconWallet size={84} />} label="Masih ada gaji setiap bulan?" title="GAJI + BONUS" size={70} sub="manfaatkan kelebihan ini" subAt={r(M.bonus)} />
  )},
  {from: M.peluang + 0.05, to: E('peluang') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconArrowUp size={80} />} label="Inilah peluang" title="KAYA LEBIH CEPAT" size={62} sub="tukarkan kepada simpanan" subAt={r(M.tukarkan)} shine />
  )},
  {from: M.positif + 0.05, to: E('positif') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCoin size={84} />} label="Simpanan = kekayaan anda" title="KEWANGAN LEBIH POSITIF" size={50} sub="berubah ke arah lebih baik" subAt={r(M.berubah)} shine />
  )},
  {from: M.cta + 0.05, to: 9999, render: (d, r) => (
    <CtaCard dur={d} head="Nak mula simpan emas?" pin={r(M.pin)} guide={r(M.isi)} guideText="Isi BEG BIRU" final={r(M.convert)} finalLabel="Gaji → emas" finalTitle="SECARA AUTOMATIK" />
  )},
];

const SFX: Sfx[] = [
  {t: 0.0, f: 'whoosh_impact', v: 0.26},
  {t: 0.1, f: 'tech_slide', v: 0.12},
  {t: 0.2, f: 'zoom_impact', v: 0.18},
  {t: 0.47, f: 'impact_deep', v: 0.13},
  {t: 0.7, f: 'sparkle', v: 0.12},
  {t: E('hook') + 0.15, f: 'whoosh_small', v: 0.28},
  {t: M.berbelanja, f: 'pop_msg', v: 0.34},
  {t: M.menabung1 - 0.1, f: 'whoosh_small', v: 0.3},
  {t: M.lawan, f: 'pop_hard', v: 0.34},
  {t: M.kaya - 0.1, f: 'whoosh_pop', v: 0.4},
  {t: M.membina, f: 'sparkle', v: 0.26},
  {t: M.paksa + 0.05, f: 'whoosh_small', v: 0.3},
  {t: M.paksa1, f: 'pop_msg', v: 0.34},
  {t: M.why + 0.05, f: 'whoosh_small', v: 0.28},
  {t: M.hutang + 0.15, f: 'click_select', v: 0.36},
  {t: M.harta + 0.15, f: 'click_select', v: 0.36},
  {t: M.kekayaan + 0.15, f: 'ding_correct', v: 0.3},
  {t: M.gaji + 0.05, f: 'whoosh_pop', v: 0.38},
  {t: M.bonus, f: 'coins', v: 0.32},
  {t: M.peluang + 0.05, f: 'whoosh_small', v: 0.3},
  {t: M.cepat, f: 'sparkle', v: 0.26},
  {t: M.positif + 0.05, f: 'whoosh_cine', v: 0.28},
  {t: M.berubah, f: 'gold_prize', v: 0.26},
  {t: M.cta + 0.05, f: 'whoosh_small', v: 0.3},
  {t: M.pin, f: 'bell_notif', v: 0.28},
  {t: M.isi, f: 'pop_msg', v: 0.35},
  {t: M.convert - 0.1, f: 'gold_prize', v: 0.3},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <IntroFlash />
    <Schedule items={ITEMS} total={tl.total} />
    <Subtitles words={captionsJson as Word[]} busy={motionBusy(ITEMS, SFX)} />
  </>
);

export const v21: VideoDef = {
  id: 'v21', tl, Overlays, sfx: SFX,
  punches: [M.lawan, M.membina, M.paksa1, M.kekayaan, M.bonus, M.cepat],
  zoom: {hook: [1.0], lawan: [1.12, 1.0], belanja: [1.06], kaya: [1.0], paksa: [1.07], why: [1.0], gaji: [1.06], peluang: [1.0], positif: [1.08], cta: [1.0]},
  focus: {to: E('hook') + 0.15},
  music: {file: 'bgm.mp3', startAt: 40},
};
export const MenabungKaya: React.FC<EditProps> = (p) => <Edit def={v21} {...p} />;
