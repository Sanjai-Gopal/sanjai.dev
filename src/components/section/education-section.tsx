import BlurFade from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/section/section-heading";
import { sanjaiProfile } from "@/data/sanjai-profile";
import { GraduationCap, MapPin } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export function EducationSection() {
  const edu = sanjaiProfile.education;
  return (
    <section id="education" className="flex min-h-0 flex-col gap-y-8">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <SectionHeading eyebrow="Education" title="Where I study" />
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8">
          <div
            className="absolute -bottom-24 -left-24 size-64 rounded-full bg-primary/10 blur-3xl"
            aria-hidden
          />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-muted text-primary">
                <GraduationCap className="size-6" aria-hidden />
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-bold tracking-tight">{edu.school}</h3>
                <p className="text-sm text-muted-foreground">{edu.degree}</p>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="size-3.5" aria-hidden />
                  {edu.location}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-1.5 text-sm font-medium">
                {edu.status}
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-1.5 text-sm font-medium">
                CGPA: {edu.cgpa}
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-1.5 text-sm font-medium">
                {edu.start} – {edu.end}
              </span>
            </div>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
