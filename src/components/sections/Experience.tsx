import { experiences } from '@/data/experience';
import { SectionWrapper } from '@/components/layout/SectionWrapper';

export function Experience() {
  return (
    <SectionWrapper id="experience" minHeight="100vh">
      {/* Content RIGHT — avatar is LEFT at x:28% */}
      <div className="section-content-right" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh' }}>
        <div className="animate-in" style={{ marginBottom: '48px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-primary)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>03 / Experience</span>
          <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 700, color: '#fff', marginTop: '8px', letterSpacing: '-0.02em' }}>Work History</h2>
        </div>

        <div style={{ position: 'relative', paddingLeft: '48px' }}>
          <div className="timeline-line" />
          {experiences.map((exp, idx) => (
            <div key={exp.id} className="animate-in" style={{ position: 'relative', marginBottom: idx < experiences.length - 1 ? '40px' : 0 }}>
              <div className="timeline-dot" style={{ top: '18px' }} />
              <div className="glass-card" style={{ padding: '28px 32px' }}>
                {exp.type === 'internship' && (
                  <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: '9999px', background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-secondary)', marginBottom: '10px', letterSpacing: '0.05em' }}>Internship</span>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                  <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '18px', fontWeight: 600, color: '#fff', letterSpacing: '-0.01em' }}>{exp.role}</h3>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-primary)', whiteSpace: 'nowrap' }}>{exp.period}</span>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-secondary)', fontWeight: 500, marginBottom: '16px' }}>{exp.company}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {exp.highlights.map((hl, i) => (
                    <li key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6, paddingLeft: '16px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: 'var(--color-primary-vivid)', fontFamily: 'var(--font-mono)' }}>›</span>
                      {hl}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
