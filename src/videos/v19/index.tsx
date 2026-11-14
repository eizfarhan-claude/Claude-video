/* v19 — Bilakah waktu terbaik menabung emas? */
import React from 'react';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {ChecklistCard, CtaCard, GItem, IconCalendar, IconGrad, IconWallet, IconX, Schedule, StepCard, Subtitles, TitleCard, WaveIcon, motionBusy} from '../../engine/kit';
import {IconArrowUp, IconClock, IconCoin, IconPin} from '../../engine/ui';

const tl = makeTimeline(edlJson as Edl, 15);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  hook: 0.05,
  jawapannya: at('hook', 'jawapannya'),
  turun: at('hook', 'turun'),
  save: at('hook', 'save'),
  syarat: S('syarat'),
  dua: at('syarat', 'dua'),
  pertama: at('syarat', 'pertama'),
  tempoh: at('syarat', 'tempoh'),
  ilmu: S('ilmu'),
  ilmuW: at('ilmu', 'ilmu'),
  monitor: S('monitor'),
  tunggu: at('monitor', 'tunggu', 0),
  how: at('monitor', 'how'),
  teka: S('teka'),
  konsisten: S('konsisten'),
  daripada: at('konsisten', 'daripada'),
  fokus: S('fokus'),
  sentiasa: at('fokus', 'sentiasa'),
  confirm: at('fokus', 'confirm'),
  walaupun: at('fokus', 'walaupun'),
  cta: S('cta'),
  belum: at('cta', 'belum'),
  pin: at('cta', 'pin'),
  bantu: at('cta', 'bantu'),
  dapat: at('cta', 'dapat'),
};

const ITEMS: GItem[] = [
  {from: M.hook, to: M.jawapannya - 0.1, render: (d) => (
    <TitleCard dur={d} icon={<IconClock size={84} />} label="Bilakah waktu terbaik" title="MENABUNG EMAS?" size={66} />
  )},
  {from: M.jawapannya - 0.1, to: at('hook', 'jadi') - 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconX size={84} />} label="Jawapannya, bukan" title="WAKTU HARGA TURUN" gold={false} size={58} />
  )},
  {from: M.save - 0.2, to: E('hook') + 0.15, render: (d) => (
    <TitleCard dur={d} icon={<IconPin size={76} />} label="Jangan lupa" title="SAVE VIDEO NI" gold={false} size={60} sub="untuk rujukan akan datang" subAt={8} />
  )},
  {from: M.syarat + 0.05, to: M.pertama - 0.1, render: (d) => (
    <TitleCard dur={d} icon={<IconCoin size={84} />} label="Waktu terbaik = bila penuhi" title="2 SYARAT INI" size={70} shine />
  )},
  {from: M.pertama - 0.1, to: E('syarat') + 0.15, render: (d, r) => (
    <StepCard dur={d} n={1} total={2} title="ADA DUIT LEBIHAN" sub="tak guna untuk 2–3 tahun ke hadapan" subAt={r(M.tempoh)} icon={<IconWallet size={70} />} />
  )},
  {from: M.ilmu + 0.05, to: E('ilmu') + 0.15, render: (d, r) => (
    <StepCard dur={d} n={2} total={2} title="ADA ILMU ASAS" sub="tentang simpanan emas" subAt={r(M.ilmuW) + 10} icon={<IconGrad size={70} />} />
  )},
  {from: M.monitor + 0.05, to: E('teka') + 0.2, render: (d, r) => (
    <ChecklistCard dur={d} label="Tak perlu" rows={[
      {text: 'Monitor harga setiap hari', at: r(M.monitor) + 6, bad: true},
      {text: 'Tunggu harga paling rendah', at: r(M.tunggu), bad: true},
      {text: 'Teka harga untuk bermula', at: r(M.teka), bad: true},
    ]} />
  )},
  {from: M.konsisten + 0.05, to: E('konsisten') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCalendar size={80} />} label="Mula & konsisten setiap bulan" title="LEBIH BAIK DARI MENEKA" size={50} />
  )},
  {from: M.fokus + 0.05, to: M.confirm - 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconArrowUp size={84} />} label="Fokus kita" title="GRAM SENTIASA BERTAMBAH" size={50} sub="setiap bulan" subAt={r(M.sentiasa)} />
  )},
  {from: M.confirm - 0.1, to: E('fokus') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCoin size={84} />} label="Confirm lebih kaya daripada" title="YANG MENUNGGU WAKTU" size={54} sub="walaupun 1 gram" subAt={r(M.walaupun)} shine />
  )},
  {from: M.cta + 0.05, to: M.belum - 0.1, render: (d) => (
    <TitleCard dur={d} icon={<IconWallet size={80} />} label="Dah ada duit lebihan?" title="JOM MULA" size={76} />
  )},
  {from: M.belum - 0.1, to: 9999, render: (d, r) => (
    <CtaCard dur={d} head="Belum ada akaun GAP?" pin={r(M.pin)} guide={r(M.bantu)} guideText="Saya bantu" final={r(M.dapat)} finalLabel="Komen di bawah" finalTitle="DAPAT SESUATU?" />
  )},
];

const SFX: Sfx[] = [
  {t: M.hook, f: 'whoosh_cine', v: 0.45},
  {t: M.hook + 0.05, f: 'impact_deep', v: 0.26},
  {t: M.jawapannya - 0.1, f: 'whoosh_pop', v: 0.38},
  {t: M.turun, f: 'pop_hard', v: 0.34},
  {t: M.save - 0.2, f: 'click_select', v: 0.34},
  {t: M.syarat + 0.05, f: 'whoosh_cine', v: 0.32},
  {t: M.dua, f: 'sparkle', v: 0.22},
  {t: M.pertama - 0.1, f: 'whoosh_pop', v: 0.38},
  {t: M.ilmu + 0.05, f: 'whoosh_pop', v: 0.38},
  {t: M.monitor + 0.05, f: 'whoosh_small', v: 0.28},
  {t: M.monitor + 0.45, f: 'pop_msg', v: 0.3},
  {t: M.tunggu + 0.25, f: 'pop_msg', v: 0.3},
  {t: M.teka + 0.25, f: 'pop_msg', v: 0.3},
  {t: M.konsisten + 0.05, f: 'whoosh_cine', v: 0.3},
  {t: M.fokus + 0.05, f: 'whoosh_pop', v: 0.38},
  {t: M.sentiasa, f: 'coins', v: 0.3},
  {t: M.confirm - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.walaupun, f: 'gold_prize', v: 0.24},
  {t: M.cta + 0.05, f: 'whoosh_pop', v: 0.38},
  {t: M.belum - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.pin, f: 'pop_hard', v: 0.34},
  {t: M.bantu, f: 'click_select', v: 0.32},
  {t: M.dapat, f: 'bell_notif', v: 0.26},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <Schedule items={ITEMS} total={tl.total} />
    <Subtitles words={captionsJson as Word[]} busy={motionBusy(ITEMS, SFX)} />
  </>
);

export const v19: VideoDef = {
  id: 'v19', tl, Overlays, sfx: SFX,
  punches: [M.turun, M.dua, M.how, M.daripada, M.confirm],
  zoom: {hook: [1.1, 1.04], syarat: [1.0, 1.06], ilmu: [1.06], monitor: [1.0, 1.06], teka: [1.07], konsisten: [1.0], fokus: [1.04, 1.0], cta: [1.0, 1.06]},
  music: {file: 'bgm.mp3', startAt: 75},
};
export const WaktuTerbaik: React.FC<EditProps> = (p) => <Edit def={v19} {...p} />;
