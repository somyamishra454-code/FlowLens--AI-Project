import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { GlassCard } from '../components/common/GlassCard';
import { Truck, AlertTriangle, MapPin, Compass } from 'lucide-react';

export const DeliveryIntelligence: React.FC = () => {
  const { riders, metrics, state, applyRecommendation } = useRestaurant();

  const getZoneColor = (minutes: number) => {
    if (minutes > 38) return 'var(--color-red)';
    if (minutes > 30) return 'var(--color-orange)';
    return 'var(--color-emerald)';
  };

  return (
    <div className="dashboard-grid">
      
      {/* Metrics Row */}
      <div style={{ gridColumn: 'span 4' }}>
        <GlassCard>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>AVERAGE DELIVERY TIME</span>
          <div style={{ fontSize: '28px', fontWeight: '800', marginTop: '6px', color: metrics.averageDeliveryTime > 32 ? 'var(--color-red)' : '#FFFFFF' }}>
            {metrics.averageDeliveryTime} mins
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginTop: '8px' }}>
            Target: 30 mins limit. Current delay variance: {metrics.averageDeliveryTime > 30 ? `+${metrics.averageDeliveryTime - 30} mins` : '0 mins'}.
          </span>
        </GlassCard>
      </div>

      <div style={{ gridColumn: 'span 4' }}>
        <GlassCard>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>ON-TIME SLA PERCENTAGE</span>
          <div style={{ fontSize: '28px', fontWeight: '800', marginTop: '6px', color: metrics.averageDeliveryTime > 32 ? 'var(--color-orange)' : 'var(--color-emerald)' }}>
            {metrics.averageDeliveryTime > 38 ? '78.2%' : metrics.averageDeliveryTime > 32 ? '86.4%' : '96.8%'}
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginTop: '8px' }}>
            Calculated across {state.riderCount} active dispatch riders in service.
          </span>
        </GlassCard>
      </div>

      <div style={{ gridColumn: 'span 4' }}>
        <GlassCard>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>DISPATCH ORDER QUEUE</span>
          <div style={{ fontSize: '28px', fontWeight: '800', marginTop: '6px', color: 'var(--color-cyan)' }}>
            8 tickets <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Pending</span>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginTop: '8px' }}>
            Orders boxed and waiting at dispatch table: 3 tickets.
          </span>
        </GlassCard>
      </div>

      {/* Geofencing Zones grid */}
      <div style={{ gridColumn: 'span 8' }}>
        <GlassCard>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Compass size={16} style={{ color: 'var(--color-cyan)' }} />
            <span>Regional Zone Velocities</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { id: 'north', name: 'North Delivery Zone', time: Math.round(28 * ((2.2 * state.marketingSpendMultiplier) / Math.max(1, state.riderCount))), orders: '42%' },
              { id: 'south', name: 'South Delivery Zone', time: 28, orders: '26%' },
              { id: 'east', name: 'East Delivery Zone', time: 24, orders: '18%' },
              { id: 'west', name: 'West Delivery Zone', time: 25, orders: '14%' }
            ].map(zone => {
              const color = getZoneColor(zone.time);
              return (
                <div 
                  key={zone.id}
                  style={{
                    padding: '16px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.01)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '100px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={14} style={{ color: 'var(--text-secondary)' }} />
                      <span style={{ fontSize: '13px', fontWeight: '700', color: '#FFFFFF' }}>{zone.name}</span>
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Share: {zone.orders}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '16px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Average Transit:</span>
                    <span style={{ fontSize: '18px', fontWeight: '800', color: color }}>
                      {zone.time} mins
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>

      {/* Rider list side panel (Col 4) */}
      <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {state.riderCount < 3 && metrics.averageDeliveryTime > 32 && (
          <GlassCard style={{ borderLeft: '3px solid var(--color-red)', background: 'rgba(255,69,58,0.02)' }}>
            <h4 style={{ color: 'var(--color-red)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <AlertTriangle size={14} /> Rider Deficit Warning
            </h4>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              North Zone average delivery duration is {Math.round(28 * ((2.2 * state.marketingSpendMultiplier) / Math.max(1, state.riderCount)))} mins. Under-staffing is hurting customer retention.
            </p>
            <button
              onClick={() => applyRecommendation('alert-delivery')}
              style={{
                marginTop: '12px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border-medium)',
                color: '#FFFFFF',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '11px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Reallocate 1 Rider to North Zone
            </button>
          </GlassCard>
        )}

        <GlassCard style={{ flex: 1 }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Truck size={14} style={{ color: 'var(--color-cyan)' }} />
            <span>Active Rider Roster</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {riders.map(rider => (
              <div 
                key={rider.id}
                style={{
                  padding: '10px',
                  borderRadius: '6px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: '600', color: '#FFFFFF' }}>{rider.name}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Zone: {rider.zone} • Status: {rider.status}
                  </div>
                </div>
                <span style={{ 
                  color: rider.averageTimeMinutes > 38 ? 'var(--color-red)' : 'var(--text-secondary)',
                  fontWeight: '600'
                }}>
                  {rider.averageTimeMinutes}m avg
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

    </div>
  );
};
