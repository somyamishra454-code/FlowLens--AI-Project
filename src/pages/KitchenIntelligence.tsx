import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { Flame, ChefHat, AlertTriangle, Zap } from 'lucide-react';

export const KitchenIntelligence: React.FC = () => {
  const { kitchenTickets, metrics, state, applyRecommendation } = useRestaurant();

  const getStationStatus = (id: string, time: number): { label: string; status: 'critical' | 'warning' | 'optimal' } => {
    if (id === 'pizza' && state.cheeseStockRatio < 0.6) return { label: 'Cheese Outage', status: 'critical' };
    if (time > 900) return { label: 'Overloaded', status: 'critical' };
    if (time > 720) return { label: 'Elevated', status: 'warning' };
    return { label: 'Optimal', status: 'optimal' };
  };

  const STATIONS = [
    { id: 'pizza', name: 'Pizza & Oven Station', icon: '🍕', chefs: 1, targetSec: 600, currentSec: Math.round(600 * (4 / Math.max(1, state.chefCount)) * (state.cheeseStockRatio < 0.6 ? 1.45 : 1.0)) },
    { id: 'grill', name: 'Charcoal Grill Station', icon: '🥩', chefs: 1, targetSec: 480, currentSec: 420 },
    { id: 'fry',   name: 'Deep Fryer Station', icon: '🍗', chefs: 1, targetSec: 360, currentSec: 310 },
    { id: 'prep',  name: 'Salad & Cold Prep', icon: '🥗', chefs: 1, targetSec: 480, currentSec: Math.round(540 * (state.avocadoStockRatio > 1.4 ? 0.92 : 1.0)) },
  ];

  return (
    <div className="dashboard-grid stagger-children">

      {/* KPI row */}
      {[
        { label: 'Average Prep Time', val: `${Math.round(metrics.averagePrepTime / 60)}m ${metrics.averagePrepTime % 60}s`, color: metrics.averagePrepTime > 780 ? 'var(--amber)' : 'var(--emerald)', sub: 'Target SLA: 12 min' },
        { label: 'Kitchen Load', val: `${metrics.kitchenLoadRatio}%`, color: metrics.kitchenLoadRatio > 80 ? 'var(--red)' : 'var(--cyan)', sub: `${state.chefCount} chefs across 4 stations` },
        { label: 'Station Balance', val: '91.4%', color: 'var(--emerald)', sub: 'Cross-station variance: steady' },
        { label: 'KDS Tickets', val: `${kitchenTickets.length}`, color: 'var(--text-1)', sub: `${kitchenTickets.filter(t => t.status === 'delayed').length} delayed tickets` },
      ].map((k, i) => (
        <div key={i} style={{ gridColumn: 'span 3' }}>
          <div className="glass-card" style={{ borderTop: `2px solid ${k.color}` }}>
            <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>{k.label}</div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: k.color, letterSpacing: '-0.04em', lineHeight: 1 }}>{k.val}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-3)', marginTop: '6px' }}>{k.sub}</div>
          </div>
        </div>
      ))}

      {/* Station cards */}
      <div style={{ gridColumn: 'span 8' }}>
        <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-0)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ChefHat size={14} style={{ color: 'var(--cyan)' }} />
            <span style={{ fontSize: '14px', fontWeight: '650', color: 'var(--text-1)' }}>Kitchen Assembly Stations</span>
            <span className="dot-live cyan" style={{ marginLeft: 'auto' }} />
          </div>
          <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {STATIONS.map((station, i) => {
              const st = getStationStatus(station.id, station.currentSec);
              const loadPct = Math.min(100, Math.round((station.currentSec / (station.targetSec * 1.5)) * 100));
              const overTarget = station.currentSec > station.targetSec;
              const color = st.status === 'critical' ? 'var(--red)' : st.status === 'warning' ? 'var(--amber)' : 'var(--emerald)';
              return (
                <div key={station.id} style={{
                  padding: '16px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.02)',
                  border: `1px solid ${st.status !== 'optimal' ? `${color}28` : 'var(--border-0)'}`,
                  animation: `fadeSlideUp 0.4s var(--ease-spring) ${i * 60}ms both`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '20px' }}>{station.icon}</span>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '650', color: 'var(--text-1)' }}>{station.name}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-3)' }}>Chef count: {station.chefs} · Target: {Math.floor(station.targetSec / 60)}m</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '16px', fontWeight: '700', color: overTarget ? color : 'var(--text-1)', fontFamily: 'var(--font-mono)' }}>
                          {Math.floor(station.currentSec / 60)}m {station.currentSec % 60}s
                        </div>
                      </div>
                      <StatusBadge status={st.status} label={st.label} size="sm" />
                    </div>
                  </div>
                  {/* Load bar */}
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${loadPct}%`, background: color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Side: alert + KDS log */}
      <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {state.chefCount < 4 && metrics.averagePrepTime > 780 && (
          <div className="glass-card" style={{ borderLeft: '3px solid var(--amber)', background: 'rgba(245,158,11,0.04)', animation: 'fadeSlideUp 0.4s var(--ease-spring) both' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <AlertTriangle size={14} style={{ color: 'var(--amber)' }} />
              <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--amber)' }}>Pizza Station Bottleneck</span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: 1.6, marginBottom: '12px' }}>
              Prep at {Math.round(metrics.averagePrepTime / 60)} mins — {state.chefCount < 4 ? `understaffed by ${4 - state.chefCount} chef(s)` : 'capacity exceeded'}.
            </p>
            <button className="btn btn-primary btn-sm" style={{ width: '100%', gap: '6px' }} onClick={() => applyRecommendation('alert-kitchen')}>
              <Zap size={12} /> Reallocate Chef B to Pizza
            </button>
          </div>
        )}

        <div className="glass-card" style={{ flex: 1, padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-0)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Flame size={13} style={{ color: 'var(--amber)' }} />
            <span style={{ fontSize: '13px', fontWeight: '650', color: 'var(--text-1)' }}>KDS Dispatch Log</span>
            <span className="badge badge-neutral" style={{ marginLeft: 'auto', fontSize: '10px' }}>{kitchenTickets.length} open</span>
          </div>
          <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '340px', overflowY: 'auto' }}>
            {kitchenTickets.map((ticket, i) => (
              <div key={ticket.id} style={{
                padding: '10px 12px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.02)',
                border: `1px solid ${ticket.status === 'delayed' ? 'rgba(239,68,68,0.15)' : 'var(--border-0)'}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                animation: `fadeSlideUp 0.35s var(--ease-spring) ${i * 50}ms both`,
              }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-1)' }}>{ticket.foodItemName}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-3)', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                    #{ticket.id} · {ticket.station}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: ticket.status === 'delayed' ? 'var(--red)' : 'var(--text-2)', fontFamily: 'var(--font-mono)' }}>
                    {Math.floor(ticket.prepTimeSeconds / 60)}m
                  </div>
                  <StatusBadge status={ticket.status === 'delayed' ? 'warning' : 'optimal'} label={ticket.status} size="sm" dot={false} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
