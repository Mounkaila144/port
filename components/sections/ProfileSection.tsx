"use client"

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Github, ArrowUpRight, Sparkles } from "lucide-react";
import { translations, type Language } from "@/lib/translations";
import { MagneticButton } from "@/components/shared/MagneticButton";

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

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

function WordReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: delay + i * 0.06, ease: easing }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function ProfileSection({ profile, language }: ProfileSectionProps) {
  const t = translations[language];

  return (
    <section className="relative pt-4 sm:pt-8 lg:pt-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left column — Massive headline */}
        <div className="lg:col-span-8 space-y-6 sm:space-y-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-white/50"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C4F046] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C4F046]" />
            </span>
            <span>{language === "fr" ? "Disponible pour de nouveaux projets" : "Available for new projects"}</span>
          </motion.div>

          <h1 className="font-display text-[14vw] sm:text-[10vw] lg:text-[8.5vw] xl:text-[7.5vw] leading-[0.9] tracking-[-0.04em] font-bold">
            <WordReveal text={profile.name.split(" ")[0]} className="block text-white" />
            <WordReveal text={profile.name.split(" ").slice(1).join(" ")} className="block text-mask-lime" delay={0.15} />
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: easing }}
            className="flex flex-wrap items-center gap-2 sm:gap-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-mono backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-[#C4F046]" />
              {t.fullstackDeveloper}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-mono text-white/70 backdrop-blur-md">
              <MapPin className="h-3.5 w-3.5" />
              {profile.location}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: easing }}
            className="max-w-2xl text-base sm:text-lg lg:text-xl leading-relaxed text-white/70"
          >
            {t.heroDescription}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: easing }}
            className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2"
          >
            <MagneticButton>
              <a
                href="https://wa.me/227979781199"
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#C4F046] px-7 py-4 text-sm font-semibold text-[#08080C] transition-shadow duration-500 hover:shadow-[0_0_50px_-10px_rgba(196,240,70,0.7)]"
              >
                <span className="relative z-10">{t.contactMe}</span>
                <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-700 group-hover:translate-x-0" />
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/10"
              >
                <Github className="h-4 w-4" />
                {t.github}
              </a>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right column — Photo + stats */}
        <div className="lg:col-span-4 space-y-4 sm:space-y-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: easing }}
            className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10"
          >
            <Image
              src={profile.photo}
              alt={profile.name}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              priority
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08080C] via-transparent to-transparent" />

            <div className="absolute left-4 right-4 bottom-4 flex items-end justify-between">
              <div className="space-y-1">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">2026</div>
                <div className="font-display text-2xl text-white">{profile.role}</div>
              </div>
              <div className="rounded-full border border-[#C4F046]/40 bg-[#C4F046]/10 px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-[#C4F046] backdrop-blur-md">
                v5.0
              </div>
            </div>

            {/* Decorative corner ticks */}
            <div className="absolute top-3 left-3 h-3 w-3 border-l border-t border-white/40" />
            <div className="absolute top-3 right-3 h-3 w-3 border-r border-t border-white/40" />
            <div className="absolute bottom-3 left-3 h-3 w-3 border-l border-b border-white/40" />
            <div className="absolute bottom-3 right-3 h-3 w-3 border-r border-b border-white/40" />
          </motion.div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { value: "5+", label: language === "fr" ? "Années" : "Years" },
              { value: "98+", label: language === "fr" ? "Projets" : "Projects" },
              { value: "30+", label: language === "fr" ? "Stack" : "Stack" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + i * 0.1, ease: easing }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-3 sm:p-4 backdrop-blur-md transition-colors hover:border-[#C4F046]/30 hover:bg-white/[0.06]"
              >
                <div className="font-display text-2xl sm:text-3xl text-white group-hover:text-[#C4F046] transition-colors">
                  {stat.value}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-white/50 mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact strip */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1, ease: easing }}
        className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-3"
      >
        {[
          { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
          { icon: Phone, label: profile.phone, href: `tel:${profile.phone}` },
          { icon: Github, label: "github.com/mounkaila144", href: profile.github },
        ].map((c, i) => (
          <a
            key={i}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md transition-all duration-300 hover:border-[#C4F046]/30 hover:bg-[#C4F046]/[0.04]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-colors group-hover:border-[#C4F046]/40 group-hover:bg-[#C4F046]/10">
              <c.icon className="h-4 w-4 text-white/70 group-hover:text-[#C4F046] transition-colors" />
            </div>
            <span className="text-sm text-white/70 group-hover:text-white transition-colors truncate">
              {c.label}
            </span>
            <ArrowUpRight className="ml-auto h-4 w-4 text-white/30 transition-all duration-300 group-hover:text-[#C4F046] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        ))}
      </motion.div>
    </section>
  );
}
