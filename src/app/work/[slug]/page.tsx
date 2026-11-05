import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject, liveLinks } from "@/content/projects";
import { Flow } from "@/components/projects/Flow";
import { BrowserFrame } from "@/components/projects/BrowserFrame";
import { JourneyRail } from "@/components/motion/JourneyRail";
import { ExtLink } from "@/components/ui/ExtLink";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return { title: `${p.name} — case study`, description: p.teaser };
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="display reveal mb-6 text-4xl md:text-5xl">
      {children}
    </h2>
  );
}

export default async function CaseStudy({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const next = getProject(p.nextSlug);
  const live = liveLinks(p);

  const hasContext = Boolean(p.context?.length || p.constraints?.length);
  const hasDecisions = Boolean(p.decisions?.length || p.build?.length);
  const sections = [
    { id: "overview", label: "Overview", show: true },
    { id: "screens", label: "The live product", show: Boolean(p.screens?.length) },
    { id: "context", label: "Context", show: hasContext },
    { id: "contribution", label: "My role", show: Boolean(p.contribution?.length) },
    { id: "architecture", label: "Architecture", show: Boolean(p.architecture) },
    { id: "decisions", label: "Decisions", show: hasDecisions },
    { id: "outcome", label: "Outcome", show: Boolean(p.outcome?.length) },
  ].filter((s) => s.show);

  const desktopShots = p.screens?.filter((s) => s.kind !== "mobile") ?? [];
  const mobileShots = p.screens?.filter((s) => s.kind === "mobile") ?? [];

  return (
    <>
      <JourneyRail items={sections} label="Case study sections" />
      <article className="wrap wrap-rail pb-24 pt-10 md:pt-16">
        <nav aria-label="Breadcrumb" className="eyebrow text-muted">
          <ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0">
            <li>
              <Link href="/work" className="link-underline inline-flex min-h-11 items-center hover:text-signal-ink">
                Work
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{p.name}</li>
          </ol>
        </nav>

        <header className="mt-4">
          <p className="eyebrow rise text-signal-ink">
            {p.tag} · {p.statusLabel}
          </p>
          <h1 className="display rise mt-3 text-[clamp(3.25rem,10vw,8.5rem)] leading-[0.88]" style={{ ["--d" as string]: "80ms" }}>
            {p.name}
          </h1>
          <p className="display rise mt-5 max-w-[24ch] text-3xl text-graphite md:text-4xl" style={{ ["--d" as string]: "160ms" }}>
            {p.framing}
          </p>
          <dl className="mt-10 grid gap-6 border-t-2 border-graphite pt-6 md:grid-cols-[1.2fr_1.8fr]">
            <div>
              <dt className="eyebrow text-muted">Role</dt>
              <dd className="m-0 mt-2 text-graphite">{p.role}</dd>
            </div>
            <div>
              <dt className="eyebrow text-muted">Stack</dt>
              <dd className="m-0 mt-2 font-mono text-sm leading-7 text-graphite">{p.stack.join(" / ")}</dd>
            </div>
          </dl>
          {live.length > 0 && (
            <p className="mt-6 flex flex-wrap gap-3">
              {live.map((l, i) => (
                <ExtLink
                  key={l.href}
                  link={l}
                  className={`eyebrow btn inline-flex min-h-12 items-center px-6 ${
                    i === 0
                      ? "bg-asphalt text-porcelain hover:bg-signal-ink"
                      : "border border-graphite text-asphalt hover:border-signal-ink hover:text-signal-ink"
                  }`}
                />
              ))}
            </p>
          )}
        </header>

        <details className={`mt-10 border border-graphite/30 lg:hidden ${sections.length < 3 ? "hidden" : ""}`}>
          <summary className="eyebrow flex min-h-12 cursor-pointer items-center px-4">On this page</summary>
          <ul className="m-0 list-none p-0 pb-2">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="eyebrow flex min-h-11 items-center px-4 hover:text-signal-ink">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </details>

        <div className="mt-16 space-y-20 md:mt-20 md:space-y-28">
          <section aria-labelledby="overview" className="max-w-3xl">
            <H2 id="overview">Overview</H2>
            <div className="space-y-4 text-lg text-graphite">
              {p.overview.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
            {p.note && <p className="eyebrow mt-8 border-l-2 border-signal-ink pl-4 normal-case leading-6 tracking-normal text-muted">{p.note}</p>}
          </section>

          {p.screens && p.screens.length > 0 && (
            <section aria-labelledby="screens" className="max-w-5xl">
              <H2 id="screens">The live product</H2>
              <p className="prose-measure mb-10 text-graphite">
                Screenshots of the deployed site{p.host ? ` at ${p.host}` : ""}, with contact details cropped out.
              </p>
              <div className="grid gap-10 md:gap-14">
                {desktopShots.map((s, i) => (
                  <BrowserFrame key={s.src} shot={s} host={p.host} priority={i === 0} className="reveal" />
                ))}
                {mobileShots.map((s) => (
                  <BrowserFrame key={s.src} shot={s} className="reveal" />
                ))}
              </div>
            </section>
          )}

          {hasContext && (
            <section aria-labelledby="context" className="max-w-3xl">
              <H2 id="context">Context and constraints</H2>
              <div className="space-y-4 text-graphite">
                {p.context?.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
              {p.constraints && (
                <ul className="m-0 mt-8 list-none space-y-6 p-0">
                  {p.constraints.map((c) => (
                    <li key={c.title} className="border-l-2 border-signal-ink pl-4">
                      <h3 className="font-semibold">{c.title}</h3>
                      <p className="mt-1 text-graphite">{c.body}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {p.contribution && p.contribution.length > 0 && (
            <section aria-labelledby="contribution" className="max-w-3xl">
              <H2 id="contribution">My contribution</H2>
              <ul className="list-disc space-y-2 pl-5 text-graphite marker:text-signal-ink">
                {p.contribution.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </section>
          )}

          {p.architecture && (
            <section aria-labelledby="architecture" className="max-w-4xl">
              <H2 id="architecture">Architecture</H2>
              <figure className="m-0">
                <figcaption className="eyebrow mb-8 text-muted">
                  <span className="text-asphalt">{p.architecture.title}.</span> {p.architecture.caption}
                </figcaption>
                <Flow steps={p.architecture.steps} />
              </figure>
            </section>
          )}

          {hasDecisions && (
            <section aria-labelledby="decisions" className="max-w-3xl">
              <H2 id="decisions">Technical decisions and build</H2>
              {p.decisions && (
                <ol className="m-0 list-none space-y-8 p-0">
                  {p.decisions.map((d, i) => (
                    <li key={d.title} className="grid grid-cols-[2.5rem_1fr] gap-x-4">
                      <span className="eyebrow pt-2 text-signal-ink">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <h3 className="display text-2xl md:text-3xl">{d.title}</h3>
                        <p className="mt-2 text-graphite">{d.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              )}
              {p.snippet && (
                <figure className="m-0 mt-12">
                  <figcaption className="eyebrow mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-muted">
                    <span className="text-asphalt">{p.snippet.title}</span>
                    <ExtLink link={p.snippet.source} className="link-underline hover:text-signal-ink">
                      Excerpt from the public repository
                    </ExtLink>
                  </figcaption>
                  <pre
                    tabIndex={0}
                    aria-label={`${p.snippet.title}, code excerpt`}
                    className="on-dark m-0 overflow-x-auto rounded-md bg-asphalt p-5 font-mono text-[0.8125rem] leading-6 text-steel"
                  >
                    <code className={`language-${p.snippet.language}`}>{p.snippet.code}</code>
                  </pre>
                </figure>
              )}
              {p.build && p.build.length > 0 && (
                <>
                  <h3 className="eyebrow mt-12 border-b-2 border-graphite pb-3">What it&apos;s built with</h3>
                  <ul className="m-0 list-none p-0">
                    {p.build.map((b) => (
                      <li key={b} className="border-b border-graphite/20 py-3 text-graphite">
                        {b}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </section>
          )}

          {p.outcome && p.outcome.length > 0 && (
            <section aria-labelledby="outcome" className="max-w-3xl">
              <H2 id="outcome">Outcome</H2>
              <div className="space-y-4 text-lg text-graphite">
                {p.outcome.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
            </section>
          )}
        </div>

        {next && (
          <nav aria-label="Next project" className="mt-24 border-t-2 border-graphite pt-8">
            <p className="eyebrow text-muted">Next project</p>
            <Link
              href={`/work/${next.slug}`}
              className="display mt-3 inline-flex min-h-12 items-center gap-4 text-5xl hover:text-signal-ink md:text-7xl"
            >
              {next.name} <span aria-hidden="true">→</span>
            </Link>
          </nav>
        )}
      </article>
    </>
  );
}
