"use client";

import { useEffect, useRef, useState } from "react";

type Item = { id: string; label: string };

/**
 * Signature interaction: the Journey Line.
 *
 * - lg+: a fixed vertical rail. Ticks are real anchor links (keyboard + SR friendly);
 *   a signal line fills as you move through the sections.
 * - <lg: a thin progress bar under the header (decorative).
 *
 * Native scrolling only. Progress is written to a CSS variable in rAF; with
 * `prefers-reduced-motion` there is no smoothing, the fill just tracks scroll.
 */
export function JourneyRail({ items, label = "Page sections" }: { items: Item[]; label?: string }) {
  const [active, setActive] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      const tops = items.map(({ id }) => document.getElementById(id)?.getBoundingClientRect().top ?? Infinity);

      let current = -1;
      for (let i = 0; i < tops.length; i++) if ((tops[i] ?? Infinity) <= line) current = i;

      let progress = 0;
      if (current >= 0) {
        const last = items.length - 1;
        if (current >= last) progress = 1;
        else {
          const a = tops[current] ?? 0;
          const b = tops[current + 1] ?? a + 1;
          const frac = Math.min(1, Math.max(0, (line - a) / Math.max(1, b - a)));
          progress = (current + frac) / last;
        }
      }
      railRef.current?.style.setProperty("--p", progress.toFixed(4));
      setActive(Math.max(0, current));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items]);

  const last = Math.max(1, items.length - 1);
  // A rail with one or two stops adds nothing.
  if (items.length < 3) return null;

  return (
    <>
      {/* Desktop: vertical rail (small screens use Rev, the bottom ride guide) */}
      <nav aria-label={label} className="fixed left-5 top-1/2 z-30 hidden -translate-y-1/2 lg:block">
        <div ref={railRef} className="relative h-[min(46vh,22rem)] w-10">
          <span aria-hidden="true" className="absolute left-[19px] top-0 h-full w-px bg-graphite/25" />
          <span aria-hidden="true" className="rail-fill absolute left-[19px] top-0 h-full w-px bg-signal-ink" />
          <ol className="m-0 list-none p-0">
            {items.map((item, i) => {
              const isActive = i === active;
              return (
                <li
                  key={item.id}
                  className="absolute left-0"
                  style={{ top: `${(i / last) * 100}%`, transform: "translateY(-50%)" }}
                >
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className="group flex h-8 items-center gap-3 rounded-sm"
                  >
                    <span aria-hidden="true" className="grid h-8 w-10 place-items-center">
                      <span
                        className={`block rounded-full border-2 transition-all duration-200 ${
                          isActive
                            ? "h-3.5 w-3.5 border-signal-ink bg-signal-ink"
                            : "h-2.5 w-2.5 border-graphite bg-porcelain group-hover:border-signal-ink"
                        }`}
                      />
                    </span>
                    <span
                      className={`eyebrow whitespace-nowrap rounded-sm bg-porcelain px-2 py-0.5 text-asphalt transition-opacity ${
                        "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                      }`}
                    >
                      <span className="text-signal-ink">{String(i + 1).padStart(2, "0")}</span> {item.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
}
