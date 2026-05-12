import { useState, useEffect, useRef, useReducer } from 'react';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { ExerciseFigure } from '../components/ExerciseFigure';
import { tokens } from '../lib/tokens';
import { Workout, toDisplay, fromDisplay, displayStep, platesFor, REST_DEFAULTS } from '../lib/data';
import { Haptic, chime, fmtTime } from '../lib/utils';

interface LogPageProps {
  go: (route: string) => void;
  workout: Workout | null;
  setWorkout: (w: Workout | ((prev: Workout | null) => Workout | null)) => void;
  unit: 'kg' | 'lb';
}

export function LogPage({ go, workout, setWorkout, unit }: LogPageProps) {
  if (!workout) {
    return (
      <div style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 22px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{
            fontFamily: '"Bricolage Grotesque"',
            fontSize: 26,
            fontWeight: 600,
            color: tokens.ink,
            margin: 0,
          }}>
            No workout started
          </h2>
          <Button
            variant="primary"
            size="md"
            onClick={() => go('home')}
            style={{ marginTop: 24 }}
          >
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  const { exIdx, setIdx, sets, exercises, startedAt, restUntil } = workout;
  const ex = exercises[exIdx];
  const cur = sets[exIdx][setIdx];
  const doneCount = sets[exIdx].filter(s => s.done).length;
  const lastEx = exIdx === exercises.length - 1;
  const lastSet = setIdx === ex.sets.length - 1;
  const allDone = sets.every(arr => arr.every(s => s.done));

  const [, force] = useReducer(x => x + 1, 0);
  useEffect(() => {
    const t = setInterval(force, 1000);
    return () => clearInterval(t);
  }, []);

  const wasResting = useRef(false);
  useEffect(() => {
    const resting = restUntil && Date.now() < restUntil;
    if (wasResting.current && !resting) {
      chime();
      Haptic.done();
    }
    wasResting.current = !!resting;
  });

  const time = Math.floor((Date.now() - startedAt) / 1000);
  const restLeft = restUntil ? Math.max(0, Math.ceil((restUntil - Date.now()) / 1000)) : 0;

  const updateSet = (patch: Partial<typeof cur>) => {
    setWorkout(w => {
      if (!w) return null;
      return {
        ...w,
        sets: w.sets.map((arr, i) => 
          i !== exIdx ? arr : arr.map((s, j) => j !== setIdx ? s : { ...s, ...patch })
        ),
      };
    });
  };

  const completeSet = () => {
    Haptic.tap();
    const restSec = REST_DEFAULTS[ex.id] || 90;
    setWorkout(w => {
      if (!w) return null;
      return {
        ...w,
        sets: w.sets.map((arr, i) => 
          i !== exIdx ? arr : arr.map((s, j) => j !== setIdx ? s : { ...s, done: true })
        ),
        restUntil: Date.now() + restSec * 1000,
      };
    });
    setTimeout(() => {
      setWorkout(w => {
        if (!w) return null;
        if (lastSet && lastEx) return w;
        if (lastSet) return { ...w, exIdx: w.exIdx + 1, setIdx: 0 };
        return { ...w, setIdx: w.setIdx + 1 };
      });
    }, 250);
  };

  const skipRest = () => setWorkout(w => w ? { ...w, restUntil: null } : null);

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: 16,
    }}>
      {/* header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 18px 8px',
      }}>
        <button
          onClick={() => go('home')}
          style={{
            all: 'unset',
            cursor: 'pointer',
            width: 38,
            height: 38,
            borderRadius: 12,
            color: tokens.ink2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {Icon.back}
        </button>
        <div style={{ flex: 1 }} />
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '7px 12px 7px 10px',
          borderRadius: 999,
          background: tokens.ink,
          color: tokens.cream,
        }}>
          <span style={{ color: tokens.lime, display: 'flex' }}>{Icon.timer}</span>
          <span style={{
            fontFamily: 'Geist Mono, monospace',
            fontSize: 13.5,
            fontWeight: 600,
            letterSpacing: 0.4,
            fontVariantNumeric: 'tabular-nums',
          }}>
            {fmtTime(time)}
          </span>
        </div>
      </div>

      {/* exercise progress */}
      <div style={{ padding: '4px 22px 10px' }}>
        <ExerciseProgress exercises={exercises} current={exIdx} />
        <div style={{ marginTop: 8 }}>
          <span style={{
            fontFamily: 'Geist Mono, monospace',
            fontSize: 10.5,
            color: tokens.ink3,
            letterSpacing: 0.5,
          }}>
            {String(exIdx + 1).padStart(2, '0')} / {String(exercises.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {allDone ? (
        <FinishView time={time} onFinish={() => go('home')} />
      ) : (
        <ActiveSet
          ex={ex}
          cur={cur}
          setIdx={setIdx}
          setCount={ex.sets.length}
          doneCount={doneCount}
          unit={unit}
          onWeight={(v) => updateSet({ weight: fromDisplay(v, unit) })}
          onReps={(v) => updateSet({ reps: v })}
          onComplete={completeSet}
          restLeft={restLeft}
          onSkipRest={skipRest}
        />
      )}
    </div>
  );
}

