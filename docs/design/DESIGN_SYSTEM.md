# Design system

Tokens live in `src/app/globals.css` under `@theme`.

## Colour (v2: navy, fog, signal red)
| Token | Hex | Use |
|---|---|---|
| `asphalt` | #0B1220 | Text, dark sections, primary button, the road bar |
| `graphite` | #334055 | Body text, rules |
| `muted` | #4B586B | Secondary text (≈ 6:1 on porcelain) |
| `steel` | #AAB6C8 | Secondary text on dark |
| `signal` | #F04438 | Accent on dark only (≈ 5:1 on asphalt) |
| `signal-ink` | #B42318 | Accent text/lines on light (≈ 5.7:1 on porcelain) |
| `porcelain` / `paper` | #EEF1F6 / #F8FAFC | Surfaces |

## Type
- `display`: Barlow Condensed 700, uppercase, line-height 0.9. Headings.
- Body: IBM Plex Sans 17px / 1.6, measure ≤ 62ch.
- `eyebrow`: IBM Plex Mono 12px, uppercase, tracked. Labels, nav, CTAs.

## Motion
- Entrance: hero text rises in sequence (`.rise`, CSS only).
- Scroll reveal: headings and screenshots fade up using CSS scroll-driven animation (`.reveal`), progressive enhancement.
- Hero route draws itself; cards lift on hover; buttons nudge up.
- **Rev**, the ride guide: a bike rides along a slim road bar at the bottom of the viewport as you scroll; wheels spin and the ponytail flutters while scrolling.
- Everything above is off under `prefers-reduced-motion`; Rev's position still follows scroll because the user is driving it.

## Rev (mascot)
Original illustration: red/white/black sport-bike (superbike silhouette, no manufacturer marks) and a helmeted, faceless rider with a ponytail and a laptop bag with a `</>` tag. FDE plus rider, without depicting any real person.
- Click or press the bike to open the guide: current stop, a one-line tip, a button that scrolls to the next heading or, at the end of a page, moves to the next page (Home → Work → each case study → About → Contact).
- Escape closes it. On phones the panel pins to the screen width.

## Layout
- `.wrap`: max 1280px, fluid gutters. `.wrap-rail` adds room for the section rail from 1024px (the rail hides when a page has fewer than three sections).
- Featured work uses three different card shapes on purpose.

## Accessibility rules baked in
- Skip link; one `h1` per page; 3px focus ring; ≥ 44px targets on nav and CTAs.
- Diagrams are ordered lists. Screenshots have descriptive alt text. Code excerpts are keyboard-scrollable.
- External links announce "(opens in a new tab)"; the résumé link announces "(PDF)".
