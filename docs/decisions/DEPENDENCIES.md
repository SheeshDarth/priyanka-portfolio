# Dependencies and tooling decisions

## Installed
| Package | Why | Licence |
|---|---|---|
| next, react, react-dom | Framework; Server Components, static generation, `next/font`, `next/og` | MIT |
| tailwindcss, @tailwindcss/postcss | Tokens and layout | MIT |
| typescript (5.x), @types/* | Strict typing. TypeScript 7 exists but 5.x was chosen for Next compatibility | Apache-2.0 / MIT |
| eslint, eslint-config-next | Linting | MIT |
| @playwright/test, @axe-core/playwright | Browser tests and automated accessibility checks | Apache-2.0 / MPL-2.0 |

Fonts (Barlow Condensed, IBM Plex Sans, IBM Plex Mono) are SIL Open Font Licence, self-hosted by `next/font`.

## Deliberately not installed
- **shadcn/ui, Radix, Magic UI, React Bits, Motion Primitives:** no interactive primitive needed them; the only interactive parts are links, one `<details>` and the rail.
- **Motion (framer):** CSS handles the one animation.
- **Lenis / smooth-scroll, React Three Fiber:** no scroll problem or approved 3D assets; they would hurt performance and accessibility.
- **Analytics, CMS, forms, auth:** none requested or approved.

## Skills / MCP
Design and verification were done directly with the built-in browser, Playwright (system Chrome) and axe. No third-party skill or MCP installers were executed. The built-in preview browser's screenshots timed out, so screenshots were taken with Playwright instead.
