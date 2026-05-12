"use client"

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export function AuroraBackground() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-carbon">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, color-mix(in oklab, var(--ptr-teal) 30%, transparent) 0%, transparent 60%), radial-gradient(circle at 80% 60%, color-mix(in oklab, var(--ptr-red) 18%, transparent) 0%, transparent 70%)",
          }}
        />
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-carbon">
      <div className="absolute inset-0 bg-grain opacity-[0.04] mix-blend-overlay" />

      <motion.div
        className="absolute top-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in oklab, var(--ptr-teal) 35%, transparent) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-[30%] right-[-15%] h-[700px] w-[700px] rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in oklab, var(--ptr-red) 22%, transparent) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={{
          x: [0, -100, 60, 0],
          y: [0, 50, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-[-10%] left-[20%] h-[500px] w-[500px] rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in oklab, var(--ptr-teal) 25%, transparent) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
        animate={{
          x: [0, 60, -80, 0],
          y: [0, -40, 30, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,247,244,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245,247,244,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-carbon to-transparent" />
    </div>
  );
}
