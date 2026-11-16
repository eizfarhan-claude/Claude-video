/* v14 — Harga emas rendah: waktu terbaik untuk beli? */
import React from 'react';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {CtaCard, GItem, IconChartDown, IconGift, IconWallet, IconX, Schedule, Subtitles, TitleCard, motionBusy} from '../../engine/kit';
import {KineticHook, MythFact, VsCard} from '../../engine/kit2';
import {IconClock, IconCoin} from '../../engine/ui';

const tl = makeTimeline({...(edlJson as Edl), words: captionsJson as Word[]}, 30);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  terendah: at('hook', 'terendah'),
  masalah: S('masalah'),
  grab: at('masalah', 'grab'),
  tengah: at('masalah', 'tengah'),
  hujung: at('masalah', 'hujung'),
  adakah: at('masalah', 'adakah'),
  terbaik: at('masalah', 'terbaik'),
  jawapan: S('jawapan'),
  bonus: at('jawapan', 'bonus'),
  konsisten: at('jawapan', 'konsisten'),
  strategi: S('strategi'),
  tinggi: at('strategi', 'tinggi'),
  rendah: at('strategi', 'rendah'),
  gram: at('strategi', 'gram'),
  dca: S('dca'),
  dcaW: at('dca', 'dca'),
  purata: at('dca', 'purata'),
  waktu: S('waktu'),
  duit: at('waktu', 'duit'),
  jadi2: at('waktu', 'jadi', 1),
  bukan2: at('waktu', 'bukan', 1),
  tetapi: at('waktu', 'tetapi'),
  tahun: at('waktu', 'tahun'),
  waktu2: S('waktu2'),
  bila: at('waktu2', 'bila-bila'),
  itulah: at('waktu2', 'itulah'),
  cta: S('cta'),
  video: at('cta', 'pin video'),
  biru: at('cta', 'biru'),
};

const ITEMS: GItem[] = [
  {from: 0.05, to: E('hook') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconChartDown size={88} />} label="Beberapa hari ini" title="HARGA EMAS TERENDAH" size={60} gold={false} />
  )},
  {from: M.masalah + 0.05, to: M.adakah - 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconWallet size={84} />} label="Tapi ramai tak dapat grab" title="TENGAH BULAN" size={62} gold={false} sub="hujung gaji" subAt={r(M.hujung)} />
  )},
  {from: M.adakah - 0.15, to: E('masalah') + 0.2, render: (d, r) => (
    <KineticHook dur={d} label="Harga rendah ini" size={66} words={[
      {text: 'WAKTU', at: r(M.terbaik) - 10},
      {text: 'TERBAIK?', at: r(M.terbaik), gold: true},
    ]} />
  )},
  {from: M.jawapan + 0.05, to: E('jawapan') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconGift size={86} />} label="Harga rendah cuma" title="BONUS" size={84} sub="untuk yang konsisten menabung" subAt={r(M.konsisten)} shine />
  )},
  {from: M.strategi + 0.05, to: E('strategi') + 0.15, render: (d, r) => (
    <VsCard dur={d} a={{top: 'Harga tinggi', main: 'TABUNG BIASA', at: r(M.tinggi)}} b={{top: 'Harga rendah', main: 'TABUNG LEBIH', at: r(M.rendah)}} winner="b" winAt={r(M.gram)} />
  )},
  {from: M.dca + 0.05, to: E('dca') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCoin size={86} />} label="Dollar cost averaging" title="DCA" size={84} sub="rendahkan purata harga per gram" subAt={r(M.purata)} shine />
  )},
  {from: M.waktu + 0.05, to: M.jadi2 - 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconX size={78} />} label="Harga rendah pun tak guna kalau" title="TAK ADA DUIT LEBIH" size={56} gold={false} />
  )},
  {from: M.jadi2 - 0.1, to: E('waktu') + 0.15, render: (d, r) => (
    <MythFact dur={d} mythLabel="Waktu terbaik beli emas bukan" myth="BILA HARGA RENDAH" strikeAt={r(M.bukan2) + 4} factLabel="Tapi bila ada" fact="DUIT LEBIH 2–3 TAHUN" factAt={r(M.tetapi)} />
  )},
  {from: M.waktu2 + 0.05, to: E('waktu2') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconClock size={80} color="#F5C84C" />} label="Ada lebihan duit?" title="BILA-BILA MASA" size={64} sub="itulah waktu terbaik" subAt={r(M.itulah)} shine />
  )},
  {from: M.cta, to: 9999, render: (d, r) => (
    <CtaCard dur={d} head="Nak mula masa harga rendah?" pin={r(M.video)} guide={r(M.biru)} guideText="Isi BAG BIRU" />
  )},
];

const SFX: Sfx[] = [
  {t: 0.0, f: 'whoosh_impact', v: 0.4},
  {t: M.terendah, f: 'impact_deep', v: 0.24},
  {t: M.masalah + 0.05, f: 'tech_slide', v: 0.3},
  {t: M.hujung, f: 'pop_msg', v: 0.3},
  {t: M.adakah - 0.15, f: 'swoosh_fast', v: 0.3},
  {t: M.terbaik, f: 'zoom_impact', v: 0.3},
  {t: M.jawapan + 0.05, f: 'whoosh_pop', v: 0.34},
  {t: M.bonus, f: 'coin_win', v: 0.3},
  {t: M.strategi + 0.05, f: 'swoosh_fast', v: 0.3},
  {t: M.tinggi, f: 'bubble_pop', v: 0.3},
  {t: M.rendah, f: 'bubble_pop', v: 0.3},
  {t: M.gram, f: 'ding_correct', v: 0.26},
  {t: M.dca + 0.05, f: 'tech_slide', v: 0.3},
  {t: M.dcaW, f: 'pop_hard', v: 0.3},
  {t: M.purata, f: 'coins', v: 0.24},
  {t: M.waktu + 0.05, f: 'whoosh_small', v: 0.28},
  {t: M.duit, f: 'buzzer', v: 0.14},
  {t: M.jadi2 - 0.1, f: 'tech_slide', v: 0.3},
  {t: M.bukan2 + 0.13, f: 'swoosh_accent', v: 0.34},
  {t: M.tetapi, f: 'ding_correct', v: 0.26},
  {t: M.waktu2 + 0.05, f: 'whoosh_cine', v: 0.3},
  {t: M.itulah, f: 'sparkle', v: 0.24},
  {t: M.cta, f: 'whoosh_pop', v: 0.34},
  {t: M.video, f: 'pop_msg', v: 0.3},
  {t: M.biru, f: 'bell_notif', v: 0.22},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <Schedule items={ITEMS} total={tl.total} />
    <Subtitles words={captionsJson as Word[]} busy={motionBusy(ITEMS, SFX)} />
  </>
);

export const v14: VideoDef = {
  id: 'v14', tl, Overlays, sfx: SFX,
  punches: [M.terendah, M.terbaik, M.bonus, M.gram, M.tetapi, M.bila],
  zoom: {hook: [1.1], masalah: [1.0, 1.06], jawapan: [1.06], strategi: [1.0], dca: [1.06], waktu: [1.0, 1.06], waktu2: [1.07], cta: [1.0]},
  music: {file: 'lofi04.mp3', startAt: 4},
};
export const WaktuTerbaik: React.FC<EditProps> = (p) => <Edit def={v14} {...p} />;
