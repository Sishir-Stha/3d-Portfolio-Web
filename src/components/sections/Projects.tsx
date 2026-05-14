import { useNavigate } from 'react-router-dom';
import { projects } from '@/data/projects';
import { SectionWrapper } from '@/components/layout/SectionWrapper';

function ProjectCard({ project, compact = false }: { project: typeof projects[0]; compact?: boolean }) {
  const navigate = useNavigate();
  return (
    <div id={`project-card-${project.id}`} onClick={() => navigate(`/projects/${project.slug}`)} style={{ cursor: 'pointer' }}>
      <div className="glass-card" style={{ padding: compact ? '20px 24px' : '28px', height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: compact ? '15px' : '18px', fontWeight: 600, color: '#fff' }}>{project.title}</h3>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.6, flex: 1 }}>{project.shortDescription}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {project.techStack.slice(0, compact ? 3 : 5).map((t) => <span key={t} className="pill-tag" style={{ fontSize: '11px', padding: '2px 8px' }}>{t}</span>)}
          {project.techStack.length > (compact ? 3 : 5) && <span className="pill-tag" style={{ fontSize: '11px', padding: '2px 8px' }}>+{project.techStack.length - (compact ? 3 : 5)}</span>}
        </div>
        <div style={{ display: 'flex', gap: '12px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.05)' }} onClick={(e) => e.stopPropagation()}>
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-primary)', textDecoration: 'none' }}>Live ↗</a>}
          {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-secondary)', textDecoration: 'none' }}>Demo ↗</a>}
          {project.githubBackend && <a href={project.githubBackend} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-text-muted)', textDecoration: 'none' }}>GitHub ↗</a>}
          <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-primary)', opacity: 0.6 }}>View →</span>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <SectionWrapper id="projects" minHeight="100vh">
      {/* Content CENTER-BOTTOM — avatar is CENTER at x:50% */}
      <div className="section-content-center" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh' }}>
        <div className="animate-in" style={{ marginBottom: '48px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-primary)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>04 / Projects</span>
          <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 700, color: '#fff', marginTop: '8px', letterSpacing: '-0.02em' }}>Selected Work</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {featured.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
        {rest.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${rest.length}, 1fr)`, gap: '20px', marginTop: '20px' }}>
            {rest.map((p) => <ProjectCard key={p.id} project={p} compact />)}
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
