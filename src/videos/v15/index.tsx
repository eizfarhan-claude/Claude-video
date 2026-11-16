/* v15 — Patut tunggu harga emas terendah? */
import React from 'react';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {ChecklistCard, CtaCard, GItem, IconWarn, IconX, Schedule, Subtitles, TitleCard, WaveIcon, motionBusy} from '../../engine/kit';
import {KineticHook, MythFact, VsCard, IntroFlash, TitleIntro} from '../../engine/kit2';
import {IconArrowUp, IconCoin} from '../../engine/ui';

const tl = makeTimeline({...(edlJson as Edl), words: captionsJson as Word[]}, 30);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  terendah: at('hook', 'terendah'),
  terbaik: at('hook', 'terbaik'),
  jawapan: S('jawapan'),
  tak: at('jawapan', 'tak'),
  ending: at('jawapan', 'ending-nya'),
  sebab: S('sebab'),
  analyze: at('sebab', 'analyze'),
  paralyzed: at('sebab', 'paralyzed'),
  sebab2: S('sebab2'),
  turun: at('sebab2', 'turun'),
  kg: S('1kg'),
  kg1: at('1kg', '1kg'),
  masih: at('1kg', 'masih'),
  fokus: S('fokus'),
  bukan: at('fokus', 'bukan'),
  tetapi: at('fokus', 'tetapi'),
  kaya: S('kaya'),
  tetapi2: at('kaya', 'tetapi'),
  miliki: at('kaya', 'miliki'),
  konsep: S('konsep'),
  duit: at('konsep', 'duit'),
  rm100: at('konsep', 'rm100'),
  purata: at('konsep', 'purata'),
  manfaat: at('konsep', 'manfaatkan'),
  kekayaan: at('konsep', 'kekayaan'),
  cta: S('cta'),
  biru: at('cta', 'biru'),
  pin: at('cta', 'pin'),
  rm100b: at('cta', 'rm100'),
};

const ITEMS: GItem[] = [
  {from: 0.0, to: E('hook') + 0.15, render: (d) => (
    <TitleIntro dur={d} tag="Nak daftar akaun emas?" line1="PATUT TUNGGU" line2="HARGA TERENDAH?" l2At={14} />
  )},
  {from: M.jawapan + 0.05, to: E('jawapan') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconX size={78} />} label="Jawapannya" title="TAK PERLU TUNGGU" size={60} gold={false} sub="yang tunggu → tak ada simpanan" subAt={r(M.ending)} />
  )},
  {from: M.sebab + 0.05, to: E('sebab') + 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconWarn size={80} />} label="Terlalu banyak analyze" title="ANALYSIS PARALYSIS" size={56} gold={false} sub="akhirnya tak ada simpanan" subAt={r(M.paralyzed) + 14} />
  )},
  {from: M.sebab2 + 0.05, to: E('sebab2') + 0.1, render: (d) => (
    <TitleCard dur={d} icon={<WaveIcon size={84} />} label="Dia cuma tengok" title="HARGA NAIK TURUN" size={60} gold={false} />
  )},
  {from: M.kg + 0.05, to: E('1kg') + 0.1, render: (d, r) => (
    <VsCard dur={d} a={{top: 'Orang lain', main: 'DAH ADA 1KG', at: r(M.kg1)}} b={{top: 'Dia', main: 'MASIH TUNGGU', at: r(M.masih)}} winner="a" winAt={r(M.masih) + 12} />
  )},
  {from: M.fokus + 0.05, to: E('fokus') + 0.15, render: (d, r) => (
    <MythFact dur={d} mythLabel="Fokus kita bukan" myth="NAIK TURUN HARGA" strikeAt={r(M.bukan) + 6} factLabel="Tapi" fact="BERAPA BANYAK SIMPANAN" factAt={r(M.tetapi)} />
  )},
  {from: M.kaya + 0.05, to: M.tetapi2 - 0.1, render: (d) => (
    <TitleCard dur={d} icon={<IconX size={74} />} label="Yang tentukan kita kaya bukan" title="HARGA EMAS" size={66} gold={false} />
  )},
  {from: M.tetapi2 - 0.1, to: E('kaya') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCoin size={88} />} label="Tapi" title="BERAPA GRAM ANDA MILIKI" size={52} shine />
  )},
  {from: M.konsep + 0.05, to: M.manfaat - 0.1, render: (d, r) => (
    <ChecklistCard dur={d} label="Faham konsep simpanan?" rows={[
      {text: 'Duit lebih 2–3 tahun', at: r(M.duit)},
      {text: 'Mula serendah RM100', at: r(M.rm100)},
      {text: 'Purata harga bila rendah', at: r(M.purata)},
    ]} />
  )},
  {from: M.manfaat - 0.1, to: E('konsep') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconArrowUp size={84} />} label="Manfaatkan emas untuk" title="BINA KEKAYAAN" size={70} shine />
  )},
  {from: M.cta, to: 9999, render: (d, r) => (
    <CtaCard dur={d} head="Nak mula simpanan pertama?" pin={r(M.pin)} guide={r(M.biru)} guideText="Isi BAG BIRU" final={r(M.rm100b) - 4} finalLabel="Mula serendah" finalTitle="RM100" />
  )},
];

