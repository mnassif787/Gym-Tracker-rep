import { useState, CSSProperties } from 'react';
import { tokens } from './lib/tokens';
import { Workout, makeWorkout, ReadyPlan } from './lib/data';
import { HomePage } from './pages/HomePage';
import { TemplatesPage, PlanDetail } from './pages/TemplatesPage';
import { ProgressPage } from './pages/ProgressPage';
import { ProfilePage } from './pages/ProfilePage';
import { LogPage } from './pages/LogPage';
import { TabBar } from './components/TabBar';
import { Icon } from './components/Icon';

type Route = 'home' | 'plans' | 'plan-detail' | 'progress' | 'profile' | 'log';

function App() {
  const [route, setRoute] = useState<Route>('home');
  const [plan, setPlan] = useState<ReadyPlan | null>(null);
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [unit, setUnit] = useState<'kg' | 'lb'>('kg');
  const [todayState, setTodayState] = useState<'planned' | 'rest' | 'none'>('planned');

  const go = (r: Route) => {
    if (r === 'log' && !workout) setWorkout(makeWorkout());
    setRoute(r);
    if (r !== 'plan-detail') setPlan(null);
  };

  const openPlan = (pl: ReadyPlan) => {
    setPlan(pl);
    setRoute('plan-detail');
  };

  const setWorkoutWrap = (updater: Workout | null | ((prev: Workout | null) => Workout | null)) => {
    setWorkout(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      if (next && next.sets && next.sets.every(arr => arr.every(s => s.done))) {
        return next;
      }
      return next;
    });
  };

  const inFocus = route === 'log';

  return (
    <div style={{
      width: 390,
      height: 844,
      borderRadius: 56,
      overflow: 'hidden',
      position: 'relative',
      background: tokens.cream,
      boxShadow: '0 40px 80px rgba(26,24,20,0.18), 0 0 0 12px #1A1814, 0 0 0 13px rgba(0,0,0,0.6)',
      fontFamily: 'Geist, system-ui',
      WebkitFontSmoothing: 'antialiased',
    }}>
      {/* Notch */}
      <div style={{
        position: 'absolute',
        top: 11,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 120,
        height: 35,
        borderRadius: 22,
        background: '#000',
        zIndex: 50,
      }} />

      {/* Status bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 25,
        height: 50,
        padding: '16px 28px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pointerEvents: 'none',
      }}>
        <span style={{
          fontFamily: '-apple-system, "SF Pro", system-ui',
          fontWeight: 590,
          fontSize: 16,
          color: tokens.ink,
        }}>
          9:41
        </span>
        <div style={{ width: 80 }} />
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', color: tokens.ink }}>
          <svg width="17" height="11" viewBox="0 0 17 11">
            <rect x="0" y="6" width="2.5" height="4" rx="0.5" fill="currentColor"/>
            <rect x="4.5" y="4" width="2.5" height="6" rx="0.5" fill="currentColor"/>
            <rect x="9" y="2" width="2.5" height="8" rx="0.5" fill="currentColor"/>
            <rect x="13.5" y="0" width="2.5" height="10" rx="0.5" fill="currentColor"/>
          </svg>
          <svg width="22" height="11" viewBox="0 0 22 11">
            <rect x="0.5" y="0.5" width="19" height="10" rx="2.5" stroke="currentColor" strokeOpacity="0.4" fill="none"/>
            <rect x="2" y="2" width="16" height="7" rx="1.5" fill="currentColor"/>
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div style={{
        height: '100%',
        background: tokens.cream,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div
          style={{
            height: '100%',
            overflowY: 'auto',
            paddingTop: 50,
            WebkitOverflowScrolling: 'touch',
          }}
          key={route + (plan?.id || '')}
        >
          {route === 'home' && <HomePage go={go} state={todayState} workoutActive={!!workout?.active} />}
          {route === 'log' && <LogPage go={(r) => {
            if (r === 'home' && workout && workout.sets.every(arr => arr.every(s => s.done))) {
              setWorkout(null);
            }
            go(r as Route);
          }} workout={workout} setWorkout={setWorkoutWrap} unit={unit} />}
          {route === 'plans' && <TemplatesPage go={go} openPlan={openPlan} />}
          {route === 'plan-detail' && <PlanDetail plan={plan} onBack={() => go('plans')} onStart={() => go('log')} />}
          {route === 'progress' && <ProgressPage unit={unit} />}
          {route === 'profile' && <ProfilePage unit={unit} />}
        </div>

        {!inFocus && workout?.active && (
          <ResumeBar workout={workout} onResume={() => go('log')} />
        )}
        {!inFocus && <TabBar active={route} go={go} />}
      </div>

      {/* Home indicator */}
      <div style={{
        position: 'absolute',
        bottom: 6,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 134,
        height: 5,
        borderRadius: 999,
        background: 'rgba(26,24,20,0.45)',
        zIndex: 80,
        pointerEvents: 'none',
      }} />
    </div>
  );
}

function ResumeBar({ workout, onResume }: { workout: Workout; onResume: () => void }) {
  if (!workout?.active) return null;
  const ex = workout.exercises[workout.exIdx];
  const done = workout.sets.flat().filter(s => s.done).length;
  const total = workout.sets.flat().length;

  return (
    <button
      onClick={onResume}
      style={{
        all: 'unset',
        cursor: 'pointer',
        position: 'absolute',
        left: 14,
        right: 14,
        bottom: 84,
        zIndex: 41,
        padding: '12px 16px',
        borderRadius: 18,
        background: tokens.ink,
        color: tokens.cream,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        boxShadow: '0 10px 26px rgba(26,24,20,0.22)',
      }}
    >
      <div style={{
        width: 38,
        height: 38,
        borderRadius: 12,
        background: 'rgba(244,239,230,0.1)',
        color: tokens.lime,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        {Icon.play}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: 'Geist Mono',
          fontSize: 10,
          letterSpacing: 0.6,
          color: 'rgba(244,239,230,0.6)',
          textTransform: 'uppercase',
          fontWeight: 500,
        }}>
          Workout in progress
        </div>
        <div style={{
          fontFamily: 'Geist',
          fontSize: 14,
          fontWeight: 540,
          marginTop: 1,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {ex.name} &middot; {done}/{total} sets
        </div>
      </div>
      <div style={{ color: tokens.lime }}>{Icon.arrow}</div>
    </button>
  );
}

export default App;