"use client";

import { useEffect, useState, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Check,
  Command,
  Copy,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Home,
  Layers,
  Linkedin,
  Mail,
  Moon,
  Search,
  Sparkles,
  Sun,
  User,
  X,
} from "lucide-react";
import { sanjaiProfile } from "@/data/sanjai-profile";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface CommandItem {
  id: string;
  title: string;
  description?: string;
  category: "Navigation" | "Projects" | "Actions";
  icon: typeof Home;
  action: () => void;
  keywords?: string;
}

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const { theme, setTheme } = useTheme();

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const items: CommandItem[] = useMemo(() => {
    return [
      // Navigation
      {
        id: "nav-home",
        title: "Home",
        description: "Back to top",
        category: "Navigation",
        icon: Home,
        action: () => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setOpen(false);
        },
      },
      {
        id: "nav-about",
        title: "About",
        description: "Education, background and snapshot",
        category: "Navigation",
        icon: User,
        action: () => {
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          setOpen(false);
        },
      },
      {
        id: "nav-skills",
        title: "Skills",
        description: "Languages, frameworks and tools",
        category: "Navigation",
        icon: Layers,
        action: () => {
          document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
          setOpen(false);
        },
      },
      {
        id: "nav-projects",
        title: "Projects",
        description: "AI agents, full-stack apps and client projects",
        category: "Navigation",
        icon: Briefcase,
        action: () => {
          document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
          setOpen(false);
        },
      },
      {
        id: "nav-certifications",
        title: "Certifications",
        description: "Google, Coursera, NPTEL and IBM certificates",
        category: "Navigation",
        icon: BookOpen,
        action: () => {
          document.getElementById("certifications")?.scrollIntoView({ behavior: "smooth" });
          setOpen(false);
        },
      },
      {
        id: "nav-achievements",
        title: "Achievements",
        description: "Hackathon wins and national awards",
        category: "Navigation",
        icon: Award,
        action: () => {
          document.getElementById("achievements")?.scrollIntoView({ behavior: "smooth" });
          setOpen(false);
        },
      },
      {
        id: "nav-freelancing",
        title: "Freelancing",
        description: "Services and hire options",
        category: "Navigation",
        icon: Sparkles,
        action: () => {
          document.getElementById("freelancing")?.scrollIntoView({ behavior: "smooth" });
          setOpen(false);
        },
      },
      {
        id: "nav-education",
        title: "Education",
        description: "SKCET B.Tech AI & Data Science",
        category: "Navigation",
        icon: GraduationCap,
        action: () => {
          document.getElementById("education")?.scrollIntoView({ behavior: "smooth" });
          setOpen(false);
        },
      },
      {
        id: "nav-contact",
        title: "Contact",
        description: "Email, phone and social channels",
        category: "Navigation",
        icon: Mail,
        action: () => {
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          setOpen(false);
        },
      },

      // Projects
      ...sanjaiProfile.projects.map((proj) => ({
        id: `proj-${proj.title.toLowerCase().replace(/\s+/g, "-")}`,
        title: proj.title,
        description: proj.description.slice(0, 60) + "...",
        category: "Projects" as const,
        icon: Briefcase,
        keywords: proj.technologies.join(" "),
        action: () => {
          if (proj.live) {
            window.open(proj.live, "_blank");
          } else if (proj.github) {
            window.open(proj.github, "_blank");
          } else {
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
          }
          setOpen(false);
        },
      })),

      // Actions
      {
        id: "act-copy-email",
        title: "Copy Email Address",
        description: sanjaiProfile.email,
        category: "Actions",
        icon: copied ? Check : Copy,
        action: async () => {
          await navigator.clipboard.writeText(sanjaiProfile.email);
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
            setOpen(false);
          }, 1200);
        },
      },
      {
        id: "act-resume",
        title: "Download Resume",
        description: "PDF format",
        category: "Actions",
        icon: Download,
        action: () => {
          window.open(sanjaiProfile.resumeUrl, "_blank");
          setOpen(false);
        },
      },
      {
        id: "act-github",
        title: "Open GitHub Profile",
        description: sanjaiProfile.github.replace("https://", ""),
        category: "Actions",
        icon: Github,
        action: () => {
          window.open(sanjaiProfile.github, "_blank");
          setOpen(false);
        },
      },
      {
        id: "act-linkedin",
        title: "Open LinkedIn Profile",
        description: sanjaiProfile.linkedin.replace("https://", ""),
        category: "Actions",
        icon: Linkedin,
        action: () => {
          window.open(sanjaiProfile.linkedin, "_blank");
          setOpen(false);
        },
      },
      {
        id: "act-toggle-theme",
        title: "Toggle Light / Dark Mode",
        description: `Current: ${theme === "dark" ? "Dark" : "Light"}`,
        category: "Actions",
        icon: theme === "dark" ? Sun : Moon,
        action: () => {
          setTheme(theme === "dark" ? "light" : "dark");
        },
      },
    ];
  }, [theme, setTheme, copied]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    const lower = query.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(lower) ||
        item.category.toLowerCase().includes(lower) ||
        item.description?.toLowerCase().includes(lower) ||
        item.keywords?.toLowerCase().includes(lower)
    );
  }, [items, query]);

  const groupedItems = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {};
    for (const item of filteredItems) {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    }
    return groups;
  }, [filteredItems]);

  return (
    <>
      {/* Trigger Button in Navbar or page */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open command search"
        className="hidden md:inline-flex items-center gap-2 rounded-lg border border-border/70 bg-muted/40 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:bg-muted hover:text-foreground cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Search className="size-3.5" aria-hidden />
        <span>Search...</span>
        <kbd className="inline-flex items-center gap-0.5 rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground shadow-xs">
          <Command className="size-2.5" />K
        </kbd>
      </button>

      {/* Modal Dialog */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 sm:pt-28">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/30"
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
            >
              {/* Search Bar */}
              <div className="flex items-center gap-3 border-b border-border px-4 py-3 bg-muted/20">
                <Search className="size-4 text-muted-foreground shrink-0" aria-hidden />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command, project, or section..."
                  autoFocus
                  className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="size-4" />
                  </button>
                )}
                <kbd className="hidden sm:inline-flex rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                  ESC
                </kbd>
              </div>

              {/* Items List */}
              <div className="max-h-[380px] overflow-y-auto p-2">
                {Object.keys(groupedItems).length === 0 ? (
                  <div className="py-8 text-center text-sm text-muted-foreground">
                    No results found for &ldquo;{query}&rdquo;
                  </div>
                ) : (
                  Object.entries(groupedItems).map(([category, catItems]) => (
                    <div key={category} className="mb-2 last:mb-0">
                      <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        {category}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        {catItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={item.action}
                              className="group flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground group-hover:border-primary/40 group-hover:text-primary">
                                  <Icon className="size-3.5" aria-hidden />
                                </span>
                                <div className="flex flex-col min-w-0">
                                  <span className="font-medium text-foreground truncate">
                                    {item.title}
                                  </span>
                                  {item.description && (
                                    <span className="text-xs text-muted-foreground truncate">
                                      {item.description}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <ArrowRight className="size-3.5 text-muted-foreground/40 opacity-0 transition-opacity group-hover:opacity-100 shrink-0 ml-2" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-border bg-muted/40 px-4 py-2 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  Navigation &amp; Quick Actions
                </span>
                <span>
                  Press <kbd className="font-mono text-[10px] font-semibold">Esc</kbd> to close
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
