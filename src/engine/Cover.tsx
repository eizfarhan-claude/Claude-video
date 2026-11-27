/* TikTok / Reels cover (still): one frame of the speaker + big hook text above the head and a pill on the chest.
   All text is centred on x = 540 and kept inside the 3:4 profile-grid crop (y ≈ 240–1680). */
import React from 'react';
import {AbsoluteFill, OffthreadVideo, staticFile} from 'remotion';
import {BAND_X, FONT, GOLD, GOLD_SOLID} from './theme';

export type CoverProps = {id: string; frame: number; kicker: string; title: string[]; pill: string; titleSize?: number};

const stroke: React.CSSProperties = {WebkitTextStroke: '14px rgba(0,0,0,0.95)', paintOrder: 'stroke fill'};

export const Cover: React.FC<CoverProps> = ({id, frame, kicker, title, pill, titleSize = 118}) => (
  <AbsoluteFill style={{backgroundColor: 'black', fontFamily: FONT}}>
    <AbsoluteFill style={{transform: 'scale(1.04)', transformOrigin: '50% 40%'}}>
      <OffthreadVideo src={staticFile(`${id}/source/video.mp4`)} startFrom={frame} muted style={{width: '100%', height: '100%'}} />
    </AbsoluteFill>
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 30%, rgba(0,0,0,0) 42%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.55) 85%, rgba(0,0,0,0.7) 100%)'}} />

    <div style={{position: 'absolute', left: BAND_X.left, width: BAND_X.width, top: 250, textAlign: 'center'}}>
      <div style={{display: 'inline-block', background: GOLD_SOLID, color: '#2a1a00', fontWeight: 900, fontSize: 44, padding: '8px 26px', borderRadius: 16, letterSpacing: 1, boxShadow: '0 8px 24px rgba(0,0,0,0.45)'}}>{kicker}</div>
      {title.map((line, i) => (
        <div key={i} style={{position: 'relative', fontWeight: 900, fontSize: titleSize, lineHeight: 1.02, marginTop: i ? 0 : 14, whiteSpace: 'nowrap'}}>
          <span style={{...stroke, color: 'transparent', position: 'absolute', left: 0, right: 0}}>{line}</span>
          <span style={{position: 'relative', background: i === title.length - 1 ? GOLD : 'linear-gradient(#fff,#fff)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent'}}>{line}</span>
        </div>
      ))}
    </div>

    <div style={{position: 'absolute', left: BAND_X.left, width: BAND_X.width, top: 1330, textAlign: 'center'}}>
      <div style={{display: 'inline-block', background: 'rgba(14,14,18,0.86)', border: `4px solid ${GOLD_SOLID}`, color: 'white', fontWeight: 900, fontSize: 50, padding: '14px 32px', borderRadius: 26, whiteSpace: 'nowrap', boxShadow: '0 10px 30px rgba(0,0,0,0.5)'}}>{pill}</div>
    </div>
  </AbsoluteFill>
);
