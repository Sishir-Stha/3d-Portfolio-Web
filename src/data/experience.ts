export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  type: 'full-time' | 'internship';
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    id: 'yeti-senior',
    company: 'Yeti Airlines Ltd',
    role: 'Senior IT Assistant — IT Department',
    period: 'Dec 2023 — Present',
    type: 'full-time',
    highlights: [
      'Maintain live and UAT SQL Server environments, including backup, restore, and mirror database operations across on-cloud and offline systems.',
      'Generate operational reports using advanced SQL queries and handle daily DBA troubleshooting.',
      'Monitor Cloudflare for DDoS attack mitigation and manage cache handling for production services.',
      'Lead API server integration processes for client and vendor communication.',
      'Work on new system projects, API integrations, and cross-department coordination.',
      'Collaborate with team members on development and maintenance of existing systems.',
    ],
  },
  {
    id: 'yeti-intern',
    company: 'Yeti Airlines Ltd',
    role: 'IT Intern — Development Team',
    period: 'Jun 2023 — Nov 2023',
    type: 'internship',
    highlights: [
      'Supported SQL and Java development tasks during the internship period.',
      'Built a scanner system and generated reports using Microsoft Visual Studio.',
      'Completed Java programming assignments as part of the internship program.',
    ],
  },
];