function ExerciseProgress({ exercises, current }: { exercises: any[]; current: number }) {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
      {exercises.map((ex, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: 3,
            borderRadius: 2,
            background: i < current ? tokens.limeDeep : i === current ? tokens.ink : tokens.hairline,
          }}
        />
      ))}
    </div>
  );
}

function ActiveSet({
  ex, cur, setIdx, setCount, doneCount, unit,
  onWeight, onReps, onComplete, restLeft, onSkipRest
}: any) {
  const displayW = toDisplay(cur.weight, unit);
  const step = displayStep(unit);

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: '0 22px',
    }}>
      <div style={{
        textAlign: 'center',
        padding: '0 0 6px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
      }}>
        <ExerciseFigure id={ex.id} size={86} bg={tokens.paper} color={tokens.ink} />
        <div>
          <div style={{
            fontFamily: 'Geist Mono, monospace',
            fontSize: 10,
            color: tokens.ink3,
            letterSpacing: 0.5,
            textTransform: 'uppercase',
            fontWeight: 500,
          }}>
            Now
          </div>
          <h1 style={{
            fontFamily: '"Bricolage Grotesque"',
            fontSize: 22,
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: -0.5,
            color: tokens.ink,
            margin: '2px 0 0',
          }}>
            {ex.name}
          </h1>
        </div>
      </div>

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        padding: '4px 0',
      }}>
        <div style={{
          fontFamily: 'Geist Mono, monospace',
          fontSize: 11,
          color: tokens.ink3,
          letterSpacing: 0.6,
          textTransform: 'uppercase',
          fontWeight: 500,
        }}>
          Set {setIdx + 1} of {setCount}
        </div>

        <SetDots count={setCount} current={setIdx} doneCount={doneCount} />

        <div style={{ display: 'flex', gap: 24, marginTop: 8 }}>
          <div>
            <div style={{
              fontFamily: 'Geist Mono, monospace',
              fontSize: 10,
              color: tokens.ink3,
              letterSpacing: 0.6,
              textTransform: 'uppercase',
              textAlign: 'center',
              fontWeight: 500,
              marginBottom: 8,
            }}>
              Weight
            </div>
            <Stepper value={displayW} step={step} onChange={onWeight} suffix={unit} />
          </div>

          <div>
            <div style={{
              fontFamily: 'Geist Mono, monospace',
              fontSize: 10,
              color: tokens.ink3,
              letterSpacing: 0.6,
              textTransform: 'uppercase',
              textAlign: 'center',
              fontWeight: 500,
              marginBottom: 8,
            }}>
              Reps
            </div>
            <Stepper value={cur.reps} step={1} onChange={onReps} />
          </div>
        </div>

        {restLeft > 0 && (
          <div style={{
            marginTop: 16,
            padding: '10px 18px',
            borderRadius: 14,
            background: tokens.sand,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <span style={{
              fontFamily: '"Bricolage Grotesque"',
              fontSize: 20,
              fontWeight: 600,
              color: tokens.ink,
            }}>
              {fmtTime(restLeft)}
            </span>
            <span style={{
              fontFamily: 'Geist',
              fontSize: 13,
              color: tokens.ink3,
            }}>
              rest
            </span>
            <button
              onClick={onSkipRest}
              style={{
                all: 'unset',
                cursor: 'pointer',
                marginLeft: 'auto',
                fontFamily: 'Geist',
                fontSize: 13,
                fontWeight: 540,
                color: tokens.ink2,
              }}
            >
              Skip
            </button>
          </div>
        )}
      </div>

      <div style={{ padding: '16px 0' }}>
        <Button variant="lime" size="lg" full onClick={onComplete}>
          Complete set
        </Button>
      </div>
    </div>
  );
}

