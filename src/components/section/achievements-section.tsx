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
    <section id="achievements" className="flex min-h-0 flex-col gap-y-8">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <SectionHeading
          eyebrow="Achievements"
          title="Highlights so far"
          description="A few milestones from competitions, hackathons, and projects."
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
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-muted text-primary transition-colors group-hover:bg-primary/10">
                    <Icon className="size-5" aria-hidden />
                  </span>
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
        title="BIS Smart Consumer Competition"
        subtitle="3rd Runner-Up — presenting the project"
        src={photo ?? undefined}
        kind="image"
        onClose={() => setPhoto(null)}
      />
    </section>
  );
}
