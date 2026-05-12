# Story 5.9 — Legacy domain 301 redirect map

`portfolio.nigerdev.com` → `agency.ptrniger.com`. Implemented at the Nginx
level on the legacy origin host (see `nginx/portfolio-legacy.conf`). Per LD-10,
the legacy domain stays alive as a redirect-only origin for ≥12 months
post-launch.

## Mapping

| Legacy path                            | New path                                                      |
| -------------------------------------- | ------------------------------------------------------------- |
| `/`                                    | `/en/` (default; FR users adjust via locale switcher)         |
| `/en` and `/en/*`                      | `/en/*`                                                       |
| `/fr` and `/fr/*`                      | `/fr/*`                                                       |
| `/projects` / `/realisations`          | `/{en\|fr}/{work\|realisations}`                              |
| `/about` / `/a-propos`                 | `/{en\|fr}/{about\|a-propos}`                                 |
| `/services`                            | `/en/services`                                                |
| `/contact`                             | `/en/contact`                                                 |
| `/case-studies/<slug>`                 | `/en/case-studies/<slug>`                                     |
| `/etudes-de-cas/<slug>`                | `/fr/etudes-de-cas/<slug>`                                    |
| `/skills`, `/competences`              | `/{en\|fr}/{about\|a-propos}` (skills folded into about)      |
| Anything else                          | `/en$request_uri` (fallthrough)                               |

## Inbound link inventory (LD-10)

Before flipping the cutover, populate this list and verify each lands on a 200:

- [ ] LinkedIn profile cards
- [ ] Email signature URLs
- [ ] GitHub README / repo links
- [ ] Indexed pages currently in Google Search Console
- [ ] Cached pages on archive.org
- [ ] Backlinks from partner agencies

For each, confirm the legacy URL → 301 → 200 on the new origin. Add overrides
to `nginx/portfolio-legacy.conf` for any URL that maps non-trivially.

## Cutover checklist

1. Deploy `agency.ptrniger.com` and verify it serves 200 on the canonical paths.
2. Submit the new sitemap to Google Search Console.
3. Update DNS for `portfolio.nigerdev.com` to point at the legacy redirect-only
   Nginx host (or update the existing one's vhost in place).
4. Run `curl -sI` against every entry in the inventory; expect 301 → 200.
5. Monitor 404 rates on the new origin for 14 days; add any missed URLs to the
   redirect map.
