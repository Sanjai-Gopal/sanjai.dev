import BlurFade from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/section/section-heading";
import { sanjaiProfile } from "@/data/sanjai-profile";
import { Rocket, Sparkles, Target } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

const focusAreas = [
  "Full-Stack Development",
  "AI/ML",
  "Deep Learning",
  "Hackathons",
  "Freelance Development",
];

const aboutCards = [
  {
    icon: Rocket,
    title: "Building",
    text: "Modern full-stack applications and responsive websites that ship real value.",
  },
  {
    icon: Target,
    title: "Exploring",
    text: "Machine learning, AI, deep learning, and hackathons.",
  },
  {
    icon: Sparkles,
    title: "Freelancing",
    text: "Available for freelance web and software development projects.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="flex min-h-0 flex-col gap-y-6">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <SectionHeading
          eyebrow="About"
          title="A student developer who ships real things"
          description="A quick snapshot of who I am and what I'm working on."
        />
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <p className="mx-auto max-w-2xl text-center text-pretty leading-relaxed text-muted-foreground">
          {sanjaiProfile.aboutIntro}
        </p>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <div className="flex flex-col gap-2.5 rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4">
          <span className="text-[11px] font-medium uppercase tracking-wide text-primary">
            Current Focus
          </span>
          <div className="flex flex-wrap gap-2">
            {focusAreas.map((area) => (
              <span
                key={area}
                className="inline-flex items-center rounded-full border border-primary/30 bg-background px-2.5 py-1 text-xs font-medium text-foreground"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </BlurFade>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="grid h-full grid-cols-2 content-start gap-3">
            {sanjaiProfile.facts.map((fact) => (
              <div
                key={fact.label}
                className="flex flex-col gap-1 rounded-xl border border-border bg-card p-3.5 transition-colors hover:border-primary/30"
              >
                <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  {fact.label}
                </span>
                <span className="text-sm font-semibold leading-snug break-words">
                  {fact.value}
                </span>
              </div>
            ))}
          </div>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <div className="flex h-full flex-col justify-between gap-3">
            {aboutCards.map((card) => (
              <div
                key={card.title}
                className="flex flex-1 items-start gap-3 rounded-xl border border-border bg-card p-3.5 transition-colors hover:border-primary/30"
              >
                <card.icon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {card.title}
                  </span>
                  <p className="text-sm leading-relaxed">{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
