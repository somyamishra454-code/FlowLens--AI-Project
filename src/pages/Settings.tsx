import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { GlassCard } from '../components/common/GlassCard';
import { Settings as SettingsIcon, Cpu, Database } from 'lucide-react';

export const Settings: React.FC = () => {
  const { state, resetSimulation } = useRestaurant();

  return (
    <div className="dashboard-grid">
      
      {/* 1. Branch Details (Col 6) */}
      <div style={{ gridColumn: 'span 6' }}>
        <GlassCard>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SettingsIcon size={16} style={{ color: 'var(--color-cyan)' }} />
            <span>Branch Configuration</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
            <div>
              <label style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Branch Name</label>
              <div style={{ color: '#FFFFFF', fontWeight: '600', marginTop: '2px' }}>{state.branchName}</div>
            </div>
            <div>
              <label style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Operational Mode</label>
              <div style={{ color: 'var(--color-emerald)', fontWeight: '600', marginTop: '2px' }}>Active AI Monitoring Enabled</div>
            </div>
            <div>
              <label style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Geographic Coordinates</label>
              <div style={{ color: 'var(--text-secondary)', marginTop: '2px' }}>12.9716° N, 77.5946° E (Bengaluru HQ)</div>
            </div>
            
            <button
              onClick={resetSimulation}
              style={{
                marginTop: '16px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border-subtle)',
                color: '#FFFFFF',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all var(--transition-fast)'
              }}
            >
              Reset Sandbox Settings
            </button>
          </div>
        </GlassCard>
      </div>

      {/* 2. Integration API status (Col 6) */}
      <div style={{ gridColumn: 'span 6' }}>
        <GlassCard>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu size={16} style={{ color: 'var(--color-cyan)' }} />
            <span>Operational Connectors</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
            {[
              { name: 'POS Integration (Sales Stream)', status: 'Connected', delay: '120ms' },
              { name: 'KDS Connection (Prep Clock)', status: 'Connected', delay: '240ms' },
              { name: 'Inventory Ledger (Safety Stock)', status: 'Connected', delay: '410ms' },
              { name: 'Rider GPS Logs (Transit delays)', status: 'Connected', delay: '190ms' }
            ].map((conn, idx) => (
              <div 
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div>
                  <div style={{ fontWeight: '600', color: '#FFFFFF' }}>{conn.name}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>Latency: {conn.delay}</div>
                </div>
                <span style={{ color: 'var(--color-emerald)', fontWeight: '600', fontSize: '11px', alignSelf: 'center' }}>
                  {conn.status}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* 3. Database specs (Col 12) */}
      <div style={{ gridColumn: 'span 12' }}>
        <GlassCard style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Database size={24} style={{ color: 'var(--text-secondary)' }} />
            <div>
              <h4 style={{ fontSize: '14px', color: '#FFFFFF' }}>Operational Database Size</h4>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Contains POS transaction history, item margins, ingredient stock tables, and rider SLA history logs.
              </p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '14px', fontWeight: '800', color: 'var(--color-cyan)' }}>12,854 Rows</span>
            <span style={{ display: 'block', fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>Cache hit ratio: 99.4%</span>
          </div>
        </GlassCard>
      </div>

    </div>
  );
};
