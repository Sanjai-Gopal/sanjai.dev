"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Github, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: readonly string[];
  github?: string;
  live?: string;
  image?: string;
  imageAlt?: string;
  className?: string;
}

export function ProjectCard({
  title,
  description,
  tags,
  github,
  live,
  image,
  imageAlt,
  className,
}: ProjectCardProps) {
  const hasLinks = Boolean(live || github);

  return (
    <div
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5",
        className
      )}
    >
      <div className="relative aspect-video shrink-0 overflow-hidden bg-muted">
        {image ? (
          <Image
            src={image}
            alt={imageAlt ?? `${title} project screenshot`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary/10 via-muted to-background">
            <span
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
                backgroundSize: "20px 20px",
              }}
              aria-hidden
            />
            <ShieldCheck
              className="relative size-10 text-primary/50"
              aria-hidden
            />
          </div>
        )}
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent"
          aria-hidden
        />
        <div className="absolute right-3 top-3 flex gap-1.5">
          {live ? (
            <Link
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} live demo`}
              onClick={(e) => e.stopPropagation()}
              className="flex size-8 items-center justify-center rounded-lg border border-white/20 bg-black/50 text-white backdrop-blur transition-all hover:bg-black/70 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          ) : null}
          {github ? (
            <Link
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} source code`}
              onClick={(e) => e.stopPropagation()}
              className="flex size-8 items-center justify-center rounded-lg border border-white/20 bg-black/50 text-white backdrop-blur transition-all hover:bg-black/70 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Github className="size-4" aria-hidden />
            </Link>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold leading-snug">{title}</h3>
          <ArrowUpRight
            className="size-4 shrink-0 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 group-hover:text-primary"
            aria-hidden
          />
        </div>
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        {tags && tags.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border border-border text-[11px] font-medium h-6 px-2"
              >
                {tag}
              </Badge>
            ))}
          </div>
        ) : null}
        {hasLinks ? (
          <div className="flex flex-wrap items-center gap-3 pt-1">
            {live ? (
              <Link
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 transition-all duration-300 group-hover:-translate-y-px hover:underline"
              >
                Live Demo
                <ArrowUpRight className="size-3.5" aria-hidden />
              </Link>
            ) : null}
            {github ? (
              <Link
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground underline-offset-4 transition-all duration-300 group-hover:-translate-y-px hover:text-foreground hover:underline"
              >
                <Github className="size-3.5" aria-hidden />
                GitHub
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
