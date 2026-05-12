---
title: "Product Brief: PTR Niger Agency Website (agency.ptrniger.com)"
status: "ready"
created: "2026-05-01"
updated: "2026-05-01"
inputs:
  - app/page.tsx
  - app/layout.tsx
  - app/globals.css
  - components/sections/ProfileSection.tsx
  - components/sections/SkillsSection.tsx
  - components/sections/ProjectsSection.tsx
  - components/sections/CompaniesSection.tsx
  - components/shared/AuroraBackground.tsx
  - components/shared/MagneticButton.tsx
  - components/shared/ScrollProgress.tsx
  - lib/translations.ts
  - public/image/ptrniger.png
  - "Stage 2 Artifact Analyzer subagent output"
  - "Stage 2 Web Researcher subagent output"
  - "Stages 1-3 user discovery transcript (2026-05-01)"
---

# Product Brief: PTR Niger Agency Website

## Executive Summary

PTR Niger — *Pro Technologie & Révolution* — is a Niger-based digital agency founded in 2017, operating with a 10+ person team (5 developers, 2 designers, several commercial leads) and a 9-year track record building production-grade web platforms across logistics, real estate, e-learning, recruitment, school management, sports, CRM, and BTP. Beyond the local Niger market, the agency has shipped work for international clients in Japan (Softis Pilates), China–Niger trade (Commande Sans Frontière), and Italy (multiple maintenance contracts).

Today, PTR Niger has no dedicated, English-first conversion asset for its international business line. The main domain `ptrniger.com` is positioned around training/formations for the West African market; the legacy showcase at `portfolio.nigerdev.com` is structured as a personal portfolio, French-default, single-page tabbed, with a hero that surfaces a developer's name rather than the agency's value proposition. International prospects sourced through outbound (LinkedIn, cold email, referrals) land on a destination that fails to convert them in the first 30 seconds.

This brief defines v1 of **`agency.ptrniger.com`** — a multi-page, bilingual (EN-default, FR-fallback) Next.js 15 site that re-platforms the existing codebase as a credible international web-agency conversion asset. It inverts the current narrative from *"individual portfolio that happens to be Niger-based"* to *"PTR Niger international web agency, with a proven track record across Africa, Europe, and Asia."*

## The Problem

PTR Niger has the production credentials and team depth of a serious mid-market agency, but no online surface that demonstrates this to non-local prospects.

### Status quo

- **The `ptrniger.com` brand reads "training school"** internationally — formations are the highlighted product on the main domain.
- **No English-first asset.** The legacy site forces `lang="fr"` (`app/layout.tsx:67`), has no hreflang, no per-language metadata, and runtime-state language switching that doesn't persist in URLs. Prospects whose browser is in English get a French page.
- **Project portfolio is fragmented across 7 client subdomains** (`hydrolink.ptrniger.com`, `ayki.ptrniger.com`, `school.ptrniger.com`, etc.) with no aggregated case-study layer that frames them as "PTR Niger work" with metrics or outcomes.
- **No structured intake.** The current CTA is WhatsApp on a Niger phone number (`+227…`) embedded in the navbar and hero — high-friction for EU/US prospects who expect a discovery call booking link.
- **Trust signals missing.** Stock Unsplash images stand in for client logos (`app/page.tsx:124,133,142,151`), no named testimonials, no public reviews. The "98+ projects" stat (translations.ts:48,176) is unverifiable and visually inconsistent (only 12 projects are rendered).
- **Africa-coded signals leak into headers.** `metadataBase` points to the wrong domain (`portfolio.nigerdev.com`, `app/layout.tsx:21`); SEO description and keywords explicitly include "Niger", "Niamey"; the Hero pill displays "Niamey, Niger" prominently rather than "International web agency, Niger-based".

### Cost of the status quo

- Outbound prospecting effort burns at the conversion step. Prospects who receive the link cannot understand what PTR Niger sells internationally and bounce.
- Industry baseline: Africa-based agencies report ~2 successful conversion outcomes per 60+ outbound attempts targeting EMEA, with location flagged as the rejection driver in ~50% of cases (Techpoint Africa, 2025) — a benchmark this brief is designed to materially improve.
- Margin is forfeited to platform middlemen (Toptal, Upwork) when the agency could capture full direct-client pricing via a stronger owned site.

