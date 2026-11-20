"use client";

import { useState } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section/section-heading";
import { sanjaiProfile } from "@/data/sanjai-profile";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { Sparkles } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

const categories = [
  "All",
  "AI & Agents",
  "Full Stack",
  "Client Work",
  "Competitions",
] as const;

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredProjects =
    activeCategory === "All"
      ? sanjaiProfile.projects
      : sanjaiProfile.projects.filter(
          (project) => "category" in project && project.category === activeCategory
        );

  return (
    <section id="projects" className="flex min-h-0 flex-col gap-y-6">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <SectionHeading
          eyebrow="Projects"
          title="Things I've built"
          description="Projects I've designed, built, and deployed — from autonomous AI agents to production full-stack systems."
        />
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((category) => {
            const count =
              category === "All"
                ? sanjaiProfile.projects.length
                : sanjaiProfile.projects.filter(
                    (p) => "category" in p && p.category === category
                  ).length;

            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "relative inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border bg-card/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                )}
              >
                {category === "AI & Agents" && (
                  <Sparkles className="size-3" aria-hidden />
                )}
                <span>{category}</span>
                <span
                  className={cn(
                    "flex size-4 items-center justify-center rounded-full text-[10px]",
                    isActive
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </BlurFade>

      <motion.div
        layout
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, id) => (
            <motion.div
              layout
              key={project.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, delay: id * 0.04 }}
              className="h-full"
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                tags={project.technologies}
                category={"category" in project ? project.category : undefined}
                highlight={"highlight" in project ? project.highlight : undefined}
                github={project.github}
                live={project.live}
                image={project.image}
                imageAlt={project.imageAlt}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
