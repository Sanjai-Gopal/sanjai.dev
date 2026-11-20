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

      <div className="relative ml-2 flex flex-col gap-6 border-l border-border pl-6 sm:ml-4 sm:pl-8">
        {sanjaiProfile.achievements.map((achievement, index) => {
          const Icon = achievementIcons[index % achievementIcons.length];
          return (
            <BlurFade
              key={achievement.title}
              delay={BLUR_FADE_DELAY * 2 + index * 0.05}
            >
              <div className="relative">
                <span className="absolute -left-[33px] top-1.5 flex size-4 items-center justify-center rounded-full border border-border bg-background sm:-left-[41px]">
                  <span className="size-1.5 rounded-full bg-primary" />
                </span>
                <div
                  className={cn(
                    "group flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                  )}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-muted text-primary transition-colors group-hover:bg-primary/10">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    {"tag" in achievement && achievement.tag ? (
                      <span className="inline-flex rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                        {achievement.tag}
                      </span>
                    ) : null}
                  </div>
                  <h3 className="font-semibold leading-snug">
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
                          className="relative size-20 overflow-hidden rounded-lg border border-border transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
