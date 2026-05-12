"use client"

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { translations, type Language } from "@/lib/translations";

interface SkillsSectionProps {
  skillGroups: {
    title: string;
    items: { name: string; icon: string }[];
  }[];
  language: Language;
}

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

const titleMap: Record<string, string> = {
  Langages: "Languages",
  Outils: "Tools",
};

function MarqueeRow({ items, reverse = false }: { items: { name: string; icon: string }[]; reverse?: boolean }) {
  const doubled = [...items, ...items, ...items];
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex gap-4 sm:gap-6"
        style={{
          animation: `marquee ${items.length * 12}s linear infinite${reverse ? " reverse" : ""}`,
          width: "max-content",
        }}
      >
        {doubled.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="group flex items-center gap-3 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 backdrop-blur-md transition-all duration-300 hover:border-[#C4F046]/40 hover:bg-[#C4F046]/[0.05]"
          >
            <div className="relative h-6 w-6 shrink-0">
              <Image
                src={item.icon}
                alt={item.name}
                width={24}
                height={24}
                unoptimized
                className="h-full w-full object-contain transition-all duration-300 group-hover:scale-110"
              />
            </div>
            <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkillsSection({ skillGroups, language }: SkillsSectionProps) {
  const t = translations[language];
  const total = skillGroups.reduce((acc, g) => acc + g.items.length, 0);

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
          <span>02 / {language === "fr" ? "Stack" : "Stack"}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easing }}
          className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight"
        >
          <span className="text-white">{language === "fr" ? "Outils du" : "Tools of"}</span>
          <br />
          <span className="text-mask-lime italic">{language === "fr" ? "métier" : "the trade"}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: easing }}
          className="max-w-2xl text-base sm:text-lg text-white/60"
        >
          {t.skillsSubtitle} —{" "}
          <span className="font-mono text-[#C4F046]">{total}</span>{" "}
          {language === "fr" ? "technologies au quotidien." : "daily technologies."}
        </motion.p>
      </div>

      {/* Marquee rows */}
      <div className="space-y-4 sm:space-y-5">
        {skillGroups.map((g, idx) => {
          const translatedTitle = language === "fr" ? g.title : titleMap[g.title] || g.title;
          return (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: idx * 0.08, ease: easing }}
              className="space-y-3"
            >
              <div className="flex items-center gap-4 px-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-sm sm:text-base text-white">{translatedTitle}</span>
                <span className="font-mono text-xs text-[#C4F046]">[{g.items.length}]</span>
                <div className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
              </div>
              <MarqueeRow items={g.items} reverse={idx % 2 === 1} />
            </motion.div>
          );
        })}
      </div>

      {/* Stat block */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: easing }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 sm:pt-6"
      >
        {[
          { value: total.toString(), label: language === "fr" ? "Compétences" : "Skills" },
          { value: skillGroups.length.toString(), label: language === "fr" ? "Catégories" : "Categories" },
          { value: "5+", label: language === "fr" ? "Années XP" : "Years XP" },
          { value: "∞", label: language === "fr" ? "Curiosité" : "Curiosity" },
        ].map((s, i) => (
          <div
            key={i}
            className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md transition-all duration-300 hover:border-[#C4F046]/30 hover:bg-[#C4F046]/[0.03]"
          >
            <div className="font-display text-3xl sm:text-4xl text-white group-hover:text-[#C4F046] transition-colors">
              {s.value}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-white/50 mt-1.5">
              {s.label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
