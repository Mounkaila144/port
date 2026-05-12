---
stepsCompleted: ["step-01-validate-prerequisites", "step-02-design-epics", "step-03-create-stories"]
inputDocuments:
  - _bmad-output/planning-artifacts/product-brief-ptr-niger-agency.md
  - _bmad-output/planning-artifacts/prd-ptr-niger-agency.md
  - _bmad-output/planning-artifacts/architecture-ptr-niger-agency.md
---

# PTR Niger Agency Website — Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for **PTR Niger Agency Website (`agency.ptrniger.com`)**, decomposing the requirements from the PRD and Architecture decisions into implementable stories.

No standalone UX Design document exists; UX/visual prescriptions live inside the PRD §8.9–§8.10 and the Architecture §3 (AD-024 brand tokens, AD-021 motion budget). They are surfaced below as `UX-DR*`.

## Requirements Inventory

### Functional Requirements

**Internationalization**
- FR1: Serve content under `/en/...` and `/fr/...` URL prefixes (PRD FR-001).
- FR2: On first visit, detect locale from `Accept-Language` and 302-redirect to matching prefix; default `/en` (FR-002).
- FR3: Persist user's chosen locale in `NEXT_LOCALE` cookie (1y) (FR-003).
- FR4: Set `<html lang="...">` to active locale on every page (FR-004).
- FR5: Emit `<link rel="alternate" hreflang>` tags including `x-default` → EN (FR-005).
- FR6: Emit per-locale metadata (title, description, OG, Twitter) on every page (FR-006).
- FR7: Locale switcher present in global header; switching navigates to equivalent route (FR-007).
- FR8: All UI strings, slugs, case-study content, metadata localized in EN+FR (no fallback leakage) (FR-008).

**Home (`/[locale]`)**
- FR9: Above-the-fold = H1 value pitch + trust strip + primary Teal CTA "Book a 20-min discovery call" (FR-010).
- FR10: H1 contains no individual employee names; "Niger" appears at most once above-the-fold and only in the trust-strip (FR-011).
- FR11: Timezone badge "Working hours 10am–7pm WAT (= 11am–8pm CET)" (localized) (FR-012).
- FR12: Featured-case-studies section surfaces 3–5 v1 case studies (FR-013).
- FR13: Services overview section summarizes 3 packages and links to `/services` (FR-014).
- FR14: Trust strip displays real client logos, no Unsplash (FR-015).
- FR15: Secondary CTA at end-of-page driving to `/contact` (FR-016).

**Work (`/[locale]/work`)**
- FR16: Project gallery renders all PTR-validated projects (12+) (FR-020).
- FR17: Each project card displays cover, title, sector, region tag, year (FR-021).
- FR18: Filtering by sector, region, type (multi-select) (FR-022).
- FR19: Free-text search across project titles and tags (FR-023).
- FR20: Cards linked to a deep case study navigate to `/case-studies/[slug]`; others open lightweight modal (FR-024).
- FR21: Filters and search update URL query params (shareable / back-button safe) (FR-025).

**Case Studies (`/[locale]/case-studies/[slug]`)**
- FR22: v1 ships 4 deep case studies — Softis Pilates 🇯🇵, PTR School 🇳🇪, GuidaCenter 🇳🇪, CSF 🇨🇳🇳🇪 (FR-030).
- FR23: Each follows Situation → Challenge → Solution → Stack → Result with concrete metrics (FR-031).
- FR24: Slugs SEO long-tail formatted in EN and FR (FR-032).
- FR25: Each emits JSON-LD `CreativeWork` schema (FR-033).
- FR26: Each cross-linked from `/work` and ≥1 `/services` package (FR-034).
- FR27: NDA-blocked metrics replaced by non-gated metrics, never fabricated (FR-035).
- FR28: Each case study renders OG/Twitter cards specific to that case per locale (FR-036).

**Services (`/[locale]/services`)**
- FR29: Display three packages — Maintenance, Audit, Build (FR-040).
- FR30: Each package displays value pitch, engagement format, day-range estimate, EUR Investment range (Maintenance from €1.5k/mo, Audit from €3–6k, Build from €12k) (FR-041).
- FR31: TJM SHALL NOT be disclosed publicly anywhere (FR-042).
- FR32: "Partner with us — overflow capacity for boutique agencies" paragraph with distinct Partnership CTA (FR-043).
- FR33: EU data-residency statement on `/services` and `/about` (FR-044).
- FR34: Each package links to ≥1 representative case study (FR-045).

**About (`/[locale]/about`)**
- FR35: Narrate PTR Niger story (founded 2017, 9+ years, 10+ team, sectors served) (FR-050).
- FR36: One generic team photo (placeholder `equipe.png` v1, replacement post-launch) (FR-051).
- FR37: No individual employee names; "engagement composition" disclosure allowed (FR-052).
- FR38: Include EU data-residency statement (FR-053).
- FR39: Surface bilingual EN+FR delivery as explicit differentiator (FR-054).

**Contact (`/[locale]/contact`)**
- FR40: Embed Calendly with two event types — Intro 20min, Project 30min; Partnership 30min exposed only via `/services` partner CTA (FR-060).
- FR41: Structured intake form: name, company, email, project type, brief, referral source (FR-061).
- FR42: Display agency email as fallback (FR-062).
- FR43: On-screen acknowledgment + 4-business-hour first-response SLA wording (FR-063).
- FR44: Calendly events ask source-attribution question (FR-064).
- FR45: Consent checkbox linking to `/privacy` (FR-065).
- FR46: Honeypot field + IP-based rate limit (≤5 submissions/IP/hour); no CAPTCHA (FR-066, AD-015).
- FR47: Form persists submissions to `data/contact-submissions.jsonl` and optionally pushes to Telegram bot (AD-006 — supersedes the original "email the agency inbox" wording).

**Privacy & compliance**
- FR48: `/privacy` page in EN and FR covering Calendly, analytics, OG, contact form (FR-070).
- FR49: Minimal cookie banner on first visit; persists user choice (FR-071, AD-008/AD-019).
- FR50: Footer links to `/privacy` on every page (FR-072).

**Brand & design tokens**
- FR51: Migrate palette to PTR Red `#E8273E` + PTR Teal `#1FB8CC` + carbon `#0A0E0C` + surface `#121815` + off-white `#F5F7F4` + muted `#9BA8A2` (FR-080).
- FR52: Red and Teal never directly adjacent; always separated by carbon or off-white (FR-081).
- FR53: No Red→Teal gradient (FR-082).
- FR54: Color-coded distinctions reinforced by icon or text label (FR-083).
- FR55: Red is "spark" color (≤15% surface coverage); Teal carries day-to-day identity (FR-084).
- FR56: Primary "Book a call" CTA uses Teal across all surfaces (FR-085).
- FR57: Logo served from `public/image/ptrniger.png` (SVG version requested at LD-1) (FR-086).
- FR58: Typography preserves Geist Sans + Geist Mono (FR-087).

**Motion & animation**
- FR59: Migrate and re-tint Aurora, MagneticButton, ScrollProgress, marquee, WordReveal (FR-090).
- FR60: Non-essential motion gated by `prefers-reduced-motion: reduce` (FR-091).
- FR61: No motion blocks content interactivity (no >300ms blocking entry on primary CTA) (FR-092).

**Imagery**
- FR62: Migrate raw `<img>` to `next/image` for project covers, client logos, profile, team (FR-100).
- FR63: Remove all Unsplash placeholders; only real client logos with written permission (FR-101).
- FR64: All images include localized `alt` text (FR-102).

**SEO & metadata**
- FR65: Set `metadataBase = https://agency.ptrniger.com` (FR-110).
- FR66: Emit OG image (≥1200×630), titles, descriptions, locale, Twitter card on every page (FR-111).
- FR67: `sitemap.xml` lists EN+FR variants of all routes with hreflang annotations (FR-112).
- FR68: `robots.txt` allows crawlers and links to sitemap (FR-113).
- FR69: Emit `Organization` JSON-LD on `/`; `WebPage` JSON-LD on all routes (FR-114).

**Domain migration & redirects**
- FR70: Deploy 301 redirect map from legacy `portfolio.nigerdev.com` to `agency.ptrniger.com` equivalents (AD-026 — Nginx-level) (FR-120).
- FR71: Legacy domain remains hosted as redirect-only origin ≥12 months post-launch (FR-121).
- FR72: Inventory inbound links and execute coordinated cutover (FR-122, LD-10).

