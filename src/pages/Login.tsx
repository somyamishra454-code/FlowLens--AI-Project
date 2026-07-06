import React, { useState, useEffect } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Sparkles, ArrowRight, Shield, Zap, BarChart3 } from 'lucide-react';

const FEATURES = [
  { icon: Zap,        title: 'Real-time AI COO',      desc: 'Continuous monitoring across every operational layer' },
  { icon: BarChart3,  title: 'Predictive Intelligence', desc: 'ML-powered forecasts with 91.8% model confidence' },
  { icon: Shield,     title: 'Decision Automation',   desc: 'Ranked actions by revenue impact and confidence' },
];

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 1 + Math.random() * 2.5,
  dur: 4 + Math.random() * 6,
  delay: Math.random() * 4,
}));

export const Login: React.FC = () => {
  const { setActiveView } = useRestaurant();
  const [email, setEmail] = useState('operator@flowlens.ai');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setActiveView('dashboard');
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#000',
      display: 'flex',
      overflow: 'hidden',
    }}>
      {/* Left panel */}
      <div style={{
        flex: '0 0 52%',
        background: 'linear-gradient(145deg, #050505 0%, #0a0a0a 50%, #080808 100%)',
        borderRight: '1px solid var(--border-0)',
        display: 'flex',
        flexDirection: 'column',
        padding: '48px 56px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Grid dot background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          pointerEvents: 'none',
        }} />

        {/* Floating particles */}
        {PARTICLES.map(p => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: '50%',
              background: 'rgba(6,182,212,0.35)',
              animation: `glowPulse-cyan ${p.dur}s ${p.delay}s ease-in-out infinite`,
              pointerEvents: 'none',
            }}
          />
        ))}

        {/* Glow orb */}
        <div style={{
          position: 'absolute',
          width: '480px',
          height: '480px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)',
          top: '-100px',
          left: '-80px',
          pointerEvents: 'none',
        }} />

        {/* Brand */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'none' : 'translateY(-12px)',
          transition: 'all 0.6s var(--ease-spring)',
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.5) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '900',
            color: '#000',
            fontSize: '13px',
            letterSpacing: '-0.03em',
            boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
          }}>
            FL
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#fff', letterSpacing: '-0.03em' }}>FlowLens AI</div>
            <div style={{ fontSize: '10px', color: 'var(--text-3)', marginTop: '1px' }}>Enterprise Operations Platform</div>
          </div>
        </div>

        {/* Hero text */}
        <div style={{
          marginTop: 'auto',
          marginBottom: 'auto',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'none' : 'translateY(20px)',
          transition: 'all 0.7s var(--ease-spring) 0.1s',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--cyan-dim)',
            border: '1px solid rgba(6,182,212,0.2)',
            borderRadius: '999px',
            padding: '5px 12px',
            fontSize: '11px',
            fontWeight: '600',
            color: 'var(--cyan)',
            marginBottom: '24px',
          }}>
            <span className="dot-live cyan" style={{ width: '5px', height: '5px' }} />
            AI COO — Live monitoring active
          </div>

          <h1 style={{
            fontSize: '44px',
            fontWeight: '800',
            letterSpacing: '-0.05em',
            color: '#fff',
            lineHeight: 1.1,
            marginBottom: '18px',
          }}>
            See Problems<br />
            <span style={{
              background: 'linear-gradient(90deg, var(--cyan) 0%, rgba(6,182,212,0.6) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Before They Cost
            </span>
            <br />You Money.
          </h1>

          <p style={{
            fontSize: '15px',
            color: 'var(--text-2)',
            lineHeight: 1.7,
            maxWidth: '380px',
          }}>
            FlowLens AI monitors your entire restaurant operation in real time — kitchen velocity, inventory health, delivery SLAs, and customer sentiment — then ranks the actions that protect your revenue.
          </p>
        </div>

        {/* Feature list */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'none' : 'translateY(16px)',
          transition: 'all 0.8s var(--ease-spring) 0.25s',
        }}>
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--border-1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon size={14} style={{ color: 'var(--cyan)' }} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-1)' }}>{f.title}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-3)' }}>{f.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right panel — login form */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px',
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'none' : 'translateX(24px)',
        transition: 'all 0.7s var(--ease-spring) 0.15s',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '380px',
        }}>
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: '700', color: '#fff', letterSpacing: '-0.04em', marginBottom: '6px' }}>
              Welcome back
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-3)' }}>
              Sign in to your FlowLens workspace
            </p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Email */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '6px' }}>
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--border-1)',
                  borderRadius: '8px',
                  padding: '11px 14px',
                  fontSize: '13px',
                  color: 'var(--text-1)',
                  outline: 'none',
                  transition: 'border-color var(--t-fast)',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--border-2)'}
                onBlur={e => e.target.style.borderColor = 'var(--border-1)'}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '6px' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter any password to demo"
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--border-1)',
                  borderRadius: '8px',
                  padding: '11px 14px',
                  fontSize: '13px',
                  color: 'var(--text-1)',
                  outline: 'none',
                  transition: 'border-color var(--t-fast)',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--border-2)'}
                onBlur={e => e.target.style.borderColor = 'var(--border-1)'}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-lg"
              style={{
                width: '100%',
                marginTop: '8px',
                padding: '13px',
                fontSize: '14px',
                fontWeight: '650',
                gap: '8px',
                opacity: loading ? 0.75 : 1,
              }}
            >
              {loading ? (
                <>
                  <span className="typing-dot" style={{ background: '#000' }} />
                  <span className="typing-dot" style={{ background: '#000' }} />
                  <span className="typing-dot" style={{ background: '#000' }} />
                  Signing in...
                </>
              ) : (
                <>
                  Access Dashboard
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Demo shortcut */}
          <button
            onClick={() => setActiveView('dashboard')}
            style={{
              width: '100%',
              marginTop: '12px',
              background: 'transparent',
              border: '1px solid var(--border-0)',
              borderRadius: '8px',
              padding: '10px',
              fontSize: '12px',
              color: 'var(--text-3)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all var(--t-fast)',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-1)'; e.currentTarget.style.color = 'var(--text-1)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-0)'; e.currentTarget.style.color = 'var(--text-3)'; }}
          >
            <Sparkles size={12} style={{ color: 'var(--cyan)' }} />
            Skip to live demo dashboard
          </button>

          <p style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-4)', marginTop: '24px' }}>
            Demo instance — data is simulated. No real credentials needed.
          </p>
        </div>
      </div>
    </div>
  );
};
