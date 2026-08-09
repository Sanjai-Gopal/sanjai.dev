import { sanjaiProfile } from "@/data/sanjai-profile";
import { Heart } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/60 py-8 pb-28">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 px-6 text-center">
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          Designed &amp; Developed by{" "}
          <span className="font-semibold text-foreground">
            {sanjaiProfile.name}
          </span>
          <Heart className="size-3.5 fill-primary text-primary" aria-hidden />
        </p>
        {sanjaiProfile.portfolioUrl ? (
          <p className="text-xs text-muted-foreground/80">
            Personal Portfolio:{" "}
            <Link
              href={sanjaiProfile.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              {sanjaiProfile.portfolioUrl.replace(/^https?:\/\//, "")}
            </Link>
          </p>
        ) : null}
        <p className="text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} {sanjaiProfile.name}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
