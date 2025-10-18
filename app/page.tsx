"use client"

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Github,
  User as UserIcon,
  Layers,
  Sparkles,
  Briefcase,
  Mail,
} from "lucide-react";
import { translations, type Language } from "@/lib/translations";
import { ProfileSection } from "@/components/sections/ProfileSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { CompaniesSection } from "@/components/sections/CompaniesSection";
import { ProjectDialog } from "@/components/shared/ProjectDialog";

// ————————————————————————————————————————————
// Données professionnelles — Boubacar Mounkaila
// ————————————————————————————————————————————
const profile = {
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

const skillGroups: { title: string; items: { name: string; icon: string }[] }[] = [
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
        {
            "name": "Laravel",
            "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg"
        }
        ,
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
        {
            "name": "Tailwind",
            "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original-wordmark.svg"
        }
        ,
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
      { name: "MERISE", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "UML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unifiedmodelinglanguage/unifiedmodelinglanguage-original.svg" },
    ]
  },
  {
    title: "DevOps & Serveurs",
    items: [
      { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
      { name: "Ubuntu", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-plain.svg" },
      { name: "Nginx", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
      { name: "Apache", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg" },
      { name: "GitLab CI/CD", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg" },
      { name: "Jenkins", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" },
    ]
  },
  {
    title: "Outils",
    items: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "PHPStorm", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/phpstorm/phpstorm-original.svg" },
      { name: "WebStorm", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webstorm/webstorm-original.svg" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    ]
  },
];

const companies = [
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

const projects = [
  {
    id: "entreprise-csf",
    title: "Commande Sans Frontière",
    company: "Commande Sans Frontière",
    kind: "Entreprise",
    year: "2023–2024",
    cover: "/project/csf.png",
    description:
      "Plateforme de transport multimodal (aérien, maritime et routier) offrant des solutions sur mesure pour le commerce international. Plus de 5 ans d'expérience avec livraison rapide et sécurisée depuis la Chine.",
    tags: ["Transport", "E-commerce", "Logistique", "International"],
    links: { site: "https://commandesansfrontiere.com/", repo: "#" },
  },
  {
    id: "entreprise-staff",
    title: "NigerDev Staff",
    company: "NigerDev",
    kind: "Entreprise",
    year: "2023–2024",
    cover: "/project/staff.png",
    description:
      "Application complète de gestion d'entreprise intégrant la gestion des employés, le suivi des stagiaires et l'administration des salaires. Solution centralisée pour optimiser les processus RH.",
    tags: ["SaaS", "RH", "Gestion", "Back-office"],
    links: { site: "https://staff.nigerdev.com/dashboard", repo: "#" },
  },
  {
    id: "entreprise-hydrolink",
    title: "HydroLink",
    company: "PTR Niger",
    kind: "Entreprise",
    year: "2023",
    cover: "/project/hydrolink.png",
    description:
      "Plateforme de solutions durables en BTP, hydraulique, e-commerce et commerce général. Des solutions de qualité pour accompagner le développement du Niger.",
    tags: ["BTP", "Hydraulique", "E-commerce", "Plateforme"],
    links: { site: "https://hydrolink.ptrniger.com/", repo: "#" },
  },
  {
    id: "entreprise-ayki",
    title: "AYKI Emploi",
    company: "PTR Niger",
    kind: "Entreprise",
    year: "2023",
    cover: "/project/ayki-emploi.png",
    description:
      "Plateforme de recrutement qui connecte les talents aux opportunités. AYKI simplifie le processus en mettant directement en relation les meilleurs candidats avec les entreprises qui recherchent leurs compétences.",
    tags: ["Recrutement", "SaaS", "RH", "Plateforme"],
    links: { site: "https://ayki.ptrniger.com/", repo: "#" },
  },
  {
    id: "entreprise-ptrniger",
    title: "PTR Niger E-Learning",
    company: "PTR Niger",
    kind: "Entreprise",
    year: "2022–2024",
    cover: "/project/ptrniger-elearning.png",
    description:
      "Plateforme e-learning proposant des formations en entrepreneuriat, marketing digital, informatique et plus. Les élèves s'inscrivent et apprennent directement en ligne avec un suivi personnalisé.",
    tags: ["E-learning", "Éducation", "Plateforme", "Formation"],
    links: { site: "https://ptrniger.com/", repo: "#" },
  },
  {
    id: "entreprise-school",
    title: "PTR School",
    company: "PTR Niger",
    kind: "Entreprise",
    year: "2022–2024",
    cover: "/project/school.jpeg",
    description:
      "Solution de gestion scolaire complète : bibliothèques, gestion du personnel, comptabilité, paiement des personnels et professeurs, inscription, scolarités, emplois du temps, examens et devoirs. Une plateforme tout-en-un pour les établissements.",
    tags: ["Gestion scolaire", "SaaS", "Éducation", "Back-office"],
    links: { site: "https://school.ptrniger.com/site/userlogin", repo: "#" },
  },
  {
    id: "entreprise-emmalab",
    title: "EMMA-Lab",
    company: "PTR Niger",
    kind: "Entreprise",
    year: "2023",
    cover: "/project/emalab.png",
    description:
      "Laboratoire d'innovation qui accompagne les entrepreneurs et les organisations dans leur transformation digitale et leurs projets innovants. Innover ensemble pour construire l'avenir.",
    tags: ["Innovation", "Digital", "Accompagnement", "Consulting"],
    links: { site: "https://emma-lab.ptrniger.com/", repo: "#" },
  },
  {
    id: "entreprise-lastuce",
    title: "L'Astuce",
    company: "PTR Niger",
    kind: "Entreprise",
    year: "2023",
    cover: "/project/lastuce.png",
    description:
      "Communauté d'astuces permettant de découvrir les meilleures techniques avec une communauté passionnée. Conseils pratiques pour améliorer le quotidien : voir les épisodes et proposer ses propres astuces.",
    tags: ["Communauté", "Contenu", "Social", "Plateforme"],
    links: { site: "https://lastuce.ptrniger.com/fr", repo: "#" },
  },
  {
    id: "entreprise-guidacenter",
    title: "GuidaCenter",
    company: "GuidaCenter",
    kind: "Entreprise",
    year: "2023–2024",
    cover: "/project/guidacenter.png",
    description:
      "Plateforme immobilière moderne qui simplifie l'achat, la vente et la location de biens au Niger. Interface intuitive pour faciliter les transactions immobilières.",
    tags: ["Immobilier", "Plateforme", "E-commerce", "Niger"],
    links: { site: "https://guidacenter.com/", repo: "#" },
  },
  {
    id: "freelance-softis",
    title: "Softis Pilates",
    company: "Freelance",
    kind: "Freelance",
    year: "2023",
    cover: "/project/softis.png",
    description:
      "Plateforme complète pour un club sportif de Pilates au Japon. Gestion des cours, réservations, membres et planning pour une expérience utilisateur optimale.",
    tags: ["Sport", "Pilates", "SaaS", "Japon"],
    links: { site: "https://softis.jp/", repo: "#" },
  },
  {
    id: "freelance-nina",
    title: "Nina Massage & Kiné",
    company: "Freelance",
    kind: "Freelance",
    year: "2023",
    cover: "/project/nina.png",
    description:
      "Centre de massage professionnel à Niamey proposant massage et kinésithérapie. Services premium : drainage lymphatique, massage 4 mains, soins esthétiques et bien plus.",
    tags: ["Santé", "Bien-être", "Massage", "Niamey"],
    links: { site: "https://nina.nigerdev.com/", repo: "#" },
  },
  {
    id: "personnel-icall",
    title: "iCall CRM",
    company: "Projet Personnel",
    kind: "Personnel",
    year: "2022",
    cover: "/project/icall26.png",
    description:
      "Suite CRM complète avec de très nombreuses fonctionnalités : gestion des contacts, suivi des opportunités, automatisation des processus et rapports analytiques. Solution robuste pour la gestion de la relation client.",
    tags: ["CRM", "SaaS", "Gestion", "Entreprise"],
    links: { site: "#", repo: "#" },
  },
  {
    id: "personnel-gestion",
    title: "Gestion Boutique",
    company: "Projet Personnel",
    kind: "Personnel",
    year: "2022",
    cover: "/project/gestion1.png",
    description:
      "Application de gestion de boutique intégrant la gestion des stocks, la comptabilité, le suivi des revenus et les opérations commerciales. Interface simple pour une gestion efficace au quotidien.",
    tags: ["Gestion", "Stocks", "Comptabilité", "POS"],
    links: { site: "#", repo: "#" },
  },
  {
    id: "personnel-shop",
    title: "Shop POS",
    company: "Projet Personnel",
    kind: "Personnel",
    year: "2023",
    cover: "/project/shop.png",
    description:
      "Application de gestion commerciale complète : fournisseurs, comptabilité, achats, QR codes et système POS pour des ventes instantanées. Solution tout-en-un pour la gestion de points de vente.",
    tags: ["POS", "E-commerce", "Gestion", "QR Code"],
    links: { site: "#", repo: "#" },
  },
];

function GradientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-20 sm:-top-40 left-1/2 h-[300px] w-[300px] sm:h-[420px] sm:w-[420px] lg:h-[520px] lg:w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-violet-500/30 via-fuchsia-500/20 to-emerald-400/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[250px] w-[250px] sm:h-[320px] sm:w-[320px] lg:h-[400px] lg:w-[400px] translate-x-1/3 translate-y-1/3 rounded-full bg-gradient-to-tr from-cyan-400/20 via-teal-400/20 to-lime-300/20 blur-3xl" />
    </div>
  );
}

export default function Portfolio() {
  const [opened, setOpened] = React.useState<typeof projects[number] | null>(null);
  const [tab, setTab] = React.useState("profil");
  const [language, setLanguage] = React.useState<Language>("fr");

  const t = translations[language];

  return (
    <div className="relative min-h-screen text-white bg-[#0B0B10]">
      <GradientBackground />

      {/* Navbar fixe en haut */}
      <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0B0B10]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="flex h-14 sm:h-16 items-center justify-between">
            {/* Logo / Nom */}
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500">
                <span className="text-sm sm:text-lg font-bold">
                  {profile.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </span>
              </div>
              <div className="hidden sm:block">
                <h2 className="text-base sm:text-lg font-semibold">{profile.name}</h2>
                <p className="text-xs text-white/60">{profile.role}</p>
              </div>
            </div>

            {/* Navigation Desktop */}
            <Tabs value={tab} onValueChange={setTab} className="hidden md:block">
              <TabsList className="bg-white/5 border border-white/10 rounded-lg p-1">
                <TabsTrigger
                  value="profil"
                  className="data-[state=active]:bg-white/20 data-[state=active]:shadow-lg rounded-md flex items-center gap-2 px-4 py-2 text-sm transition-all"
                >
                  <UserIcon className="h-4 w-4" /> {t.profile}
                </TabsTrigger>
                <TabsTrigger
                  value="skills"
                  className="data-[state=active]:bg-white/20 data-[state=active]:shadow-lg rounded-md flex items-center gap-2 px-4 py-2 text-sm transition-all"
                >
                  <Layers className="h-4 w-4" /> {t.skills}
                </TabsTrigger>
                <TabsTrigger
                  value="projects"
                  className="data-[state=active]:bg-white/20 data-[state=active]:shadow-lg rounded-md flex items-center gap-2 px-4 py-2 text-sm transition-all"
                >
                  <Sparkles className="h-4 w-4" /> {t.projects}
                </TabsTrigger>
                <TabsTrigger
                  value="companies"
                  className="data-[state=active]:bg-white/20 data-[state=active]:shadow-lg rounded-md flex items-center gap-2 px-4 py-2 text-sm transition-all"
                >
                  <Briefcase className="h-4 w-4" /> {t.companies}
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Navigation Mobile */}
            <Tabs value={tab} onValueChange={setTab} className="md:hidden">
              <TabsList className="bg-white/5 border border-white/10 rounded-lg p-0.5 grid grid-cols-4 gap-0.5">
                <TabsTrigger
                  value="profil"
                  className="data-[state=active]:bg-white/20 rounded-md px-2 py-1.5"
                >
                  <UserIcon className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger
                  value="skills"
                  className="data-[state=active]:bg-white/20 rounded-md px-2 py-1.5"
                >
                  <Layers className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger
                  value="projects"
                  className="data-[state=active]:bg-white/20 rounded-md px-2 py-1.5"
                >
                  <Sparkles className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger
                  value="companies"
                  className="data-[state=active]:bg-white/20 rounded-md px-2 py-1.5"
                >
                  <Briefcase className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Language Switcher + Boutons CTA */}
            <div className="flex items-center gap-2">
              {/* Language Switcher */}
              <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-0.5">
                <button
                  onClick={() => setLanguage("fr")}
                  className={`px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-md transition-all ${
                    language === "fr"
                      ? "bg-white/20 text-white font-medium"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  FR
                </button>
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-md transition-all ${
                    language === "en"
                      ? "bg-white/20 text-white font-medium"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Boutons CTA Desktop */}
              <div className="hidden lg:flex items-center gap-2">
                <a href={`mailto:${profile.email}`}>
                  <Button variant="ghost" size="sm" className="rounded-lg">
                    {t.email}
                  </Button>
                </a>
                <a href="https://wa.me/227979781199" target="_blank" rel="noreferrer">
                  <Button size="sm" className="rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600">
                    {t.contact}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>


      {/* Content */}
      <main className="mx-auto max-w-6xl px-3 sm:px-4 lg:px-6 pb-12">
        <Tabs value={tab} onValueChange={setTab} className="w-full">

            {/* PROFIL */}
            <TabsContent value="profil" className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
              <ProfileSection profile={profile} language={language} />
            </TabsContent>

            {/* COMPÉTENCES */}
            <TabsContent value="skills" className="mt-4 sm:mt-6">
              <SkillsSection skillGroups={skillGroups} language={language} />
            </TabsContent>

            {/* PROJETS */}
            <TabsContent value="projects" className="mt-4 sm:mt-6">
              <ProjectsSection
                projects={projects}
                language={language}
                onOpenDialog={setOpened}
              />
            </TabsContent>

            {/* ENTREPRISES */}
            <TabsContent value="companies" className="mt-4 sm:mt-6">
              <CompaniesSection companies={companies} language={language} />
            </TabsContent>
          </Tabs>
      </main>

      {/* Dialog projet */}
      <Dialog open={!!opened} onOpenChange={() => setOpened(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-2xl lg:max-w-3xl bg-[#0F0F15]/95 text-white border-white/10 max-h-[90vh] overflow-y-auto">
          {opened && <ProjectDialog project={opened} t={t} />}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer id="contact" className="border-t border-white/10 py-8 sm:py-12 px-4 bg-black/10">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Mail className="h-5 w-5" />{t.contact}
              </h3>
              <div className="space-y-2 text-sm text-white/70">
                <a href={`mailto:${profile.email}`} className="block hover:text-white transition-colors">
                  {profile.email}
                </a>
                <a href={`tel:${profile.phone}`} className="block hover:text-white transition-colors">
                  {profile.phone}
                </a>
                <p>{profile.location}</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.navigation}</h3>
              <div className="space-y-2 text-sm text-white/70">
                <button onClick={() => setTab("profil")} className="block hover:text-white transition-colors">
                  {t.profile}
                </button>
                <button onClick={() => setTab("skills")} className="block hover:text-white transition-colors">
                  {t.skills}
                </button>
                <button onClick={() => setTab("projects")} className="block hover:text-white transition-colors">
                  {t.projects}
                </button>
                <button onClick={() => setTab("companies")} className="block hover:text-white transition-colors">
                  {t.companies}
                </button>
              </div>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Github className="h-5 w-5" />{t.social}
              </h3>
              <div className="space-y-2">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-white/10" />

          <div className="text-center text-sm text-white/60">
            <p>© {new Date().getFullYear()} {profile.name} - {t.copyright}</p>
            <p className="mt-2">{t.availableFor}</p>
          </div>
        </div>
      </footer>

      {/* Décor animé subtil */}
      <motion.div
        className="pointer-events-none fixed left-1/2 top-1/2 -z-10 h-48 w-48 sm:h-60 sm:w-60 lg:h-72 lg:w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.35, 0.25] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </div>
  );
}
