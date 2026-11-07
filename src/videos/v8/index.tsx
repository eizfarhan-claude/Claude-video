/* v8 — Harga emas jatuh: panik atau peluang? */
import React from 'react';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {Choices, CtaCard, GItem, GramCompare, IconChartDown, IconPlane, PhoneCut, Schedule, Subtitles, TitleCard, motionBusy} from '../../engine/kit';
import {IconCoin, IconTarget} from '../../engine/ui';

const tl = makeTimeline(edlJson as Edl, 15);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  hook: 0.05,
  panik0: at('hook', 'panik'),
  tersenyum: at('hook', 'tersenyum'),
  mereka: at('hook', 'mereka'),
  matlamat0: at('hook', 'matlamat'),
  contoh: S('contoh'),
  g50: at('contoh', '50'),
  haji: at('contoh', 'haji'),
  jatuh: S('jatuh'),
  lebih: at('jatuh', 'lebih'),
  cepat0: at('jatuh', 'cepat'),
  peluang: S('peluang'),
  peluangW: at('peluang', 'peluang'),
  cepat1: at('peluang', 'cepat'),
  tahu: at('panik', 'tahu'),
  panik: at('panik', 'panik'),
  nampak: at('matlamat', 'nampak'),
  makin: at('matlamat', 'makin'),
  cukupkan: at('matlamat', 'cukupkan'),
  calc: S('calc'),
  klik: at('calc', 'klik'),
  bio: at('calc', 'bio'),
  tengok: at('calc', 'tengok'),
  kalkulator: at('calc', 'kalkulator'),
  semak: at('calc', 'semak'),
  tagline: S('tagline'),
  peluang2: at('tagline', 'peluang'),
  cta: S('cta'),
  pin: at('cta', 'pin'),
  step: at('cta', 'step'),
  membantu: at('cta', 'membantu'),
};

const ITEMS: GItem[] = [
  {from: M.hook, to: M.mereka - 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconChartDown size={88} />} label="Minggu ini" title="HARGA EMAS JATUH" gold={false} size={60} sub="ramai panik… ada yang tersenyum" subAt={r(M.panik0)} />
  )},
  {from: M.mereka - 0.1, to: E('hook') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconTarget size={84} />} label="Yang tersenyum" title="ADA MATLAMAT JELAS" size={58} sub="simpan emas dengan tujuan" subAt={r(M.matlamat0)} shine />
  )},
  {from: M.contoh + 0.05, to: E('contoh') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconPlane size={80} />} label="Contoh: haji lagi 5 tahun" title="TARGET 50 GRAM" size={64} sub="untuk dana haji" subAt={r(M.haji)} shine />
  )},
  {from: M.jatuh + 0.05, to: E('jatuh') + 0.15, render: (d, r) => (
    <GramCompare dur={d} label="Duit sama, harga jatuh" aAt={4} bAt={r(M.lebih)} sub="lebih cepat capai 50g pertama" subAt={r(M.cepat0)} />
  )},
  {from: M.peluang + 0.05, to: E('peluang') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCoin size={86} />} label="Kejatuhan harga emas" title="= PELUANG" size={74} sub="capai matlamat lebih cepat" subAt={r(M.cepat1)} shine />
  )},
  {from: M.tahu - 0.15, to: M.makin - 0.15, render: (d, r) => (
    <Choices dur={d} items={[
      {top: 'Tiada matlamat', main: 'PANIK', at: r(M.panik), bad: true},
      {top: 'Ada matlamat', main: 'NAMPAK PELUANG', at: r(M.nampak), good: true},
    ]} />
  )},
  {from: M.makin - 0.15, to: E('matlamat') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconChartDown size={84} />} label="Makin rendah harga" title="MAKIN BESAR PELUANG" size={56} sub="cukupkan gram · capai matlamat 2–3 tahun" subAt={r(M.cukupkan)} />
  )},
  {from: M.calc + 0.05, to: E('calc') + 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconTarget size={80} />} label="Klik link di bio" title="KALKULATOR MATLAMAT" size={50} sub="semak target 2–3 tahun anda" subAt={r(M.semak)} />
  )},
  {from: M.tagline, to: E('tagline') + 0.2, render: (d, r) => (
    <TitleCard dur={d} label="Simpan emas dengan matlamat" title="HARGA JATUH = PELUANG" size={60} shine />
  )},
  {from: M.cta + 0.05, to: 9999, render: (d, r) => (
    <CtaCard dur={d} head="Nak mula simpan emas?" pin={r(M.pin)} guide={r(M.step)} guideText="Isi BEG BIRU" final={r(M.membantu)} finalLabel="Simpan emas dengan matlamat" finalTitle="CAPAI LEBIH CEPAT" />
  )},
];

