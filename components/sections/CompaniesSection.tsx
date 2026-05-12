"use client"

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Globe } from "lucide-react";
import { translations, type Language } from "@/lib/translations";
import type { Company } from "@/content/types";

interface CompaniesSectionProps {
  companies: Company[];
  language: Language;
}

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function CompaniesSection({ companies, language }: CompaniesSectionProps) {
  const t = translations[language];

  const getDesc = (c: Company) =>
    language === "fr"
      ? c.desc
      : c.id === "freelance"
        ? t.companyDescriptions.freelance
        : c.id === "icall"
          ? t.companyDescriptions.icall
          : c.id === "ptr-niger"
            ? t.companyDescriptions.ptrNiger
            : c.id === "idev-niger"
              ? t.companyDescriptions.idevNiger
              : c.desc;

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
          <span>04 / {language === "fr" ? "Parcours" : "Journey"}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easing }}
          className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight"
        >
          <span className="text-white">{language === "fr" ? "Là où j'ai" : "Where I've"}</span>{" "}
          <span className="text-mask-lime italic">{language === "fr" ? "construit" : "built"}</span>
        </motion.h2>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#C4F046]/40 via-white/10 to-transparent" />

        <div className="space-y-4 sm:space-y-5">
          {companies.map((c, idx) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: idx * 0.08, ease: easing }}
              className="relative pl-12 sm:pl-16 group"
            >
              {/* Dot */}
              <div className="absolute left-2.5 sm:left-4.5 top-6 flex h-3 w-3 items-center justify-center">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#C4F046] opacity-30 group-hover:opacity-60 transition-opacity" />
                <span className="relative h-2 w-2 rounded-full bg-[#C4F046]" />
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 backdrop-blur-md transition-all duration-500 hover:border-[#C4F046]/25 hover:bg-white/[0.04]">
                <div className="grid grid-cols-1 sm:grid-cols-[140px,1fr] gap-4 sm:gap-6 items-start">
                  <div className="space-y-2">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C4F046]">
                      {c.years}
                    </div>
                    <div className="font-display text-xl sm:text-2xl text-white tracking-tight">
                      {c.name}
                    </div>
                    <div className="text-xs font-mono text-white/50">{c.role}</div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                      {getDesc(c)}
                    </p>
                    {c.site !== "#" && (
                      <a
                        href={c.site}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#C4F046] hover:text-[#D4FF5A] transition-colors"
                      >
                        <Globe className="h-3 w-3" />
                        {t.site}
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
