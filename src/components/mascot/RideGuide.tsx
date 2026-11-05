"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { RiderBike } from "./RiderBike";

/** Route order for the guided tour across pages. */
const tour = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/work/coorg-coffee-crafted", label: "Coorg Coffee Crafted" },
  { href: "/work/campaignos", label: "CampaignOS" },
  { href: "/work/verifarm", label: "VeriFarm" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const tips: [string, string][] = [
  ["priyanka", "Briefing: name, role and what I do, in one screen."],
  ["three projects", "Three kinds of problem. Each one has its own case study."],
  ["from the problem", "The route plan: brief, spec, build, review, test, ship."],
  ["where the work", "Internships and client work, newest first."],
  ["beyond the build", "Helmet on. Off the clock."],
  ["recognition", "Hackathon wins, in brief."],
  ["if this is close", "End of the route. Say hello."],
];

type Stop = { el: HTMLElement; label: string };

const tipFor = (label: string) => {
  const l = label.toLowerCase();
  return tips.find(([k]) => l.startsWith(k))?.[1];
};

const prefersReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Rev, the route guide. A bike rides along the bottom of the viewport as you scroll
 * (position = scroll progress). Click or press it to open a small panel with the
 * current stop and a "ride to next stop" button that scrolls to the next heading
 * or, at the end of a page, moves on to the next page in the tour.
 */
export function RideGuide() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [hint, setHint] = useState(false);
  const [stops, setStops] = useState<Stop[]>([]);
  const [active, setActive] = useState(0);
  const [alignRight, setAlignRight] = useState(false);
  const roadRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const progress = useRef(0);

  // Discover this page's stops (its headings) whenever the route changes.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setOpen(false);
      setActive(0);
      const els = Array.from(document.querySelectorAll<HTMLElement>("main h1, main h2"));
      setStops(
        els
          .map((el) => ({ el, label: (el.textContent ?? "").replace(/\s+/g, " ").trim() }))
          .filter((s) => s.label.length > 0),
      );
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  // Bike position follows scroll progress; wheels spin while scrolling.
  useEffect(() => {
    let frame = 0;
    let timer: number | undefined;

    const update = () => {
      frame = 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      progress.current = p;
      roadRef.current?.style.setProperty("--p", p.toFixed(4));
      const line = window.innerHeight * 0.4;
      let cur = 0;
      stops.forEach((s, i) => {
        if (s.el.getBoundingClientRect().top <= line) cur = i;
      });
      setActive(cur);
    };
    const onScroll = () => {
      roadRef.current?.classList.add("is-riding");
      window.clearTimeout(timer);
      timer = window.setTimeout(() => roadRef.current?.classList.remove("is-riding"), 160);
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(timer);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [stops]);

  // One-time greeting per browser session. Not announced to screen readers.
  useEffect(() => {
    if (sessionStorage.getItem("rev-hint")) return;
    const show = window.setTimeout(() => {
      sessionStorage.setItem("rev-hint", "1");
      setAlignRight(progress.current > 0.55);
      setHint(true);
    }, 2400);
    const hide = window.setTimeout(() => setHint(false), 9000);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, []);

  // Escape closes the panel and returns focus to the bike.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const current = stops[active];
  const next = stops[active + 1];
  const pageIdx = tour.findIndex((t) => t.href === pathname);
  const nextPage = pageIdx >= 0 ? tour[pageIdx + 1] : undefined;
  const behavior: ScrollBehavior = typeof window !== "undefined" && prefersReduced() ? "auto" : "smooth";

  const nextLabel = next
    ? `Next: ${next.label.length > 22 ? `${next.label.slice(0, 21)}…` : next.label}`
    : nextPage
      ? `Ride to ${nextPage.label}`
      : "Back to the start";

  const go = () => {
    if (next) next.el.scrollIntoView({ behavior, block: "start" });
    else if (nextPage) router.push(nextPage.href);
    else window.scrollTo({ top: 0, behavior });
  };

  const toggle = () => {
    setHint(false);
    setAlignRight(progress.current > 0.55);
    setOpen((o) => !o);
  };

  return (
    <div
      ref={roadRef}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[35] h-[4.25rem] print:hidden"
    >
      <div aria-hidden="true" className="road-line absolute inset-x-0 bottom-0" />
      <div className="absolute bottom-[8px]" style={{ left: "calc((100% - 6.75rem) * var(--p, 0))" }}>
        <button
          ref={btnRef}
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-controls="ride-panel"
          aria-label={open ? "Close the ride guide" : "Open the ride guide. Rev will take you through the site."}
          className="pointer-events-auto block h-[3.75rem] w-[6.75rem] cursor-pointer"
        >
          <RiderBike className="h-full w-full drop-shadow-md" />
        </button>

        {hint && !open && (
          <p
            aria-hidden="true"
            className={`eyebrow fixed bottom-[4.75rem] left-3 w-max max-w-[15rem] bg-asphalt px-3 py-2 normal-case tracking-normal text-porcelain shadow-xl sm:absolute sm:bottom-full sm:left-auto sm:mb-1 ${
              alignRight ? "sm:right-0" : "sm:left-0"
            }`}
          >
            Hi, I&apos;m Rev. Click me for a guided ride.
          </p>
        )}

        {open && (
          <div
            id="ride-panel"
            role="region"
            aria-label="Ride guide"
            className={`pointer-events-auto fixed inset-x-3 bottom-[4.75rem] border border-steel/25 bg-asphalt p-4 text-porcelain shadow-2xl sm:absolute sm:inset-x-auto sm:bottom-full sm:mb-2 sm:w-[19.5rem] ${
              alignRight ? "sm:right-0" : "sm:left-0"
            }`}
          >
            <p className="eyebrow text-signal">
              Route guide{stops.length > 0 ? ` · Stop ${active + 1} of ${stops.length}` : ""}
            </p>
            {current && <p className="display mt-2 text-2xl leading-none">{current.label}</p>}
            {current && (
              <p className="mt-2 text-sm text-steel">
                {tipFor(current.label) ?? (next ? `Next up: ${next.label}` : "That's the end of this page.")}
              </p>
            )}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={go}
                className="eyebrow inline-flex min-h-11 items-center bg-signal px-4 text-asphalt transition-colors hover:bg-porcelain"
              >
                {nextLabel} <span aria-hidden="true">&nbsp;→</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  btnRef.current?.focus();
                }}
                className="eyebrow inline-flex min-h-11 items-center px-3 text-steel underline underline-offset-4 hover:text-porcelain"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
