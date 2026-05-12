// Story 4.4–4.7 — contact intake pipeline: Zod → JSONL → optional Telegram.
import { promises as fs } from "node:fs";
import path from "node:path";
import { z } from "zod";

// Story 5.6 — UTM capture. Optional; client populates from window.location
// when present. Persisted on the JSONL row alongside the brief.
const utmField = z.string().max(200).optional().or(z.literal(""));

export const contactSchema = z.object({
  name: z.string().min(1).max(120),
  company: z.string().max(160).optional().or(z.literal("")),
  email: z.string().email(),
  type: z.enum(["maintenance", "audit", "build", "partnership", "other"]),
  brief: z.string().min(20).max(5000),
  source: z.string().max(160).optional().or(z.literal("")),
  consent: z.union([z.literal("on"), z.literal("true"), z.literal(true)]),
  hp: z.string().optional(), // honeypot — must be empty
  utm_source: utmField,
  utm_medium: utmField,
  utm_campaign: utmField,
  utm_content: utmField,
  utm_term: utmField,
});

export type ContactSubmission = z.infer<typeof contactSchema> & {
  id: string;
  receivedAt: string;
  ip: string;
  userAgent?: string;
  utm?: Record<string, string>;
};

// Override with PTR_DATA_DIR on the VPS to point at a persistent volume that
// survives `git pull && npm ci && npm run build`. Defaults to <cwd>/data.
const STORE_PATH = path.join(
  process.env.PTR_DATA_DIR ?? path.join(process.cwd(), "data"),
  "contact-submissions.jsonl",
);

export async function persistSubmission(s: ContactSubmission): Promise<void> {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.appendFile(STORE_PATH, JSON.stringify(s) + "\n", "utf8");
}

export async function notifyTelegram(s: ContactSubmission): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return; // optional — skip silently
  const utm = [s.utm_source, s.utm_medium, s.utm_campaign]
    .filter(Boolean)
    .join(" / ");
  const text = [
    "📨 *PTR Niger — new brief*",
    `*Type:* ${s.type}`,
    `*Name:* ${s.name}${s.company ? ` (${s.company})` : ""}`,
    `*Email:* ${s.email}`,
    s.source ? `*Source:* ${s.source}` : null,
    utm ? `*UTM:* ${utm}` : null,
    "",
    s.brief,
  ]
    .filter(Boolean)
    .join("\n");
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
        disable_web_page_preview: true,
      }),
    });
  } catch (err) {
    console.error("Telegram notify failed", err);
  }
}
