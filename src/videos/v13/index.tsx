/* v13 — Alang-alang simpan emas, biar sampai kaya: set up auto debit */
import React from 'react';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {ChainCard, GItem, GoldProgress, IconChat, IconRepeat, IconWallet, IconX, Schedule, Subtitles, TitleCard, motionBusy} from '../../engine/kit';
import {IconClock, IconCoin} from '../../engine/ui';

const tl = makeTimeline(edlJson as Edl, 30);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  hook: 0.05,
  auto0: at('hook', 'auto'),
  kaya: S('kaya'),
  kaya1: at('kaya', 'kaya'),
  bertambah: at('kaya', 'bertambah'),
  konsisten: at('kaya', 'konsisten'),
  mudah: at('kaya', 'mudah'),
  autoK: at('kaya', 'auto'),
  dec: S('decision'),
  decision: at('decision', 'decision'),
  automatik: at('decision', 'automatik'),
  emas: at('decision', 'emas'),
  tahu: S('tahu'),
  lima: at('tahu', '5'),
  terkumpul: at('tahu', 'terkumpul'),
  tanpa: at('tahu', 'tanpa'),
  cta: S('cta'),
  setup: at('cta', 'set'),
  fokus: at('cta', 'fokus'),
  gram: at('cta', 'gram'),
  dapat: at('cta', 'dapat'),
};

const ITEMS: GItem[] = [
  {from: M.hook, to: E('hook') + 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconRepeat size={84} />} label="Khas untuk penyimpan emas" title="DAH BUAT AUTO DEBIT?" size={56} />
  )},
  {from: M.kaya + 0.05, to: E('kaya') + 0.1, render: (d, r) => (
    <ChainCard dur={d} label="Alang-alang simpan emas, biar sampai kaya" steps={[
      {text: 'KAYA', at: r(M.kaya1)},
      {text: 'GRAM BERTAMBAH', at: r(M.bertambah)},
      {text: 'KONSISTEN', at: r(M.konsisten)},
      {text: 'AUTO DEBIT', at: r(M.autoK)},
    ]} />
  )},
  {from: M.dec + 0.05, to: M.automatik - 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconX size={78} />} label="Dah set auto debit?" title="TAK PERLU DECIDE LAGI" gold={false} size={50} sub="setiap bulan" subAt={r(M.decision)} />
  )},
  {from: M.automatik - 0.1, to: E('decision') + 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconWallet size={80} />} label="Automatik" title="GAJI → EMAS" size={70} shine />
  )},
  {from: M.tahu + 0.05, to: M.tanpa - 0.1, render: (d, r) => (
    <GoldProgress dur={d} label="Tahu-tahu… 5 tahun kemudian" target={60} fill0={r(M.lima)} fill1={r(M.terkumpul) + 20} doneAt={r(M.terkumpul) + 8} done="Terkumpul dalam akaun GAP" />
  )},
  {from: M.tanpa - 0.1, to: E('tahu') + 0.1, render: (d) => (
    <TitleCard dur={d} icon={<IconClock size={80} />} label="Simpanan dah automatik" title="TANPA ANDA SEDAR" size={60} />
  )},
  {from: M.cta + 0.05, to: M.fokus - 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconRepeat size={80} />} label="Dah simpan emas? Terus" title="SET UP AUTO DEBIT" size={60} sub="untuk jangka masa panjang" subAt={r(M.setup) + 20} shine />
  )},
  {from: M.fokus - 0.1, to: M.dapat - 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCoin size={88} />} label="Suatu hari nanti" title="BANYAK GRAM EMAS" size={60} sub="secara automatik" subAt={r(M.gram) + 20} shine />
  )},
  {from: M.dapat - 0.1, to: 9999, render: (d) => (
    <TitleCard dur={d} icon={<IconChat size={80} />} label="Komen di bawah" title="DAPAT SESUATU?" gold={false} size={62} />
  )},
];

const SFX: Sfx[] = [
  {t: M.hook, f: 'whoosh_cine', v: 0.45},
  {t: M.hook + 0.05, f: 'impact_deep', v: 0.26},
  {t: M.auto0, f: 'atm_key', v: 0.3},
  {t: M.kaya + 0.05, f: 'whoosh_pop', v: 0.38},
  {t: M.kaya1, f: 'gold_prize', v: 0.2},
  {t: M.bertambah, f: 'click_select', v: 0.32},
  {t: M.konsisten, f: 'click_select', v: 0.32},
  {t: M.autoK, f: 'ding_correct', v: 0.28},
  {t: M.dec + 0.05, f: 'whoosh_pop', v: 0.38},
  {t: M.automatik - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.emas, f: 'coins', v: 0.32},
  {t: M.tahu + 0.05, f: 'whoosh_small', v: 0.28},
  {t: M.terkumpul, f: 'money_bag', v: 0.28},
  {t: M.tanpa - 0.1, f: 'whoosh_pop', v: 0.34},
  {t: M.cta + 0.05, f: 'whoosh_cine', v: 0.32},
  {t: M.setup, f: 'atm_key', v: 0.3},
  {t: M.fokus - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.gram, f: 'sparkle', v: 0.24},
  {t: M.dapat - 0.1, f: 'bell_notif', v: 0.26},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <Schedule items={ITEMS} total={tl.total} />
    <Subtitles words={captionsJson as Word[]} busy={motionBusy(ITEMS, SFX)} />
  </>
);

export const v13: VideoDef = {
  id: 'v13', tl, Overlays, sfx: SFX,
  punches: [M.auto0, M.kaya1, M.autoK, M.automatik, M.tanpa, M.setup],
  zoom: {hook: [1.12], kaya: [1.0, 1.06], decision: [1.06, 1.0], tahu: [1.0, 1.06], cta: [1.06, 1.0]},
  music: {file: 'bgm.mp3', startAt: 150},
};
export const AutoDebit: React.FC<EditProps> = (p) => <Edit def={v13} {...p} />;
