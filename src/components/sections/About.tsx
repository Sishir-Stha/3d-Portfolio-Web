import { profile } from '@/data/profile';
import { SectionWrapper } from '@/components/layout/SectionWrapper';

export function About() {
  return (
    <SectionWrapper id="about" minHeight="100vh">
      {/* Content RIGHT — avatar is LEFT at x:28% */}
      <div className="section-content-right about-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh' }}>
        <div className="animate-in" style={{ marginBottom: '48px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-primary)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>01 / About</span>
          <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 700, color: '#fff', marginTop: '8px', letterSpacing: '-0.02em' }}>Who I Am</h2>
        </div>

        <div className="animate-in glass-card" style={{ padding: '32px', marginBottom: '32px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>{profile.summary}</p>
        </div>

        <div className="animate-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {[
            { label: 'Location', value: profile.location, icon: '📍' },
            { label: 'Email', value: profile.email, icon: '✉️' },
            { label: 'Degree', value: 'B.Sc. IT — Texas College', icon: '🎓' },
            { label: 'Status', value: 'Open to opportunities', icon: '💼' },
          ].map((f) => (
            <div key={f.label} className="glass-card" style={{ padding: '20px 24px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ fontSize: '18px', marginTop: '2px' }}>{f.icon}</span>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>{f.label}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-text-primary)', wordBreak: 'break-all' }}>{f.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
