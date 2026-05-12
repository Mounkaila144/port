"use client"

import React from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left"
      style={{
        scaleX: reduceMotion ? scrollYProgress : smoothed,
        background:
          "linear-gradient(to right, var(--ptr-teal), color-mix(in oklab, var(--ptr-teal) 70%, var(--off-white)), var(--ptr-red))",
      }}
    />
  );
}
