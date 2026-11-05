import type { Metadata } from "next";
import { links, isLive } from "@/content/links";
import { ExtLink } from "@/components/ui/ExtLink";
import { ResumeLink } from "@/components/ui/Bits";

export const metadata: Metadata = {
  title: "Contact",
  description: "How to reach Priyanka H.",
};

const rowClass =
  "display flex min-h-20 items-center justify-between gap-4 py-4 text-4xl transition-colors hover:text-signal-ink md:text-6xl";

export default function Contact() {
  const channels = [links.linkedin, links.github, links.email].filter(isLive);
  return (
    <section aria-labelledby="contact-title" className="wrap pb-24 pt-12 md:pt-20">
      <p className="eyebrow rise text-signal-ink">Contact</p>
      <h1
        id="contact-title"
        className="display rise mt-3 max-w-[12ch] text-[clamp(3.5rem,11vw,9rem)] leading-[0.88]"
        style={{ ["--d" as string]: "80ms" }}
      >
        Let&apos;s talk.
      </h1>
      <p className="prose-measure mt-6 text-lg text-graphite">
        If you have a project, a role, or a question about anything on this site, the best place to reach me is
        LinkedIn. The code behind some of the work is on GitHub, and my résumé is a click away.
      </p>
      <ul className="m-0 mt-12 list-none border-t-2 border-graphite p-0">
        {channels.map((c) => (
          <li key={c.label} className="border-b border-graphite/30">
            <ExtLink link={c} className={rowClass} />
          </li>
        ))}
        {isLive(links.resume) && (
          <li className="border-b border-graphite/30">
            <ResumeLink className={rowClass}>Download résumé</ResumeLink>
          </li>
        )}
      </ul>
    </section>
  );
}
