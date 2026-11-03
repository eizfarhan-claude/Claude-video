import React from 'react';
import {Composition} from 'remotion';
import {Main, MainProps} from './Main';
import edl from './edl.json';
import {TAIL} from './timeline';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="GoldDinar"
    component={Main}
    width={1080}
    height={1920}
    fps={edl.fps}
    durationInFrames={edl.durationInFrames + TAIL}
    defaultProps={{preview: false, showSafeZones: false, hq: false} satisfies MainProps}
  />
);
