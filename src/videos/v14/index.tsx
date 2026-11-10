/* v14 — Berbaloi tak jual emas untuk settle hutang? */
import React from 'react';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {ChecklistCard, Choices, DebtBar, GItem, IconChat, IconRepeat, IconShield, IconWallet, QuoteStack, Schedule, StepCard, Subtitles, TitleCard, motionBusy} from '../../engine/kit';
import {IconArrowUp, IconCoin, IconPin} from '../../engine/ui';

const tl = makeTimeline(edlJson as Edl, 30);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  hook: 0.05,
  hutang0: at('q', 'hutang'),
  berbaloi: at('q', 'berbaloi'),
  menarik: S('menarik'),
  p1: S('p1'),
  least: at('p1', 'least'),
  p2: S('p2'),
  jual2: at('p2', 'jual'),
  p3: S('p3'),
  convert: at('p3', 'convert'),
  contoh: S('contoh'),
  rm500: at('contoh', 'rm500'),
  jual: at('contoh', 'jual'),
  kosong: at('contoh', 'kosong'),
  tetapi: at('contoh', 'tetapi'),
  masukkan: at('contoh', 'masukkan'),
  kaya: S('kaya'),
  bertambah: at('kaya', 'bertambah'),
  berkurang: at('kaya', 'berkurang'),
  sebenarnya: at('kaya', 'sebenarnya'),
  ending: S('ending'),
  bkaya: at('ending', 'kaya'),
  cara: at('ending', 'cara'),
  tambah: at('ending', 'tambah'),
  harta: at('ending', 'harta'),
  hutangE: at('ending', 'hutang'),
  outro: S('outro'),
};

const ITEMS: GItem[] = [
  {from: M.hook, to: E('q') + 0.1, render: (d, r) => (
    <QuoteStack dur={d} label="Soalan penyimpan emas" quotes={[
      {text: 'Hutang AEON Credit, baki 2 tahun', at: r(M.hutang0)},
      {text: 'Berbaloi jual emas untuk settle?', at: r(M.berbaloi)},
    ]} />
  )},
  {from: M.menarik, to: E('menarik') + 0.1, render: (d) => (
    <TitleCard dur={d} icon={<IconPin size={74} />} label="Situasi sama?" title="TENGOK SAMPAI HABIS" gold={false} size={54} />
  )},
  {from: M.p1 + 0.05, to: E('p1') + 0.1, render: (d, r) => (
    <StepCard dur={d} n={1} total={3} title="DANA KECEMASAN DULU" sub="at least 3 bulan gaji" subAt={r(M.least)} icon={<IconShield size={76} />} />
  )},
  {from: M.p2 + 0.05, to: E('p2') + 0.1, render: (d, r) => (
    <StepCard dur={d} n={2} total={3} title="JUAL EMAS, SETTLE HUTANG" sub="bila simpanan dah cukup" subAt={r(M.jual2)} icon={<IconCoin size={76} />} />
  )},
  {from: M.p3 + 0.05, to: E('p3') + 0.1, render: (d, r) => (
    <StepCard dur={d} n={3} total={3} title="BAYARAN HUTANG → EMAS" sub="convert balik jadi simpanan" subAt={r(M.convert)} icon={<IconRepeat size={76} />} />
  )},
  {from: M.contoh + 0.05, to: M.tetapi - 0.1, render: (d, r) => (
    <DebtBar dur={d} label="Contoh: hutang RM500 / bulan" drain0={r(M.jual)} drain1={r(M.kosong)} doneAt={r(M.kosong)} done="HUTANG KOSONG" />
  )},
  {from: M.tetapi - 0.1, to: E('contoh') + 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconWallet size={80} />} label="Setiap bulan" title="RM500 → EMAS" size={70} sub="ganti balik · bina balik simpanan" subAt={r(M.masukkan)} shine />
  )},
  {from: M.kaya + 0.05, to: M.sebenarnya - 0.1, render: (d, r) => (
    <Choices dur={d} items={[
      {top: 'Simpanan', main: 'BERTAMBAH', at: r(M.bertambah), good: true},
      {top: 'Hutang', main: 'BERKURANG', at: r(M.berkurang), good: true},
    ]} />
  )},
  {from: M.sebenarnya - 0.1, to: E('kaya') + 0.1, render: (d) => (
    <TitleCard dur={d} icon={<IconArrowUp size={80} />} label="Sebenarnya kita" title="ON TRACK JADI KAYA" size={58} shine />
  )},
  {from: M.ending + 0.05, to: M.cara - 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCoin size={88} />} label="Alang-alang simpan emas" title="BERTAMBAH KAYA" size={66} sub="one day" subAt={r(M.bkaya)} shine />
  )},
  {from: M.cara - 0.1, to: M.outro, render: (d, r) => (
    <ChecklistCard dur={d} label="Caranya" rows={[
      {text: 'Tambah simpanan', at: r(M.tambah)},
      {text: 'Tambah harta', at: r(M.harta)},
      {text: 'Hutang sentiasa berkurang', at: r(M.hutangE)},
    ]} />
  )},
  {from: M.outro, to: 9999, render: (d) => (
    <TitleCard dur={d} icon={<IconChat size={80} />} label="Komen di bawah" title="DAPAT SESUATU?" gold={false} size={62} />
  )},
];

