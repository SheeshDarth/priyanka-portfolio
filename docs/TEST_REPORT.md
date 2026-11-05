# Test report

Environment: Windows 11, Node 24.12.0, npm 11.6.2, Next.js 16.4.5 (Turbopack), Playwright 1.64 driving locally installed Google Chrome. Last run: 2026-11-05.

## Commands and results
| Command | Result |
|---|---|
| `npx tsc --noEmit` | No errors |
| `npx eslint .` | No findings |
| `npm run build` | Succeeded; 13 routes prerendered |
| `npx playwright test tests/site.spec.ts` | **38 passed** |
| `npx playwright test tests/screenshots.spec.ts` | Screenshots spec exists; last full run before the v2 redesign, not re-run since |

## What `site.spec.ts` covers
- Each of 7 routes: HTTP 200, one `h1`, no console/page errors.
- No horizontal overflow at 320, 375, 390, 768, 1024, 1440 and 1920 px.
- axe-core (WCAG 2.x A/AA tags), run with reduced motion: no serious or critical violations.
- No `#`/example/ngrok links; no phone number, email, `mailto:` or `tel:` in any page's HTML.
- All internal links resolve; custom 404 renders with status 404.
- Journey rail works by keyboard; reduced motion draws the route immediately.
- **Rev:** opens, shows "Stop 1 of N", rides to the next stop (page scrolls), Escape closes it, and at the end of `/about` it rides on to `/contact`. Present on every route at 375 px.
- Résumé link points at the PDF and the PDF is served as `application/pdf`.
- Coorg case study: live-site and repo links, three screenshots with alt text that actually load, and a code excerpt that contains no secrets.
- CampaignOS shows an overview only (no architecture, decisions or other sections) and none of the withheld terms (SICOS, FastMCP, Meta Graph, Instagram, model names…) appear anywhere on the site.

## Visual review (screenshots opened and inspected)
Hero, work cards with the Coorg thumbnail, open-road section, Coorg case study (top, screenshots, decisions and code), CampaignOS page, the mascot close-up, the ride-guide panel on desktop and mobile. Defects found and fixed this round: dashed road line ran through body text (now a solid bar), panel clipped on phones, arrow glyphs touching labels, a one-dot section rail on the overview-only page, and copy saying the code excerpt was "above".

## Not done / limitations
- Chrome only. No Firefox/WebKit run.
- axe cannot prove WCAG conformance; no manual screen-reader pass.
- No Lighthouse or Core Web Vitals measurement, so no performance scores are claimed.
- Scroll-driven reveal needs Chromium 115+ / Safari 26+; other browsers simply show content without the effect.
- The mascot's wheel animation was verified in code and by the scrolling test, not recorded as video.
- Not deployed.
