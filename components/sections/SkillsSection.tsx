"use client"

import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Layers } from "lucide-react";
import { translations, type Language } from "@/lib/translations";

interface SkillsSectionProps {
  skillGroups: {
    title: string;
    items: { name: string; icon: string }[];
  }[];
  language: Language;
}

function SectionTitle({ icon: Icon, title, subtitle }: any) {
  return (
    <div className="mb-6 sm:mb-8">
      <motion.h2
        className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white via-violet-200 to-fuchsia-200 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-violet-400" /> {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="mt-2 text-sm sm:text-base text-white/70 ml-8 sm:ml-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

export function SkillsSection({ skillGroups, language }: SkillsSectionProps) {
  const t = translations[language];

  // Couleurs de gradient par catégorie
  const gradientColors: { [key: string]: string[] } = {
    'Langages': ['from-violet-500/20', 'to-fuchsia-500/20', 'hover:from-violet-500/30', 'hover:to-fuchsia-500/30', 'border-violet-500/20'],
    'Languages': ['from-violet-500/20', 'to-fuchsia-500/20', 'hover:from-violet-500/30', 'hover:to-fuchsia-500/30', 'border-violet-500/20'],
    'Frameworks': ['from-cyan-500/20', 'to-teal-500/20', 'hover:from-cyan-500/30', 'hover:to-teal-500/30', 'border-cyan-500/20'],
    'UI/Design': ['from-pink-500/20', 'to-rose-500/20', 'hover:from-pink-500/30', 'hover:to-rose-500/30', 'border-pink-500/20'],
    'Databases': ['from-emerald-500/20', 'to-green-500/20', 'hover:from-emerald-500/30', 'hover:to-green-500/30', 'border-emerald-500/20'],
    'Outils': ['from-orange-500/20', 'to-amber-500/20', 'hover:from-orange-500/30', 'hover:to-amber-500/30', 'border-orange-500/20'],
    'Tools': ['from-orange-500/20', 'to-amber-500/20', 'hover:from-orange-500/30', 'hover:to-amber-500/30', 'border-orange-500/20'],
  };

  // Icône de badge par catégorie
  const categoryIcons: { [key: string]: string } = {
    'Langages': '💻',
    'Languages': '💻',
    'Frameworks': '⚛️',
    'UI/Design': '🎨',
    'Databases': '🗄️',
    'Outils': '🛠️',
    'Tools': '🛠️',
  };

  return (
    <>
      <SectionTitle icon={Layers} title={t.skillsTitle} subtitle={t.skillsSubtitle} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {skillGroups.map((g, groupIndex) => {
          const translatedTitle = language === 'fr' ? g.title :
            g.title === 'Langages' ? 'Languages' :
            g.title === 'Outils' ? 'Tools' :
            g.title;

          const colors = gradientColors[translatedTitle] || gradientColors['Langages'];
          const icon = categoryIcons[translatedTitle] || '📦';

          return (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
            >
              <Card className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent backdrop-blur-xl hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/10">
                {/* Gradient de fond animé */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colors[0]} ${colors[1]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Effet de lumière au survol */}
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />

                <CardHeader className="relative p-5 sm:p-6 border-b border-white/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent group-hover:from-violet-200 group-hover:to-fuchsia-200 transition-all duration-300">
                        {translatedTitle}
                      </h3>
                      <span className="px-2 py-0.5 text-xs font-semibold bg-white/10 text-white/90 rounded-full border border-white/20">
                        {g.items.length}
                      </span>
                    </div>
                    <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                      {icon}
                    </span>
                  </div>
                  <div className="mt-2 h-1 w-12 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full group-hover:w-20 transition-all duration-500" />
                </CardHeader>

                <CardContent className="relative grid grid-cols-3 gap-3 sm:gap-4 p-5 sm:p-6">
                  {g.items.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: groupIndex * 0.1 + index * 0.05
                      }}
                      whileHover={{
                        scale: 1.1,
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.3 }
                      }}
                      className="group/item relative"
                    >
                      <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer">
                        {/* Glow effect */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500/0 to-fuchsia-500/0 group-hover/item:from-violet-500/20 group-hover/item:to-fuchsia-500/20 transition-all duration-300" />

                        {/* Badge de notification (optionnel) */}
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 animate-pulse" />

                        <div className="relative w-12 h-12 sm:w-14 sm:h-14 mb-2 sm:mb-3">
                          {/* Shadow effect */}
                          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 blur-md opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />

                          <img
                            src={item.icon}
                            alt={item.name}
                            className="relative w-full h-full object-contain filter brightness-90 group-hover/item:brightness-110 transition-all duration-300"
                          />
                        </div>

                        <span className="text-xs sm:text-sm text-white/80 group-hover/item:text-white text-center font-medium transition-colors duration-300 line-clamp-2">
                          {item.name}
                        </span>

                        {/* Barre de progression stylée */}
                        <div className="mt-2 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                            initial={{ width: 0 }}
                            whileHover={{ width: "100%" }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Statistique totale */}
      <motion.div
        className="mt-8 sm:mt-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10 border border-white/10 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm sm:text-base text-white/80">
              {language === 'fr' ? 'Total' : 'Total'}:
            </span>
          </div>
          <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            {skillGroups.reduce((acc, g) => acc + g.items.length, 0)}
          </span>
          <span className="text-sm sm:text-base text-white/60">
            {language === 'fr' ? 'compétences' : 'skills'}
          </span>
        </div>
      </motion.div>
    </>
  );
}
