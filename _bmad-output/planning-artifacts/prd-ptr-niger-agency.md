---
title: "PRD: PTR Niger Agency Website (agency.ptrniger.com)"
status: "draft"
version: "1.0"
created: "2026-05-01"
updated: "2026-05-01"
author: "John (Product Manager)"
owner: "Mounkaila"
inputs:
  - _bmad-output/planning-artifacts/product-brief-ptr-niger-agency.md
  - app/page.tsx
  - app/layout.tsx
  - lib/translations.ts
  - public/image/ptrniger.png
  - public/image/equipe.png
workflowType: "prd"
---

# Product Requirements Document — PTR Niger Agency Website

**Author:** John (PM)
**Owner:** Mounkaila
**Date:** 2026-05-01
**Source brief:** `_bmad-output/planning-artifacts/product-brief-ptr-niger-agency.md` (Mary, Business Analyst)

---

## 1. Executive Summary

PTR Niger — *Pro Technologie & Révolution* — is a Niger-based digital agency (founded 2017, 10+ team, 9-year delivery track record) with shipped production work in Niger, Italy, Japan, and China–Niger corridors. Today its only public-facing surface for international prospects is `portfolio.nigerdev.com`, a French-default single-page tabbed portfolio framed around an individual developer rather than the agency. Outbound prospects sourced via LinkedIn/email/referral land on a page that does not convert in the first 30 seconds.

This PRD specifies **v1 of `agency.ptrniger.com`** — a multi-page, **bilingual EN+FR co-equal** Next.js 15 site that re-platforms the existing codebase as an agency-grade conversion asset for international outbound. The site inverts the current narrative from *"individual portfolio that happens to be Niger-based"* to **"PTR Niger — international web agency, headquartered in Niger, with shipped work across Africa, Europe, and Asia."**

The product's single job is **conversion of warm outbound prospects** to a booked discovery call within 30 seconds of landing. Everything in this PRD optimizes for that goal; pure traffic, time-on-site, and SEO ranking are explicit anti-KPIs for v1.

**Launch model:** 3-phase rollout (Stealth → Soft launch → Scale), gated at J+90 by ≥2 paid international contracts closed.

---

## 2. Problem & Opportunity

### 2.1 Problem statement

PTR Niger has the shipped credentials of a serious mid-market agency but no online surface that demonstrates this to non-local prospects. Outbound prospecting effort burns at the conversion step.

Concrete failures of the current `portfolio.nigerdev.com` site:

- `lang="fr"` hardcoded; no hreflang; no per-locale metadata; runtime React-state language toggle that doesn't persist in URLs → English-browser prospects get a French page.
- Hero surfaces a developer's name, not the agency's value proposition.
- Primary CTA is a Niger WhatsApp number on `+227…` — high-friction for EU/US buyers expecting a discovery-call link.
- 7 fragmented client subdomains, no aggregated case-study layer, no metrics, no outcomes.
- Stock Unsplash images stand in for client logos; "98+ projects" stat is unverifiable; only 12 projects rendered.
- `metadataBase` points to wrong domain; SEO description leaks "Niger / Niamey" as primary identity.

### 2.2 Cost of the status quo

- Industry baseline: African agencies report ~2 conversions per 60+ EMEA outbound attempts; location is the rejection driver in ~50% of cases (Techpoint Africa, 2025).
- Margin forfeited to platform middlemen (Toptal, Upwork) when direct-client pricing is achievable with a stronger owned site.

### 2.3 Opportunity

A dedicated international agency site that positions PTR Niger as a peer of mid-market EU agencies — with native EN+FR delivery, EU-overlapping working hours (GMT/UTC+1), 9-year track record, and AI-augmented workflow — captures direct international clients at agency margins.

---

## 3. Goals & Non-Goals

### 3.1 Goals (v1)

1. Convert warm outbound prospects to booked discovery calls in <30 seconds time-on-page.
2. Position PTR Niger as an **international agency**, not a Niger-local shop.
3. Establish EN+FR as **co-equal first-class languages** with proper i18n routing.
4. Provide a credible, structured, metric-backed case-study layer that prospects can forward internally.
5. Replace personal contact (Mounkaila phone, WhatsApp) with **agency-level contact infrastructure** (shared inbox + Calendly + form).
6. Migrate domain and brand identity (PTR Red + PTR Teal on carbon dark) without losing inbound link equity from the legacy domain.

### 3.2 Non-goals (v1)

- Pure traffic acquisition (irrelevant for outbound-first model in v1).
- Maximizing time-on-site (we want fast conversion).
- Competitive SEO ranking (Year 2 objective).
- Job-seeker funnel (no Careers page).
- Niger formations / training students (served by `ptrniger.com`).
- Freelance marketplace presence (we want direct clients).

---

## 4. Success Criteria & KPIs

### 4.1 Primary KPI

**Outbound link conversion rate** — % of prospects who, after receiving the site link via DM/email, respond positively (book a call, request a quote, engage substantively) within 7 days.

- **Baseline:** Instrumented on the current site over ≥20 outbound sends in the 2 weeks pre-launch (UTM tag + spreadsheet capturing sent / replied / booked).
- **Target:** ≥**2× baseline** positive-reply rate, sustained over a rolling 30-send window for **3 consecutive months**.

