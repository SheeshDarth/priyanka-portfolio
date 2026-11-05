import Link from "next/link";
import { projects, upcoming } from "@/content/projects";
import { experience, capabilities, method, achievements, education, spokenLanguages } from "@/content/profile";
import { media } from "@/content/media";
import { LinkedText, ResumeLink, SocialLinks } from "@/components/ui/Bits";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { ProjectCard } from "@/components/projects/ProjectCard";

export function SectionHeading({
  num,
  kicker,
  title,
  id,
  as: H = "h2",
}: {
  num?: string;
  kicker: string;
  title: string;
  id: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className="mb-10 md:mb-14">
      <p className="eyebrow text-signal-ink">
        {num && <span className="mr-3">{num}</span>}
        {kicker}
      </p>
      <H id={id} className="display reveal mt-3 max-w-[18ch] text-5xl md:text-7xl">
        {title}
      </H>
    </div>
  );
}

export function FeaturedWork() {
  const [coorg, campaign, verifarm] = projects;
  if (!coorg || !campaign || !verifarm) return null;
  return (
    <section id="work" aria-labelledby="work-h" className="wrap wrap-rail py-20 md:py-28">
      <SectionHeading id="work-h" num="01" kicker="Selected work" title="Three projects, three kinds of problem." />
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ProjectCard project={coorg} index={0} variant="feature" />
        </div>
        <div className="lg:col-span-5">
          <ProjectCard project={campaign} index={1} variant="tall" />
        </div>
        <div className="lg:col-span-12">
          <ProjectCard project={verifarm} index={2} variant="band" />
        </div>
      </div>
      <p className="mt-8">
        <Link href="/work" className="eyebrow link-underline inline-flex min-h-11 items-center">
          All work, including what&apos;s in progress →
        </Link>
      </p>
    </section>
  );
}

export function Method({ id = "approach", num = "02", headingAs }: { id?: string; num?: string; headingAs?: "h1" | "h2" }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="border-y border-graphite/15 bg-paper py-20 md:py-28">
      <div className="wrap wrap-rail">
        <SectionHeading
          id={`${id}-h`}
          num={num}
          kicker="How I work"
          title="From the problem to the delivered product."
          as={headingAs}
        />
        <ol className="m-0 grid list-none gap-x-6 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {method.map((m) => (
            <li key={m.n} className="border-t-2 border-graphite pt-4">
              <p className="eyebrow text-signal-ink">{m.n}</p>
              <h3 className="display mt-2 text-3xl">{m.title}</h3>
              <p className="mt-3 text-sm text-muted">{m.body}</p>
            </li>
          ))}
        </ol>
        <p className="prose-measure mt-12 border-l-2 border-signal-ink pl-4 text-lg text-graphite">
          AI assists the build. A person reviews and tests everything it produces before it reaches a client.
        </p>
      </div>
    </section>
  );
}

