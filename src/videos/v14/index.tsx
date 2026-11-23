/* v14 — dana haji: 50 gram emas seorang dalam 5 tahun */
import React from 'react';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {ChecklistCard, Choices, CtaCard, GItem, GoldProgress, IconWallet, Schedule, StepCard, Subtitles, TitleCard, motionBusy} from '../../engine/kit';
import {IconCheck, IconClock, IconCoin, IconTarget} from '../../engine/ui';

const tl = makeTimeline(edlJson as Edl, 15);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  hook: 0.05,
  target: at('hook', 'target'),
  pasangan: at('hook', 'kalau'),
  seratus: at('hook', '100'),
  caranya: at('hook', 'caranya'),
  kenapa: S('kenapa'),
  cukup: at('kenapa', 'cukup'),
  kos: at('kenapa', 'kos'),
  dah: at('kenapa', 'dah'),
  s1: S('s1'),
  pertama: at('s1', 'pertama'),
  ajak: at('s1', 'ajak'),
  s2: S('s2'),
  sebulan: at('s2', 'sebulan'),
  s3: S('s3'),
  selama: at('s3', 'selama'),
  hasil: S('hasil'),
  bajet: at('hasil', 'bajet'),
  giliran: at('hasil', 'giliran'),
  mudah: S('mudah'),
  konsisten: at('mudah', 'konsisten'),
  cepat: at('mudah', 'cepat'),
  bocor: at('mudah', 'tanpa'),
  cta: S('cta'),
  pin: at('cta', 'pin'),
  isi: at('cta', 'isi'),
};

const ITEMS: GItem[] = [
  {from: M.hook, to: M.target - 0.1, render: (d) => (
    <TitleCard dur={d} icon={<IconClock size={86} />} label="Plan dana haji lagi 5 tahun?" title="APA NAK BUAT?" gold={false} size={72} />
  )},
  {from: M.target - 0.1, to: M.caranya - 0.1, render: (d, r) => (
    <Choices dur={d} items={[
      {top: 'Seorang', main: '50 GRAM', sub: 'emas', at: 8},
      {top: 'Bersama pasangan', main: '100 GRAM', sub: 'emas', at: r(M.seratus) - 4},
    ]} />
  )},
  {from: M.caranya - 0.1, to: E('hook') + 0.15, render: (d) => (
    <TitleCard dur={d} icon={<IconCheck size={80} />} label="Target dana haji" title="CARANYA MUDAH" size={70} />
  )},
  {from: M.kenapa + 0.05, to: M.dah - 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconTarget size={84} />} label="Kenapa 50 gram?" title="CUKUP TUNAI HAJI" size={62} sub="dengan kos asas" subAt={r(M.kos)} shine />
  )},
  {from: M.dah - 0.1, to: E('kenapa') + 0.15, render: (d) => (
    <TitleCard dur={d} icon={<IconClock size={80} />} label="Untuk haji" title="5 ATAU 10 TAHUN LAGI" size={56} />
  )},
  {from: M.s1 + 0.05, to: E('s1') + 0.15, render: (d, r) => (
    <StepCard dur={d} n={1} total={3} title="DAFTAR AKAUN GAP" sub="ajak pasangan daftar sekali" subAt={r(M.ajak)} icon={<IconWallet size={76} />} />
  )},
  {from: M.s2 + 0.05, to: E('s2') + 0.15, render: (d, r) => (
    <StepCard dur={d} n={2} total={3} title="1 GRAM SEBULAN" sub="menabung dalam akaun GAP" subAt={r(M.sebulan) - 10} icon={<IconCoin size={76} />} />
  )},
  {from: M.s3 + 0.05, to: E('s3') + 0.15, render: (d, r) => (
    <StepCard dur={d} n={3} total={3} title="KONSISTEN SETIAP BULAN" sub="selama 5 tahun" subAt={r(M.selama)} icon={<IconTarget size={76} />} />
  )},
  {from: M.hasil + 0.05, to: E('hasil') + 0.15, render: (d, r) => (
    <GoldProgress dur={d} label="Dalam 5 tahun" target={50} fill0={4} fill1={r(M.bajet) + 4} doneAt={r(M.giliran) - 6} done="Bajet cukup · tunggu giliran" />
  )},
  {from: M.mudah + 0.05, to: E('mudah') + 0.15, render: (d, r) => (
    <ChecklistCard dur={d} label="Jalan paling mudah" rows={[
      {text: 'Bina simpanan', at: 14},
      {text: 'Konsisten', at: r(M.konsisten)},
      {text: 'Dana haji lebih cepat', at: r(M.cepat) - 4},
    ]} />
  )},
  {from: M.cta + 0.05, to: 9999, render: (d, r) => (
    <CtaCard dur={d} head="Target haji 4–5 tahun lagi?" pin={r(M.pin)} guide={r(M.isi)} guideText="Isi BEG BIRU" />
  )},
];

const SFX: Sfx[] = [
  {t: M.hook, f: 'whoosh_cine', v: 0.45},
  {t: M.hook + 0.05, f: 'impact_deep', v: 0.26},
  {t: M.target - 0.1, f: 'whoosh_pop', v: 0.36},
  {t: M.target + 0.2, f: 'coins', v: 0.28},
  {t: M.seratus - 0.1, f: 'gold_prize', v: 0.26},
  {t: M.caranya - 0.1, f: 'pop_hard', v: 0.32},
  {t: M.kenapa + 0.05, f: 'whoosh_small', v: 0.3},
  {t: M.cukup, f: 'ding_correct', v: 0.28},
  {t: M.dah - 0.1, f: 'pop_msg', v: 0.3},
  {t: M.s1 + 0.05, f: 'whoosh_pop', v: 0.4},
  {t: M.ajak, f: 'click_select', v: 0.32},
  {t: M.s2 + 0.05, f: 'whoosh_pop', v: 0.4},
  {t: M.sebulan, f: 'coins', v: 0.28},
  {t: M.s3 + 0.05, f: 'whoosh_pop', v: 0.4},
  {t: M.selama, f: 'click_select', v: 0.32},
  {t: M.hasil + 0.05, f: 'whoosh_cine', v: 0.3},
  {t: M.giliran, f: 'gold_prize', v: 0.28},
  {t: M.mudah + 0.05, f: 'whoosh_small', v: 0.28},
  {t: M.mudah + 0.5, f: 'click_select', v: 0.32},
  {t: M.konsisten + 0.15, f: 'click_select', v: 0.32},
  {t: M.cepat + 0.05, f: 'click_select', v: 0.32},
  {t: M.cta + 0.05, f: 'whoosh_small', v: 0.3},
  {t: M.pin, f: 'bell_notif', v: 0.26},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <Schedule items={ITEMS} total={tl.total} />
    <Subtitles words={captionsJson as Word[]} busy={motionBusy(ITEMS, SFX)} />
  </>
);

export const v14: VideoDef = {
  id: 'v14', tl, Overlays, sfx: SFX,
  punches: [M.target, M.seratus, M.cukup, M.s1 + 0.1, M.s2 + 0.1, M.s3 + 0.1, M.giliran, M.cepat],
  zoom: {hook: [1.1, 1.03], kenapa: [1.0, 1.06], s1: [1.06], s2: [1.0], s3: [1.07], hasil: [1.0], mudah: [1.06, 1.0], cta: [1.0, 1.08]},
  music: {file: 'bgm.mp3', startAt: 205},
};
export const DanaHaji: React.FC<EditProps> = (p) => <Edit def={v14} {...p} />;
