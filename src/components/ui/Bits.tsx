import Link from "next/link";
import type { ReactNode } from "react";
import { links, isLive } from "@/content/links";

const projectHrefs: Record<string, string> = {
  "Coorg Coffee Crafted": "/work/coorg-coffee-crafted",
  CampaignOS: "/work/campaignos",
  VeriFarm: "/work/verifarm",
};
const projectRe = new RegExp(`(${Object.keys(projectHrefs).join("|")})`, "g");

/** Turns project names in running text into links to their case studies. */
export function LinkedText({ text }: { text: string }) {
  return (
    <>
      {text.split(projectRe).map((part, i) => {
        const href = projectHrefs[part];
        return href ? (
          <Link key={i} href={href} className="link-underline font-medium hover:text-signal-ink">
            {part}
          </Link>
        ) : (
          part
        );
      })}
    </>
  );
}

/** Résumé download. Renders nothing until links.resume has an href. */
export function ResumeLink({ className, children }: { className?: string; children?: ReactNode }) {
  if (!isLive(links.resume)) return null;
  return (
    <a href={links.resume.href} download="Priyanka_H_Resume.pdf" className={className}>
      {children ?? "Download résumé"}
      <span aria-hidden="true" className="ml-2">
        ↓
      </span>
      <span className="sr-only"> (PDF)</span>
    </a>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false" className="h-4 w-4 fill-current">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false" className="h-4 w-4 fill-current">
      <path d="M1 1.5A.5.5 0 0 1 1.5 1h13a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-13ZM5.3 6.4H3.2V13h2.1V6.4ZM4.25 3.3a1.22 1.22 0 1 0 0 2.44 1.22 1.22 0 0 0 0-2.44ZM13 13V9.4c0-1.8-.96-2.64-2.24-2.64-1.03 0-1.5.57-1.76.97V6.4H6.9V13H9V9.7c0-.88.17-1.73 1.26-1.73 1.07 0 1.09 1 1.09 1.78V13H13Z" />
    </svg>
  );
}

/** GitHub + LinkedIn buttons, each rendered only when approved. */
export function SocialLinks({ className }: { className?: string }) {
  const items = [
    { link: links.github, icon: <GithubIcon /> },
    { link: links.linkedin, icon: <LinkedinIcon /> },
  ];
  return (
    <>
      {items.map(({ link, icon }) =>
        isLive(link) ? (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
          >
            {icon}
            {link.label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : null,
      )}
    </>
  );
}
