import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { KPICard } from '../components/common/KPICard';

import { ProgressRing } from '../components/common/ProgressRing';
import { MiniChart } from '../components/common/MiniChart';
import { TrendingUp, PackageCheck, ChefHat, Clock, Percent, ArrowRight, Play, Sparkles, Activity } from 'lucide-react';

export const ExecutiveDashboard: React.FC = () => {
  const { metrics, alerts, setActiveView, setSelectedAlertId } = useRestaurant();

  const fmt = (v: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

  const healthScore = (() => {
    let s = 95;
    if (metrics.averagePrepTime > 780) s -= 8;
    if (metrics.averagePrepTime > 900) s -= 7;
    if (metrics.averageDeliveryTime > 30) s -= 6;
    if (metrics.averageDeliveryTime > 38) s -= 9;
    s -= (5 - metrics.customerSatisfaction) * 15;
    if (metrics.wasteCost > 6000) s -= 5;
    return Math.max(10, Math.min(100, Math.round(s)));
  })();

  const healthColor = healthScore > 85 ? 'var(--emerald)' : healthScore > 70 ? 'var(--amber)' : 'var(--red)';
  const healthLabel = healthScore >= 85 ? 'Optimal' : healthScore >= 70 ? 'Degraded' : 'Critical';

  const activeAlerts = alerts.filter(a => !a.resolved && a.severity !== 'info');

  return (
    <div className="dashboard-grid stagger-children">

      {/* ── Row 1: Health Score + 4 KPIs ── */}
      {/* Health score card */}
      <div style={{ gridColumn: 'span 4' }}>
        <div className="glass-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '16px', borderTop: `2px solid ${healthColor}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Operational Health
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-4)', marginTop: '2px' }}>Real-time composite score</div>
            </div>
            <span style={{
              fontSize: '10px',
              fontWeight: '600',
              color: healthColor,
              background: `${healthColor}14`,
              padding: '3px 8px',
              borderRadius: '999px',
              border: `1px solid ${healthColor}28`,
            }}>
              {healthLabel}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <ProgressRing
              value={healthScore}
              size={90}
              strokeWidth={7}
              color={healthColor}
              label={String(healthScore)}
              sublabel="/ 100"
            />
            <div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-1)', marginBottom: '6px' }}>
                {activeAlerts.length} issue{activeAlerts.length !== 1 ? 's' : ''} need attention
              </div>
              {activeAlerts.slice(0, 2).map(a => (
                <div key={a.id} style={{ fontSize: '11px', color: 'var(--text-3)', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '3px' }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: a.severity === 'critical' ? 'var(--red)' : 'var(--amber)', flexShrink: 0 }} />
                  {a.title.length > 28 ? a.title.slice(0, 28) + '…' : a.title}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveView('decision')}
            className="btn btn-ghost btn-sm"
            style={{ width: '100%', justifyContent: 'space-between', marginTop: 'auto' }}
          >
            <span>View Decision Center</span>
            <ArrowRight size={12} />
          </button>
        </div>
      </div>

      {/* Revenue KPI */}
      <div style={{ gridColumn: 'span 2' }}>
        <KPICard
          title="Daily Revenue"
          value={fmt(metrics.revenueTotal)}
          trend={{ value: `${((metrics.revenueTotal / 145000 - 1) * 100).toFixed(1)}%`, isPositive: metrics.revenueTotal >= 145000 }}
          subtitle="Target ₹1,50,000"
          sparklineData={[120000, 132000, 138000, 135000, 141000, 148000, metrics.revenueTotal]}
          sparklineColor="var(--cyan)"
          accentColor="var(--cyan)"
          icon={<TrendingUp size={14} />}
          onClick={() => setActiveView('menu')}
          animationDelay={60}
        />
      </div>

      {/* Orders KPI */}
      <div style={{ gridColumn: 'span 2' }}>
        <KPICard
          title="Active Orders"
          value={`${metrics.ordersCount}`}
          trend={{ value: `${((metrics.ordersCount / 180 - 1) * 100).toFixed(1)}%`, isPositive: metrics.ordersCount >= 180 }}
          subtitle="Digital: 65%"
          sparklineData={[160, 172, 168, 183, 191, 204, metrics.ordersCount]}
          sparklineColor="var(--emerald)"
          accentColor="var(--emerald)"
          icon={<PackageCheck size={14} />}
          animationDelay={120}
        />
      </div>

      {/* Prep time KPI */}
      <div style={{ gridColumn: 'span 2' }}>
        <KPICard
          title="Avg Prep Time"
          value={`${Math.round(metrics.averagePrepTime / 60)}m`}
          trend={{ value: metrics.averagePrepTime > 780 ? 'Delayed' : 'On target', isPositive: metrics.averagePrepTime <= 780 }}
          subtitle="Target: 12 min"
          sparklineData={[700, 715, 730, 748, metrics.averagePrepTime]}
          sparklineColor={metrics.averagePrepTime > 780 ? 'var(--amber)' : 'var(--emerald)'}
          accentColor={metrics.averagePrepTime > 780 ? 'var(--amber)' : 'var(--emerald)'}
          icon={<ChefHat size={14} />}
          onClick={() => setActiveView('kitchen')}
          animationDelay={180}
        />
      </div>

      {/* Delivery KPI */}
      <div style={{ gridColumn: 'span 2' }}>
        <KPICard
          title="Avg Delivery"
          value={`${metrics.averageDeliveryTime}m`}
          trend={{ value: metrics.averageDeliveryTime > 32 ? 'Delay risk' : 'Optimal', isPositive: metrics.averageDeliveryTime <= 32 }}
          subtitle="Target: 30 min"
          sparklineData={[26, 28, 30, 33, metrics.averageDeliveryTime]}
          sparklineColor={metrics.averageDeliveryTime > 32 ? 'var(--red)' : 'var(--emerald)'}
          accentColor={metrics.averageDeliveryTime > 32 ? 'var(--red)' : 'var(--emerald)'}
          icon={<Clock size={14} />}
          onClick={() => setActiveView('delivery')}
          animationDelay={240}
        />
      </div>

      {/* ── Row 2: AI Insights + Simulator ── */}
      {/* AI insights feed */}
      <div style={{ gridColumn: 'span 8' }}>
        <div className="glass-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="page-section-header" style={{ marginBottom: '4px' }}>
            <span className="page-section-title">
              <Sparkles size={13} style={{ color: 'var(--cyan)' }} />
              Prioritized AI COO Insights
            </span>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setActiveView('decision')}
              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              All ({alerts.length}) <ArrowRight size={11} />
            </button>
          </div>

          {activeAlerts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon" style={{ background: 'var(--emerald-dim)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <Activity size={18} style={{ color: 'var(--emerald)' }} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-2)' }}>All systems optimal</span>
              <span style={{ fontSize: '12px', color: 'var(--text-3)' }}>No active operational bottlenecks detected</span>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {activeAlerts.slice(0, 3).map((alert, i) => (
                <div
                  key={alert.id}
                  onClick={() => { setSelectedAlertId(alert.id); setActiveView('decision'); }}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid var(--border-0)',
                    borderLeft: `3px solid ${alert.severity === 'critical' ? 'var(--red)' : 'var(--amber)'}`,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    transition: 'all var(--t-fast)',
                    animation: `fadeSlideUp 0.4s var(--ease-spring) ${i * 80}ms both`,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor = 'var(--border-1)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                    e.currentTarget.style.borderColor = 'var(--border-0)';
                  }}
                >
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '9px',
                    background: alert.severity === 'critical' ? 'var(--red-dim)' : 'var(--amber-dim)',
                    border: `1px solid ${alert.severity === 'critical' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: '14px',
                  }}>
                    {alert.severity === 'critical' ? '⚠' : '●'}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-1)', marginBottom: '3px' }}>{alert.title}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {alert.description.slice(0, 80)}…
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--emerald)' }}>{alert.expectedSavings}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-4)' }}>Conf: {alert.confidenceScore}%</div>
                  </div>
                  <ArrowRight size={13} style={{ color: 'var(--text-4)', flexShrink: 0 }} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Simulator card */}
      <div style={{ gridColumn: 'span 4' }}>
        <div className="glass-card" style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #0d0d0d 0%, #000 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Background accent */}
          <div style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
              Scenario Simulator
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', letterSpacing: '-0.03em', marginBottom: '8px' }}>
              Model changes before you make them
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: 1.65 }}>
              Adjust staff, stock, and spend. See the projected P&L impact in real time before deploying to operations.
            </p>
          </div>

          {/* Live mini stats */}
          <div style={{
            marginTop: '20px',
            padding: '12px',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '8px',
            border: '1px solid var(--border-0)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}>
            {[
              { label: 'Kitchen load', val: `${metrics.kitchenLoadRatio}%`, color: metrics.kitchenLoadRatio > 80 ? 'var(--red)' : 'var(--emerald)' },
              { label: 'Delivery load', val: metrics.deliveryBottleneckLevel, color: metrics.deliveryBottleneckLevel === 'high' ? 'var(--red)' : metrics.deliveryBottleneckLevel === 'medium' ? 'var(--amber)' : 'var(--emerald)' },
              { label: 'Spoilage cost', val: fmt(metrics.wasteCost), color: metrics.wasteCost > 6000 ? 'var(--amber)' : 'var(--emerald)' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: 'var(--text-3)' }}>{s.label}</span>
                <span style={{ fontWeight: '650', color: s.color }}>{s.val}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setActiveView('simulator')}
            className="btn btn-primary btn-lg"
            style={{ marginTop: 'auto', width: '100%', gap: '8px' }}
          >
            <Play size={13} fill="#000" />
            Launch Simulation
          </button>
        </div>
      </div>

      {/* ── Row 3: 4 metric mini-cards + Chart ── */}
      <div style={{ gridColumn: 'span 4' }}>
        <KPICard
          title="Spoilage Cost"
          value={fmt(metrics.wasteCost)}
          trend={{ value: metrics.wasteCost > 6000 ? 'Elevated' : 'Stable', isPositive: metrics.wasteCost <= 6000 }}
          subtitle="Safety limit: 14%"
          sparklineData={[4200, 4800, 5100, 5600, metrics.wasteCost]}
          sparklineColor={metrics.wasteCost > 6000 ? 'var(--amber)' : 'var(--emerald)'}
          accentColor={metrics.wasteCost > 6000 ? 'var(--amber)' : undefined}
          icon={<Percent size={14} />}
          onClick={() => setActiveView('inventory')}
          animationDelay={300}
        />
      </div>

      <div style={{ gridColumn: 'span 4' }}>
        <KPICard
          title="Customer Satisfaction"
          value={`${metrics.customerSatisfaction} / 5.0`}
          trend={{ value: `${((metrics.customerSatisfaction / 4.6 - 1) * 100).toFixed(1)}%`, isPositive: metrics.customerSatisfaction >= 4.6 }}
          subtitle="Sentiment-adjusted NPS"
          sparklineData={[4.6, 4.5, 4.4, 4.3, 4.35, metrics.customerSatisfaction]}
          sparklineColor={metrics.customerSatisfaction >= 4.5 ? 'var(--emerald)' : 'var(--amber)'}
          accentColor={metrics.customerSatisfaction >= 4.5 ? undefined : 'var(--amber)'}
          onClick={() => setActiveView('customer')}
          animationDelay={360}
        />
      </div>

      {/* Revenue trend chart */}
      <div style={{ gridColumn: 'span 4' }}>
        <div className="glass-card" style={{ height: '100%' }}>
          <div className="page-section-header" style={{ marginBottom: '12px' }}>
            <span className="page-section-title">
              <TrendingUp size={13} style={{ color: 'var(--cyan)' }} />
              7-Day Revenue Trend
            </span>
            <span style={{ fontSize: '11px', color: 'var(--emerald)', fontWeight: '600' }}>+12.4% WoW</span>
          </div>
          <MiniChart
            data={[112000, 118000, 125000, 131000, 138000, 142000, metrics.revenueTotal]}
            color="var(--cyan)"
            height={80}
            width={300}
            filled
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-4)', marginTop: '6px' }}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Today'].map(d => <span key={d}>{d}</span>)}
          </div>
        </div>
      </div>

    </div>
  );
};
