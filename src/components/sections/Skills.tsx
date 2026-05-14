import { skillCategories } from '@/data/skills';
import { SectionWrapper } from '@/components/layout/SectionWrapper';

const categoryMarks: Record<string, string> = {
  backend: 'BE',
  frontend: 'FE',
  database: 'DB',
  devops: 'DO',
};

const skillMarks: Record<string, string> = {
  'Java Spring Boot': 'SB',
  'REST APIs': 'API',
  'SOAP Integration': 'SOAP',
  'XML/JSON Processing': '{}',
  'Windows Services': 'WIN',
  React: 'R',
  TypeScript: 'TS',
  'HTML & CSS': '</>',
  Nginx: 'NX',
  IIS: 'IIS',
  MSSQL: 'MS',
  PostgreSQL: 'PG',
  'SQL Server': 'SQL',
  'Query Writing': 'Q',
  Reporting: 'REP',
  'Git & GitHub': 'GIT',
  Deployment: 'DEP',
  'SSL Certificates': 'SSL',
  Debugging: 'DBG',
  'Linux/Ubuntu': 'UX',
  'Windows Server': 'WS',
};

export function Skills() {
  return (
    <SectionWrapper id="skills" minHeight="100vh">
      <div className="section-content-left skills-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh' }}>
        <div className="animate-in skills-heading">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-primary)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>02 / Skills</span>
          <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 700, color: '#fff', marginTop: '8px', letterSpacing: '-0.02em' }}>Tech Stack</h2>
        </div>

        <div className="skills-grid">
          {skillCategories.map((cat) => (
            <div key={cat.id} className="animate-in glass-card skill-card">
              <div className="skill-card-heading">
                <span className={`skill-category-mark ${cat.id}`}>{categoryMarks[cat.id] ?? cat.title.slice(0, 2).toUpperCase()}</span>
                <h3>{cat.title}</h3>
              </div>
              <div className="skill-pill-list">
                {cat.skills.map((skill) => (
                  <span key={skill} className="pill-tag skill-pill">
                    <span className={`skill-pill-icon ${cat.id}`}>{skillMarks[skill] ?? skill.slice(0, 2).toUpperCase()}</span>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
