import BlurFade from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/section/section-heading";
import { sanjaiProfile } from "@/data/sanjai-profile";
import { Bot, Code2, Trophy } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

const pillars = [
  {
    icon: Bot,
    title: "Autonomous AI Agents",
    description:
      "Designing tool-calling agents, retrieval pipelines, and multi-turn clinical workflows with state machines and offline resilience.",
  },
  {
    icon: Code2,
    title: "Full-Stack Architecture",
    description:
      "Building scalable React 19, Next.js, and FastAPI systems with strict TypeScript, automated testing, and 100/100 performance scores.",
  },
  {
    icon: Trophy,
    title: "Competitive Engineering",
    description:
      "Ranked Top 17 nationally in Data Science & ML, 3rd Prize at BIS Intercollege Hackathon, and active competitor in SIH, ISRO, and UNESCO hackathons.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="flex min-h-0 flex-col gap-y-6 pt-2">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <SectionHeading
          eyebrow="Profile"
          title="Background & Engineering Focus"
          description="A synthesis of computer science fundamentals, applied AI research, and production-grade software delivery."
        />
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="flex flex-col gap-2.5 rounded-2xl border border-border/70 bg-card/40 p-5 transition-all hover:border-border hover:bg-card/80"
              >
                <div className="flex size-9 items-center justify-center rounded-lg border border-border/60 bg-muted/50 text-foreground">
                  <Icon className="size-4" aria-hidden />
                </div>
                <h3 className="text-sm font-semibold text-foreground">
                  {pillar.title}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </BlurFade>
    </section>
  );
}
