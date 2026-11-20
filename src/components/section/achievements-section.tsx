"use client";

import { CertificateLightbox } from "@/components/certificate-lightbox";
import BlurFade from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/section/section-heading";
import { sanjaiProfile } from "@/data/sanjai-profile";
import { cn } from "@/lib/utils";
import { BookOpenCheck, BrainCircuit, Globe, Rocket, Trophy } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const BLUR_FADE_DELAY = 0.04;

const achievementIcons = [Trophy, Rocket, BrainCircuit, Globe, BookOpenCheck];

export function AchievementsSection() {
  const [photo, setPhoto] = useState<string | null>(null);

  return (
    <section id="achievements" className="flex min-h-0 flex-col gap-y-6">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <SectionHeading
          eyebrow="Recognition"
          title="Hackathons & Engineering Honors"
          description="National hackathon placements, Smart India Hackathon blockchain systems, and top national rankings in applied machine learning."
        />
      </BlurFade>

      <div className="relative ml-2 flex flex-col gap-6 border-l border-border/80 pl-6 sm:ml-4 sm:pl-8">
        {sanjaiProfile.achievements.map((achievement, index) => {
          const Icon = achievementIcons[index % achievementIcons.length];
          return (
            <BlurFade
              key={achievement.title}
              delay={BLUR_FADE_DELAY * 2 + index * 0.05}
            >
              <div className="relative">
                {/* Glowing emerald timeline node */}
                <span className="absolute -left-[33px] top-1.5 flex size-4 items-center justify-center rounded-full border border-border bg-background sm:-left-[41px]">
                  <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                </span>
                <div
                  className={cn(
                    "group flex h-full flex-col gap-3 rounded-2xl border border-border/80 bg-card/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/35 hover:shadow-lg hover:shadow-emerald-500/5"
                  )}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-muted/60 text-emerald-400 transition-colors group-hover:border-emerald-500/40 group-hover:bg-emerald-950/30">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    {"tag" in achievement && achievement.tag ? (
                      <span className="inline-flex rounded-full border border-border/70 bg-background/80 px-2.5 py-0.5 text-[11px] font-mono font-medium text-muted-foreground">
                        {achievement.tag}
                      </span>
                    ) : null}
                  </div>
                  <h3 className="font-semibold text-foreground leading-snug group-hover:text-emerald-300 transition-colors">
                    {achievement.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {achievement.description}
                  </p>
                  {"photos" in achievement ? (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {achievement.photos.map((src, photoIndex) => (
                        <button
                          key={src}
                          type="button"
                          onClick={() => setPhoto(src)}
                          aria-label={`View photo ${photoIndex + 1}`}
                          className="relative size-20 overflow-hidden rounded-lg border border-border/80 transition-all duration-300 hover:scale-105 hover:border-emerald-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <Image
                            src={src}
                            alt={`${achievement.title} — photo ${photoIndex + 1}`}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </BlurFade>
          );
        })}
      </div>

      <CertificateLightbox
        open={Boolean(photo)}
        title="BIS Smart Consumer Intercollege Hackathon"
        subtitle="3rd Prize — presenting the ComplyAI project"
        src={photo ?? undefined}
        kind="image"
        onClose={() => setPhoto(null)}
      />
    </section>
  );
}
