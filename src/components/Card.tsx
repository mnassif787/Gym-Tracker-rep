import { CSSProperties, ReactNode } from 'react';
import { tokens } from '../lib/tokens';

interface CardProps {
  children: ReactNode;
  style?: CSSProperties;
  padding?: number;
  onClick?: () => void;
  accent?: string;
}

export function Card({ children, style, padding = 18, onClick, accent }: CardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: tokens.card,
        borderRadius: 22,
        padding,
        boxShadow: tokens.shadow,
        cursor: onClick ? 'pointer' : undefined,
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {accent && (
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 22,
          boxShadow: `inset 0 0 0 1.5px ${accent}`,
          pointerEvents: 'none',
        }} />
      )}
      {children}
    </div>
  );
}