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
      <div className="flex items-center w-full gap-4">
        <div className="flex-1 h-px bg-linear-to-r from-transparent via-border to-border" />
        <span className="border bg-primary text-primary-foreground rounded-xl px-4 py-1 text-xs font-medium uppercase tracking-wider">
          {eyebrow}
        </span>
        <div className="flex-1 h-px bg-linear-to-l from-transparent via-border to-border" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-center">
        {title}
      </h2>
      {description ? (
        <p className="text-muted-foreground text-balance text-center max-w-2xl mx-auto">
          {description}
        </p>
      ) : null}
    </div>
  );
}
