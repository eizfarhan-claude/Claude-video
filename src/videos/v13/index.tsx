/* v13 — Auto debit GAP: cabutan bertuah 10 gram emas + senarai pemenang */
import React from 'react';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {ChecklistCard, CtaCard, GItem, IconCalendar, IconGift, IconRepeat, Schedule, Subtitles, TitleCard, motionBusy} from '../../engine/kit';
import {IconCheck, IconTarget} from '../../engine/ui';
import {PosterCut} from '../../engine/poster';
import {WINNERS} from './winners';

const tl = makeTimeline(edlJson as Edl, 15);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  hook: 0.05,
  layak: at('hook', 'layak'),
  percuma: at('hook', 'percuma'),
  kempen: S('kempen'),
  auto: at('kempen', 'auto'),
  rm200: at('kempen', 'rm200'),
  cabutan: E('kempen') + 0.1,
  senarai: S('senarai'),
  bulan10: at('senarai', '10'),
  tahniah: S('tahniah'),
  semoga: at('tahniah', 'semoga'),
  inspirasi: at('tahniah', 'inspirasi'),
  manfaatkan: at('tahniah', 'manfaatkan'),
  fokus: S('fokus'),
  kaya: at('kaya', 'kaya'),
  nak: at('kaya', 'nak'),
  konsisten: at('kaya', 'konsisten'),
  autoW: at('auto', 'auto'),
  automatik: at('auto', 'automatik'),
  dapat: S('dapat'),
  dapatW: at('dapat', 'dapat', 0),
  draw: at('dapat', 'draw'),
  konsisten2: at('dapat', 'konsisten'),
  cta: S('cta'),
  pin: at('cta', 'pin'),
  isi: at('cta', 'isi'),
};

// full-frame lucky-winner poster: from 'Dan ini adalah senarai penerima…' through 'Tahniah buat semua pemenang'
const POSTER: [number, number] = [M.senarai - 0.15, M.semoga - 0.05];

const ITEMS: GItem[] = [
  {from: M.hook, to: E('hook') + 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconGift size={86} />} label="Menabung konsisten dalam akaun GAP" title="10 GRAM EMAS" size={72} sub="layak dapat secara percuma" subAt={r(M.percuma)} shine />
  )},
  {from: M.kempen + 0.05, to: E('kempen') + 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCalendar size={80} />} label="Kempen Public Gold" title="SET UP AUTO DEBIT" size={60} sub="minimum RM200 sebulan" subAt={r(M.rm200)} />
  )},
  {from: M.cabutan, to: POSTER[0] + 0.1, render: (d) => (
    <TitleCard dur={d} icon={<IconGift size={84} />} label="Layak setiap bulan" title="CABUTAN BERTUAH" size={62} shine />
  )},
  {from: POSTER[1] - 0.1, to: M.manfaatkan - 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCheck size={80} />} label="Tahniah semua pemenang!" title="JADIKAN INSPIRASI" size={58} sub="untuk konsisten menabung" subAt={r(M.inspirasi)} />
  )},
  {from: M.manfaatkan - 0.1, to: E('tahniah') + 0.15, render: (d) => (
    <TitleCard dur={d} icon={<IconRepeat size={80} />} label="Manfaatkan kemudahan" title="AUTO DEBIT" size={72} sub="menabung secara konsisten" subAt={20} shine />
  )},
  {from: M.fokus + 0.05, to: M.nak - 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconTarget size={84} />} label="Alang-alang simpan emas" title="BIARLAH SAMPAI KAYA" size={56} shine />
  )},
  {from: M.nak - 0.1, to: E('auto') + 0.15, render: (d, r) => (
    <ChecklistCard dur={d} label="Nak kaya?" rows={[
      {text: 'Konsisten setiap bulan', at: r(M.konsisten)},
      {text: 'Auto debit · automatik', at: r(M.autoW)},
    ]} />
  )},
  {from: M.dapat + 0.05, to: E('dapat') + 0.15, render: (d, r) => (
    <ChecklistCard dur={d} label="Simpan emas dengan auto debit" rows={[
      {text: 'Dapat emas', at: r(M.dapatW)},
      {text: 'Peluang lucky draw', at: r(M.draw)},
      {text: 'Konsisten menabung', at: r(M.konsisten2)},
    ]} />
  )},
  {from: M.cta + 0.05, to: 9999, render: (d, r) => (
    <CtaCard dur={d} head="Belum mula simpan emas?" pin={r(M.pin)} guide={r(M.isi)} guideText="Isi BEG BIRU" />
  )},
];

const SFX: Sfx[] = [
  {t: M.hook, f: 'whoosh_cine', v: 0.45},
  {t: M.hook + 0.05, f: 'impact_deep', v: 0.26},
  {t: M.layak, f: 'gold_prize', v: 0.28},
  {t: M.percuma, f: 'sparkle', v: 0.26},
  {t: M.kempen + 0.05, f: 'whoosh_small', v: 0.3},
  {t: M.auto, f: 'click_select', v: 0.34},
  {t: M.rm200, f: 'pop_msg', v: 0.34},
  {t: M.cabutan, f: 'whoosh_small', v: 0.28},
  {t: M.cabutan + 0.1, f: 'gold_price', v: 0.24},
  {t: POSTER[0], f: 'whoosh_cine', v: 0.32},
  {t: POSTER[0] + 0.15, f: 'gold_prize', v: 0.28},
  {t: M.tahniah + 0.05, f: 'ding_correct', v: 0.3},
  {t: POSTER[1] - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.inspirasi, f: 'sparkle', v: 0.24},
  {t: M.manfaatkan - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.fokus + 0.05, f: 'whoosh_cine', v: 0.28},
  {t: M.kaya, f: 'coins', v: 0.3},
  {t: M.nak - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.konsisten + 0.15, f: 'click_select', v: 0.36},
  {t: M.autoW + 0.15, f: 'ding_correct', v: 0.3},
  {t: M.dapat + 0.05, f: 'whoosh_small', v: 0.28},
  {t: M.dapatW + 0.15, f: 'coins', v: 0.32},
  {t: M.draw + 0.15, f: 'click_select', v: 0.36},
  {t: M.konsisten2 + 0.15, f: 'click_select', v: 0.36},
  {t: M.cta + 0.05, f: 'whoosh_small', v: 0.3},
  {t: M.pin, f: 'bell_notif', v: 0.28},
  {t: M.isi, f: 'pop_msg', v: 0.35},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <Schedule items={ITEMS} total={tl.total} />
    <PosterCut from={POSTER[0]} to={POSTER[1]} month="OCT 2026" rows={WINNERS} />
    <Subtitles words={captionsJson as Word[]} busy={motionBusy(ITEMS, SFX, [POSTER])} />
  </>
);

export const v13: VideoDef = {
  id: 'v13', tl, Overlays, sfx: SFX,
  punches: [M.layak, M.rm200, M.kaya, M.automatik, M.dapatW],
  zoom: {hook: [1.12], kempen: [1.06, 1.0], cabutan: [1.07], senarai: [1.07], tahniah: [1.0, 1.06], fokus: [1.08], kaya: [1.08], auto: [1.0], dapat: [1.06], cta: [1.0]},
  music: {file: 'bgm.mp3', startAt: 60},
};
export const AutoDebitCabutan: React.FC<EditProps> = (p) => <Edit def={v13} {...p} />;
