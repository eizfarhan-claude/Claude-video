import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/800.css';
import '@fontsource/montserrat/900.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/700.css';

export const W = 1080;
export const H = 1920;
// Safe zones (1080x1920). TikTok: top ~160, bottom ~420, right ~140 (action rail).
// IG Reels: top ~220, bottom ~380. We use the stricter of both.
export const SAFE = {top: 230, bottom: 1920 - 440, left: 70, right: 1080 - 150};
// Face sits roughly y 500–1120 (head top to chin, incl. zoom) – graphics never go there.
export const TOP_BAND = {y: 232, h: 250}; // graphics zone above the head
export const CAPTION_Y = 1250;              // caption zone on the chest, above bottom UI
// lower graphics zone: on the chest, below the chin (even at max zoom) and above TikTok/IG bottom UI
export const BOTTOM_BAND = {y: 1195, h: 270};

export const GOLD = 'linear-gradient(180deg,#FFF1B8 0%,#F7D774 35%,#D9A93A 70%,#B07A1F 100%)';
export const GOLD_SOLID = '#F5C84C';
export const GREEN = '#2BD576';
export const INK = 'rgba(14,14,18,0.82)';
export const FONT = 'Montserrat, sans-serif';
export const FONT2 = 'Poppins, sans-serif';
