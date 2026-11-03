import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {FONT, FONT2, GOLD, INK, SAFE, TOP_BAND} from './theme';

/** Enter/exit envelope for an overlay living inside a <Sequence>. */
export const useEnvelope = (duration: number, exitFrames = 8) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: {damping: 14, stiffness: 170, mass: 0.7}});
  const exit = interpolate(frame, [duration - exitFrames, duration], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });
  return {frame, fps, enter, exit, v: Math.min(enter, exit)};
};

/** Pops a child in at a local frame `at` (spring), returns 0..1 */
export const usePop = (at: number, damping = 12) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: frame - at, fps, config: {damping, stiffness: 200, mass: 0.6}});
};

/** Container centred in the top graphics band (above the head, inside safe zone). */
export const TopBand: React.FC<{children: React.ReactNode; v: number; y?: number}> = ({children, v, y = 0}) => (
  <div
    style={{
      position: 'absolute',
      left: SAFE.left,
      width: SAFE.right - SAFE.left,
      top: TOP_BAND.y + y,
      height: TOP_BAND.h,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: Math.min(1, v * 1.4),
      transform: `translateY(${(1 - v) * -40}px) scale(${0.85 + 0.15 * v})`,
    }}
  >
    {children}
  </div>
);

export const Card: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <div
    style={{
      background: INK,
      borderRadius: 34,
      padding: '22px 34px',
      border: '3px solid rgba(247,215,116,0.55)',
      boxShadow: '0 18px 50px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)',
      backdropFilter: 'blur(8px)',
      color: 'white',
      fontFamily: FONT,
      ...style,
    }}
  >
    {children}
  </div>
);

export const GoldText: React.FC<{children: React.ReactNode; size: number; style?: React.CSSProperties}> = ({children, size, style}) => (
  <span
    style={{
      fontFamily: FONT,
      fontWeight: 900,
      fontSize: size,
      lineHeight: 1,
      backgroundImage: GOLD,
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
      filter: 'drop-shadow(0 4px 0 rgba(90,55,0,0.9)) drop-shadow(0 10px 18px rgba(0,0,0,0.5))',
      letterSpacing: -1,
      ...style,
    }}
  >
    {children}
  </span>
);

export const Label: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({
  children,
  size = 30,
  color = 'rgba(255,255,255,0.78)',
  style,
}) => (
  <div style={{fontFamily: FONT2, fontWeight: 700, fontSize: size, color, letterSpacing: 2, textTransform: 'uppercase', ...style}}>
    {children}
  </div>
);

/** diagonal light sweep for metallic text/cards */
export const Shine: React.FC<{progress: number}> = ({progress}) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      background: `linear-gradient(105deg, transparent ${progress * 140 - 40}%, rgba(255,255,255,0.55) ${progress * 140 - 25}%, transparent ${progress * 140 - 10}%)`,
      mixBlendMode: 'overlay',
      pointerEvents: 'none',
      borderRadius: 'inherit',
    }}
  />
);

/* ---------------- icons (simple inline SVG so no emoji font is needed) ---------------- */
type IP = {size?: number; color?: string};
export const IconCoin: React.FC<IP> = ({size = 64}) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <defs>
      <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFF1B8" />
        <stop offset="0.5" stopColor="#F2C14E" />
        <stop offset="1" stopColor="#B07A1F" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="29" fill="url(#cg)" stroke="#8a5a10" strokeWidth="2" />
    <circle cx="32" cy="32" r="21" fill="none" stroke="#8a5a10" strokeWidth="2.5" opacity="0.7" />
    <text x="32" y="40" textAnchor="middle" fontFamily="Montserrat" fontWeight="900" fontSize="22" fill="#7a4d0a">
      Au
    </text>
  </svg>
);
export const IconBank: React.FC<IP> = ({size = 64, color = 'white'}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill={color}>
    <path d="M32 6 L60 20 L4 20 Z" />
    <rect x="8" y="24" width="7" height="24" rx="1" />
    <rect x="21" y="24" width="7" height="24" rx="1" />
    <rect x="36" y="24" width="7" height="24" rx="1" />
    <rect x="49" y="24" width="7" height="24" rx="1" />
    <rect x="4" y="52" width="56" height="7" rx="2" />
  </svg>
);
export const IconCard: React.FC<IP> = ({size = 64, color = 'white'}) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <rect x="4" y="12" width="56" height="40" rx="7" fill="none" stroke={color} strokeWidth="5" />
    <rect x="4" y="22" width="56" height="8" fill={color} />
    <rect x="12" y="40" width="16" height="5" rx="2" fill={color} />
  </svg>
);
export const IconTruck: React.FC<IP> = ({size = 64, color = 'white'}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill={color}>
    <rect x="2" y="14" width="36" height="28" rx="4" />
    <path d="M40 22 h12 l10 12 v8 h-22 z" />
    <circle cx="14" cy="46" r="7" stroke="#111" strokeWidth="3" />
    <circle cx="50" cy="46" r="7" stroke="#111" strokeWidth="3" />
  </svg>
);
export const IconTarget: React.FC<IP> = ({size = 64}) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="28" fill="#E5484D" />
    <circle cx="32" cy="32" r="20" fill="white" />
    <circle cx="32" cy="32" r="12" fill="#E5484D" />
    <circle cx="32" cy="32" r="5" fill="white" />
  </svg>
);
export const IconClock: React.FC<IP> = ({size = 64, color = 'white'}) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="27" fill="none" stroke={color} strokeWidth="5" />
    <path d="M32 16 V32 L43 39" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" />
  </svg>
);
export const IconCheck: React.FC<IP> = ({size = 64, color = '#2BD576'}) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="29" fill={color} />
    <path d="M18 33 L28 43 L47 22" stroke="white" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const IconPin: React.FC<IP> = ({size = 64, color = 'white'}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill={color}>
    <path d="M22 6 h20 l-3 6 v14 l9 10 v4 H16 v-4 l9-10 V12 z" />
    <rect x="30" y="40" width="4" height="20" rx="2" />
  </svg>
);
export const IconArrowUp: React.FC<IP> = ({size = 64, color = '#2BD576'}) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <path d="M32 6 L56 32 H41 V58 H23 V32 H8 Z" fill={color} />
  </svg>
);
