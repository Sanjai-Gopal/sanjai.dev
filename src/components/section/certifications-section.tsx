"use client";

import { CertificateLightbox } from "@/components/certificate-lightbox";
import BlurFade from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/section/section-heading";
import { sanjaiProfile } from "@/data/sanjai-profile";
import { cn } from "@/lib/utils";
import { Award, ExternalLink, ShieldCheck } from "lucide-react";
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

  const [filter, setFilter] = useState<string>("All");

  const categories = [
    "All",
    "AI & Deep Learning",
    "Data & Analytics",
    "Cloud & Systems",
    "Hackathons & Design",
  ];

  const filteredCerts = sanjaiProfile.certifications.filter((cert) => {
    if (filter === "All") return true;
    if (filter === "AI & Deep Learning") {
      return (
        cert.provider.includes("DeepLearning") ||
        cert.provider.includes("Google") ||
        cert.provider.includes("Saylor") ||
        cert.name.toLowerCase().includes("ai") ||
        cert.name.toLowerCase().includes("learning")
      );
    }
    if (filter === "Data & Analytics") {
      return (
        cert.provider.includes("NPTEL") ||
        cert.provider.includes("Infotact") ||
        cert.name.toLowerCase().includes("data") ||
        cert.name.toLowerCase().includes("python")
      );
    }
    if (filter === "Cloud & Systems") {
      return (
        cert.provider.includes("IBM") ||
        cert.provider.includes("AWS") ||
        cert.provider.includes("IIIT") ||
        cert.name.toLowerCase().includes("git") ||
        cert.name.toLowerCase().includes("cloud") ||
        cert.name.toLowerCase().includes("c++")
      );
    }
    if (filter === "Hackathons & Design") {
      return (
        cert.provider.includes("Canva") ||
        cert.provider.includes("ISRO") ||
        cert.provider.includes("SKCET") ||
        cert.name.toLowerCase().includes("hackathon") ||
        cert.name.toLowerCase().includes("canva")
      );
    }
    return true;
  });

  return (
    <section id="certifications" className="flex min-h-0 flex-col gap-y-6">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <SectionHeading
          eyebrow="Certifications"
          title="Verified Certifications & Learning"
          description="Official credentials, academic specializations, and hackathon recognitions verified across Coursera, DeepLearning.AI, Google, NPTEL, and ISRO."
        />
      </BlurFade>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={cn(
              "cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold transition-all",
              filter === cat
                ? "bg-primary text-primary-foreground shadow-xs"
                : "border border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            {cat}
          </button>
        ))}
        <span className="ml-auto text-xs font-medium text-muted-foreground">
          Showing {filteredCerts.length} of {sanjaiProfile.certifications.length} credentials
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCerts.map((cert, index) => {
          const hasUrl = Boolean("url" in cert && cert.url);
          const hasPdf = Boolean("pdfUrl" in cert && cert.pdfUrl);

          return (
            <BlurFade
              key={`${cert.name}-${index}`}
              delay={BLUR_FADE_DELAY * 2 + Math.min(index * 0.03, 0.4)}
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
                    {"license" in cert && cert.license ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 text-[10px] font-mono font-medium text-primary">
                        <ShieldCheck className="size-3" />
                        {cert.license}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {hasPdf ? (
                      <button
                        type="button"
                        onClick={() => {
                          const certRecord = cert as {
                            name: string;
                            type: string;
                            provider?: string;
                            pdfUrl?: string;
                          };
                          const subtitleText = certRecord.provider
                            ? `${certRecord.provider} · ${certRecord.type}`
                            : certRecord.type;
                          setActive({
                            title: certRecord.name,
                            subtitle: subtitleText,
                            src: certRecord.pdfUrl ?? "",
                            kind: "pdf",
                          });
                        }}
                        aria-label={`View ${cert.name} certificate`}
                        className="group/btn inline-flex w-fit cursor-pointer items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
                      >
                        View Certificate
                        <ExternalLink
                          className="size-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                          aria-hidden
                        />
                      </button>
                    ) : null}

                    {hasUrl ? (
                      <a
                        href={(cert as { url: string }).url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn inline-flex w-fit cursor-pointer items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary transition-all hover:bg-primary/10"
                      >
                        Verify Credential
                        <ExternalLink
                          className="size-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                          aria-hidden
                        />
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </BlurFade>
          );
        })}
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
