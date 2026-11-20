import BlurFade from "@/components/magicui/blur-fade";
import { buttonVariants } from "@/components/ui/button";
import { CopyEmailButton } from "@/components/copy-email-button";
import { HeroTerminal } from "@/components/hero-terminal";
import { HeroWordCycler } from "@/components/hero-word-cycler";
import { LiveStatusPill } from "@/components/live-status-pill";
import { sanjaiProfile } from "@/data/sanjai-profile";
import { cn } from "@/lib/utils";
import {
  ArrowDown,
  Award,
  BookOpen,
  Bot,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Sparkles,
  Trophy,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

export function HeroSection() {
  return (
    <section id="hero" className="relative flex flex-col gap-6 pt-1 sm:pt-2">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[380px] w-[620px] -translate-x-1/2 rounded-full bg-linear-to-tr from-primary/15 via-sky-500/10 to-emerald-500/10 blur-[110px]"
        aria-hidden
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-center">
        {/* Left Column: Headline, Bio, Actions */}
        <div className="flex flex-col gap-4">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <LiveStatusPill />
          </BlurFade>

          <div className="flex flex-col gap-3">
            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <div className="flex items-center gap-2">
                <span className="h-px w-6 bg-primary/60" aria-hidden />
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:text-sm">
                  Hi, I&apos;m {sanjaiProfile.name}
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem] leading-[1.15]">
                Building Intelligent Software,{" "}
                <br className="hidden sm:inline" />
                <HeroWordCycler />{" "}
                <br className="hidden sm:inline" />
                & Autonomous Systems.
              </h1>
            </BlurFade>
          </div>

          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="flex flex-wrap gap-2">
              {sanjaiProfile.roles.map((role) => (
                <span
                  key={role}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground shadow-xs transition-all hover:border-primary/40 hover:text-foreground hover:shadow-xs"
                >
                  <Sparkles className="size-3 text-primary/70" aria-hidden />
                  {role}
                </span>
              ))}
            </div>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <p className="max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
              {sanjaiProfile.heroDescription}
            </p>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <Link
                href="#projects"
                className={cn(
                  buttonVariants({ size: "default" }),
                  "group cursor-pointer gap-2 shadow-md shadow-primary/20 h-10 px-4 text-xs sm:text-sm font-semibold"
                )}
              >
                View Projects
                <ArrowDown
                  className="size-4 transition-transform group-hover:translate-y-0.5"
                  aria-hidden
                />
              </Link>
              <CopyEmailButton email={sanjaiProfile.email} />
              <Link
                href={sanjaiProfile.resumeUrl}
                download
                className={cn(
                  buttonVariants({ variant: "outline", size: "default" }),
                  "cursor-pointer gap-2 border-border/80 bg-background/60 backdrop-blur-xs hover:bg-muted h-10 px-4 text-xs sm:text-sm"
                )}
              >
                <Download className="size-4" aria-hidden />
                Resume
              </Link>
              <div className="flex items-center gap-0.5">
                <Link
                  href={sanjaiProfile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
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
                  aria-label="LinkedIn"
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

        {/* Right Column: Profile Picture */}
        <BlurFade
          delay={BLUR_FADE_DELAY * 4}
          className="justify-self-start md:justify-self-center"
        >
          <div className="group relative">
            <div
              className="absolute -inset-1 rounded-full bg-linear-to-tr from-primary/30 via-primary/10 to-transparent blur-xl"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-full border border-border bg-muted shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)] ring-4 ring-muted transition-transform duration-300 group-hover:scale-[1.02]">
              <Image
                src={sanjaiProfile.avatarUrl}
                alt={`${sanjaiProfile.name} — AI & Full Stack Developer`}
                width={256}
                height={256}
                priority
                sizes="(max-width: 768px) 160px, 256px"
                className="size-40 rounded-full object-cover md:size-56 lg:size-64"
              />
            </div>
          </div>
        </BlurFade>
      </div>

      {/* Interactive Terminal / Live Console Sandbox */}
      <BlurFade delay={BLUR_FADE_DELAY * 7}>
        <div className="pt-2">
          <HeroTerminal />
        </div>
      </BlurFade>

      {/* Key Metric Highlights */}
      <BlurFade delay={BLUR_FADE_DELAY * 8}>
        <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
          {"metrics" in sanjaiProfile
            ? sanjaiProfile.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="group relative flex flex-col gap-1 overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-4 shadow-xs backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-card hover:shadow-lg hover:shadow-primary/5"
                >
                  <div
                    className="absolute -right-8 -top-8 size-20 rounded-full bg-primary/5 blur-xl group-hover:bg-primary/10 transition-colors"
                    aria-hidden
                  />
                  <span className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                    {metric.value}
                  </span>
                  <span className="text-xs font-semibold text-foreground">
                    {metric.label}
                  </span>
                  <span className="text-[11px] leading-tight text-muted-foreground">
                    {metric.description}
                  </span>
                </div>
              ))
            : null}
        </div>
      </BlurFade>
    </section>
  );
}
