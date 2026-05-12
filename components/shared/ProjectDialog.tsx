"use client"

import React from "react";
import Image from "next/image";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Globe } from "lucide-react";
import type { Project } from "@/content/types";

interface ProjectDialogProps {
  project: Project;
  t: any;
}

export function ProjectDialog({ project, t }: ProjectDialogProps) {
  const getProjectTranslation = (projectId: string) => {
    const mapping: { [key: string]: string } = {
      'entreprise-csf': 'entrepriseCsf',
      'entreprise-staff': 'entrepriseStaff',
      'entreprise-ayki': 'entrepriseAyki',
      'entreprise-ptrniger': 'entreprisePtrniger',
      'entreprise-emmalab': 'entrepriseEmmalab',
      'entreprise-lastuce': 'entrepriseLastuce',
      'entreprise-clinoo': 'entrepriseClinoo',
      'entreprise-jandoo': 'entrepriseJandoo',
      'entreprise-planning': 'entreprisePlanning',
      'entreprise-pointage': 'entreprisePointage',
      'entreprise-scholarship': 'entrepriseScholarship',
      'entreprise-wuroobiz': 'entrepriseWuroobiz',
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
    <div>
      <DialogHeader>
        <DialogTitle className="text-lg sm:text-xl lg:text-2xl pr-6">{displayTitle}</DialogTitle>
        <DialogDescription className="text-sm sm:text-base text-white/70">
          {project.company} • {project.year}
        </DialogDescription>
      </DialogHeader>
      <div className="mt-3 sm:mt-4">
        <div className="relative w-full h-48 sm:h-56 lg:h-64 rounded-lg sm:rounded-xl overflow-hidden border border-white/10">
          <Image
            src={project.cover}
            alt={displayTitle}
            fill
            sizes="(max-width: 768px) 95vw, 768px"
            className="object-cover"
          />
        </div>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-white/80">{displayDescription}</p>
        <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} className="bg-white/10 border border-white/10 text-xs sm:text-sm">{tag}</Badge>
          ))}
        </div>
        <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2 sm:gap-3">
          {project.links.site !== "#" && (
            <a href={project.links.site} target="_blank" rel="noreferrer">
              <Button className="rounded-lg sm:rounded-xl text-sm sm:text-base h-9 sm:h-10 px-3 sm:px-4">
                <Globe className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />{t.viewSite}
              </Button>
            </a>
          )}
          {project.links.repo !== "#" && (
            <a href={project.links.repo} target="_blank" rel="noreferrer">
              <Button variant="secondary" className="rounded-lg sm:rounded-xl text-sm sm:text-base h-9 sm:h-10 px-3 sm:px-4">
                <Github className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />{t.viewCode}
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