export function ExperienceSection({ id = "experience", num = "03" }: { id?: string; num?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="wrap wrap-rail py-20 md:py-28">
      <SectionHeading id={`${id}-h`} num={num} kicker="Experience & capabilities" title="Where the work happened." />
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <ol className="m-0 list-none p-0">
          {experience.map((e) => (
            <li key={e.role} className="border-t border-graphite/30 py-8 first:border-t-2 first:border-graphite">
              <p className="eyebrow text-signal-ink">{e.period}</p>
              <h3 className="display mt-2 text-3xl md:text-4xl">{e.role}</h3>
              <p className="mt-1 text-muted">{e.org}</p>
              <p className="mt-4 text-graphite">{e.summary}</p>
              {e.points.length > 0 && (
                <ul className="mt-3 list-disc space-y-1 pl-5 text-graphite marker:text-signal-ink">
                  {e.points.map((p) => (
                    <li key={p}>
                      <LinkedText text={p} />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
        <div>
          <h3 className="eyebrow border-b-2 border-graphite pb-3 text-asphalt">Capabilities, with where they were used</h3>
          <dl className="m-0">
            {capabilities.map((c) => (
              <div key={c.group} className="border-b border-graphite/30 py-6">
                <dt className="display text-2xl">{c.group}</dt>
                <dd className="m-0 mt-2 text-graphite">{c.items.join(" · ")}</dd>
                <dd className="eyebrow m-0 mt-2 text-muted">{c.evidence}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export function OpenRoad({ id = "road", num = "04", headingAs }: { id?: string; num?: string; headingAs?: "h1" | "h2" }) {
  const H = headingAs ?? "h2";
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="on-dark relative overflow-hidden bg-asphalt py-24 text-porcelain md:py-36">
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 w-full text-graphite md:h-72"
      >
        <path d="M-20 330 C 300 150, 700 420, 1460 120" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M-20 390 C 300 210, 700 480, 1460 180" fill="none" stroke="currentColor" strokeWidth="2" />
        <path
          d="M-20 360 C 300 180, 700 450, 1460 150"
          fill="none"
          stroke="#f04438"
          strokeWidth="2"
          strokeDasharray="14 18"
        />
      </svg>
      <div className="wrap wrap-rail relative">
        <p className="eyebrow text-signal">
          <span className="mr-3">{num}</span>Beyond the code
        </p>
        <H id={`${id}-h`} className="display mt-3 max-w-[14ch] text-[clamp(3.5rem,11vw,9rem)] leading-[0.88]">
          Beyond the build, there&apos;s the open road.
        </H>
        <p className="mt-8 max-w-xl text-xl text-steel">Outside of engineering, I ride.</p>
        {media.riding.length > 0 && (
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {media.riding.map((img) => (
              <MediaSlot key={img.src} image={img} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function Recognition() {
  const items = achievements.map((a) => {
    const [event = a, result = ""] = a.split(" — ");
    return { event, result };
  });
  return (
    <section aria-labelledby="recognition-h" className="wrap wrap-rail py-20 md:py-24">
      <h2 id="recognition-h" className="eyebrow text-signal-ink">
        Recognition
      </h2>
      <ul className="m-0 mt-6 grid list-none gap-0 border-t-2 border-graphite p-0 md:grid-cols-3">
        {items.map((i) => (
          <li key={i.event} className="border-b border-graphite/30 py-6 md:border-b-0 md:pr-6">
            <p className="display text-3xl">{i.event}</p>
            <p className="eyebrow mt-2 text-muted">{i.result}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function EducationBlock() {
  return (
    <section aria-labelledby="edu-h" className="wrap wrap-rail py-20 md:py-24">
      <h2 id="edu-h" className="eyebrow text-signal-ink">
        Education & languages
      </h2>
      <dl className="m-0 mt-6 grid gap-8 border-t-2 border-graphite pt-6 md:grid-cols-3">
        <div>
          <dt className="eyebrow text-muted">Degree</dt>
          <dd className="m-0 mt-2">
            <span className="display block text-3xl">{education.degree}</span>
            <span className="text-graphite">
              {education.school}, {education.period}
            </span>
          </dd>
        </div>
        <div>
          <dt className="eyebrow text-muted">CGPA</dt>
          <dd className="display m-0 mt-2 text-5xl">{education.cgpa}</dd>
        </div>
        <div>
          <dt className="eyebrow text-muted">Spoken languages</dt>
          <dd className="m-0 mt-2 text-graphite">{spokenLanguages.join(", ")}</dd>
        </div>
      </dl>
    </section>
  );
}

export function InProgress() {
  return (
    <article className="border-y border-dashed border-graphite/40 py-8 md:grid md:grid-cols-[1fr_1.3fr] md:gap-12 md:py-10">
      <div>
        <p className="eyebrow text-muted">
          <span className="text-signal-ink">{upcoming.status}</span>
        </p>
        <h2 className="display mt-3 text-3xl md:text-4xl">{upcoming.name}</h2>
      </div>
      <p className="mt-3 max-w-xl text-graphite md:mt-0">{upcoming.body}</p>
    </article>
  );
}

export function Closing({ id = "contact" }: { id?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="wrap wrap-rail py-20 md:py-28">
      <p className="eyebrow text-signal-ink">05 · Get in touch</p>
      <h2 id={`${id}-h`} className="display mt-3 max-w-[16ch] text-5xl md:text-7xl">
        If this is close to what you&apos;re building, say hello.
      </h2>
      <p className="prose-measure mt-6 text-lg text-graphite">
        The best place to reach me right now is LinkedIn. My GitHub has some of the code behind the work above, and
        my résumé is one click away.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          href="/contact"
          className="eyebrow btn inline-flex min-h-12 items-center bg-asphalt px-7 text-porcelain hover:bg-signal-ink"
        >
          Contact →
        </Link>
        <ResumeLink className="eyebrow btn inline-flex min-h-12 items-center border border-graphite px-6 text-asphalt hover:border-signal-ink hover:text-signal-ink" />
        <SocialLinks className="eyebrow inline-flex min-h-12 items-center gap-2 px-3 hover:text-signal-ink" />
      </div>
    </section>
  );
}
