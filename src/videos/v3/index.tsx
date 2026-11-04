/* v3 — Kahwin tanpa hutang (4 keping 5 dinar) */
import React from 'react';
import {interpolate, useCurrentFrame, Easing} from 'remotion';
import edlJson from './edl.json';
import captionsJson from './captions.json';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {Edl, makeTimeline, Word} from '../../engine/timeline';
import {BRollTrack, Choices, CtaCard, GItem, IconGift, Schedule, StepCard, TitleCard, PhoneCut, Subtitles, busyTop, motionBusy} from '../../engine/kit';
import {Card, IconCheck, IconCoin, Label, TopBand, useEnvelope} from '../../engine/ui';
import {GOLD_SOLID} from '../../engine/theme';

const tl = makeTimeline(edlJson as Edl);
const {at, sectionStart: S, sectionEnd: E} = tl;

const M = {
  hook: 0.05,
  yes: at('hook', 'yes'),
  why: S('why'),
  hutang: at('why', 'hutang'),
  pinjaman: at('why', 'pinjaman'),
  parent: at('why', 'menyusahkan'),
  sponsor: at('why', 'sponsor'),
  s1: S('step1'),
  percuma: at('step1', 'percuma'),
  s2: S('step2'),
  g2125: at('step2', '21.25'),
  s3: S('step3'),
  d2: at('step3', 'kedua'),
  d3: at('step3', 'ketiga', 1),
  d4: at('step3', 'keempat'),
  result: at('step3', 'boleh'),
  sponsor2: at('step3', 'sponsor'),
  tag: S('tag'),
  ajak: at('tag', 'ajak'),
  cta: S('cta'),
  pin: at('cta', 'pin'),
  guide: at('cta', 'guide'),
  final: at('cta', '4'),
};

/** 4 dinar coins lighting up one by one */
const DinarCounter: React.FC<{dur: number; lit: number[]}> = ({dur, lit}) => {
  const {v} = useEnvelope(dur);
  const frame = useCurrentFrame();
  const count = lit.filter((f) => frame >= f).length;
  return (
    <TopBand v={v}>
      <Card style={{padding: '18px 30px', textAlign: 'center'}}>
        <Label size={24} color={GOLD_SOLID}>Ulang step sama · tambah simpanan</Label>
        <div style={{display: 'flex', gap: 22, justifyContent: 'center', marginTop: 10}}>
          {lit.map((f, i) => {
            const p = interpolate(frame - f, [0, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(2.2))});
            return (
              <div key={i} style={{opacity: 0.25 + 0.75 * p, transform: `scale(${0.8 + 0.2 * p})`, filter: p > 0.5 ? 'drop-shadow(0 0 16px rgba(245,200,76,0.8))' : 'grayscale(1)'}}>
                <IconCoin size={92} />
              </div>
            );
          })}
        </div>
        <div style={{fontWeight: 900, fontSize: 40, marginTop: 8}}>
          <span style={{color: GOLD_SOLID}}>{count}</span> / 4 keping 5 Dinar
        </div>
      </Card>
    </TopBand>
  );
};

const ITEMS: GItem[] = [
  {from: M.hook, to: E('hook') + 0.15, render: (d, r) => (
    <TitleCard dur={d} icon={<IconCoin size={92} />} label="4 keping × 5 Dinar emas" title="KAHWIN TANPA HUTANG" size={58} sub="Yes, tanpa sebarang hutang!" subAt={r(M.yes)} shine />
  )},
  {from: M.hutang - 0.2, to: M.sponsor - 0.1, render: (d, r) => (
    <Choices dur={d} items={[
      {top: 'Tanpa', main: 'Hutang', at: r(M.hutang), good: true},
      {top: 'Tanpa', main: 'Pinjaman', at: r(M.pinjaman), good: true},
      {top: 'Tak susahkan', main: 'Parent', at: r(M.parent), good: true},
    ]} />
  )},
  {from: M.sponsor - 0.1, to: E('why') + 0.25, render: (d) => (
    <TitleCard dur={d} icon={<IconCoin size={86} />} label="Sponsor simpanan sendiri" title="TARGET 4 × 5 DINAR" size={58} shine />
  )},
  {from: M.s1 + 0.05, to: E('step1') + 0.25, render: (d, r) => (
    <StepCard dur={d} n={1} total={3} title="Daftar akaun GAP" sub={<><IconCheck size={32} /> PERCUMA</>} subAt={r(M.percuma)} />
  )},
  {from: M.s2, to: E('step2') + 0.25, render: (d, r) => (
    <StepCard dur={d} n={2} total={3} title="Konsisten menabung" sub={<>sampai 21.25 g = 5 Dinar</>} subAt={r(M.g2125)} />
  )},
  {from: M.s3, to: M.d2 - 0.3, render: (d) => (
    <StepCard dur={d} n={3} total={3} title="Ulang step yang sama" />
  )},
  {from: M.d2 - 0.3, to: M.result - 0.1, render: (d, r) => (
    <DinarCounter dur={d} lit={[0, r(M.d2), r(M.d3), r(M.d4)]} />
  )},
  {from: M.result - 0.1, to: E('step3') + 0.3, render: (d, r) => (
    <TitleCard dur={d} icon={<IconGift size={90} />} label="Hasilnya" title="KAHWIN TANPA HUTANG" size={58} sub="sponsor majlis sendiri. Seronok tak?" subAt={r(M.sponsor2)} shine />
  )},
  {from: M.tag + 0.1, to: E('tag') + 0.25, render: (d, r) => (
    <TitleCard dur={d} label="Anak muda" title="TAG PASANGAN ANDA" gold={false} size={58} sub="menabung bersama ke majlis tanpa hutang" subAt={r(M.ajak)} />
  )},
  {from: M.cta + 0.1, to: 9999, render: (d, r) => (
    <CtaCard dur={d} head="Nak mula simpanan pertama?" pin={r(M.pin)} guide={r(M.guide)} final={r(M.final)} finalLabel="Kahwin tanpa hutang" finalTitle="4 KEPING 5 DINAR" />
  )},
];

