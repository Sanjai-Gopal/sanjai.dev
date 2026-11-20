import { sanjaiProfile } from "@/data/sanjai-profile";
import Groq from "groq-sdk";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;
const RATE_LIMIT = 40;
const RATE_WINDOW_MS = 10 * 60 * 1000;

const groq = process.env.GROQ_API_KEY
  ? new Groq({ apiKey: process.env.GROQ_API_KEY })
  : null;

const MODEL = process.env.GROQ_MODEL || "qwen/qwen3.8-27b";

const encoder = new TextEncoder();
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const OFF_TOPIC_PATTERNS: RegExp[] = [
  /\b(capital|president|prime minister|population|currency)\s+of\b/i,
  /\b(elon musk|bill gates|barack obama|donald trump|narendra modi|albert einstein|isaac newton|virat kohli)\b/i,
  /\b(tell|say|recite)\b.{0,30}\b(joke|riddle|story|poem)\b/i,
  /\b(explain|define|what is|how does)\b.{0,30}\b(quantum physics|photosynthesis|gravity|relativity|black holes?)\b/i,
  /\b(how to|steps to|guide)\b.{0,40}\b(crack|hack|bypass|exploit|pirate)\b/i,
  /\b(write|create|solve|generate)\b.{0,30}\b(homework|essay|math problem|calculus|algebra)\b/i,
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
  const projectsList = sanjaiProfile.projects
    .map(
      (p, i) =>
        `${i + 1}. **${p.title}** (${p.category}): ${p.description}\n   Technologies: ${p.technologies.join(", ")}${p.live ? `\n   Live: ${p.live}` : ""}${p.github ? `\n   GitHub: ${p.github}` : ""}`
    )
    .join("\n");

  const skillsList = sanjaiProfile.skills
    .map((s) => `- **${s.category}**: ${s.items.join(", ")}`)
    .join("\n");

  const certificationsList = sanjaiProfile.certifications
    .map((c) => `- **${c.name}** (${c.provider} · ${c.type})`)
    .join("\n");

  const achievementsList = sanjaiProfile.achievements
    .map((a) => `- **${a.title}** (${a.tag}): ${a.description}`)
    .join("\n");

  return [
    "You are 'Ask Sanjai', the personal AI assistant for Sanjai on his official portfolio website (https://www.sanjaibuilds.cv/).",
    "",
    "=== CORE IDENTITY & PURPOSE ===",
    "Your SOLE purpose is to speak about Sanjai: his background, engineering education, technical skills, software projects, certifications, hackathon awards, and contact details.",
    "",
    "=== STRICT TOPIC BOUNDARIES ===",
    "1. You speak ONLY about Sanjai.",
    "2. If a user asks about ANY topic unrelated to Sanjai (e.g. general programming tutorials, writing custom code for them, math problems, trivia, celebrities, weather, jokes, homework), politely and immediately decline:",
    `   "${sanjaiProfile.chat.boundary.replace(/\n/g, " ")}"`,
    "3. NEVER act as a general-purpose programming assistant, code generation engine, or homework solver.",
    "",
    "=== TRUTH & VERIFICATION ===",
    "1. Only use verified information from the profile data provided below.",
    "2. NEVER invent clients, jobs, experiences, awards, or project details.",
    `3. If a question about Sanjai asks for information not in his profile, reply: "I don't have that specific detail in Sanjai's portfolio yet. You can reach out to him directly at ${sanjaiProfile.email}."`,
    "",
    "=== COMMUNICATION STYLE ===",
    "- Speak enthusiastically and professionally about Sanjai's work as his digital representative.",
    "- Be crisp, concise, and structured. Use Markdown bullet points and bold highlights for readability.",
    "- Keep responses under 150 words.",
    "",
    "=== VERIFIED SANJAI PROFILE DATA ===",
    `Name: ${sanjaiProfile.name}`,
    `Headline: ${sanjaiProfile.headline}`,
    `Location: ${sanjaiProfile.location}`,
    `Email: ${sanjaiProfile.email}`,
    `Website: ${sanjaiProfile.url}`,
    `GitHub: ${sanjaiProfile.github}`,
    `LinkedIn: ${sanjaiProfile.linkedin}`,
    `About: ${sanjaiProfile.aboutIntro}`,
    "",
    "EDUCATION:",
    `- Degree: ${sanjaiProfile.education.degree}`,
    `- Institution: ${sanjaiProfile.education.school} (${sanjaiProfile.education.location})`,
    `- Status: ${sanjaiProfile.education.status} (${sanjaiProfile.education.start} - ${sanjaiProfile.education.end})`,
    `- CGPA: ${sanjaiProfile.education.cgpa}`,
    "",
    "TECHNICAL SKILLS:",
    skillsList,
    "",
    "FEATURED PROJECTS:",
    projectsList,
    "",
    "CERTIFICATIONS:",
    certificationsList,
    "",
    "ACHIEVEMENTS & HACKATHONS:",
    achievementsList,
    "",
    "FREELANCING & CLIENT SERVICES:",
    sanjaiProfile.freelancing.services.map((s) => `- ${s}`).join("\n"),
  ].join("\n");
}

function isOffTopic(text: string): boolean {
  const lower = text.toLowerCase();
  const mentionsSanjai =
    /\b(sanjai|you|your|he|his|him|portfolio|project|projects|skill|skills|education|college|skcet|resume|contact|email|github|linkedin|carenest|swasthya|sahay|aqi24|algoshelf|forge|tattoo|quizza|pipos|hackathon|btech)\b/i.test(
      lower
    );

  if (mentionsSanjai) {
    return false;
  }

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
    if (!groq) {
      return Response.json(
        { error: "AI assistant is not configured yet. Please set GROQ_API_KEY in your environment." },
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
      return Response.json({ error: "Invalid messages format." }, { status: 400 });
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

    const groqStream = await groq.chat.completions.create({
      model: MODEL,
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      stream: true,
      temperature: 0.3,
      max_tokens: 500,
    });

    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const chunk of groqStream) {
            const delta = chunk.choices[0]?.delta?.content;
            if (delta) {
              controller.enqueue(encoder.encode(delta));
            }
          }
        } catch (error) {
          if ((error as Error)?.name === "AbortError") {
            controller.error(new Error("Aborted"));
            return;
          }
          console.error("Groq stream error:", error);
          controller.error(error);
          return;
        }
        controller.close();
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
