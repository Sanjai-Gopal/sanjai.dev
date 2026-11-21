import BlurFade from "@/components/magicui/blur-fade";
import { buttonVariants } from "@/components/ui/button";
import { CopyEmailButton } from "@/components/copy-email-button";
import { LiveStatusPill } from "@/components/live-status-pill";
import { sanjaiProfile } from "@/data/sanjai-profile";
import { cn } from "@/lib/utils";
import {
  ArrowDown,
  Download,
  Github,
  Linkedin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

export function HeroSection() {
  return (
    <section id="hero" className="relative flex flex-col gap-8 pt-4 sm:pt-6">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-center">
        {/* Left Column: Headline, Bio, Actions */}
        <div className="flex flex-col gap-5">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <LiveStatusPill />
          </BlurFade>

          <div className="flex flex-col gap-2">
            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground">
                {sanjaiProfile.name}
              </h1>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <p className="text-xl sm:text-2xl font-semibold text-foreground/85 tracking-tight">
                AI & Full-Stack Systems Engineer
              </p>
            </BlurFade>
          </div>

          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <p className="max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
              2nd-year B.Tech student in Artificial Intelligence & Data Science at Sri Krishna College of Engineering and Technology (SKCET, 9.0 CGPA). Engineering autonomous AI agents, distributed full-stack platforms, and real-time telemetry systems.
            </p>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="#projects"
                className={cn(
                  buttonVariants({ size: "default" }),
                  "group cursor-pointer gap-2 h-10 px-5 text-xs sm:text-sm font-semibold shadow-sm transition-all hover:opacity-95"
                )}
              >
                View Projects
                <ArrowDown
                  className="size-4 transition-transform group-hover:translate-y-0.5"
                  aria-hidden
                />
              </Link>
              <Link
                href={sanjaiProfile.resumeUrl}
                download
                className={cn(
                  buttonVariants({ variant: "outline", size: "default" }),
                  "cursor-pointer gap-2 border-border/80 bg-background hover:bg-muted h-10 px-4 text-xs sm:text-sm font-medium"
                )}
              >
                <Download className="size-4" aria-hidden />
                Resume
              </Link>
              <CopyEmailButton email={sanjaiProfile.email} />
              <div className="flex items-center gap-1 border-l border-border/60 pl-2">
                <Link
                  href={sanjaiProfile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-9 cursor-pointer text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Github className="size-4 sm:size-5" aria-hidden />
                </Link>
                <Link
                  href={sanjaiProfile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-9 cursor-pointer text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Linkedin className="size-4 sm:size-5" aria-hidden />
                </Link>
              </div>
            </div>
          </BlurFade>
        </div>

        {/* Right Column: Profile Picture with Subtle Ambient Halo */}
        <BlurFade
          delay={BLUR_FADE_DELAY * 4}
          className="justify-self-start md:justify-self-center"
        >
          <div className="relative group">
            {/* Ambient executive glow */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-emerald-500/25 via-sky-500/10 to-transparent blur-md opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
            
            <div className="relative overflow-hidden rounded-full border border-border/80 bg-card p-1 shadow-2xl ring-1 ring-border/50">
              <Image
                src={sanjaiProfile.avatarUrl}
                alt={`${sanjaiProfile.name} — AI & Full Stack Developer`}
                width={512}
                height={512}
                priority
                quality={95}
                sizes="(max-width: 768px) 160px, (max-width: 1200px) 256px, 320px"
                className="size-36 rounded-full object-cover object-[center_28%] md:size-48 lg:size-52"
              />
            </div>

            {/* Active engineering badge */}
            <div className="absolute -bottom-1 right-2 flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-background/95 px-2.5 py-0.5 text-[10px] font-mono font-medium text-emerald-400 shadow-md backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>ACTIVE</span>
            </div>
          </div>
        </BlurFade>
      </div>

      {/* Key Metric Highlights — Minimalist Executive Bar */}
      <BlurFade delay={BLUR_FADE_DELAY * 6}>
        <div className="grid grid-cols-2 gap-3 pt-4 sm:grid-cols-4 border-t border-border/60">
          {sanjaiProfile.metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex flex-col gap-0.5 rounded-xl border border-border/60 bg-card/40 p-3.5 transition-all duration-200 hover:border-emerald-500/30 hover:bg-card/70 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/5"
            >
              <span className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                {metric.value}
              </span>
              <span className="text-xs font-semibold text-foreground/90">
                {metric.label}
              </span>
              <span className="text-[11px] text-muted-foreground leading-normal">
                {metric.description}
              </span>
            </div>
          ))}
        </div>
      </BlurFade>
    </section>
  );
}
