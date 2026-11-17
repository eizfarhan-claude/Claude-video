/* v20 — Membina Satu Juta Pertama: jemputan event warga Johor (21 Nov 2026, UniKL MITEC) */
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {IntroFlash, TitleIntro} from '../../engine/kit2';
import {ChecklistCard, EventCard, GItem, IconCalendar, IconChat, IconGrad, IconShield, IconX, ImageCut, JourneyCard, Schedule, Subtitles, TitleCard, VCut, VideoCutTrack, motionBusy} from '../../engine/kit';
import {IconCoin, IconPin, IconTarget} from '../../engine/ui';

const tl = makeTimeline({...(edlJson as Edl), words: captionsJson as Word[]}, 30);
const {sectionEnd: E} = tl;
const CAP = captionsJson as Word[];
/** output-second start of the n-th caption word `text` (case/punctuation-insensitive) */
const c = (text: string, nth = 0) => {
  const hits = CAP.filter((w) => w.text.toLowerCase().replace(/[.,?!]+$/, '') === text.toLowerCase());
  if (!hits[nth]) throw new Error(`caption word not found: ${text}/${nth}`);
  return hits[nth].start;
};
const END = tl.total / 30;

const M = {
  hook: 0.05,
  simpanan: c('simpanan', 0),
  khas: c('khas'),
  event: c('event', 0),
  yangmana: c('mana'),
  d21: c('21'),
  di: c('di', 0),
  dewan: c('dewan'),
  johorB: c('johor', 1),
  dalam: c('dalam'),
  perkongsian: c('perkongsian'),
  guru: c('guru', 0),
  tuan: c('tuan'),
  penulis: c('penulis'),
  dan2: c('dan', 1),
  prinsip: c('prinsip'),
  tabungan: c('tabungan'),
  hapuskan: c('hapuskan'),
  bersih: c('bersih'),
  rm1b: c('rm1', 1),
  jadi: c('jadi', 0),
  belajar: c('belajar', 0),
  percuma: c('percuma'),
  dapatkan: c('dapatkan'),
  cara: c('cara'),
  ilmu2: c('ilmu', 1),
  belajar2: c('belajar', 1),
  telah: c('telah'),
  n11: c('1.1'),
  penyimpan: c('penyimpan'),
  jadi2: c('jadi', 1),
  jumpa: c('jumpa'),
};

/** "1.1 JUTA" counting up from 0.0 */
const CountUp: React.FC<{dur: number; at: number; subAt: number}> = ({dur, at, subAt}) => {
  const f = useCurrentFrame();
  const n = interpolate(f, [at, at + 22], [0, 1.1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <TitleCard dur={dur} icon={<IconGrad size={84} />} label="Telah membimbing lebih" title={`${n.toFixed(1)} JUTA`} size={84} sub="penyimpan emas" subAt={subAt} shine />;
};

const VENUE = 'DEWAN UTAMA UniKL MITEC';
const ITEMS: GItem[] = [
  {from: 0.0, to: E('hook') + 0.15, render: (d) => (
    <TitleIntro dur={d} tag="Bayangkan hanya simpan emas" line1="MILIKI SIMPANAN" line2="RM1 JUTA PERTAMA" l2At={14} />
  )},
  {from: M.khas, to: M.yangmana - 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconPin size={80} />} label="Khas untuk" title="WARGA JOHOR" size={78} sub="Event yang sangat besar!" subAt={r(M.event)} />
  )},
  {from: M.yangmana - 0.1, to: M.dalam - 0.05, render: (d, r) => (
    <EventCard dur={d} label="Membina Satu Juta Pertama" rows={[
      {icon: <IconCalendar size={50} />, text: '21 NOVEMBER 2026', sub: 'Sabtu', at: r(M.d21), subAt: r(M.d21) + 20},
      {icon: <IconPin size={50} />, text: VENUE, sub: 'Johor Bahru', at: r(M.dewan), subAt: r(M.johorB)},
    ]} />
  )},
  {from: M.guru - 0.1, to: M.dan2 - 0.05, render: (d, r) => (
    <TitleCard dur={d} label="Guru emas saya · Tuan Haji" title="MOHD ZULKIFLI SHAFIE" size={56} sub="Penulis buku Emas & Misi Bebas Hutang" subAt={r(M.penulis)} shine />
  )},
  {from: M.dan2 - 0.05, to: M.hapuskan - 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconTarget size={80} />} label="Prinsip" title="MEMBINA TABUNGAN" size={62} sub="melalui simpanan emas" subAt={r(M.tabungan)} />
  )},
  {from: M.hapuskan - 0.1, to: M.jadi - 0.05, render: (d, r) => (
    <JourneyCard dur={d} label="Langkah demi langkah" nodes={[
      {text: 'HAPUS HUTANG', icon: <IconX size={50} />, at: r(M.hapuskan)},
      {text: 'SIMPANAN BERSIH', icon: <IconShield size={50} />, at: r(M.bersih) - 12},
      {text: 'RM1 JUTA', icon: <IconCoin size={50} />, at: r(M.rm1b)},
    ]} />
  )},
  {from: M.jadi - 0.05, to: M.dapatkan - 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconChat size={80} />} label="Jemput semua" title="HADIR & BELAJAR" size={64} sub="Masuk PERCUMA" subAt={r(M.percuma)} />
  )},
  {from: M.dapatkan - 0.1, to: M.belajar2 - 0.05, render: (d, r) => (
    <ChecklistCard dur={d} label="Ilmu membina kekayaan" rows={[
      {text: 'Cara yang betul', at: r(M.cara)},
      {text: 'Ilmu yang betul', at: r(M.ilmu2)},
    ]} />
  )},
  {from: M.telah - 0.1, to: M.jadi2 - 0.05, render: (d, r) => <CountUp dur={d} at={r(M.n11)} subAt={r(M.penyimpan)} />},
  {from: M.jadi2 - 0.05, to: END, render: (d, r) => (
    <EventCard dur={d} label="Warga Johor · jumpa di sana!" badge="PERCUMA" badgeAt={r(M.jumpa)} rows={[
      {icon: <IconCalendar size={50} />, text: 'SABTU · 21 NOV 2026', at: 4},
      {icon: <IconPin size={50} />, text: VENUE, sub: 'Johor Bahru', at: 9},
    ]} />
  )},
];

