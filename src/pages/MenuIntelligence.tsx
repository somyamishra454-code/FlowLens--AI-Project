import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { GlassCard } from '../components/common/GlassCard';
import { MENU_ITEMS } from '../services/dataMock';
import { TrendingUp, AlertTriangle } from 'lucide-react';

export const MenuIntelligence: React.FC = () => {
  const { state, applyRecommendation } = useRestaurant();

  // Helper to calculate gross margin
  const getMargin = (price: number, cost: number) => {
    return ((price - cost) / price * 100).toFixed(1);
  };

  return (
    <div className="dashboard-grid">
      
      {/* KPI Stats */}
      <div style={{ gridColumn: 'span 4' }}>
        <GlassCard>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>AVERAGE GROSS MARGIN</span>
          <div style={{ fontSize: '28px', fontWeight: '800', marginTop: '6px', color: 'var(--color-emerald)' }}>
            72.4% <span style={{ fontSize: '12px' }}>Healthy</span>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginTop: '8px' }}>
            Target gross margin range: 70% to 75%.
          </span>
        </GlassCard>
      </div>

      <div style={{ gridColumn: 'span 4' }}>
        <GlassCard>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>BEST PERFORMING CATEGORY</span>
          <div style={{ fontSize: '28px', fontWeight: '800', marginTop: '6px', color: 'var(--color-cyan)' }}>
            Pizzas <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>44% of Rev</span>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginTop: '8px' }}>
            High volume combined with 76% margin at standard cheese prices.
          </span>
        </GlassCard>
      </div>

      <div style={{ gridColumn: 'span 4' }}>
        <GlassCard>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>RECIPE COST DEVIATION</span>
          <div style={{ fontSize: '28px', fontWeight: '800', marginTop: '6px', color: state.avocadoStockRatio > 1.4 ? 'var(--color-orange)' : '#FFFFFF' }}>
            {state.avocadoStockRatio > 1.4 ? '+4.2%' : '0.0%'}
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginTop: '8px' }}>
            Elevated by Avocado rot waste and delayed cheese replenishment.
          </span>
        </GlassCard>
      </div>

      {/* Menu profit matrix */}
      <div style={{ gridColumn: 'span 8' }}>
        <GlassCard>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={16} style={{ color: 'var(--color-cyan)' }} />
            <span>Menu Profitability Matrix</span>
          </h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>
                  <th style={{ padding: '12px 8px' }}>Menu Item</th>
                  <th style={{ padding: '12px 8px' }}>Category</th>
                  <th style={{ padding: '12px 8px' }}>Sale Price</th>
                  <th style={{ padding: '12px 8px' }}>COGS (Cost)</th>
                  <th style={{ padding: '12px 8px' }}>Gross Margin</th>
                  <th style={{ padding: '12px 8px' }}>Wastage Cost</th>
                </tr>
              </thead>
              <tbody>
                {MENU_ITEMS.map(item => {
                  let wasteRatio = 'Normal';
                  let wasteColor = 'var(--text-secondary)';
                  
                  if (item.id === 'm3' && state.avocadoStockRatio > 1.4) {
                    wasteRatio = 'High Waste (Rot)';
                    wasteColor = 'var(--color-orange)';
                  }
                  if (item.id === 'm1' && state.cheeseStockRatio < 0.6) {
                    wasteRatio = 'Out of Stock Delay';
                    wasteColor = 'var(--color-red)';
                  }

                  return (
                    <tr key={item.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#FFFFFF' }}>{item.name}</td>
                      <td style={{ padding: '12px 8px', color: 'var(--text-secondary)' }}>{item.category}</td>
                      <td style={{ padding: '12px 8px' }}>₹{item.price}</td>
                      <td style={{ padding: '12px 8px' }}>₹{item.cost}</td>
                      <td style={{ padding: '12px 8px', fontWeight: '700', color: 'var(--color-emerald)' }}>
                        {getMargin(item.price, item.cost)}%
                      </td>
                      <td style={{ padding: '12px 8px', color: wasteColor, fontWeight: wasteRatio !== 'Normal' ? '600' : '400' }}>
                        {wasteRatio}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>

      {/* Side insights panel (Col 4) */}
      <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {state.avocadoStockRatio > 1.4 && (
          <GlassCard style={{ borderLeft: '3px solid var(--color-orange)', background: 'rgba(255,159,10,0.02)' }}>
            <h4 style={{ color: 'var(--color-orange)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <AlertTriangle size={14} /> Avocado Promo Trigger
            </h4>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              Avocados representing ₹8,400 in spoilage costs are sitting in storage. Launching a Chef Special pushes stock out before expiration.
            </p>
            <button
              onClick={() => applyRecommendation('alert-avocado')}
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
              Deploy Guacamole Promo Special
            </button>
          </GlassCard>
        )}

        <GlassCard>
          <h4 style={{ fontSize: '14px', color: '#FFFFFF', marginBottom: '10px' }}>COGS Inflation Index</h4>
          <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--text-secondary)' }}>
            <p>Recipe costs are monitored daily against vendor wholesale price sheets.</p>
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '8px', marginTop: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span>Dairy Whole-sale:</span>
                <span style={{ color: '#FFFFFF' }}>+1.5%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span>Poultry Whole-sale:</span>
                <span style={{ color: '#FFFFFF' }}>-0.4%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Produce Whole-sale:</span>
                <span style={{ color: '#FFFFFF' }}>+2.8%</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

    </div>
  );
};
