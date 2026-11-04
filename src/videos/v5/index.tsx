/* v5 — Gaji cukup-cukup makan, macam mana nak menabung emas? */
import React from 'react';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {CalcCard, ChecklistCard, Choices, GItem, IconShield, IconWallet, Schedule, StepCard, Subtitles, TitleCard, motionBusy} from '../../engine/kit';
import {IconCoin, IconPin} from '../../engine/ui';

const tl = makeTimeline(edlJson as Edl);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  hook: 0.05,
  menabung: at('hook', 'menabung'),
  keutamaan: at('priority', 'keutamaan'),
  bukan: at('priority', 'bukan'),
  wujudkan: at('priority', 'wujudkan'),
  least: at('priority', 'least'),
  kata: at('priority', 'kata'),
  rm2000: at('priority', 'rm2,000'),
  rm6000: at('priority', 'rm6,000'),
  tunai: at('priority', 'tunai'),
  why: S('why'),
  meminta: at('why', 'meminta'),
  ready: at('why', 'ready'),
  keep: S('keep'),
  terguna: at('keep', 'terguna'),
  terbocor: at('keep', 'terbocor'),
  sewaktu: at('keep', 'sewaktu'),
  next: S('next'),
  emas: at('next', 'emas'),
  jangka: at('next', 'jangka'),
  pertama: at('cta', 'pertama'),
  kedua: at('cta', 'kedua'),
  ketiga: at('cta', 'ketiga'),
  mulakan: at('cta', 'mulakan'),
  matlamat: at('cta', 'matlamat'),
};

const ITEMS: GItem[] = [
  {from: M.hook, to: E('hook') + 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconWallet size={86} />} label="Soalan prospek" title="GAJI CUKUP-CUKUP MAKAN" gold={false} size={52} sub="macam mana nak simpan emas?" subAt={r(M.menabung)} />
  )},
  {from: M.bukan - 0.15, to: M.kata - 0.25, render: (d, r) => (
    <Choices dur={d} items={[
      {top: 'Bukan', main: 'Simpan emas', at: r(M.bukan), bad: true},
      {top: 'Keutamaan #1', main: 'Dana kecemasan', sub: 'min. 3 bulan gaji', at: r(M.wujudkan), good: true},
    ]} />
  )},
  {from: M.kata - 0.25, to: E('priority') + 0.2, render: (d, r) => (
    <CalcCard dur={d} label="Contoh: gaji pokok" a="RM2,000" aAt={r(M.rm2000)} b="3 bulan" bAt={r(M.rm6000) - 8} result={6000} rAt={r(M.rm6000)} sub="simpan dalam bentuk TUNAI" subAt={r(M.tunai)} />
  )},
  {from: M.why + 0.1, to: E('why') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconShield size={84} />} label="Bila berlaku kecemasan" title="TAK PERLU MINTA SANA-SINI" gold={false} size={50} sub="dah ready dengan dana kecemasan" subAt={r(M.ready)} />
  )},
  {from: M.keep + 0.1, to: E('keep') + 0.2, render: (d, r) => (
    <ChecklistCard dur={d} label="Pastikan dana kecemasan" rows={[
      {text: 'Tidak terguna', at: r(M.terguna)},
      {text: 'Tidak bocor', at: r(M.terbocor)},
      {text: 'Guna masa CEMAS sahaja', at: r(M.sewaktu)},
    ]} />
  )},
  {from: M.next + 0.1, to: E('next') + 0.15, render: (d, r) => (
    <Choices dur={d} items={[
      {top: 'Dah ada 3 bulan', main: 'Dana kecemasan ✓', at: 4, good: true},
      {top: 'Barulah', main: 'Simpan EMAS', sub: 'jangka masa panjang', at: r(M.emas) - 4, good: true},
    ]} />
  )},
  {from: M.pertama - 0.1, to: M.kedua - 0.15, render: (d) => (
    <StepCard dur={d} n={1} total={3} title="FOLLOW SAYA" icon={<IconPin size={70} />} />
  )},
  {from: M.kedua - 0.15, to: M.ketiga - 0.15, render: (d) => (
    <StepCard dur={d} n={2} total={3} title="CUKUPKAN DANA KECEMASAN" sub="3 bulan gaji" icon={<IconShield size={70} />} />
  )},
  {from: M.ketiga - 0.15, to: M.matlamat - 0.15, render: (d, r) => (
    <StepCard dur={d} n={3} total={3} title="CARI SAYA" sub="mula simpanan emas pertama" subAt={r(M.mulakan)} icon={<IconCoin size={74} />} />
  )},
  {from: M.matlamat - 0.15, to: 9999, render: (d) => (
    <TitleCard dur={d} icon={<IconCoin size={90} />} label="Simpanan jangka panjang" title="CAPAI MATLAMAT" size={66} shine />
  )},
];

const SFX: Sfx[] = [
  {t: M.hook, f: 'whoosh_cine', v: 0.45},
  {t: M.hook + 0.05, f: 'impact_deep', v: 0.25},
  {t: M.menabung, f: 'pop_msg', v: 0.38},
  {t: M.bukan - 0.17, f: 'whoosh_small', v: 0.3},
  {t: M.bukan, f: 'pop_hard', v: 0.36},
  {t: M.wujudkan, f: 'ding_correct', v: 0.3},
  {t: M.kata - 0.3, f: 'whoosh_small', v: 0.28},
  {t: M.rm2000, f: 'atm_key', v: 0.3},
  {t: M.rm6000, f: 'coins', v: 0.36},
  {t: M.tunai, f: 'money_bag', v: 0.3},
  {t: M.why, f: 'whoosh_small', v: 0.3},
  {t: M.ready, f: 'pop_msg', v: 0.36},
  {t: M.keep, f: 'whoosh_small', v: 0.3},
  {t: M.terguna + 0.12, f: 'click_select', v: 0.38},
  {t: M.terbocor + 0.12, f: 'click_select', v: 0.38},
  {t: M.sewaktu + 0.12, f: 'ding_correct', v: 0.3},
  {t: M.next, f: 'whoosh_cine', v: 0.28},
  {t: M.emas, f: 'sparkle', v: 0.3},
  {t: M.pertama - 0.1, f: 'whoosh_small', v: 0.3},
  {t: M.pertama + 0.1, f: 'bell_notif', v: 0.26},
  {t: M.kedua - 0.15, f: 'whoosh_pop', v: 0.4},
  {t: M.ketiga - 0.15, f: 'whoosh_pop', v: 0.4},
  {t: M.mulakan, f: 'pop_msg', v: 0.35},
  {t: M.matlamat - 0.15, f: 'gold_prize', v: 0.3},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <Schedule items={ITEMS} total={tl.total} />
    <Subtitles words={captionsJson as Word[]} busy={motionBusy(ITEMS, SFX)} />
  </>
);

export const v5: VideoDef = {
  id: 'v5',
  tl,
  Overlays,
  sfx: SFX,
  punches: [M.menabung, M.bukan, M.rm6000, M.ready, M.emas, M.matlamat],
  zoom: {hook: [1.12], intro: [1.0], priority: [1.06, 1.0], why: [1.08], keep: [1.0, 1.06], next: [1.07], cta: [1.0, 1.07]},
  music: {file: 'bgm.mp3', startAt: 30},
};

export const GajiEmas: React.FC<EditProps> = (p) => <Edit def={v5} {...p} />;
