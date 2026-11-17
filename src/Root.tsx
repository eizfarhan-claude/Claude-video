import React from 'react';
import {Composition, Still} from 'remotion';
import {Cover, COVERS} from './covers/Cover';
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
import {WajibMenabung, v11} from './videos/v11';
import {KonsepGap, v12} from './videos/v12';
import {TigaSituasi, v13} from './videos/v13';
import {WaktuTerbaik, v14} from './videos/v14';
import {TungguHarga, v15} from './videos/v15';
import {BayarDiri, v16} from './videos/v16';
import {KosHaji, v17} from './videos/v17';
import {LimaAngka, v18} from './videos/v18';
import {Jutawan, v19} from './videos/v19';
import {SatuJuta, v20} from './videos/v20';

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
    <Composition id="WajibMenabung" component={WajibMenabung} durationInFrames={v11.tl.total} {...common} />
    <Composition id="KonsepGap" component={KonsepGap} durationInFrames={v12.tl.total} {...common} />
    <Composition id="TigaSituasi" component={TigaSituasi} durationInFrames={v13.tl.total} {...common} />
    <Composition id="WaktuTerbaik" component={WaktuTerbaik} durationInFrames={v14.tl.total} {...common} />
    <Composition id="TungguHarga" component={TungguHarga} durationInFrames={v15.tl.total} {...common} />
    <Composition id="BayarDiri" component={BayarDiri} durationInFrames={v16.tl.total} {...common} />
    <Composition id="KosHaji" component={KosHaji} durationInFrames={v17.tl.total} {...common} />
    <Composition id="LimaAngka" component={LimaAngka} durationInFrames={v18.tl.total} {...common} />
    <Composition id="Jutawan" component={Jutawan} durationInFrames={v19.tl.total} {...common} />
    <Composition id="SatuJuta" component={SatuJuta} durationInFrames={v20.tl.total} {...common} />
    {Object.entries(COVERS).map(([id, c]) => (
      <React.Fragment key={id}>
        <Still id={`cover-tt-${id}`} component={Cover} width={1080} height={1920} defaultProps={c} />
        <Still id={`cover-ig-${id}`} component={Cover} width={1080} height={1350} defaultProps={c} />
      </React.Fragment>
    ))}
  </>
);
