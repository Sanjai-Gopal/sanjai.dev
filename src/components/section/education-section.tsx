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
        <SectionHeading
          eyebrow="Education"
          title="Academic Background & Foundation"
          description="Formal computer science foundation in Artificial Intelligence, Data Structures, Algorithms, and Mathematics at SKCET."
        />
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-6 sm:p-7 backdrop-blur-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex size-11 sm:size-12 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-muted/50 text-foreground">
                <GraduationCap className="size-6" aria-hidden />
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground">
                  {edu.school}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                  {edu.degree}
                </p>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground/80 pt-0.5">
                  <MapPin className="size-3.5" aria-hidden />
                  {edu.location}
                </p>
              </div>
            </div>

            {/* Badges on right side stacked in two rows */}
            <div className="flex flex-col gap-2 sm:items-end shrink-0">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-xl border border-border/70 bg-muted/40 px-3 py-1 text-xs font-medium text-foreground">
                  {edu.status}
                </span>
                <span className="inline-flex items-center rounded-xl border border-border/70 bg-muted/40 px-3 py-1 text-xs font-medium text-foreground">
                  CGPA: {edu.cgpa}
                </span>
              </div>
              <div>
                <span className="inline-flex items-center rounded-xl border border-border/70 bg-muted/40 px-3 py-1 text-xs font-medium text-foreground">
                  {edu.start} – {edu.end}
                </span>
              </div>
            </div>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
