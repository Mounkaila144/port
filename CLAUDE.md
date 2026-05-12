# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marketing site for **PTR Niger Agency** (`agency.ptrniger.com`), built with Next.js 15 App Router + React 19, TypeScript strict, Tailwind v4, Framer Motion, and `next-intl` (en/fr with localized pathnames). Ships as a Next.js **standalone** bundle behind Nginx on a VPS (PM2). The legacy `portfolio.nigerdev.com` host 301s into this app.

The codebase has been migrated away from the original single-page portfolio (`app/page.tsx`); do not trust the old `README.md` — content now lives in `content/*.ts` modules, copy in `messages/{en,fr}.json`, and pages under `app/[locale]/`.

## Commands

```bash
npm run dev               # next dev --turbopack (http://localhost:3000)
npm run build             # runs check:contrast && check:skills, then next build --turbopack
npm start                 # node .next/standalone/server.js  (NOT next start — standalone output)

npm run check:contrast    # WCAG AA gate on design tokens (scripts/check-contrast.ts)
npm run check:skills      # Skill-curation gate (scripts/check-skills.ts)

npm run test:e2e          # Playwright smoke tests on http://127.0.0.1:3100
npm run e2e:prepare       # Build + copy static/public/messages into .next/standalone (run once before test:e2e)
```

Run a single Playwright test: `npx playwright test tests/e2e/smoke.spec.ts -g "title fragment"`.

There is **no lint/typecheck npm script**. For a typecheck run `npx tsc --noEmit`. The two `check:*` scripts run during `npm run build` and will fail the build, so keep them green.

## Architecture

### Routing & i18n
- `next-intl` with `localePrefix: "always"` — every URL is `/en/...` or `/fr/...`. There is no unprefixed root page; `/` is handled by middleware redirect.
- Locale definition, supported locales, default, and **localized pathnames** (e.g. `/work` ↔ `/realisations`, `/about` ↔ `/a-propos`) live in `lib/i18n/routing.ts`. Any new route must be added there if it needs an FR slug.
- `i18n/request.ts` is the next-intl request config wired in `next.config.ts` via `createNextIntlPlugin("./i18n/request.ts")`.
- Messages live in `messages/en.json` and `messages/fr.json`. Read them in server components via `getTranslations()` and in client components via `useTranslations()` from `next-intl`.
- `lib/translations.ts` is a tiny helper exposing the raw JSON typed against `en` — useful for non-component code that needs lookup by key.
- The root `app/layout.tsx` is intentionally a pass-through; the real document shell (html/body, fonts, providers, header/footer, aurora background, cookie banner) is `app/[locale]/layout.tsx`.

### Pages
`app/[locale]/`:
- `page.tsx` — home (Hero, TrustStrip, FeaturedCaseStudies, ServicesOverview, SecondaryCta, JSON-LD)
- `work/page.tsx` — projects listing
- `services/page.tsx`
- `case-studies/page.tsx` and `case-studies/[slug]/page.tsx`
- `about/page.tsx`, `contact/page.tsx`, `privacy/page.tsx`
- `error.tsx`, `not-found.tsx`

Always call `setRequestLocale(locale)` in server pages/layouts before reading translations so next-intl static rendering works for `generateStaticParams` over `routing.locales`.

### Components
- `components/site/*` — marketing surface (`SiteHeader`, `SiteFooter`, `Hero`, `ContactForm`, `JsonLd`, `CookieBanner`, etc.). New sections for marketing pages belong here.
- `components/sections/*` — legacy portfolio sections (`ProfileSection`, `ProjectsSection`, etc.). Used by `/work` and similar pages.
- `components/shared/*` — cross-cutting UI (`AuroraBackground`, `ScrollProgress`, `LocaleSwitcher`, `MagneticButton`, `ProjectDialog`).
- `components/ui/*` — Shadcn primitives over Radix.
- `components/tech-icon.tsx` — DevIcon CDN wrapper used by skills.

### Content vs. copy
- **Structured data** (projects, case studies, companies, skills, profile) is TypeScript in `content/*.ts`. Types live in `content/types.ts`. Edit these to add a project or case study.
- **Display copy** (labels, paragraphs, microcopy) is in `messages/{en,fr}.json`. Keep both locales in sync — there is no fallback, missing keys will render the key string.
- `content/skills.mastery.txt` is the authoritative skill whitelist. `scripts/check-skills.ts` fails the build if `content/skills.ts` declares a skill not on the list — add to the whitelist first, then to `skills.ts`.

