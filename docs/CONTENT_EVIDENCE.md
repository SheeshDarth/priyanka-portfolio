# Content evidence ledger

Sources: **R** = `Priyanka_H_Resume_1page.pdf`; **B** = client's chat messages (2026-11-05); **W** = live page loaded 2026-11-05; **G** = public GitHub pages read 2026-11-05.

| Claim | Source | Verification status | Approval | Public placement | Notes |
|---|---|---|---|---|---|
| Forward Deployed Engineer intern, Subhanu Technologies, July 2026–present | R | From résumé | Client built the site from it | Home, About | Described as an intern, never senior. |
| Freelance full-stack developer since Jan 2026 | R | From résumé | Same | Home, About | |
| Bosch Bidadi, Software Engineering Intern, Jun–Jul 2025 | R | From résumé | Same | About | No quantified result claimed. |
| Coorg Coffee Crafted is live at coorgcoffees.in | R + W | **Verified**: site loads and sells coffee online | Link supplied by client | Work, case study | "Receiving orders" is from the résumé only. |
| Catalogue: ten products in three categories | W | **Verified** on the live page | Public page | Case study | Count as of 2026-11-05. |
| Screenshots of the live Coorg site (home desktop, categories desktop, home mobile) | W | **Verified**, captured by us | Client asked for them in chat | Case study, home card, work index | The store's top bar with phone numbers is cropped out. Testimonials are not shown. |
| Repo `coorgcoffee01/coorgcoffee` is public; 8 commits on main | G | **Verified** | Link supplied by client | Case study link | Owner is `coorgcoffee01`; whether that is the client's or Priyanka's account is not stated. |
| Payment verification uses HMAC-SHA256 recompute with `crypto.timingSafeEqual` | G (`src/server/razorpay-handlers.ts`) | **Verified** in the public file | Client supplied the repo | Case study code excerpt | Excerpt contains no secrets; indentation reconstructed. README in the repo names a Next.js stack, but file names (TanStack/Vite) match the résumé; the résumé stack is used. |
| React/TS/TanStack Start/Firebase/Razorpay stack, admin dashboard, DTDC, Cloud Functions | R | From résumé | Same | Case study | |
| CampaignOS: AI marketing operations platform built during the internship; input formats; poster/video/blog output; human approval; Cloud Run | R + B | From résumé and client text | **Client chose overview only, 2026-11-05** | Case study (overview), home card | Limited to a high-level overview. |
| CampaignOS internals: SICOS, mascot assets, MCP/JWT publishing, social platforms, model list, pipeline names, architecture and decisions | B | Client description | **Withdrawn 2026-11-05** ("remove critical info, only overview") | **Not on site** | A test fails the build if these terms appear. |
| VeriFarm: Hyperledger Fabric, MSP smart contracts, FastAPI anomaly detection, hashed identity | R | From résumé | Same | Case study | Not described as deployed or government. |
| GitHub repo `Priyanka7468/VeriFarm` exists | G | **Verified** by name; contents not reviewed | Link supplied via profile | VeriFarm link | |
| KT Villas in progress | R | From résumé | Same | Work index | |
| B.E. ISE, BNMIT, 2023–2027, CGPA 9.79 | R | From résumé | **Approved by client 2026-11-05** | About | Keep current. |
| SIH 2025, Adhvaya 2.0, Vision90 winner | R | From résumé, no proof link | Same | Home, About | |
| Kannada, English, Hindi | R | From résumé | Same | About | |
| Priyanka rides a motorcycle | Master brief | From client brief | Same | Home, About | No other riding detail is stated. The mascot "Rev" is an original illustration, not a likeness or a claim about her bike. |
| LinkedIn / GitHub URLs | B | Supplied by client | Supplied | Header, hero, footer, contact, JSON-LD | LinkedIn page requires sign-in; not opened. |
| Résumé PDF download | B | Client asked for it 2026-11-05 | **Approved** | Header, hero, closing, contact, footer | The PDF contains her phone number, private email and city. |
| Phone, private email, city in page text | R | — | **Not published as text** | Not in HTML | Automated test checks the HTML. They remain inside the downloadable PDF. |
| ngrok demo URL | B | Temporary tunnel, only an interstitial reachable | Not published | Not on site | |
