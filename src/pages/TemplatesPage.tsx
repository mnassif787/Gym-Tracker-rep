import { Wordmark } from '../components/Wordmark';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { tokens } from '../lib/tokens';
import { READY_PLANS, ReadyPlan } from '../lib/data';

interface TemplatesPageProps {
  go: (route: any) => void;
  openPlan: (plan: ReadyPlan) => void;
}

export function TemplatesPage({ openPlan }: TemplatesPageProps) {
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
          Plans
        </h1>
        <div style={{
          fontFamily: 'Geist',
          fontSize: 14,
          color: tokens.ink3,
          marginTop: 6,
        }}>
          Pick one. Change anytime.
        </div>
      </div>

      {/* current plan */}
      <div style={{ padding: '0 16px 12px' }}>
        <button
          onClick={() => openPlan(READY_PLANS[0])}
          style={{
            all: 'unset',
            cursor: 'pointer',
            display: 'block',
            width: '100%',
            background: tokens.ink,
            color: tokens.cream,
            borderRadius: 22,
            padding: '18px 20px',
          }}
        >
          <div style={{
            fontFamily: 'Geist Mono, monospace',
            fontSize: 10.5,
            color: tokens.lime,
            letterSpacing: 0.5,
            textTransform: 'uppercase',
            fontWeight: 500,
          }}>
            Active &middot; week 3
          </div>
          <div style={{
            fontFamily: '"Bricolage Grotesque"',
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: -0.5,
            marginTop: 4,
          }}>
            {READY_PLANS[0].name}
          </div>
          <div style={{
            fontFamily: 'Geist',
            fontSize: 13,
            color: 'rgba(244,239,230,0.65)',
            marginTop: 2,
          }}>
            {READY_PLANS[0].days} days &middot; {READY_PLANS[0].level}
          </div>
        </button>
      </div>

      {/* others */}
      <div style={{ padding: '14px 22px 8px' }}>
        <div style={{
          fontFamily: 'Geist Mono, monospace',
          fontSize: 10.5,
          color: tokens.ink3,
          letterSpacing: 0.6,
          textTransform: 'uppercase',
          fontWeight: 500,
        }}>
          Other plans
        </div>
      </div>
      <div style={{
        padding: '0 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}>
        {READY_PLANS.slice(1).map((p, i) => (
          <button
            key={p.id}
            onClick={() => openPlan(p)}
            style={{
              all: 'unset',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '16px 8px',
              borderTop: i === 0 ? 'none' : `1px solid ${tokens.hairline}`,
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: '"Bricolage Grotesque"',
                fontSize: 18,
                fontWeight: 600,
                color: tokens.ink,
                letterSpacing: -0.3,
              }}>
                {p.name}
              </div>
              <div style={{
                fontFamily: 'Geist',
                fontSize: 12.5,
                color: tokens.ink3,
                marginTop: 2,
              }}>
                {p.days} days &middot; {p.level}
              </div>
            </div>
            <div style={{ color: tokens.ink3 }}>{Icon.arrow}</div>
          </button>
        ))}
      </div>

      {/* build my own */}
      <div style={{ padding: '24px 22px 0', textAlign: 'center' }}>
        <button style={{
          all: 'unset',
          cursor: 'pointer',
          fontFamily: 'Geist',
          fontSize: 14,
          color: tokens.ink3,
          fontWeight: 500,
          padding: 8,
        }}>
          + Build my own
        </button>
      </div>
    </div>
  );
}

interface PlanDetailProps {
  plan: ReadyPlan | null;
  onBack: () => void;
  onStart: () => void;
}

export function PlanDetail({ plan, onBack, onStart }: PlanDetailProps) {
  if (!plan) return null;

  const days = [
    { d: 'Mon', t: 'Push',  ex: 5 },
    { d: 'Tue', t: 'Pull',  ex: 5 },
    { d: 'Wed', t: 'Legs',  ex: 4 },
    { d: 'Thu', t: 'Push',  ex: 5 },
    { d: 'Fri', t: 'Pull',  ex: 5 },
    { d: 'Sat', t: 'Legs',  ex: 4 },
    { d: 'Sun', t: 'Rest',  ex: 0 },
  ];

  return (
    <div style={{ paddingBottom: 110, height: '100%' }}>
      <div style={{ padding: '10px 18px 8px' }}>
        <button
          onClick={onBack}
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
      </div>

      <div style={{ padding: '8px 22px 28px' }}>
        <h1 style={{
          fontFamily: '"Bricolage Grotesque"',
          fontSize: 36,
          fontWeight: 600,
          lineHeight: 1.02,
          letterSpacing: -1.1,
          color: tokens.ink,
          margin: 0,
        }}>
          {plan.name}
        </h1>
        <div style={{
          fontFamily: 'Geist',
          fontSize: 14,
          color: tokens.ink3,
          marginTop: 8,
        }}>
          {plan.days} days a week &middot; {plan.level}
        </div>
      </div>

      <div style={{
        padding: '0 22px 8px',
        fontFamily: 'Geist Mono, monospace',
        fontSize: 10.5,
        color: tokens.ink3,
        letterSpacing: 0.6,
        textTransform: 'uppercase',
        fontWeight: 500,
      }}>
        This week
      </div>
      <div style={{ padding: '0 16px' }}>
        {days.map((d, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '14px 8px',
              borderTop: i === 0 ? 'none' : `1px solid ${tokens.hairline}`,
              opacity: d.t === 'Rest' ? 0.5 : 1,
            }}
          >
            <div style={{
              fontFamily: 'Geist Mono',
              fontSize: 11,
              fontWeight: 500,
              color: tokens.ink3,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
              width: 36,
            }}>
              {d.d}
            </div>
            <div style={{
              flex: 1,
              fontFamily: 'Geist',
              fontSize: 16,
              fontWeight: 540,
              color: tokens.ink,
              letterSpacing: -0.2,
            }}>
              {d.t}
            </div>
            {d.ex > 0 && (
              <span style={{
                fontFamily: 'Geist Mono',
                fontSize: 11,
                color: tokens.ink3,
                letterSpacing: 0.3,
              }}>
                {d.ex} ex
              </span>
            )}
          </div>
        ))}
      </div>

      <div style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 84,
        padding: '16px 16px 0',
        background: `linear-gradient(to top, ${tokens.cream} 60%, rgba(244,239,230,0))`,
      }}>
        <Button variant="primary" size="lg" full onClick={onStart}>
          Use this plan
        </Button>
      </div>
    </div>
  );
}