**Analytics**
- FR73: Integrate analytics — **Umami self-hosted** per AD-013 (supersedes PRD FR-130 Plausible) (FR-130).
- FR74: Capture UTM parameters; forward to agency notification on form submission (FR-131).
- FR75: No GA, no FB Pixel, no advertising trackers (FR-132).

**Skill curation**
- FR76: Skill section displays only items confirmed on mastery checklist (`content/skills.mastery.txt`, LD-3) (FR-140).
- FR77: Exclude jQuery, MERISE, and unverifiable items from legacy site (FR-141).
- FR78: Validated stack themes — TypeScript advanced, PHPUnit, Jest/Vitest/Playwright, Vercel/AWS/DigitalOcean, Stripe, REST/GraphQL, Redis, AI APIs (FR-142).

### NonFunctional Requirements

**Performance**
- NFR1: Lighthouse Performance ≥ 90 on `/`, `/work`, all 4 case studies, `/services` (mobile, throttled).
- NFR2: LCP ≤ 2.5s on 4G mobile.
- NFR3: CLS ≤ 0.1 on all routes.
- NFR4: INP ≤ 200ms on all interactive surfaces.
- NFR5: All 30+ tech-stack icons self-hosted under `/public/icons/`.
- NFR6: First-load JS ≤ 200 KB gzip on `/` and case-study routes.

**Accessibility**
- NFR7: Lighthouse Accessibility ≥ 90 on all routes.
- NFR8: All color combinations meet WCAG 2.1 AA contrast (4.5:1 text, 3:1 UI).
- NFR9: Full keyboard navigability on locale switcher, filters, modal, form, Calendly trigger.
- NFR10: Appropriate ARIA labels on all interactive components.
- NFR11: `prefers-reduced-motion` disables Aurora and Magnetic-button effects.

**SEO**
- NFR12: Lighthouse SEO ≥ 90 on all routes.
- NFR13: Critical content rendered server-side, not client-rendered behind hydration.

**Browser & device**
- NFR14: Function on latest 2 versions of Chrome, Safari, Firefox, Edge.
- NFR15: Mobile-first responsive 360px → 1920px.

**Hosting & deployment**
- NFR16: Hosted on user's VPS (Next.js standalone + Nginx + PM2).
- NFR17: DNS for `agency.ptrniger.com` configured with TLS, HSTS, www→apex policy.
- NFR18: Deployments via `git pull && npm ci && npm run build && pm2 reload`.

**Privacy & data**
- NFR19: No PII collected outside contact form and Calendly.
- NFR20: Contact form data persisted to JSONL on disk over TLS; no third-party storage.
- NFR21: Privacy policy lists every third-party processor (Calendly, Umami, hosting).

**Security**
- NFR22: CSP with nonce; `script-src 'self' 'nonce-...' https://assets.calendly.com`; `frame-src https://calendly.com`.
- NFR23: Form endpoint implements honeypot + IP rate limit ≤5 submissions / IP / hour.
- NFR24: No secrets in client bundles.

**Observability**
- NFR25: Uptime monitoring; alert on uptime <99.5%.
- NFR26: Form submission errors logged server-side.

### Additional Requirements

**From Architecture (AD-XXX):**

- Switch `next.config.ts` from `output: 'export'` to `output: 'standalone'` (AD-002).
- Adopt `next-intl` middleware-based i18n with `[locale]` segment + localized pathnames (AD-001).
- Case studies as MDX in `content/case-studies/{slug}.{locale}.mdx`; projects/skills/companies as TS modules under `content/` (AD-003, AD-004).
- Migrate `lib/translations.ts` to `messages/en.json` + `messages/fr.json` (AD-005).
- Form pipeline: API route → Zod → JSONL → optional Telegram (AD-006).
- Self-host Umami via Docker compose, served same-origin via Nginx `/umami/` (AD-007/AD-013).
- Cookie banner = custom ~50-LOC component, localStorage-persisted (AD-019).
- Strict CSP with nonce injected by middleware (AD-014).
- In-memory LRU rate-limit (5/IP/h), no CAPTCHA (AD-015).
- Trunk-based on `master`; feature PRs (AD-016).
- `next/image` + `sharp` runtime (AD-017).
- Filtering on `/work`: client state + URL query params, no Fuse.js (AD-018).
- Tests v1: typecheck + ESLint + Playwright e2e on locale switch, form submit, Calendly CTA (AD-020).
- Bundle budget enforced via CI (AD-021).
- Self-hosted DevIcons under `public/icons/devicons/` (AD-022).
- Dark-only theme (AD-023).
- Brand hex pixel-sampled with build-time AA contrast script (AD-024).
- Calendly = popup widget on home/global CTA, inline on `/contact` (AD-025).
- 301 redirects at Nginx level on legacy host (AD-026).
- Sitemap & robots via `app/sitemap.ts` and `app/robots.ts` (AD-028).
- JSON-LD via server `<JsonLd>` component (AD-029).
- Skill mastery gate via CI script comparing `content/skills.ts` vs `content/skills.mastery.txt` (AD-030).
- Remove committed `out/` directory; gitignore.
- Delete legacy unused files: `lib/types.ts`, `lib/data.ts`.

**Operational launch dependencies (LD-XXX):**

- LD-1: SVG version of logo → FR57
- LD-2: Calendly account + 3 event types → FR40
- LD-3: Skill mastery checklist → FR76, FR78
- LD-4: Italian projects publishability — deferred, does not block v1
- LD-5: Pre-launch baseline ≥20 outbound sends (parallel)
- LD-6: Agency inbox + responder + 4h SLA → FR43
- LD-7: ≥3 named testimonials at launch → FR14
- LD-8: Real client logos with written permission → FR14, FR63
- LD-9: 1 paragraph + outcome metrics per case study → FR23
- LD-10: Inbound link inventory → FR72
- LD-11: Operational ops bundle — out of site scope

### UX Design Requirements

- UX-DR1: Define Tailwind v4 brand tokens (`--ptr-red`, `--ptr-teal`, `--carbon`, `--surface`, `--off-white`, `--muted`).
- UX-DR2: Build-time AA contrast checker (`scripts/check-contrast.ts`).
- UX-DR3: Hero component for `/` with H1 + trust strip + timezone badge + primary Teal CTA.
- UX-DR4: TrustStrip component (real client logos).
- UX-DR5: FeaturedCaseStudies component (3–5 cards).
- UX-DR6: ServicesOverview home section.
- UX-DR7: Project gallery on `/work` with multi-select filters + free-text search + URL state.
- UX-DR8: Case Study layout components (`<Situation>`, `<Challenge>`, `<Solution>`, `<StackBadgeRow>`, `<MetricBlock>`, `<OutcomeCallout>`).
- UX-DR9: Services packages component (3 cards + EUR ranges + EU data-residency note).
- UX-DR10: "Partner with us" panel + Partnership CTA.
- UX-DR11: Contact form component with consent + honeypot + ack + SLA + fallback.
- UX-DR12: LocaleSwitcher preserving equivalent route across locales.
- UX-DR13: CookieBanner ~50 LOC.
- UX-DR14: TechIcon component reading typed self-hosted DevIcons registry.
- UX-DR15: Re-tint Aurora/MagneticButton/ScrollProgress/marquee/WordReveal + `prefers-reduced-motion` gate.
- UX-DR16: Responsive 360px → 1920px on every page.
- UX-DR17: Locale-aware 404 and error pages.

### FR Coverage Map

| FR | Epic | Notes |
|---|---|---|
| FR1–FR8 | Epic 1 | i18n routing & translation infrastructure |
| FR9–FR15 | Epic 2 | Home page narrative |
| FR16–FR21 | Epic 3 | Work gallery |
| FR22–FR28 | Epic 3 | Case studies |
| FR29–FR34 | Epic 2 | Services page |
| FR35–FR39 | Epic 2 | About page |
| FR40–FR47 | Epic 4 | Contact + Calendly + form pipeline |
| FR48–FR50 | Epic 4 | Privacy & cookie banner |
| FR51–FR58 | Epic 1 | Brand tokens |
| FR59–FR61 | Epic 1 | Motion re-tint |
| FR62–FR64 | Epic 1 | Image migration infrastructure |
| FR65–FR69 | Epic 5 | SEO metadata, sitemap, robots, JSON-LD |
| FR70–FR72 | Epic 5 | Domain migration & redirects |
| FR73–FR75 | Epic 5 | Analytics (Umami) |
| FR76–FR78 | Epic 1 | Skill curation gate |

All 78 FRs mapped. NFRs adressed transversally per epic; UX-DRs distributed: UX-DR1/2/14/15/16/17 → E1; UX-DR3/4/5/6/9/10 → E2; UX-DR7/8 → E3; UX-DR11/12/13 → E1+E4.

