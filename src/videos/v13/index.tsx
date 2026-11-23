/* v13 — anak muda: dana kahwin 50 gram emas dalam 5 tahun */
import React from 'react';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {ChecklistCard, CtaCard, GItem, GoldProgress, GramTimeline, IconRings, IconWallet, Schedule, StepCard, Subtitles, TitleCard, motionBusy} from '../../engine/kit';
import {IconClock, IconTarget} from '../../engine/ui';

const tl = makeTimeline(edlJson as Edl, 15);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  hook: 0.05,
  bina: at('hook', 'bina'),
  dana: at('hook', 'dana'),
  cara: S('cara'),
  sepuluh: at('cara', '10'),
  s1: S('s1'),
  daftar: at('s1', 'daftar'),
  platform: at('s1', 'platform'),
  s2: S('s2'),
  kalau: at('s2', 'kalau'),
  setahun: at('s2', 'setahun'),
  empat: at('s2', '4'),
  ataupun: at('s2', 'ataupun'),
  ngam: at('s2', 'ngam-ngam'),
  s3: S('s3'),
  contoh: at('s3', 'sebagai'),
  terus: at('s3', 'terus'),
  hasil: S('hasil'),
  lima0: at('hasil', '50'),
  cukup: at('hasil', 'cukup'),
  pesan: S('pesan'),
  cari: at('pesan', 'cari'),
  belanja: at('pesan', 'belanja'),
  fokus: S('fokus'),
  pasangan: at('fokus', 'pasangan'),
  cta: S('cta'),
  pin: at('cta', 'pin'),
  isi: at('cta', 'isi'),
};

const ITEMS: GItem[] = [
  {from: M.hook, to: M.bina - 0.1, render: (d) => (
    <TitleCard dur={d} icon={<IconRings size={88} />} label="Anak muda · plan kahwin lagi 5 tahun?" title="NAK BUAT APA?" gold={false} size={70} />
  )},
  {from: M.bina - 0.1, to: E('hook') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconRings size={88} />} label="Bina simpanan" title="50 GRAM EMAS" size={78} sub="sebagai dana perkahwinan" subAt={r(M.dana)} shine />
  )},
  {from: M.cara + 0.05, to: E('cara') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconTarget size={84} />} label="Caranya mudah" title="50 g ÷ 5 TAHUN" size={66} sub="= target 10 gram setahun" subAt={r(M.sepuluh)} />
  )},
  {from: M.s1 + 0.05, to: E('s1') + 0.15, render: (d, r) => (
    <StepCard dur={d} n={1} total={3} title="DAFTAR AKAUN GAP" sub="platform bina simpanan" subAt={r(M.platform)} icon={<IconWallet size={76} />} />
  )},
  {from: M.s2 + 0.05, to: M.kalau - 0.1, render: (d) => (
    <StepCard dur={d} n={2} total={3} title="1 GRAM SEBULAN" sub="at least" subAt={14} icon={<IconTarget size={76} />} />
  )},
  {from: M.kalau - 0.1, to: M.ataupun - 0.1, render: (d, r) => (
    <GramTimeline dur={d} label="Kalau 1 gram sebulan" cols={[
      {top: 'Sebulan', grams: 1, at: 3},
      {top: 'Setahun', grams: 12, at: r(M.setahun), tag: 'lebih dari target', tagAt: r(M.setahun) + 20},
      {top: '4 tahun', grams: 50, at: r(M.empat) - 8, tag: 'capai lebih awal', tagAt: r(M.empat) + 6},
    ]} />
  )},
  {from: M.ataupun - 0.1, to: E('s2') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconClock size={80} />} label="Ataupun usahakan" title="0.8 GRAM SEBULAN" size={60} sub="ngam-ngam 5 tahun" subAt={r(M.ngam)} />
  )},
  {from: M.s3 + 0.05, to: M.contoh - 0.1, render: (d) => (
    <StepCard dur={d} n={3} total={3} title="AUTO DEBIT" sub="konsisten sahaja" subAt={14} icon={<IconClock size={76} />} />
  )},
  {from: M.contoh - 0.1, to: E('s3') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconWallet size={80} />} label="Contoh · emas sekitar RM500/g" title="AUTO DEBIT RM500/BULAN" size={50} sub="untuk dana perkahwinan" subAt={r(M.terus)} />
  )},
  {from: M.hasil + 0.05, to: E('hasil') + 0.15, render: (d, r) => (
    <GoldProgress dur={d} label="Konsisten 4–5 tahun" target={50} fill0={6} fill1={r(M.lima0) + 6} doneAt={r(M.cukup)} done="Cukup untuk dana kahwin" />
  )},
  {from: M.pesan + 0.05, to: E('pesan') + 0.15, render: (d, r) => (
    <ChecklistCard dur={d} label="Anak muda, jangan bazir masa" rows={[
      {text: 'Cari pasangan je', at: r(M.cari), bad: true},
      {text: 'Belanja pasangan', at: r(M.belanja), bad: true},
    ]} />
  )},
  {from: M.fokus + 0.05, to: E('fokus') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconTarget size={84} />} label="Fokus" title="BINA SIMPANAN DULU" size={60} sub="pasangan jumpa → terus proceed" subAt={r(M.pasangan)} shine />
  )},
  {from: M.cta + 0.05, to: 9999, render: (d, r) => (
    <CtaCard dur={d} head="Nak bina dana kahwin?" pin={r(M.pin)} guide={r(M.isi)} guideText="Isi BEG BIRU" />
  )},
];

