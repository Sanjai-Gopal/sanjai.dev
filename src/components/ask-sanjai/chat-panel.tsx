"use client";

import { SanjaiLogo } from "@/components/sanjai-logo";
import { sanjaiProfile } from "@/data/sanjai-profile";
import { cn } from "@/lib/utils";
import {
  Bot,
  Copy,
  Check,
  Eraser,
  Send,
  Square,
  Sparkles,
  Zap,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ChatMessage } from "./ask-sanjai";

interface ChatPanelProps {
  messages: ChatMessage[];
  streaming: boolean;
  onSend: (text: string) => void;
  onStop: () => void;
  onClear: () => void;
  onCopy: (content: string) => void;
  onClose: () => void;
}

const markdownComponents: Components = {
  p: (props) => (
    <p className="mb-2.5 leading-relaxed text-foreground/90 last:mb-0" {...props} />
  ),
  ul: (props) => (
    <ul className="mb-2.5 list-disc space-y-1.5 pl-4 text-foreground/90 last:mb-0" {...props} />
  ),
  ol: (props) => (
    <ol className="mb-2.5 list-decimal space-y-1.5 pl-4 text-foreground/90 last:mb-0" {...props} />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  strong: (props) => <strong className="font-semibold text-foreground" {...props} />,
  pre: (props) => (
    <pre
      className="mb-2.5 overflow-x-auto rounded-xl border border-border/70 bg-muted/80 p-3 text-xs leading-relaxed text-foreground last:mb-0"
      {...props}
    />
  ),
  code: (props) => {
    const isBlock = String(props.className || "").includes("language-");
    if (isBlock) {
      return <code className="text-xs leading-relaxed font-mono" {...props} />;
    }
    return (
      <code
        className="rounded-md border border-border/50 bg-muted/60 px-1.5 py-0.5 font-mono text-[0.85em] font-medium text-primary"
        {...props}
      />
    );
  },
  a: (props) => (
    <a
      className="font-medium text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
};

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-1 py-2" aria-label="Sanjai AI is formulating response">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="size-2 rounded-full bg-primary/70"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3.5, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
      <span className="ml-2 text-xs font-medium text-muted-foreground animate-pulse">
        Generating answer…
      </span>
    </div>
  );
}

function SanjaiAvatar({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-primary/30 bg-primary/10 text-primary shadow-xs",
        className
      )}
    >
      <SanjaiLogo className="size-full p-1.5" />
    </span>
  );
}