## Epic List

### Epic 1: Bilingual Foundation & Brand Identity
A prospect arrives on any URL with the correct language (EN/FR), sees the rebranded PTR site (red/teal/carbon), and navigates without personal contact details or portfolio framing. The terrain is clean for narrative pages.
**FRs covered:** FR1–FR8, FR51–FR64, FR76–FR78

### Epic 2: Agency Narrative Pages (Home, Services, About)
A prospect can read PTR Niger's value pitch, understand the 3 service packages with EUR ranges, and learn about the agency story — in EN or FR. No "individual portfolio" signal remains; no personal WhatsApp.
**FRs covered:** FR9–FR15, FR29–FR39

### Epic 3: Project Portfolio & Case Studies
A prospect can browse 12+ projects, filter by sector/region/type, search, and read 4 deep case studies (Softis 🇯🇵, PTR School 🇳🇪, GuidaCenter 🇳🇪, CSF 🇨🇳🇳🇪) with metrics and outcomes.
**FRs covered:** FR16–FR28

### Epic 4: Conversion Pipeline (Calendly + Form + Privacy)
A prospect can book a call (Calendly popup home + inline `/contact`) or submit a structured brief; submission persists on the VPS and notifies Mounkaila via Telegram. Privacy + cookie banner shown.
**FRs covered:** FR40–FR50

### Epic 5: SEO, Analytics, Deployment & Cutover
The site is publicly live on `agency.ptrniger.com` with proper SEO/OG/sitemap, Umami analytics tracking conversion, and the legacy `portfolio.nigerdev.com` domain redirecting cleanly. Launch authorized.
**FRs covered:** FR65–FR75

---

## Epic 1: Bilingual Foundation & Brand Identity

A prospect arrives on any URL with the correct language (EN/FR), sees the rebranded PTR site, and navigates without personal contact details or portfolio framing. Behind the scenes: the existing static-export Next.js app is migrated to a Node-server `standalone` build with `next-intl` middleware-based i18n, the brand palette is migrated from lime/orange to PTR red/teal/carbon, the monolithic `app/page.tsx` is split into typed content modules, and existing motion components are re-tinted. The site remains continuously functional throughout the epic.

### Story 1.1: Migrate Next.js to standalone output

As a **DevOps engineer**,
I want **the Next.js build to produce a `standalone` Node server bundle**,
So that **the site can run on a self-hosted VPS with API routes and middleware (required for next-intl and the contact form)**.

**Acceptance Criteria:**

**Given** the current `next.config.ts` uses `output: 'export'`
**When** I update it to `output: 'standalone'` and remove the `images.unoptimized: true` flag
**Then** `npm run build` produces a `.next/standalone/` directory containing `server.js` and minimal `node_modules`
**And** running `node .next/standalone/server.js` serves the existing site on `127.0.0.1:3000`

**Given** the current build script `next build --turbopack`
**When** I keep `--turbopack` and run a clean build
**Then** the build succeeds without errors
**And** `out/` directory is no longer generated

**Given** the legacy `out/` directory is committed to Git
**When** I add `out/` and `data/` to `.gitignore` and remove `out/` from tracking
**Then** `git status` shows the deletion staged cleanly
**And** the legacy unused files `lib/types.ts` and `lib/data.ts` are deleted (verified unused via Grep across `app/` and `components/`)

### Story 1.2: Install and configure next-intl with localized routing

As a **prospect with an English browser**,
I want **the URL `/` to redirect me to `/en` (or `/fr` if my browser is French)**,
So that **I see the site in my preferred language without manually toggling**.

**Acceptance Criteria:**

**Given** `next-intl` is installed and `lib/i18n.ts` defines locales `["en", "fr"]` with localized pathnames (`/work` ↔ `/realisations`, `/case-studies` ↔ `/etudes-de-cas`, `/about` ↔ `/a-propos`, `/services`, `/contact`, `/privacy` ↔ `/confidentialite`)
**When** I visit `/` with `Accept-Language: en-US`
**Then** I am 302-redirected to `/en`
**And** an `NEXT_LOCALE=en` cookie is set with 1-year expiry

**Given** I have `NEXT_LOCALE=fr` cookie set
**When** I visit `/`
**Then** I am 302-redirected to `/fr` regardless of `Accept-Language`

**Given** I am on `/en/services`
**When** I click the locale switcher to FR
**Then** I navigate to `/fr/services` (the equivalent localized route)
**And** my cookie is updated to `NEXT_LOCALE=fr`

**Given** any rendered page
**When** I inspect the response
**Then** the `<html lang>` attribute matches the active locale
**And** `<link rel="alternate" hreflang="en">`, `hreflang="fr">`, and `hreflang="x-default">` (pointing to EN) are present in `<head>`

### Story 1.3: Migrate translations from lib/translations.ts to next-intl message files

As a **content maintainer**,
I want **all UI strings to live in `messages/en.json` and `messages/fr.json`**,
So that **next-intl can serve them via `useTranslations()` / `getTranslations()` and the runtime React-state language toggle is removed**.

**Acceptance Criteria:**

**Given** the existing `lib/translations.ts` file with deeply-nested EN/FR objects
**When** I run a one-time migration extracting every leaf string
**Then** `messages/en.json` and `messages/fr.json` contain all keys with identical shape
**And** `lib/translations.ts` is deleted

**Given** any page or server component
**When** it needs a localized string
**Then** it imports `getTranslations` from `next-intl/server` (server) or `useTranslations` (client) — no React-state toggle is referenced anywhere
**And** running `npm run build` produces no missing-key warnings from next-intl

**Given** every key present in `en.json`
**When** I diff against `fr.json`
**Then** the key sets are identical (no orphan keys, no missing translations)

### Story 1.4: Split monolithic content into typed modules under content/

As a **content maintainer**,
I want **projects, skills, and companies data to live in dedicated typed files**,
So that **`app/page.tsx` shrinks from a 968-line monolith and content is editable without touching layout code**.

**Acceptance Criteria:**

**Given** `app/page.tsx` currently inlines `profile`, `skillGroups`, `companies`, and `projects` constants
**When** the migration runs
**Then** `content/projects.ts` exports a typed `Project[]` matching the architecture spec (id, title, kind, year, cover, description {en, fr}, tags, links, region, sector)
**And** `content/skills.ts` exports `SkillGroup[]`
**And** `content/companies.ts` exports `Company[]`
**And** `content/profile.ts` exports the agency-level profile object (no individual phone/WhatsApp)

**Given** the new `content/` modules
**When** any page or component renders project, skill, or company data
**Then** it imports from `content/*.ts` (not from `app/page.tsx`)
**And** TypeScript strict mode reports zero errors

**Given** the existing `components/sections/Profile|Skills|Projects|CompaniesSection.tsx`
**When** they are kept (will be replaced in Epic 2 and 3)
**Then** they consume data from `content/*.ts` modules and continue to render on the legacy non-localized routes during the transition

### Story 1.5: Define and apply PTR brand tokens with AA contrast gate

As a **designer or developer**,
I want **brand colors defined as Tailwind v4 tokens with a build-time AA contrast check**,
So that **every UI surface uses the correct palette and accidental low-contrast pairs fail CI**.

**Acceptance Criteria:**

**Given** the logo at `public/image/ptrniger.png`
**When** I pixel-sample the dominant red and teal
**Then** I commit final hex codes (default provisional: `#E8273E` red, `#1FB8CC` teal) to `app/globals.css` as CSS variables `--ptr-red`, `--ptr-teal`, `--carbon: #0A0E0C`, `--surface: #121815`, `--off-white: #F5F7F4`, `--muted: #9BA8A2`
**And** `tailwind.config.ts` exposes them under `theme.extend.colors` (`ptr.red`, `ptr.teal`, `carbon`, `surface`, `off-white`, `muted`)

**Given** `scripts/check-contrast.ts` is added
**When** `npm run build` (or `npm run check:contrast`) runs
**Then** the script tests every documented foreground/background pair
**And** any pair below WCAG 2.1 AA (4.5:1 text, 3:1 UI) exits non-zero with a clear error listing the failing pairs

**Given** any rendered page
**When** I inspect computed styles
**Then** no element uses the legacy lime/orange palette (greppable absence in the resulting CSS bundle)

### Story 1.6: Re-tint motion components and gate by prefers-reduced-motion

As a **prospect with a motion-sensitivity preference**,
I want **all decorative animations to disable when `prefers-reduced-motion: reduce` is set**,
So that **the site is accessible and doesn't trigger discomfort**.

