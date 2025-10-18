"use client"

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Github } from "lucide-react";
import { translations, type Language } from "@/lib/translations";

interface ProfileSectionProps {
  profile: {
    name: string;
    role: string;
    photo: string;
    about: string;
    location: string;
    email: string;
    phone: string;
    github: string;
  };
  language: Language;
}

export function ProfileSection({ profile, language }: ProfileSectionProps) {
  const t = translations[language];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent backdrop-blur-2xl shadow-2xl">
        {/* Gradient décoratif */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/5 to-transparent pointer-events-none" />

        <CardContent className="relative p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-[280px,1fr] gap-6 sm:gap-8 lg:gap-10 items-start">
            {/* Photo de profil avec effets */}
            <motion.div
              className="relative mx-auto lg:mx-0"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative group">
                {/* Cercle lumineux animé derrière la photo */}
                <div className="absolute -inset-2 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 rounded-full opacity-75 blur-2xl group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

                {/* Cadre de la photo */}
                <div className="relative h-[240px] w-[240px] sm:h-[260px] sm:w-[260px] lg:h-[280px] lg:w-[280px]">
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-500 p-1">
                    <div className="h-full w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-black/20 backdrop-blur-sm">
                      <img
                        src={profile.photo}
                        alt={profile.name}
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Badge de statut */}
                <motion.div
                  className="absolute -bottom-2 -right-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-lg border-2 border-white/20"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-xs sm:text-sm font-semibold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    {language === 'fr' ? 'Disponible' : 'Available'}
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* Informations du profil */}
            <motion.div
              className="space-y-5 sm:space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* En-tête */}
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-violet-200 to-fuchsia-200 bg-clip-text text-transparent mb-2">
                  {profile.name}
                </h2>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                  <Badge className="bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 text-violet-200 border border-violet-500/30 text-sm px-3 py-1">
                    {t.fullstackDeveloper}
                  </Badge>
                  <span className="text-white/60 text-sm flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-white/60 rounded-full" />
                    {t.location}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed">
                {t.heroDescription}
              </p>

              {/* Statistiques rapides */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 py-4">
                <div className="text-center p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">5+</div>
                  <div className="text-xs sm:text-sm text-white/60 mt-1">{language === 'fr' ? 'Années' : 'Years'}</div>
                </div>
                <div className="text-center p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">98+</div>
                  <div className="text-xs sm:text-sm text-white/60 mt-1">{language === 'fr' ? 'Projets' : 'Projects'}</div>
                </div>
                <div className="text-center p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent">10+</div>
                  <div className="text-xs sm:text-sm text-white/60 mt-1">{language === 'fr' ? 'Technologies' : 'Technologies'}</div>
                </div>
              </div>

              {/* Informations de contact stylisées */}
              <div className="space-y-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="group flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-violet-500/50 transition-all duration-300"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 group-hover:from-violet-500/30 group-hover:to-fuchsia-500/30 transition-colors">
                    <Mail className="h-4 w-4 text-violet-300" />
                  </div>
                  <span className="text-sm sm:text-base text-white/80 group-hover:text-white transition-colors">{profile.email}</span>
                </a>
                <a
                  href={`tel:${profile.phone}`}
                  className="group flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-teal-500/20 group-hover:from-cyan-500/30 group-hover:to-teal-500/30 transition-colors">
                    <Phone className="h-4 w-4 text-cyan-300" />
                  </div>
                  <span className="text-sm sm:text-base text-white/80 group-hover:text-white transition-colors">{profile.phone}</span>
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-fuchsia-500/50 transition-all duration-300"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-br from-fuchsia-500/20 to-pink-500/20 group-hover:from-fuchsia-500/30 group-hover:to-pink-500/30 transition-colors">
                    <Github className="h-4 w-4 text-fuchsia-300" />
                  </div>
                  <span className="text-sm sm:text-base text-white/80 group-hover:text-white transition-colors">github.com/mounkaila144</span>
                </a>
              </div>

              {/* Boutons d'action */}
              <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
                <a href="https://wa.me/227979781199" target="_blank" rel="noreferrer" className="flex-1 sm:flex-none">
                  <Button className="w-full rounded-xl text-sm sm:text-base h-11 sm:h-12 px-6 sm:px-8 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500 hover:from-violet-600 hover:via-fuchsia-600 hover:to-violet-600 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300 font-semibold">
                    <Mail className="mr-2 h-4 w-4" />{t.contactMe}
                  </Button>
                </a>
                <a href={profile.github} target="_blank" rel="noreferrer" className="flex-1 sm:flex-none">
                  <Button variant="outline" className="w-full rounded-xl text-sm sm:text-base h-11 sm:h-12 px-6 sm:px-8 border-white/20 hover:bg-white/10 hover:border-white/30 transition-all duration-300 font-semibold">
                    <Github className="mr-2 h-4 w-4" />{t.github}
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
