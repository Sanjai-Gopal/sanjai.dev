"use client";

import { sanjaiProfile } from "@/data/sanjai-profile";
import { cn } from "@/lib/utils";
import {
  Bot,
  Copy,
  Check,
  Eraser,
  Send,
  Square,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
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
    <p className="mb-2 leading-relaxed last:mb-0" {...props} />
  ),
  ul: (props) => (
    <ul className="mb-2 list-disc space-y-1 pl-4 last:mb-0" {...props} />
  ),
  ol: (props) => (
    <ol className="mb-2 list-decimal space-y-1 pl-4 last:mb-0" {...props} />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  strong: (props) => <strong className="font-semibold" {...props} />,
  pre: (props) => (
    <pre
      className="mb-2 overflow-x-auto rounded-lg border border-border bg-muted p-3 text-xs leading-relaxed last:mb-0"
      {...props}
    />
  ),
  code: (props) => {
    const isBlock = String(props.className || "").includes("language-");
    if (isBlock) {
      return <code className="text-xs leading-relaxed" {...props} />;
    }
    return (
      <code
        className="rounded bg-muted px-1 py-0.5 font-mono text-[0.85em]"
        {...props}
      />
    );
  },
  a: (props) => (
    <a
      className="text-primary underline underline-offset-2"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
};

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-1 py-2" aria-label="Typing">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="size-1.5 rounded-full bg-muted-foreground"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

function SanjaiAvatar({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative block shrink-0 overflow-hidden rounded-lg border border-border bg-muted",
        className
      )}
    >
      <Image
        src={sanjaiProfile.avatarUrl}
        alt="Sanjai Gopal"
        width={40}
        height={40}
        className="h-full w-full object-cover"
      />
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
      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-primary">
        <Bot className="size-3.5" aria-hidden />
      </span>
      <div className="group relative min-w-0 max-w-[85%] flex-1 rounded-2xl rounded-tl-sm border border-border bg-card px-3.5 py-2.5 text-sm text-foreground">
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
            className="absolute -right-3 -top-3 flex size-6 items-center justify-center rounded-full border border-border bg-background text-muted-foreground opacity-0 shadow-sm transition-opacity hover:text-foreground focus-visible:opacity-100 group-hover:opacity-100"
          >
            {copied ? (
              <Check className="size-3 text-primary" aria-hidden />
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
      <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2.5 text-sm text-primary-foreground">
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
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-label="Ask Sanjai chat assistant"
      className="fixed bottom-24 right-4 z-50 flex h-[min(70vh,560px)] w-[min(calc(100vw-2rem),380px)] flex-col overflow-hidden rounded-2xl border border-border bg-background/95 shadow-2xl shadow-black/20 backdrop-blur-xl md:bottom-6 md:right-6"
    >
      <div className="flex items-center justify-between gap-2 border-b border-border bg-muted/40 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <SanjaiAvatar className="size-8 rounded-lg" />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">Ask Sanjai</span>
            <span className="text-[11px] text-muted-foreground">
              AI assistant · powered by Hugging Face
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear chat"
            disabled={!hasMessages && !streaming}
            className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-40"
          >
            <Eraser className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {!hasMessages ? (
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-2.5">
              <SanjaiAvatar className="size-8 rounded-lg" />
              <span className="text-sm font-semibold">Ask Sanjai</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {sanjaiProfile.chat.intro}
            </p>
            <div className="flex flex-wrap gap-2">
              {sanjaiProfile.chatSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => onSend(suggestion)}
                  className="rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  {suggestion}
                </button>
              ))}
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

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-border bg-muted/20 px-3 py-3"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          maxLength={2000}
          placeholder="Ask me anything…"
          aria-label="Message"
          className="h-10 flex-1 rounded-xl border border-border bg-background px-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-primary/50 focus-visible:ring-1 focus-visible:ring-primary/30"
        />
        {streaming ? (
          <button
            type="button"
            onClick={onStop}
            aria-label="Stop generating"
            className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-foreground transition-colors hover:bg-accent"
          >
            <Square className="size-4 fill-current" aria-hidden />
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim()}
            aria-label="Send message"
            className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
          >
            <Send className="size-4" aria-hidden />
          </button>
        )}
      </form>

      <p className="border-t border-border bg-muted/20 px-4 py-2 text-[10px] text-muted-foreground/70">
        Ask Sanjai can make mistakes. Verify important information.
      </p>
    </motion.div>
  );
}