### 4.2 Secondary KPIs

| KPI | Target (M3 post-launch) | Measurement |
|---|---|---|
| Discovery calls booked via Calendly | ≥4/month | Calendly export |
| Real named testimonials collected | 10 in 6 months (≈1.7/month) | Spreadsheet |
| Pipeline geographic diversification | ≥40% non-Niger origin | UTM + intake form |
| Bounce-back qualitative feedback | ≥1 "why didn't this convert" / month | Manual outreach |

### 4.3 Anti-KPIs (deliberately not optimized)

- Total page views.
- Average session duration.
- Organic search ranking on competitive keywords.

### 4.4 Launch gate (J+90)

- **Pass:** ≥2 paid international contracts closed → double outbound volume, start Phase 2 scope (blog, additional case studies, Clutch/GoodFirms profile).
- **Fail:** <2 paid international contracts → structured launch retro, hypothesis-revision, then re-test before scaling.

### 4.5 Operational dashboard cadence

| Window | What we measure |
|---|---|
| Week 1 | Uptime, Lighthouse perf/SEO/a11y ≥90, Calendly booking flow tested EN+FR, OG card preview verified (LinkedIn/Slack/WhatsApp), 0 broken `/case-studies/[slug]` links, 301 redirect map confirmed. |
| Weeks 2–4 (soft launch) | Outbound sent count by channel, link CTR DM→site, `/contact` + `/services` scroll depth, Calendly bookings (raw + qualified), first-response time on form submissions, decline reasons. |
| Month 1 | Outbound conversion rate vs baseline, geographic mix of replies, # testimonials collected vs trajectory, top 3 friction points. |
| Months 2–3 | Discovery → proposal rate, proposal → contract rate, days-to-close, % pipeline non-Niger, **first paid contract from new site (binary J+90 gate)**. |

---

## 5. Personas & Audience

### 5.1 Primary persona — "Outbound-warmed international buyer"

- **Who:** EU / UK / US / Italian / Japanese SME founder, head of product, or boutique-agency owner seeking a fullstack web partner.
- **Context:** Already received a DM, email, or referral from Mounkaila or another PTR commercial lead. They know the link is coming. They have **30 seconds** to decide whether to book a call or close the tab.
- **Above-the-fold must answer in order:**
  1. *What does PTR Niger do?*
  2. *For whom — and have they shipped work like mine?*
  3. *Why should I trust them?*
  4. *How do I book a call right now?*

### 5.2 Secondary persona (Year 2+) — "Inbound discovery"

- Organic search ("Laravel agency Africa", "Next.js fullstack remote team", "outsourced web dev EU timezone").
- Referrals from existing international clients.
- Addressed via SEO basics (case-study slugs, metadata, JSON-LD) in v1; deeper investment post-launch.

### 5.3 Explicit non-audience

- Job seekers.
- Niger-local formations students.
- Freelance-marketplace recruiters.

---

## 6. User Journeys

### 6.1 J1 — Cold-DM → booked call (primary path)

1. Prospect receives a LinkedIn DM or cold email with UTM-tagged link to `agency.ptrniger.com`.
2. Lands on `/` (locale auto-resolved by Accept-Language; EN if ambiguous; URL becomes `/en` or `/fr`).
3. Above-the-fold: H1 value pitch + trust strip (years/team/clients) + primary Teal CTA *"Book a 20-min discovery call"*.
4. Optional scroll: 3–5 featured case studies, services overview, secondary CTA.
5. Click CTA → `/contact` → Calendly embed → confirms.
6. Confirmation page exposes the agency email and a "Reply with a brief" link as fallback.

**Success:** Calendly booking captured with UTM source attributed.

### 6.2 J2 — Forwarded link → internal stakeholder review

1. Prospect's colleague receives the URL pasted into Slack/email.
2. OG preview unfurls correctly (image, title, description, locale-appropriate).
3. Lands on `/case-studies/[slug]` referenced in the conversation — credibility-first surface.
4. Optional navigation to `/work`, `/services`, `/about`.
5. CTA path identical to J1.

**Success:** OG preview unfurls cleanly; case-study page is self-contained (no required prior context).

### 6.3 J3 — Boutique agency overflow channel

1. Boutique EU agency owner clicks DM link, lands on `/services`.
2. Scrolls to "Partner with us — overflow capacity for boutique agencies" paragraph.
3. CTA opens Calendly with a different event type (Partnership 30min) OR contact form pre-tagged "partnership".

**Success:** Partnership intent captured distinctly from end-client intent.

### 6.4 J4 — Returning prospect (qualification check)

1. Prospect revisits site post-call to share with team or re-read case study.
2. Direct navigation to `/work` or specific case study.
3. Pricing bands on `/services` provide self-qualifying anchor.

**Success:** Prospect can self-serve the answers needed to bring the deal internal.

---

## 7. Information Architecture & Routes

