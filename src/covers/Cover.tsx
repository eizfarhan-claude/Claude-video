/* Cover / thumbnail for TikTok (1080x1920) and Instagram (1080x1350 grid crop).
   Face stays clear; title sits on the chest area, inside TikTok 3:4 and IG 4:5 grid crops. */
import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {FONT, FONT2, GOLD, GOLD_SOLID} from '../engine/theme';

export type CoverProps = {id: string; frame: number; tag: string; line1: string; line2: string; sub?: string};

export const Cover: React.FC<CoverProps> = ({id, frame, tag, line1, line2, sub}) => {
  // canvas is 1080 wide; height 1920 (TikTok) or 1350 (IG). The 1920 frame is centred vertically.
  return (
    <AbsoluteFill style={{background: 'black', overflow: 'hidden'}}>
      <CoverInner id={id} frame={frame} tag={tag} line1={line1} line2={line2} sub={sub} />
    </AbsoluteFill>
  );
};

const CoverInner: React.FC<CoverProps> = ({id, frame, tag, line1, line2, sub}) => {
  const fit = (t: string, max: number) => Math.min(max, Math.floor(980 / (0.72 * t.length)));
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <div style={{position: 'relative', width: 1080, height: 1920, flexShrink: 0}}>
        {/* exact still: public/covers/<id>.jpg = source frame `frame` (scripts/cover-frame.sh) */}
        <Img src={staticFile(`covers/${id}.jpg`)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}} />
        {/* bottom fade so the title pops; top kept light */}
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 58%, rgba(0,0,0,0.78) 74%, rgba(0,0,0,0.92) 100%)'}} />
        <div style={{position: 'absolute', left: 50, right: 50, top: 1250, textAlign: 'center'}}>
          <div style={{display: 'inline-block', background: GOLD_SOLID, color: '#2a1a00', borderRadius: 18, padding: '8px 26px', fontFamily: FONT2, fontWeight: 700, fontSize: 38, letterSpacing: 3, textTransform: 'uppercase', boxShadow: '0 8px 24px rgba(0,0,0,0.5)'}}>{tag}</div>
          <div style={{fontFamily: FONT, fontWeight: 900, fontSize: fit(line1, 112), lineHeight: 1.02, color: 'white', marginTop: 16, WebkitTextStroke: '6px rgba(0,0,0,0.9)', paintOrder: 'stroke fill', textShadow: '0 8px 24px rgba(0,0,0,0.7)', whiteSpace: 'nowrap'}}>{line1}</div>
          <div style={{fontFamily: FONT, fontWeight: 900, fontSize: fit(line2, 132), lineHeight: 1.02, backgroundImage: GOLD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', filter: 'drop-shadow(0 5px 0 rgba(90,55,0,0.95)) drop-shadow(0 14px 22px rgba(0,0,0,0.7))', whiteSpace: 'nowrap', letterSpacing: -1}}>{line2}</div>
          {sub && <div style={{fontFamily: FONT2, fontWeight: 700, fontSize: 36, color: 'rgba(255,255,255,0.92)', marginTop: 10}}>{sub}</div>}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const COVERS: Record<string, CoverProps> = {
  v11: {id: 'v11', frame: 192, tag: 'Akaun Emas GAP', line1: 'WAJIB MENABUNG', line2: 'SETIAP BULAN?', sub: 'Kalau ter-miss macam mana?'},
  v12: {id: 'v12', frame: 71, tag: 'Akaun Emas GAP', line1: 'KONSEP AKAUN GAP', line2: 'DALAM 30 SAAT', sub: 'Faham semua dalam satu video'},
  v13: {id: 'v13', frame: 234, tag: 'Penyimpan emas berilmu', line1: '3 SITUASI', line2: 'BOLEH JUAL EMAS', sub: 'Bukan sebab spekulasi harga'},
  v14: {id: 'v14', frame: 226, tag: 'Harga emas paras terendah', line1: 'WAKTU TERBAIK', line2: 'BELI EMAS?', sub: 'Jawapannya bukan apa yang anda sangka'},
  v15: {id: 'v15', frame: 197, tag: 'Nak daftar akaun emas?', line1: 'PATUT TUNGGU', line2: 'HARGA TERENDAH?', sub: 'Ramai yang tunggu, akhirnya tiada simpanan'},
  v16: {id: 'v16', frame: 72, tag: 'Gaji dah masuk', line1: 'SIAPA ANDA', line2: 'BAYAR DULU?', sub: 'Rahsia orang berjaya kewangan'},
  v17: {id: 'v17', frame: 1265, tag: 'Kos haji', line1: 'MAHAL DALAM RINGGIT', line2: 'MURAH DALAM EMAS', sub: '1998 vs hari ini'},
  v18: {id: 'v18', frame: 260, tag: '10 tahun lalu tak terfikir', line1: 'SIMPANAN 5 ANGKA', line2: 'DI USIA 20-AN', sub: 'Kisah sebenar penyimpan emas'},
  v19: {id: 'v19', frame: 227, tag: 'RM1 juta pada tahun 2006', line1: 'MASIH JUTAWAN', line2: 'PADA 2026?', sub: 'Tonton sampai habis'},
};
