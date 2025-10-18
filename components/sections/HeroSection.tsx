"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Mail } from "lucide-react";
import { Profile } from "@/lib/types";
import { Language } from "@/lib/translations";

interface HeroSectionProps {
  profile: Profile;
  language: Language;
  t: any;
}

export function HeroSection({ profile, language, t }: HeroSectionProps) {
  return (
    <header className="relative mx-auto max-w-6xl px-3 sm:px-4 lg:px-6 pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-12">
      {/* Animated gradient orbs in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-[5%] w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-violet-500/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-20 right-[8%] w-40 h-40 sm:w-56 sm:h-56 rounded-full bg-fuchsia-500/20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.25, 0.45, 0.25],
            x: [0, -40, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-10 left-[15%] w-36 h-36 sm:w-52 sm:h-52 rounded-full bg-cyan-500/20 blur-3xl"
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 20, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full"
            style={{
              top: `${15 + (i * 10)}%`,
              left: `${10 + (i * 10)}%`,
              background: ['#a78bfa', '#e879f9', '#22d3ee', '#4ade80'][i % 4],
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + (i * 0.5),
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative text-center">
        {/* Availability Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 border border-emerald-500/30 backdrop-blur-sm mb-6 sm:mb-8"
        >
          <motion.span
            className="w-2 h-2 rounded-full bg-emerald-400"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs sm:text-sm font-medium text-emerald-300">
            {language === 'fr' ? 'Disponible pour de nouveaux projets' : 'Available for new projects'}
          </span>
        </motion.div>

        {/* Name with animated underline and glow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          {/* Animated glow effect behind name */}
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-violet-500/30 via-fuchsia-500/30 to-cyan-500/30 blur-2xl rounded-full"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [0.95, 1.05, 0.95]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <h1 className="relative inline-block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
            <motion.span
              className="bg-gradient-to-r from-white via-violet-100 to-fuchsia-100 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: '200% 200%' }}
            >
              {profile.name}
            </motion.span>

            {/* Animated underline */}
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 rounded-full overflow-hidden"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </h1>
        </motion.div>

        {/* Professional Title with decorative elements and animations */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative mt-6 sm:mt-8 inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl backdrop-blur-sm overflow-hidden"
        >
          {/* Animated border gradient */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.4), rgba(232, 121, 249, 0.4), rgba(139, 92, 246, 0.4))',
              backgroundSize: '200% 100%'
            }}
            animate={{
              backgroundPosition: ['0% 50%', '200% 50%', '0% 50%']
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-violet-500/20" />

          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="relative h-4 w-4 sm:h-5 sm:w-5 text-violet-300" />
          </motion.div>
          <span className="relative text-base sm:text-lg lg:text-xl xl:text-2xl font-bold bg-gradient-to-r from-violet-200 via-fuchsia-200 to-violet-200 bg-clip-text text-transparent">
            {t.fullstackDeveloper}
          </span>
          <motion.div
            animate={{ rotate: [0, -360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="relative h-4 w-4 sm:h-5 sm:w-5 text-fuchsia-300" />
          </motion.div>
        </motion.div>

        {/* Enhanced Description with reduced text size */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 sm:mt-8 max-w-3xl mx-auto space-y-2 sm:space-y-3"
        >
          <p className="text-xs sm:text-sm lg:text-base text-white/80 leading-relaxed">
            {t.heroDescription}
          </p>
          <p className="text-xs sm:text-sm lg:text-base text-white/70 leading-relaxed">
            {language === 'fr'
              ? "Spécialisé dans la création d'applications web modernes et performantes, je transforme vos idées en solutions digitales innovantes. De la conception à la mise en production, j'assure un accompagnement complet pour garantir la réussite de vos projets."
              : "Specialized in creating modern and high-performance web applications, I transform your ideas into innovative digital solutions. From design to deployment, I provide comprehensive support to ensure the success of your projects."
            }
          </p>
        </motion.div>

        {/* Technology Stack Preview with hover animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          {['Laravel', 'React', 'Next.js', 'Vue.js', 'TypeScript'].map((tech, index) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
              whileHover={{
                scale: 1.1,
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="relative group"
            >
              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-500/40 via-fuchsia-500/40 to-cyan-500/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div className="relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/30 transition-all duration-300">
                <span className="text-xs sm:text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                  {tech}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons with enhanced styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <motion.a
            href={`mailto:${profile.email}`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              size="lg"
              className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500 hover:from-violet-600 hover:via-fuchsia-600 hover:to-violet-600 shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300 text-sm sm:text-base px-6 sm:px-8 h-11 sm:h-12 font-semibold group"
            >
              <span className="relative z-10 flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Mail className="h-4 w-4" />
                </motion.div>
                {t.contactMe}
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
              {/* Pulsing border effect */}
              <motion.div
                className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-white/30"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.98, 1.02, 0.98]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </Button>
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="outline"
              size="lg"
              className="relative overflow-hidden rounded-xl sm:rounded-2xl border-white/20 hover:bg-white/10 hover:border-white/30 backdrop-blur-sm transition-all duration-300 text-sm sm:text-base px-6 sm:px-8 h-11 sm:h-12 font-semibold group"
            >
              <span className="relative flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-4 w-4" />
                </motion.div>
                {t.learnMore}
              </span>
              {/* Shimmer effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </Button>
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-12 sm:mt-16 inline-flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/40">
            {language === 'fr' ? 'Défiler' : 'Scroll'}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-white/40 rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}
