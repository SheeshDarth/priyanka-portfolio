import { Hero } from "@/components/sections/Hero";
import {
  FeaturedWork,
  Method,
  ExperienceSection,
  OpenRoad,
  Recognition,
  Closing,
} from "@/components/sections/Sections";
import { JourneyRail } from "@/components/motion/JourneyRail";
import { site } from "@/content/site";
import { links, isLive } from "@/content/links";

const railItems = [
  { id: "top", label: "Intro" },
  { id: "work", label: "Work" },
  { id: "approach", label: "Approach" },
  { id: "experience", label: "Experience" },
  { id: "road", label: "Open road" },
  { id: "contact", label: "Contact" },
];

export default function Home() {
  // Only verified facts and approved public URLs.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.title,
    worksFor: { "@type": "Organization", name: "Subhanu Technologies & Solutions Pvt Ltd" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "B.N.M. Institute of Technology" },
    sameAs: [links.github, links.linkedin].filter(isLive).map((l) => l.href),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <JourneyRail items={railItems} />
      <Hero />
      <FeaturedWork />
      <Method />
      <ExperienceSection />
      <OpenRoad />
      <Recognition />
      <Closing />
    </>
  );
}
