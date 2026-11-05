/**
 * Approved external destinations.
 *
 * A link is rendered ONLY when `href` is a non-empty string. To enable a link,
 * paste the verified URL here. To hide one, set `href` to undefined.
 * Sources are recorded in docs/CONTENT_EVIDENCE.md.
 */
export type ApprovedLink = {
  label: string;
  /** Undefined = not approved/available; nothing is rendered. */
  href?: string;
  /** Short note on where the URL came from (not shown publicly). */
  source: string;
};

export const links = {
  github: {
    label: "GitHub",
    href: "https://github.com/Priyanka7468",
    source: "Supplied by the client in the build request (2026-11-05).",
  },
  linkedin: {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/priyankah7468/",
    source: "Supplied by the client in the build request (2026-11-05).",
  },
  coorgLive: {
    label: "coorgcoffees.in",
    href: "https://coorgcoffees.in/",
    source: "Supplied by the client; page loaded and verified live on 2026-11-05.",
  },
  coorgRepo: {
    label: "Source on GitHub",
    href: "https://github.com/coorgcoffee01/coorgcoffee",
    source: "Supplied by the client 2026-11-05; repo confirmed public, 8 commits on main.",
  },
  verifarmRepo: {
    label: "VeriFarm on GitHub",
    href: "https://github.com/Priyanka7468/VeriFarm",
    source:
      "Repository listed on the client's public GitHub profile (updated Apr 1, 2026). Contents not reviewed.",
  },
  // Intentionally empty until approved:
  email: { label: "Email", href: undefined, source: "Awaiting approved public address." },
  resume: {
    label: "Résumé (PDF)",
    href: "/downloads/Priyanka_H_Resume.pdf",
    source:
      "Client asked for a résumé download on 2026-11-05. The PDF itself contains her phone number, email and city.",
  },
  campaignOsPublic: {
    label: "CampaignOS public material",
    href: undefined,
    source:
      "A temporary tunnel demo URL was supplied; it is not a stable public link, so it is not published.",
  },
} satisfies Record<string, ApprovedLink>;

export function isLive(link: ApprovedLink): link is ApprovedLink & { href: string } {
  return typeof link.href === "string" && link.href.length > 0;
}