function AssistantMessage({
  message,
  streaming,
  onCopy,
}: {
  message: ChatMessage;
  streaming: boolean;
  onCopy: (content: string) => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await onCopy(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex w-full gap-2.5">
      <SanjaiAvatar className="mt-0.5 size-7 rounded-lg" />
      <div className="group relative min-w-0 max-w-[88%] flex-1 rounded-2xl rounded-tl-sm border border-border/80 bg-card/80 p-3.5 text-sm text-foreground shadow-xs backdrop-blur-xs transition-colors hover:border-border">
        {message.content ? (
          <div className="break-words text-pretty">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {message.content}
            </ReactMarkdown>
          </div>
        ) : streaming ? (
          <TypingIndicator />
        ) : null}
        {message.content && !streaming ? (
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy response"
            className="absolute -right-2.5 -top-2.5 flex size-6 items-center justify-center rounded-full border border-border bg-background text-muted-foreground opacity-0 shadow-xs transition-all hover:border-primary/40 hover:text-foreground focus-visible:opacity-100 group-hover:opacity-100"
          >
            {copied ? (
              <Check className="size-3 text-emerald-500" aria-hidden />
            ) : (
              <Copy className="size-3" aria-hidden />
            )}
          </button>
        ) : null}
      </div>
    </div>
  );
}

function UserMessage({ message }: { message: ChatMessage }) {
  return (
    <div className="flex w-full justify-end">
      <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-xs">
        {message.content}
      </div>
    </div>
  );
}

export default function ChatPanel({
  messages,
  streaming,
  onSend,
  onStop,
  onClear,
  onCopy,
  onClose,
}: ChatPanelProps) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, streaming]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!input.trim() || streaming) return;
    onSend(input);
    setInput("");
  };

  const hasMessages = messages.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 14, scale: 0.96 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      role="dialog"
      aria-label="Ask Sanjai AI portfolio concierge"
      className="fixed bottom-24 right-4 z-50 flex h-[min(74vh,600px)] w-[min(calc(100vw-2rem),410px)] flex-col overflow-hidden rounded-3xl border border-border/80 bg-background/95 shadow-2xl shadow-primary/10 backdrop-blur-2xl md:bottom-6 md:right-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-border/70 bg-muted/30 px-4 py-3 backdrop-blur-xs">
        <div className="flex items-center gap-3">
          <SanjaiAvatar className="size-8 rounded-lg" />
          <div className="flex flex-col leading-tight">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-tight text-foreground">
                Ask Sanjai
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Verified AI
              </span>
            </div>
            <span className="text-[11px] text-muted-foreground mt-0.5 font-mono">
              Groq · Real-Time Inference
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear chat history"
            title="Clear chat"
            disabled={!hasMessages && !streaming}
            className="flex size-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-40"
          >
            <Eraser className="size-3.5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat dialog"
            title="Close"
            className="flex size-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <X className="size-3.5" aria-hidden />
          </button>
        </div>
      </div>

      {/* Messages Viewport */}
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4 scroll-smooth">
        {!hasMessages ? (
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-2.5 rounded-xl border border-border/60 bg-muted/30 p-3 backdrop-blur-xs w-full">
              <SanjaiAvatar className="size-7 rounded-md" />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-foreground">
                  AI Portfolio Representative
                </span>
                <span className="text-[11px] text-muted-foreground">
                  10 Curated Projects · SKCET 9.0 CGPA · Hackathon Honors
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground">
              {sanjaiProfile.chat.intro}
            </p>

            <div className="flex flex-col gap-2 pt-1 w-full">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Suggested Topics
              </span>
              <div className="flex flex-wrap gap-1.5">
                {sanjaiProfile.chatSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => onSend(suggestion)}
                    className="rounded-lg border border-border/80 bg-muted/40 px-2.5 py-1 text-xs text-foreground/80 transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary active:scale-98"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          messages.map((message) =>
            message.role === "user" ? (
              <UserMessage key={message.id} message={message} />
            ) : (
              <AssistantMessage
                key={message.id}
                message={message}
                streaming={streaming}
                onCopy={onCopy}
              />
            )
          )
        )}
      </div>

      {/* Input Bar */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-border/70 bg-muted/20 px-3.5 py-3 backdrop-blur-xs"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          maxLength={2000}
          placeholder="Ask anything about Sanjai's projects or skills…"
          aria-label="Message for Ask Sanjai"
          className="h-10 flex-1 rounded-xl border border-border/80 bg-background px-3.5 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/70 focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-primary/20"
        />
        {streaming ? (
          <button
            type="button"
            onClick={onStop}
            aria-label="Stop generating response"
            title="Stop generating"
            className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-foreground transition-colors hover:bg-accent"
          >
            <Square className="size-4 fill-current text-destructive" aria-hidden />
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim()}
            aria-label="Send message"
            title="Send"
            className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-all hover:opacity-90 disabled:opacity-40"
          >
            <Send className="size-4" aria-hidden />
          </button>
        )}
      </form>

      {/* Footer Info */}
      <div className="flex items-center justify-between border-t border-border/50 bg-muted/30 px-4 py-2 text-[10.5px] text-muted-foreground/75">
        <span>Verified portfolio data</span>
        <span className="font-mono text-[10px]">v2.4 · Groq</span>
      </div>
    </motion.div>
  );
}
