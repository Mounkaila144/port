"use client"

import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Globe,
  Building2,
  Sparkles,
  Clock,
} from "lucide-react";
import { translations, type Language } from "@/lib/translations";

interface Project {
  id: string;
  title: string;
  company: string;
  kind: string;
  year: string;
  cover: string;
  description: string;
  tags: string[];
  links: { site: string; repo: string };
}

interface ProjectsSectionProps {
  projects: Project[];
  language: Language;
  onOpenDialog: (project: Project) => void;
}

function SectionTitle({ icon: Icon, title, subtitle }: any) {
  return (
    <div className="mb-4 sm:mb-6">
      <h2 className="flex items-center gap-1.5 sm:gap-2 text-lg sm:text-xl lg:text-2xl font-semibold">
        <Icon className="h-5 w-5 sm:h-6 sm:w-6" /> {title}
      </h2>
      {subtitle && <p className="mt-1 text-sm sm:text-base text-white/70">{subtitle}</p>}
    </div>
  );
}

// Effet tilt léger pour les cartes
function useTilt(ref: React.RefObject<HTMLDivElement | null>) {
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handle = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const dx = (x - rect.width / 2) / rect.width;
      const dy = (y - rect.height / 2) / rect.height;
      el.style.transform = `rotateX(${(-dy * 4).toFixed(2)}deg) rotateY(${(dx * 6).toFixed(2)}deg)`;
    };
    const reset = () => {
      el.style.transform = "rotateX(0deg) rotateY(0deg)";
    };
    el.addEventListener("mousemove", handle);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", handle);
      el.removeEventListener("mouseleave", reset);
    };
  }, [ref]);
}

