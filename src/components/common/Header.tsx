import React from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { Search, Bell, Sparkles, Building2, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onSearchClick: () => void;
  onAssistantToggle: () => void;
  sidebarCollapsed: boolean;
}

const VIEW_META: Record<string, { title: string; subtitle: string }> = {
  dashboard:  { title: 'Executive Overview',         subtitle: 'Live operational intelligence across all systems' },
  decision:   { title: 'Decision Center',            subtitle: 'AI-prioritized actions ranked by business impact' },
  inventory:  { title: 'Inventory Intelligence',     subtitle: 'Real-time stock levels, waste tracking & supplier SLAs' },
  kitchen:    { title: 'Kitchen Velocity',           subtitle: 'Prep times, station load & KDS dispatch pipeline' },
  delivery:   { title: 'Delivery Analytics',        subtitle: 'Zone-level ETA tracking & rider performance' },
  menu:       { title: 'Menu Analytics',            subtitle: 'Item-level margins, COGS & recipe profitability' },
  customer:   { title: 'Customer Sentiment',        subtitle: 'Live review signals, NPS & loyalty index' },
  predictive: { title: 'Predictive Risk Engine',    subtitle: 'ML-powered demand forecasting & threat modeling' },
  simulator:  { title: 'Operational Simulator',     subtitle: 'Scenario modeling with real-time P&L projections' },
  reports:    { title: 'Executive Reports',         subtitle: 'AI-generated board-level performance summaries' },
  settings:   { title: 'System Settings',           subtitle: 'Integrations, branches & configuration' },
};

const BRANCHES = [
  'Downtown Hub (HQ)',
  'Westside Bistro',
  'Metro Food Court',
  'Eastside Cloud Kitchen',
];

export const Header: React.FC<HeaderProps> = ({ onSearchClick, onAssistantToggle }) => {
  const { activeView, activeBranch, setActiveBranch, alerts } = useRestaurant();
  const unresolvedCount = alerts.filter(a => !a.resolved && a.severity !== 'info').length;
  const meta = VIEW_META[activeView] ?? { title: 'FlowLens AI', subtitle: '' };

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <header style={{
      height: '60px',
      borderBottom: '1px solid var(--border-0)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      background: 'rgba(4,4,4,0.80)',
      backdropFilter: 'blur(40px) saturate(160%)',
      WebkitBackdropFilter: 'blur(40px) saturate(160%)',
      flexShrink: 0,
      gap: '16px',
    }}>
      {/* Left: Title block */}
      <div style={{ minWidth: 0, flex: '0 1 auto' }}>
        <h1 style={{
          fontSize: '15px',
          fontWeight: '650',
          color: 'var(--text-1)',
          letterSpacing: '-0.025em',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {meta.title}
        </h1>
        <p style={{
          fontSize: '11px',
          color: 'var(--text-3)',
          marginTop: '1px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {meta.subtitle}
        </p>
      </div>

      {/* Center: Search + Branch */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: '1 1 auto', justifyContent: 'center', maxWidth: '520px' }}>
        {/* Search trigger */}
        <button
          onClick={onSearchClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.035)',
            border: '1px solid var(--border-1)',
            borderRadius: '8px',
            padding: '7px 12px',
            color: 'var(--text-3)',
            fontSize: '12px',
            cursor: 'pointer',
            flex: 1,
            maxWidth: '240px',
            transition: 'all var(--t-fast)',
            textAlign: 'left',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
            e.currentTarget.style.borderColor = 'var(--border-2)';
            e.currentTarget.style.color = 'var(--text-2)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.035)';
            e.currentTarget.style.borderColor = 'var(--border-1)';
            e.currentTarget.style.color = 'var(--text-3)';
          }}
        >
          <Search size={13} />
          <span style={{ flex: 1 }}>Search or jump to...</span>
          <kbd>⌘K</kbd>
        </button>

        {/* Branch selector */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(255,255,255,0.035)',
          border: '1px solid var(--border-1)',
          borderRadius: '8px',
          padding: '6px 10px',
          fontSize: '12px',
          position: 'relative',
        }}>
          <Building2 size={12} style={{ color: 'var(--text-3)', flexShrink: 0 }} />
          <select
            value={activeBranch}
            onChange={e => setActiveBranch(e.target.value)}
            style={{
              cursor: 'pointer',
              color: 'var(--text-1)',
              fontWeight: '550',
              fontSize: '12px',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              appearance: 'none',
              WebkitAppearance: 'none',
              paddingRight: '16px',
              maxWidth: '130px',
            }}
          >
            {BRANCHES.map(b => (
              <option key={b} value={b} style={{ background: '#111', color: '#fff' }}>{b}</option>
            ))}
          </select>
          <ChevronDown size={10} style={{ color: 'var(--text-3)', position: 'absolute', right: '10px', pointerEvents: 'none' }} />
        </div>
      </div>

      {/* Right: Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        {/* Date/time */}
        <div style={{
          fontSize: '11px',
          color: 'var(--text-3)',
          textAlign: 'right',
          lineHeight: 1.4,
          fontFamily: 'var(--font-mono)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}>
          <span style={{ color: 'var(--text-2)', fontWeight: '500' }}>{timeStr}</span>
          <span>{dateStr}</span>
        </div>

        <div style={{ width: '1px', height: '20px', background: 'var(--border-0)' }} />

        {/* Alert bell */}
        <button
          style={{
            position: 'relative',
            width: '34px',
            height: '34px',
            borderRadius: '8px',
            background: unresolvedCount > 0 ? 'rgba(245,158,11,0.08)' : 'rgba(255,255,255,0.03)',
            border: `1px solid ${unresolvedCount > 0 ? 'rgba(245,158,11,0.20)' : 'var(--border-0)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: unresolvedCount > 0 ? 'var(--amber)' : 'var(--text-3)',
            transition: 'all var(--t-fast)',
          }}
          title={`${unresolvedCount} active alerts`}
        >
          <Bell size={14} />
          {unresolvedCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: 'var(--red)',
              color: '#fff',
              borderRadius: '999px',
              fontSize: '8px',
              fontWeight: '800',
              minWidth: '14px',
              height: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 3px',
              border: '1.5px solid var(--bg-0)',
              animation: 'glowPulse-red 2s infinite',
            }}>
              {unresolvedCount}
            </span>
          )}
        </button>

        {/* AI COO button */}
        <button
          onClick={onAssistantToggle}
          className="btn btn-cyan"
          style={{ padding: '7px 14px', fontSize: '12px', fontWeight: '600' }}
        >
          <Sparkles size={13} />
          AI COO
        </button>
      </div>
    </header>
  );
};
