# Priyanka H. — Portfolio

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS 4. Static-first, no backend, no analytics, no trackers.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run start -- -p 3100
npm run lint
npm run typecheck
npm test             # Playwright (uses installed Google Chrome; builds must exist first)
npm run qa:shots     # full-page screenshots into docs/qa/
```

## Where things live

| What | Where |
|---|---|
| Name, title, hero copy, nav | `src/content/site.ts` |
| Approved external links (GitHub, LinkedIn, live sites…) | `src/content/links.ts` |
| Projects and case-study copy | `src/content/projects.ts` |
| Experience, skills, education, awards | `src/content/profile.ts` |
| Approved photographs | `src/content/media.ts` + `public/images/` |
| Project screenshots | `screens` in `projects.ts`, files in `public/images/projects/` |
| Résumé download | `public/downloads/` + `links.resume` |
| Design tokens | `src/app/globals.css` (`@theme`) |
| Client to-do list | `client-input.md`, `docs/CONTENT_NEEDED.md` |
| Claim-by-claim evidence | `docs/CONTENT_EVIDENCE.md` |

## How to add things later

- **A link:** set `href` in `src/content/links.ts`. Links without an `href` are never rendered.
- **A project link:** add the link object to that project's `links` array in `projects.ts`.
- **A photograph:** put the optimised file in `public/images/`, then fill `media.portrait` (replaces the hero drawing) or push to `media.riding` (shows a gallery in the "open road" section). Empty arrays render nothing.
- **A domain:** set `site.domain` in `src/content/site.ts` (for example `"priyanka.dev"`). That turns on canonical URLs, the sitemap and search-engine indexing. Until then `robots` disallows everything and pages are `noindex`.
- **A new case study:** add an entry to `projects` (copy an existing one). The route, static params, metadata and "next project" link follow automatically.

## Privacy defaults

No phone number, private email or city appears in any page's text. The **résumé PDF is downloadable** (`public/downloads/Priyanka_H_Resume.pdf`) and does contain them; swap in a redacted copy if you prefer. See `docs/CONTENT_NEEDED.md`.

## Rev, the ride guide

`src/components/mascot/`: an original illustrated bike-and-rider that rides along the bottom of the screen as you scroll. Click it to get the current stop and a "next stop" button that walks visitors through every page (tour order is the `tour` array in `RideGuide.tsx`). It is an illustration only: no manufacturer logos, not a likeness of anyone.

## Deploy

Static-friendly and Vercel-compatible: import the repo into Vercel (framework preset: Next.js) or run `npm run build && npm run start`. Nothing has been deployed from this repo.