**Acceptance Criteria:**

**Given** the existing `components/shared/AuroraBackground.tsx`, `MagneticButton.tsx`, `ScrollProgress.tsx`, plus marquee and WordReveal components
**When** they are updated
**Then** all gradient stops and accent strokes use brand tokens (`var(--ptr-red)`, `var(--ptr-teal)`, `var(--carbon)`)
**And** no hardcoded lime/orange or stock gradient hex remains in any motion component

**Given** a user with `prefers-reduced-motion: reduce`
**When** they load any page using these components
**Then** AuroraBackground renders a static gradient (no canvas animation) or returns null
**And** MagneticButton no longer translates on mouse move
**And** ScrollProgress remains visible (it is functional, not decorative) but without easing animation
**And** marquee animation pauses

**Given** the home page
**When** the primary "Book a call" CTA renders
**Then** any entry animation completes in ≤300ms or is non-blocking (does not delay click handler attachment)

### Story 1.7: Migrate raw img tags to next/image

As a **prospect on mobile 4G**,
I want **images to be served in modern formats (AVIF/WebP) at appropriate sizes**,
So that **the LCP target ≤2.5s is achievable and bandwidth is conserved**.

**Acceptance Criteria:**

**Given** every `<img>` usage across `app/`, `components/sections/`, and `components/shared/`
**When** the migration runs
**Then** they are replaced by `<Image>` from `next/image` with explicit `width`, `height`, `alt`, and `sizes` attributes
**And** above-the-fold images on `/[locale]` use `priority`

**Given** `next.config.ts`
**When** image config is set
**Then** `images.formats: ['image/avif', 'image/webp']` is enabled
**And** `images.unoptimized` is NOT set (the `sharp` runtime bundled with standalone handles optimization)

**Given** an Unsplash placeholder URL
**When** I grep `https://images.unsplash.com` across the repo
**Then** zero matches remain (replaced by real client logos under `public/logos/clients/` or temporary local placeholders for projects pending logo permissions)

### Story 1.8: Build TechIcon component with self-hosted DevIcons registry

As a **developer**,
I want **a typed `<TechIcon name="laravel" />` component that reads from a self-hosted SVG registry**,
So that **the site no longer depends on `cdn.jsdelivr.net` at runtime and LCP is deterministic**.

**Acceptance Criteria:**

**Given** the 30+ DevIcon URLs currently referenced in `content/skills.ts`
**When** the icons are downloaded
**Then** their SVGs are stored under `public/icons/devicons/{name}.svg`
**And** `LICENSES.md` at the repo root attributes DevIcons (MIT) with the source commit hash

**Given** `components/tech-icon.tsx`
**When** rendered with `<TechIcon name="laravel" />`
**Then** it inlines `/icons/devicons/laravel.svg` via a typed registry (TypeScript union type prevents typos)
**And** no `cdn.jsdelivr.net` URL remains anywhere in the rendered HTML or fetched assets

**Given** `app/[locale]/page.tsx` skills section (legacy or new)
**When** the page renders
**Then** all skill icons load from same-origin (`/icons/devicons/...`)

### Story 1.9: Implement skill curation gate with mastery checklist

As a **product owner**,
I want **skills shown on the site to be limited to a user-owned mastery checklist**,
So that **no unverifiable claims (jQuery, MERISE, etc.) leak back in via casual edits**.

**Acceptance Criteria:**

**Given** `content/skills.mastery.txt` exists (one skill name per line, user-authored)
**When** `scripts/check-skills.ts` runs (called from `npm run build`)
**Then** every entry in `content/skills.ts` whose name is not present in `skills.mastery.txt` causes the script to exit non-zero with a list of unauthorized skills
**And** the build fails

**Given** `content/skills.ts`
**When** I inspect its contents
**Then** jQuery and MERISE are absent
**And** entries match the architecture's validated themes (TypeScript advanced, PHPUnit, Jest/Vitest/Playwright, Vercel/AWS/DigitalOcean, Stripe, REST/GraphQL, Redis, AI APIs) when present in mastery.txt

**Given** a CI workflow
**When** a PR modifies `content/skills.ts`
**Then** the skill gate runs and blocks merge on failure

### Story 1.10: Build LocaleSwitcher and global header

As a **prospect**,
I want **a visible language switcher in the global header**,
So that **I can flip between EN and FR while staying on the equivalent route**.

**Acceptance Criteria:**

**Given** any page
**When** it renders
**Then** the global header includes a `<LocaleSwitcher>` showing the inactive locale as a clickable link (e.g., "FR" when on `/en/...`)

**Given** I am on `/en/work` and click the switcher
**When** the navigation completes
**Then** I am on `/fr/realisations` (the localized equivalent)
**And** the switcher now shows "EN"

**Given** the switcher is keyboard-focusable
**When** I press Tab to focus it and Enter to activate
**Then** the locale switch occurs identically to a click

**Given** the page has not yet loaded fully
**When** the switcher is rendered server-side
**Then** it is interactive without waiting for client hydration of unrelated components (e.g., Aurora)

### Story 1.11: Provide locale-aware 404 and error pages

As a **prospect who follows a stale link**,
I want **a localized 404 page that helps me get back to relevant content**,
So that **I don't bounce on a generic broken page**.

**Acceptance Criteria:**

**Given** I navigate to `/en/this-does-not-exist`
**When** the route resolves
**Then** `app/[locale]/not-found.tsx` renders with a localized message and links back to `/en` and `/en/work`
**And** the response status is 404

**Given** a server error occurs in any route handler
**When** the error boundary triggers
**Then** `app/[locale]/error.tsx` renders a localized fallback with a link back to `/[locale]`
**And** the response status is 500

---

## Epic 2: Agency Narrative Pages (Home, Services, About)

A prospect can read PTR Niger's value pitch, understand the 3 service packages with EUR ranges, and learn about the agency in EN or FR. Personal contact details (Mounkaila phone/WhatsApp +227) are removed; agency-level positioning replaces them.

### Story 2.1: Build agency-grade Hero on home

As a **warm-outbound prospect**,
I want **above-the-fold copy that answers "what does PTR Niger do, for whom, why trust them, how to book"**,
So that **I decide in <30 seconds whether to book a call**.

**Acceptance Criteria:**

**Given** I land on `/en` or `/fr`
**When** above-the-fold renders
**Then** I see an H1 value pitch (no individual employee names; "Niger" appears at most once and only in the trust strip context)
**And** a trust strip showing years (9+), team size (10+), and ≥3 client logos with permissions
**And** a timezone badge "Working hours 10am–7pm WAT (= 11am–8pm CET) — overlap with EU & US morning" (localized)
**And** a primary Teal CTA "Book a 20-min discovery call" / "Réserver un appel découverte de 20 min"

**Given** I click the primary CTA
**When** Calendly is wired (Story 4.x — until then, link to `/[locale]/contact`)
**Then** the click navigates to `/[locale]/contact`
**And** the CTA is keyboard-accessible (Tab + Enter activates)

**Given** my browser preference is `prefers-reduced-motion: reduce`
**When** the hero entry animation runs
**Then** any motion is skipped or capped at 300ms (per FR61)

### Story 2.2: Build TrustStrip component fed by content/clients.ts

As a **prospect skeptical of an unfamiliar agency**,
I want **to see real client logos and brief credibility signals**,
So that **the agency feels legitimate before I read anything else**.

**Acceptance Criteria:**

**Given** `content/clients.ts` exports a typed `Client[]` (id, name, logo, permission: boolean)
**When** the TrustStrip renders
**Then** it shows only entries where `permission === true`
**And** each logo is a `next/image` with localized alt text and a same-origin path under `public/logos/clients/`

**Given** an entry with `permission: false`
**When** the strip builds at compile time
**Then** that entry is filtered out (CI does NOT fail; permissions are user-managed runtime data)

**Given** `npm run check:assets` runs
**When** any logo file is absent on disk for an entry with `permission: true`
**Then** the script exits non-zero listing missing logos

### Story 2.3: Build FeaturedCaseStudies home section

As a **prospect**,
I want **3–5 highlighted case studies on the home page**,
So that **I see proof of shipped work without having to navigate further**.

**Acceptance Criteria:**

**Given** `content/case-studies/*.{locale}.mdx` files exist (Epic 3 produces them; until then, frontmatter-only stubs are valid)
**When** the FeaturedCaseStudies section renders
**Then** it lists the 3–5 entries marked `featured: true` in their frontmatter, in the active locale
**And** each card shows cover, title, sector tag, region tag, and links to `/[locale]/case-studies/[slug]`

