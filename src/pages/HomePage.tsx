import { Wordmark } from '../components/Wordmark';
import { Button } from '../components/Button';
import { tokens } from '../lib/tokens';

interface HomePageProps {
  go: (route: any) => void;
  state: 'planned' | 'rest' | 'none';
  workoutActive: boolean;
}

export function HomePage({ go, state, workoutActive }: HomePageProps) {
  return (
    <div style={{
      paddingBottom: workoutActive ? 170 : 100,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 22px 8px',
      }}>
        <Wordmark size={20} />
        <button
          onClick={() => go('profile')}
          style={{
            all: 'unset',
            cursor: 'pointer',
            width: 36,
            height: 36,
            borderRadius: 999,
            background: tokens.sand,
            color: tokens.ink2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: '"Bricolage Grotesque"',
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          S
        </button>
      </div>

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 22px',
      }}>
        {state === 'planned' && <PlannedToday go={go} />}
        {state === 'rest' && <RestToday go={go} />}
        {state === 'none' && <NoPlanToday go={go} />}
      </div>

      {state !== 'none' && (
        <div style={{
          padding: '0 22px 22px',
          fontFamily: 'Geist Mono, monospace',
          fontSize: 11,
          color: tokens.ink3,
          letterSpacing: 0.3,
          textAlign: 'center',
        }}>
          last lift &middot; tue may 5 &middot; 52 min
        </div>
      )}
    </div>
  );
}

function PlannedToday({ go }: { go: (route: any) => void }) {
  return (
    <>
      <div style={{
        fontFamily: 'Geist',
        fontSize: 13,
        color: tokens.ink3,
        letterSpacing: 0.3,
        textTransform: 'uppercase',
        fontWeight: 500,
      }}>
        Today
      </div>
      <h1 style={{
        fontFamily: '"Bricolage Grotesque", system-ui',
        fontSize: 44,
        fontWeight: 600,
        lineHeight: 1.02,
        letterSpacing: -1.3,
        color: tokens.ink,
        margin: '6px 0 0',
      }}>
        Push Day
      </h1>
      <div style={{
        fontFamily: 'Geist',
        fontSize: 15,
        color: tokens.ink2,
        marginTop: 12,
        lineHeight: 1.45,
      }}>
        5 exercises &middot; about 50 minutes
      </div>
      <div style={{ marginTop: 36 }}>
        <Button variant="primary" size="lg" full onClick={() => go('log')}>
          Begin
        </Button>
        <button
          onClick={() => go('plans')}
          style={{
            all: 'unset',
            cursor: 'pointer',
            display: 'block',
            width: '100%',
            textAlign: 'center',
            marginTop: 16,
            padding: 8,
            fontFamily: 'Geist',
            fontSize: 14,
            color: tokens.ink3,
            fontWeight: 500,
          }}
        >
          Pick a different plan
        </button>
      </div>
    </>
  );
}

function RestToday({ go }: { go: (route: any) => void }) {
  return (
    <>
      <div style={{
        fontFamily: 'Geist',
        fontSize: 13,
        color: tokens.ink3,
        letterSpacing: 0.3,
        textTransform: 'uppercase',
        fontWeight: 500,
      }}>
        Today
      </div>
      <h1 style={{
        fontFamily: '"Bricolage Grotesque", system-ui',
        fontSize: 44,
        fontWeight: 600,
        lineHeight: 1.02,
        letterSpacing: -1.3,
        color: tokens.ink,
        margin: '6px 0 0',
      }}>
        Rest day.
      </h1>
      <div style={{
        fontFamily: 'Geist',
        fontSize: 15,
        color: tokens.ink2,
        marginTop: 12,
        lineHeight: 1.45,
      }}>
        Walk, eat well, sleep. Pull day is tomorrow.
      </div>
      <div style={{ marginTop: 28, display: 'flex', gap: 10 }}>
        <Button variant="ghost" size="md" full onClick={() => go('log')}>
          Lift anyway
        </Button>
        <Button variant="ghost" size="md" full onClick={() => go('progress')}>
          See progress
        </Button>
      </div>
    </>
  );
}

function NoPlanToday({ go }: { go: (route: any) => void }) {
  return (
    <>
      <h1 style={{
        fontFamily: '"Bricolage Grotesque", system-ui',
        fontSize: 38,
        fontWeight: 600,
        lineHeight: 1.05,
        letterSpacing: -1.1,
        color: tokens.ink,
        margin: 0,
        textWrap: 'pretty' as any,
      }}>
        Pick a plan to get started.
      </h1>
      <div style={{
        fontFamily: 'Geist',
        fontSize: 15,
        color: tokens.ink2,
        marginTop: 12,
        lineHeight: 1.5,
      }}>
        Three or six days, gym or home — choose one and rep. lays out the week.
      </div>
      <div style={{ marginTop: 36 }}>
        <Button variant="primary" size="lg" full onClick={() => go('plans')}>
          Browse plans
        </Button>
        <button
          onClick={() => go('log')}
          style={{
            all: 'unset',
            cursor: 'pointer',
            display: 'block',
            width: '100%',
            textAlign: 'center',
            marginTop: 16,
            padding: 8,
            fontFamily: 'Geist',
            fontSize: 14,
            color: tokens.ink3,
            fontWeight: 500,
          }}
        >
          Just lift &mdash; freestyle session
        </button>
      </div>
    </>
  );
}