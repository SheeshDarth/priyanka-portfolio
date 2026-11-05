import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/content/projects";

type Variant = "feature" | "tall" | "band";

const shell: Record<Variant, string> = {
  feature: "on-dark bg-asphalt text-porcelain p-7 md:p-12 min-h-[26rem] card-lift",
  tall: "bg-paper border border-graphite/20 p-7 md:p-10 card-lift",
  band: "border-y border-graphite/30 py-10 md:py-12 grid gap-6 md:grid-cols-[1fr_1.3fr] md:gap-12",
};

export function ProjectCard({
  project,
  index,
  variant,
  as: Heading = "h3",
}: {
  project: Project;
  index: number;
  variant: Variant;
  as?: "h2" | "h3";
}) {
  const dark = variant === "feature";
  const num = String(index + 1).padStart(2, "0");
  const shot = project.screens?.[0];
  const flow = project.architecture?.steps;

  return (
    <article
      className={`group relative flex flex-col has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-signal-ink ${shell[variant]}`}
    >
      {dark && (
        <span
          aria-hidden="true"
          className="display pointer-events-none absolute right-5 top-2 select-none text-[9rem] leading-none text-graphite/70 md:text-[13rem]"
        >
          {num}
        </span>
      )}
      <div className={variant === "band" ? "" : "relative flex flex-1 flex-col"}>
        <p className={`eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 ${dark ? "text-steel" : "text-muted"}`}>
          {!dark && <span className="text-signal-ink">{num}</span>}
          <span>{project.tag}</span>
          <span aria-hidden="true">·</span>
          <span className={dark ? "text-signal" : "text-signal-ink"}>{project.statusLabel}</span>
        </p>
        <Heading
          className={`display mt-4 ${
            variant === "feature" ? "text-5xl md:text-7xl" : variant === "tall" ? "text-4xl md:text-5xl" : "text-4xl md:text-6xl"
          }`}
        >
          <Link href={`/work/${project.slug}`} className="stretch outline-none">
            {project.name}
          </Link>
        </Heading>
        {variant === "tall" && flow && (
          <p aria-hidden="true" className="mt-5 border-l-2 border-signal-ink pl-3 font-mono text-xs leading-6 text-graphite">
            {flow.map((s) => s.label).join(" → ")}
          </p>
        )}
        {shot && variant !== "tall" && (
          <div
            className={`relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-md border ${
              dark ? "border-steel/20" : "border-graphite/25"
            } ${variant === "band" ? "max-w-md" : ""}`}
          >
            <Image
              src={shot.src}
              alt=""
              fill
              sizes={variant === "feature" ? "(min-width: 1024px) 45vw, 90vw" : "(min-width: 768px) 28rem, 90vw"}
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        )}
      </div>
      <div className={variant === "band" ? "" : "relative mt-6"}>
        <p className={`prose-measure ${dark ? "text-steel" : "text-graphite"}`}>{project.teaser}</p>
        <p className={`eyebrow mt-5 leading-6 ${dark ? "text-steel" : "text-muted"}`}>{project.stack.slice(0, 7).join(" / ")}</p>
        <p className={`eyebrow mt-6 inline-flex items-center gap-2 ${dark ? "text-signal" : "text-signal-ink"}`}>
          Read case study
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </p>
      </div>
    </article>
  );
}
