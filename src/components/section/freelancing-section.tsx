import BlurFade from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/section/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { sanjaiProfile } from "@/data/sanjai-profile";
import { cn } from "@/lib/utils";
import { ArrowUpRight, CheckCircle2, Send } from "lucide-react";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

export function FreelancingSection() {
  return (
    <section id="freelancing" className="flex min-h-0 flex-col gap-y-8">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <SectionHeading
          eyebrow="Freelancing"
          title="Available for Freelance Projects"
          description={sanjaiProfile.freelancing.description}
        />
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8">
          <div
            className="absolute -top-24 -right-24 size-64 rounded-full bg-primary/10 blur-3xl"
            aria-hidden
          />
          <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-bold tracking-tight">
                I build websites & applications that work.
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Whether you&apos;re an individual, creator, startup, or
                business, I can help you get online with a modern, fast, and
                responsive web presence — from a simple landing page to a
                full-stack application.
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  href="#contact"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "group cursor-pointer w-fit gap-2"
                  )}
                >
                  {sanjaiProfile.freelancing.cta}
                  <ArrowUpRight
                    className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </Link>
                <a
                  href={`mailto:${sanjaiProfile.email}`}
                  className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Send className="size-4" aria-hidden />
                  {sanjaiProfile.email}
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {sanjaiProfile.freelancing.services.map((service, index) => (
                <div
                  key={service}
                  className="flex items-center gap-2.5 rounded-xl border border-border bg-background px-3.5 py-3 text-sm transition-all hover:border-primary/40 hover:bg-muted/40"
                  style={{ transitionDelay: `${index * 10}ms` }}
                >
                  <CheckCircle2 className="size-4 shrink-0 text-primary" aria-hidden />
                  <span className="font-medium">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
