"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { SanjaiLogo } from "@/components/sanjai-logo";
import { Icons } from "@/components/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { sanjaiProfile } from "@/data/sanjai-profile";
import { Globe, Home, Mail, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Achievements", href: "#achievements" },
  { label: "Freelancing", href: "#freelancing" },
  { label: "Contact", href: "#contact" },
];

const dockItems = [
  {
    label: "Home",
    icon: Home,
    href: "#",
    external: false,
  },
  {
    label: "GitHub",
    icon: Icons.github,
    href: sanjaiProfile.github,
    external: true,
  },
  {
    label: "LinkedIn",
    icon: Icons.linkedin,
    href: sanjaiProfile.linkedin,
    external: true,
  },
  {
    label: "Email",
    icon: Mail,
    href: `mailto:${sanjaiProfile.email}`,
    external: false,
  },
  {
    label: "Website",
    icon: Globe,
    href: sanjaiProfile.url,
    external: true,
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top Navbar */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          {/* Logo & Name */}
          <a
            href={sanjaiProfile.url}
            className="flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setOpen(false)}
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-card text-foreground shadow-xs">
              <SanjaiLogo className="size-5" />
            </span>
            <span className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-foreground">
              Sanjai
            </span>
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden items-center gap-1 xl:flex lg:flex">
            {navLinks.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-md px-3 py-1.5 text-xs sm:text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right Action Icons & Hire Me Button */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <a
              href={sanjaiProfile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="hidden sm:inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icons.github className="size-4" />
            </a>
            <a
              href={sanjaiProfile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="hidden sm:inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icons.linkedin className="size-4" />
            </a>
            <ModeToggle className="size-8 rounded-lg border border-border/60 bg-muted/20" />
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl bg-foreground px-4 py-1.5 text-xs sm:text-sm font-semibold text-background shadow-xs transition-opacity hover:opacity-90"
            >
              Hire Me
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((prev) => !prev)}
              className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-xl lg:hidden"
            >
              <ul className="flex flex-col gap-1 px-4 py-3">
                {navLinks.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      {/* Floating Bottom Dock (Circular Icons) */}
      <aside aria-label="Quick Actions Dock" className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center px-4">
        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 rounded-full border border-border/70 bg-card/90 px-3 py-1.5 shadow-2xl backdrop-blur-2xl">
          {dockItems.map((item) => {
            const Icon = item.icon;
            return (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    aria-label={item.label}
                    className="flex size-9 sm:size-10 items-center justify-center rounded-full border border-border/60 bg-muted/40 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                  >
                    <Icon className="size-4 sm:size-4.5" />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={10} className="rounded-lg text-xs font-medium">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          })}

          {/* Vertical Separator */}
          <div className="mx-0.5 sm:mx-1 h-5 w-px bg-border/60" />

          {/* Theme Toggle in Dock */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex size-9 sm:size-10 items-center justify-center rounded-full border border-border/60 bg-muted/40 text-muted-foreground transition-all hover:bg-muted hover:text-foreground">
                <ModeToggle className="size-full rounded-full border-0 bg-transparent text-muted-foreground hover:text-foreground" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={10} className="rounded-lg text-xs font-medium">
              Theme
            </TooltipContent>
          </Tooltip>
        </div>
      </aside>
    </>
  );
}