### Contact pipeline (`POST /api/contact`)
`app/api/contact/route.ts` → `lib/contact-pipeline.ts`. Flow:
1. `lib/rate-limit.ts` — in-memory token bucket keyed by IP. Single-process only; for multi-instance you'd need an external store.
2. Zod validation (`contactSchema`) — required: name, email, type, brief (≥20 chars), consent. Honeypot field `hp` accepts silently.
3. `persistSubmission` — appends JSONL to `${PTR_DATA_DIR}/contact-submissions.jsonl` (defaults to `<cwd>/data/`). On the VPS, `PTR_DATA_DIR=/srv/ptr/data` so submissions survive `git pull && npm run build`.
4. `notifyTelegram` — fire-and-forget; no-op if `TELEGRAM_BOT_TOKEN`/`TELEGRAM_CHAT_ID` are unset. Never block the HTTP response on it.
5. UTM params (`utm_source/medium/campaign/content/term`) are captured client-side and stored alongside the brief.

### Security headers
`middleware.ts` composes `next-intl` middleware with a strict CSP. Production CSP allows only `'self'` for scripts (plus `assets.calendly.com`); JSON-LD uses `type="application/ld+json"` (not script-src). Dev CSP relaxes to `'unsafe-inline' 'unsafe-eval'` for Turbopack HMR. **Do not introduce inline `<script>` tags** — they'll break the prod CSP. Update the middleware matcher if you add static assets that should bypass i18n.

### Build & deploy
- `next.config.ts` sets `output: "standalone"` and AVIF/WebP image formats.
- The standalone bundle does **not** include `public/`, `.next/static/`, or `messages/`. The deploy step or `e2e:prepare` copies them in: `cp -r .next/static .next/standalone/.next/static && cp -r public .next/standalone/public && cp -r messages .next/standalone/messages`.
- Full VPS runbook (Node 20, PM2 `ecosystem.config.cjs`, Nginx vhost in `nginx/agency.conf`, certbot, self-hosted Umami, legacy redirects) is in `docs/deploy.md`. `docs/redirects.md` documents the legacy URL → new URL map enforced by `nginx/portfolio-legacy.conf`.

### Environment
See `.env.example`. Notable vars: `NEXT_PUBLIC_SITE_URL` (used for canonical URLs, OG, sitemap, JSON-LD), `PTR_DATA_DIR` (contact JSONL location, **must be outside the deploy tree in prod**), `TELEGRAM_BOT_TOKEN`/`TELEGRAM_CHAT_ID` (optional), `UMAMI_*` (VPS-only).

## Conventions

- TypeScript strict; path alias `@/*` → repo root.
- Server components by default. Add `"use client"` only when you need interactivity (forms, framer-motion variants tied to scroll/hover state, locale switcher).
- Don't import from `messages/*.json` directly in component code — go through `next-intl`'s `useTranslations`/`getTranslations` so static rendering and the locale split work.
- Localized navigation: import `Link` / `useRouter` from `lib/i18n/navigation.ts`, not `next/link` / `next/navigation`, so localized pathnames resolve.
- Add new images to `public/` and reference with a root-relative path; the Next image loader handles AVIF/WebP.
- The build runs `check:contrast` and `check:skills` — if you change design tokens or add skills, run the corresponding script locally first.

## BMad framework

This repo has the BMad workflow framework installed (`_bmad/`, `_bmad-output/`, plus `bmad-*` skills). It provides agent personas (Mary/Analyst, John/PM, Winston/Architect, Sally/UX, Amelia/Dev, Paige/TechWriter) and structured PRD → architecture → epics/stories → implementation workflows.

- Planning artifacts → `_bmad-output/planning-artifacts/`
- Implementation artifacts → `_bmad-output/implementation-artifacts/`
- Project knowledge docs → `docs/`
- `_bmad/config.toml` is installer-managed; override durably via `_bmad/custom/config.toml` (team) or `_bmad/custom/config.user.toml` (personal, gitignored).

When the user invokes a `bmad-*` skill or asks to talk to a named agent, route through the skill rather than improvising.

## Things to ignore in the repo

- `README.md` describes the pre-migration single-page portfolio and is out of date — prefer this file.
- `out/` is a stale `next export` artifact tracked by git; the project no longer uses static export. Don't write to it.
- `lib/types.ts` / `lib/data.ts` no longer exist on disk; the live types are in `content/types.ts` and `lib/contact-pipeline.ts`.