/* B-roll from the earlier Leaders Road Tour event (phone footage, framed so the low resolution doesn't show) */
const EV = 'v20/broll/event.mp4';
const VCUTS: VCut[] = [
  {file: EV, from: M.event - 0.15, to: M.yangmana - 0.15, srcStart: 17.0, tag: 'Leaders Road Tour 2026'},
  {file: EV, from: M.perkongsian - 0.1, to: M.tuan - 0.05, srcStart: 1.7},
  {file: EV, from: M.belajar - 0.1, to: M.dapatkan - 0.15, srcStart: 6.6},
  {file: EV, from: M.belajar2 - 0.1, to: M.telah - 0.1, srcStart: 14.0},
];
const IMG: [number, number] = [M.tuan - 0.05, M.penulis - 0.1]; // stage photo while the name is said; book in hand shows at "penulis"

const SFX: Sfx[] = [
  {t: 0.0, f: 'whoosh_impact', v: 0.26},
  {t: 0.1, f: 'tech_slide', v: 0.12},
  {t: 0.2, f: 'zoom_impact', v: 0.18},
  {t: 0.47, f: 'impact_deep', v: 0.13},
  {t: 0.7, f: 'sparkle', v: 0.12},
  {t: M.simpanan, f: 'coins', v: 0.24},
  {t: M.khas, f: 'whoosh_pop', v: 0.4},
  {t: M.event - 0.15, f: 'whoosh_small', v: 0.3},
  {t: M.yangmana - 0.1, f: 'whoosh_pop', v: 0.38},
  {t: M.d21, f: 'pop_hard', v: 0.34},
  {t: M.dewan, f: 'pop_msg', v: 0.34},
  {t: M.perkongsian - 0.1, f: 'whoosh_small', v: 0.3},
  {t: M.guru - 0.1, f: 'sparkle', v: 0.26},
  {t: M.tuan - 0.05, f: 'whoosh_small', v: 0.26},
  {t: M.penulis, f: 'pop_msg', v: 0.32},
  {t: M.dan2 - 0.05, f: 'whoosh_pop', v: 0.36},
  {t: M.hapuskan - 0.1, f: 'whoosh_small', v: 0.3},
  {t: M.bersih - 0.4, f: 'click_select', v: 0.34},
  {t: M.rm1b, f: 'gold_prize', v: 0.3},
  {t: M.jadi - 0.05, f: 'whoosh_pop', v: 0.36},
  {t: M.percuma, f: 'ding_correct', v: 0.3},
  {t: M.dapatkan - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.cara + 0.15, f: 'click_select', v: 0.36},
  {t: M.ilmu2 + 0.15, f: 'click_select', v: 0.36},
  {t: M.belajar2 - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.n11, f: 'gold_price', v: 0.3},
  {t: M.jadi2 - 0.05, f: 'whoosh_cine', v: 0.32},
  {t: M.jumpa, f: 'bell_notif', v: 0.28},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <IntroFlash />
    <VideoCutTrack cuts={VCUTS} />
    <ImageCut src="v20/broll/stage.jpg" from={IMG[0]} to={IMG[1]} source="Leaders Road Tour 2026" />
    <Schedule items={ITEMS} total={tl.total} />
    <Subtitles words={CAP} busy={motionBusy(ITEMS, SFX, [...VCUTS.map((v) => [v.from, v.to] as [number, number]), IMG])} />
  </>
);

export const v20: VideoDef = {
  id: 'v20', tl, Overlays, sfx: SFX,
  punches: [M.khas + 0.1, M.d21, M.prinsip, M.hapuskan, M.percuma, M.jumpa],
  zoom: {hook: [1.1], johor: [1.0], tarikh: [1.06], lokasi: [1.0], guru: [1.06, 1.0], prinsip: [1.0], hapus: [1.07], jemput: [1.0, 1.06], bimbing: [1.06, 1.0], outro: [1.08]},
  music: {file: 'mornings.mp3', startAt: 2},
  focus: {to: E('hook') + 0.15},
};
export const SatuJuta: React.FC<EditProps> = (p) => <Edit def={v20} {...p} />;
