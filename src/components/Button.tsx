import { CSSProperties, ReactNode } from 'react';
import { tokens } from '../lib/tokens';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'lime' | 'peach' | 'ghost' | 'soft' | 'text';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  full?: boolean;
  style?: CSSProperties;
}

export function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  full, 
  style 
}: ButtonProps) {
  const base: CSSProperties = {
    fontFamily: 'Geist, system-ui, sans-serif',
    fontWeight: 540,
    fontSize: size === 'sm' ? 14 : 16,
    letterSpacing: -0.1,
    border: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: full ? '100%' : undefined,
    transition: 'transform 120ms ease, background 120ms ease',
    WebkitTapHighlightColor: 'transparent',
  };

  const sizes = {
    sm: { height: 36, padding: '0 14px', borderRadius: 12 },
    md: { height: 50, padding: '0 22px', borderRadius: 16 },
    lg: { height: 58, padding: '0 26px', borderRadius: 20 },
  };

  const variants = {
    primary: { background: tokens.ink, color: tokens.cream },
    lime:    { background: tokens.lime, color: tokens.limeInk, boxShadow: 'inset 0 -2px 0 rgba(0,0,0,0.06)' },
    peach:   { background: tokens.peach, color: tokens.peachInk },
    ghost:   { background: 'transparent', color: tokens.ink, boxShadow: `inset 0 0 0 1.5px ${tokens.hairline}` },
    soft:    { background: tokens.sand, color: tokens.ink2 },
    text:    { background: 'transparent', color: tokens.ink, padding: 0, height: 'auto' },
  };

  return (
    <button
      onClick={onClick}
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
      onPointerDown={(e) => (e.currentTarget.style.transform = 'scale(0.97)')}
      onPointerUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      onPointerLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {icon}
      {children}
    </button>
  );
}