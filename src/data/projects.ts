export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  techStack: string[];
  githubFrontend?: string;
  githubBackend?: string;
  liveUrl?: string;
  demoUrl?: string;
  status: 'public' | 'private';
  featured: boolean;
  features: string[];
}

export const projects: Project[] = [
  {
    id: 'findash',
    slug: 'findash',
    title: 'FinDash',
    shortDescription: 'Personal finance platform for income, expense tracking, reporting, and analytics.',
    fullDescription: `Built a comprehensive personal finance management platform that enables users to 
track income and expenses, generate detailed financial reports, and view analytics dashboards. 
The frontend was developed in React with TypeScript for type safety and developer experience, 
while the backend runs on Java Spring Boot (Java 17) with PostgreSQL for robust data management. 
Deployed on AWS Ubuntu using Nginx as a reverse proxy and maintained with Git/GitHub.`,
    techStack: ['React', 'TypeScript', 'Java Spring Boot', 'Java 17', 'PostgreSQL', 'AWS', 'Nginx', 'Git'],
    githubFrontend: 'https://github.com/Sishir-Stha/Finance-Manager.git',
    status: 'public',
    featured: true,
    features: [
      'Secure account-based finance tracking workflow',
      'Income and expense records with categorized data',
      'Financial reports and analytics dashboard',
      'PostgreSQL-backed persistence for reliable records',
      'AWS Ubuntu deployment with Nginx reverse proxy',
      'Type-safe React frontend built with TypeScript',
    ],
  },
  {
    id: 'flight-info',
    slug: 'flight-information-system',
    title: 'Flight Information System',
    shortDescription: 'Live flight status system for Yeti Airlines — updates website and app in production.',
    fullDescription: `Built a production flight information system that updates live flight status data 
across the Yeti Airlines website and mobile application. The React + TypeScript frontend is 
hosted on Windows Server via IIS, while the Java Spring Boot (Java 21) backend runs as a 
Windows service with MSSQL database. Managed SSL certificate activation, updates, and 
secure HTTPS deployment for the live production environment.`,
    techStack: ['React', 'TypeScript', 'Java Spring Boot', 'Java 21', 'MSSQL', 'IIS', 'Windows Server', 'SSL'],
    status: 'public',
    featured: true,
    features: [
      'Live flight status updates for website and mobile app',
      'Java Spring Boot backend running as a Windows service',
      'MSSQL-backed flight schedule and status data handling',
      'IIS-hosted React dashboard for operational staff',
      'Secure HTTPS deployment with SSL certificate setup',
      'Production use across Yeti Airlines digital systems',
    ],
  },
  {
    id: 'fare-update',
    slug: 'fare-update-system',
    title: 'Fare Update System',
    shortDescription: 'Airline fare management platform for live ticket pricing updates from anywhere.',
    fullDescription: `Developed a fare management platform enabling airline staff to update ticket pricing 
from anywhere, anytime. Built with Java Spring Boot (Java 21), MSSQL, and React + TypeScript. 
The frontend is hosted on IIS and the API runs through IntelliJ on Windows Server. Managed 
secure HTTPS deployment and live system updates for real-world production use.`,
    techStack: ['React', 'TypeScript', 'Java Spring Boot', 'Java 21', 'MSSQL', 'IIS', 'HTTPS'],
    githubFrontend: 'https://github.com/Sishir-Stha/FareUpdaterReact.git',
    githubBackend: 'https://github.com/Sishir-Stha/FareUpdaterApi.git',
    demoUrl: 'https://www.linkedin.com/posts/sishir-shrestha-57a50b1b9_airlinetech-fullstackdeveloper-reactjs-activity-7402006757176381441',
    status: 'public',
    featured: true,
    features: [
      'Role-based fare management for authorized airline staff',
      'Create and update ticket pricing from anywhere',
      'Real-time fare changes for time-sensitive operations',
      'Java Spring Boot API backed by MSSQL',
      'React TypeScript frontend hosted on IIS',
      'Secure HTTPS deployment on Windows Server',
    ],
  },
  {
    id: 'airlines-api',
    slug: 'integrated-airlines-api',
    title: 'Integrated Airlines API',
    shortDescription: 'REST API bridge integrating multiple airline SOAP APIs for fare comparison and booking.',
    fullDescription: `Built a REST API layer that integrates multiple SOAP APIs from different airlines 
for fare comparison and booking. Used Java Spring Boot (Java 21) on the backend and React for 
the frontend. Converted XML to JSON to support API interoperability and smoother integration 
between airline systems.`,
    techStack: ['Java Spring Boot', 'Java 21', 'React', 'REST API', 'SOAP', 'XML/JSON'],
    githubBackend: 'https://github.com/Sishir-Stha/Airline-Booking-System.git',
    status: 'public',
    featured: false,
    features: [
      'REST API bridge over multiple airline SOAP providers',
      'XML to JSON conversion for integration consistency',
      'Fare comparison and booking workflow support',
      'Java Spring Boot backend for API orchestration',
      'React frontend for operational visibility',
      'Designed for multi-airline interoperability',
    ],
  },
  {
    id: 'elearning',
    slug: 'ai-elearning-platform',
    title: 'AI-Integrated E-Learning',
    shortDescription: 'Role-based e-learning platform with AI progress tracking and course discussion.',
    fullDescription: `Built a role-based platform for students, instructors, and admins with progress 
tracking and course discussion features. Used Java Spring Boot (Java 21), React, PostgreSQL, 
and a TinyLlama model trained in Google Colab for AI-powered features. Deployed on Ubuntu 
server and documented the development process in README files.`,
    techStack: ['Java Spring Boot', 'Java 21', 'React', 'PostgreSQL', 'TinyLlama', 'Google Colab', 'Ubuntu'],
    githubFrontend: 'https://github.com/Sishir-Stha/SikaiVerse_Frontend',
    githubBackend: 'https://github.com/Sishir-Stha/SikaiVerse_Api.git',
    liveUrl: 'http://sikaiverse.com',
    status: 'public',
    featured: true,
    features: [
      'Role-based access for students, instructors, and admins',
      'Course progress tracking and discussion workflow',
      'AI-assisted features using a TinyLlama model',
      'PostgreSQL-backed learning data storage',
      'Ubuntu server deployment with documented setup',
      'React frontend connected to Java Spring Boot APIs',
    ],
  },
];
