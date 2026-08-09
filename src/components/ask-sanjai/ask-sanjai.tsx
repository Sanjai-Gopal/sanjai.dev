"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { motion } from "motion/react";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const MAX_HISTORY = 12;

const ChatPanel = dynamic(() => import("./chat-panel"), {
  ssr: false,
  loading: () => null,
});

export function AskSanjai() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [streaming, setStreaming] = useState(false);
  const messagesRef = useRef<ChatMessage[]>([]);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

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
    <>
      {open ? (
        <ChatPanel
          messages={messages}
          streaming={streaming}
          onSend={handleSend}
          onStop={handleStop}
          onClear={handleClear}
          onCopy={handleCopy}
          onClose={() => setOpen(false)}
        />
      ) : (
        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open Ask Sanjai, AI assistant"
          aria-expanded={false}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 1.4, times: [0, 0.5, 1], ease: "easeInOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="fixed bottom-24 right-4 z-50 flex items-center gap-2 rounded-full border border-border bg-primary text-primary-foreground px-4 py-3 shadow-lg shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:bottom-6 md:right-6"
        >
          <Sparkles className="size-5" aria-hidden />
          <span className="text-sm font-semibold">Ask Sanjai</span>
        </motion.button>
      )}
    </>
  );
}
