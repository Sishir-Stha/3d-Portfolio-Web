import { useParams, Link } from 'react-router-dom';
import { projects } from '@/data/projects';

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '24px', background: 'var(--color-bg-base)', color: 'var(--color-text-primary)' }}>
        <h1 style={{ fontFamily: 'var(--font-headline)', fontSize: '48px', fontWeight: 700, color: 'var(--color-primary)' }}>404</h1>
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}>Project not found.</p>
        <Link to="/" className="btn-primary">← Back Home</Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-base)', color: 'var(--color-text-primary)' }}>
      {/* Top nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '0 48px', height: '60px', display: 'flex', alignItems: 'center', background: 'rgba(14,19,34,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <Link to="/" style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: '18px', color: 'var(--color-primary)', textDecoration: 'none' }}>
          SS<span style={{ color: 'var(--color-secondary)' }}>.</span>
        </Link>
        <span style={{ margin: '0 16px', color: 'var(--color-outline-variant)' }}>/</span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-text-secondary)' }}>{project.title}</span>
        <Link to="/" style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--color-text-muted)', textDecoration: 'none' }}>← Back</Link>
      </nav>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '100px 32px 64px' }}>
        {/* Title */}
        <h1 style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 800, color: '#fff', marginBottom: '12px', letterSpacing: '-0.03em' }}>{project.title}</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', color: 'var(--color-text-secondary)', marginBottom: '32px', lineHeight: 1.6 }}>{project.shortDescription}</p>

        {/* Tech pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
          {project.techStack.map((t) => <span key={t} className="pill-tag">{t}</span>)}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '48px', flexWrap: 'wrap' }}>
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">Live Site ↗</a>}
          {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">Demo ↗</a>}
          {project.githubBackend && <a href={project.githubBackend} target="_blank" rel="noopener noreferrer" className="btn-secondary">GitHub Backend ↗</a>}
          {project.githubFrontend && <a href={project.githubFrontend} target="_blank" rel="noopener noreferrer" className="btn-secondary">GitHub Frontend ↗</a>}
        </div>

        {/* Full description */}
        <div className="glass-card" style={{ padding: '32px' }}>
          <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: '20px', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '16px' }}>About this project</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--color-text-secondary)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{project.fullDescription}</p>
        </div>

        {/* Back */}
        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <Link to="/#projects" className="btn-secondary">← All Projects</Link>
        </div>
      </div>
    </div>
  );
}
