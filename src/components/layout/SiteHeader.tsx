"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { ResumeLink } from "@/components/ui/Bits";

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-graphite/15 bg-porcelain">
      <div className="wrap wrap-rail flex h-[3.75rem] items-center justify-between">
        <Link href="/" aria-label={`${site.name}, home`} className="flex items-center gap-3">
          <span className="display flex items-center gap-1 text-3xl leading-none">
            PH
            <span aria-hidden="true" className="mb-1 h-[3px] w-5 -rotate-[28deg] bg-signal-ink" />
          </span>
          <span className="eyebrow hidden text-muted sm:inline">{site.name}</span>
        </Link>
        <nav aria-label="Primary">
          <ul className="m-0 flex list-none gap-1 p-0 sm:gap-4">
            {site.nav.map((item) => {
              const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={`eyebrow inline-flex min-h-11 items-center px-2.5 ${
                      current ? "text-signal-ink underline decoration-2 underline-offset-8" : "text-asphalt hover:text-signal-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="hidden sm:block">
              <ResumeLink className="eyebrow btn ml-1 inline-flex min-h-10 items-center border border-graphite px-3 hover:border-signal-ink hover:text-signal-ink">
                Résumé
              </ResumeLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
