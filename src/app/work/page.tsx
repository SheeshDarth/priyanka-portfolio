import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { InProgress, Closing } from "@/components/sections/Sections";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work by Priyanka H.: a live e-commerce platform, a multi-agent AI marketing backend and a blockchain supply-chain platform.",
};

export default function WorkIndex() {
  return (
    <>
      <section aria-labelledby="work-title" className="wrap pb-12 pt-12 md:pt-20">
        <p className="eyebrow text-signal-ink">Selected work</p>
        <h1 id="work-title" className="display mt-3 max-w-[14ch] text-[clamp(3.5rem,11vw,9rem)] leading-[0.88]">
          Work that shipped, and work in progress.
        </h1>
        <p className="prose-measure mt-6 text-lg text-graphite">
          Each case study covers the problem, what I was responsible for, and the technical decisions behind it.
        </p>
      </section>
      <section aria-label="Projects" className="wrap pb-20">
        <div className="flex flex-col gap-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} variant="band" as="h2" />
          ))}
          <InProgress />
        </div>
      </section>
      <Closing id="contact" />
    </>
  );
}
