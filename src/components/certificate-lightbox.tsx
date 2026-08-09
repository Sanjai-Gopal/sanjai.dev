"use client";

import { cn } from "@/lib/utils";
import { Download, ExternalLink, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface CertificateLightboxProps {
  open: boolean;
  title: string;
  subtitle?: string;
  src?: string;
  kind?: "image" | "pdf";
  imageWidth?: number;
  imageHeight?: number;
  onClose: () => void;
}

export function CertificateLightbox({
  open,
  title,
  subtitle,
  src,
  kind = "pdf",
  imageWidth = 1280,
  imageHeight = 960,
  onClose,
}: CertificateLightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    restoreFocusRef.current = document.activeElement as HTMLElement | null;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      restoreFocusRef.current?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} preview`}
        >
          <button
            type="button"
            aria-label="Close certificate preview"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative flex h-full w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          >
            <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/40 px-4 py-3">
              <div className="flex min-w-0 flex-col leading-tight">
                <span className="truncate text-sm font-semibold">{title}</span>
                {subtitle ? (
                  <span className="truncate text-xs text-muted-foreground">
                    {subtitle}
                  </span>
                ) : null}
              </div>
              <div className="flex shrink-0 items-center gap-1">
                {kind === "pdf" && src ? (
                  <>
                    <a
                      href={src}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open certificate in a new tab"
                      className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <ExternalLink className="size-4" aria-hidden />
                    </a>
                    <a
                      href={src}
                      download
                      aria-label="Download certificate"
                      className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <Download className="size-4" aria-hidden />
                    </a>
                  </>
                ) : null}
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close certificate preview"
                  className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <X className="size-4" aria-hidden />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto bg-muted/40 p-2 sm:p-4">
              {src ? (
                kind === "pdf" ? (
                  <iframe
                    src={src}
                    title={`${title} certificate`}
                    className="h-full w-full rounded-lg border border-border bg-white"
                  />
                ) : (
                  <div className="flex h-full min-h-0 items-center justify-center">
                    <Image
                      src={src}
                      alt={title}
                      width={imageWidth}
                      height={imageHeight}
                      className={cn(
                        "max-h-full w-auto rounded-lg border border-border bg-white object-contain shadow-sm"
                      )}
                      sizes="(max-width: 1024px) 100vw, 900px"
                    />
                  </div>
                )
              ) : (
                <p className="flex h-full items-center justify-center text-sm text-muted-foreground">
                  Certificate preview is not available.
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
