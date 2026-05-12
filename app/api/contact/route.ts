import { NextResponse, type NextRequest } from "next/server";
import { randomUUID } from "node:crypto";
import { contactSchema, persistSubmission, notifyTelegram } from "@/lib/contact-pipeline";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: NextRequest) {
  const ip = clientIp(req);
  const limit = rateLimit(`contact:${ip}`);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "rate-limit" },
      { status: 429, headers: { "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid-body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  if (parsed.data.hp) {
    // Honeypot tripped — accept silently (don't reveal to bot).
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const submission = {
    ...parsed.data,
    id: randomUUID(),
    receivedAt: new Date().toISOString(),
    ip,
    userAgent: req.headers.get("user-agent") ?? undefined,
  };

  try {
    await persistSubmission(submission);
  } catch (err) {
    console.error("Persist failed", err);
    return NextResponse.json({ error: "server-error" }, { status: 500 });
  }

  // Fire-and-forget; never block the response on Telegram.
  void notifyTelegram(submission);

  return NextResponse.json({ ok: true }, { status: 200 });
}
