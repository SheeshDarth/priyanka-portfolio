import Image from "next/image";
import type { Screen } from "@/content/projects";

/** A screenshot in a browser (or phone) frame. Renders nothing without an approved screenshot. */
export function BrowserFrame({
  shot,
  host,
  priority = false,
  sizes = "(min-width: 1024px) 60vw, 100vw",
  className,
}: {
  shot?: Screen;
  host?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  if (!shot) return null;
  const mobile = shot.kind === "mobile";
  return (
    <figure className={`m-0 ${className ?? ""}`}>
      <div
        className={`overflow-hidden bg-asphalt shadow-[0_28px_60px_-24px_rgba(11,18,32,0.55)] ${
          mobile ? "mx-auto max-w-[16rem] rounded-[2rem] border-[7px] border-asphalt" : "rounded-xl border border-graphite/30"
        }`}
      >
        {!mobile && (
          <div className="flex items-center gap-3 border-b border-steel/15 bg-graphite px-4 py-2.5">
            <span aria-hidden="true" className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-signal" />
              <span className="h-2.5 w-2.5 rounded-full bg-steel/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-steel/30" />
            </span>
            {host && (
              <span className="eyebrow truncate rounded-sm bg-asphalt/60 px-3 py-1 normal-case tracking-normal text-steel">
                {host}
              </span>
            )}
          </div>
        )}
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          sizes={mobile ? "256px" : sizes}
          priority={priority}
          className="h-auto w-full"
        />
      </div>
      {shot.caption && <figcaption className="eyebrow mt-3 text-muted">{shot.caption}</figcaption>}
    </figure>
  );
}