function ProjectCard({ project, onOpen, t, language, index }: { project: Project; onOpen: (p: any) => void; t: any; language: Language; index: number }) {
  const tiltRef = React.useRef<HTMLDivElement>(null);
  useTilt(tiltRef);

  const getProjectTranslation = (projectId: string) => {
    const mapping: { [key: string]: string } = {
      'entreprise-csf': 'entrepriseCsf',
      'entreprise-staff': 'entrepriseStaff',
      'entreprise-hydrolink': 'entrepriseHydrolink',
      'entreprise-ayki': 'entrepriseAyki',
      'entreprise-ptrniger': 'entreprisePtrniger',
      'entreprise-school': 'entrepriseSchool',
      'entreprise-emmalab': 'entrepriseEmmalab',
      'entreprise-lastuce': 'entrepriseLastuce',
      'entreprise-guidacenter': 'entrepriseGuidacenter',
      'freelance-softis': 'freelanceSoftis',
      'freelance-nina': 'freelanceNina',
      'personnel-icall': 'personnelIcall',
      'personnel-gestion': 'personnelGestion',
      'personnel-shop': 'personnelShop'
    };
    return mapping[projectId] || 'entrepriseCsf';
  };

  const projectKey = getProjectTranslation(project.id);
  const projectData = (t as any).projectDetails?.[projectKey];
  const displayTitle = projectData?.title || project.title;
  const displayDescription = projectData?.description || project.description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Card className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 via-white/5 to-white/0 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:border-white/20 transition-all duration-500 h-full flex flex-col">
        <div className="flex-1 flex flex-col" ref={tiltRef}>
          {/* Image avec overlay amélioré */}
          <div className="relative h-48 sm:h-56 lg:h-60 w-full overflow-hidden">
            <img
              src={project.cover}
              alt={displayTitle}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

            {/* Badges redesignés */}
            <div className="absolute left-3 sm:left-4 top-3 sm:top-4 flex items-center gap-2">
              <Badge variant="secondary" className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-xs font-medium px-3 py-1 shadow-lg">
                {project.kind === "Entreprise" ? t.enterprise : project.kind === "Freelance" ? t.freelance : t.personal}
              </Badge>
            </div>

            <div className="absolute right-3 sm:right-4 top-3 sm:top-4">
              <Badge variant="secondary" className="bg-black/70 backdrop-blur-md text-white text-xs px-3 py-1">
                <Clock className="mr-1 h-3 w-3" />{project.year}
              </Badge>
            </div>
          </div>

          {/* Contenu de la carte */}
          <div className="flex-1 flex flex-col p-5 sm:p-6">
            <CardHeader className="p-0 pb-3">
              <h3 className="text-lg sm:text-xl font-bold tracking-tight flex items-center gap-2 group-hover:text-violet-400 transition-colors">
                <Sparkles className="h-5 w-5 text-violet-400" />
                {displayTitle}
              </h3>
              <div className="mt-2 flex items-center text-sm text-white/60">
                <Building2 className="mr-2 h-4 w-4" /> {project.company}
              </div>
            </CardHeader>

            <CardContent className="p-0 flex-1 flex flex-col">
              <p className="text-sm text-white/70 leading-relaxed line-clamp-3 mb-4">
                {displayDescription}
              </p>

              {/* Tags */}
              <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 4).map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs px-3 py-1 transition-all hover:scale-105"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 4 && (
                    <Badge className="bg-white/5 text-white/50 border border-white/10 text-xs px-3 py-1">
                      +{project.tags.length - 4}
                    </Badge>
                  )}
                </div>

                {/* Boutons d'action */}
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => onOpen(project)}
                    className="rounded-xl text-sm h-10 px-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 shadow-lg hover:shadow-xl transition-all"
                  >
                    {t.viewProject}
                  </Button>
                  {project.links.site !== "#" && (
                    <a href={project.links.site} target="_blank" rel="noreferrer">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="rounded-xl text-sm h-10 px-4 bg-white/10 hover:bg-white/20 border border-white/20"
                      >
                        <Globe className="mr-2 h-4 w-4" />{t.site}
                      </Button>
                    </a>
                  )}
                  {project.links.repo !== "#" && (
                    <a href={project.links.repo} target="_blank" rel="noreferrer">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="rounded-xl text-sm h-10 px-4 bg-white/10 hover:bg-white/20 border border-white/20"
                      >
                        <Github className="mr-2 h-4 w-4" />{t.code}
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export function ProjectsSection({ projects, language, onOpenDialog }: ProjectsSectionProps) {
  const t = translations[language];

  return (
    <div className="space-y-8">
      {/* Section Header avec style amélioré */}
      <div className="text-center space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="flex items-center justify-center gap-3 text-3xl sm:text-4xl lg:text-5xl font-bold">
            <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-violet-400" />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              {t.projectsTitle}
            </span>
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto"
        >
          {t.projectsSubtitle}
        </motion.p>
      </div>

      {/* Grille de projets avec espacement amélioré */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={onOpenDialog}
            t={t}
            language={language}
            index={index}
          />
        ))}
      </div>

      {/* Section "Plus de projets" avec design amélioré */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-12 relative"
      >
        {/* Carte avec gradient et glassmorphism */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/5 to-pink-500/10 backdrop-blur-xl p-8 sm:p-10 lg:p-12">
          {/* Effets de fond animés */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-violet-500/20 blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-fuchsia-500/20 blur-3xl"
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
              transition={{ duration: 8, repeat: Infinity, delay: 1 }}
            />
          </div>

          {/* Contenu */}
          <div className="relative z-10 text-center space-y-6">
            {/* Icône centrale */}
            <motion.div
              className="inline-flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl blur-xl opacity-50" />
                <div className="relative bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl p-4">
                  <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </div>
              </div>
            </motion.div>

            {/* Titre */}
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent mb-3">
                {t.moreProjectsTitle}
              </h3>
              <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                {t.moreProjectsDescription}
              </p>
            </div>

            {/* Compteurs avec design moderne */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 pt-4">
              {/* Projets affichés */}
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-violet-400 animate-pulse" />
                  <span className="text-sm sm:text-base text-white/60 uppercase tracking-wider font-medium">
                    {t.projectsShown}
                  </span>
                </div>
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  {projects.length}
                </div>
              </div>

              {/* Séparateur */}
              <div className="hidden sm:block h-16 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
              <div className="sm:hidden w-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              {/* Total projets */}
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-fuchsia-400 animate-pulse" />
                  <span className="text-sm sm:text-base text-white/60 uppercase tracking-wider font-medium">
                    {t.totalProjects}
                  </span>
                </div>
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                  98+
                </div>
              </div>
            </div>

            {/* Barre de progression visuelle */}
            <div className="pt-6">
              <div className="max-w-md mx-auto">
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(projects.length / 98) * 100}%` }}
                    transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
                  />
                </div>
                <p className="text-xs text-white/40 mt-2">
                  {Math.round((projects.length / 98) * 100)}% {t.portfolioShown}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
