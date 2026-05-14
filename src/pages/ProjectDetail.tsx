import { useParams, Link } from 'react-router-dom';
import { projects } from '@/data/projects';

function getSourceUrl(project: typeof projects[number]) {
  return project.githubBackend ?? project.githubFrontend;
}

function normalizeDescription(text: string) {
  return text.replace(/\s+/g, ' ').trim();
}

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <main className="project-detail-page project-detail-empty">
        <h1>404</h1>
        <p>Project not found.</p>
        <Link to="/#projects" className="btn-primary">Back to Projects</Link>
      </main>
    );
  }

  const sourceUrl = getSourceUrl(project);

  return (
    <main className="project-detail-page">
      <div className="project-detail-shell">
        <Link to="/#projects" className="project-detail-back">Back to Projects</Link>

        <div className={`project-detail-visual project-visual-${project.id}`} aria-hidden="true">
          <div className="project-visual-panel">
            <span className="project-visual-kicker">{project.title}</span>
            <div className="project-visual-lines">
              <span />
              <span />
              <span />
            </div>
            <div className="project-visual-chart">
              <span style={{ height: '34%' }} />
              <span style={{ height: '58%' }} />
              <span style={{ height: '46%' }} />
              <span style={{ height: '74%' }} />
              <span style={{ height: '62%' }} />
            </div>
          </div>
        </div>

        <div className="project-detail-layout">
          <article className="project-detail-main">
            <header className="project-detail-heading">
              <h1>{project.title}</h1>
              <p>{project.shortDescription}</p>
            </header>

            <section className="project-detail-section">
              <h2>About This Project</h2>
              <p>{normalizeDescription(project.fullDescription)}</p>
            </section>

            <section className="project-detail-section">
              <h2>Key Features</h2>
              <ul className="project-feature-list">
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </section>
          </article>

          <aside className="project-info-panel" aria-label="Project info">
            <h2>Project Info</h2>
            <div className="project-info-block">
              <h3>Technologies Used</h3>
              <div className="project-info-tags">
                {project.techStack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>

            <div className="project-info-actions">
              {sourceUrl && (
                <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="project-info-action primary">
                  View Source Code
                </a>
              )}
              {project.githubBackend && project.githubFrontend && (
                <a href={project.githubFrontend} target="_blank" rel="noopener noreferrer" className="project-info-action secondary">
                  Frontend Code
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-info-action secondary">
                  Live Demo
                </a>
              )}
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="project-info-action secondary">
                  Demo
                </a>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
