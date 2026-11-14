/* v13 — Kesilapan terbesar penyimpan emas baru */
import React from 'react';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {Choices, CtaCard, GItem, IconShield, IconWarn, IconX, Schedule, Subtitles, TitleCard, WaveIcon, motionBusy} from '../../engine/kit';
import {IconArrowUp, IconClock, IconTarget} from '../../engine/ui';

const tl = makeTimeline(edlJson as Edl, 15);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  hook: 0.05,
  duit: at('hook', 'duit'),
  nampak: at('hook', 'nampak'),
  merugikan: at('hook', 'merugikan'),
  prinsip: S('prinsip'),
  kurang: at('prinsip', 'kurang'),
  panjang: S('panjang'),
  dua3: at('panjang', '2'),
  jauh: at('panjang', 'jauh'),
  kejatuhan: at('panjang', 'kejatuhan'),
  pendek: S('pendek'),
  naik: at('pendek', 'naik'),
  turun: at('pendek', 'turun'),
  spread: S('spread'),
  spreadW: at('spread', 'spread'),
  n6: at('spread', '6'),
  jadiRugi: at('spread', 'jadi'),
  rugi: at('spread', 'rugi'),
  masa: S('masa'),
  nilai: at('masa', 'nilai'),
  keuntungan: at('masa', 'keuntungan'),
  n10: at('masa', '10'),
  cta: S('cta'),
  nak: at('cta', 'nak'),
  boleh: at('cta', 'boleh'),
  pin: at('cta', 'pin'),
  bantu: at('cta', 'bantu'),
  paling: at('cta', 'paling', 1),
};

const ITEMS: GItem[] = [
  {from: M.hook, to: M.nampak - 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconWarn size={84} />} label="Penyimpan emas baru" title="KESILAPAN TERBESAR" gold={false} size={58} sub="guna duit untuk bulan depan" subAt={r(M.duit)} />
  )},
  {from: M.nampak - 0.1, to: E('hook') + 0.2, render: (d, r) => (
    <TitleCard dur={d} icon={<IconX size={80} />} label="Nampak simple, tapi" title="SANGAT MERUGIKAN" gold={false} size={60} />
  )},
  {from: M.kurang - 0.1, to: M.jauh - 0.1, render: (d, r) => (
    <Choices dur={d} items={[
      {top: 'Kurang 2 tahun', main: 'ASB · TABUNG HAJI', at: r(M.kurang)},
      {top: '2 – 3 tahun +', main: 'EMAS', at: r(M.dua3), good: true},
    ]} />
  )},
  {from: M.jauh - 0.1, to: E('panjang') + 0.2, render: (d, r) => (
    <TitleCard dur={d} icon={<IconShield size={84} />} label="Emas jangka panjang" title="JAUH LEBIH BAIK" size={62} sub="lawan kejatuhan nilai & inflasi" subAt={r(M.kejatuhan)} />
  )},
  {from: M.pendek + 0.05, to: E('pendek') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<WaveIcon size={86} />} label="Jangka pendek" title="HARGA NAIK TURUN" size={60} sub="ada masa naik, ada masa turun" subAt={r(M.naik)} />
  )},
  {from: M.spread + 0.05, to: M.jadiRugi - 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconWarn size={80} />} label="Jual dalam masa terdekat?" title="BELUM TUTUP SPREAD" size={54} sub="spread sekitar 6% – 9%" subAt={r(M.n6)} />
  )},
  {from: M.jadiRugi - 0.1, to: E('spread') + 0.15, render: (d) => (
    <TitleCard dur={d} icon={<IconX size={84} />} label="Simpan kurang 2 tahun" title="ANDA AKAN RUGI" gold={false} size={62} />
  )},
  {from: M.masa + 0.05, to: M.keuntungan - 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconClock size={80} />} label="Bagi emas masa" title="EMAS BAGI NILAI" size={64} sub="untuk jangka masa panjang" subAt={r(M.nilai)} />
  )},
  {from: M.keuntungan - 0.1, to: E('masa') + 0.2, render: (d) => (
    <TitleCard dur={d} icon={<IconArrowUp size={84} />} label="Purata kenaikan harga emas" title="±10% SETAHUN" size={80} shine />
  )},
  {from: M.cta + 0.05, to: M.boleh - 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconTarget size={80} />} label="Plan simpanan 2–3 tahun +" title="TUKAR KE EMAS" size={66} />
  )},
  {from: M.boleh - 0.1, to: 9999, render: (d, r) => (
    <CtaCard dur={d} head="Nak mula?" pin={r(M.pin)} guide={r(M.bantu)} guideText="Saya bantu" final={r(M.paling)} finalLabel="Paling mudah & murah" finalTitle="EMAS FIZIKAL" />
  )},
];

const SFX: Sfx[] = [
  {t: M.hook, f: 'whoosh_cine', v: 0.45},
  {t: M.hook + 0.05, f: 'impact_deep', v: 0.3},
  {t: M.duit, f: 'pop_msg', v: 0.32},
  {t: M.nampak - 0.1, f: 'whoosh_small', v: 0.3},
  {t: M.merugikan, f: 'pop_hard', v: 0.36},
  {t: M.kurang - 0.1, f: 'whoosh_pop', v: 0.38},
  {t: M.dua3, f: 'ding_correct', v: 0.28},
  {t: M.jauh - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.kejatuhan, f: 'pop_msg', v: 0.3},
  {t: M.pendek + 0.05, f: 'whoosh_pop', v: 0.38},
  {t: M.naik, f: 'click_select', v: 0.32},
  {t: M.turun, f: 'click_select', v: 0.32},
  {t: M.spread + 0.05, f: 'whoosh_pop', v: 0.38},
  {t: M.n6, f: 'pop_msg', v: 0.3},
  {t: M.jadiRugi - 0.1, f: 'whoosh_small', v: 0.3},
  {t: M.rugi, f: 'impact_deep', v: 0.28},
  {t: M.masa + 0.05, f: 'whoosh_cine', v: 0.32},
  {t: M.keuntungan - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.n10, f: 'coins', v: 0.32},
  {t: M.cta + 0.05, f: 'whoosh_pop', v: 0.38},
  {t: M.boleh - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.pin, f: 'pop_hard', v: 0.34},
  {t: M.bantu, f: 'click_select', v: 0.32},
  {t: M.paling, f: 'gold_prize', v: 0.26},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <Schedule items={ITEMS} total={tl.total} />
    <Subtitles words={captionsJson as Word[]} busy={motionBusy(ITEMS, SFX)} />
  </>
);

export const v13: VideoDef = {
  id: 'v13', tl, Overlays, sfx: SFX,
  punches: [M.merugikan, M.dua3, M.turun, M.rugi, M.n10, M.paling],
  zoom: {hook: [1.1], prinsip: [1.0, 1.06], panjang: [1.0, 1.06], pendek: [1.07, 1.0], spread: [1.0, 1.06], masa: [1.04, 1.0], cta: [1.0, 1.06]},
  music: {file: 'bgm.mp3', startAt: 150},
};
export const KesilapanBaru: React.FC<EditProps> = (p) => <Edit def={v13} {...p} />;
