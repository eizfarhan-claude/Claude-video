import React from 'react';
import {Composition} from 'remotion';
import {EditProps} from './engine/Edit';
import {GoldDinar, v1} from './videos/v1';
import {Umrah, v2} from './videos/v2';
import {Kahwin, v3} from './videos/v3';
import {HargaEmas, v4} from './videos/v4';
import {GajiEmas, v5} from './videos/v5';
import {DuaPunca, v6} from './videos/v6';

const defaults: EditProps = {preview: false, showSafeZones: false, hq: false};
const common = {width: 1080, height: 1920, fps: 30, defaultProps: defaults};

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="GoldDinar" component={GoldDinar} durationInFrames={v1.tl.total} {...common} />
    <Composition id="Umrah" component={Umrah} durationInFrames={v2.tl.total} {...common} />
    <Composition id="Kahwin" component={Kahwin} durationInFrames={v3.tl.total} {...common} />
    <Composition id="HargaEmas" component={HargaEmas} durationInFrames={v4.tl.total} {...common} />
    <Composition id="GajiEmas" component={GajiEmas} durationInFrames={v5.tl.total} {...common} />
    <Composition id="DuaPunca" component={DuaPunca} durationInFrames={v6.tl.total} {...common} />
  </>
);