const SFX: Sfx[] = [
  {t: 0.0, f: 'whoosh_impact', v: 0.45},
  {t: 0.1, f: 'tech_slide', v: 0.22},
  {t: 0.2, f: 'zoom_impact', v: 0.32},
  {t: 0.47, f: 'impact_deep', v: 0.26},
  {t: 0.7, f: 'sparkle', v: 0.22},
  {t: M.jawapan + 0.05, f: 'whoosh_pop', v: 0.34},
  {t: M.tak, f: 'buzzer', v: 0.13},
  {t: M.ending, f: 'pop_msg', v: 0.28},
  {t: M.sebab + 0.05, f: 'glitch_text', v: 0.16},
  {t: M.paralyzed, f: 'glitch_break', v: 0.2},
  {t: M.sebab2 + 0.05, f: 'whoosh_small', v: 0.26},
  {t: M.kg + 0.05, f: 'swoosh_fast', v: 0.3},
  {t: M.kg1, f: 'money_bag', v: 0.3},
  {t: M.masih, f: 'bubble_pop', v: 0.3},
  {t: M.fokus + 0.05, f: 'tech_slide', v: 0.3},
  {t: M.bukan + 0.2, f: 'swoosh_accent', v: 0.34},
  {t: M.tetapi, f: 'ding_correct', v: 0.26},
  {t: M.kaya + 0.05, f: 'whoosh_small', v: 0.26},
  {t: M.tetapi2 - 0.1, f: 'whoosh_cine', v: 0.3},
  {t: M.miliki, f: 'coin_win', v: 0.26},
  {t: M.konsep + 0.05, f: 'tech_slide', v: 0.3},
  {t: M.duit + 0.15, f: 'ui_click', v: 0.36},
  {t: M.rm100 + 0.15, f: 'ui_click', v: 0.36},
  {t: M.purata + 0.15, f: 'ui_click', v: 0.36},
  {t: M.manfaat - 0.1, f: 'whoosh_cine', v: 0.3},
  {t: M.kekayaan, f: 'sparkle', v: 0.24},
  {t: M.cta, f: 'whoosh_pop', v: 0.34},
  {t: M.biru, f: 'bell_notif', v: 0.22},
  {t: M.pin, f: 'pop_msg', v: 0.3},
  {t: M.rm100b - 0.13, f: 'coin_win', v: 0.28},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <IntroFlash />
    <Schedule items={ITEMS} total={tl.total} />
    <Subtitles words={captionsJson as Word[]} busy={motionBusy(ITEMS, SFX)} />
  </>
);

export const v15: VideoDef = {
  id: 'v15', tl, Overlays, sfx: SFX,
  punches: [M.terendah, M.tak, M.paralyzed, M.kg1, M.tetapi, M.miliki],
  zoom: {hook: [1.1], jawapan: [1.0], sebab: [1.07], sebab2: [1.0], '1kg': [1.06], fokus: [1.0], kaya: [1.0, 1.07], konsep: [1.0, 1.06], cta: [1.06, 1.0]},
  music: {file: 'mornings.mp3', startAt: 2},
  focus: {to: E('hook') + 0.15},
};
export const TungguHarga: React.FC<EditProps> = (p) => <Edit def={v15} {...p} />;
