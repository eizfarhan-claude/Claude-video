import React from 'react';
import {AbsoluteFill, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame, Easing} from 'remotion';
import {at, sec, sectionEnd} from './timeline';

/** Full-frame B-roll cutaways (user-supplied clips). Voice keeps running underneath. */
type Cut = {file: string; from: number; to: number; srcStart: number};
export const BROLL: Cut[] = [
  // "5 dinar emas ni beratnya adalah 21.25 gram" -> certificate shows 21.25 g
  {file: 'broll/sand.mp4', from: at('weight', '5') - 0.05, to: sectionEnd('weight') + 0.1, srcStart: 0.6},
  // "boleh keluarkan 5 dinar emas seperti ini dan juga dapat miliki 5 dinar emas"
  {file: 'broll/coin.mp4', from: at('body', 'keluarkan') - 0.1, to: at('body', 'tengok') - 0.1, srcStart: 0.3},
  // CTA "sampai anda miliki 5 dinar emas yang pertama sebagai item fizikal"
  {file: 'broll/coin.mp4', from: at('cta', 'miliki') - 0.1, to: at('cta', 'simpanan', 1) + 0.2, srcStart: 9.3},
];

const Clip: React.FC<{c: Cut; dur: number; hq: boolean}> = ({c, dur, hq}) => {
  const f = useCurrentFrame();
  const opacity = interpolate(f, [0, 5, dur - 5, dur], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const scale = interpolate(f, [0, 6, dur], [1.18, 1.08, 1.0], {extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill style={{opacity}}>
      <AbsoluteFill style={{transform: `scale(${scale})`}}>
        <OffthreadVideo src={staticFile(hq ? c.file.replace('.mp4', '_4k.mp4') : c.file)} startFrom={sec(c.srcStart)} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const BRoll: React.FC<{hq: boolean}> = ({hq}) => (
  <AbsoluteFill>
    {BROLL.map((c, i) => {
      const from = sec(c.from);
      const dur = sec(c.to) - from;
      return (
        <Sequence key={i} from={from} durationInFrames={dur} layout="none">
          <Clip c={c} dur={dur} hq={hq} />
        </Sequence>
      );
    })}
  </AbsoluteFill>
);