function Stepper({ value, step, onChange, suffix }: any) {
  const dec = () => { onChange(Math.max(0, value - step)); Haptic.light(); };
  const inc = () => { onChange(value + step); Haptic.light(); };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <button
        onClick={dec}
        style={{
          all: 'unset',
          cursor: 'pointer',
          width: 44,
          height: 44,
          borderRadius: 14,
          background: tokens.sand,
          color: tokens.ink2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Geist',
          fontSize: 22,
          fontWeight: 500,
          flexShrink: 0,
        }}
      >
        −
      </button>
      <div style={{
        minWidth: 90,
        textAlign: 'center',
        fontFamily: '"Bricolage Grotesque"',
        fontSize: 56,
        fontWeight: 600,
        lineHeight: 1,
        letterSpacing: -1.5,
        color: tokens.ink,
        fontVariantNumeric: 'tabular-nums',
      }}>
        {value}
        {suffix && (
          <span style={{
            fontFamily: 'Geist Mono',
            fontSize: 14,
            fontWeight: 500,
            color: tokens.ink3,
            marginLeft: 4,
            letterSpacing: 0,
          }}>
            {suffix}
          </span>
        )}
      </div>
      <button
        onClick={inc}
        style={{
          all: 'unset',
          cursor: 'pointer',
          width: 44,
          height: 44,
          borderRadius: 14,
          background: tokens.sand,
          color: tokens.ink2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Geist',
          fontSize: 22,
          fontWeight: 500,
          flexShrink: 0,
        }}
      >
        +
      </button>
    </div>
  );
}

function SetDots({ count, current, doneCount }: any) {
  return (
    <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
      {Array.from({ length: count }).map((_, i) => {
        const done = i < doneCount;
        const here = i === current;
        return (
          <div
            key={i}
            style={{
              width: here ? 26 : 8,
              height: 8,
              borderRadius: 4,
              background: done ? tokens.limeDeep : here ? tokens.ink : tokens.hairline,
              transition: 'all 220ms cubic-bezier(0.2,0.8,0.2,1)',
            }}
          />
        );
      })}
    </div>
  );
}

function FinishView({ time, onFinish }: { time: number; onFinish: () => void }) {
  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 22px',
      textAlign: 'center',
    }}>
      <div style={{
        fontFamily: '"Bricolage Grotesque"',
        fontSize: 42,
        fontWeight: 600,
        color: tokens.ink,
        letterSpacing: -1.2,
        marginBottom: 8,
      }}>
        Done!
      </div>
      <div style={{
        fontFamily: 'Geist',
        fontSize: 16,
        color: tokens.ink3,
        marginBottom: 32,
      }}>
        Workout completed in {fmtTime(time)}
      </div>
      <Button variant="primary" size="lg" onClick={onFinish}>
        Finish Workout
      </Button>
    </div>
  );
}