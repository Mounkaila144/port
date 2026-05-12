"use client"

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Globe } from "lucide-react";
import { translations, type Language } from "@/lib/translations";
import type { Project } from "@/content/types";

interface ProjectsSectionProps {
  projects: Project[];
  language: Language;
  onOpenDialog: (project: Project) => void;
}

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

const projectKeyMap: Record<string, string> = {
  "entreprise-csf": "entrepriseCsf",
  "entreprise-staff": "entrepriseStaff",
  "entreprise-ayki": "entrepriseAyki",
  "entreprise-ptrniger": "entreprisePtrniger",
  "entreprise-emmalab": "entrepriseEmmalab",
  "entreprise-lastuce": "entrepriseLastuce",
  "entreprise-clinoo": "entrepriseClinoo",
  "entreprise-jandoo": "entrepriseJandoo",
  "entreprise-planning": "entreprisePlanning",
  "entreprise-pointage": "entreprisePointage",
  "entreprise-scholarship": "entrepriseScholarship",
  "entreprise-wuroobiz": "entrepriseWuroobiz",
  "entreprise-guidacenter": "entrepriseGuidacenter",
  "freelance-softis": "freelanceSoftis",
  "freelance-nina": "freelanceNina",
  "personnel-icall": "personnelIcall",
  "personnel-gestion": "personnelGestion",
  "personnel-shop": "personnelShop",
};

function getProjectContent(project: Project, t: any) {
  const key = projectKeyMap[project.id] || "entrepriseCsf";
  const data = t.projectDetails?.[key];
  return {
    title: data?.title || project.title,
    description: data?.description || project.description,
  };
}

function KindBadge({ kind, t }: { kind: string; t: any }) {
  const label = kind === "Entreprise" ? t.enterprise : kind === "Freelance" ? t.freelance : t.personal;
  const colorMap: Record<string, string> = {
    Entreprise: "border-[#C4F046]/40 bg-[#C4F046]/10 text-[#C4F046]",
    Freelance: "border-[#FF6B35]/40 bg-[#FF6B35]/10 text-[#FF6B35]",
    Personnel: "border-white/30 bg-white/5 text-white/80",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-wider backdrop-blur-md ${colorMap[kind] || colorMap.Personnel}`}>
      <span className="h-1 w-1 rounded-full bg-current" />
      {label}
    </span>
  );
}

function FeaturedCard({ project, onOpen, t, index }: { project: Project; onOpen: (p: Project) => void; t: any; index: number }) {
  const { title, description } = getProjectContent(project, t);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: easing }}
      onClick={() => onOpen(project)}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] cursor-pointer h-full"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
          <Image
            src={project.cover}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#08080C] via-[#08080C]/30 to-transparent lg:bg-gradient-to-r" />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <KindBadge kind={project.kind} t={t} />
            <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-white/80 backdrop-blur-md">
              {project.year}
            </span>
          </div>
        </div>

        <div className="relative flex flex-col justify-between p-6 sm:p-8 lg:p-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              <span>{language_label("featured", t)}</span>
              <span className="h-px w-8 bg-[#C4F046]" />
            </div>
            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white leading-[1] tracking-tight">
              {title}
            </h3>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed line-clamp-3">
              {description}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <span className="font-mono text-xs text-white/50">{project.company}</span>
            <div className="flex items-center gap-2">
              {project.links.site !== "#" && (
                <a
                  href={project.links.site}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 backdrop-blur-md transition-all duration-300 hover:border-[#C4F046]/40 hover:bg-[#C4F046]/10 hover:text-[#C4F046]"
                  aria-label="Visit site"
                >
                  <Globe className="h-4 w-4" />
                </a>
              )}
              {project.links.repo !== "#" && (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white"
                  aria-label="Repo"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
              <span className="flex h-10 items-center gap-2 rounded-full bg-[#C4F046] px-5 text-xs font-semibold text-[#08080C] transition-shadow duration-500 group-hover:shadow-[0_0_30px_-5px_rgba(196,240,70,0.7)]">
                {t.viewProject}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function language_label(key: string, t: any) {
  return t[key] || (key === "featured" ? "Featured" : key);
}

function ProjectCard({ project, onOpen, t, index }: { project: Project; onOpen: (p: Project) => void; t: any; index: number }) {
  const { title, description } = getProjectContent(project, t);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.04, ease: easing }}
      onClick={() => onOpen(project)}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md cursor-pointer transition-all duration-500 hover:border-[#C4F046]/30 hover:bg-white/[0.04]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.cover}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080C] via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <KindBadge kind={project.kind} t={t} />
        </div>
        <div className="absolute top-3 right-3 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[10px] font-mono text-white/80 backdrop-blur-md">
          {project.year}
        </div>

        {/* Reveal arrow */}
        <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#C4F046] text-[#08080C] opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[10px] text-white/30">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-display text-xl sm:text-2xl text-white tracking-tight leading-tight">
            {title}
          </h3>
        </div>
        <p className="mt-3 text-sm text-white/60 leading-relaxed line-clamp-2">
          {description}
        </p>
        <div className="mt-auto pt-4 flex flex-wrap items-center gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[11px] text-white/60"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-[11px] text-white/40">+{project.tags.length - 3}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection({ projects, language, onOpenDialog }: ProjectsSectionProps) {
  const t = translations[language];
  const [featured, ...rest] = projects;

  return (
    <section className="space-y-10 sm:space-y-14">
      {/* Header */}
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-white/50"
        >
          <span className="h-px w-12 bg-[#C4F046]" />
          <span>03 / {language === "fr" ? "Sélection" : "Selection"}</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easing }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight max-w-3xl"
          >
            <span className="text-white">{language === "fr" ? "Travaux" : "Selected"}</span>{" "}
            <span className="text-mask-lime italic">{language === "fr" ? "récents" : "works"}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: easing }}
            className="max-w-md text-base text-white/60"
          >
            {t.projectsSubtitle}
          </motion.p>
        </div>
      </div>

      {/* Featured */}
      {featured && (
        <FeaturedCard project={featured} onOpen={onOpenDialog} t={t} index={0} />
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {rest.map((project, idx) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={onOpenDialog}
            t={t}
            index={idx}
          />
        ))}
      </div>

      {/* Footer counter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-10 backdrop-blur-md"
      >
        <div className="space-y-2 text-center sm:text-left">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">
            {t.moreProjectsTitle}
          </div>
          <div className="font-display text-2xl sm:text-3xl text-white max-w-md">
            {t.moreProjectsDescription}
          </div>
        </div>
        <div className="flex items-baseline gap-3 shrink-0">
          <span className="font-display text-6xl sm:text-7xl text-mask-lime">{projects.length}</span>
          <span className="font-mono text-sm text-white/50">/ 98+</span>
        </div>
      </motion.div>
    </section>
  );
}
