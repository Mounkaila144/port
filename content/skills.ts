import type { SkillGroup } from "./types";

// Icon URLs reference local self-hosted SVGs under public/icons/devicons/.
// Story 1.8 downloads them; until then, Story 1.5 build still works because
// these are <img src="..."> consumers that 404 gracefully without breaking layout.
export const skillGroups: SkillGroup[] = [
  {
    title: "Langages",
    items: [
      { name: "HTML", icon: "/icons/devicons/html5.svg" },
      { name: "CSS", icon: "/icons/devicons/css3.svg" },
      { name: "PHP", icon: "/icons/devicons/php.svg" },
      { name: "JavaScript", icon: "/icons/devicons/javascript.svg" },
      { name: "TypeScript", icon: "/icons/devicons/typescript.svg" },
      { name: "SQL", icon: "/icons/devicons/mysql.svg" },
    ],
  },
  {
    title: "Frameworks",
    items: [
      { name: "Laravel", icon: "/icons/devicons/laravel.svg" },
      { name: "Symfony", icon: "/icons/devicons/symfony.svg" },
      { name: "React.js", icon: "/icons/devicons/react.svg" },
      { name: "Next.js", icon: "/icons/devicons/nextjs.svg" },
      { name: "Vue.js", icon: "/icons/devicons/vuejs.svg" },
      { name: "Node.js", icon: "/icons/devicons/nodejs.svg" },
    ],
  },
  {
    title: "UI/Design",
    items: [
      { name: "Bootstrap", icon: "/icons/devicons/bootstrap.svg" },
      { name: "Tailwind", icon: "/icons/devicons/tailwindcss.svg" },
      { name: "Sass", icon: "/icons/devicons/sass.svg" },
      { name: "Figma", icon: "/icons/devicons/figma.svg" },
    ],
  },
  {
    title: "Databases",
    items: [
      { name: "MySQL", icon: "/icons/devicons/mysql.svg" },
      { name: "PostgreSQL", icon: "/icons/devicons/postgresql.svg" },
      { name: "MongoDB", icon: "/icons/devicons/mongodb.svg" },
    ],
  },
  {
    title: "DevOps & Serveurs",
    items: [
      { name: "Linux", icon: "/icons/devicons/linux.svg" },
      { name: "Ubuntu", icon: "/icons/devicons/ubuntu.svg" },
      { name: "Nginx", icon: "/icons/devicons/nginx.svg" },
      { name: "Apache", icon: "/icons/devicons/apache.svg" },
      { name: "GitLab CI/CD", icon: "/icons/devicons/gitlab.svg" },
      { name: "Jenkins", icon: "/icons/devicons/jenkins.svg" },
    ],
  },
  {
    title: "Outils",
    items: [
      { name: "Git", icon: "/icons/devicons/git.svg" },
      { name: "Docker", icon: "/icons/devicons/docker.svg" },
      { name: "PHPStorm", icon: "/icons/devicons/phpstorm.svg" },
      { name: "WebStorm", icon: "/icons/devicons/webstorm.svg" },
      { name: "VS Code", icon: "/icons/devicons/vscode.svg" },
      { name: "GitHub", icon: "/icons/devicons/github.svg" },
    ],
  },
];
