import { tokens } from '../lib/tokens';
import { Icon } from './Icon';

interface TabBarProps {
  active: string;
  go: (route: any) => void;
}

export function TabBar({ active, go }: TabBarProps) {
  const tabs = [
    { id: 'home',     label: 'Today',    icon: Icon.home  },
    { id: 'plans',    label: 'Plans',    icon: Icon.plans },
    { id: 'progress', label: 'Progress', icon: Icon.progress  },
    { id: 'profile',  label: 'You',      icon: Icon.profile },
  ];

  return (
    <div style={{
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 40,
      paddingBottom: 22,
      paddingTop: 4,
      background: 'rgba(244,239,230,0.92)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderTop: `0.5px solid ${tokens.hairline}`,
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        padding: '4px 8px',
      }}>
        {tabs.map(t => {
          const sel = active === t.id || (t.id === 'plans' && active === 'plan-detail');
          return (
            <button
              key={t.id}
              onClick={() => go(t.id)}
              style={{
                all: 'unset',
                cursor: 'pointer',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                padding: '8px 0',
                color: sel ? tokens.ink : tokens.ink3,
              }}
            >
              <span style={{ opacity: sel ? 1 : 0.7 }}>{t.icon}</span>
              <span style={{
                fontFamily: 'Geist',
                fontSize: 10.5,
                fontWeight: sel ? 600 : 500,
                letterSpacing: 0.1,
              }}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}