## The Solution

A new dedicated international site at **`agency.ptrniger.com`**, structured as a multi-page Next.js 15 application:

| Route | Purpose |
|---|---|
| `/` | Hero with PTR Niger value proposition (30-second pitch), trust strip (years/team/clients), 3–5 featured case studies, services overview, primary CTA |
| `/work` | Full project gallery (12+ projects, filterable by sector, region, type) |
| `/case-studies/[slug]` | 3–5 deep case studies (Softis Pilates 🇯🇵, PTR School 🇳🇪, GuidaCenter 🇳🇪, Commande Sans Frontière 🇨🇳🇳🇪, Italian projects 🇮🇹 once detailed) — Situation → Challenge → Solution → Stack → Result with concrete metrics |
| `/services` | Three packages — **Maintenance**, **Audit**, **Build** — each with engagement formats (sprint-based, retainer, fixed-scope), day-range estimates, AND broad "Investment range" bands in EUR (e.g., *Audit sprint: from €3–6k · Build project: from €12k · Maintenance retainer: from €1.5k/month*). **No TJM disclosed.** Plus a **"Partner with us — overflow capacity for boutique agencies"** B2B2C paragraph. |
| `/about` | PTR Niger story (founded 2017, 9+ years, 10+ team, sectors served, AI-augmented workflow) |
| `/contact` | Calendly embed for discovery call + structured intake form + agency email |

The site is **bilingual EN + FR as co-equal first-class languages** (not "EN-default with FR fallback"). FR is positioned as a strategic wedge into the francophone B2B segment (France, Belgium, Switzerland, Quebec, francophone West Africa) — a multi-billion-euro market most anglophone offshore agencies cannot serve. Implementation: proper i18n routing (`/en/...`, `/fr/...`), Accept-Language detection on first visit, localized metadata per route, hreflang tags, per-language Open Graph cards, html `lang` attribute set per route. Copy on `/about` and `/services` explicitly surfaces the bilingual delivery capability as a differentiator.

## What Makes This Different

1. **A real international delivery track record from a West African agency.** Most Niger-based competitors cannot show shipped work in Japan, EU, and Asia. We can — and we lead with it.
2. **Timezone advantage stated explicitly.** Niger is GMT/UTC+1, fully overlapping European working hours and covering US morning. Surfaced as a hero badge: *"Working hours 10am–7pm WAT (= 11am–8pm CET) — overlap with EU & US morning"*. Same coverage as a UK or Spanish agency, at Niger pricing structure.
3. **9 years, 10+ team, agency depth.** Not a freelancer trying to look bigger. Real bench means parallel work streams, in-house design + dev + commercial.
4. **AI-augmented workflow as a current premium signal.** The team uses Claude Code, Codex, Cursor, etc. — productivity multiplier without juniorization perception risk.
5. **Smart pricing anchoring without TJM disclosure.** Engagements presented as Maintenance retainer / Audit sprint / Build project formats with day-range estimates AND broad "Investment range" bands in EUR (e.g., *from €3–6k for an Audit, from €12k for a Build*). Buyer gets enough anchor to self-qualify (filters tire-kickers), agency keeps pricing-conversation control on the call.

6. **Native bilingual delivery (FR + EN, peer level).** Most offshore agencies are English-only or weak-FR. PTR Niger ships in both languages natively — direct wedge into the francophone B2B segment (France, Belgium, Switzerland, Quebec, francophone West Africa) that anglophone competitors cannot touch.

7. **EU data-residency on demand.** Pre-empts the GDPR / data-sovereignty reflex from EU procurement teams: deployments target Vercel / AWS Frankfurt or Paris regions per client preference; data residency is client-controlled.
8. **Distinctive brand visual signature.** PTR Red `#E8273E` + PTR Teal `#1FB8CC` on carbon dark — visually distinctive vs the saturated Bento-grid template look that dominates 2026 agency sites. Refined motion (preserved Aurora background, magnetic buttons, scroll progress, marquee — re-tinted to brand) signals craft.

## Who This Serves

### Primary audience: International prospects sourced via outbound

