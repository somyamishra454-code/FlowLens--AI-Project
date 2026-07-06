import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { ProgressRing } from '../components/common/ProgressRing';
import { StatusBadge } from '../components/common/StatusBadge';
import { Package, AlertTriangle, Clock, Zap } from 'lucide-react';

export const InventoryIntelligence: React.FC = () => {
  const { inventory, metrics, state, applyRecommendation } = useRestaurant();

  const getStatus = (cur: number, safe: number): { label: string; status: 'critical' | 'warning' | 'optimal' } => {
    const ratio = cur / safe;
    if (ratio < 0.5) return { label: 'Critical Understock', status: 'critical' };
    if (ratio < 1.0) return { label: 'Below Safety Stock', status: 'warning' };
    return { label: 'Optimal', status: 'optimal' };
  };

  return (
    <div className="dashboard-grid stagger-children">

      {/* KPI row */}
      {[
        { label: 'Total Spoilage Cost', value: `₹${metrics.wasteCost.toLocaleString('en-IN')}`, sub: 'Avocado rot = 48% of total', color: 'var(--amber)' },
        { label: 'Inventory Turnover', value: '14.2×', sub: 'Target: 15× monthly', color: 'var(--cyan)' },
        { label: 'Supplier SLA Compliance', value: '88.4%', sub: 'Dairy Gold Farms delayed +6h', color: '#fff' },
        { label: 'Active Alerts', value: `${(state.cheeseStockRatio < 0.6 ? 1 : 0) + (state.avocadoStockRatio > 1.4 ? 1 : 0)}`, sub: 'Require replenishment action', color: 'var(--red)' },
      ].map((k, i) => (
        <div key={i} style={{ gridColumn: 'span 3' }}>
          <div className="glass-card" style={{ borderTop: `2px solid ${k.color}` }}>
            <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>{k.label}</div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: k.color, letterSpacing: '-0.04em', lineHeight: 1 }}>{k.value}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-3)', marginTop: '6px' }}>{k.sub}</div>
          </div>
        </div>
      ))}

      {/* Stock table */}
      <div style={{ gridColumn: 'span 8' }}>
        <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-0)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Package size={14} style={{ color: 'var(--cyan)' }} />
            <span style={{ fontSize: '14px', fontWeight: '650', color: 'var(--text-1)' }}>Core Raw Stock Status</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Ingredient</th>
                  <th>Stock</th>
                  <th>Safety Min</th>
                  <th>Fill Rate</th>
                  <th>Unit Cost</th>
                  <th>Waste %</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map(item => {
                  const st = getStatus(item.currentStock, item.safetyStock);
                  const fillPct = Math.min(100, Math.round((item.currentStock / item.safetyStock) * 100));
                  return (
                    <tr key={item.id}>
                      <td>
                        <div style={{ fontWeight: '600', color: 'var(--text-1)' }}>{item.name}</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-3)' }}>{item.supplierName}</div>
                      </td>
                      <td><span style={{ fontWeight: '700', fontFamily: 'var(--font-mono)', fontSize: '13px' }}>{item.currentStock} kg</span></td>
                      <td><span style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>{item.safetyStock} kg</span></td>
                      <td style={{ minWidth: '100px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div className="progress-track" style={{ flex: 1 }}>
                            <div className="progress-fill" style={{
                              width: `${fillPct}%`,
                              background: st.status === 'critical' ? 'var(--red)' : st.status === 'warning' ? 'var(--amber)' : 'var(--emerald)',
                            }} />
                          </div>
                          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-3)', minWidth: '32px' }}>{fillPct}%</span>
                        </div>
                      </td>
                      <td><span style={{ fontSize: '12px', color: 'var(--text-2)' }}>₹{item.unitCost}/kg</span></td>
                      <td>
                        <span style={{ color: item.wastePercentage > 15 ? 'var(--red)' : 'var(--text-2)', fontWeight: item.wastePercentage > 15 ? '700' : '400', fontFamily: 'var(--font-mono)' }}>
                          {item.wastePercentage}%
                        </span>
                      </td>
                      <td><StatusBadge status={st.status} label={st.label} size="sm" /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Side alerts */}
      <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Cheese alert */}
        {state.cheeseStockRatio < 0.6 && (
          <div className="glass-card" style={{ borderLeft: '3px solid var(--red)', background: 'rgba(239,68,68,0.04)', animation: 'fadeSlideUp 0.4s var(--ease-spring) both' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <AlertTriangle size={14} style={{ color: 'var(--red)' }} />
              <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--red)' }}>Critical: Cheese Depletion</span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: 1.6, marginBottom: '12px' }}>
              Cheese stock at {Math.round(35 * state.cheeseStockRatio)}kg — 65% below safety minimum. Pizza station delays are active.
            </p>
            <button className="btn btn-primary btn-sm" style={{ width: '100%', gap: '6px' }} onClick={() => applyRecommendation('alert-cheese')}>
              <Zap size={12} /> Authorize Replenishment
            </button>
          </div>
        )}

        {/* Avocado alert */}
        {state.avocadoStockRatio > 1.4 && (
          <div className="glass-card" style={{ borderLeft: '3px solid var(--amber)', background: 'rgba(245,158,11,0.04)', animation: 'fadeSlideUp 0.4s var(--ease-spring) 60ms both' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <AlertTriangle size={14} style={{ color: 'var(--amber)' }} />
              <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--amber)' }}>Warning: Avocado Overstock</span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: 1.6, marginBottom: '12px' }}>
              {Math.round(25 * state.avocadoStockRatio)}kg on hand. Spoilage rate at 26%. ₹8,400 at risk.
            </p>
            <button className="btn btn-ghost btn-sm" style={{ width: '100%', gap: '6px' }} onClick={() => applyRecommendation('alert-avocado')}>
              <Zap size={12} /> Trigger Promo Special
            </button>
          </div>
        )}

        {/* Supplier SLA */}
        <div className="glass-card" style={{ animation: 'fadeSlideUp 0.4s var(--ease-spring) 120ms both' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Clock size={14} style={{ color: 'var(--cyan)' }} />
            <span style={{ fontSize: '13px', fontWeight: '650', color: 'var(--text-1)' }}>Supplier Lead Times</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { name: 'Dairy Gold Farms', lead: '12h', status: 'warning' as const, note: 'Delayed +6h avg' },
              { name: 'Organic Greens Inc.', lead: '24h', status: 'optimal' as const, note: 'On schedule' },
              { name: 'Heritage Meats', lead: '8h', status: 'optimal' as const, note: 'On schedule' },
              { name: 'Artisan Bakers', lead: '6h', status: 'optimal' as const, note: 'On schedule' },
            ].map(s => (
              <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '550', color: 'var(--text-1)' }}>{s.name}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-3)' }}>{s.note}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-2)' }}>{s.lead}</span>
                  <StatusBadge status={s.status} size="sm" dot={false} label={s.status === 'warning' ? 'Delay' : 'OK'} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stock ring overview */}
        <div className="glass-card" style={{ animation: 'fadeSlideUp 0.4s var(--ease-spring) 180ms both' }}>
          <div style={{ fontSize: '13px', fontWeight: '650', color: 'var(--text-1)', marginBottom: '14px' }}>Fill Rate Overview</div>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div style={{ textAlign: 'center' }}>
              <ProgressRing
                value={Math.round(state.cheeseStockRatio * 100)}
                size={58}
                strokeWidth={5}
                color={state.cheeseStockRatio < 0.6 ? 'var(--red)' : 'var(--emerald)'}
                label={`${Math.round(state.cheeseStockRatio * 100)}%`}
              />
              <div style={{ fontSize: '10px', color: 'var(--text-3)', marginTop: '6px' }}>Cheese</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <ProgressRing
                value={Math.min(100, Math.round((1 / state.avocadoStockRatio) * 100))}
                size={58}
                strokeWidth={5}
                color={state.avocadoStockRatio > 1.4 ? 'var(--amber)' : 'var(--emerald)'}
                label={`${Math.min(100, Math.round((1 / state.avocadoStockRatio) * 100))}%`}
              />
              <div style={{ fontSize: '10px', color: 'var(--text-3)', marginTop: '6px' }}>Avocado</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <ProgressRing value={88} size={58} strokeWidth={5} color="var(--emerald)" label="88%" />
              <div style={{ fontSize: '10px', color: 'var(--text-3)', marginTop: '6px' }}>Others</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
