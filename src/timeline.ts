import edl from './edl.json';
export const FPS = edl.fps;
export const TAIL = 18; // short hold after last word
export const sec = (s: number) => Math.round(s * FPS);
export type Word = {text: string; start: number; end: number; section: string};
export const words = edl.words as Word[];

/** output-time (seconds) of the n-th occurrence of a word inside a section */
export const at = (section: string, text: string, nth = 0): number => {
  const hits = words.filter((w) => w.section === section && w.text.toLowerCase().replace(/[.,?]+$/, '') === text.toLowerCase());
  if (!hits[nth]) throw new Error(`word not found: ${section}/${text}/${nth}`);
  return hits[nth].start;
};
export const sectionStart = (s: string) => words.find((w) => w.section === s)!.start;
export const sectionEnd = (s: string) => [...words].reverse().find((w) => w.section === s)!.end;
