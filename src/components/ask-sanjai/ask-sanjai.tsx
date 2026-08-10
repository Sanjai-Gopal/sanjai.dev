"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { SanjaiLogo } from "@/components/sanjai-logo";
import { sanjaiProfile } from "@/data/sanjai-profile";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const MAX_HISTORY = 12;

interface ChatPanelProps {
  messages: ChatMessage[];
  streaming: boolean;
  onSend: (text: string) => void;
  onStop: () => void;
  onClear: () => void;
  onCopy: (content: string) => void;
  onClose: () => void;
}

function ChatPanelLoading({ onClose }: { onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-label="Ask Sanjai chat assistant"
      className="fixed bottom-24 right-4 z-50 flex h-[min(70vh,560px)] w-[min(calc(100vw-2rem),380px)] flex-col overflow-hidden rounded-2xl border border-border bg-background/95 shadow-2xl shadow-black/20 backdrop-blur-xl md:bottom-6 md:right-6"
    >
      <div className="flex items-center justify-between gap-2 border-b border-border bg-muted/40 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-foreground">
            <SanjaiLogo className="size-5" />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">Ask Sanjai</span>
            <span className="text-[11px] text-muted-foreground">
              AI assistant · Sanjai&apos;s portfolio
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <X className="size-4" aria-hidden />
        </button>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-3 px-4 py-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-foreground">
            <SanjaiLogo className="size-5" />
          </span>
          <span className="text-sm font-semibold">Ask Sanjai</span>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {sanjaiProfile.chat.intro}
        </p>
      </div>

      <div className="flex items-center gap-2 border-t border-border bg-muted/20 px-3 py-3">
        <div className="flex h-10 flex-1 items-center rounded-xl border border-border bg-background px-3.5 text-sm text-muted-foreground/60">
          Ask me anything…
        </div>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/40 text-primary-foreground">
          <Send className="size-4" aria-hidden />
        </span>
      </div>

      <p className="border-t border-border bg-muted/20 px-4 py-2 text-[10px] text-muted-foreground/70">
        Ask Sanjai can make mistakes. Verify important information.
      </p>
    </div>
  );
}

const ChatPanel = dynamic(() => import("./chat-panel"), {
  ssr: false,
});

export function AskSanjai() {
  const [open, setOpen] = useState(false);
  const [panelReady, setPanelReady] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [streaming, setStreaming] = useState(false);
  const messagesRef = useRef<ChatMessage[]>([]);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    // Preload the chat UI in the background so opening it feels instant.
    let active = true;
    import("./chat-panel")
      .then(() => {
        if (active) setPanelReady(true);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  const createId = () =>
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  const handleSend = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;

    const userMessage: ChatMessage = {
      id: createId(),
      role: "user",
      content: trimmed,
    };
    const assistantMessage: ChatMessage = {
      id: createId(),
      role: "assistant",
      content: "",
    };

    const history = [...messagesRef.current, userMessage]
      .map(({ role, content }) => ({ role, content }))
      .slice(-MAX_HISTORY);

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    const updateAssistant = (content: string) =>
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMessage.id ? { ...m, content } : m
        )
      );

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        updateAssistant(
          "Something went wrong while generating the response. Please try again."
        );
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        updateAssistant(accumulated);
      }
    } catch (error) {
      if (controller.signal.aborted) {
        updateAssistant(
          messagesRef.current.find(
            (m) => m.id === assistantMessage.id
          )?.content || "Generation stopped."
        );
      } else {
        updateAssistant(
          "Something went wrong while generating the response. Please try again."
        );
      }
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  };

  const handleStop = () => {
    abortRef.current?.abort();
  };

  const handleClear = () => {
    setMessages([]);
  };

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
    } catch {
      // Clipboard unavailable.
    }
  };

  return (
    <AnimatePresence initial={false}>
      {open ? (
        panelReady ? (
          <ChatPanel
            key="ask-sanjai-panel"
            messages={messages}
            streaming={streaming}
            onSend={handleSend}
            onStop={handleStop}
            onClear={handleClear}
            onCopy={handleCopy}
            onClose={() => setOpen(false)}
          />
        ) : (
          <ChatPanelLoading
            key="ask-sanjai-loading"
            onClose={() => setOpen(false)}
          />
        )
      ) : (
        <motion.button
          key="ask-sanjai-button"
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open Ask Sanjai, AI assistant"
          aria-expanded={false}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 1.4, times: [0, 0.5, 1], ease: "easeInOut" }}
          exit={{ opacity: 0, scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="fixed bottom-24 right-4 z-50 flex items-center gap-2 rounded-full border border-border bg-primary text-primary-foreground px-4 py-3 shadow-lg shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:bottom-6 md:right-6"
        >
          <Sparkles className="size-5" aria-hidden />
          <span className="text-sm font-semibold">Ask Sanjai</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
