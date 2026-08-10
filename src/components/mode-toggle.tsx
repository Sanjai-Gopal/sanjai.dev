"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ModeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "size-8 shrink-0 cursor-pointer rounded-md text-muted-foreground hover:text-foreground",
        className
      )}
    >
      <MoonIcon className="size-[18px] dark:hidden" aria-hidden />
      <SunIcon className="hidden size-[18px] dark:block" aria-hidden />
    </Button>
  );
}
