"use client";

import { CertificateLightbox } from "@/components/certificate-lightbox";
import BlurFade from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/section/section-heading";
import { sanjaiProfile } from "@/data/sanjai-profile";
import { cn } from "@/lib/utils";
import { Award, ExternalLink } from "lucide-react";
import { useState } from "react";

const BLUR_FADE_DELAY = 0.04;

const coverGradients = [
  "from-emerald-500/25 via-teal-500/10 to-transparent",
  "from-sky-500/25 via-blue-500/10 to-transparent",
  "from-fuchsia-500/25 via-purple-500/10 to-transparent",
  "from-amber-500/25 via-orange-500/10 to-transparent",
  "from-rose-500/25 via-pink-500/10 to-transparent",
  "from-indigo-500/25 via-violet-500/10 to-transparent",
  "from-cyan-500/25 via-sky-500/10 to-transparent",
];

export function CertificationsSection() {
  const [active, setActive] = useState<{
    title: string;
    subtitle: string;
    src: string;
    kind: "pdf" | "image";
  } | null>(null);

  return (
    <section id="certifications" className="flex min-h-0 flex-col gap-y-8">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <SectionHeading
          eyebrow="Certifications"
          title="Certifications & learning"
          description="Courses and certifications I've completed on my learning journey."
        />
      </BlurFade>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sanjaiProfile.certifications.map((cert, index) => (
            <BlurFade
              key={cert.name}
              delay={BLUR_FADE_DELAY * 2 + index * 0.04}
              className="h-full"
            >
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                <div
                  className={cn(
                    "relative flex h-24 shrink-0 items-center justify-center overflow-hidden bg-linear-to-br",
                    coverGradients[index % coverGradients.length]
                  )}
                >
                  <div
                    className="absolute inset-0 opacity-[0.12]"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
                      backgroundSize: "20px 20px",
                    }}
                    aria-hidden
                  />
                  <span className="flex size-12 items-center justify-center rounded-2xl border border-border bg-background/80 text-primary backdrop-blur transition-transform duration-300 group-hover:scale-105">
                    <Award className="size-6" aria-hidden />
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <h3 className="font-semibold leading-snug">{cert.name}</h3>
                  <div className="mt-auto flex flex-wrap items-center gap-2">
                    {cert.provider ? (
                      <span className="inline-flex rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground">
                        {cert.provider}
                      </span>
                    ) : null}
                    <span className="inline-flex rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      {cert.type}
                    </span>
                  </div>
                  {"pdfUrl" in cert ? (
                    <button
                      type="button"
                      onClick={() =>
                        setActive({
                          title: cert.name,
                          subtitle: cert.provider
                            ? `${cert.provider} · ${cert.type}`
                            : cert.type,
                          src: cert.pdfUrl,
                          kind: "pdf",
                        })
                      }
                      aria-label={`View ${cert.name} certificate`}
                      className="group/btn mt-1 inline-flex w-fit cursor-pointer items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
                    >
                      View Certificate
                      <ExternalLink
                        className="size-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                        aria-hidden
                      />
                    </button>
                  ) : null}
                </div>
              </div>
            </BlurFade>
        ))}
      </div>

      <CertificateLightbox
        open={Boolean(active)}
        title={active?.title ?? ""}
        subtitle={active?.subtitle}
        src={active?.src}
        kind={active?.kind ?? "pdf"}
        onClose={() => setActive(null)}
      />
    </section>
  );
}
