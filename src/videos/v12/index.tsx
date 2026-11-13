/* v12 — Public Gold terima buyback semua jenis emas (walaupun bukan emas Public Gold) */
import React from 'react';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {ChecklistCard, Choices, GItem, IconChat, IconStore, Schedule, StepCard, Subtitles, TitleCard, motionBusy} from '../../engine/kit';
import {IconBank, IconCard, IconCheck, IconClock, IconCoin} from '../../engine/ui';

const tl = makeTimeline(edlJson as Edl, 30);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  adakah: at('hook', 'adakah'),
  walaupun: at('hook', 'walaupun'),
  maklumkan: at('jawab', 'maklumkan'),
  semua: at('jawab', 'semua', 1),
  jenis: S('jenis'),
  g999: at('jenis', '999'),
  g916: at('jenis', '916'),
  g875: at('jenis', '875'),
  asalkan: at('jenis', 'asalkan'),
  tinggi: at('jenis', 'tinggi'),
  patah: S('patah'),
  gelang: at('patah', 'gelang'),
  cincin: at('patah', 'cincin'),
  patahW: at('patah', 'patah'),
  bawa0: at('patah', 'bawa'),
  proses: S('proses'),
  pertama: at('proses', 'pertama'),
  isi: at('daftar', 'isi'),
  percuma: at('daftar', 'pendaftaran', 1),
  walkin: S('walkin'),
  walk: at('walkin', 'walk'),
  berdekatan: at('walkin', 'berdekatan'),
  bawa: S('bawa'),
  ic: at('bawa', 'pengenalan'),
  serahkan: at('bawa', 'serahkan'),
  buyback: at('bawa', 'buyback'),
  tunai: S('tunai'),
  tunaiW: at('tunai', 'tunai'),
  jam: at('tunai', 'jam'),
  direct: at('tunai', 'direct'),
  tutup: S('tutup'),
  tertinggi: at('tutup', 'tertinggi'),
  pulangan: at('tutup', 'pulangan'),
};

const ITEMS: GItem[] = [
  {from: 0.05, to: E('hook') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconChat size={80} />} label="Soalan penyimpan emas" title="PUBLIC GOLD BELI BALIK?" size={56} sub="walaupun bukan emas Public Gold" subAt={r(M.walaupun)} />
  )},
  {from: M.maklumkan - 0.1, to: E('jawab') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCheck size={84} />} label="Jawapannya: YA" title="SEMUA JENIS EMAS" size={64} sub="Public Gold terima buyback" subAt={r(M.semua)} shine />
  )},
  {from: M.jenis + 0.05, to: M.asalkan - 0.1, render: (d, r) => (
    <Choices dur={d} items={[
      {top: 'Emas', main: '999', at: r(M.g999)},
      {top: 'Emas', main: '916', at: r(M.g916)},
      {top: 'Emas', main: '875', sub: 'dan lain-lain', at: r(M.g875)},
    ]} />
  )},
  {from: M.asalkan - 0.1, to: E('jenis') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCoin size={84} />} label="Asalkan emas tulen" title="HARGA TINGGI" size={70} sub="harga belian balik yang tinggi" subAt={r(M.tinggi)} shine />
  )},
  {from: M.patah + 0.05, to: M.bawa0 - 0.6, render: (d, r) => (
    <ChecklistCard dur={d} label="Emas lama tak guna?" rows={[
      {text: 'Gelang tangan', at: r(M.gelang)},
      {text: 'Subang · cincin', at: r(M.cincin)},
      {text: 'Dah patah · dah kemek', at: r(M.patahW)},
    ]} />
  )},
  {from: M.bawa0 - 0.6, to: E('patah') + 0.15, render: (d) => (
    <TitleCard dur={d} icon={<IconStore size={80} />} label="Boleh jual di mana-mana" title="CAWANGAN PG" size={66} />
  )},
  {from: M.proses + 0.05, to: M.pertama - 0.1, render: (d) => (
    <TitleCard dur={d} label="Proses jual" title="SANGAT MUDAH" size={70} gold={false} />
  )},
  {from: M.pertama - 0.1, to: M.percuma - 0.15, render: (d, r) => (
    <StepCard dur={d} n={1} total={4} title="DAFTAR PUBLIC GOLD" sub="belum daftar? isi beg biru" subAt={r(M.isi)} icon={<IconCard size={70} />} />
  )},
  {from: M.percuma - 0.15, to: E('daftar') + 0.15, render: (d) => (
    <TitleCard dur={d} icon={<IconCheck size={80} />} label="Pendaftaran" title="PERCUMA" size={76} shine />
  )},
  {from: M.walkin + 0.05, to: E('walkin') + 0.15, render: (d, r) => (
    <StepCard dur={d} n={2} total={4} title="WALK-IN CAWANGAN" sub="yang paling dekat dengan anda" subAt={r(M.berdekatan)} icon={<IconStore size={70} />} />
  )},
  {from: M.bawa + 0.05, to: E('bawa') + 0.15, render: (d, r) => (
    <StepCard dur={d} n={3} total={4} title="BAWA EMAS + IC" sub="serah pada staff · proses buyback" subAt={r(M.serahkan)} icon={<IconCoin size={70} />} />
  )},
  {from: M.tunai + 0.05, to: E('tunai') + 0.15, render: (d, r) => (
    <StepCard dur={d} n={4} total={4} title="TUNAI 2–3 JAM" sub="terus ke akaun bank" subAt={r(M.direct)} icon={<IconBank size={70} />} />
  )},
  {from: M.tutup + 0.05, to: 9999, render: (d, r) => (
    <TitleCard dur={d} icon={<IconClock size={80} />} label="Jangan lepaskan peluang" title="HARGA TERTINGGI" size={66} sub="jual balik emas · pulangan besar" subAt={r(M.pulangan)} shine />
  )},
];

