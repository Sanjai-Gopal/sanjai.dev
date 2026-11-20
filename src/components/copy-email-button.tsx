"use client";

import { useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CopyEmailButtonProps {
  email: string;
  variant?: "outline" | "ghost" | "default";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showLabel?: boolean;
}

export function CopyEmailButton({
  email,
  variant = "outline",
  size = "lg",
  className,
  showLabel = true,
}: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Email copied to clipboard" : `Copy email: ${email}`}
      className={cn(
        buttonVariants({ variant, size }),
        "group cursor-pointer gap-2 transition-all",
        copied && "border-emerald-500/50 text-emerald-600 dark:text-emerald-400",
        className
      )}
    >
      {copied ? (
        <>
          <Check className="size-4 text-emerald-500 animate-in zoom-in-50" aria-hidden />
          {showLabel && <span>Copied!</span>}
        </>
      ) : (
        <>
          <Copy className="size-4 transition-transform group-hover:scale-110" aria-hidden />
          {showLabel && <span>Copy Email</span>}
        </>
      )}
    </button>
  );
}
