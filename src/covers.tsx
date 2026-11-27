/* Covers — Style B (owner's reference): big centred face, yellow kicker pill, white line + bigger gold line, white sub.
   TikTok 1080x1920 and Instagram 1080x1350 (4:5). Text is centred on x = 540.
   Face still: public/covers/<id>.png = exact source frame (ffmpeg select=eq(n,<frame>)). */
import React from 'react';
import {AbsoluteFill, Img, staticFile, Still} from 'remotion';
import {FONT, FONT2, GOLD} from './engine/theme';

export type CoverBProps = {id: string; frame: number; kicker: string; white: string; gold: string; sub: string; zoom?: number; shiftY?: number; ig?: boolean};

export const CoverB: React.FC<CoverBProps> = ({id, kicker, white, gold, sub, zoom = 1.18, shiftY = 40, ig = false}) => {
  const fit = (txt: string, max: number, k: number) => Math.min(max, Math.floor(980 / (k * txt.length)));
  // IG: the 1920 design viewed through a 1350-tall window, title block raised so it fits the 4:5 frame
  const offset = ig ? -300 : 0;
  const top = ig ? 1150 : 1245;
  return (
    <AbsoluteFill style={{background: '#0b0d12', overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: `translateY(${shiftY + offset - (ig ? 120 : 0)}px) scale(${zoom})`, transformOrigin: '50% 38%'}}>
        <Img src={staticFile(`covers/${id}.png`)} style={{width: 1080, height: 1920}} />
      </AbsoluteFill>
      <AbsoluteFill style={{background: `linear-gradient(180deg, rgba(5,6,10,0) 0%, rgba(5,6,10,0) ${ig ? 50 : 55}%, rgba(5,6,10,0.78) ${ig ? 63 : 66}%, rgba(5,6,10,0.93) ${ig ? 78 : 80}%, rgba(5,6,10,0.97) 100%)`}} />
      <div style={{position: 'absolute', left: 30, right: 30, top: top + offset, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{fontFamily: FONT, fontWeight: 800, fontSize: 40, letterSpacing: 3, color: '#1d1300', background: '#F5C84C', borderRadius: 16, padding: '10px 28px', textTransform: 'uppercase'}}>{kicker}</div>
        <div style={{marginTop: 26, fontFamily: FONT, fontWeight: 900, fontSize: fit(white, 118, 0.67), lineHeight: 1.0, letterSpacing: -1, whiteSpace: 'nowrap', color: 'white', textAlign: 'center', textShadow: '0 6px 18px rgba(0,0,0,0.6)'}}>{white}</div>
        <div style={{marginTop: 8, fontFamily: FONT, fontWeight: 900, fontSize: fit(gold, 140, 0.7), lineHeight: 1.0, letterSpacing: -1, whiteSpace: 'nowrap', textAlign: 'center',
          backgroundImage: GOLD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
          filter: 'drop-shadow(0 5px 0 rgba(90,55,0,0.9)) drop-shadow(0 12px 22px rgba(0,0,0,0.6))'}}>{gold}</div>
        <div style={{marginTop: 26, fontFamily: FONT2, fontWeight: 700, fontSize: 42, color: 'white', textAlign: 'center', textShadow: '0 4px 14px rgba(0,0,0,0.7)'}}>{sub}</div>
      </div>
    </AbsoluteFill>
  );
};

export const COVERS: Record<string, CoverBProps> = {
  v11: {id: 'v11', frame: 1332, kicker: 'Alang-alang simpan emas', white: 'BIAR SAMPAI', gold: 'JADI KAYA', sub: 'Rahsianya bukan harga, tapi volume'},
  v12: {id: 'v12', frame: 2208, kicker: 'Penyimpan emas', white: 'TUKAR SEMUA DUIT', gold: 'JADI EMAS?', sub: '3 strategi yang lebih tepat'},
  v13: {id: 'v13', frame: 552, kicker: 'Anak muda · plan kahwin', white: 'DANA KAHWIN', gold: '50 GRAM EMAS', sub: 'Siap dalam 5 tahun'},
  v14: {id: 'v14', frame: 612, kicker: 'Plan dana haji', white: 'DANA HAJI', gold: '50 GRAM EMAS', sub: 'Cara paling mudah dalam 5 tahun'},
  v21: {id: 'v21', frame: 540, kicker: 'Bila sebut tentang menabung', white: 'TAK SEMUA ORANG', gold: 'SUKA MENABUNG', sub: 'Tapi inilah cara bina kekayaan'},
  v22: {id: 'v22', frame: 300, kicker: 'Gaji besar atau kecil', white: 'NAK JADI KAYA?', gold: 'BINA SIMPANAN', sub: 'Kaya bukan sebab gaji besar'},
  v23: {id: 'v23', frame: 1260, kicker: 'Akaun Emas GAP', white: 'KONSISTEN MENABUNG', gold: '10 GRAM PERCUMA', sub: 'Senarai pemenang Okt 2026'},
};

export const CoverStills: React.FC = () => (
  <>
    {Object.entries(COVERS).flatMap(([k, p]) => [
      <Still key={`${k}tt`} id={`cover-tt-${k}`} component={CoverB} width={1080} height={1920} defaultProps={p} />,
      <Still key={`${k}ig`} id={`cover-ig-${k}`} component={CoverB} width={1080} height={1350} defaultProps={{...p, ig: true}} />,
    ])}
  </>
);
