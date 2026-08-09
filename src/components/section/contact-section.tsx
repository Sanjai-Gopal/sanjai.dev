import BlurFade from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/section/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { sanjaiProfile } from "@/data/sanjai-profile";
import { cn } from "@/lib/utils";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";

const BLUR_FADE_DELAY = 0.04;

const methodIcons: Record<
  string,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  Email: Mail,
  Phone: Phone,
  GitHub: Github,
  LinkedIn: Linkedin,
  Location: MapPin,
};

export function ContactSection() {
  return (
    <section id="contact" className="flex min-h-0 flex-col gap-y-8">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <SectionHeading
          eyebrow="Contact"
          title="Let's Build Something Meaningful."
          description={sanjaiProfile.contactDescription}
        />
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {sanjaiProfile.contactMethods.map((method) => {
            const Icon = methodIcons[method.label];
            const inner = (
              <div className="group flex h-full items-start gap-3 rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-muted text-primary transition-colors group-hover:bg-primary/10">
                  {Icon ? <Icon className="size-5" aria-hidden /> : null}
                </span>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {method.label}
                  </span>
                  <span className="break-words text-sm font-semibold">
                    {method.value}
                  </span>
                </div>
              </div>
            );
            return method.href ? (
              <Link
                key={method.label}
                href={method.href}
                target={
                  method.href.startsWith("http") ? "_blank" : undefined
                }
                rel={
                  method.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-2xl"
              >
                {inner}
              </Link>
            ) : (
              <div key={method.label}>{inner}</div>
            );
          })}
        </div>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <div className="flex flex-col items-center gap-3">
          <Link
            href={`mailto:${sanjaiProfile.email}`}
            className={cn(buttonVariants({ size: "lg" }), "cursor-pointer gap-2")}
          >
            <Send className="size-4" aria-hidden />
            Let&apos;s Work Together
          </Link>
          <p className="text-xs text-muted-foreground">
            I usually respond within a day.
          </p>
        </div>
      </BlurFade>
    </section>
  );
}
