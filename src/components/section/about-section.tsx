import BlurFade from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/section/section-heading";
import { sanjaiProfile } from "@/data/sanjai-profile";
import { GraduationCap, MapPin, Target, Wrench } from "lucide-react";
import Image from "next/image";

const BLUR_FADE_DELAY = 0.04;

const focusAreas = [
  "Full-stack development",
  "AI/ML exploration",
  "Hackathons",
  "Personal projects",
  "Freelance development",
];

const aboutCards = [
  {
    icon: GraduationCap,
    title: "Currently",
    text: "2nd-year B.Tech AI & Data Science student at SKCET.",
  },
  {
    icon: Wrench,
    title: "Building",
    text: "Modern full-stack applications and responsive websites.",
  },
  {
    icon: Target,
    title: "Exploring",
    text: "Machine learning, AI, hackathons, and personal projects.",
  },
  {
    icon: MapPin,
    title: "Freelancing",
    text: "Available for freelance web and software development.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="flex min-h-0 flex-col gap-y-8">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <SectionHeading
          eyebrow="About"
          title="A student developer who ships real things"
          description="A quick snapshot of who I am and what I'm working on."
        />
      </BlurFade>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:items-start">
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="flex flex-col items-start gap-4">
            <div className="relative">
              <div
                className="absolute -inset-1 rounded-full bg-linear-to-tr from-primary/30 to-transparent blur-lg"
                aria-hidden
              />
              <Image
                src={sanjaiProfile.avatarUrl}
                alt="Sanjai Gopal profile photo"
                width={160}
                height={160}
                sizes="160px"
                className="relative size-32 rounded-full object-cover border border-border ring-4 ring-muted"
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {sanjaiProfile.aboutIntro}
              </p>
              {aboutCards.map((card) => (
                <div
                  key={card.title}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card p-3.5 transition-colors hover:border-primary/30"
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
          </div>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {sanjaiProfile.facts.map((fact, index) => (
              <div
                key={fact.label}
                className="flex flex-col gap-1.5 rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {fact.label}
                </span>
                <span className="text-sm font-semibold leading-snug break-words">
                  {fact.value}
                </span>
              </div>
            ))}
            <div
              className="col-span-2 sm:col-span-3 flex flex-col gap-2.5 rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4"
              aria-hidden
            >
              <span className="text-xs font-medium uppercase tracking-wide text-primary">
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
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
