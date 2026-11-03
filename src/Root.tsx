import React from 'react';
import {Composition} from 'remotion';
import {EditProps} from './engine/Edit';
import {GoldDinar, v1} from './videos/v1';

const defaults: EditProps = {preview: false, showSafeZones: false, hq: false};
const common = {width: 1080, height: 1920, fps: 30, defaultProps: defaults};

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="GoldDinar" component={GoldDinar} durationInFrames={v1.tl.total} {...common} />
  </>
);
