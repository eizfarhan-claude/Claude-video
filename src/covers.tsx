/* Cover images for TikTok (1080x1920) and Instagram (1080x1440, 3:4 profile-grid native).
   Face from the edited source, bold gold/white title, all text kept inside the centre 3:4 area so the
   TikTok cover also survives the IG/TT profile-grid crop. Render: npm run covers */
import React from 'react';
import {AbsoluteFill, Img, staticFile, Still} from 'remotion';
import {FONT, FONT2, GOLD, GOLD_SOLID} from './engine/theme';

export type CoverProps = {
  id: string; t: number;              // video id + time (s) of the face frame (extracted to public/covers/<id>.png)
  kicker: string;                     // small pill above the title
  lines: {text: string; gold?: boolean}[];
  sub: string;                        // hook line under the title
  shiftY?: number;                    // move the face frame (px, + = down)
  ig?: boolean;
  img?: string;                       // optional extra image (e.g. infographic thumbnail)
};

const Title: React.FC<{text: string; gold?: boolean; size: number}> = ({text, gold, size}) => (
  <div style={{fontFamily: FONT, fontWeight: 900, fontSize: size, lineHeight: 1.0, letterSpacing: -1, textAlign: 'center',
    ...(gold
      ? {backgroundImage: GOLD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
         filter: 'drop-shadow(0 5px 0 rgba(90,55,0,0.95)) drop-shadow(0 14px 24px rgba(0,0,0,0.7))'}
      : {color: 'white', WebkitTextStroke: '3px rgba(0,0,0,0.35)', textShadow: '0 6px 0 rgba(0,0,0,0.55), 0 14px 30px rgba(0,0,0,0.7)'}),
  }}>{text}</div>
);

export const Cover: React.FC<CoverProps> = ({id, t, kicker, lines, sub, shiftY = 0, ig, img}) => {
  // fit the longest line into ~940px (Montserrat 900 ≈ 0.7em/glyph)
  const longest = Math.max(...lines.map((l) => l.text.length));
  const size = Math.min(ig ? 150 : 160, Math.floor(980 / (0.66 * longest)));
  const titleTop = ig ? 860 : 1060;
  return (
    <AbsoluteFill style={{background: '#0b0d12', overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: `translateY(${(ig ? -340 : 0) + shiftY}px) scale(${ig ? 1.0 : 1.04})`, transformOrigin: '50% 30%'}}>
        <Img src={staticFile(`covers/${id}.png`)} style={{width: 1080, height: 1920}} />
      </AbsoluteFill>
      {/* readability: soft top vignette + strong bottom fade behind the title */}
      <AbsoluteFill style={{background: `linear-gradient(180deg, rgba(5,6,10,0.55) 0%, rgba(5,6,10,0) 14%, rgba(5,6,10,0) ${ig ? 44 : 44}%, rgba(5,6,10,0.88) ${ig ? 64 : 62}%, rgba(5,6,10,0.97) 100%)`}} />
      {img && (
        <Img src={staticFile(img)} style={{position: 'absolute', right: ig ? 30 : 40, top: ig ? 40 : 270, width: ig ? 240 : 300, borderRadius: 22, border: `4px solid ${GOLD_SOLID}`, boxShadow: '0 20px 50px rgba(0,0,0,0.6)', transform: 'rotate(4deg)'}} />
      )}
      <div style={{position: 'absolute', left: 0, right: 0, top: titleTop - (ig ? 90 : 100), display: 'flex', justifyContent: 'center'}}>
        <div style={{fontFamily: FONT2, fontWeight: 700, fontSize: 34, letterSpacing: 4, color: '#2a1a00', background: GOLD, borderRadius: 40, padding: '10px 30px', textTransform: 'uppercase', boxShadow: '0 10px 30px rgba(0,0,0,0.5)'}}>{kicker}</div>
      </div>
      <div style={{position: 'absolute', left: 20, right: 20, top: titleTop, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6}}>
        {lines.map((l, i) => <Title key={i} text={l.text} gold={l.gold} size={size} />)}
        <div style={{marginTop: 22, fontFamily: FONT2, fontWeight: 700, fontSize: 44, color: 'white', background: 'rgba(214,52,40,0.95)', borderRadius: 18, padding: '10px 28px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.5)'}}>{sub}</div>
      </div>
    </AbsoluteFill>
  );
};

