import { profile } from '@/data/profile';
import { SectionWrapper } from '@/components/layout/SectionWrapper';

export function Hero() {
  return (
    <SectionWrapper id="hero" className="hero-section" minHeight="min(900px, 100vh)">
      {/* Content LEFT — avatar is RIGHT at x:70% */}
      <div className="section-content-left hero-content">
        {/* Status badge */}
        <div className="animate-in" style={{ marginBottom: '24px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 14px', background: 'rgba(245,158,11,0.08)',
            border: '1px solid rgba(245,158,11,0.2)', borderRadius: '9999px',
            fontSize: '13px', fontFamily: 'var(--font-mono)', color: 'var(--color-primary)', letterSpacing: '0.05em',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px rgba(74,222,128,0.6)' }} />
            Available for opportunities
          </span>
        </div>

        <h1 className="animate-in" style={{
          fontFamily: 'var(--font-headline)', fontSize: 'clamp(40px, 5vw, 72px)',
          fontWeight: 800, color: '#ffffff', lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: '12px',
        }}>
          {profile.name.split(' ')[0]}{' '}
          <span style={{ color: 'var(--color-primary)' }}>{profile.name.split(' ')[1]}</span>
        </h1>

        <p className="animate-in" style={{
          fontFamily: 'var(--font-headline)', fontSize: 'clamp(16px, 2vw, 22px)',
          fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: '20px', letterSpacing: '-0.01em',
        }}>
          {profile.role}
        </p>

        <p className="animate-in" style={{
          fontFamily: 'var(--font-body)', fontSize: 'clamp(14px, 1.4vw, 18px)',
          color: 'var(--color-text-muted)', maxWidth: '540px', lineHeight: 1.6, marginBottom: '34px',
        }}>
          {profile.tagline}
        </p>

        <div className="animate-in" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a href="/Sishir_Shrestha_CV.pdf" download className="btn-primary" id="hero-cta-cv">Download CV <span>↓</span></a>
          <a href="#contact" className="btn-secondary" id="hero-cta-contact">Contact Me</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn-secondary" id="hero-cta-github">GitHub ↗</a>
        </div>

        <div className="animate-in" style={{
          display: 'flex', gap: 'clamp(18px, 3vw, 32px)', marginTop: '40px', paddingTop: '24px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          flexWrap: 'wrap',
        }}>
          {[
            { label: 'Production Systems', value: '3+' },
            { label: 'Years Experience', value: '2+' },
            { label: 'Tech Stack', value: 'Java · React · SQL' },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: 'var(--font-headline)', fontSize: '22px', fontWeight: 700, color: 'var(--color-primary)', lineHeight: 1, marginBottom: '4px' }}>{s.value}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-text-muted)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