const SFX: Sfx[] = [
  {t: 0.05, f: 'whoosh_cine', v: 0.42},
  {t: 0.1, f: 'impact_deep', v: 0.24},
  {t: M.walaupun, f: 'pop_msg', v: 0.32},
  {t: M.maklumkan - 0.1, f: 'whoosh_pop', v: 0.38},
  {t: M.semua, f: 'ding_correct', v: 0.3},
  {t: M.jenis + 0.05, f: 'whoosh_small', v: 0.28},
  {t: M.g999, f: 'pop_hard', v: 0.32},
  {t: M.g916, f: 'pop_hard', v: 0.32},
  {t: M.g875, f: 'pop_hard', v: 0.32},
  {t: M.asalkan - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.tinggi, f: 'gold_prize', v: 0.24},
  {t: M.patah + 0.05, f: 'whoosh_pop', v: 0.36},
  {t: M.gelang + 0.15, f: 'click_select', v: 0.32},
  {t: M.cincin + 0.15, f: 'click_select', v: 0.32},
  {t: M.patahW + 0.15, f: 'click_select', v: 0.32},
  {t: M.bawa0 - 0.6, f: 'whoosh_small', v: 0.28},
  {t: M.proses + 0.05, f: 'whoosh_cine', v: 0.32},
  {t: M.pertama - 0.1, f: 'whoosh_pop', v: 0.36},
  {t: M.isi, f: 'pop_msg', v: 0.3},
  {t: M.percuma - 0.15, f: 'sparkle', v: 0.26},
  {t: M.walkin + 0.05, f: 'whoosh_pop', v: 0.36},
  {t: M.berdekatan, f: 'click_select', v: 0.3},
  {t: M.bawa + 0.05, f: 'whoosh_pop', v: 0.36},
  {t: M.serahkan, f: 'pop_msg', v: 0.3},
  {t: M.tunai + 0.05, f: 'whoosh_pop', v: 0.36},
  {t: M.tunaiW, f: 'money_bag', v: 0.28},
  {t: M.jam, f: 'coins', v: 0.26},
  {t: M.tutup + 0.05, f: 'whoosh_cine', v: 0.34},
  {t: M.tertinggi, f: 'gold_price', v: 0.22},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <Schedule items={ITEMS} total={tl.total} />
    <Subtitles words={captionsJson as Word[]} busy={motionBusy(ITEMS, SFX)} />
  </>
);

export const v12: VideoDef = {
  id: 'v12', tl, Overlays, sfx: SFX,
  punches: [M.walaupun, M.semua, M.g875, M.tinggi, M.patahW, M.tunaiW, M.tertinggi],
  zoom: {hook: [1.06], jawab: [1.0, 1.06], jenis: [1.0], patah: [1.06, 1.0], proses: [1.0], daftar: [1.06, 1.0], walkin: [1.0], bawa: [1.06, 1.0], tunai: [1.0], tutup: [1.06]},
  music: {file: 'bgm.mp3', startAt: 120},
};
export const BuybackEmas: React.FC<EditProps> = (p) => <Edit def={v12} {...p} />;
