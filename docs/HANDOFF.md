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
The project is a git repository with local commits. Pushing to GitHub and deploying to Vercel are separate steps that need your confirmation of the account and visibility.
