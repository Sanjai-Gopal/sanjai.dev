import BlurFade from "@/components/magicui/blur-fade";
import { buttonVariants } from "@/components/ui/button";
import { sanjaiProfile } from "@/data/sanjai-profile";
import { cn } from "@/lib/utils";
import { ArrowDown, Download, Github, Linkedin, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

export function HeroSection() {
  return (
    <section id="hero" className="relative">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-center">
        <div className="flex flex-col gap-6">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              Available for freelance projects
            </span>
          </BlurFade>

          <div className="flex flex-col gap-3">
            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                Hi, I&apos;m {sanjaiProfile.name}
              </p>
            </BlurFade>
            <BlurFade
              delay={BLUR_FADE_DELAY * 3}
              className="bg-linear-to-r from-foreground via-foreground to-primary/60 bg-clip-text text-transparent"
            >
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl">
                {sanjaiProfile.headline}
              </h1>
            </BlurFade>
          </div>

          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="flex flex-wrap gap-2">
              {sanjaiProfile.roles.map((role) => (
                <span
                  key={role}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
                >
                  <Sparkles className="size-3" aria-hidden />
                  {role}
                </span>
              ))}
            </div>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">
              {sanjaiProfile.heroDescription}
            </p>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="#projects"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "group cursor-pointer gap-2"
                )}
              >
                View My Projects
                <ArrowDown
                  className="size-4 transition-transform group-hover:translate-y-0.5"
                  aria-hidden
                />
              </Link>
              <Link
                href={sanjaiProfile.resumeUrl}
                download
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "cursor-pointer gap-2"
                )}
              >
                <Download className="size-4" aria-hidden />
                Download Resume
              </Link>
              <div className="flex items-center gap-2">
                <Link
                  href={sanjaiProfile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-10 cursor-pointer text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Github className="size-5" aria-hidden />
                </Link>
                <Link
                  href={sanjaiProfile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-10 cursor-pointer text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Linkedin className="size-5" aria-hidden />
                </Link>
              </div>
            </div>
          </BlurFade>
        </div>

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
                alt={`${sanjaiProfile.name} — AI & Data Science student and full stack developer`}
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
    </section>
  );
}
