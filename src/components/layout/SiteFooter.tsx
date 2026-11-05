import Link from "next/link";
import { site } from "@/content/site";
import { links } from "@/content/links";
import { ExtLink } from "@/components/ui/ExtLink";
import { ResumeLink } from "@/components/ui/Bits";

export function SiteFooter() {
  return (
    <footer className="on-dark bg-asphalt text-porcelain">
      <div className="wrap pb-28 pt-14 md:pt-20">
        <p className="display text-[clamp(3rem,11vw,8rem)] leading-[0.85]">
          {site.name}
        </p>
        <div className="mt-10 grid gap-8 border-t border-steel/25 pt-8 md:grid-cols-3">
          <p className="max-w-xs text-steel">{site.title}. Building where technology meets the real world.</p>
          <nav aria-label="Footer">
            <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-1 p-0">
              {[{ href: "/", label: "Home" }, ...site.nav].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="eyebrow inline-flex min-h-11 items-center hover:text-signal">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-1 p-0 md:justify-end">
            {[links.linkedin, links.github].map((l) => (
              <li key={l.label}>
                <ExtLink link={l} className="eyebrow inline-flex min-h-11 items-center hover:text-signal" />
              </li>
            ))}
            <li>
              <ResumeLink className="eyebrow inline-flex min-h-11 items-center hover:text-signal" />
            </li>
          </ul>
        </div>
        <p className="eyebrow mt-6 text-steel">© {new Date().getFullYear()} {site.name}</p>
      </div>
    </footer>
  );
}