- **EU / UK / US / Italian / Japanese SMEs and agencies** seeking a fullstack web partner for new builds, refactors, or maintenance contracts.
- They already know who PTR Niger is (the link was sent to them by Mounkaila or another commercial lead via DM, email, referral). The site's job is to **close trust in under 30 seconds** and convert to a booked discovery call.
- **Above-the-fold must answer four questions in order:**
  1. *What does PTR Niger do?*
  2. *For whom — and have they shipped work like mine?*
  3. *Why should I trust them?*
  4. *How do I book a call right now?*

### Secondary audience: Inbound discovery (Year 2+)

- Organic search ("Laravel agency Africa", "Next.js fullstack remote team", "outsourced web dev EU timezone") — addressed via SEO basics in v1, deeper investment post-launch.
- Referrals from existing international clients (Softis Pilates, etc.).

### Non-audience (do not optimize for)

- Job seekers (no "Careers" page in v1)
- Local Niger formations students (served by `ptrniger.com`)
- Freelance marketplaces (we want direct clients, not platform leads)

## Success Criteria

### Primary KPI (qualitative, owner-tracked)

**Outbound link conversion rate** — % of prospects who, after receiving the site link in a DM/email, respond positively (book a call, ask for a quote, engage in substantive reply) within 7 days. Baseline TBD. Target: **sustained lift vs current `portfolio.nigerdev.com` site**, measured monthly via simple spreadsheet (sent / responded / closed).

### Secondary KPIs

- **Discovery calls booked via Calendly** per month
- **Real client testimonials collected** — target **10 named testimonials** with company + LinkedIn URL within 6 months post-launch
- **Pipeline geographic diversification** — % of new prospects from non-Niger geographies
- **Bounce-back feedback loop** — qualitative: solicit at least one "why didn't this convert?" response per month from declined prospects

### Anti-KPIs (deliberately do not optimize for)

- Pure traffic volume (irrelevant for outbound-first model)
- Time on site (we WANT prospects to convert fast, not linger)
- SEO rankings on competitive keywords (Year 1 secondary objective)

### 90-day launch dashboard

| Window | What we measure |
|---|---|
| **Week 1** | Site uptime, Lighthouse (perf/SEO/a11y ≥90), Calendly booking flow tested EN+FR, 0 broken `/case-studies/[slug]` links, OG card preview verified on LinkedIn/Slack/WhatsApp, redirect map `portfolio.nigerdev.com` → 301 → `agency.ptrniger.com` confirmed |
| **Week 2–4 (soft launch)** | Outbound sent count by channel, link-click-through-rate from DM/email to site, `/contact` + `/services` scroll-depth, Calendly bookings (raw + qualified), first-response time on form submissions, qualitative reasons-for-decline from any "no thanks" replies |
| **Month 1** | Outbound conversion rate (sent → positive reply within 7 days) vs baseline, % geographic diversity of replies, # testimonials collected vs trajectory (target: 10 in 6 months ⇒ 1.7/month), top 3 friction points reported by prospects |
| **Month 2–3** | Discovery-call → proposal-sent rate, proposal → signed-contract rate, average days to close, % of pipeline outside Niger, **first paid contract from the new site (binary success gate at day 90)** |
| **Quarter-end gate** | If <2 paid international contracts closed in 90 days → structured launch retro before scaling outbound. If ≥2 → double outbound volume and start Phase 2 scope (blog, additional case studies, Clutch/GoodFirms profile) |

## Scope (v1 / MVP)

### In scope