const SFX: Sfx[] = [
  {t: M.hook, f: 'whoosh_cine', v: 0.42},
  {t: M.hutang0, f: 'pop_msg', v: 0.34},
  {t: M.berbaloi, f: 'pop_msg', v: 0.34},
  {t: M.menarik, f: 'whoosh_small', v: 0.28},
  {t: M.p1 + 0.05, f: 'whoosh_pop', v: 0.4},
  {t: M.least, f: 'click_select', v: 0.32},
  {t: M.p2 + 0.05, f: 'whoosh_pop', v: 0.4},
  {t: M.jual2, f: 'coins', v: 0.3},
  {t: M.p3 + 0.05, f: 'whoosh_pop', v: 0.4},
  {t: M.convert, f: 'sparkle', v: 0.22},
  {t: M.contoh + 0.05, f: 'whoosh_small', v: 0.28},
  {t: M.rm500, f: 'atm_key', v: 0.3},
  {t: M.kosong, f: 'ding_correct', v: 0.3},
  {t: M.tetapi - 0.1, f: 'whoosh_pop', v: 0.34},
  {t: M.masukkan, f: 'coins', v: 0.3},
  {t: M.kaya + 0.05, f: 'whoosh_small', v: 0.28},
  {t: M.bertambah, f: 'pop_hard', v: 0.3},
  {t: M.berkurang, f: 'pop_hard', v: 0.3},
  {t: M.sebenarnya - 0.1, f: 'whoosh_cine', v: 0.3},
  {t: M.sebenarnya + 0.3, f: 'gold_prize', v: 0.2},
  {t: M.ending + 0.05, f: 'whoosh_pop', v: 0.36},
  {t: M.cara - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.tambah + 0.15, f: 'click_select', v: 0.34},
  {t: M.harta + 0.15, f: 'click_select', v: 0.34},
  {t: M.hutangE + 0.15, f: 'click_select', v: 0.34},
  {t: M.outro, f: 'bell_notif', v: 0.26},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <Schedule items={ITEMS} total={tl.total} />
    <Subtitles words={captionsJson as Word[]} busy={motionBusy(ITEMS, SFX)} />
  </>
);

export const v14: VideoDef = {
  id: 'v14', tl, Overlays, sfx: SFX,
  punches: [M.berbaloi, M.p1 + 0.1, M.p2 + 0.1, M.p3 + 0.1, M.kosong, M.sebenarnya, M.bkaya],
  zoom: {q: [1.1], menarik: [1.0], p1: [1.0, 1.06], p2: [1.06, 1.0], p3: [1.0], contoh: [1.06, 1.0], kaya: [1.07], ending: [1.0, 1.06], outro: [1.08]},
  music: {file: 'bgm.mp3', startAt: 240},
};
export const JualHutang: React.FC<EditProps> = (p) => <Edit def={v14} {...p} />;