**Given** fewer than 3 case studies are marked `featured: true`
**When** the home page builds
**Then** a clear console warning is emitted at build time, and the section degrades gracefully (still renders what exists)

### Story 2.4: Build ServicesOverview home section

As a **prospect**,
I want **a high-level summary of the 3 service packages on the home page**,
So that **I can self-qualify before going deeper into `/services`**.

**Acceptance Criteria:**

**Given** the home page
**When** the ServicesOverview section renders
**Then** it shows the three packages (Maintenance / Audit / Build) with a one-line value pitch each
**And** each card links to `/[locale]/services#[package-anchor]`
**And** TJM is NOT shown anywhere

### Story 2.5: Build the /services page with three packages

As a **prospect evaluating a fit**,
I want **a dedicated services page with engagement format, day-range, and EUR investment range per package**,
So that **I can self-qualify on budget before booking a call**.

**Acceptance Criteria:**

**Given** I navigate to `/[locale]/services`
**When** the page renders
**Then** three package cards appear: **Maintenance** (engagement = retainer; from €1.5k/month; day-range disclosed), **Audit** (engagement = sprint; from €3–6k; day-range), **Build** (engagement = project; from €12k; day-range)
**And** each card links to ≥1 representative case study from Epic 3
**And** TJM is NOT disclosed anywhere on the page

**Given** the page
**When** the EU data-residency statement renders
**Then** a clearly visible block reads "Deployments to Vercel / AWS Frankfurt or Paris regions per client preference; data residency client-controlled" (localized)

### Story 2.6: Build the "Partner with us" panel and Partnership CTA

As a **boutique EU agency owner**,
I want **a clear B2B2C overflow capacity proposal on `/services`**,
So that **I can engage PTR for white-label / surge-capacity work without going through the standard flow**.

**Acceptance Criteria:**

**Given** I am on `/[locale]/services`
**When** I scroll past the three packages
**Then** a distinct "Partner with us — overflow capacity for boutique agencies" panel renders
**And** its CTA opens the Partnership Calendly event (Epic 4 wires Calendly; until then, the CTA links to `/[locale]/contact?intent=partnership`)

**Given** I click the Partnership CTA from this panel
**When** the contact form receives the submission (Epic 4)
**Then** the `projectType` field is pre-tagged "partnership"

### Story 2.7: Build the /about page

As a **prospect**,
I want **a page that tells PTR Niger's story, shows the team in one photo, and explains how the agency works without naming individuals**,
So that **I get a humanized but agency-framed sense of who I'd be working with**.

**Acceptance Criteria:**

**Given** I navigate to `/[locale]/about`
**When** the page renders
**Then** the narrative covers founding (2017), 9+ years track record, 10+ team members, sectors served (logistics, real estate, e-learning, recruitment, school management, sports, CRM, BTP)
**And** a single team photo from `public/image/equipe.png` renders via `next/image` with localized alt
**And** the page explicitly lists the bilingual EN+FR delivery as a differentiator
**And** the EU data-residency statement is included (matching the wording on `/services`)
**And** no individual employee names appear anywhere on the page
**And** an "engagement composition" block reads "Typical engagement: 1 tech lead + 2 devs + 1 designer + 1 QA — named at SOW signing" (localized)

### Story 2.8: Remove personal contact and portfolio framing across the site

As a **prospect**,
I want **no personal phone, WhatsApp, or individual developer name visible anywhere on the site**,
So that **the agency framing is consistent and no friction signal leaks**.

**Acceptance Criteria:**

**Given** any rendered page
**When** I grep the rendered HTML for `+227`, `WhatsApp`, `wa.me`, or specific personal names
**Then** zero matches are found

**Given** `messages/en.json` and `messages/fr.json`
**When** they are inspected
**Then** all personal contact strings are absent
**And** the legacy Hero copy referencing "Boubacar Mounkaila" or similar is replaced by agency-level copy

**Given** `app/layout.tsx` and `app/[locale]/layout.tsx` metadata
**When** they emit `<title>`, `<meta name="description">`, and `<meta name="author">`
**Then** none of these contain individual employee names; all reference "PTR Niger" or "Pro Technologie & Révolution"

### Story 2.9: Add secondary end-of-page CTA on home

As a **prospect who scrolled past the hero**,
I want **a secondary call-to-action at end-of-page**,
So that **I can convert without scrolling back to the top**.

**Acceptance Criteria:**

**Given** I scroll to the bottom of `/[locale]`
**When** the section renders
**Then** a secondary CTA "Ready to ship? Book a 20-min call" (localized) is visible
**And** it links to `/[locale]/contact` (Epic 4 will wire it to Calendly popup)
**And** it uses the Teal token (FR56)

---

## Epic 3: Project Portfolio & Case Studies

A prospect can browse all projects, filter and search them, and read 4 deep case studies with full Situation/Challenge/Solution/Stack/Result narrative. Each case study is independently SEO-discoverable via long-tail localized slugs.

### Story 3.1: Build the /work project gallery with filters and search

As a **prospect evaluating fit**,
I want **a filterable, searchable gallery of all PTR projects**,
So that **I can find work similar to my own use case quickly**.

**Acceptance Criteria:**

**Given** `content/projects.ts` exports 12+ projects with sector, region, type, year fields
**When** I navigate to `/[locale]/work` (or `/fr/realisations`)
**Then** the gallery renders all projects as cards (cover, title, sector, region, year)

**Given** the filter bar
**When** I select sector "Education", region "Africa", and type "Entreprise"
**Then** the gallery shows only matching projects (multi-select; intersection logic)
**And** the URL becomes `/en/work?sector=education&region=africa&type=entreprise`
**And** copy-pasting that URL into a new tab reproduces the filtered state

**Given** the search input
**When** I type "school"
**Then** the gallery filters to projects whose title or tags contain "school" (case-insensitive substring)
**And** the URL appends `&q=school`

**Given** I press the browser back button after applying filters
**When** the navigation resolves
**Then** the previous filter state is restored (URL ↔ state sync via `useSearchParams`)

### Story 3.2: Wire project cards to case studies or modal

As a **prospect**,
I want **to click any project card and either jump to a deep case study or see a quick-look summary**,
So that **I get the right depth of information without leaving the work page unless I choose to**.

**Acceptance Criteria:**

**Given** a project entry has `links.caseStudy` pointing to a slug
**When** I click the card
**Then** I navigate to `/[locale]/case-studies/[slug]`

**Given** a project without a `caseStudy` link
**When** I click the card
**Then** a Radix Dialog opens with cover, 1-paragraph summary, tags, year, and external `links.site` / `links.repo` if present
**And** the dialog is keyboard-accessible (Esc closes, focus trap)

### Story 3.3: Set up MDX infrastructure for case studies

As a **content author**,
I want **to write case studies in MDX with reusable React components**,
So that **prose, metric blocks, and stack badges can interleave naturally**.

**Acceptance Criteria:**

**Given** `@next/mdx` is installed
**When** `next.config.ts` is configured
**Then** `.mdx` files in `content/case-studies/*.{locale}.mdx` are loadable as React components
**And** `lib/content.ts` exposes `getCaseStudy(slug, locale)` and `getAllCaseStudies(locale)` helpers

**Given** `components/case-study/` directory
**When** the components are added
**Then** `<Situation>`, `<Challenge>`, `<Solution>`, `<StackBadgeRow stack={...}>`, `<MetricBlock value="..." label="...">`, and `<OutcomeCallout>` are exported and importable from MDX without explicit imports (provided via MDX components map in `mdx-components.tsx`)

### Story 3.4: Build the case-study layout page

As a **prospect**,
I want **a consistent, well-structured case-study page that loads fast and renders cleanly when shared**,
So that **I can absorb the proof and forward the link to my team confidently**.

**Acceptance Criteria:**

**Given** I navigate to `/[locale]/case-studies/[slug]`
**When** `lib/content.ts` resolves the MDX file for that slug+locale
**Then** the page renders with hero (cover, title, sector, region, year, client) followed by the MDX body

**Given** the MDX body uses `<Situation>`, `<Challenge>`, `<Solution>`, `<StackBadgeRow>`, `<MetricBlock>`, `<OutcomeCallout>`
**When** rendered
**Then** each section has a clear visual hierarchy and consistent spacing across all case studies

**Given** the page
**When** rendered server-side
**Then** an OG card image, localized title, and localized description are emitted in `<head>`
**And** a JSON-LD `CreativeWork` (or `CaseStudy`) schema is emitted as a server-rendered `<script type="application/ld+json">` tag

