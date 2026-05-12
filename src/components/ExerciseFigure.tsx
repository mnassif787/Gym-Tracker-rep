import { ReactNode } from 'react';
import { tokens } from '../lib/tokens';

const _line = { stroke: 'currentColor', fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
const _bar = { stroke: 'currentColor', fill: 'none', strokeLinecap: 'round' as const };

const EXERCISE_ILLUS: Record<string, ReactNode> = {
  bench: (
    <svg viewBox="0 0 80 80">
      <rect x="14" y="50" width="52" height="6" rx="2" {..._bar} strokeWidth="2.5" />
      <line x1="20" y1="56" x2="20" y2="66" {..._bar} strokeWidth="2.5" />
      <line x1="60" y1="56" x2="60" y2="66" {..._bar} strokeWidth="2.5" />
      <line x1="22" y1="48" x2="56" y2="48" {..._line} strokeWidth="3.5" />
      <circle cx="60" cy="48" r="3.5" fill="currentColor" />
      <path d="M22 48 L18 56 L24 62" {..._line} strokeWidth="3" />
      <path d="M40 48 L40 36" {..._line} strokeWidth="3" />
      <path d="M50 48 L50 36" {..._line} strokeWidth="3" />
      <line x1="28" y1="34" x2="62" y2="34" {..._bar} strokeWidth="3" />
      <circle cx="28" cy="34" r="4" fill="currentColor" />
      <circle cx="62" cy="34" r="4" fill="currentColor" />
    </svg>
  ),

  ohp: (
    <svg viewBox="0 0 80 80">
      <circle cx="40" cy="22" r="4" fill="currentColor" />
      <line x1="40" y1="26" x2="40" y2="52" {..._line} strokeWidth="3.5" />
      <line x1="40" y1="52" x2="34" y2="68" {..._line} strokeWidth="3" />
      <line x1="40" y1="52" x2="46" y2="68" {..._line} strokeWidth="3" />
      <line x1="40" y1="30" x2="32" y2="14" {..._line} strokeWidth="3" />
      <line x1="40" y1="30" x2="48" y2="14" {..._line} strokeWidth="3" />
      <line x1="20" y1="12" x2="60" y2="12" {..._bar} strokeWidth="3" />
      <circle cx="20" cy="12" r="4" fill="currentColor" />
      <circle cx="60" cy="12" r="4" fill="currentColor" />
    </svg>
  ),

  squat: (
    <svg viewBox="0 0 80 80">
      <circle cx="40" cy="20" r="4" fill="currentColor" />
      <line x1="40" y1="24" x2="40" y2="42" {..._line} strokeWidth="3.5" />
      <line x1="20" y1="30" x2="60" y2="30" {..._bar} strokeWidth="3" />
      <circle cx="20" cy="30" r="4" fill="currentColor" />
      <circle cx="60" cy="30" r="4" fill="currentColor" />
      <line x1="40" y1="30" x2="30" y2="30" {..._line} strokeWidth="2.5" />
      <line x1="40" y1="30" x2="50" y2="30" {..._line} strokeWidth="2.5" />
      <path d="M40 42 L30 54 L34 66" {..._line} strokeWidth="3" />
      <path d="M40 42 L50 54 L46 66" {..._line} strokeWidth="3" />
    </svg>
  ),

  deadlift: (
    <svg viewBox="0 0 80 80">
      <circle cx="30" cy="22" r="4" fill="currentColor" />
      <line x1="30" y1="26" x2="50" y2="40" {..._line} strokeWidth="3.5" />
      <line x1="50" y1="40" x2="50" y2="60" {..._line} strokeWidth="3" />
      <line x1="50" y1="60" x2="44" y2="68" {..._line} strokeWidth="3" />
      <line x1="50" y1="60" x2="56" y2="68" {..._line} strokeWidth="3" />
      <line x1="38" y1="32" x2="38" y2="58" {..._line} strokeWidth="3" />
      <line x1="18" y1="60" x2="58" y2="60" {..._bar} strokeWidth="3" />
      <circle cx="18" cy="60" r="4" fill="currentColor" />
      <circle cx="58" cy="60" r="4" fill="currentColor" />
      <line x1="10" y1="68" x2="70" y2="68" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 4" />
    </svg>
  ),

  row: (
    <svg viewBox="0 0 80 80">
      <circle cx="22" cy="24" r="4" fill="currentColor" />
      <line x1="22" y1="28" x2="50" y2="38" {..._line} strokeWidth="3.5" />
      <line x1="50" y1="38" x2="50" y2="60" {..._line} strokeWidth="3" />
      <line x1="50" y1="60" x2="44" y2="68" {..._line} strokeWidth="3" />
      <line x1="50" y1="60" x2="56" y2="68" {..._line} strokeWidth="3" />
      <path d="M34 32 L42 44 L38 52" {..._line} strokeWidth="3" />
      <line x1="22" y1="50" x2="54" y2="50" {..._bar} strokeWidth="3" />
      <circle cx="22" cy="50" r="4" fill="currentColor" />
      <circle cx="54" cy="50" r="4" fill="currentColor" />
    </svg>
  ),

  pullup: (
    <svg viewBox="0 0 80 80">
      <line x1="14" y1="14" x2="66" y2="14" {..._bar} strokeWidth="3" />
      <line x1="32" y1="14" x2="38" y2="30" {..._line} strokeWidth="3" />
      <line x1="48" y1="14" x2="42" y2="30" {..._line} strokeWidth="3" />
      <circle cx="40" cy="34" r="4" fill="currentColor" />
      <line x1="40" y1="38" x2="40" y2="58" {..._line} strokeWidth="3.5" />
      <path d="M40 58 L34 70" {..._line} strokeWidth="3" />
      <path d="M40 58 L46 70" {..._line} strokeWidth="3" />
    </svg>
  ),

  dip: (
    <svg viewBox="0 0 80 80">
      <line x1="14" y1="40" x2="34" y2="40" {..._bar} strokeWidth="3" />
      <line x1="46" y1="40" x2="66" y2="40" {..._bar} strokeWidth="3" />
      <circle cx="40" cy="22" r="4" fill="currentColor" />
      <line x1="40" y1="26" x2="40" y2="50" {..._line} strokeWidth="3.5" />
      <line x1="40" y1="30" x2="28" y2="40" {..._line} strokeWidth="3" />
      <line x1="40" y1="30" x2="52" y2="40" {..._line} strokeWidth="3" />
      <path d="M40 50 L34 58 L40 64" {..._line} strokeWidth="3" />
      <path d="M40 50 L46 58 L52 56" {..._line} strokeWidth="3" />
    </svg>
  ),

  lateral: (
    <svg viewBox="0 0 80 80">
      <circle cx="40" cy="20" r="4" fill="currentColor" />
      <line x1="40" y1="24" x2="40" y2="50" {..._line} strokeWidth="3.5" />
      <line x1="40" y1="50" x2="34" y2="68" {..._line} strokeWidth="3" />
      <line x1="40" y1="50" x2="46" y2="68" {..._line} strokeWidth="3" />
      <line x1="40" y1="30" x2="18" y2="32" {..._line} strokeWidth="3" />
      <line x1="40" y1="30" x2="62" y2="32" {..._line} strokeWidth="3" />
      <rect x="10" y="28" width="10" height="8" rx="2" fill="currentColor" />
      <rect x="60" y="28" width="10" height="8" rx="2" fill="currentColor" />
    </svg>
  ),

  fly: (
    <svg viewBox="0 0 80 80">
      <circle cx="40" cy="20" r="4" fill="currentColor" />
      <line x1="40" y1="24" x2="40" y2="50" {..._line} strokeWidth="3.5" />
      <line x1="40" y1="50" x2="34" y2="68" {..._line} strokeWidth="3" />
      <line x1="40" y1="50" x2="46" y2="68" {..._line} strokeWidth="3" />
      <path d="M40 30 L30 36 L32 42" {..._line} strokeWidth="3" />
      <path d="M40 30 L50 36 L48 42" {..._line} strokeWidth="3" />
      <line x1="10" y1="20" x2="32" y2="42" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
      <line x1="70" y1="20" x2="48" y2="42" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
    </svg>
  ),

  curl: (
    <svg viewBox="0 0 80 80">
      <circle cx="40" cy="20" r="4" fill="currentColor" />
      <line x1="40" y1="24" x2="40" y2="50" {..._line} strokeWidth="3.5" />
      <line x1="40" y1="50" x2="34" y2="68" {..._line} strokeWidth="3" />
      <line x1="40" y1="50" x2="46" y2="68" {..._line} strokeWidth="3" />
      <path d="M40 30 L28 44 L34 32" {..._line} strokeWidth="3" />
      <path d="M40 30 L52 44 L46 32" {..._line} strokeWidth="3" />
      <rect x="28" y="28" width="10" height="8" rx="2" fill="currentColor" />
      <rect x="42" y="28" width="10" height="8" rx="2" fill="currentColor" />
    </svg>
  ),

  lunge: (
    <svg viewBox="0 0 80 80">
      <circle cx="38" cy="20" r="4" fill="currentColor" />
      <line x1="38" y1="24" x2="38" y2="46" {..._line} strokeWidth="3.5" />
      <path d="M38 46 L52 56 L52 68" {..._line} strokeWidth="3" />
      <path d="M38 46 L24 60 L18 66" {..._line} strokeWidth="3" />
      <line x1="38" y1="30" x2="32" y2="46" {..._line} strokeWidth="2.5" />
      <line x1="38" y1="30" x2="44" y2="46" {..._line} strokeWidth="2.5" />
    </svg>
  ),

  plank: (
    <svg viewBox="0 0 80 80">
      <line x1="20" y1="44" x2="60" y2="44" {..._line} strokeWidth="3.5" />
      <circle cx="64" cy="44" r="4" fill="currentColor" />
      <line x1="22" y1="44" x2="22" y2="60" {..._line} strokeWidth="3" />
      <line x1="14" y1="60" x2="28" y2="60" {..._line} strokeWidth="3" />
      <line x1="20" y1="44" x2="14" y2="60" {..._line} strokeWidth="2.5" strokeOpacity="0.55" />
      <line x1="18" y1="60" x2="6" y2="60" {..._line} strokeWidth="3" />
      <line x1="6" y1="68" x2="74" y2="68" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 4" />
    </svg>
  ),

  'leg-press': (
    <svg viewBox="0 0 80 80">
      <rect x="46" y="14" width="22" height="20" rx="3" {..._bar} strokeWidth="2.5" />
      <line x1="50" y1="18" x2="50" y2="30" {..._bar} strokeWidth="2" strokeOpacity="0.5" />
      <line x1="64" y1="18" x2="64" y2="30" {..._bar} strokeWidth="2" strokeOpacity="0.5" />
      <rect x="8" y="46" width="32" height="6" rx="2" {..._bar} strokeWidth="2.5" />
      <circle cx="14" cy="36" r="4" fill="currentColor" />
      <line x1="18" y1="40" x2="34" y2="44" {..._line} strokeWidth="3.5" />
      <path d="M34 44 L46 36 L46 28" {..._line} strokeWidth="3" />
    </svg>
  ),

  lat: (
    <svg viewBox="0 0 80 80">
      <line x1="14" y1="14" x2="66" y2="14" {..._bar} strokeWidth="3" />
      <circle cx="14" cy="14" r="3" fill="currentColor" />
      <circle cx="66" cy="14" r="3" fill="currentColor" />
      <line x1="30" y1="14" x2="34" y2="32" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
      <line x1="50" y1="14" x2="46" y2="32" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
      <line x1="40" y1="36" x2="34" y2="24" {..._line} strokeWidth="3" />
      <line x1="40" y1="36" x2="46" y2="24" {..._line} strokeWidth="3" />
      <circle cx="40" cy="40" r="4" fill="currentColor" />
      <line x1="40" y1="44" x2="40" y2="58" {..._line} strokeWidth="3.5" />
      <line x1="40" y1="58" x2="30" y2="60" {..._line} strokeWidth="3" />
      <line x1="30" y1="60" x2="30" y2="68" {..._line} strokeWidth="3" />
      <line x1="30" y1="60" x2="48" y2="60" {..._line} strokeWidth="3" />
    </svg>
  ),

  generic: (
    <svg viewBox="0 0 80 80">
      <circle cx="40" cy="22" r="4" fill="currentColor" />
      <line x1="40" y1="26" x2="40" y2="50" {..._line} strokeWidth="3.5" />
      <line x1="40" y1="50" x2="32" y2="68" {..._line} strokeWidth="3" />
      <line x1="40" y1="50" x2="48" y2="68" {..._line} strokeWidth="3" />
      <line x1="40" y1="32" x2="28" y2="42" {..._line} strokeWidth="3" />
      <line x1="40" y1="32" x2="52" y2="42" {..._line} strokeWidth="3" />
    </svg>
  ),
};

interface ExerciseFigureProps {
  id: string;
  size?: number;
  bg?: string;
  color?: string;
}

export function ExerciseFigure({ id, size = 96, bg, color }: ExerciseFigureProps) {
  const fig = EXERCISE_ILLUS[id] || EXERCISE_ILLUS.generic;
  
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: size * 0.28,
      background: bg || tokens.paper,
      color: color || tokens.ink,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}>
      <div style={{ width: size * 0.84, height: size * 0.84 }}>{fig}</div>
    </div>
  );
}