export const COVERS: Record<string, CoverProps> = {
  v11: {id: 'v11', t: 8.25, kicker: 'Panduan zakat', lines: [{text: 'EMAS PERHIASAN'}, {text: 'KENA ZAKAT?', gold: true}], sub: 'Semak kadar uruf negeri anda', img: 'shared/zakat_uruf.png'},
  v12: {id: 'v12', t: 3.5, kicker: 'Mana lebih baik?', lines: [{text: 'ASB · TABUNG HAJI'}, {text: 'ATAU EMAS?', gold: true}], sub: 'Jawapannya ikut 1 faktor ini'},
  v13: {id: 'v13', t: 3.25, kicker: 'Penyimpan emas baru', lines: [{text: 'KESILAPAN'}, {text: 'TERBESAR', gold: true}], sub: 'Nampak simple, tapi merugikan'},
  v14: {id: 'v14', t: 12.5, kicker: 'Gaji dah masuk?', lines: [{text: 'KAEDAH'}, {text: '3 BANK', gold: true}], sub: 'Simpan ikut matlamat'},
  v15: {id: 'v15', t: 3.75, kicker: 'Duit dalam bank', lines: [{text: 'RM10,000', gold: true}, {text: 'SELEPAS 10 TAHUN?'}], sub: 'Nombor sama, nilai mengecil'},
  v18: {id: 'v18', t: 2.5, kicker: 'Sebelum beli emas', lines: [{text: 'PALING MURAH'}, {text: 'BELUM TENTU UNTUNG', gold: true}], sub: 'Semak spread & beli balik'},
  v19: {id: 'v19', t: 3.75, kicker: 'Simpan emas', lines: [{text: 'BILA WAKTU'}, {text: 'TERBAIK?', gold: true}], sub: 'Bukan waktu harga turun!'},
};


/* Style B (user reference IMG_9059): big centred face, solid yellow kicker pill, white line + bigger gold line,
   plain white sub-line, dark fade only behind the text block. TikTok 1080x1920. */
export type CoverBProps = {id: string; kicker: string; white: string; gold: string; sub: string; zoom?: number; shiftY?: number};
export const CoverB: React.FC<CoverBProps> = ({id, kicker, white, gold, sub, zoom = 1.18, shiftY = 40}) => {
  const fit = (txt: string, max: number, k: number) => Math.min(max, Math.floor(980 / (k * txt.length)));
  return (
    <AbsoluteFill style={{background: '#0b0d12', overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: `translateY(${shiftY}px) scale(${zoom})`, transformOrigin: '50% 38%'}}>
        <Img src={staticFile(`covers/${id}.png`)} style={{width: 1080, height: 1920}} />
      </AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(5,6,10,0) 0%, rgba(5,6,10,0) 55%, rgba(5,6,10,0.78) 66%, rgba(5,6,10,0.93) 80%, rgba(5,6,10,0.97) 100%)'}} />
      <div style={{position: 'absolute', left: 30, right: 30, top: 1245, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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
export const COVERS_B: Record<string, CoverBProps> = {
  v12: {id: 'v12', kicker: 'Mana lebih baik?', white: 'ASB & TABUNG HAJI', gold: 'ATAU EMAS?', sub: 'Jawapannya ikut 1 faktor ini'},
  v14: {id: 'v14', kicker: 'Gaji dah masuk?', white: 'SIMPAN GUNA', gold: 'KAEDAH 3 BANK', sub: 'Kecemasan · Jangka pendek · Emas'},
  v11: {id: 'v11', kicker: 'Panduan zakat', white: 'EMAS PERHIASAN', gold: 'KENA ZAKAT?', sub: 'Semak kadar uruf negeri anda'},
  v13: {id: 'v13', kicker: 'Penyimpan emas baru', white: 'KESILAPAN', gold: 'PALING BESAR', sub: 'Nampak simple, tapi merugikan'},
  v15: {id: 'v15', kicker: 'Duit dalam bank', white: 'RM10,000 SELEPAS', gold: '10 TAHUN?', sub: 'Nombor sama, nilai mengecil'},
  v18: {id: 'v18', kicker: 'Sebelum beli emas', white: 'PALING MURAH', gold: 'BELUM TENTU UNTUNG', sub: 'Semak spread & jaminan beli balik'},
  v19: {id: 'v19', kicker: 'Simpan emas', white: 'BILA WAKTU', gold: 'TERBAIK?', sub: 'Bukan waktu harga turun!'},
};

export const CoverStills: React.FC = () => (
  <>
    {Object.entries(COVERS).flatMap(([k, p]) => [
      <Still key={`${k}tt`} id={`Cover-${k}-TT`} component={Cover} width={1080} height={1920} defaultProps={p} />,
      <Still key={`${k}ig`} id={`Cover-${k}-IG`} component={Cover} width={1080} height={1440} defaultProps={{...p, ig: true}} />,
    ])}
    {Object.entries(COVERS_B).map(([k, p]) => <Still key={`${k}b`} id={`CoverB-${k}-TT`} component={CoverB} width={1080} height={1920} defaultProps={p} />)}
  </>
);