const BROLL = [
  {file: 'shared/broll/goldhand.mp4', from: M.d2 - 0.3, to: M.result - 0.1, srcStart: 2.0},
  {file: 'v1/broll/sand.mp4', from: M.g2125 - 0.1, to: E('step2') + 0.1, srcStart: 0.6},
  {file: 'v1/broll/coin.mp4', from: M.final - 0.1, to: tl.total / 30, srcStart: 9.3},
];

const Overlays: React.FC<{hq: boolean}> = () => (
  <>
    <BRollTrack cuts={BROLL} />
    <PhoneCut src="shared/broll/gap_app.jpg" aspect={1163 / 2391} from={M.s1 + 0.4} to={E('step1') + 0.2} highlight={[0.400, 0.433]} highlightAt={M.percuma} />
    <Schedule items={ITEMS} total={tl.total} />
    <Subtitles words={captionsJson as Word[]} busy={motionBusy(ITEMS, SFX, [[M.s1 + 0.4, E('step1') + 0.2]])} />
  </>
);

const SFX: Sfx[] = [
  {t: M.s1 + 0.3, f: 'whoosh_small', v: 0.3},
  {t: M.hook, f: 'whoosh_cine', v: 0.45},
  {t: M.hook + 0.05, f: 'impact_deep', v: 0.25},
  {t: M.yes, f: 'ding_correct', v: 0.32},
  {t: M.hutang - 0.2, f: 'whoosh_small', v: 0.3},
  {t: M.hutang, f: 'pop_msg', v: 0.4},
  {t: M.pinjaman, f: 'pop_msg', v: 0.4},
  {t: M.parent, f: 'pop_msg', v: 0.4},
  {t: M.sponsor - 0.1, f: 'gold_prize', v: 0.38},
  {t: M.s1, f: 'pop_msg', v: 0.42},
  {t: M.percuma, f: 'click_select', v: 0.4},
  {t: M.s2, f: 'pop_msg', v: 0.42},
  {t: M.g2125 - 0.12, f: 'whoosh_small', v: 0.3},
  {t: M.g2125, f: 'sparkle', v: 0.3},
  {t: M.s3, f: 'pop_msg', v: 0.42},
  {t: M.d2, f: 'coins', v: 0.38},
  {t: M.d3, f: 'coins', v: 0.38},
  {t: M.d4, f: 'gold_prize', v: 0.4},
  {t: M.result - 0.1, f: 'whoosh_cine', v: 0.3},
  {t: M.sponsor2, f: 'ding_correct', v: 0.32},
  {t: M.tag, f: 'whoosh_small', v: 0.3},
  {t: M.ajak, f: 'pop_msg', v: 0.38},
  {t: M.cta, f: 'whoosh_small', v: 0.3},
  {t: M.pin, f: 'bell_notif', v: 0.32},
  {t: M.guide, f: 'pop_msg', v: 0.35},
  {t: M.final - 0.12, f: 'whoosh_small', v: 0.28},
  {t: M.final, f: 'gold_prize', v: 0.22},
];

export const v3: VideoDef = {
  id: 'v3',
  tl,
  Overlays,
  sfx: SFX,
  punches: [M.yes, M.parent, M.percuma, M.d4, M.sponsor2, M.pin],
  zoom: {hook: [1.1], why: [1.0, 1.07], step1: [1.06], step2: [1.0], step3: [1.07, 1.0], tag: [1.0, 1.07], cta: [1.0, 1.08]},
  music: {file: 'bgm.mp3', startAt: 140},
};

export const Kahwin: React.FC<EditProps> = (p) => <Edit def={v3} {...p} />;
