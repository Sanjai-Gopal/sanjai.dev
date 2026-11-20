import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center w-full gap-3">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border/70 to-border" />
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card/70 px-3.5 py-1 text-[11px] font-mono font-medium tracking-wider text-muted-foreground uppercase backdrop-blur-md shadow-xs">
          <span className="size-1.5 rounded-full bg-emerald-500/80" />
          {eyebrow}
        </span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-border/70 to-border" />
      </div>
      <h2 className="text-center text-2xl font-bold tracking-tight leading-tight text-balance sm:text-3xl text-foreground">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto max-w-2xl text-center text-balance text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
