import { Profile, SkillGroup, Project, Company } from "./types";

export const profile: Profile = {
  name: "Boubacar Mounkaila",
  role: "Fullstack Developer",
  photo: "/image/profile.jpeg",
  about:
    "Fullstack Developer avec 5 ans d'expérience dans le développement web et applicatif. Mes solides compétences dans ce domaine m'ont permis d'obtenir d'excellents résultats dans mes projets.",
  location: "Niamey, Niger",
  email: "mounkaila144@gmail.com",
  phone: "+227 99777199",
  github: "https://github.com/mounkaila144",
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Langages",
    items: [
      { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    ]
  },
  {
    title: "Frameworks",
    items: [
      { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg" },
      { name: "Symfony", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/symfony/symfony-original.svg" },
      { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "Vue.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    ]
  },
  {
    title: "UI/Design",
    items: [
      { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
      { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
      { name: "Sass", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" },
      { name: "JQuery", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg" },
      { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    ]
  },
  {
    title: "Databases",
    items: [
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    ]
  },
  {
    title: "Outils",
    items: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    ]
  },
];

export const companies: Company[] = [
  {
    id: "freelance",
    name: "Freelance",
    role: "Développeur Full-Stack",
    years: "2018–Présent",
    logo: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=600&auto=format&fit=crop",
    desc: "Réalisation de projets web et mobiles sur mesure, gestion complète de projets, support technique et relation client.",
    site: "#",
  },
  {
    id: "icall",
    name: "Icall",
    role: "Maintenance CRM",
    years: "2022–2024",
    logo: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop",
    desc: "Gestion des mises à jour et correctifs logiciels, formation des utilisateurs, analyse des besoins clients et propositions d'améliorations.",
    site: "#",
  },
  {
    id: "ptr-niger",
    name: "PTR-Niger",
    role: "Développeur Frontend / Designer",
    years: "2020–2021",
    logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
    desc: "Création de sites web responsives et optimisés SEO avec React, conception d'interfaces utilisateurs attractives et de maquettes.",
    site: "#",
  },
  {
    id: "idev-niger",
    name: "iDev Niger",
    role: "Développeur Web Laravel",
    years: "2018–2020",
    logo: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=600&auto=format&fit=crop",
    desc: "Réalisation de projets innovants et technologiques, conception d'applications, collaboration avec des équipes pluridisciplinaires.",
    site: "#",
  },
];

export const projects: Project[] = [
  {
    id: "crm-icall",
    title: "Système CRM Entreprise",
    company: "Icall",
    kind: "Entreprise",
    year: "2022–2024",
    cover:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    description:
      "Maintenance et optimisation d'un système CRM complet. Gestion des mises à jour, formation des utilisateurs et amélioration des fonctionnalités selon les besoins clients.",
    tags: ["PHP", "MySQL", "JavaScript", "CRM"],
    links: { site: "#", repo: "#" },
  },
  {
    id: "webapp-ptr",
    title: "Sites Web Responsives",
    company: "PTR-Niger",
    kind: "Entreprise",
    year: "2020–2021",
    cover:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1200&auto=format&fit=crop",
    description:
      "Création de multiples sites web responsives et optimisés SEO avec React. Conception d'interfaces modernes et intuitives avec Adobe.",
    tags: ["React.js", "CSS", "SEO", "Adobe", "Responsive"],
    links: { site: "#", repo: "#" },
  },
  {
    id: "laravel-idev",
    title: "Applications Web Laravel",
    company: "iDev Niger",
    kind: "Entreprise",
    year: "2018–2020",
    cover:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    description:
      "Développement d'applications web innovantes avec Laravel. Conception de bases de données, développement d'APIs et intégration frontend/backend.",
    tags: ["Laravel", "PHP", "MySQL", "Blade", "Bootstrap"],
    links: { site: "#", repo: "#" },
  },
  {
    id: "freelance-ecommerce",
    title: "Plateforme E-commerce",
    company: "Freelance",
    kind: "Freelance",
    year: "2023",
    cover:
      "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1200&auto=format&fit=crop",
    description:
      "Conception et développement d'une plateforme e-commerce complète avec gestion des produits, paiements en ligne et tableau de bord administrateur.",
    tags: ["Laravel", "Vue.js", "MySQL", "Tailwind", "Stripe"],
    links: { site: "#", repo: "#" },
  },
  {
    id: "freelance-dashboard",
    title: "Dashboard Analytique",
    company: "Freelance",
    kind: "Freelance",
    year: "2024",
    cover:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    description:
      "Développement d'un tableau de bord analytique avec Next.js et TypeScript. Visualisation de données en temps réel et génération de rapports.",
    tags: ["Next.js", "TypeScript", "React", "PostgreSQL", "Charts"],
    links: { site: "#", repo: "https://github.com/mounkaila144" },
  },
  {
    id: "freelance-app-mobile",
    title: "Application Mobile Gestion",
    company: "Freelance",
    kind: "Personnel",
    year: "2023",
    cover:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
    description:
      "Application de gestion avec interface intuitive, synchronisation cloud et notifications push. Backend API avec Laravel et frontend React Native.",
    tags: ["Laravel", "React", "Node.js", "MySQL", "API"],
    links: { site: "#", repo: "https://github.com/mounkaila144" },
  },
];