const SFX: Sfx[] = [
  {t: M.hook, f: 'whoosh_cine', v: 0.45},
  {t: M.hook + 0.05, f: 'impact_deep', v: 0.28},
  {t: M.panik0, f: 'pop_hard', v: 0.34},
  {t: M.mereka - 0.1, f: 'whoosh_small', v: 0.3},
  {t: M.matlamat0, f: 'sparkle', v: 0.28},
  {t: M.contoh + 0.05, f: 'whoosh_small', v: 0.3},
  {t: M.g50, f: 'gold_prize', v: 0.28},
  {t: M.jatuh + 0.05, f: 'whoosh_small', v: 0.3},
  {t: M.lebih, f: 'coins', v: 0.36},
  {t: M.peluang + 0.05, f: 'whoosh_cine', v: 0.3},
  {t: M.peluangW, f: 'ding_correct', v: 0.32},
  {t: M.tahu - 0.15, f: 'whoosh_small', v: 0.28},
  {t: M.panik, f: 'pop_hard', v: 0.36},
  {t: M.nampak, f: 'ding_correct', v: 0.32},
  {t: M.makin - 0.15, f: 'whoosh_small', v: 0.28},
  {t: M.cukupkan, f: 'coins', v: 0.32},
  {t: M.calc + 0.05, f: 'whoosh_pop', v: 0.4},
  {t: M.klik - 0.2, f: 'whoosh_small', v: 0.3},
  {t: M.tengok, f: 'click_select', v: 0.38},
  {t: M.kalkulator - 0.1, f: 'whoosh_pop', v: 0.38},
  {t: M.semak, f: 'atm_key', v: 0.3},
  {t: M.tagline, f: 'whoosh_cine', v: 0.3},
  {t: M.peluang2, f: 'gold_prize', v: 0.28},
  {t: M.cta + 0.05, f: 'whoosh_small', v: 0.3},
  {t: M.pin, f: 'bell_notif', v: 0.28},
  {t: M.step, f: 'pop_msg', v: 0.35},
  {t: M.membantu - 0.1, f: 'gold_prize', v: 0.3},
];

// Screenshots in a phone frame: the bio-link page, then the goal calculator
const PHONE: [number, number][] = [[M.klik - 0.15, M.kalkulator - 0.05], [M.kalkulator - 0.05, E('calc') + 0.1]];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <PhoneCut src="v8/broll/web.jpg" aspect={694 / 1280} from={PHONE[0][0]} to={PHONE[0][1]} highlight={[0.825, 0.905]} highlightAt={M.tengok} caption="Link di bio" />
    <PhoneCut src="v8/broll/kalkulator.jpg" aspect={540 / 1061} from={PHONE[1][0]} to={PHONE[1][1]} highlight={[0.625, 0.835]} highlightAt={M.semak} />
    <Schedule items={ITEMS} total={tl.total} />
    <Subtitles words={captionsJson as Word[]} busy={motionBusy(ITEMS, SFX, PHONE)} />
  </>
);

export const v8: VideoDef = {
  id: 'v8', tl, Overlays, sfx: SFX,
  punches: [M.panik0, M.g50, M.lebih, M.peluangW, M.panik, M.peluang2],
  zoom: {hook: [1.12, 1.0], contoh: [1.06], jatuh: [1.0], peluang: [1.08], panik: [1.0], matlamat: [1.06, 1.0], calc: [1.0], tagline: [1.1], cta: [1.0]},
  music: {file: 'bgm.mp3', startAt: 100},
};
export const HargaJatuh: React.FC<EditProps> = (p) => <Edit def={v8} {...p} />;
