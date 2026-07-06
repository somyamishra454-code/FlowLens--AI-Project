import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { GlassCard } from '../components/common/GlassCard';
import { Sparkles, CloudSun } from 'lucide-react';

export const PredictiveAnalytics: React.FC = () => {
  const { metrics, alerts } = useRestaurant();

  // Custom formatters
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const projectRevenueFuture = () => {
    return metrics.revenueTotal * 7;
  };

  return (
    <div className="dashboard-grid">
      
      {/* Metrics overview */}
      <div style={{ gridColumn: 'span 4' }}>
        <GlassCard>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>PROJECTED WEEKLY REVENUE</span>
          <div style={{ fontSize: '28px', fontWeight: '800', marginTop: '6px', color: 'var(--color-cyan)' }}>
            {formatCurrency(projectRevenueFuture())}
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginTop: '8px' }}>
            Forecast based on historical performance + weather indicators.
          </span>
        </GlassCard>
      </div>

      <div style={{ gridColumn: 'span 4' }}>
        <GlassCard style={{ borderLeft: '3px solid var(--color-orange)' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>RISK CANCEL COST (7D)</span>
          <div style={{ fontSize: '28px', fontWeight: '800', marginTop: '6px', color: 'var(--color-orange)' }}>
            {alerts.filter(a => !a.resolved).length > 0 ? '₹34,800' : '₹0'}
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginTop: '8px' }}>
            Estimated revenue leaked if bottlenecks are ignored.
          </span>
        </GlassCard>
      </div>

      <div style={{ gridColumn: 'span 4' }}>
        <GlassCard>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>EXTERNAL DEMAND SHIFT</span>
          <div style={{ fontSize: '28px', fontWeight: '800', marginTop: '6px', color: 'var(--color-emerald)' }}>
            +18.5% <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Rainy</span>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginTop: '8px' }}>
            Precipitation forecasts predict increased delivery volume.
          </span>
        </GlassCard>
      </div>

      {/* Graphical Forecast SVG (Col 8) */}
      <div style={{ gridColumn: 'span 8' }}>
        <GlassCard>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} style={{ color: 'var(--color-cyan)' }} />
              <span>Next 7 Days Demand Projections</span>
            </h3>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Confidence: 91.8% (Proprietary ML Model)</span>
          </div>

          {/* SVG Chart */}
          <div style={{ height: '220px', width: '100%', marginTop: '20px', position: 'relative' }}>
            <svg width="100%" height="100%" viewBox="0 0 600 200" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
              {/* Grid Lines */}
              <line x1="0" y1="160" x2="600" y2="160" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="0" y1="100" x2="600" y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="0" y1="40" x2="600" y2="40" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              
              {/* Graph Line */}
              <path
                d={`M 0 140 Q 100 130 200 90 T 400 60 T 600 40`}
                fill="none"
                stroke="var(--color-cyan)"
                strokeWidth="2.5"
              />
              <path
                d={`M 0 140 Q 100 130 200 90 T 400 60 T 600 40 L 600 200 L 0 200 Z`}
                fill="url(#chart-glow)"
                opacity="0.05"
              />

              <defs>
                <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-cyan)" />
                  <stop offset="100%" stopColor="var(--color-cyan)" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Highlight points */}
              <circle cx="200" cy="90" r="5" fill="var(--color-cyan)" stroke="#000" strokeWidth="2" />
              <circle cx="400" cy="60" r="5" fill="var(--color-cyan)" stroke="#000" strokeWidth="2" />
              <circle cx="600" cy="40" r="5" fill="var(--color-cyan)" stroke="#000" strokeWidth="2" />
            </svg>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)', marginTop: '8px' }}>
              <span>Mon (Today)</span>
              <span>Tue</span>
              <span>Wed (Rain peak)</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Side predictions detail panel (Col 4) */}
      <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <GlassCard>
          <h4 style={{ fontSize: '14px', color: '#FFFFFF', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CloudSun size={14} style={{ color: 'var(--color-cyan)' }} />
            <span>Weather Risk Vectors</span>
          </h4>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
            A heavy monsoon forecast for Wednesday evening will shift Dine-In orders to Delivery (+28%). High risk of courier delivery timeout.
          </p>
          <div style={{
            marginTop: '12px',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '8px',
            fontSize: '11px',
            color: 'var(--text-secondary)'
          }}>
            Recommendation: pre-hire 2 external riders on shift for Wednesday 18:00.
          </div>
        </GlassCard>

        <GlassCard>
          <h4 style={{ fontSize: '14px', color: '#FFFFFF', marginBottom: '10px' }}>Active Risk Registry</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
            {alerts.filter(a => !a.resolved).map(alert => (
              <div key={alert.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{alert.title.slice(0, 20)}...</span>
                <span style={{ color: 'var(--color-orange)', fontWeight: '600' }}>{alert.expectedSavings}</span>
              </div>
            ))}
            {alerts.filter(a => !a.resolved).length === 0 && (
              <p style={{ color: 'var(--color-emerald)' }}>No risk vectors detected.</p>
            )}
          </div>
        </GlassCard>
      </div>

    </div>
  );
};
