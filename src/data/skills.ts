export interface SkillCategory {
  id: string;
  title: string;
  icon: string; // emoji or unicode
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'backend',
    title: 'Backend',
    icon: '⚙️',
    skills: [
      'Java Spring Boot',
      'REST APIs',
      'SOAP Integration',
      'XML/JSON Processing',
      'Windows Services',
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: '🎨',
    skills: [
      'React',
      'TypeScript',
      'HTML & CSS',
      'Nginx',
      'IIS',
    ],
  },
  {
    id: 'database',
    title: 'Database',
    icon: '🗄️',
    skills: [
      'MSSQL',
      'PostgreSQL',
      'SQL Server',
      'Query Writing',
      'Reporting',
    ],
  },
  {
    id: 'devops',
    title: 'DevOps & Tools',
    icon: '🚀',
    skills: [
      'Git & GitHub',
      'Deployment',
      'SSL Certificates',
      'Debugging',
      'Linux/Ubuntu',
      'Windows Server',
    ],
  },
];
