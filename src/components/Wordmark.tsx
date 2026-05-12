
import { tokens } from '../lib/tokens';

interface WordmarkProps {
  size?: number;
  mono?: boolean;
}

export function Wordmark({ size = 22, mono = false }: WordmarkProps) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: '"Bricolage Grotesque", system-ui, sans-serif',
      fontWeight: 600,
      fontSize: size,
      letterSpacing: -0.6,
      color: mono ? tokens.ink : tokens.ink,
    }}>
      <div style={{
        width: size * 1.1,
        height: size * 1.1,
        borderRadius: size * 0.36,
        background: tokens.lime,
        position: 'relative',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width: size * 0.5,
          height: size * 0.18,
          borderRadius: size * 0.06,
          background: tokens.limeInk,
        }} />
      </div>
      <span>
        rep<span style={{ color: tokens.limeDeep }}>.</span>
      </span>
    </div>
  );
}