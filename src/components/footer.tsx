import { sanjaiProfile } from "@/data/sanjai-profile";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/40 py-10 pb-28 text-center">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-2 px-6">
        <p className="text-sm text-muted-foreground">
          Designed &amp; Developed by{" "}
          <a
            href={sanjaiProfile.url}
            className="font-bold text-foreground underline underline-offset-4 decoration-foreground/80 hover:text-primary transition-colors"
          >
            Sanjai Gopal
          </a>{" "}
          🤍
        </p>
        <p className="text-xs text-muted-foreground/80">
          AI &amp; Data Science Student • Full Stack Developer • Freelancer
        </p>
        <p className="pt-1 text-xs text-muted-foreground/50">
          © {new Date().getFullYear()} Sanjai Gopal. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
