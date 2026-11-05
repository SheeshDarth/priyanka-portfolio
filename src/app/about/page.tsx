import type { Metadata } from "next";
import { Method, ExperienceSection, OpenRoad, Recognition, EducationBlock, Closing } from "@/components/sections/Sections";

export const metadata: Metadata = {
  title: "About",
  description:
    "Priyanka H. is a final-year Information Science & Engineering student and Forward Deployed Engineer intern who works close to the problem.",
};

export default function About() {
  return (
    <>
      <section aria-labelledby="about-title" className="wrap pb-16 pt-12 md:pb-24 md:pt-20">
        <p className="eyebrow text-signal-ink">About</p>
        <h1 id="about-title" className="display mt-3 max-w-[12ch] text-[clamp(3.5rem,11vw,9rem)] leading-[0.88]">
          I work close to the problem.
        </h1>
        <div className="prose-measure mt-8 space-y-4 text-lg text-graphite">
          <p>
            I&apos;m Priyanka, a final-year Information Science &amp; Engineering student and a Forward Deployed
            Engineer intern. I work close to the problem: understanding requirements, making technical decisions,
            and testing what ships.
          </p>
          <p>
            So far that has meant a live e-commerce platform for a freelance client, an AI marketing automation
            backend, and a blockchain-based supply chain platform, built with a spec-driven workflow and human review
            of all AI-assisted output.
          </p>
        </div>
      </section>
      <Method id="approach" num="01" />
      <ExperienceSection id="experience" num="02" />
      <EducationBlock />
      <Recognition />
      <OpenRoad id="road" num="03" />
      <Closing />
    </>
  );
}
