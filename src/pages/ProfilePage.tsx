import { Wordmark } from '../components/Wordmark';
import { Icon } from '../components/Icon';
import { tokens } from '../lib/tokens';

interface ProfilePageProps {
  unit: 'kg' | 'lb';
}

export function ProfilePage({ unit }: ProfilePageProps) {
  return (
    <div style={{ paddingBottom: 100 }}>
      <div style={{ padding: '14px 22px 6px' }}>
        <Wordmark size={20} />
      </div>
      
      <div style={{ padding: '14px 22px 24px' }}>
        <div style={{
          width: 72,
          height: 72,
          borderRadius: 999,
          background: tokens.peach,
          color: tokens.peachInk,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: '"Bricolage Grotesque"',
          fontWeight: 600,
          fontSize: 30,
        }}>
          S
        </div>
        <h1 style={{
          fontFamily: '"Bricolage Grotesque"',
          fontSize: 30,
          fontWeight: 600,
          letterSpacing: -0.9,
          color: tokens.ink,
          margin: '14px 0 0',
        }}>
          Sam
        </h1>
        <div style={{
          fontFamily: 'Geist',
          fontSize: 14,
          color: tokens.ink3,
          marginTop: 4,
        }}>
          14 sessions &middot; 5-day streak &middot; lifts in {unit}
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {['Body stats', 'Active plan', 'Reminders', 'Units & display', 'Export data', 'About rep.'].map((label, i) => (
          <button
            key={label}
            style={{
              all: 'unset',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              padding: '16px 8px',
              borderTop: i === 0 ? 'none' : `1px solid ${tokens.hairline}`,
            }}
          >
            <span style={{
              flex: 1,
              fontFamily: 'Geist',
              fontSize: 16,
              fontWeight: 500,
              color: tokens.ink,
              letterSpacing: -0.2,
            }}>
              {label}
            </span>
            <span style={{ color: tokens.ink3 }}>{Icon.arrow}</span>
          </button>
        ))}
      </div>
    </div>
  );
}