"use client";

import { useState } from "react";
import { Check, Copy, Play, Sparkles, Terminal } from "lucide-react";
import { motion } from "motion/react";

type TerminalTab = "status" | "diagnostic" | "cli";

export function HeroTerminal() {
  const [activeTab, setActiveTab] = useState<TerminalTab>("status");
  const [copied, setCopied] = useState(false);
  const [diagnosticRunning, setDiagnosticRunning] = useState(false);
  const [diagnosticStep, setDiagnosticStep] = useState<number>(3); // Default finished state

  const handleCopy = () => {
    const text = JSON.stringify(
      {
        engineer: "Sanjai",
        role: "AI & Full-Stack Systems Developer",
        college: "SKCET Coimbatore (B.Tech AI & DS, 9.0 CGPA)",
        honors: [
          "National Rank 17 · 96% Score in ML (Infotact)",
          "3rd Prize in Intercollege Hackathon (BIS)",
          "ISRO & UNESCO Youth Hackathon Submissions",
        ],
        activeProjects: ["CareNest AI", "Swasthya Sathi AI", "AQI24", "AlgoShelf"],
        domain: "https://heysanjai.cv/",
      },
      null,
      2
    );
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runDiagnostic = () => {
    if (diagnosticRunning) return;
    setDiagnosticRunning(true);
    setDiagnosticStep(0);

    const t1 = setTimeout(() => setDiagnosticStep(1), 400);
    const t2 = setTimeout(() => setDiagnosticStep(2), 900);
    const t3 = setTimeout(() => {
      setDiagnosticStep(3);
      setDiagnosticRunning(false);
    }, 1400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-border/70 bg-card/70 font-mono text-xs shadow-2xl backdrop-blur-xl transition-all hover:border-primary/40">
      {/* Top Window Bar */}
      <div className="flex items-center justify-between border-b border-border/60 bg-muted/50 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="size-3 rounded-full bg-red-500/80 transition-opacity hover:opacity-100" />
            <span className="size-3 rounded-full bg-yellow-500/80 transition-opacity hover:opacity-100" />
            <span className="size-3 rounded-full bg-emerald-500/80 transition-opacity hover:opacity-100" />
          </div>
          <span className="ml-2 hidden text-[11px] text-muted-foreground sm:inline">
            sanjai@heysanjai: ~
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 rounded-lg bg-background/60 p-0.5 border border-border/40 text-[11px]">
          <button
            type="button"
            onClick={() => setActiveTab("status")}
            className={`cursor-pointer rounded-md px-2.5 py-1 font-medium transition-colors ${
              activeTab === "status"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            profile.json
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("diagnostic")}
            className={`cursor-pointer rounded-md px-2.5 py-1 font-medium transition-colors ${
              activeTab === "diagnostic"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            health-check.sh
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("cli")}
            className={`cursor-pointer rounded-md px-2.5 py-1 font-medium transition-colors ${
              activeTab === "cli"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            quick-actions
          </button>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy terminal content"
          className="flex size-7 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          title="Copy JSON profile"
        >
          {copied ? (
            <Check className="size-3.5 text-emerald-500" />
          ) : (
            <Copy className="size-3.5" />
          )}
        </button>
      </div>

      {/* Terminal Body */}
      <div className="p-4 sm:p-5">
        {activeTab === "status" && (
          <div className="space-y-1.5 leading-relaxed text-muted-foreground">
            <p className="text-foreground/90">
              <span className="text-emerald-500 dark:text-emerald-400">const</span>{" "}
              <span className="text-sky-500 dark:text-sky-400">engineer</span>{" "}
              = {"{"}
            </p>
            <p className="pl-4">
              <span className="text-purple-400">name</span>:{" "}
              <span className="text-amber-500 dark:text-amber-300">&quot;Sanjai&quot;</span>,
            </p>
            <p className="pl-4">
              <span className="text-purple-400">education</span>:{" "}
              <span className="text-amber-500 dark:text-amber-300">&quot;B.Tech AI & Data Science @ SKCET&quot;</span>,
            </p>
            <p className="pl-4">
              <span className="text-purple-400">academics</span>:{" "}
              <span className="text-emerald-500 dark:text-emerald-400">&quot;9.0 CGPA&quot;</span>,
            </p>
            <p className="pl-4">
              <span className="text-purple-400">topMerit</span>:{" "}
              <span className="text-sky-500 dark:text-sky-300">&quot;National Rank 17 (96%) Data Science & ML&quot;</span>,
            </p>
            <p className="pl-4">
              <span className="text-purple-400">award</span>:{" "}
              <span className="text-amber-500 dark:text-amber-300">&quot;3rd Prize in Intercollege Hackathon (BIS)&quot;</span>,
            </p>
            <p className="pl-4">
              <span className="text-purple-400">latestBuild</span>:{" "}
              <span className="text-emerald-500 dark:text-emerald-400">&quot;CareNest AI (100 Lighthouse Accessible)&quot;</span>,
            </p>
            <p className="pl-4">
              <span className="text-purple-400">stack</span>: [
              <span className="text-sky-400">&quot;Next.js 16&quot;</span>,{" "}
              <span className="text-sky-400">&quot;TypeScript&quot;</span>,{" "}
              <span className="text-sky-400">&quot;Creative AI Agents&quot;</span>,{" "}
              <span className="text-sky-400">&quot;FastAPI&quot;</span>,{" "}
              <span className="text-sky-400">&quot;Supabase&quot;</span>]
            </p>
            <p className="text-foreground/90">
              {"}"};<span className="animate-pulse text-primary font-bold"> _</span>
            </p>
          </div>
        )}

        {activeTab === "diagnostic" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-border/40">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Terminal className="size-3.5 text-primary" />
                <span>Production Stack Diagnostics</span>
              </div>
              <button
                type="button"
                onClick={runDiagnostic}
                disabled={diagnosticRunning}
                className="flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary transition-all hover:bg-primary/20 disabled:opacity-50 cursor-pointer"
              >
                <Play className="size-3" />
                {diagnosticRunning ? "Testing..." : "Rerun Health Check"}
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between rounded-lg bg-background/50 p-2 border border-border/30"
              >
                <span className="text-muted-foreground">Frontend Architecture</span>
                <span className="flex items-center gap-1 font-semibold text-emerald-500">
                  <Check className="size-3.5" /> Next.js 16 · Turbopack · React 19
                </span>
              </motion.div>

              {diagnosticStep >= 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between rounded-lg bg-background/50 p-2 border border-border/30"
                >
                  <span className="text-muted-foreground">AI Integration Engine</span>
                  <span className="flex items-center gap-1 font-semibold text-emerald-500">
                    <Check className="size-3.5" /> Building Creative AI Agents
                  </span>
                </motion.div>
              )}

              {diagnosticStep >= 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between rounded-lg bg-background/50 p-2 border border-border/30"
                >
                  <span className="text-muted-foreground">Code Quality & Testing</span>
                  <span className="flex items-center gap-1 font-semibold text-emerald-500">
                    <Check className="size-3.5" /> Strict TypeScript · Zero Errors
                  </span>
                </motion.div>
              )}

              {diagnosticStep >= 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between rounded-lg bg-emerald-500/10 p-2 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-semibold"
                >
                  <span>Production Status</span>
                  <span>ALL SYSTEMS VERIFIED & OPERATIONAL</span>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {activeTab === "cli" && (
          <div className="space-y-2.5">
            <p className="text-[11px] text-muted-foreground">
              Click any command to trigger interactive navigation or view details:
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <a
                href="#projects"
                className="flex items-center justify-between rounded-lg border border-border/50 bg-background/40 p-2.5 text-xs text-foreground transition-all hover:border-primary/50 hover:bg-background/80"
              >
                <span>$ view --featured-projects</span>
                <span className="text-primary text-[11px]">→</span>
              </a>
              <a
                href="#skills"
                className="flex items-center justify-between rounded-lg border border-border/50 bg-background/40 p-2.5 text-xs text-foreground transition-all hover:border-primary/50 hover:bg-background/80"
              >
                <span>$ inspect --skills-matrix</span>
                <span className="text-primary text-[11px]">→</span>
              </a>
              <a
                href="#achievements"
                className="flex items-center justify-between rounded-lg border border-border/50 bg-background/40 p-2.5 text-xs text-foreground transition-all hover:border-primary/50 hover:bg-background/80"
              >
                <span>$ list --hackathon-trophies</span>
                <span className="text-primary text-[11px]">→</span>
              </a>
              <a
                href="#contact"
                className="flex items-center justify-between rounded-lg border border-border/50 bg-background/40 p-2.5 text-xs text-foreground transition-all hover:border-primary/50 hover:bg-background/80"
              >
                <span>$ connect --hire-sanjai</span>
                <span className="text-primary text-[11px]">→</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