**Given** a slug+locale combination that doesn't exist
**When** the route resolves
**Then** the locale-aware 404 page renders (Story 1.11)

### Story 3.5: Author the Softis Pilates case study (EN + FR)

As a **prospect interested in JP/wellness work**,
I want **a deep case study about the Softis Pilates platform**,
So that **I see proof of international SaaS work delivered for a Tokyo client**.

**Acceptance Criteria:**

**Given** `content/case-studies/nextjs-pilates-booking-platform-japan.en.mdx` and `.../plateforme-reservation-pilates-nextjs-japon.fr.mdx`
**When** the files are authored
**Then** each has frontmatter (title, slug, sector=wellness, region=japan, year, cover, client="Softis Pilates", stack=[nextjs, typescript, tailwind, stripe], duration, team, metrics, nda=false, featured=true)
**And** the body covers Situation → Challenge → Solution → Stack → Result with at least one concrete metric (or non-gated metric per FR27 if NDA-blocked)

**Given** the EN and FR variants
**When** content is reviewed
**Then** they are peer translations (no machine-translation tells), and slugs differ between locales for SEO long-tail purposes (FR24)

### Story 3.6: Author the PTR School case study (EN + FR)

As a **prospect interested in edu / SaaS**,
I want **a deep case study about PTR School**,
So that **I see proof of multi-tenant school management SaaS delivery**.

**Acceptance Criteria:**

**Given** `content/case-studies/laravel-school-management-saas.en.mdx` and `.../plateforme-saas-gestion-scolaire-laravel.fr.mdx`
**When** authored
**Then** frontmatter includes sector=edu, region=africa, stack=[laravel, vue, mysql, ...], at least one outcome metric (users served, schools onboarded, uptime)
**And** EN and FR are peer translations

### Story 3.7: Author the GuidaCenter case study (EN + FR)

As a **prospect interested in B2B/recruitment**,
I want **a deep case study about GuidaCenter**,
So that **I see proof of recruitment-tech delivery**.

**Acceptance Criteria:**

**Given** `content/case-studies/recruitment-platform-guidacenter.en.mdx` and `.../plateforme-recrutement-guidacenter.fr.mdx`
**When** authored
**Then** frontmatter includes sector=recruitment, region=africa, stack, at least one non-NDA-blocked outcome metric
**And** EN and FR are peer translations

### Story 3.8: Author the Commande Sans Frontière case study (EN + FR)

As a **prospect interested in cross-border logistics / trade**,
I want **a deep case study about Commande Sans Frontière**,
So that **I see proof of China-Niger trade-corridor work**.

**Acceptance Criteria:**

**Given** `content/case-studies/cross-border-trade-platform-china-niger.en.mdx` and `.../plateforme-commerce-transfrontalier-chine-niger.fr.mdx`
**When** authored
**Then** frontmatter includes sector=logistics, region=china-corridor, stack, at least one non-NDA-blocked outcome metric
**And** EN and FR are peer translations

### Story 3.9: Cross-link work, services, and case studies

As a **prospect deep in a case study**,
I want **clear links back to the work gallery and to relevant services**,
So that **I can move between proof and offer fluidly**.

**Acceptance Criteria:**

**Given** I am on any case-study page
**When** I scroll to the end
**Then** a "Related package" block links to the matching `/[locale]/services#[package-anchor]`
**And** a "More work" block links back to `/[locale]/work`

**Given** I am on `/[locale]/services`
**When** each package card renders
**Then** it links to ≥1 case-study slug (per FR34)

---

## Epic 4: Conversion Pipeline (Calendly + Form + Privacy)

A prospect can either book a call via Calendly (popup on global CTAs, inline iframe on `/contact`) or submit a structured brief via a form. Submissions persist to JSONL on the VPS and optionally push to Telegram. Privacy and cookie compliance are exposed; consent is captured.

### Story 4.1: Wire the Calendly popup widget on global CTAs

As a **prospect ready to book**,
I want **clicking "Book a call" anywhere to open a Calendly popup without a full page reload**,
So that **the booking experience is frictionless and the home/work/services pages stay in context**.

**Acceptance Criteria:**

**Given** the env var `NEXT_PUBLIC_CALENDLY_INTRO_URL` is set
**When** a global "Book a call" CTA is rendered (home hero, secondary CTA, services overview, etc.)
**Then** clicking it opens the Calendly inline popup widget
**And** the Calendly script loads only on first click (lazy)
**And** if the env var is absent, the CTA falls back to navigating to `/[locale]/contact`

**Given** Calendly's popup widget is open
**When** I close it (Esc or X button)
**Then** focus returns to the originating CTA
**And** no DOM remnants leak into the page

### Story 4.2: Build the /contact page with inline Calendly + intake form

As a **prospect**,
I want **a dedicated contact page where I can either schedule directly or describe my project for a tailored response**,
So that **I have a choice based on my readiness level**.

**Acceptance Criteria:**

**Given** I navigate to `/[locale]/contact`
**When** the page renders
**Then** the top section embeds the Calendly inline iframe for the Intro 20min event (env-configurable)
**And** below it, the structured intake form is visible
**And** the agency email is shown as a fallback "or email us at mail@ptrniger.com" (env-configurable via `NEXT_PUBLIC_AGENCY_EMAIL`)

**Given** the page renders
**When** the SLA wording shows
**Then** "We respond within 4 business hours" / "Nous répondons sous 4h ouvrées" is visible

### Story 4.3: Build contact form UI with consent and honeypot

As a **prospect with a project to describe**,
I want **a clean form with name, company, email, project type, brief, and referral source**,
So that **I can convey enough context for a relevant first reply**.

**Acceptance Criteria:**

**Given** I am on `/[locale]/contact`
**When** the form renders
**Then** fields are: name (required), email (required, valid format), company (required), projectType (select: maintenance/audit/build/partnership, required, pre-tagged from `?intent=...` query param when present), message (textarea, required, ≥30 chars), referralSource (optional)
**And** a hidden honeypot field `hp_field` is present (CSS-hidden, with `tabindex="-1"`, `aria-hidden="true"`, `autocomplete="off"`)
**And** a consent checkbox "I agree to the privacy policy" links to `/[locale]/privacy` and is required
**And** the submit button is disabled until all required fields are valid

**Given** I submit the form
**When** the request is in flight
**Then** the submit button shows a loading state and is disabled
**And** double-submission is prevented client-side

### Story 4.4: Implement /api/contact route with Zod validation

As a **DevOps engineer**,
I want **the form's POST endpoint to validate strictly via Zod**,
So that **malformed or malicious payloads never reach the persistence layer**.

**Acceptance Criteria:**

**Given** `app/api/contact/route.ts` is created
**When** it receives a POST
**Then** it validates the body against a Zod schema (name 1–200 chars, email valid, company 1–200, projectType enum, message 30–5000, referralSource optional 0–200, honeypot must be empty, locale "en"|"fr")
**And** invalid payloads return 400 with a JSON error body (no stack traces leaked)

**Given** the honeypot field `hp_field` is non-empty in the payload
**When** the route processes it
**Then** the route returns 200 (silent success to the spam bot) but does NOT persist or notify

### Story 4.5: Persist submissions to JSONL on the VPS

As a **DevOps engineer**,
I want **valid submissions appended to a JSONL file on disk**,
So that **submissions are durable, greppable, and survive without any external dependency**.

**Acceptance Criteria:**

**Given** a valid submission passes Zod validation
**When** the route processes it
**Then** one JSON line is appended to the path defined by `CONTACT_LOG_PATH` env var (default `./data/contact-submissions.jsonl`)
**And** the line contains: `ts` (ISO 8601 UTC), `name`, `email`, `company`, `projectType`, `message`, `referralSource`, `locale`, `utm` (object with utm_source/medium/campaign/term/content from referer or query), `ip` (from `x-forwarded-for`, first hop), `ua` (User-Agent)
**And** the `data/` directory is created on first write if missing
**And** file permissions are 0640 (owned by the app user)

**Given** the disk write fails (permission denied, disk full)
**When** the route catches the error
**Then** it returns 500 with a generic error message
**And** logs the underlying error to stderr (visible in PM2 logs)

### Story 4.6: Add LRU rate limit (5/IP/h) to /api/contact

As a **DevOps engineer**,
I want **basic rate limiting on the contact endpoint**,
So that **the JSONL file doesn't fill with spam bursts**.

**Acceptance Criteria:**

**Given** `lib/ratelimit.ts` exposes a single in-memory LRU keyed by IP (parsed from `x-forwarded-for`, falling back to `x-real-ip`)
**When** the same IP submits >5 valid requests in a rolling 60-minute window
**Then** the 6th and subsequent requests return 429 with body `{ "error": "rate_limited" }`
**And** the cache evicts entries older than 1 hour