| Route | Purpose | Notes |
|---|---|---|
| `/[locale]` | Hero + trust strip + 3–5 featured case studies + services overview + primary CTA | Locale = `en` \| `fr` |
| `/[locale]/work` | Full project gallery, filterable by sector, region, type | 12+ projects |
| `/[locale]/case-studies/[slug]` | Deep case studies (4 in v1) | SEO long-tail slugs |
| `/[locale]/services` | Maintenance / Audit / Build packages + pricing bands + Partner-with-us paragraph + EU data-residency statement | No TJM disclosed |
| `/[locale]/about` | PTR Niger story, team photo, sectors, AI-augmented workflow (commercial framing only — no public AI page) | 1 generic team photo |
| `/[locale]/contact` | Calendly embed (Intro 20min / Project 30min) + structured intake form + agency email | |
| `/[locale]/privacy` | Privacy policy (GDPR-aligned, covers Calendly, Plausible, OG) | |
| `/sitemap.xml`, `/robots.txt` | SEO infrastructure | Auto-generated |
| `/[locale]/404`, `/[locale]/500` | Error pages, locale-aware | |

**Locale routing:** URL-prefixed (`/en/...`, `/fr/...`). First-visit Accept-Language detection sets locale and 302-redirects to the prefixed URL. Subsequent visits respect last-chosen locale via cookie. `x-default` hreflang → EN.

---

## 8. Functional Requirements

Each FR is uniquely numbered for traceability into epics/stories.

### 8.1 Internationalization

- **FR-001** — The site SHALL serve content under `/en/...` and `/fr/...` URL prefixes.
- **FR-002** — On first visit (no locale cookie), the system SHALL detect locale from the `Accept-Language` header and 302-redirect to the matching prefix; default to `/en` when no match.
- **FR-003** — The system SHALL persist the user's chosen locale in a `NEXT_LOCALE` cookie (1-year expiry) and respect it on subsequent visits.
- **FR-004** — Every page SHALL set `<html lang="...">` to the active locale.
- **FR-005** — Every page SHALL emit `<link rel="alternate" hreflang="en|fr|x-default">` tags pointing to its localized variants; `x-default` → EN.
- **FR-006** — Every page SHALL emit per-locale metadata (`title`, `description`, `og:title`, `og:description`, `og:locale`, `twitter:*`).
- **FR-007** — A locale switcher SHALL be present in the global header on every page; switching SHALL navigate to the equivalent route in the other locale (no content loss).
- **FR-008** — All UI strings, route slugs, case-study content, and metadata SHALL be localized in both EN and FR (no fallback to FR text on EN pages or vice versa).

### 8.2 Home (`/[locale]`)

- **FR-010** — Above-the-fold SHALL display: H1 value pitch, trust strip (years + team + clients shipped), primary Teal CTA *"Book a 20-min discovery call"* linking to `/[locale]/contact`.
- **FR-011** — H1 SHALL NOT contain individual employee names. "Niger" appears at most once above-the-fold and only in the trust-strip context.
- **FR-012** — A timezone badge SHALL display *"Working hours 10am–7pm WAT (= 11am–8pm CET) — overlap with EU & US morning"* (localized).
- **FR-013** — A featured-case-studies section SHALL surface 3–5 of the v1 case studies with cover, title, sector tag, and link.
- **FR-014** — A services overview section SHALL summarize the 3 packages (Maintenance / Audit / Build) and link to `/[locale]/services`.
- **FR-015** — Trust strip SHALL display real client logos (no Unsplash).
- **FR-016** — A secondary CTA SHALL appear at end-of-page driving to `/[locale]/contact`.

### 8.3 Work (`/[locale]/work`)

