export const FPS = 30;
export const TAIL = 24; // short hold after last word
export const sec = (s: number) => Math.round(s * FPS);
export type Word = {text: string; start: number; end: number; section: string};
export type Clip = {section: string; srcFrom: number; durationInFrames: number; outFrom: number};
export type Edl = {fps: number; durationInFrames: number; clips: Clip[]; words: Word[]};

/** Word-anchored timing helpers for one video's EDL (all times = output seconds). */
export const makeTimeline = (edl: Edl) => {
  const words = edl.words;
  const norm = (t: string) => t.toLowerCase().replace(/[.,?!]+$/, '');
  /** start of the n-th occurrence of `text` inside `section` */
  const at = (section: string, text: string, nth = 0): number => {
    const hits = words.filter((w) => w.section === section && norm(w.text) === text.toLowerCase());
    if (!hits[nth]) throw new Error(`word not found: ${section}/${text}/${nth}`);
    return hits[nth].start;
  };
  const sectionStart = (s: string) => {
    const w = words.find((x) => x.section === s);
    if (!w) throw new Error(`section not found: ${s}`);
    return w.start;
  };
  const sectionEnd = (s: string) => {
    const w = [...words].reverse().find((x) => x.section === s);
    if (!w) throw new Error(`section not found: ${s}`);
    return w.end;
  };
  return {edl, words, at, sectionStart, sectionEnd, total: edl.durationInFrames + TAIL};
};
export type Timeline = ReturnType<typeof makeTimeline>;
