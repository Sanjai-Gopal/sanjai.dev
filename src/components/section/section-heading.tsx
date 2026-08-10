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
        <div className="flex-1 h-px bg-linear-to-r from-transparent via-border to-border" />
        <span className="border bg-primary text-primary-foreground rounded-lg px-3.5 py-1 text-[11px] font-medium uppercase tracking-wider">
          {eyebrow}
        </span>
        <div className="flex-1 h-px bg-linear-to-l from-transparent via-border to-border" />
      </div>
      <h2 className="text-center text-2xl font-bold tracking-tight leading-tight text-balance sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto max-w-2xl text-center text-balance leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}