- **FR-020** — Project gallery SHALL render all PTR-validated projects (Hydrolink, AYKI, PTR Niger E-Learning, PTR School, EMMA-Lab, L'Astuce, GuidaCenter, CSF, Softis Pilates, iCall CRM, Gestion Boutique, Shop POS — Italian projects added once R3 resolved).
- **FR-021** — Each project card SHALL display cover, title, sector, region tag, year.
- **FR-022** — Gallery SHALL support filtering by sector, region, and type (multi-select).
- **FR-023** — Gallery SHALL support free-text search across project titles and tags.
- **FR-024** — Cards linked to a deep case study SHALL navigate to `/[locale]/case-studies/[slug]`; cards without a case study SHALL open a lightweight modal with a 1-paragraph summary.
- **FR-025** — Filters and search SHALL update URL query params (shareable / back-button safe).

### 8.4 Case studies (`/[locale]/case-studies/[slug]`)

- **FR-030** — v1 SHALL ship **4 deep case studies**: Softis Pilates 🇯🇵, PTR School 🇳🇪, GuidaCenter 🇳🇪, Commande Sans Frontière 🇨🇳🇳🇪.
- **FR-031** — Each case study SHALL follow the structure: **Situation → Challenge → Solution → Stack → Result with concrete metrics**.
- **FR-032** — Slugs SHALL be SEO long-tail formatted in EN and FR (e.g., `/en/case-studies/nextjs-pilates-booking-platform-japan`, `/fr/case-studies/plateforme-reservation-pilates-nextjs-japon`).
- **FR-033** — Each case study SHALL emit JSON-LD `CreativeWork` (or `CaseStudy`) schema.
- **FR-034** — Each case study SHALL be cross-linked from `/[locale]/work` and from at least one `/[locale]/services` package surface.
- **FR-035** — If a metric is NDA-blocked, the case study SHALL display a non-gated metric (users served, uptime, languages supported) — never fabricated numbers.
- **FR-036** — Each case study SHALL render OG and Twitter cards specific to that case (image + title + description per locale).

### 8.5 Services (`/[locale]/services`)

- **FR-040** — Page SHALL display three packages: **Maintenance**, **Audit**, **Build**.
- **FR-041** — Each package SHALL display: short value pitch, engagement format, day-range estimate, **Investment range in EUR** (Maintenance: from €1.5k/month · Audit: from €3–6k · Build: from €12k).
- **FR-042** — TJM SHALL NOT be disclosed publicly anywhere on the site.
- **FR-043** — A *"Partner with us — overflow capacity for boutique agencies"* paragraph SHALL appear with a distinct CTA opening the Partnership Calendly event (or pre-tagged contact form).
- **FR-044** — An **EU data-residency statement** SHALL appear on `/services` and `/about`: *"Deployments to Vercel / AWS Frankfurt or Paris regions per client preference; data residency client-controlled."*
- **FR-045** — Each package SHALL link to ≥1 representative case study.

### 8.6 About (`/[locale]/about`)

- **FR-050** — Page SHALL narrate PTR Niger's story (founded 2017, 9+ years, 10+ team, sectors served).
- **FR-051** — Page SHALL display **one generic team photo** (initial v1 placeholder: `public/image/equipe.png`; replacement post-launch).
- **FR-052** — Page SHALL NOT name individual employees; "typical engagement composition" disclosure is allowed (e.g., *"1 tech lead + 2 devs + 1 designer + 1 QA, named at SOW signing"*).
- **FR-053** — Page SHALL include the EU data-residency statement (FR-044).
- **FR-054** — Page SHALL surface the bilingual EN+FR delivery capability as an explicit differentiator.

### 8.7 Contact (`/[locale]/contact`)

- **FR-060** — Page SHALL embed Calendly with two event types: **Intro 20min** and **Project 30min** (a **Partnership 30min** event is exposed only via the `/services` partner CTA).
- **FR-061** — Page SHALL include a structured intake form: name, company, email, project type (Maintenance / Audit / Build / Partnership), short brief (textarea), referral source (optional). Form posts to a server route that emails the agency inbox.
- **FR-062** — Page SHALL display the agency email address as a fallback.
- **FR-063** — Form submissions SHALL be acknowledged on screen; the agency commits to a **4-business-hour first-response SLA** (text on the page).
- **FR-064** — Calendly events SHALL ask the source-attribution question (UTM / "how did you hear about us").
- **FR-065** — Form SHALL include a clear consent checkbox for data processing, linking to `/[locale]/privacy`.
- **FR-066** — Form SHALL implement basic anti-spam (honeypot field + rate limit). No CAPTCHA in v1.

### 8.8 Privacy & compliance

- **FR-070** — A `/privacy` page SHALL be available in EN and FR, covering Calendly, Plausible, OG cards, and contact-form data processing.
- **FR-071** — A minimal cookie banner SHALL appear on first visit covering non-essential tracking; Plausible (cookieless) means the banner is light-touch but legally present for Calendly/iframe context.
- **FR-072** — Footer SHALL link to `/privacy` on every page.

### 8.9 Brand & design tokens

- **FR-080** — Color palette SHALL be migrated from lime/orange to PTR Red `#E8273E` + PTR Teal `#1FB8CC` + carbon `#0A0E0C` + surface `#121815` + off-white `#F5F7F4` + muted `#9BA8A2` (final hex pixel-sampled from logo at architecture stage; AA contrast validated).
- **FR-081** — Red and Teal SHALL never be directly adjacent in UI surfaces; they are always separated by carbon or off-white.
- **FR-082** — There SHALL be no Red→Teal gradient anywhere.
- **FR-083** — Any color-coded distinction (status, success/error, badges) SHALL be reinforced by an icon or text label (deuteranopia accessibility).
- **FR-084** — Red SHALL be reserved as a "spark" color (≤15% surface coverage); Teal carries day-to-day identity and primary CTAs.
- **FR-085** — Primary "Book a call" CTA SHALL use Teal across all surfaces.
- **FR-086** — Logo SHALL be served from `public/image/ptrniger.png` (SVG version requested at architecture stage for retina/dark-mode adaptability).
- **FR-087** — Typography SHALL preserve Geist Sans + Geist Mono.

### 8.10 Motion & animation

- **FR-090** — Existing motion assets SHALL be migrated and re-tinted to brand: `AuroraBackground`, `MagneticButton`, `ScrollProgress`, marquee, WordReveal.
- **FR-091** — All non-essential motion SHALL be gated by `prefers-reduced-motion: reduce`.
- **FR-092** — No motion SHALL block content interactivity (no >300ms blocking entry animations on primary CTA).

### 8.11 Imagery

- **FR-100** — All raw `<img>` usages for project covers, client logos, profile, and team photo SHALL be migrated to `next/image`.
- **FR-101** — All Unsplash placeholders SHALL be removed; only real client logos with explicit written permission SHALL be displayed.
- **FR-102** — All images SHALL include localized `alt` text.

### 8.12 SEO & metadata

- **FR-110** — `metadataBase` SHALL be set to `https://agency.ptrniger.com`.
- **FR-111** — Every page SHALL emit `og:image` (≥1200×630), `og:title`, `og:description`, `og:locale`, `twitter:card=summary_large_image`.
- **FR-112** — `sitemap.xml` SHALL list both EN and FR variants of all routes with `<xhtml:link rel="alternate" hreflang>` annotations.
- **FR-113** — `robots.txt` SHALL allow all crawlers and link to `sitemap.xml`.
- **FR-114** — Site SHALL emit `Organization` JSON-LD on `/` and `WebPage` JSON-LD on all routes.

### 8.13 Domain migration & redirects

- **FR-120** — A 301-redirect map SHALL be deployed from legacy `portfolio.nigerdev.com` routes to `agency.ptrniger.com` equivalents (route-by-route map produced at architecture stage).
- **FR-121** — Legacy domain `portfolio.nigerdev.com` SHALL remain hosted as a redirect-only origin for **≥12 months post-launch**.
- **FR-122** — Inventory of inbound links (LinkedIn DMs, email signatures, GitHub READMEs) SHALL be produced and updated as a coordinated cutover step (owner: Mounkaila).

### 8.14 Analytics

- **FR-130** — Site SHALL integrate **Plausible** (cookieless, GDPR-friendly).
- **FR-131** — UTM parameters SHALL be captured by Plausible and (when present on a contact-form submission) forwarded to the agency inbox notification.
- **FR-132** — No Google Analytics, no Facebook Pixel, no advertising trackers in v1.

### 8.15 Skill content curation

- **FR-140** — Skill section SHALL display only items confirmed on the **mastery checklist** (Mounkaila-owned; "we can demo it in a 30-min call" inclusion bar — see Launch Dependency LD-3).
- **FR-141** — Skill section SHALL exclude jQuery, MERISE, and any unverifiable items present on the legacy site.
- **FR-142** — Validated stack themes for inclusion (subject to LD-3 confirmation): TypeScript advanced, PHPUnit, Jest/Vitest/Playwright, Vercel/AWS/DigitalOcean, Stripe, REST/GraphQL, Redis, AI APIs.

---

## 9. Non-Functional Requirements

### 9.1 Performance

- **NFR-001** — Lighthouse Performance score ≥ **90** on `/`, `/work`, all 4 case studies, `/services` (mobile, throttled).
- **NFR-002** — LCP ≤ **2.5s** on 4G mobile for `/[locale]` and case-study routes.
- **NFR-003** — CLS ≤ **0.1** on all routes.
- **NFR-004** — INP ≤ **200ms** on all interactive surfaces.
- **NFR-005** — All 30+ tech-stack icons currently loaded from `cdn.jsdelivr.net` SHALL be self-hosted under `/public/icons/` (LCP optimization + CSP cleanliness).

### 9.2 Accessibility

- **NFR-010** — Lighthouse Accessibility score ≥ **90** on all routes.
- **NFR-011** — All color combinations SHALL meet WCAG 2.1 **AA** contrast (4.5:1 text, 3:1 large text/UI components).
- **NFR-012** — Full keyboard navigability on all interactive components (locale switcher, filters, modal, form, Calendly trigger).
- **NFR-013** — All interactive components SHALL expose appropriate ARIA labels.
- **NFR-014** — `prefers-reduced-motion` SHALL disable Aurora background and Magnetic button effects.

### 9.3 SEO

- **NFR-020** — Lighthouse SEO score ≥ **90** on all routes.
- **NFR-021** — Each page renders meaningful content server-side (no critical content client-rendered behind hydration).

### 9.4 Browser & device support

- **NFR-030** — Site SHALL function correctly on the latest 2 versions of Chrome, Safari, Firefox, Edge (desktop + mobile).
- **NFR-031** — Mobile-first responsive: 360px → 1920px viewports.

### 9.5 Hosting & deployment

- **NFR-040** — Hosting on Vercel (default) or AWS Frankfurt/Paris (per client-residency preference once relevant).
- **NFR-041** — DNS for `agency.ptrniger.com` SHALL be configured with proper TLS, HSTS, and a www→apex policy.
- **NFR-042** — Deployments SHALL be CI-driven from `main` (preview branches for review).

### 9.6 Privacy & data

- **NFR-050** — No PII collected outside contact form and Calendly.
- **NFR-051** — Contact form data SHALL be transmitted over TLS to the agency inbox; no third-party storage in v1.
- **NFR-052** — Privacy policy SHALL list every third-party data processor (Calendly, Plausible, hosting) with purpose and lawful basis (legitimate interest / consent).

### 9.7 Security

- **NFR-060** — Standard CSP header limiting script sources to self + Calendly + Plausible.
- **NFR-061** — Form endpoint SHALL implement honeypot and IP-based rate limiting (≤5 submissions / IP / hour).
- **NFR-062** — No secrets in client bundles; all server-side env vars only.

### 9.8 Observability

- **NFR-070** — Vercel uptime monitoring SHALL be enabled; alert on uptime <99.5% to Mounkaila.
- **NFR-071** — Form submission errors SHALL be logged server-side with Sentry-compatible structure (Sentry integration optional in v1).

---

## 10. Scope

### 10.1 In scope (v1)

- Multi-page App Router architecture (`/`, `/work`, `/case-studies/[slug]`, `/services`, `/about`, `/contact`, `/privacy`).
- Bilingual EN+FR co-equal with `next-intl`, URL prefixes, Accept-Language detection, hreflang, per-locale metadata.
- 4 deep case studies (Softis Pilates, PTR School, GuidaCenter, CSF) — SEO long-tail slugs, JSON-LD.
- Project gallery (12+ projects, filterable).
- Services page with 3 packages + Investment ranges + Partner-with-us paragraph + EU data-residency statement.
- About page with 1 generic team photo + agency story.
- Contact page with Calendly embed + structured form + agency email.
- Privacy policy + cookie banner.
- Brand palette migration (PTR Red + PTR Teal on carbon dark).
- Real client logos (replacing all Unsplash).
- Motion-asset migration with `prefers-reduced-motion` guard.
- Removal of all personal contact details (Mounkaila phone, WhatsApp +227).
- Skill curation per mastery checklist.
- `<img>` → `next/image` migration.
- SEO basics (`metadataBase`, sitemap, robots, JSON-LD, OG, Twitter).
- 301 redirect map from `portfolio.nigerdev.com`.
- Plausible analytics.

### 10.2 Out of scope (Phase 2+)

- Standalone blog (case studies absorb SEO long-tail in v1).
- Languages beyond EN+FR.
- Customer login / portal.
- Live chat.
- Advanced analytics dashboards beyond Plausible.
- Headless CMS (content lives in code/MDX in v1; reassess if testimonial cadence > 2/month).
- E-commerce on services.
- A/B testing infrastructure.
- "Careers" page.
- Replacement professional team photo (post-launch polish).
- Public `/how-we-work` page exposing AI-augmented workflow (kept as commercial weapon in calls — per R14 decision).

### 10.3 Deferred to architecture stage

- Final pixel-sampled hex codes and AA contrast validation.
- Full 301 redirect mapping (route-by-route).
- Self-hosted icon set inventory.
- Sentry vs alternative error tracking decision.

---

## 11. Launch Dependencies (User-Owned)

These are launch-blocking unless explicitly downgraded. Each must have an owner and a date before PRD sign-off → Architecture handoff.

| ID | Dependency | Status | Owner | Due |
|---|---|---|---|---|
| LD-1 | SVG version of `ptrniger.png` logo | TBD | Mounkaila | TBD |
| LD-2 | Calendly account provisioned (handle + Intro 20min + Project 30min + Partnership 30min) | TBD | Mounkaila | TBD |
| LD-3 | Skill mastery checklist ("can demo in 30 min" bar) | TBD | Mounkaila | TBD |
| LD-4 | Italian projects publishability check (NDA review) | TBD | Mounkaila | TBD |
| LD-5 | Pre-launch baseline: ≥20 instrumented outbound sends with current site | TBD | Mounkaila | Pre-launch |
| LD-6 | Agency contact infrastructure: shared inbox + 4-h SLA + primary/backup responder named | TBD | Mounkaila | Pre-launch |
| LD-7 | ≥3 named testimonials at launch + permission for 7 in pipeline | TBD | Mounkaila | Pre-launch |
| LD-8 | Real client logos with written usage permission per client | TBD | Mounkaila | Pre-launch |
| LD-9 | 1 paragraph + outcome metric per case study (interview-extracted) | TBD | Mounkaila | Pre-launch |
| LD-10 | Inbound link inventory (LinkedIn DMs, signatures, READMEs) for cutover | TBD | Mounkaila | Launch week |
| LD-11 | Operational ops bundle (EN MSA/SOW/NDA, Wise Business + Stripe, async stack) | TBD | Mounkaila | Parallel — not site scope |

**PRD sign-off rule:** LD-3, LD-4, LD-6, LD-7 (≥3 named) must be resolved before architecture stage starts. Others can run in parallel.

---

## 12. Companion Artifacts (parallel workstreams)

These are NOT site features but accompany launch. Owner: Mounkaila + commercial leads.

1. **Pricing Conversation Playbook** (private Notion or printed card) — range bands per package, qualifying questions before quoting, prepared phrasings for *"what does this cost?"* / *"are you the cheapest?"* / *"what's your TJM?"*. **Includes the AI-augmented workflow narrative for in-call use (per R14).**
2. **Outbound Plan v1** — target lists (50 Italian agencies, 50 JP wellness SMEs, 50 EU recruitment-tech founders), channel split, weekly send target, named owner, response template per segment.
3. **Outbound copy templates** (LinkedIn DM + cold email) — co-written so DM hook → site hero → Calendly is one continuous narrative.
4. **Operational ops bundle** — EN MSA/SOW/NDA templates, Wise Business + Stripe Connect, async stack (Linear/Notion/Slack/Loom), client-onboarding doc.
5. **Referral mechanism** — request 3 warm intros per existing international client.
6. **Third-party reviews** — 5–10 verified reviews on Clutch and/or GoodFirms within 90 days; linked from `/about`.

---

## 13. Launch Sequencing (3-phase rollout)

### Phase 1 — Stealth (Week 7)
- 10 friendly contacts (existing clients, dev peers, advisors) review the EN site.
- Written feedback on hero clarity, case-study credibility, CTA flow.
- Bugs caught and fixed BEFORE any cold prospect sees it.
- Goal: catch first-impression killers (FR-only OG card, broken Calendly, missing alt text) without contaminating conversion data.

### Phase 2 — Soft launch (Weeks 8–11)
- 20 cold prospects from a single channel (e.g., Italian web agencies for white-label overflow OR Japanese pilates/wellness SMEs piggybacking the Softis case study).
- UTM-instrumented + Calendly source-attribution question.
- Conversion baseline established before scaling.
- Goal: measure real outbound conversion in a controlled segment.

### Phase 3 — Scale (Month 3+)
- Full outbound only after Phase 2 baseline is positive.
- Geographic + channel diversification.
- Weekly send target with named owner.
- **J+90 gate:** ≥2 paid international contracts → continue + start Phase 2 scope; <2 → structured retro.

### Indicative timeline

| Window | Milestone |
|---|---|
| Weeks 1–6 | Architecture + dev + content production |
| Week 7 | Phase 1 — Stealth |
| Weeks 8–11 | Phase 2 — Soft launch |
| Month 3+ | Phase 3 — Scale; J+90 gate at Month 3 end |

---

## 14. Risks (carried from brief, PM-level mitigations)

| # | Risk | Severity | PRD-stage mitigation |
|---|---|---|---|
| R1 | Niger geographic identity may still trigger bias | High | Hero copy enforced via FR-011; trust strip leads with international clients (JP, IT, CN). Conversion tracked per LD-5. |
| R2 | 10 named testimonials in 6 months is ambitious | High | LD-7 sets a pre-launch floor (3 named); collection runs in parallel; anonymized "Sector / Region" quotes acceptable as fallback. |
| R3 | Italian projects details vague + NDA-restricted | High | LD-4 blocks Italian deep case study from v1; Italy mentioned in `/about` narrative only until resolved. |
| R4 | SPA → multi-page migration is significant refactor | Medium | Architecture stage will sequence epics for incremental deployable releases. |
| R5 | Brand colors require pixel-precise calibration | Low | FR-080 defers final hex to architecture (logo pixel-sample + AA validation). |
| R6 | Two PTR Niger sites confusion (`ptrniger.com` vs `agency.ptrniger.com`) | High | Cross-site header link with explicit context on BOTH sites. Architecture/IA stage details placement. |
| R7 | "PTR Niger" brand contains "Niger" | Accepted | FR-011 enforces "Niger appears at most once above-the-fold". |
| R8 | Agency-level contact infrastructure missing | High | LD-6 makes it launch-blocking. |
| R9 | Skill mastery claims must be defensible | High | LD-3 + FR-140/141 enforce. |
| R10 | GDPR / cookie compliance for EU-targeted site | Medium | FR-070/071/072 + NFR-050/051/052; Plausible is cookieless. |
| R11 | Removing individual names removes humanization | Medium | FR-051/052 — generic team photo + "engagement composition" disclosure compromise. |
| R12 | Operational readiness gaps for international delivery | High | LD-11 — out of site scope, captured as parallel workstream. |
| R13 | Domain switch loses inbound link equity | High | FR-120/121/122 + LD-10 — 301 map + 12-month redirect-only legacy domain + inventory cutover. |
| R14 | "AI-augmented workflow" reads as "AI slop" | Medium | **Decided:** removed from public site, kept as commercial weapon (companion artifact #1). |
| R15 | Primary KPI has no baseline | High | LD-5 — pre-launch ≥20 instrumented sends. |
| R16 | "Red CTA" reads as destructive | Medium | **Decided:** FR-085 mandates Teal for primary CTAs; Red reserved for sparks. |

---

## 15. Acceptance Criteria (v1 Definition of Done)

The site ships v1 only when **all** of the following are true:

### 15.1 Functional

- [ ] All routes in §7 are live in EN and FR; locale switcher works on every page.
- [ ] Accept-Language detection on first visit; cookie persists choice.
- [ ] All FR-XXX requirements in §8 implemented and verified.
- [ ] 4 deep case studies live with Situation/Challenge/Solution/Stack/Result + at least one non-NDA-blocked metric each.
- [ ] Project gallery renders 12+ projects with working filters and search.
- [ ] Calendly Intro 20min + Project 30min + Partnership 30min events bookable in EN and FR availability windows.
- [ ] Contact form posts to agency inbox; honeypot + rate limit active; consent checkbox + privacy link present.
- [ ] No personal phone, WhatsApp, or individual employee names anywhere on the site.
- [ ] No Unsplash images anywhere; all client logos are real and have written permission (LD-8).

### 15.2 Performance & quality gates

- [ ] Lighthouse mobile: Perf ≥90, A11y ≥90, SEO ≥90 on `/`, `/work`, the 4 case studies, `/services`.
- [ ] LCP ≤2.5s on 4G mobile for `/[locale]` and case studies.
- [ ] CLS ≤0.1 on all routes.
- [ ] WCAG 2.1 AA contrast validated on all surfaces.
- [ ] `prefers-reduced-motion` disables Aurora + Magnetic button effects.

### 15.3 SEO & social

- [ ] `metadataBase = https://agency.ptrniger.com`.
- [ ] OG card preview verified on LinkedIn, Slack, WhatsApp for `/`, `/work`, all 4 case studies, `/services` — in BOTH locales.
- [ ] `sitemap.xml` lists EN + FR variants with hreflang annotations.
- [ ] `robots.txt` allows crawlers; links to sitemap.
- [ ] `Organization` JSON-LD on `/`; `WebPage` JSON-LD on all routes; `CreativeWork` (or equivalent) JSON-LD on case studies.

### 15.4 Domain & redirects

- [ ] DNS `agency.ptrniger.com` resolves with valid TLS + HSTS.
- [ ] 301 redirect map from `portfolio.nigerdev.com` deployed; ≥10 sample legacy URLs verified to land on correct new equivalents.
- [ ] Inbound link inventory (LD-10) updated for ≥80% of known surfaces.

### 15.5 Compliance

- [ ] Privacy policy live in EN and FR; links in footer on every page.
- [ ] Cookie banner shows on first visit; user choice persists.
- [ ] No GA, no FB Pixel, no advertising trackers — only Plausible.

### 15.6 Operational

- [ ] Agency inbox (LD-6) live and being monitored; 4-h first-response SLA documented.
- [ ] Mounkaila's personal phone / WhatsApp absent from all surfaces.
- [ ] Pre-launch baseline (LD-5) captured with ≥20 sends.
- [ ] ≥3 named testimonials live (LD-7 floor).

---

## 16. Open Questions (deferred to Architecture stage)

These do not block PRD sign-off; they are explicitly handed to Winston (Architect):

1. **i18n library decision** — `next-intl` recommended; confirm vs alternatives (`next-i18next`, App-Router-native).
2. **Final hex codes** — pixel-sample logo and validate AA contrast for the full token set.
3. **Self-hosted icon strategy** — bulk inventory + bundling approach for 30+ stack icons.
4. **301 redirect map** — full route-by-route mapping (legacy 7 subdomains may or may not be in scope; user confirmation needed).
5. **Contact form transport** — direct SMTP from server route, Resend, or Postmark.
6. **MDX vs YAML for case-study content** — content authoring ergonomics for non-dev contributors (Mounkaila future-self).
7. **Calendly embed strategy** — inline iframe vs popup widget; impact on CLS and JS bundle.
8. **CSP exact policy** for Calendly + Plausible + self.

---

## 17. Decisions Log (PM-level, captured in this PRD)

| # | Decision | Rationale |
|---|---|---|
| D-1 | R14 — AI-augmented workflow removed from public site, kept as commercial weapon. | User-confirmed 2026-05-01. Avoids "AI slop" perception with skeptical 2026 buyers; preserves the punch for in-call differentiation. |
| D-2 | R16 — Teal default for primary CTAs; Red reserved as spark. | Sales motion outranks brand purity; avoids EU/US "red = warning" semantic collision on primary actions. |
| D-3 | 4 deep case studies in v1: Softis 🇯🇵, PTR School 🇳🇪, GuidaCenter 🇳🇪, CSF 🇨🇳🇳🇪. | Geographic diversity proof (Asia + West Africa + China-corridor); sector diversity (wellness, edu, B2B trade); avoids R3 NDA-risk by deferring Italy to post-launch once LD-4 resolves. |
| D-4 | Italy referenced narratively in `/about`, listed in `/work` only after LD-4 resolves; no Italy deep case study at v1. | Italy is too important an EU-overlap proof point to fabricate or improvise — better to be silent than weak. |
| D-5 | Numeric primary-KPI target = ≥2× baseline positive-reply rate, sustained over 30-send rolling window for 3 consecutive months. | Concrete, measurable, time-bound; baseline established by LD-5 pre-launch. |
| D-6 | Plausible (cookieless) over Vercel Analytics or GA. | GDPR-friendly default; minimal cookie banner footprint; simple dashboard. |
| D-7 | Default first-visit locale resolved via Accept-Language; `x-default` hreflang → EN. | EN has wider international reach; FR remains co-equal once user chooses. |
| D-8 | Team photo: ship `equipe.png` placeholder at v1; replace post-launch. | Photo is a humanization signal but not a launch blocker; perfectionism here delays the conversion test. |
| D-9 | No public `/how-we-work` page. | Follows D-1; simplifies IA. |
| D-10 | Italian projects deferred from `/work` until LD-4 resolves. | Avoids displaying NDA-risky content; protects client relationships. |

---

## 18. Handoff

- **Next stage:** Architecture (Winston).
- **Skill:** `bmad-create-architecture`.
- **Pre-handoff gate:** LD-3, LD-4, LD-6, and LD-7 (≥3 named) must be resolved.
- **After architecture:** epics & stories breakdown via `bmad-create-epics-and-stories`, then implementation readiness check via `bmad-check-implementation-readiness`.

---

*PRD author: John (Product Manager). Source: Product Brief by Mary, 2026-05-01. Owner: Mounkaila.*
