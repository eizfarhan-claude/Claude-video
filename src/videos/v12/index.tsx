/* v12 — 2 cara simpanan emas cepat bertambah: emas fizikal + auto debit */
import React from 'react';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {ChecklistCard, Choices, GItem, IconGrad, IconRepeat, IconWallet, Schedule, StepCard, Subtitles, TitleCard, motionBusy} from '../../engine/kit';
import {IconArrowUp, IconCheck, IconCoin, IconPin} from '../../engine/ui';

const tl = makeTimeline(edlJson as Edl, 30);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  hook: 0.05,
  bertambah: at('hook', 'bertambah'),
  guru: at('guru', 'guru'),
  jadi: at('guru', 'jadi'),
  save: at('guru', 'save'),
  fiz: S('fizikal'),
  keluarkan: at('fizikal', 'keluarkan'),
  konsisten: at('fizikal', 'konsisten'),
  keseronokan: at('fizikal', 'keseronokan'),
  beza: S('beza'),
  nombor: at('beza', 'nombor'),
  bila: at('beza', 'bila'),
  seronok: S('seronok'),
  motivasi: S('motivasi'),
  ad: S('autodebit'),
  auto: at('autodebit', 'auto'),
  decision: at('autodebit', 'decision'),
  gaji: at('gaji', 'gaji'),
  automatik: at('gaji', 'automatik'),
  cta: S('cta'),
  keluar2: at('cta', 'keluarkan'),
  setup: at('cta', 'set'),
  supaya: at('cta', 'supaya'),
};

const ITEMS: GItem[] = [
  {from: M.hook, to: E('hook') + 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconArrowUp size={84} />} label="Nak simpanan emas" title="CEPAT BERTAMBAH?" size={64} sub="ini caranya" subAt={r(M.bertambah)} shine />
  )},
  {from: M.guru - 0.2, to: M.jadi - 0.1, render: (d) => (
    <TitleCard dur={d} icon={<IconGrad size={80} />} label="Ilmu daripada" title="GURU EMAS SAYA" gold={false} size={58} />
  )},
  {from: M.jadi - 0.1, to: E('guru') + 0.1, render: (d, r) => (
    <TitleCard dur={d} icon={<IconPin size={74} />} label="Tengok sampai habis" title="SAVE VIDEO NI" size={62} sub="untuk rujukan akan datang" subAt={r(M.save)} />
  )},
  {from: M.fiz + 0.05, to: E('fizikal') + 0.1, render: (d, r) => (
    <StepCard dur={d} n={1} total={2} title="KELUARKAN EMAS FIZIKAL" sub="rasa seronok · konsisten menabung" subAt={r(M.konsisten)} icon={<IconCoin size={76} />} />
  )},
  {from: M.beza + 0.05, to: M.bila - 0.1, render: (d, r) => (
    <Choices dur={d} items={[
      {top: 'Dalam akaun', main: 'NOMBOR', sub: 'tak rasa apa-apa', at: r(M.nombor), bad: true},
      {top: 'Di tangan', main: 'EMAS FIZIKAL', sub: 'rasa seronok', at: r(M.beza + 0.3), good: true},
    ]} />
  )},
  {from: M.motivasi - 0.1, to: E('motivasi') + 0.1, render: (d) => (
    <TitleCard dur={d} icon={<IconArrowUp size={80} />} label="Keseronokan =" title="MOTIVASI MENABUNG" size={58} shine />
  )},
  {from: M.ad + 0.05, to: S('gaji') - 0.1, render: (d, r) => (
    <StepCard dur={d} n={2} total={2} title="SET AUTO DEBIT" sub="tak perlu decide setiap bulan" subAt={r(M.decision)} icon={<IconRepeat size={76} />} />
  )},
  {from: S('gaji') - 0.1, to: M.cta, render: (d, r) => (
    <TitleCard dur={d} icon={<IconWallet size={80} />} label="Setiap bulan, automatik" title="GAJI → EMAS" size={70} sub="dengan auto debit" subAt={r(M.automatik)} shine />
  )},
  {from: M.cta, to: M.supaya - 0.1, render: (d, r) => (
    <ChecklistCard dur={d} label="Buat kedua-duanya" rows={[
      {text: 'Keluarkan emas fizikal', at: r(M.keluar2)},
      {text: 'Set up auto debit', at: r(M.setup)},
    ]} />
  )},
  {from: M.supaya - 0.1, to: 9999, render: (d) => (
    <TitleCard dur={d} icon={<IconCheck size={80} />} label="Hasilnya" title="SIMPANAN CEPAT NAIK" size={54} sub="lebih seronok menabung emas" subAt={12} shine />
  )},
];

const SFX: Sfx[] = [
  {t: M.hook, f: 'whoosh_cine', v: 0.45},
  {t: M.hook + 0.05, f: 'impact_deep', v: 0.26},
  {t: M.bertambah, f: 'sparkle', v: 0.24},
  {t: M.guru - 0.2, f: 'whoosh_pop', v: 0.36},
  {t: M.jadi - 0.1, f: 'pop_hard', v: 0.3},
  {t: M.fiz + 0.05, f: 'whoosh_pop', v: 0.4},
  {t: M.keluarkan, f: 'coins', v: 0.32},
  {t: M.konsisten, f: 'click_select', v: 0.3},
  {t: M.beza + 0.05, f: 'whoosh_small', v: 0.28},
  {t: M.nombor, f: 'pop_msg', v: 0.32},
  {t: M.motivasi - 0.1, f: 'whoosh_cine', v: 0.3},
  {t: M.motivasi + 0.3, f: 'gold_prize', v: 0.2},
  {t: M.ad + 0.05, f: 'whoosh_pop', v: 0.4},
  {t: M.auto, f: 'atm_key', v: 0.34},
  {t: M.decision, f: 'click_select', v: 0.3},
  {t: S('gaji') - 0.1, f: 'whoosh_small', v: 0.28},
  {t: M.automatik, f: 'coins', v: 0.32},
  {t: M.cta, f: 'whoosh_small', v: 0.28},
  {t: M.keluar2 + 0.15, f: 'click_select', v: 0.36},
  {t: M.setup + 0.15, f: 'click_select', v: 0.36},
  {t: M.supaya - 0.1, f: 'ding_correct', v: 0.26},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <Schedule items={ITEMS} total={tl.total} />
    <Subtitles words={captionsJson as Word[]} busy={motionBusy(ITEMS, SFX)} />
  </>
);

export const v12: VideoDef = {
  id: 'v12', tl, Overlays, sfx: SFX,
  punches: [M.bertambah, M.fiz + 0.1, M.keseronokan, M.motivasi, M.ad + 0.1, M.automatik],
  zoom: {hook: [1.12], guru: [1.0], fizikal: [1.0, 1.06], beza: [1.06], seronok: [1.0], motivasi: [1.07], autodebit: [1.0, 1.06], gaji: [1.06], cta: [1.0, 1.06]},
  music: {file: 'bgm.mp3', startAt: 90},
};
export const DuaCara: React.FC<EditProps> = (p) => <Edit def={v12} {...p} />;
