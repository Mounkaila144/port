---
title: "Architecture: PTR Niger Agency Website (agency.ptrniger.com)"
status: "draft"
version: "1.0"
created: "2026-05-01"
updated: "2026-05-01"
author: "Winston (System Architect)"
owner: "Mounkaila"
inputs:
  - _bmad-output/planning-artifacts/product-brief-ptr-niger-agency.md
  - _bmad-output/planning-artifacts/prd-ptr-niger-agency.md
  - app/page.tsx
  - app/layout.tsx
  - app/globals.css
  - next.config.ts
  - package.json
  - lib/translations.ts
  - components/sections/*
  - components/shared/*
workflowType: "architecture"
---

# Architecture — PTR Niger Agency Website

**Author:** Winston (Architect)
**Owner:** Mounkaila
**Date:** 2026-05-01
**Source:** PRD `prd-ptr-niger-agency.md` (John, PM, 2026-05-01)

---

## 0. Reading guide

This document is structured for AI-agent implementation consistency. Each decision is numbered (`AD-XXX`) and traceable. Section §3 is the canonical decisions log — when in doubt during implementation, default to `AD-XXX` over prose elsewhere.

**Constraints inherited from user (2026-05-01):**
- **Self-hosted VPS** — no Vercel, no SaaS dependencies for runtime services.
- **No transactional email service** (no Resend, Postmark, SendGrid, SMTP-as-a-service).
- **Existing Next.js 15 codebase modified in place** — no rewrite, no fresh repo.

These constraints drive several deviations from the PRD's default assumptions, all logged below.

---

## 1. Technical Vision

A **stable, boring, self-contained Next.js 15 application** running on a single Node process behind Nginx on the user's VPS. No external runtime dependencies that could fail or change pricing. Every third-party service is either (a) replaceable by editing one env var or (b) self-hosted in the same Docker network.

The app is:

- **Server-rendered first** (App Router server components by default; client islands only where motion or interactivity demands it).
- **Multi-page with localized URL prefixes** (`/en/...`, `/fr/...`) via `next-intl` middleware.
- **Content-driven** — projects, skills, companies in TypeScript modules; case studies in MDX; UI strings in JSON message files.
- **Cookieless by default** (Umami self-hosted, no GA, no FB Pixel).
- **Dark-only** (no theme toggle in v1).

Architecture pillars:
1. **Boring tech.** Next.js + Tailwind + Framer Motion are already in place and proven; we don't add a CMS, a database, or a state library.
2. **Self-host everything that needs to run.** App + analytics on the same VPS; persistence for the contact form is a flat JSONL file.
3. **Migrate, don't rewrite.** Existing components (`AuroraBackground`, `MagneticButton`, `ScrollProgress`, `WordReveal`) are preserved and re-tinted; existing data shape is split into content modules; existing translations file is converted (not rewritten) into next-intl messages.

---

## 2. Stack Summary

| Layer | Choice | Rationale |
|---|---|---|
| Framework | Next.js 15 (App Router, Turbopack) | Already in place; React 19 + Server Components fit content-heavy IA. |
| Runtime | Node.js 20 LTS, `output: 'standalone'` | VPS self-host; standalone build = `node server.js` + minimal deps; no Vercel coupling. |
| UI | React 19, Tailwind v4, Framer Motion 12, Radix UI | Already in place. |
| i18n | `next-intl` (middleware-based) | URL-prefixed locales, per-route metadata, hreflang, server + client API. Replaces `lib/translations.ts` runtime toggle. |
| Content (case studies) | MDX via `@next/mdx` | Rich markdown + React components for diagrams/metrics callouts. Co-located content. |
| Content (projects/skills/companies) | TypeScript modules under `content/` | Type-safe, no parsing overhead, current shape preserved. |
| Icons | Self-hosted DevIcons SVGs under `public/icons/devicons/` (MIT, attributed) + `lucide-react` | Removes `cdn.jsdelivr.net` dependency; deterministic LCP. |
| Fonts | `next/font/google` (Geist Sans + Geist Mono) | Auto-self-hosted at build time. |
| Form transport | API route → JSONL file persistence + optional Telegram bot notification | No SaaS email. JSONL is grep-friendly; Telegram is optional via env var. |
| Analytics | **Umami** self-hosted (Docker on the VPS) | Cookieless, GDPR-clean, no SaaS. **Deviates from PRD FR-130 (Plausible Cloud) — see AD-013.** |
| Reverse proxy | Nginx | Standard VPS pattern. TLS via Let's Encrypt (Certbot). |
| Process manager | `pm2` (recommended) or systemd unit | Either works; PM2 is simpler for log rotation + restart-on-crash. |
| Container (optional) | Docker compose for app + Umami + Postgres | Optional but recommended for clean isolation. |
| CI | GitHub Actions: lint + typecheck + Playwright e2e on PR | No deploy step (user deploys manually via git pull + build on VPS, or webhook script). |
| Error tracking | Console + log file (PM2 / journald) for v1 | Sentry deferred; revisit at first traffic milestone. |
| Visual regression | None in v1 | Skipped per pragmatism. |
| Privacy banner | Custom ~50-LOC component | No third-party lib. Umami is cookieless so banner is light-touch. |

**Versions pinned at architecture stage** — full lock at first PR. Major upgrades (Next 16, Tailwind 5, Framer 13) are explicit follow-up tasks, not silent.

---

## 3. Architecture Decisions Log

| # | Decision | Rationale | Trade-off accepted |
|---|---|---|---|
| AD-001 | Use `next-intl` (middleware-based) for i18n. URL prefix `/[locale]`. `Accept-Language` detection in middleware on first visit; `NEXT_LOCALE` cookie persists choice. | Industry standard for Next.js App Router i18n; supports server components, metadata generators, hreflang helpers. | One extra middleware hop on every request; trivial cost. |
| AD-002 | Switch `next.config.ts` from `output: 'export'` to `output: 'standalone'`. | Static export blocks API routes (form) and middleware (next-intl). Standalone produces a self-contained Node server ideal for VPS. | Lose the static-host fallback option — user is on a VPS so this is fine. |
| AD-003 | Case study content authored as **MDX** files in `content/case-studies/{slug}.{locale}.mdx`. Frontmatter exposes title, slug, sector, region, cover, metrics. | MDX gives prose + React component flexibility (metric blocks, image grids, stack badges) without a CMS. | Non-Git authors can't edit; acceptable since author = Mounkaila. |
| AD-004 | Projects, skills, companies remain TypeScript modules under `content/`. | Already the current shape. Strong types, autocomplete, no parsing cost. | None significant. |
| AD-005 | Translations migrate from `lib/translations.ts` to `messages/en.json` + `messages/fr.json` (next-intl format). Existing keys preserved 1-to-1 where possible; agency-narrative keys added new. | next-intl requires JSON message files. JSON is portable to a future CMS or i18n platform. | One-time migration cost. |
| AD-006 | Contact form posts to `app/api/contact/route.ts`. The route: (a) validates payload via Zod, (b) appends one JSON line to `./data/contact-submissions.jsonl` (path configurable via `CONTACT_LOG_PATH`), (c) optionally POSTs a notification to a Telegram bot (`TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` env vars; if absent, skipped silently). | No SaaS email. JSONL on disk is `tail -f`-able and `grep`-able from SSH. Telegram bot is free, push-notifies the phone, no infra. | Mounkaila must SSH or run a small shell to read submissions; mitigated by Telegram notifications. Files survive reboots; backup is the user's VPS-level concern. |
| AD-007 | Self-host **Umami** (Docker, Postgres) on the same VPS for analytics. Tracking script self-served from `agency.ptrniger.com/umami/script.js` via Nginx reverse-proxy path → no third-party domain in CSP. | PRD FR-130 mandated Plausible Cloud, but user constraint = no SaaS. Umami is open-source, cookieless, single-Docker simple. Deviation logged here. | Slightly more ops surface; mitigated by Docker compose. |
| AD-008 | **Cookieless analytics + minimal banner.** Banner displays a 1-line GDPR notice + link to `/privacy`; no opt-in toggle required since no non-essential cookies are set by Umami. Banner only appears for the first visit (localStorage `privacy-acked=1`), then hides. | Compliance without dark-pattern theatre; consistent with the cookieless stack. | EU DPA hardliners may want explicit opt-in; we accept the legal risk because Umami genuinely sets no tracking cookies. |
| AD-009 | **Privacy policy template** drafted in EN+FR by Winston, marked "review by counsel before launch" in a banner at the top of the rendered page. Stored as MDX in `content/legal/privacy.{locale}.mdx`. | Avoids blocking dev on legal review; gives a working draft. | User must run a legal pass before public launch. |
| AD-010 | **Reverse proxy = Nginx**, TLS via Let's Encrypt. Single Node process for the app on `127.0.0.1:3000` proxied by Nginx on `:443`. Static assets cached by Nginx with `immutable` headers. | Standard VPS pattern, well-documented, debuggable. | None. |
| AD-011 | **Process manager = PM2** (default). systemd unit provided as alternative in deploy doc. | PM2 has built-in log rotation, restart-on-crash, ecosystem file. | Adds one more dependency on the VPS; trivial. |
| AD-012 | **Deployment = manual `git pull && npm ci && npm run build && pm2 reload ecosystem.config.cjs`**. Optionally a `deploy.sh` script and a webhook endpoint protected by a shared secret. CI does NOT push to the VPS. | User stated he handles deploy himself. Keeps secrets out of CI. | No automated rollback; mitigated by PM2 keeping the previous build alive until reload completes. |
| AD-013 | **Deviation from PRD FR-130:** Plausible Cloud → Umami self-hosted. **Deviation from PRD FR-061/063:** form does not "email the agency inbox" — it persists to JSONL + optional Telegram. The 4-h SLA wording on `/contact` remains; user owns checking the file/Telegram regularly. | User constraint: no SaaS-emails; VPS-only. Notify PM (John) — the Acceptance Criteria for FR-061/063 must be amended to "form persists submissions and optionally notifies via Telegram". | Mounkaila must monitor submissions; mitigated by Telegram push. |
| AD-014 | **CSP strict** with nonce-per-request injected by middleware. `default-src 'self'`; `script-src 'self' 'nonce-...' https://assets.calendly.com`; `frame-src https://calendly.com`; `connect-src 'self' https://calendly.com`; `img-src 'self' data: https:`. Umami served same-origin via Nginx → no script-src exception. | Tight CSP reduces XSS surface; nonce avoids `unsafe-inline`. | Slightly more middleware complexity. |
| AD-015 | **Form anti-abuse** = honeypot field (`hp_field`) + IP-based rate limit (5 / IP / hour) tracked in an in-memory LRU cache keyed by IP from `x-forwarded-for`. **No CAPTCHA.** | Single VPS, single-process — in-memory is fine for v1. CAPTCHA hurts conversion. | If process restarts, rate-limit memory clears; acceptable. |
| AD-016 | **Repository structure**: keep current single repo on branch `master` (current name). Trunk-based (no `develop` branch); feature branches → PR → `master`. | User has not asked for a rename; do not move infrastructure for cosmetics. | None. |
| AD-017 | **Image strategy**: migrate raw `<img>` to `next/image` with `sharp` runtime (auto-installed by Next.js standalone). Project covers and client logos served from `public/image/...` and `public/logos/...`. AVIF + WebP delivery handled by Next.js image optimizer running in the Node process. | `next/image` works in standalone mode; no Vercel image CDN needed. | Image optimization runs on the same Node process — cache hits are free; cold misses cost CPU; mitigated by Nginx static cache for `/_next/image` URLs. |
| AD-018 | **Filtering on `/work`** = client-side React state (`useState`) keyed by sector/region/type and fuzzy-free search (substring + case-insensitive). No Fuse.js. URL query params mirror state via `nuqs` or hand-rolled `useSearchParams` writer. | 12–30 projects max; fuzzy is overkill. URL state makes filters shareable. | None. |
| AD-019 | **Cookie banner = custom component** (~50 LOC). No third-party lib. State in `localStorage`. | Lib brings 5–15 KB for a trivial UI element; cookieless stack means the banner is informational only. | We re-implement; trivial. |
| AD-020 | **Tests v1** = TypeScript typecheck + ESLint + Playwright e2e on 3 critical flows (locale switch, form submit, Calendly button click). **No** unit tests; **no** visual regression. | Pareto: e2e covers what matters for conversion. | Lower coverage; acceptable for content-heavy site with low logic surface. |
| AD-021 | **Bundle budget**: first-load JS ≤ 200 KB gzip on `/` and case-study routes. Aurora background loads dynamically (`next/dynamic`, `ssr: false`) below a critical-path threshold. | Lighthouse Perf ≥ 90 (NFR-001) requires keeping JS tight; Aurora is decoration, not content. | Background takes ~100ms longer to appear; imperceptible. |
| AD-022 | **Self-hosted DevIcons** under `public/icons/devicons/`. A typed `<TechIcon name="laravel" />` component reads from a TS-typed registry. Attribution added to `/privacy` (or a dedicated `/credits` if desired). | Removes `cdn.jsdelivr.net` runtime dependency; deterministic LCP; offline-buildable. | One-time copy of ~30 SVGs; trivial. |
| AD-023 | **Dark-only**, no theme toggle. CSS variables defined for `:root` (which is `.dark` in v1). | Brief and PRD specify dark; toggle would double design work and isn't a conversion lever. | Light-mode users see dark; acceptable for an agency-grade brand site. |
| AD-024 | **Brand hex tokens** sampled from `public/image/ptrniger.png` during initial implementation sprint. Provisional brief values (`#E8273E`, `#1FB8CC`, `#0A0E0C`, `#F5F7F4`) used until pixel-sampled values are committed. AA contrast validated via a script (`scripts/check-contrast.ts`) at build time. | Single source of truth for color; build-time check prevents regression. | None. |
| AD-025 | **Calendly = popup widget** (not inline iframe) on the primary `Book a call` CTA. Inline iframe used on `/contact` page proper. | Popup on home/CTA = no CLS, lazy-loaded JS; inline on `/contact` = expected pattern for a dedicated contact page. | Popup loads Calendly JS on click only; perfect for LCP. |
| AD-026 | **Domain redirect** from `portfolio.nigerdev.com` → `agency.ptrniger.com` handled at **Nginx level** on the legacy VPS host (or on the new VPS if the user moves DNS to point both there). Redirect map: `/` → `/en`; any path with anchor `#profile|#skills|#projects|#companies` → `/en/about|/en/services|/en/work|/en/about` respectively. 301 status, preserved query strings. | Nginx redirects are zero-cost vs Next.js redirects; survive Next process restarts. | Requires user keeping the legacy host alive; per FR-121, ≥12 months. |
| AD-027 | **No light mode, no theme toggle, no language toggle UI complexity beyond what `next-intl` ships.** | Avoid unnecessary client state and UI density. | None. |
| AD-028 | **Sitemap and robots** generated by Next.js `app/sitemap.ts` and `app/robots.ts` (App Router native). Sitemap enumerates all locale × route combinations and case studies dynamically. | Native, type-safe, no extra lib. | None. |
| AD-029 | **JSON-LD** emitted via a server component `<JsonLd schema={...} />` rendered in each page's metadata layer or below `<main>`. Schemas: `Organization` on `/`, `WebPage` on all routes, `CreativeWork` on case studies. | Server-rendered = SEO crawlable on first byte. | None. |
| AD-030 | **Skill curation gate** (FR-140 / LD-3) enforced at content level: `content/skills.ts` is the single source; a CI lint rule (custom script) flags any string in there not present on the user-provided mastery-checklist file (`content/skills.mastery.txt`). Sign-off required before launch. | Prevents silent re-introduction of jQuery/MERISE-style claims. | One small script to maintain. |

---

## 4. Repository Structure (post-migration)

```
portofoliomkl/
├── app/
│   ├── [locale]/
│   │   ├── (marketing)/
│   │   │   ├── page.tsx                  # Home /
│   │   │   ├── work/page.tsx             # /work
│   │   │   ├── case-studies/[slug]/page.tsx
│   │   │   ├── services/page.tsx
│   │   │   ├── about/page.tsx
│   │   │   └── contact/page.tsx
│   │   ├── privacy/page.tsx              # MDX-rendered
│   │   ├── layout.tsx                    # Locale-aware <html lang>, fonts, JSON-LD Organization
│   │   ├── not-found.tsx                 # /404
│   │   └── error.tsx                     # /500
│   ├── api/
│   │   └── contact/route.ts              # POST handler (Zod + JSONL + Telegram)
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── globals.css                       # Tailwind v4 layer + brand tokens
│   └── layout.tsx                        # Root: <html> with locale set in [locale]/layout
├── components/
│   ├── ui/                               # Shadcn-style primitives (kept)
│   ├── shared/                           # AuroraBackground, MagneticButton, ScrollProgress, WordReveal — re-tinted
│   ├── sections/                         # HeroSection, TrustStrip, FeaturedCaseStudies, ServicesOverview, ContactForm, etc.
│   ├── case-study/                       # MetricBlock, StackBadgeRow, OutcomeCallout (used in MDX)
│   ├── locale-switcher.tsx
│   ├── tech-icon.tsx                     # Reads public/icons/devicons registry
│   ├── json-ld.tsx
│   └── cookie-banner.tsx
├── content/
│   ├── projects.ts                       # Project[] — split from app/page.tsx
│   ├── skills.ts                         # SkillGroup[] — gated by skills.mastery.txt
│   ├── skills.mastery.txt                # User-owned allowlist (LD-3)
│   ├── companies.ts                      # Company[] — split from app/page.tsx
│   ├── case-studies/
│   │   ├── softis-pilates.en.mdx
│   │   ├── softis-pilates.fr.mdx
│   │   ├── ptr-school.en.mdx
│   │   ├── ptr-school.fr.mdx
│   │   ├── guidacenter.en.mdx
│   │   ├── guidacenter.fr.mdx
│   │   ├── commande-sans-frontiere.en.mdx
│   │   └── commande-sans-frontiere.fr.mdx
│   └── legal/
│       ├── privacy.en.mdx
│       └── privacy.fr.mdx
├── messages/
│   ├── en.json
│   └── fr.json
├── lib/
│   ├── i18n.ts                           # next-intl config, routing, locales
│   ├── content.ts                        # MDX loaders, case-study index helpers
│   ├── seo.ts                            # generateMetadata helpers per locale
│   ├── jsonld.ts                         # Schema builders
│   ├── ratelimit.ts                      # In-memory LRU for /api/contact
│   ├── telegram.ts                       # Optional notification sender
│   └── utils.ts                          # cn() — kept
├── middleware.ts                         # next-intl + CSP nonce + locale negotiation
├── public/
│   ├── icons/devicons/                   # Self-hosted SVGs
│   ├── image/                            # Existing + new client logos
│   └── logos/clients/                    # Real client logos with permissions
├── scripts/
│   ├── check-contrast.ts                 # Build-time AA gate
│   ├── check-skills.ts                   # skills.ts vs skills.mastery.txt gate
│   └── generate-redirect-map.ts          # Nginx redirect map generator
├── data/                                 # Runtime data (JSONL form submissions). gitignored.
│   └── .gitkeep
├── docs/
│   ├── deploy.md                         # VPS deploy playbook
│   ├── nginx.conf.example
│   ├── ecosystem.config.cjs.example      # PM2
│   └── docker-compose.umami.yml.example
├── .github/workflows/
│   └── ci.yml                            # lint + typecheck + e2e on PR
├── e2e/
│   ├── locale-switch.spec.ts
│   ├── contact-form.spec.ts
│   └── calendly-cta.spec.ts
├── next.config.ts                        # output: 'standalone', i18n, redirects
├── playwright.config.ts
├── tailwind.config.ts                    # Brand tokens
├── tsconfig.json
├── package.json
└── _bmad-output/                         # Planning artifacts (already present)
```

**Removed from Git after migration:**
- `out/` directory (currently committed) — added to `.gitignore`.
- `lib/translations.ts` — replaced by `messages/{locale}.json`.
- `lib/types.ts`, `lib/data.ts` — currently unused per CLAUDE.md; verify and delete.
- `app/page.tsx` (current ~968 LOC monolith) — fully refactored into `app/[locale]/...`.

---

## 5. Routing & i18n Detail

### 5.1 Locale negotiation

```
middleware.ts
  ├── If pathname matches /(en|fr)/...  → forward to next-intl handler
  ├── Else (no locale prefix):
  │     ├── Read NEXT_LOCALE cookie  → if set, 302 redirect to /{cookie}/...
  │     └── Else: parse Accept-Language → 302 redirect to /en/... or /fr/... (default en)
  └── Always inject CSP nonce header
```

### 5.2 Route ↔ slug map

| Canonical | EN slug | FR slug |
|---|---|---|
| Home | `/en` | `/fr` |
| Work | `/en/work` | `/fr/realisations` |
| Case study | `/en/case-studies/[slug-en]` | `/fr/etudes-de-cas/[slug-fr]` |
| Services | `/en/services` | `/fr/services` |
| About | `/en/about` | `/fr/a-propos` |
| Contact | `/en/contact` | `/fr/contact` |
| Privacy | `/en/privacy` | `/fr/confidentialite` |

Localized slugs configured via `next-intl`'s `pathnames` config in `lib/i18n.ts`.

### 5.3 Hreflang & canonicals

Each page emits:
```html
<link rel="alternate" hreflang="en" href="https://agency.ptrniger.com/en/{path}">
<link rel="alternate" hreflang="fr" href="https://agency.ptrniger.com/fr/{path-fr}">
<link rel="alternate" hreflang="x-default" href="https://agency.ptrniger.com/en/{path}">
<link rel="canonical" href="https://agency.ptrniger.com/{locale}/{path}">
```

Generated centrally in `lib/seo.ts` via `generateMetadata({ params })`.

---

## 6. Content Patterns

### 6.1 MDX case-study frontmatter

```yaml
---
slug: nextjs-pilates-booking-platform-japan
title: "Pilates booking platform — Tokyo, Japan"
sector: wellness
region: japan
year: 2024
cover: /image/case-studies/softis-pilates-cover.jpg
client: "Softis Pilates"
stack: [nextjs, typescript, tailwind, stripe]
duration: "12 weeks"
team: ["Tech Lead", "Senior FE", "Designer"]
metrics:
  - { label: "Bookings/month", value: "+340%" }
  - { label: "Page LCP", value: "1.2s" }
nda: false
---
```

The MDX body is the Situation → Challenge → Solution → Stack → Result narrative. Each section uses dedicated React components (`<Situation>`, `<MetricBlock>`, `<StackBadgeRow>`) for visual consistency.

### 6.2 Project module shape (`content/projects.ts`)

```ts
export type ProjectKind = "Entreprise" | "Freelance" | "Personnel";
export type Project = {
  id: string;
  title: string;
  company: string;
  kind: ProjectKind;
  year: number;
  cover: string;
  description: { en: string; fr: string };
  tags: string[];
  links: { site?: string; repo?: string; caseStudy?: string };
  region: "africa" | "europe" | "asia" | "global";
  sector: "logistics" | "real-estate" | "edu" | "wellness" | "btp" | ...;
};
```

Filtering on `/work` reads this module directly; no DB.

---

## 7. Form Pipeline

```
User submits form
  ↓ POST /api/contact
  ↓
[1] Zod validation
[2] Honeypot check (reject silently if hp_field non-empty)
[3] Rate limit (LRU 5/IP/hour) — reject 429 if exceeded
[4] Append JSONL line to ./data/contact-submissions.jsonl:
    { "ts": "2026-05-01T...", "name": "...", "email": "...", "company": "...",
      "projectType": "build|audit|maintenance|partnership", "message": "...",
      "utm": {...}, "ip": "1.2.3.4", "ua": "..." }
[5] If TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID env vars set:
    POST https://api.telegram.org/bot{token}/sendMessage
    body: structured summary, max 4096 chars
[6] Return 200 { ok: true } to client
[7] Client shows confirmation panel + reminds 4-h SLA
```

**File rotation:** none in v1. JSONL grows linearly with traffic; trivial. Mounkaila can rotate manually if it ever grows past a few MB.

**Backup:** out of scope — covered by VPS-level backup (user's concern).

---

## 8. Deployment Topology (VPS)

```
                            Internet
                                │
                          (DNS → A/AAAA)
                                │
                  agency.ptrniger.com ╮
                                      ▼
                            ┌──────────────┐
                            │    Nginx     │  TLS (Let's Encrypt)
                            │  :80 :443    │
                            └──────┬───────┘
                                   │
              ┌────────────────────┼─────────────────────────────┐
              │                    │                             │
              ▼                    ▼                             ▼
       /  + /[locale]/...    /umami/...                  /_next/static/...
       proxy_pass            proxy_pass                  alias → .next/static
       127.0.0.1:3000        127.0.0.1:3001              (Nginx-cached)
              │                    │
              ▼                    ▼
     ┌────────────────┐    ┌──────────────┐
     │ Next standalone│    │   Umami      │
     │   PM2 process  │    │   Docker     │──── Postgres (Docker)
     │   :3000        │    │   :3001      │
     └────────────────┘    └──────────────┘
              │
              ▼
        ./data/contact-submissions.jsonl
              │
              ▼
        Telegram bot (push notify Mounkaila's phone) — optional

         portfolio.nigerdev.com (legacy host)
              │
              ▼
        Nginx 301 → agency.ptrniger.com  (≥12 months)
```

### 8.1 PM2 ecosystem (excerpt)

```js
module.exports = {
  apps: [{
    name: "agency",
    script: ".next/standalone/server.js",
    cwd: "/srv/agency.ptrniger.com",
    instances: 1,
    exec_mode: "fork",
    env: { NODE_ENV: "production", PORT: 3000, HOSTNAME: "127.0.0.1" },
    max_memory_restart: "512M",
    error_file: "/var/log/agency/err.log",
    out_file: "/var/log/agency/out.log",
    time: true,
  }],
};
```

### 8.2 Nginx (excerpt)

```nginx
server {
  listen 443 ssl http2;
  server_name agency.ptrniger.com;

  ssl_certificate     /etc/letsencrypt/live/agency.ptrniger.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/agency.ptrniger.com/privkey.pem;

  add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
  add_header X-Content-Type-Options nosniff always;
  add_header Referrer-Policy "strict-origin-when-cross-origin" always;

  location /_next/static/ {
    alias /srv/agency.ptrniger.com/.next/static/;
    expires 1y;
    add_header Cache-Control "public, immutable";
  }

  location /umami/ {
    proxy_pass http://127.0.0.1:3001/;
    proxy_set_header Host $host;
  }

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Host $host;
  }
}
```

### 8.3 Deploy steps (manual)

```
ssh user@vps
cd /srv/agency.ptrniger.com
git pull origin master
npm ci
npm run build
pm2 reload ecosystem.config.cjs --update-env
```

A `scripts/deploy.sh` wrapper is provided. Optionally a webhook endpoint (`/srv/deploy-webhook`, separate from the Next app, protected by a shared secret in the GitHub webhook config) can trigger this on push to `master` — left as a follow-up tweak, not v1-blocking.

---

## 9. Performance Plan

| Target | Mechanism |
|---|---|
| Lighthouse Perf ≥ 90 | App Router server components by default; client islands only for motion/interactivity. |
| LCP ≤ 2.5s mobile 4G | Hero image is `priority` `next/image`, AVIF preferred; fonts swap with `next/font`; Aurora background `next/dynamic` `ssr: false` lazy-loaded. |
| CLS ≤ 0.1 | All `<Image>` with explicit width/height; Calendly = popup (no inline iframe on home) per AD-025. |
| INP ≤ 200ms | Filters and locale-switcher use `useTransition`; no synchronous heavy work in handlers. |
| First-load JS ≤ 200 KB gzip | Bundle analyzer step in CI; Aurora and Magnetic-button JS dynamic-imported below the fold. |
| Icon delivery | Self-hosted SVG sprites; `<TechIcon>` inlines small SVGs. |
| Caching | Nginx `immutable` for `/_next/static/*` and image-optimized URLs; `Cache-Control: public, max-age=3600, stale-while-revalidate=86400` for HTML; ISR not used (content is static-ish; full SSR is fine on a single VPS). |

---

## 10. Security Plan

| # | Control | Detail |
|---|---|---|
| S-1 | Strict CSP with nonce | See AD-014. Nonce injected by middleware, propagated via `<Script nonce={nonce}>`. |
| S-2 | Standard hardening headers | HSTS preload, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`. |
| S-3 | Form abuse | Honeypot + IP rate-limit (AD-015). |
| S-4 | Input validation | Zod schemas on all API route inputs. Reject early, log nothing about bad input besides type. |
| S-5 | Secrets | All in `.env` on VPS, never in repo. `.env.example` lists names only. |
| S-6 | Dependency upgrade hygiene | `npm audit` + Renovate or Dependabot config — Dependabot recommended (free, GitHub-native). |
| S-7 | TLS | Let's Encrypt + Certbot auto-renewal. TLS 1.3 minimum. |
| S-8 | Filesystem permissions | `./data/contact-submissions.jsonl` owned by the app user, mode 0640. |
| S-9 | Calendly iframe sandboxing | `sandbox="allow-scripts allow-same-origin allow-forms allow-popups"`. |
| S-10 | Privacy data | No PII logged in app logs beyond submissions file; access logs (Nginx) configured to mask IPs after 7 days. |

---

## 11. Migration Plan (existing → target)

The current codebase ships:
- `app/page.tsx` (~968 LOC monolith) with all data inline.
- `lib/translations.ts` with runtime React-state language toggle.
- `next.config.ts` with `output: 'export'`.
- Half-populated `components/sections/*` and `components/shared/*`.
- `out/` static export committed (must be gitignored).

Migration is sequenced in **7 epics** (suggested ordering for the upcoming `bmad-create-epics-and-stories` pass):

| Epic | Title | Outcome |
|---|---|---|
| **E1** | **Foundation & i18n** | `output: 'standalone'`, `next-intl` middleware, `[locale]` layout, message files migrated from `lib/translations.ts`, locale switcher, `<html lang>` per route. Nothing visually different yet. |
| **E2** | **Brand tokens & motion re-tint** | Pixel-sample logo → final hex; AA-contrast script; Tailwind tokens; re-tint Aurora + Magnetic + ScrollProgress. Site visually rebranded. |
| **E3** | **Content split & data model** | Move `projects/skills/companies` from `app/page.tsx` into `content/*.ts`. Add `content/skills.mastery.txt` gate. Delete `lib/translations.ts`, `lib/types.ts`, `lib/data.ts`. |
| **E4** | **IA & marketing routes** | `/`, `/work`, `/services`, `/about`, `/contact`, `/privacy` skeletons in EN+FR with new agency narrative copy. Removes personal phone/WhatsApp. Trust strip + timezone badge. |
| **E5** | **Case studies** | MDX setup; `<MetricBlock>` etc. components; 4 case studies (Softis, PTR School, GuidaCenter, CSF) authored in EN+FR. Cross-linking from `/work` and `/services`. |
| **E6** | **Form pipeline + Calendly + privacy** | `/api/contact`, JSONL persistence, optional Telegram, popup Calendly on home, inline on `/contact`, cookie banner, privacy MDX. |
| **E7** | **SEO, observability, deploy, cutover** | Sitemap, robots, JSON-LD, `metadataBase`, OG cards EN+FR per route, Umami self-host, PM2 + Nginx + Let's Encrypt config, 301 redirect map from legacy domain, e2e tests, Playwright CI, soft-launch checklist. |

Each epic is **independently deployable** — at no point should the site be broken on `master`. Implementation agents work feature-flag-free; preview branches via Git only.

---

## 12. Mapping: PRD requirements → Architecture artefacts

This table is the contract between PM (John) and Architect (Winston). Every PRD FR-XXX has a home.

| PRD ref | Implementation locus |
|---|---|
| FR-001…008 (i18n) | `middleware.ts` + `lib/i18n.ts` + `messages/*.json` + `app/[locale]/layout.tsx` + `components/locale-switcher.tsx` |
| FR-010…016 (home) | `app/[locale]/(marketing)/page.tsx` + `components/sections/Hero*`, `TrustStrip`, `FeaturedCaseStudies`, `ServicesOverview` |
| FR-020…025 (work) | `app/[locale]/(marketing)/work/page.tsx` + `content/projects.ts` + URL state |
| FR-030…036 (case studies) | `app/[locale]/(marketing)/case-studies/[slug]/page.tsx` + `content/case-studies/*.mdx` + `components/case-study/*` + `lib/jsonld.ts` |
| FR-040…045 (services) | `app/[locale]/(marketing)/services/page.tsx` + `messages/*.json` |
| FR-050…054 (about) | `app/[locale]/(marketing)/about/page.tsx` + `public/image/equipe.png` |
| FR-060…066 (contact) | `app/[locale]/(marketing)/contact/page.tsx` + `app/api/contact/route.ts` + `lib/ratelimit.ts` + `lib/telegram.ts` |
| FR-070…072 (privacy) | `content/legal/privacy.{locale}.mdx` + `app/[locale]/privacy/page.tsx` + `components/cookie-banner.tsx` |
| FR-080…087 (brand) | `app/globals.css` + `tailwind.config.ts` + `scripts/check-contrast.ts` |
| FR-090…092 (motion) | `components/shared/Aurora*`, `Magnetic*`, `ScrollProgress*` + `prefers-reduced-motion` media query |
| FR-100…102 (images) | `next/image` everywhere; `public/image/...` + `public/logos/...` |
| FR-110…114 (SEO) | `lib/seo.ts` + `app/sitemap.ts` + `app/robots.ts` + `lib/jsonld.ts` |
| FR-120…122 (redirects) | `docs/nginx.conf.example` + `scripts/generate-redirect-map.ts` |
| FR-130…132 (analytics) | **Deviation AD-013** — Umami self-hosted; same intent (cookieless, GDPR-friendly, no GA/Pixel) |
| FR-140…142 (skills) | `content/skills.ts` + `content/skills.mastery.txt` + `scripts/check-skills.ts` (CI-blocking) |
| NFR-001…005 | `scripts/check-bundle-size.ts` + Lighthouse CI step |
| NFR-010…014 | `scripts/check-contrast.ts` + manual a11y review per epic |
| NFR-040…042 | `docs/deploy.md` + `ecosystem.config.cjs.example` + `nginx.conf.example` |
| NFR-050…052 | Privacy MDX + form pipeline §7 |
| NFR-060…062 | Security plan §10 |

---

## 13. Risks (architecture-level)

| # | Risk | Mitigation |
|---|---|---|
| AR-1 | Single-VPS = single point of failure (no automatic failover) | Acceptable for v1 (low traffic). PM2 keeps the process alive on crash; Nginx 502 page is acceptable for the rare reboot. Snapshot the VPS weekly. |
| AR-2 | JSONL persistence is fragile if disk fills | Monitor disk; rotate manually if file > 50 MB; backup VPS. |
| AR-3 | Telegram-only notification could fail silently if bot is rate-limited or revoked | JSONL is the source of truth; Telegram is a notification convenience. Periodic SSH check is the fallback. Document in deploy.md. |
| AR-4 | Self-hosting Umami adds ops surface | Compose file pinned to a known-good Umami version; upgrade is a deliberate quarterly task, not auto. |
| AR-5 | `output: 'standalone'` runtime differs from Vercel hosting in subtle ways (env var injection, image optimizer cache path) | Document quirks in `docs/deploy.md`; smoke-test the prod build locally before each release. |
| AR-6 | Existing Aurora component performance on lower-end mobile | Profile during E2; if INP > 200ms, simplify the canvas or further lazy-load. `prefers-reduced-motion` already disables it. |
| AR-7 | DevIcons license drift | MIT license at time of writing; verify license at copy time and pin a commit hash in a `LICENSES.md` next to the SVGs. |
| AR-8 | Manual deploy = forgotten step risk (cache, restart) | `scripts/deploy.sh` encodes the canonical sequence; PM2 reload preserves zero-downtime. |
| AR-9 | CSP nonce + Framer Motion / Calendly inline scripts can break silently | Test all flows (motion, popup) on the staging URL with the production CSP active before launch. |
| AR-10 | next-intl + Turbopack edge cases (current build script uses `--turbopack`) | Watch next-intl release notes; have a fallback to `next build` (webpack) if Turbopack regression appears. |

---

## 14. Open Questions (handed to dev sprint, not blocking PRD/architecture sign-off)

- **OQ-1** — Cloudflare in front of Nginx? (CDN + DDoS for free.) Recommended but optional; user's call.
- **OQ-2** — `master` → `main` branch rename? Cosmetic; not done unless user asks.
- **OQ-3** — Deploy webhook (push-driven) vs pure manual `git pull`? Default = manual; webhook added if desired.
- **OQ-4** — Sentry vs log-file-only for errors? Default = logs in v1; revisit if traffic justifies.
- **OQ-5** — Backup strategy for `./data/contact-submissions.jsonl`? Inherit user's VPS-level snapshot policy.

---

## 15. Acceptance Gate (architecture → epics)

The architecture is "done" and ready to feed `bmad-create-epics-and-stories` when:

- [x] Stack and runtime decisions logged (§3 AD-001…AD-030).
- [x] Repository structure defined (§4).
- [x] i18n routing model specified (§5).
- [x] Content patterns documented (§6).
- [x] Form pipeline detailed (§7).
- [x] Deployment topology drawn (§8) with PM2 + Nginx + Umami examples.
- [x] PRD-FR mapping table complete (§12).
- [x] Architecture risks logged (§13).
- [ ] User reviews and approves §3 deviations (especially AD-013 Umami swap and AD-006 form pipeline) before epics start.

---

## 16. Handoff

- **Next stage:** Epics & Stories (back to John, PM).
- **Skill:** `bmad-create-epics-and-stories`.
- **Pre-handoff gate:** user acknowledges AD-013 (Plausible → Umami) and AD-006 (form persistence change) so the PRD acceptance criteria FR-130 and FR-061/063 can be amended.
- **After epics:** implementation readiness check via `bmad-check-implementation-readiness`, then dev sprint via `bmad-agent-dev` (Amelia).

---

*Architecture author: Winston (System Architect). Source: PRD by John, 2026-05-01. Owner: Mounkaila.*
