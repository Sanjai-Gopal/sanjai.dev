"use client";

import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-[2.5px] origin-left bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
      aria-hidden="true"
    />
  );
}