**Given** the process restarts
**When** the cache is empty
**Then** rate-limit counters reset (acceptable per AD-015)

### Story 4.7: Optional Telegram notification on submission

As a **agency owner monitoring submissions**,
I want **a Telegram push notification whenever a submission lands**,
So that **I see new leads on my phone without SSHing into the VPS**.

**Acceptance Criteria:**

**Given** env vars `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are both set
**When** a valid submission is persisted
**Then** `lib/telegram.ts` POSTs a structured summary to `https://api.telegram.org/bot{token}/sendMessage` (max 4096 chars, includes name/email/company/projectType/excerpt/locale)
**And** the API call is fire-and-forget (its failure does NOT cause the form response to fail)

**Given** either env var is absent
**When** a submission is persisted
**Then** Telegram notification is skipped silently
**And** no error is logged

### Story 4.8: Build the success / error UI states for the form

As a **prospect**,
I want **clear feedback after submitting the form**,
So that **I know whether my brief was received**.

**Acceptance Criteria:**

**Given** the form returns 200
**When** the success state renders
**Then** the form is replaced by a confirmation panel "We received your brief — we'll respond within 4 business hours" / "Nous avons bien reçu votre brief — réponse sous 4h ouvrées" (localized)
**And** UTM source and Calendly source-attribution remain available for follow-up

**Given** the form returns 400 (validation)
**When** the error state renders
**Then** field-level error messages display in the active locale
**And** the form remains editable

**Given** the form returns 429 (rate limit)
**When** the error state renders
**Then** a specific message "Too many submissions — please retry in an hour" / "Trop d'envois — réessayez dans une heure" displays

**Given** the form returns 500
**When** the error state renders
**Then** a generic message "Something went wrong — please email us at {agency_email}" / "Une erreur est survenue — écrivez-nous à {agency_email}" displays
**And** the agency email is the fallback `NEXT_PUBLIC_AGENCY_EMAIL`

### Story 4.9: Build CookieBanner with localStorage persistence

As a **prospect**,
I want **a minimal cookie banner on first visit that doesn't block the content**,
So that **GDPR baseline is acknowledged without dark-pattern theatre**.

**Acceptance Criteria:**

**Given** I visit any page for the first time (no `privacy-acked` localStorage key)
**When** the page hydrates
**Then** a fixed-position banner appears at the bottom with localized text "We use cookieless analytics; see our privacy policy" / "Nous utilisons des analytics sans cookie ; voir notre politique de confidentialité"
**And** the banner contains a link to `/[locale]/privacy` and a single dismiss button

**Given** I click dismiss
**When** the click handler runs
**Then** `localStorage.setItem('privacy-acked', '1')` executes
**And** the banner unmounts

**Given** I revisit the site with `privacy-acked=1` set
**When** any page loads
**Then** the banner does NOT render

**Given** the banner is rendered
**When** I press Tab
**Then** focus moves to the privacy link, then the dismiss button (keyboard-accessible)

### Story 4.10: Author the /privacy MDX page (EN + FR)

As a **prospect or compliance reviewer**,
I want **a clear privacy policy listing every third-party processor**,
So that **GDPR baseline is met and I know how my data is handled**.

**Acceptance Criteria:**

**Given** `content/legal/privacy.en.mdx` and `content/legal/privacy.fr.mdx`
**When** authored
**Then** each covers: data collected (name/email/company/message/IP/UA via the form; Calendly booking data; Umami analytics events), purposes (responding to inquiries, scheduling calls, anonymous usage stats), lawful basis (legitimate interest + consent), retention (form submissions stored 24 months, Umami 13 months), recipients (Calendly Inc., Umami self-hosted on PTR Niger VPS, hosting), data-subject rights (access/deletion/rectification), DPO contact email, last-updated date

**Given** the rendered page
**When** the top of the body shows
**Then** a clearly visible callout reads "Draft — pending legal review" / "Brouillon — revue juridique en attente" until the user removes it

**Given** any page on the site
**When** the footer renders
**Then** it links to `/[locale]/privacy`

---

## Epic 5: SEO, Analytics, Deployment & Cutover

The site is publicly live on `agency.ptrniger.com` with SEO infrastructure in place, Umami self-hosted analytics tracking conversions, and the legacy `portfolio.nigerdev.com` domain redirecting cleanly. Soft-launch checklist passes; the J+90 launch gate begins counting.

### Story 5.1: Set metadataBase and emit per-route OG cards

As a **prospect receiving the link in a DM**,
I want **the OG preview to unfurl correctly with image, title, and description**,
So that **the link is credible at a glance in LinkedIn, Slack, WhatsApp**.

**Acceptance Criteria:**

**Given** `app/[locale]/layout.tsx` and per-page `generateMetadata`
**When** they emit metadata
**Then** `metadataBase` is set to `new URL("https://agency.ptrniger.com")` (replacing the legacy `portfolio.nigerdev.com`)
**And** every route emits localized `<title>`, `<meta name="description">`, `og:title`, `og:description`, `og:locale`, `og:type=website`, `og:image` (≥1200×630), `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`

**Given** I share `https://agency.ptrniger.com/en/case-studies/nextjs-pilates-booking-platform-japan` in Slack
**When** the unfurl renders
**Then** the OG image, title, and description are specific to that case study (not the home page defaults)

### Story 5.2: Emit hreflang and canonical tags on every page

As a **search engine crawler**,
I want **hreflang and canonical tags on every page**,
So that **EN and FR variants are surfaced correctly without duplicate-content penalties**.

**Acceptance Criteria:**

**Given** any localized page
**When** it renders
**Then** `<link rel="canonical">` points to its own absolute URL
**And** `<link rel="alternate" hreflang="en">`, `hreflang="fr">`, and `hreflang="x-default">` (pointing to EN) are emitted via `lib/seo.ts`

### Story 5.3: Generate sitemap.xml and robots.txt

As a **search engine crawler**,
I want **a discoverable sitemap and a robots.txt**,
So that **every locale variant of every route is indexable**.

**Acceptance Criteria:**

**Given** `app/sitemap.ts`
**When** the route is requested
**Then** the response is a valid XML sitemap listing all locale × static route combinations and all case-study slugs (resolved from `lib/content.ts`)
**And** each `<url>` includes `<xhtml:link rel="alternate" hreflang>` annotations

**Given** `app/robots.ts`
**When** the route is requested
**Then** the response allows all crawlers (`User-agent: *` / `Allow: /`)
**And** points to `https://agency.ptrniger.com/sitemap.xml`

### Story 5.4: Emit Organization and WebPage JSON-LD schemas

As a **search engine**,
I want **structured data describing PTR Niger and each page**,
So that **rich results and entity recognition work in SERPs**.

**Acceptance Criteria:**

**Given** `lib/jsonld.ts` exposes builders for `Organization`, `WebPage`, and `CreativeWork` schemas
**When** any page renders
**Then** a server-rendered `<script type="application/ld+json">` element is injected via `components/json-ld.tsx`

**Given** `/[locale]` (home)
**When** rendered
**Then** an `Organization` schema is emitted with name "PTR Niger", url, sameAs (LinkedIn, GitHub if available), logo, areaServed, founder/foundingDate

**Given** any other route
**When** rendered
**Then** a `WebPage` schema is emitted with name, url, inLanguage matching the locale

**Given** a case-study page
**When** rendered
**Then** a `CreativeWork` (or `CaseStudy`) schema is emitted in addition to `WebPage`

### Story 5.5: Provision Umami self-hosted via Docker compose

As a **agency owner**,
I want **cookieless analytics self-hosted on the VPS**,
So that **I see conversion-relevant events without sending data to a SaaS**.

**Acceptance Criteria:**

**Given** `docs/docker-compose.umami.yml.example`
**When** I `docker compose up -d` it on the VPS
**Then** Umami is reachable at `127.0.0.1:3001` with a Postgres backend
**And** an Nginx location block proxies `/umami/` to it (per AD-007)

**Given** Umami is running
**When** I create a website entry for `agency.ptrniger.com`
**Then** I obtain a tracking script URL of the form `https://agency.ptrniger.com/umami/script.js?id=...`

**Given** the tracking script is added to `app/[locale]/layout.tsx` via `next/script` with `strategy="afterInteractive"` and the CSP nonce
**When** any page loads
**Then** Umami records the pageview without setting any cookie
**And** no third-party domain appears in the network panel

### Story 5.6: Capture UTM and Calendly source attribution

