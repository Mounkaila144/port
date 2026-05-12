// Story 5.7 — strict CSP composed with next-intl i18n middleware (AD-014).
// The site emits no executable inline scripts: JSON-LD uses
// type="application/ld+json" which CSP does not classify as a script source,
// and all other scripts are bundled by Next from `self`. Tailwind v4 injects
// runtime style attributes which require style-src 'unsafe-inline'.

import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "@/lib/i18n/routing";

const intl = createMiddleware(routing);

// Production CSP — strict. JSON-LD uses type="application/ld+json" which CSP
// does not classify as a script source, so no nonce is required for our app.
const PROD_CSP = [
  "default-src 'self'",
  "script-src 'self' https://assets.calendly.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "frame-src https://calendly.com",
  "connect-src 'self' https://api.telegram.org",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

// Dev CSP — Next.js / Turbopack inject inline scripts for HMR and RSC
// streaming that have no nonce. Allow 'unsafe-inline' + 'unsafe-eval' in dev
// only. Production keeps the strict policy.
const DEV_CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://assets.calendly.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "frame-src https://calendly.com",
  "connect-src 'self' ws: wss: https://api.telegram.org",
].join("; ");

const CSP = process.env.NODE_ENV === "production" ? PROD_CSP : DEV_CSP;

export default async function middleware(req: NextRequest) {
  const res = intl(req) ?? NextResponse.next();
  res.headers.set("Content-Security-Policy", CSP);
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "interest-cohort=()");
  return res;
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|icons|image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
