import { Wordmark } from '../components/Wordmark';
import { Card } from '../components/Card';
import { ExerciseFigure } from '../components/ExerciseFigure';
import { tokens } from '../lib/tokens';
import { toDisplay, EXERCISES, PRS, WEEKLY_VOLUME } from '../lib/data';

interface ProgressPageProps {
  unit: 'kg' | 'lb';
}

export function ProgressPage({ unit }: ProgressPageProps) {
  const totalT = WEEKLY_VOLUME.reduce((s, d) => s + d.t, 0);

  return (
    <div style={{ paddingBottom: 100 }}>
      <div style={{ padding: '14px 22px 6px' }}>
        <Wordmark size={20} />
      </div>
      
      <div style={{ padding: '14px 22px 18px' }}>
        <h1 style={{
          fontFamily: '"Bricolage Grotesque", system-ui',
          fontSize: 34,
          fontWeight: 600,
          lineHeight: 1.05,
          letterSpacing: -1.0,
          color: tokens.ink,
          margin: 0,
        }}>
          Progress
        </h1>
        <div style={{
          fontFamily: 'Geist',
          fontSize: 14,
          color: tokens.ink3,
          marginTop: 6,
        }}>
          What you've moved, week by week.
        </div>
      </div>

      <div style={{ padding: '0 16px 18px' }}>
        <Card padding={20}>
          <div style={{
            fontFamily: 'Geist Mono, monospace',
            fontSize: 10.5,
            color: tokens.ink3,
            letterSpacing: 0.5,
            textTransform: 'uppercase',
            fontWeight: 500,
          }}>
            Weekly volume
          </div>
          <div style={{
            fontFamily: '"Bricolage Grotesque"',
            fontSize: 26,
            fontWeight: 600,
            color: tokens.ink,
            letterSpacing: -0.5,
            marginTop: 2,
          }}>
            {totalT}t total &middot; 8 weeks
          </div>
          <div style={{ marginTop: 18 }}>
            <VolumeChart data={WEEKLY_VOLUME} />
          </div>
        </Card>
      </div>

      <div style={{ padding: '4px 22px 8px' }}>
        <div style={{
          fontFamily: 'Geist Mono, monospace',
          fontSize: 10.5,
          color: tokens.ink3,
          letterSpacing: 0.6,
          textTransform: 'uppercase',
          fontWeight: 500,
        }}>
          Personal records
        </div>
      </div>
      
      <div style={{ padding: '0 16px' }}>
        {PRS.map((p, i) => {
          const ex = EXERCISES.find(e => e.id === p.id) || { name: p.id, id: p.id, group: 'chest' as const };
          const w = toDisplay(p.bestKg, unit);
          return (
            <div
              key={p.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '14px 8px',
                borderTop: i === 0 ? 'none' : `1px solid ${tokens.hairline}`,
              }}
            >
              <ExerciseFigure id={p.id} size={42} bg={tokens.paper} color={tokens.ink2} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: 'Geist',
                  fontSize: 15,
                  fontWeight: 540,
                  color: tokens.ink,
                  letterSpacing: -0.2,
                }}>
                  {ex.name}
                </div>
                <div style={{
                  fontFamily: 'Geist Mono, monospace',
                  fontSize: 11,
                  color: tokens.ink3,
                  marginTop: 2,
                }}>
                  {p.ago}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontFamily: '"Bricolage Grotesque"',
                  fontSize: 18,
                  fontWeight: 600,
                  color: tokens.ink,
                  letterSpacing: -0.3,
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {w} <span style={{ fontSize: 11, fontFamily: 'Geist Mono', color: tokens.ink3 }}>{unit}</span>
                </div>
                <div style={{
                  fontFamily: 'Geist Mono, monospace',
                  fontSize: 10.5,
                  color: tokens.ink3,
                  marginTop: 1,
                  letterSpacing: 0.3,
                }}>
                  {p.best.split('×')[1].trim()} reps
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function VolumeChart({ data }: { data: { wk: string; t: number }[] }) {
  const max = Math.max(...data.map(d => d.t));
  const H = 120;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-end',
      gap: 6,
      height: H + 24,
    }}>
      {data.map((d, i) => {
        const h = (d.t / max) * H;
        const isNow = i === data.length - 1;
        return (
          <div
            key={d.wk}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <div style={{
              width: '100%',
              height: h,
              borderRadius: 6,
              background: isNow ? tokens.lime : tokens.ink2,
              opacity: isNow ? 1 : 0.5 + (i / data.length) * 0.5,
            }} />
            <div style={{
              fontFamily: 'Geist Mono, monospace',
              fontSize: 9.5,
              color: isNow ? tokens.ink : tokens.ink3,
              letterSpacing: 0.3,
              fontWeight: isNow ? 600 : 400,
            }}>
              {d.wk}
            </div>
          </div>
        );
      })}
    </div>
  );
}