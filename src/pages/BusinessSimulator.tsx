import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { GlassCard } from '../components/common/GlassCard';
import { Sliders, RefreshCw, AlertTriangle, Info } from 'lucide-react';

export const BusinessSimulator: React.FC = () => {
  const { state, updateState, metrics, resetSimulation, alerts } = useRestaurant();

  // Custom formatters
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleChefChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateState({ chefCount: Number(e.target.value) });
  };

  const handleRiderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateState({ riderCount: Number(e.target.value) });
  };

  const handleCheeseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateState({ cheeseStockRatio: Number(e.target.value) });
  };

  const handleAvocadoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateState({ avocadoStockRatio: Number(e.target.value) });
  };

  const handleMarketingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateState({ marketingSpendMultiplier: Number(e.target.value) });
  };

  const activeAlarms = alerts.filter(a => !a.resolved && a.severity !== 'info');

  return (
    <div className="dashboard-grid">
      
      {/* 1. SLIDERS FORM PANEL (Col 6) */}
      <div style={{ gridColumn: 'span 6' }}>
        <GlassCard>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sliders size={16} style={{ color: 'var(--color-cyan)' }} />
              <span>Simulation Controls</span>
            </h3>
            <button 
              onClick={resetSimulation}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                background: 'rgba(255,255,255,0.03)',
                padding: '4px 10px',
                borderRadius: '6px',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <RefreshCw size={12} />
              <span>Reset Roster</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Chef Count */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                <span style={{ color: '#FFFFFF', fontWeight: '600' }}>Active Kitchen Chefs</span>
                <span style={{ color: 'var(--color-cyan)', fontWeight: '700' }}>{state.chefCount} Chefs</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="8" 
                value={state.chefCount}
                onChange={handleChefChange}
                style={{ width: '100%', accentColor: 'var(--color-cyan)' }}
              />
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Controls prep speed & capacity bounds.</span>
            </div>

            {/* Rider Count */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                <span style={{ color: '#FFFFFF', fontWeight: '600' }}>Active Delivery Riders</span>
                <span style={{ color: 'var(--color-cyan)', fontWeight: '700' }}>{state.riderCount} Riders</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="8" 
                value={state.riderCount}
                onChange={handleRiderChange}
                style={{ width: '100%', accentColor: 'var(--color-cyan)' }}
              />
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Controls delivery transit delays per region.</span>
            </div>

            {/* Cheese Stock ratio */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                <span style={{ color: '#FFFFFF', fontWeight: '600' }}>Cheese Inventory Target</span>
                <span style={{ color: 'var(--color-cyan)', fontWeight: '700' }}>{Math.round(state.cheeseStockRatio * 100)}% stock</span>
              </div>
              <input 
                type="range" 
                min="0.1" 
                max="2.0" 
                step="0.1"
                value={state.cheeseStockRatio}
                onChange={handleCheeseChange}
                style={{ width: '100%', accentColor: 'var(--color-cyan)' }}
              />
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Under 60% stock triggers KDS walking delays.</span>
            </div>

            {/* Avocado Stock ratio */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                <span style={{ color: '#FFFFFF', fontWeight: '600' }}>Avocado Inventory Target</span>
                <span style={{ color: 'var(--color-cyan)', fontWeight: '700' }}>{Math.round(state.avocadoStockRatio * 100)}% stock</span>
              </div>
              <input 
                type="range" 
                min="0.1" 
                max="2.0" 
                step="0.1"
                value={state.avocadoStockRatio}
                onChange={handleAvocadoChange}
                style={{ width: '100%', accentColor: 'var(--color-cyan)' }}
              />
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Over 120% target triggers organic decay wastage.</span>
            </div>

            {/* Marketing Spend Multiplier */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                <span style={{ color: '#FFFFFF', fontWeight: '600' }}>Marketing Campaign Intensity</span>
                <span style={{ color: 'var(--color-cyan)', fontWeight: '700' }}>{state.marketingSpendMultiplier}x scale</span>
              </div>
              <input 
                type="range" 
                min="0.5" 
                max="2.0" 
                step="0.1"
                value={state.marketingSpendMultiplier}
                onChange={handleMarketingChange}
                style={{ width: '100%', accentColor: 'var(--color-cyan)' }}
              />
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Increases incoming orders, testing kitchen stress limits.</span>
            </div>

          </div>
        </GlassCard>
      </div>

      {/* 2. LIVE IMPACT PROJECTION PANEL (Col 6) */}
      <div style={{ gridColumn: 'span 6', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <GlassCard style={{ flex: 1, borderLeft: '3px solid var(--color-cyan)' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#FFFFFF', marginBottom: '16px' }}>
            Projected Operational Impact
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '13px' }}>
            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.01)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '11px' }}>PROJECTED REVENUE</span>
              <span style={{ fontSize: '18px', fontWeight: '800', color: '#FFFFFF', marginTop: '4px', display: 'block' }}>
                {formatCurrency(metrics.revenueTotal)}
              </span>
            </div>

            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.01)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '11px' }}>SPOILAGE WASTE COST</span>
              <span style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-orange)', marginTop: '4px', display: 'block' }}>
                {formatCurrency(metrics.wasteCost)}
              </span>
            </div>

            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.01)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '11px' }}>KITCHEN PREP TIME</span>
              <span style={{ fontSize: '18px', fontWeight: '800', color: metrics.averagePrepTime > 780 ? 'var(--color-orange)' : '#FFFFFF', marginTop: '4px', display: 'block' }}>
                {Math.round(metrics.averagePrepTime / 60)}m {metrics.averagePrepTime % 60}s
              </span>
            </div>

            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.01)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '11px' }}>DELIVERY TRANSIT SLA</span>
              <span style={{ fontSize: '18px', fontWeight: '800', color: metrics.averageDeliveryTime > 32 ? 'var(--color-red)' : '#FFFFFF', marginTop: '4px', display: 'block' }}>
                {metrics.averageDeliveryTime} mins
              </span>
            </div>
          </div>
        </GlassCard>

        {/* Dynamic alarms trigger log inside simulator */}
        <GlassCard style={{ flex: 1 }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#FFFFFF', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertTriangle size={14} style={{ color: 'var(--color-orange)' }} />
            <span>Simulated AI Alerts Triggered ({activeAlarms.length})</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {activeAlarms.map(alert => (
              <div 
                key={alert.id}
                style={{
                  fontSize: '12px',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span style={{ color: '#FFFFFF', fontWeight: '600' }}>{alert.title}</span>
                <span style={{
                  fontSize: '10px',
                  fontWeight: '700',
                  color: alert.severity === 'critical' ? 'var(--color-red)' : 'var(--color-orange)',
                  background: alert.severity === 'critical' ? 'rgba(255,69,58,0.1)' : 'rgba(255,159,10,0.1)',
                  padding: '2px 6px',
                  borderRadius: '4px'
                }}>
                  {alert.severity}
                </span>
              </div>
            ))}
            {activeAlarms.length === 0 && (
              <div style={{ 
                padding: '16px', 
                textAlign: 'center', 
                color: 'var(--color-emerald)', 
                fontSize: '12px', 
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}>
                <Info size={14} />
                <span>Roster combination is stable. Zero alerts triggered.</span>
              </div>
            )}
          </div>
        </GlassCard>
      </div>

    </div>
  );
};