As a **agency owner measuring outbound conversion**,
I want **UTM params captured and Calendly source-attribution forwarded**,
So that **I can correlate sends to bookings**.

**Acceptance Criteria:**

**Given** a visitor arrives with `?utm_source=linkedin&utm_medium=dm&utm_campaign=italy-q2`
**When** any page loads
**Then** Umami records the UTM dimensions
**And** the contact form, on submission, includes the UTM object in the JSONL line and Telegram message

**Given** the Calendly Intro event configuration
**When** I configure it in the Calendly dashboard
**Then** a "How did you hear about us?" question is required
**And** the answer is included in Calendly notification emails

### Story 5.7: Enforce strict CSP via middleware nonce

As a **DevOps engineer**,
I want **a strict Content Security Policy with per-request nonces**,
So that **inline-script injection attacks have no foothold**.

**Acceptance Criteria:**

**Given** `middleware.ts`
**When** any request is processed
**Then** the response includes a `Content-Security-Policy` header with `default-src 'self'`, `script-src 'self' 'nonce-<value>' https://assets.calendly.com`, `style-src 'self' 'unsafe-inline'`, `img-src 'self' data: https:`, `frame-src https://calendly.com`, `connect-src 'self' https://calendly.com`, `font-src 'self' data:`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `frame-ancestors 'none'`
**And** the nonce is propagated to all `<Script>` tags via `next/script`'s `nonce` prop

**Given** I open DevTools and inspect the response headers
**When** I navigate to any page
**Then** the CSP header is present and no CSP violation is logged in the console

**Given** I attempt to inject a `<script>alert(1)</script>` via a query parameter that lands in the rendered HTML (theoretical test)
**When** the browser parses it
**Then** the script is blocked by the CSP (no nonce match)

### Story 5.8: Document and execute VPS deployment (PM2 + Nginx + Let's Encrypt)

As a **DevOps engineer**,
I want **a documented, repeatable deploy on my VPS**,
So that **future deploys are predictable and the architecture is captured for handover**.

**Acceptance Criteria:**

**Given** `docs/deploy.md`
**When** read by a new operator
**Then** it documents: prerequisites (Node 20, PM2, Nginx, Certbot, Docker for Umami), DNS setup (A/AAAA for `agency.ptrniger.com`), TLS provisioning via Certbot, PM2 ecosystem file (`docs/ecosystem.config.cjs.example`), Nginx config (`docs/nginx.conf.example`), Umami compose file, deploy sequence (`git pull && npm ci && npm run build && pm2 reload ecosystem.config.cjs --update-env`)

**Given** the VPS is provisioned per `docs/deploy.md`
**When** the deploy sequence runs
**Then** `https://agency.ptrniger.com` returns a valid TLS certificate
**And** `curl -sI https://agency.ptrniger.com` shows `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`

**Given** the Next.js standalone process
**When** it crashes
**Then** PM2 restarts it within ≤2 seconds
**And** the previous process's logs are preserved under `/var/log/agency/`

### Story 5.9: Implement 301 redirect map from legacy domain

As a **prospect arriving via an old link**,
I want **legacy `portfolio.nigerdev.com` URLs to 301-redirect cleanly**,
So that **link equity from LinkedIn DMs, email signatures, and GitHub READMEs transfers to the new domain**.

**Acceptance Criteria:**

**Given** `scripts/generate-redirect-map.ts`
**When** I run it
**Then** it produces an Nginx-format redirect map covering: `/` → `/en`, `/?lang=fr` → `/fr`, `/#profile` → `/en/about`, `/#skills` → `/en/about` (skills are part of about narrative), `/#projects` → `/en/work`, `/#companies` → `/en/about`
**And** the map is committed to `docs/legacy-redirect-map.conf`

**Given** the legacy host's Nginx loads the redirect map
**When** any inventoried legacy URL is requested
**Then** it 301-redirects to the new equivalent on `agency.ptrniger.com`
**And** query strings are preserved

**Given** a previously-curl-tested sample of ≥10 legacy URLs
**When** they are tested post-deploy
**Then** all return `HTTP/1.1 301 Moved Permanently` with the correct `Location` header

**Given** LD-10 (inbound link inventory)
**When** the cutover playbook runs
**Then** ≥80% of identified inbound surfaces (LinkedIn DMs, email signatures, GitHub bios, business cards) point to `agency.ptrniger.com`

### Story 5.10: Add Playwright e2e tests for critical flows

As a **DevOps engineer**,
I want **e2e coverage of the locale switch, form submit, and Calendly CTA flows**,
So that **regressions in the conversion path are caught before deploy**.

**Acceptance Criteria:**

**Given** `playwright.config.ts` is committed with default configuration
**When** `npx playwright test` runs against a local production build
**Then** three specs pass: `e2e/locale-switch.spec.ts` (visit `/en`, click switcher, assert URL is `/fr` and copy is FR), `e2e/contact-form.spec.ts` (fill form, submit, assert success panel; submit again rapidly to assert rate-limit message after threshold), `e2e/calendly-cta.spec.ts` (click "Book a call", assert popup widget mounted with the Calendly script loaded)

**Given** `.github/workflows/ci.yml`
**When** a PR is opened against `master`
**Then** the workflow runs lint + typecheck + Playwright e2e + bundle-size + contrast + skill-mastery checks
**And** any failure blocks merge

### Story 5.11: Run the soft-launch checklist and start the J+90 gate

As a **product owner**,
I want **a captured pre-launch checklist verified before opening to outbound**,
So that **first impressions are not contaminated by avoidable bugs**.

**Acceptance Criteria:**

**Given** the launch checklist `docs/launch-checklist.md` exists
**When** Phase 1 (Stealth) begins
**Then** every item is checked: uptime green, Lighthouse Perf/A11y/SEO ≥90 on `/`, `/work`, all 4 case studies, `/services`; OG cards verified on LinkedIn + Slack + WhatsApp in EN and FR; Calendly bookings tested in both locales; 0 broken case-study links; 301 redirects from legacy domain verified on ≥10 sample URLs; cookie banner shows once and persists; CSP shows zero violations in console; Telegram notification verified end-to-end; LD-3 mastery checklist signed off; LD-6 agency inbox + responder named; LD-7 ≥3 named testimonials live; LD-8 client logos with permissions live

**Given** Phase 1 passes
**When** Phase 2 (Soft launch) begins
**Then** UTM-tagged outbound to a single channel of 20 prospects starts
**And** baseline conversion data is captured per the 90-day dashboard cadence (PRD §4.5)

**Given** Phase 3 (Scale)
**When** day 90 from Phase 2 start arrives
**Then** the launch gate evaluates: ≥2 paid international contracts → continue & start Phase 2 scope (blog, additional case studies, Clutch profile); <2 → structured retro per PRD §4.4

---

## Epic & Story Summary

| Epic | Stories | FRs covered |
|---|---|---|
| Epic 1 — Bilingual Foundation & Brand Identity | 11 | FR1–FR8, FR51–FR64, FR76–FR78 |
| Epic 2 — Agency Narrative Pages | 9 | FR9–FR15, FR29–FR39 |
| Epic 3 — Project Portfolio & Case Studies | 9 | FR16–FR28 |
| Epic 4 — Conversion Pipeline | 10 | FR40–FR50 |
| Epic 5 — SEO, Analytics, Deployment & Cutover | 11 | FR65–FR75 |
| **Total** | **50 stories** | **78/78 FRs** |

All UX-DRs (1–17) covered: UX-DR1/2 → S1.5; UX-DR3 → S2.1; UX-DR4 → S2.2; UX-DR5 → S2.3; UX-DR6 → S2.4; UX-DR7 → S3.1/3.2; UX-DR8 → S3.3/3.4; UX-DR9 → S2.5; UX-DR10 → S2.6; UX-DR11 → S4.3/4.8; UX-DR12 → S1.10; UX-DR13 → S4.9; UX-DR14 → S1.8; UX-DR15 → S1.6; UX-DR16 → applied per page across E2/E3; UX-DR17 → S1.11.

NFRs verified at epic boundaries: NFR1–NFR6 (perf) → measured at S5.11 launch checklist; NFR7–NFR11 (a11y) → S1.5/S1.6/S1.10 + S5.11; NFR12–NFR13 (SEO) → S5.1–S5.4; NFR14–NFR15 (browsers/responsive) → S5.11; NFR16–NFR18 (hosting) → S5.8; NFR19–NFR21 (privacy) → S4.10/S4.5; NFR22–NFR24 (security) → S5.7/S4.6/S4.4; NFR25–NFR26 (observability) → S5.8.
