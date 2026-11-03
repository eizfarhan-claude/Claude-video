import React from 'react';
import {Edit, EditProps, Sfx, VideoDef} from '../../engine/Edit';
import {tl} from './timeline';
import {Graphics, MOMENTS as M} from './Graphics';
import {BRoll, BROLL} from './BRoll';

/* v1 — 5 Dinar Emas */
const SFX: Sfx[] = [
  {t: M.hookOpen, f: 'whoosh_cine', v: 0.45},
  {t: M.hookOpen + 0.05, f: 'impact_deep', v: 0.28},
  {t: M.rm8000, f: 'pop_hard', v: 0.35},
  {t: M.countStart, f: 'atm_key', v: 0.25},
  {t: M.rm11700 - 0.1, f: 'gold_prize', v: 0.4},
  {t: M.question - 0.12, f: 'whoosh_small', v: 0.3},
  {t: M.question + 0.05, f: 'pop_msg', v: 0.45},
  {t: M.gramReveal - 0.1, f: 'sparkle', v: 0.4},
  {t: M.gramReveal, f: 'impact_deep', v: 0.22},
  {t: M.cash - 0.05, f: 'money_bag', v: 0.42},
  {t: M.carry + 0.05, f: 'pop_hard', v: 0.4},
  {t: M.delivery - 0.1, f: 'whoosh_small', v: 0.3},
  {t: M.pay, f: 'click_select', v: 0.4},
  {t: M.ship, f: 'whoosh_pop', v: 0.5},
  {t: M.gap - 0.1, f: 'whoosh_pop', v: 0.45},
  {t: M.rm100, f: 'coins', v: 0.38},
  {t: M.bankCmp - 0.1, f: 'whoosh_small', v: 0.3},
  {t: M.bankRow, f: 'click_select', v: 0.4},
  {t: M.gapRow, f: 'coins', v: 0.35},
  {t: M.unlockCard - 0.1, f: 'whoosh_small', v: 0.3},
  {t: M.fill, f: 'sparkle', v: 0.22},
  {t: M.unlocked, f: 'ding_correct', v: 0.38},
  {t: M.budget - 0.1, f: 'whoosh_small', v: 0.3},
  {t: M.big, f: 'pop_msg', v: 0.42},
  {t: M.small, f: 'pop_msg', v: 0.42},
  {t: M.target - 0.1, f: 'whoosh_cine', v: 0.3},
  {t: M.targetAmt, f: 'money_bag', v: 0.35},
  {t: M.years, f: 'pop_hard', v: 0.35},
  {t: M.cta - 0.1, f: 'whoosh_small', v: 0.3},
  {t: M.pin, f: 'bell_notif', v: 0.32},
  {t: M.guide, f: 'pop_msg', v: 0.35},
  {t: M.final - 0.1, f: 'gold_prize', v: 0.4},
  ...BROLL.map((b) => ({t: b.from - 0.12, f: 'whoosh_small', v: 0.28})),
];

const Overlays: React.FC<{hq: boolean}> = ({hq}) => (
  <>
    <BRoll hq={hq} />
    <Graphics total={tl.total} />
  </>
);

export const v1: VideoDef = {
  id: 'v1',
  tl,
  Overlays,
  sfx: SFX,
  punches: [M.rm11700 - 0.3, M.gramReveal, M.carry, M.rm100, M.unlocked, M.targetAmt, M.pin],
  zoom: {hook: [1.12, 1.0], question: [1.0], weight: [1.1], body: [1.0, 1.07], target: [1.07, 1.0], cta: [1.0, 1.08]},
  music: {file: 'bgm.mp3', startAt: 4},
};

export const GoldDinar: React.FC<EditProps> = (p) => <Edit def={v1} {...p} />;
