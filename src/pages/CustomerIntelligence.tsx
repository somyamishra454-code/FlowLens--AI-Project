import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { GlassCard } from '../components/common/GlassCard';
import { Star, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';

export const CustomerIntelligence: React.FC = () => {
  const { reviews, metrics } = useRestaurant();

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'var(--color-emerald)';
      case 'neutral': return 'var(--text-secondary)';
      case 'negative': return 'var(--color-red)';
      default: return '#FFFFFF';
    }
  };

  return (
    <div className="dashboard-grid">
      
      {/* Metrics Row */}
      <div style={{ gridColumn: 'span 4' }}>
        <GlassCard style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Star size={36} style={{ color: 'var(--color-orange)', fill: 'var(--color-orange)' }} />
          <div>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block' }}>SATISFACTION RATING</span>
            <span style={{ fontSize: '24px', fontWeight: '800', color: '#FFFFFF' }}>
              {metrics.customerSatisfaction} / 5.0
            </span>
          </div>
        </GlassCard>
      </div>

      <div style={{ gridColumn: 'span 4' }}>
        <GlassCard style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <ThumbsUp size={36} style={{ color: 'var(--color-emerald)' }} />
          <div>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block' }}>POSITIVE SENTIMENT</span>
            <span style={{ fontSize: '24px', fontWeight: '800', color: '#FFFFFF' }}>
              {metrics.customerSatisfaction >= 4.5 ? '88%' : metrics.customerSatisfaction >= 4.2 ? '79%' : '64%'}
            </span>
          </div>
        </GlassCard>
      </div>

      <div style={{ gridColumn: 'span 4' }}>
        <GlassCard style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <ThumbsDown size={36} style={{ color: 'var(--color-red)' }} />
          <div>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block' }}>COMPLAINT RATIO</span>
            <span style={{ fontSize: '24px', fontWeight: '800', color: '#FFFFFF' }}>
              {metrics.customerSatisfaction >= 4.5 ? '4.2%' : metrics.customerSatisfaction >= 4.2 ? '9.5%' : '18.4%'}
            </span>
          </div>
        </GlassCard>
      </div>

      {/* Review Log Stream */}
      <div style={{ gridColumn: 'span 8' }}>
        <GlassCard>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MessageSquare size={16} style={{ color: 'var(--color-cyan)' }} />
            <span>Real-Time Guest Feedback Logs</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {reviews.map(review => (
              <div 
                key={review.id}
                style={{
                  padding: '16px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: '700', color: '#FFFFFF', fontSize: '13px' }}>{review.customerName}</span>
                    <span style={{
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontWeight: '600',
                      background: `${getSentimentColor(review.sentiment)}15`,
                      color: getSentimentColor(review.sentiment)
                    }}>
                      {review.sentiment}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star 
                        key={star} 
                        size={12} 
                        style={{ 
                          color: star <= review.rating ? 'var(--color-orange)' : 'var(--text-dim)',
                          fill: star <= review.rating ? 'var(--color-orange)' : 'none'
                        }} 
                      />
                    ))}
                  </div>
                </div>

                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  "{review.comment}"
                </p>

                {review.deliveryZone && (
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Fulfillment: {review.deliveryZone} Delivery
                  </span>
                )}
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Sentiment Analysis distribution sidebar (Col 4) */}
      <div style={{ gridColumn: 'span 4' }}>
        <GlassCard style={{ height: '100%' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#FFFFFF', marginBottom: '16px' }}>Sentiment Breakdowns</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '12px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span>Positive Reviews:</span>
                <span style={{ color: 'var(--color-emerald)', fontWeight: '600' }}>76%</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.03)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '76%', height: '100%', background: 'var(--color-emerald)' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span>Neutral Feedback:</span>
                <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>14%</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.03)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '14%', height: '100%', background: 'var(--text-secondary)' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span>Negative Complaints:</span>
                <span style={{ color: 'var(--color-red)', fontWeight: '600' }}>10%</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.03)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '10%', height: '100%', background: 'var(--color-red)' }} />
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

    </div>
  );
};
