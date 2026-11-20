"use client";

import { useEffect, useState } from "react";
import { Clock, MapPin, Sparkles } from "lucide-react";

export function LiveStatusPill() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to Indian Standard Time (Asia/Kolkata)
      const istTime = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setTime(istTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      {/* Availability badge */}
      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 font-medium text-emerald-600 shadow-xs backdrop-blur-xs transition-colors dark:text-emerald-400">
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
        </span>
        Open to AI Internships, Hackathons & Freelance
      </span>

      {/* Location & Live Clock */}
      <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-muted-foreground backdrop-blur-xs">
        <MapPin className="size-3 text-primary/70" aria-hidden />
        <span>Coimbatore, IN</span>
        {time && (
          <>
            <span className="opacity-40">·</span>
            <Clock className="size-3 text-muted-foreground/70" aria-hidden />
            <span>{time} IST</span>
          </>
        )}
      </span>

      {/* Current Active Build */}
      <span className="hidden items-center gap-1.5 rounded-full border border-border/60 bg-muted/40 px-3 py-1 font-mono text-[11px] text-muted-foreground sm:inline-flex">
        <Sparkles className="size-3 text-amber-500" aria-hidden />
        <span>Latest: CareNest AI</span>
      </span>
    </div>
  );
}
