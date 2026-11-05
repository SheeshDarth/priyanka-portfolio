# Handoff

## What shipped
Routes: `/`, `/work`, `/work/coorg-coffee-crafted`, `/work/campaignos`, `/work/verifarm`, `/about`, `/contact`, custom 404, `robots`, `sitemap`, a code-drawn Open Graph image and favicon.

**Design v2:** navy / fog / signal-red palette, engineering-grid hero, staggered entrance, scroll reveal, hover lift. See `docs/design/DESIGN_SYSTEM.md`.
**Rev:** an original sport-bike-and-rider mascot that rides along the bottom of the screen as you scroll and guides visitors from stop to stop, page to page.
**Proof:** the Coorg case study shows screenshots of the live site, links to the live site and public repo, and a short excerpt of the payment-verification code.
**Links:** GitHub, LinkedIn and a résumé download appear in the header, hero, closing, contact page and footer. Project names in running text link to their case studies.

## Decisions to know about
- CampaignOS is **overview only** by request. Withheld details are listed in `docs/CONTENT_EVIDENCE.md` and guarded by a test.
- The résumé PDF is public and contains phone, email and city. Replace `public/downloads/Priyanka_H_Resume.pdf` to change that.
- Screenshots of other projects (KT Villas, CampaignOS, VeriFarm) are not possible yet; see `docs/CONTENT_NEEDED.md`.

## Adding things later
See `README.md`. Short version: `src/content/links.ts`, `projects.ts` (including `screens`), `media.ts`, `site.ts`, then `npm run build && npm test`.

## Repo and deploy
Repository: https://github.com/SheeshDarth/priyanka-portfolio (public, branch `main`). It was created under the GitHub account that was logged in on the build machine; transfer it to Priyanka7468 whenever you like (GitHub → Settings → Transfer).

**Live (Vercel production):** https://priyanka-h-portfolio.vercel.app (also https://priyanka-portfolio-peach.vercel.app). `priyanka-portfolio.vercel.app` was requested but is owned by another Vercel account. `priyanka-h-portfolio.vercel.app` was added as a project domain, so it follows future production deploys. Project `priyanka-portfolio` in the `siddharthbuildsai-4541s-projects` team. Deployed 2026-11-05 with `vercel deploy --prod` from this folder.

The Vercel project is **not** connected to the GitHub repo yet (Vercel reported the account needs a GitHub login connection), so pushes do not redeploy automatically. To update the live site run `npm run build && npx playwright test` and then `vercel deploy --prod`, or connect the repo in the Vercel dashboard (Project → Settings → Git).

The site is `noindex` and `robots.txt` disallows crawling until `site.domain` is set in `src/content/site.ts`. Add a custom domain in Vercel (Project → Settings → Domains), set `site.domain`, redeploy, and indexing, canonical URLs and the sitemap switch on.
