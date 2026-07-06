import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { GlassCard } from '../components/common/GlassCard';
import { FileText, Download } from 'lucide-react';

export const ExecutiveReports: React.FC = () => {
  const { metrics, state } = useRestaurant();
  const [generating, setGenerating] = useState(false);
  const [reportText, setReportText] = useState<string | null>(null);

  // Currency Formatter
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleGenerate = (_type: string) => {
    setGenerating(true);
    setReportText(null);

    setTimeout(() => {
      setGenerating(false);
      setReportText(`
FLOWLENS AI OPERATIONAL INTELLIGENCE REPORT
Branch: ${state.branchName}
Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
===================================================

OPERATIONAL METRICS
-------------------
• Total Daily Revenue: ${formatCurrency(metrics.revenueTotal)}
• Active Tickets: ${metrics.ordersCount}
• Average Recipe Spoilage: ${formatCurrency(metrics.wasteCost)}
• Average KDS Prep Time: ${Math.round(metrics.averagePrepTime / 60)} minutes
• Average Delivery Transit: ${metrics.averageDeliveryTime} minutes
• Guest Review Rating: ${metrics.customerSatisfaction} / 5.0

AI COO ASSESSMENT:
------------------
${metrics.averagePrepTime > 780 ? 'WARNING: Pizza oven station bottlenecks detected. Add one chef.' : 'Optimal kitchen performance.'}
${metrics.averageDeliveryTime > 32 ? 'WARNING: Delivery times exceed 30m target SLA in North Zone. Reallocate riders.' : 'Optimal rider logistics SLA.'}
${state.cheeseStockRatio < 0.6 ? 'CRITICAL: Cheese stock depleted. Restock safety reserves immediately.' : 'Cheese levels normal.'}
${state.avocadoStockRatio > 1.4 ? 'WARNING: High avocado decay wastage recorded. Promote special items.' : 'Wastage levels optimal.'}

EXPECTED COMPLIANCE TARGETS MET: 94.2%
===================================================
      `);
    }, 1500);
  };

  return (
    <div className="dashboard-grid">
      
      {/* Selector side (Col 4) */}
      <div style={{ gridColumn: 'span 4' }}>
        <GlassCard>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={16} style={{ color: 'var(--color-cyan)' }} />
            <span>Generate Executive Reports</span>
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '20px' }}>
            Select a template category to compile active restaurant parameters, KDS logs, and AI COO recommendations.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { id: 'daily', name: 'Daily COO Summary' },
              { id: 'kitchen', name: 'KDS & Station Velocity logs' },
              { id: 'waste', name: 'Ingredient Spoilage Ledger' }
            ].map(type => (
              <button
                key={type.id}
                onClick={() => handleGenerate(type.name)}
                disabled={generating}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border-subtle)',
                  padding: '12px',
                  borderRadius: '8px',
                  textAlign: 'left',
                  fontSize: '13px',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.borderColor = 'var(--border-active)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)';
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                }}
              >
                {type.name}
              </button>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Generated Preview side (Col 8) */}
      <div style={{ gridColumn: 'span 8' }}>
        <GlassCard style={{ height: '100%', minHeight: '300px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#FFFFFF' }}>Report Console Preview</h3>
            {reportText && (
              <button
                style={{
                  background: 'rgba(0, 229, 255, 0.08)',
                  border: '1px solid rgba(0, 229, 255, 0.2)',
                  color: 'var(--color-cyan)',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Download size={12} /> Download PDF
              </button>
            )}
          </div>

          <div style={{
            flex: 1,
            background: '#050505',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            padding: '16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--text-secondary)',
            whiteSpace: 'pre-wrap',
            overflowY: 'auto',
            display: 'flex',
            justifyContent: reportText ? 'flex-start' : 'center',
            alignItems: reportText ? 'flex-start' : 'center'
          }}>
            {generating ? (
              <div style={{ textAlign: 'center' }}>
                <span className="dot-typing" style={{ left: '0', display: 'inline-block', margin: '8px 0' }} />
                <div style={{ marginTop: '16px', color: 'var(--text-muted)' }}>Compiling operational variables...</div>
              </div>
            ) : reportText ? (
              reportText
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                <FileText size={32} style={{ marginBottom: '12px', display: 'block', margin: '0 auto var(--margin)' }} />
                <span>No active reports compiled. Select a template.</span>
              </div>
            )}
          </div>
        </GlassCard>
      </div>

    </div>
  );
};