- App Router multi-page architecture (`/`, `/work`, `/case-studies/[slug]`, `/services`, `/about`, `/contact`)
- Bilingual **EN + FR as co-equal first-class languages** with i18n routing (`/en/...`, `/fr/...`), per-locale metadata, hreflang, Accept-Language detection on first visit (recommended: `next-intl`)
- **Case studies optimized as SEO long-tail landing pages from day one** — slugs designed for searchable phrases (e.g., `/case-studies/nextjs-pilates-booking-platform-japan`, `/case-studies/laravel-school-management-saas`), localized metadata per case study, JSON-LD `CreativeWork` schema, internal linking from `/work` and `/services`. Each case study doubles as an inbound asset feeding the long-term SEO loop without a separate blog infrastructure.
- **One team photo on `/about`** (humanization signal, no individual names). Initial placeholder: `public/image/equipe.png` (current image is a stand-in; user will replace with a properly framed professional team shot post-launch — flagged as a **POST-LAUNCH polish item**, not a launch blocker).
- **`/services` includes a "Partner with us" paragraph** opening a B2B2C white-label / overflow-capacity channel for boutique EU agencies that subcontract their dev surge.
- **Pricing anchoring**: each `/services` package displays day-range + broad "Investment range" EUR band (e.g., *Audit: from €3–6k · Build: from €12k · Maintenance: from €1.5k/mo*). No TJM disclosed.
- **EU data-residency statement** on `/services` and `/about`: deployments to Vercel / AWS Frankfurt or Paris regions per client preference.
- New agency-grade hero (PTR Niger logo + tagline + value pitch + trust strip — no individual employee names)
- Brand palette migration from lime/orange to PTR Red `#E8273E` + PTR Teal `#1FB8CC` + carbon `#0A0E0C` + off-white `#F5F7F4`
- Real client logos (provided by user) replacing all Unsplash placeholders
- 3–5 deep case studies with structured Situation → Challenge → Solution → Stack → Result + metrics
- Project gallery for all PTR-validated projects (Hydrolink, AYKI, PTR Niger E-Learning, PTR School, EMMA-Lab, L'Astuce, GuidaCenter, CSF, Softis Pilates, iCall CRM, Gestion Boutique, Shop POS, plus Italian projects placeholders)
- Services page with 3 packages (Maintenance / Audit / Build) and day-range estimates, no public TJM
- Calendly integration on `/contact` (account to be created in parallel: `calendly.com/ptr-niger-agency` or similar)
- SEO basics: per-page metadata, OpenGraph, Twitter cards, sitemap.xml, robots.txt, Organization JSON-LD
- Domain migration: update `metadataBase` to `https://agency.ptrniger.com`, all canonicals, all OG URLs
- Migration of existing animation assets (WordReveal, AuroraBackground re-tinted, MagneticButton, ScrollProgress re-tinted, marquee), plus `prefers-reduced-motion` guard
- Removal of personal contact details (Mounkaila phone, WhatsApp +227 from primary CTAs) — replaced by agency-level contact (email + Calendly + form)
- Skill section curation — remove jQuery + MERISE + other unverifiable items; add validated team stack (TypeScript advanced, PHPUnit, Jest/Vitest/Playwright, Vercel/AWS/DigitalOcean, Stripe, REST/GraphQL, Redis, AI APIs — final list captured in PRD)
- Image migration from raw `<img>` to `next/image` for project covers and client logos

### Explicitly out of scope (Phase 2+)

- Standalone blog infrastructure (case studies absorb the SEO long-tail role for v1)
- Languages beyond EN + FR
- Customer login / portal
- Live chat
- Advanced analytics dashboards (basic Plausible — cookieless, GDPR-friendly — is sufficient)
- Headless CMS (content stays in code/MDX for v1; reassessed if testimonial cadence > 2/month)
- E-commerce on services
- A/B testing infrastructure
- "Careers" page
- Replacement professional team photo (post-launch polish item; placeholder ships at v1)

### Known prerequisites the user must provide (launch-blocking unless flagged)

- **[BLOCKING]** Logo file: ✅ provided at `public/image/ptrniger.png` (SVG version preferred for retina/dark-mode adaptability — to request)
- **[BLOCKING]** Calendly account: provisioned, two event types (Intro 20min / Project 30min), EN+FR availability windows, integration tested in soft-launch
- **[BLOCKING]** Agency contact infrastructure: shared inbox (e.g., `mail@ptrniger.com`), defined 4-business-hour first-response SLA, primary + backup responder named
- **[BLOCKING]** Skill mastery checklist confirmation — site copy derives from this list (the "we can demo it in 30min" bar)
- **[BLOCKING]** Italian projects publishability check (NDA review with each client, then either: confirmed publishable OR dropped to sales-conversation only)
- **[BLOCKING]** Pre-launch baseline measurement: instrument current site outbound for ≥20 sends to anchor the conversion-lift KPI
- 10 client testimonials (text + name + company + LinkedIn URL ideally) — collection runs in parallel with dev; minimum bar at launch: 3 named + permission for 7 more in pipeline
- Real client logos with usage permission (agency must obtain explicit written permission per client — Unsplash placeholders are removed regardless)
- Final hex codes sampled from logo (architecture will pixel-pick)
- One paragraph (interview) per case study to extract real outcome metrics; if metrics are NDA-blocked, list non-gated metrics (users served, uptime, languages supported) instead of fabricating numbers

## Brand & Design Direction

### Visual identity

- **Logo:** `public/image/ptrniger.png` — letters PTR split red (top) / teal (bottom), "Niger" word and "Pro Technologie & Révolution" tagline in red.
- **Brand acronym to surface in copy:** *PTR — Pro Technologie & Révolution.*
- **Color tokens (final hex to be pixel-sampled from logo during architecture):**

  | Token | Hex (provisional) | Role |
  |---|---|---|
  | `--ptr-red` | `#E8273E` | Accent, CTAs, live indicators, sparks (≤15% surface coverage) |
  | `--ptr-teal` | `#1FB8CC` | Co-primary, gradients, highlights, iconography |
  | `--carbon` | `#0A0E0C` | Background dominant |
  | `--surface` | `#121815` | Cards, raised elements |
  | `--off-white` | `#F5F7F4` | Text primary |
  | `--muted` | `#9BA8A2` | Text secondary |

- **Color rules (non-negotiable):**
  1. Red and teal are never directly adjacent in UI surfaces (always separated by carbon or off-white) — keeps the logo's identity, avoids holiday-color collision in larger blocks.
  2. No red→teal gradient.
  3. Any color-coded distinction (status, success/error, badges) is reinforced by an icon or label — accessibility for deuteranopia.
  4. Red is reserved as a "spark" color: rare, high-impact moments. Teal carries day-to-day identity.

- **Typography:** Geist Sans + Geist Mono (preserved from v1).
- **Motion:** Preserve and refine the existing motion system; gate by `prefers-reduced-motion`.
- **Tone:** Confident, agency-grade, international-first. Assertive *"we"* voice (*"Our team has shipped..."*, *"We work with..."*) — not the humble freelancer voice of the current site.
- **Reference benchmarks:** Vercel (green-on-dark restraint), Linear (accent-on-monochrome), Active Theory / Locomotive Studio (motion-led agency sites). Explicitly NOT Awwwards-tier 3D experiments — incompatible with sub-30-second conversion.

## Technical Approach (high level — detailed in Architecture stage)

- **Stack preserved:** Next.js 15 + React 19 + Tailwind v4 + Framer Motion 12 + Radix UI + lucide-react.
- **Routing:** Migrate from tabbed SPA (`useState`-driven, `app/page.tsx:312-314`) to App Router multi-page with localized URL prefixes.
- **i18n:** Adopt `next-intl` for EN/FR with URL prefixes, per-locale metadata, hreflang. Replace the runtime React-state language toggle.
- **Images:** Migrate raw `<img>` (project covers, client logos, profile) to `next/image` for LCP optimization.
- **SEO:** sitemap.xml, robots.txt, Organization JSON-LD, OG cards per page; fix `metadataBase` to `https://agency.ptrniger.com`.
- **Performance:** Self-host the 30+ icon SVGs currently loaded from `cdn.jsdelivr.net`; preload critical assets; lazy-load non-critical sections.
- **Accessibility:** WCAG AA contrast audit on the new palette, `prefers-reduced-motion` guards on Aurora and Magnetic buttons, keyboard navigation, ARIA labels on interactive components.
- **Analytics:** Lightweight, privacy-friendly (Plausible or Vercel Analytics).

## Risks & Open Questions

| # | Risk / Question | Severity | Mitigation / Resolution path |
|---|---|---|---|
| R1 | Niger geographic identity may still trigger bias from some prospects despite the agency framing | High | Lead above-the-fold with international clients (Japan, Italy, China), team scale, EU-timezone overlap. Track conversion rate to validate strategy. |
| R2 | 10 named testimonials in 6 months is ambitious — and clients (especially Italian maintenance contracts) may decline public attribution due to NDA or white-label arrangements | High | Start collection now in parallel with dev. Accept text + company + LinkedIn URL as minimum bar; video testimonials are upside. Run a parallel "publishability check" with each client BEFORE writing the case study. If only 2–3 named testimonials land, keep them prominent and pad with anonymized "Sector / Region" quotes ("Logistics SME, Italy") rather than stretching the trust strip thin. |
| R3 | Italian projects details are vague at brief time AND may be NDA-restricted, undisplayable | High (raised) | Block-out a 1-hour interview with the Italian project owner at PTR before launch to extract publishable details. If NDA-blocked: drop public Italy attribution and keep them as sales-conversation reference only. Italy is too important as a EU-overlap proof point to defer or improvise. |
| R4 | SPA-to-multi-page migration is significant refactor effort | Medium | Architecture stage will sequence epics for incremental deployable releases. |
| R5 | Brand colors require pixel-precise calibration from logo file | Low | Architecture will sample logo file directly and provide AA-validated final hex codes. |
| R6 | Confusion risk: two PTR Niger sites (`ptrniger.com` formations vs `agency.ptrniger.com` international) — and inverse risk: international prospects may land on `ptrniger.com` first via Google and never reach the agency site | High (raised) | Crystallize positioning split. Add cross-site header link with explicit context on BOTH sites ("Looking for our training programs? Visit ptrniger.com" / "Looking for international web agency services? Visit agency.ptrniger.com"). SEO disambiguation: `ptrniger.com` should de-prioritize "agency / web development" terms in favor of "training / formation". |
| R7 | "PTR Niger" brand contains "Niger" — partially undercuts the geographic-neutrality angle | Accepted tradeoff | User-approved (2026-05-01). Re-positioned as a strength: "Niger-based agency, international clients" — explicit, not hidden. Hero copy constraint: "Niger" appears at most once above-the-fold, in the trust-strip context (e.g., "Niger-based, EU-overlapping team"), NOT in the H1. |
| R8 | Agency-level contact infrastructure missing — current code uses Mounkaila's personal phone, and there is no agency support email, no defined first-response SLA, no escalation path | High (raised — promoted from Medium) | Pre-launch: provision `mail@ptrniger.com` or `contact@agency.ptrniger.com`; define a 4-business-hour first-response SLA; name 1 primary + 1 backup responder; document escalation when primary is on a call. Captured as a launch-blocking dependency. |
| R9 | "Skill mastery" claims must be defensible if a prospect probes — site copy must be derived from the team's actual demoable capabilities, not aspirational | High | Block PRD sign-off until user delivers the mastery checklist. Inclusion bar: "we can demo this in a 30-min call". |
| R10 | GDPR / cookie compliance not addressed for an EU-targeted site (Calendly embed, analytics, OG). EU procurement teams will check this before engaging | Medium | v1 must include: minimal cookie banner (consent for non-essential trackers), privacy policy page, data-processing statement covering Calendly + analytics, contact for data requests. Plausible (cookieless) preferred over GA. |
| R11 | Removing all individual employee names removes a humanization signal — agency-only pages can read as faceless lead-gen fronts. Higher risk for Japanese buyers (relationship-first culture) | Medium | Compromise: keep agency framing in copy, but allow 1 generic team photo (group, taken professionally) on `/about` and "team composition" disclosure ("typical engagement: 1 tech lead + 2 devs + 1 designer + 1 QA, named at SOW signing") to humanize without breaking the no-individual-names rule. |
| R12 | Operational readiness gaps for international delivery: no EN-language MSA/SOW/NDA templates, no validated EUR/USD/JPY payment infrastructure (Wise Business / Stripe / SEPA), no defined async collaboration stack (Linear/Notion/Slack/Loom). First closed deal could stall 2–3 weeks at legal/finance | High | Parallel ops workstream — not in site scope but a launch dependency. Provision Wise Business + Stripe; draft EN MSA/SOW/NDA via a legal template; document async stack on `/how-we-work`. Owner + dates captured in handoff to PM (John). |
| R13 | Domain switch `portfolio.nigerdev.com` → `agency.ptrniger.com` with no 301-redirect plan loses inbound link equity (LinkedIn DMs, email signatures, GitHub READMEs) | High | In scope for v1: (a) inventory existing inbound links and DM templates; (b) 301 redirects from `portfolio.nigerdev.com` routes to `agency.ptrniger.com` equivalents; (c) coordinated cutover of LinkedIn, email signatures, GitHub bios; (d) keep `portfolio.nigerdev.com` hosted ≥12 months as redirect-only origin. |
| R14 | "AI-augmented workflow" differentiator risks reading as "AI slop" to skeptical 2026 buyers if not framed carefully | Medium | Either dedicate a `/how-we-work` surface that explicitly describes the human-review workflow (e.g., "AI accelerates first drafts; senior team reviews and ships"), OR remove from public-facing differentiators and keep as internal capability. Decision required in PRD. |
| R15 | Primary KPI ("Outbound link conversion rate") has no pre-launch baseline — "sustained lift" cannot be evaluated without it | High | Instrument the existing site this week: tracked link + spreadsheet capturing sent / replied / booked over the next 20 outbound sends. Set a numeric target before launch (e.g., "lift positive-reply rate from X% to ≥2X%, sustained over rolling 30-send window for 3 consecutive months"). |
| R16 | "PTR Red as spark color" applied to the primary "Book a call" CTA could read as "destructive action" to design-literate prospects (red = warning/error in EU/US conventions) | Medium | Validate in soft-launch with 5-prospect click test. Default to **Teal CTA** for primary actions; reserve Red for live indicators, breaking news, urgent badges. Sales motion outranks brand purity. |

## Launch Sequencing (3-phase rollout)

The site does not "go live" all at once into outbound traffic. Three explicit phases:

### Phase 1 — Stealth (Week 0)
- 10 friendly contacts (existing clients, dev peers, trusted advisors) review the EN site
- Written feedback on hero clarity, case-study credibility, CTA flow
- Bugs caught and fixed BEFORE any cold prospect sees the site
- Goal: catch first-impression killers (FR-only OG card, broken Calendly, missing alt text) without contaminating the conversion data

### Phase 2 — Soft launch (Week 1–4)
- 20 cold prospects from a single channel (e.g., Italian web agencies for white-label overflow, OR Japanese pilates/wellness SMEs piggybacking the Softis case study)
- Instrumented with UTM + Calendly source-attribution question
- Conversion baseline established before scaling
- Goal: measure real outbound conversion in a controlled segment

### Phase 3 — Scale (Month 2+)
- Full outbound only after Phase 2 conversion baseline is positive
- Geographic + channel diversification (LinkedIn DM / cold email / referral)
- Weekly send target with named owner
- Goal: production volume of outbound at validated conversion rate

## Companion Artifacts (parallel workstreams to the site itself)

These are NOT site features but are launch dependencies the brief flags for execution alongside dev:

1. **Pricing Conversation Playbook** (private Notion or printed card) — range bands per package, qualifying questions before quoting, prepared phrasings for "what does this cost?" / "are you the cheapest?" / "what's your TJM?"
2. **Outbound Plan v1** — target lists (50 Italian agencies, 50 JP wellness SMEs, 50 EU recruitment-tech founders), channel split, weekly send target, named owner, response template per segment
3. **Outbound copy templates** (LinkedIn DM + cold email) — co-written with the hero so DM hook → site hero → Calendly is one continuous narrative
4. **Operational ops bundle** — EN MSA/SOW/NDA templates, Wise Business + Stripe Connect provisioning, async collaboration stack (Linear/Notion/Slack/Loom), documented onboarding for new clients
5. **Referral mechanism** — request 3 warm intros per existing international client (Softis Pilates, Italian clients, GuidaCenter) baked into the testimonial-collection workflow
6. **Third-party reviews workstream** — publish 5–10 verified reviews on Clutch and/or GoodFirms within 90 days post-launch (linked from `/about` for third-party validation)

## Vision (3 years)

By 2029, **`agency.ptrniger.com`** is the canonical destination for international prospects discovering or evaluating PTR Niger. The site supports a portfolio of 30+ documented international case studies across EU, USA, Japan, and other markets, demonstrates measurable client outcomes (CA generated, users served, performance gains), and operates as the primary conversion funnel for the agency's international business line.

The PTR Niger brand graduates from *"Niger-based agency that happens to do international work"* to *"international web agency headquartered in Niger"* — perceived peer of mid-market EU agencies, at a competitive cost structure.

A localized blog with case-study deep dives and technical articles drives organic inbound to complement outbound. The site's measurable conversion lift versus the current `portfolio.nigerdev.com` baseline becomes the proof case PTR Niger uses to win web-conversion contracts from its own clients.

---

*Brief author: Mary (Business Analyst). Next stage: PRD by John (Product Manager). Hand-off via `bmad-agent-pm`.*
