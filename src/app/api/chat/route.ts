import { sanjaiProfile } from "@/data/sanjai-profile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;
const RATE_LIMIT = 30;
const RATE_WINDOW_MS = 10 * 60 * 1000;

const API_BASE_URL =
  process.env.HUGGINGFACE_API_BASE_URL || "https://router.huggingface.co/v1";
const MODEL = process.env.HUGGINGFACE_MODEL || "mistralai/Mistral-7B-Instruct-v0.3";

const encoder = new TextEncoder();

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const OFF_TOPIC_PATTERNS: RegExp[] = [
  /\b(write|create|build|generate|show|fix|debug)\b.{0,40}\b(code|program|script|function|class|api|app|python|javascript|typescript|react|website|bug)\b/i,
  /\b(capital|president|prime minister|population|currency) of\b/i,
  /\b(elon musk|bill gates|barack obama|donald trump|narendra modi|albert einstein|newton|virat kohli)\b/i,
  /\b(tell|say|recite)\b.{0,30}\b(joke|riddle|story)\b/i,
  /\b(explain|define|what is|what are|how does|how do)\b.{0,30}\b(quantum physics|photosynthesis|gravity|relativity|black holes?)\b/i,
  /\b(how to|steps to|guide.*)\b.{0,40}\b(crack|hack|bypass)\b/i,
];

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  if (!entry || entry.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

function buildSystemPrompt(): string {
  const profileSummary = JSON.stringify(sanjaiProfile, null, 2);
  return [
    "You are 'Ask Sanjai', the official AI assistant for Sanjai Gopal's personal portfolio website.",
    "",
    "Your ONLY purpose is to answer questions about Sanjai Gopal and the information contained in his portfolio knowledge base.",
    "",
    "You may discuss:",
    "- Sanjai's education",
    "- Sanjai's skills",
    "- Sanjai's projects",
    "- Sanjai's certifications",
    "- Sanjai's achievements",
    "- Sanjai's hackathons",
    "- Sanjai's freelancing services",
    "- Sanjai's contact information",
    "- Sanjai's portfolio",
    "- Sanjai's GitHub and LinkedIn",
    "- Sanjai's resume",
    "- Sanjai's career interests",
    "",
    "Do NOT answer unrelated general knowledge questions, such as general technology tutorials, programming requests, trivia, news, science explanations, jokes, or any topic that is not about Sanjai.",
    "If the user asks something unrelated, politely explain that you are Sanjai's portfolio assistant and redirect them to Sanjai-related topics.",
    "",
    "NEVER invent information about Sanjai.",
    "NEVER invent clients, internships, awards, experience, project statistics, credentials, or technologies.",
    "Only use verified information supplied in the portfolio context.",
    "",
    "If information about Sanjai is not available, say exactly:",
    `"I don't have that information in Sanjai's portfolio yet. You can contact him directly at ${sanjaiProfile.email}."`,
    "",
    "Keep responses concise, professional and friendly. Use Markdown formatting (lists, bold) when it improves clarity. Keep answers under ~180 words.",
    "",
    "=== VERIFIED SANJAI PROFILE DATA ===",
    profileSummary,
  ].join("\n");
}

function isOffTopic(text: string): boolean {
  return OFF_TOPIC_PATTERNS.some((pattern) => pattern.test(text));
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

function validateMessages(input: unknown): ChatMessage[] | null {
  if (!Array.isArray(input)) return null;
  if (input.length === 0 || input.length > MAX_MESSAGES) return null;

  const messages: ChatMessage[] = [];
  for (const item of input) {
    if (!item || typeof item !== "object") return null;
    const { role, content } = item as { role?: unknown; content?: unknown };
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string" || content.trim().length === 0) return null;
    if (content.length > MAX_MESSAGE_LENGTH) return null;
    messages.push({ role, content: content.trim() });
  }

  const last = messages[messages.length - 1];
  if (!last || last.role !== "user") return null;
  return messages;
}

export async function POST(request: Request) {
  try {
    if (!process.env.HUGGINGFACE_API_KEY) {
      return Response.json(
        { error: "AI assistant is not configured yet." },
        { status: 503 }
      );
    }

    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return Response.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return Response.json({ error: "Invalid request body." }, { status: 400 });
    }

    const messages = validateMessages(
      (body as { messages?: unknown } | null)?.messages
    );
    if (!messages) {
      return Response.json({ error: "Invalid messages." }, { status: 400 });
    }

    const userText = messages[messages.length - 1]?.content ?? "";
    if (isOffTopic(userText)) {
      return new Response(sanjaiProfile.chat.boundary, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
        },
      });
    }

    const systemPrompt = buildSystemPrompt();

    const providerResponse = await fetch(
      `${API_BASE_URL}/chat/completions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: "system", content: systemPrompt },
            ...messages,
          ],
          stream: true,
          temperature: 0.6,
          max_tokens: 800,
        }),
        signal: request.signal,
      }
    );

    if (!providerResponse.ok || !providerResponse.body) {
      const errorText = await providerResponse.text().catch(() => "");
      console.error(
        "Ask Sanjai provider error:",
        providerResponse.status,
        errorText.slice(0, 500)
      );
      return new Response(sanjaiProfile.chat.unavailable, {
        status: 502,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    const reader = providerResponse.body.getReader();
    const decoder = new TextDecoder();

    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        let buffer = "";
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed.startsWith("data:")) continue;
              const data = trimmed.slice(5).trim();
              if (!data || data === "[DONE]") continue;

              try {
                const parsed = JSON.parse(data);
                const delta = parsed?.choices?.[0]?.delta?.content;
                if (typeof delta === "string" && delta.length > 0) {
                  controller.enqueue(encoder.encode(delta));
                }
              } catch {
                // Ignore malformed SSE chunks.
              }
            }
          }
        } catch (error) {
          if ((error as Error)?.name === "AbortError") {
            controller.error(new Error("Aborted"));
            return;
          }
          controller.error(error);
          return;
        } finally {
          try {
            reader.releaseLock();
          } catch {
            // Already released.
          }
        }
        controller.close();
      },
      cancel() {
        reader.cancel().catch(() => undefined);
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Ask Sanjai route error:", error);
    return Response.json(
      { error: "Something went wrong while generating the response. Please try again." },
      { status: 500 }
    );
  }
}