const SFX: Sfx[] = [
  {t: M.hook, f: 'whoosh_cine', v: 0.45},
  {t: M.hook + 0.05, f: 'impact_deep', v: 0.26},
  {t: M.bina - 0.1, f: 'whoosh_pop', v: 0.36},
  {t: M.bina + 0.4, f: 'gold_prize', v: 0.26},
  {t: M.cara + 0.05, f: 'whoosh_small', v: 0.3},
  {t: M.sepuluh, f: 'pop_msg', v: 0.32},
  {t: M.s1 + 0.05, f: 'whoosh_pop', v: 0.4},
  {t: M.platform, f: 'click_select', v: 0.32},
  {t: M.s2 + 0.05, f: 'whoosh_pop', v: 0.4},
  {t: M.kalau - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.setahun, f: 'coins', v: 0.28},
  {t: M.empat, f: 'ding_correct', v: 0.28},
  {t: M.ataupun - 0.1, f: 'pop_hard', v: 0.3},
  {t: M.s3 + 0.05, f: 'whoosh_pop', v: 0.4},
  {t: M.contoh - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.terus, f: 'atm_key', v: 0.32},
  {t: M.hasil + 0.05, f: 'whoosh_cine', v: 0.3},
  {t: M.cukup, f: 'gold_prize', v: 0.28},
  {t: M.pesan + 0.05, f: 'whoosh_small', v: 0.28},
  {t: M.cari + 0.15, f: 'pop_hard', v: 0.32},
  {t: M.belanja + 0.15, f: 'pop_hard', v: 0.32},
  {t: M.fokus + 0.05, f: 'whoosh_pop', v: 0.36},
  {t: M.pasangan, f: 'sparkle', v: 0.24},
  {t: M.cta + 0.05, f: 'whoosh_small', v: 0.3},
  {t: M.pin, f: 'bell_notif', v: 0.26},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <Schedule items={ITEMS} total={tl.total} />
    <Subtitles words={captionsJson as Word[]} busy={motionBusy(ITEMS, SFX)} />
  </>
);

export const v13: VideoDef = {
  id: 'v13', tl, Overlays, sfx: SFX,
  punches: [M.bina, M.sepuluh, M.s1 + 0.1, M.s2 + 0.1, M.s3 + 0.1, M.cukup, M.fokus + 0.1],
  zoom: {hook: [1.1, 1.04], cara: [1.0], s1: [1.06], s2: [1.0, 1.07], s3: [1.06, 1.0], hasil: [1.0], pesan: [1.07], fokus: [1.0, 1.06], cta: [1.0, 1.08]},
  music: {file: 'bgm.mp3', startAt: 180},
};
export const DanaKahwin: React.FC<EditProps> = (p) => <Edit def={v13} {...p} />;
