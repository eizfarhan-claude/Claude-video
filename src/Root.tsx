import React from 'react';
import {Composition} from 'remotion';
import {EditProps} from './engine/Edit';
import {GoldDinar, v1} from './videos/v1';
import {Umrah, v2} from './videos/v2';
import {Kahwin, v3} from './videos/v3';
import {HargaEmas, v4} from './videos/v4';
import {GajiEmas, v5} from './videos/v5';
import {DuaPunca, v6} from './videos/v6';
import {Checkpoint, v7} from './videos/v7';
import {HargaJatuh, v8} from './videos/v8';
import {SatuGram, v9} from './videos/v9';
import {TigaRisiko, v10} from './videos/v10';
import {ZakatEmas, v11} from './videos/v11';
import {AsbThEmas, v12} from './videos/v12';
import {KesilapanBaru, v13} from './videos/v13';
import {TigaBank, v14} from './videos/v14';
import {NilaiRM10k, v15} from './videos/v15';
import {MurahBelumUntung, v17} from './videos/v17';
import {MurahTake2, v18} from './videos/v18';
import {WaktuTerbaik, v19} from './videos/v19';

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
    <Composition id="Checkpoint" component={Checkpoint} durationInFrames={v7.tl.total} {...common} />
    <Composition id="HargaJatuh" component={HargaJatuh} durationInFrames={v8.tl.total} {...common} />
    <Composition id="SatuGram" component={SatuGram} durationInFrames={v9.tl.total} {...common} />
    <Composition id="TigaRisiko" component={TigaRisiko} durationInFrames={v10.tl.total} {...common} />
    <Composition id="ZakatEmas" component={ZakatEmas} durationInFrames={v11.tl.total} {...common} />
    <Composition id="AsbThEmas" component={AsbThEmas} durationInFrames={v12.tl.total} {...common} />
    <Composition id="KesilapanBaru" component={KesilapanBaru} durationInFrames={v13.tl.total} {...common} />
    <Composition id="TigaBank" component={TigaBank} durationInFrames={v14.tl.total} {...common} />
    <Composition id="NilaiRM10k" component={NilaiRM10k} durationInFrames={v15.tl.total} {...common} />
    <Composition id="MurahBelumUntung" component={MurahBelumUntung} durationInFrames={v17.tl.total} {...common} />
    <Composition id="MurahTake2" component={MurahTake2} durationInFrames={v18.tl.total} {...common} />
    <Composition id="WaktuTerbaik" component={WaktuTerbaik} durationInFrames={v19.tl.total} {...common} />
  </>
);
