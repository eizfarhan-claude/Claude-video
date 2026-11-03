import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {words, Word} from './timeline';
import {CAPTION_Y, FONT, GOLD_SOLID, SAFE} from './theme';

// Group words into short "pages" (max 3 words / ~18 chars, break on punctuation or pauses)
type Page = {start: number; end: number; words: Word[]};
const pages: Page[] = [];
{
  let cur: Word[] = [];
  const flush = () => {
    if (cur.length) pages.push({start: cur[0].start, end: cur[cur.length - 1].end, words: cur});
    cur = [];
  };
  words.forEach((w, i) => {
    const prev = cur[cur.length - 1];
    const chars = cur.reduce((n, x) => n + x.text.length + 1, 0) + w.text.length;
    if (prev && (cur.length >= 3 || chars > 18 || w.start - prev.end > 0.35 || w.section !== prev.section)) flush();
    cur.push(w);
    if (/[.,?!]$/.test(w.text)) flush();
    if (i === words.length - 1) flush();
  });
  // each page stays until the next one starts (no flicker between pages)
  pages.forEach((p, i) => {
    const next = pages[i + 1];
    p.end = next ? Math.min(next.start, p.end + 0.6) : p.end + 0.6;
  });
}

const EMPHASIS = /^(rm[\d,]+|[\d.]+|emas|gram|dinar|gap|cash|carry|target|simpanan|bajet|2|3)$/i;
const clean = (t: string) => t.replace(/[.,?!]+$/, '').toUpperCase();

export const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const page = pages.find((p) => t >= p.start - 0.05 && t < p.end);
  if (!page) return null;
  const pf = Math.round((page.start - 0.05) * fps);
  const enter = spring({frame: frame - pf, fps, config: {damping: 15, stiffness: 220, mass: 0.5}});
  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          left: SAFE.left + 10,
          width: SAFE.right - SAFE.left - 20,
          top: CAPTION_Y,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          
          transform: `translateY(${(1 - enter) * 26}px) scale(${0.9 + 0.1 * enter})`,
          opacity: enter,
        }}
      >
        {page.words.map((w, i) => {
          const active = t >= w.start - 0.03 && t < (page.words[i + 1]?.start ?? page.end);
          const said = t >= w.start - 0.03;
          const wp = spring({frame: frame - Math.round(w.start * fps), fps, config: {damping: 10, stiffness: 260, mass: 0.4}});
          const emph = EMPHASIS.test(clean(w.text));
          return (
            <span
              key={i}
              style={{
                fontFamily: FONT,
                fontWeight: 900,
                fontSize: 84,
                lineHeight: 1.12,
                letterSpacing: -0.5,
                color: active && emph ? GOLD_SOLID : active ? '#FFFFFF' : said ? '#FFFFFF' : 'rgba(255,255,255,0.92)',
                WebkitTextStroke: '14px rgba(0,0,0,0.95)',
                paintOrder: 'stroke fill',
                textShadow: '0 8px 22px rgba(0,0,0,0.55)',
                display: 'inline-block',
                margin: '0 20px',
                transform: `scale(${active ? 1 + 0.12 * wp - 0.04 * Math.max(0, wp - 1) : 1})`,
                filter: active && emph ? 'drop-shadow(0 0 18px rgba(245,200,76,0.55))' : undefined,
              }}
            >
              {clean(w.text)}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
