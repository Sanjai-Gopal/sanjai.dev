"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const WORDS = [
  "Creative AI Agents",
  "Full-Stack Web Systems",
  "Real-Time Telemetry APIs",
  "Award-Winning Hackathons",
  "Intelligent ML Workflows",
  "Scalable Production Apps",
];

export function HeroWordCycler() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="relative inline-block h-[1.25em] overflow-hidden align-top text-left font-bold text-primary">
      <AnimatePresence mode="wait">
        <motion.span
          key={WORDS[index]}
          initial={{ y: 30, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -30, opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block bg-gradient-to-r from-blue-500 via-indigo-400 to-emerald-400 bg-clip-text text-transparent dark:from-sky-400 dark:via-indigo-300 dark:to-emerald-300"
        >
          {WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
