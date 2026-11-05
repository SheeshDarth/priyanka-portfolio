import Link from "next/link";
import { site } from "@/content/site";
import { media } from "@/content/media";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { ResumeLink, SocialLinks } from "@/components/ui/Bits";

const nodes = [
  { x: 500, y: 20, label: "brief", anchor: "end" as const },
  { x: 350, y: 140, label: "spec", anchor: "start" as const },
  { x: 400, y: 260, label: "build", anchor: "start" as const },
  { x: 250, y: 340, label: "review", anchor: "start" as const },
  { x: 300, y: 450, label: "test", anchor: "start" as const },
  { x: 80, y: 520, label: "ship", anchor: "middle" as const },
];

const route =
  "M500 20 C 440 30, 400 120, 350 140 S 440 210, 400 260 S 300 300, 250 340 S 330 410, 300 450 S 150 520, 80 520";

/** Decorative trajectory: the FDE delivery loop drawn as a route. */
function Trajectory() {
  return (
    <svg
      viewBox="0 0 520 560"
      aria-hidden="true"
      focusable="false"
      className="h-auto max-h-[26rem] w-full text-signal-ink lg:max-h-none"
    >
      <path d={route} fill="none" stroke="#334055" strokeOpacity="0.28" strokeWidth="1" strokeDasharray="2 6" />
      <path
        pathLength={1}
        className="trajectory"
        d={route}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {nodes.map((n, i) => (
        <g key={n.label} className="trajectory-node" style={{ animationDelay: `${0.5 + i * 0.32}s` }}>
          <circle
            cx={n.x}
            cy={n.y}
            r={i === nodes.length - 1 ? 9 : 6}
            fill={i === nodes.length - 1 ? "currentColor" : "#eef1f6"}
            stroke="currentColor"
            strokeWidth="2.5"
          />
          <text
            x={n.anchor === "middle" ? n.x : n.x + (n.anchor === "end" ? -16 : 16)}
            y={n.anchor === "middle" ? n.y + 34 : n.y + 4}
            textAnchor={n.anchor}
            fill="#0b1220"
            style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase" }}
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` });

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="grid-paper absolute inset-0 -z-10" />
      <div className="wrap wrap-rail pb-16 pt-10 md:pb-24 md:pt-16">
        <p className="eyebrow rise text-signal-ink">{site.title}</p>
        <h1
          id="hero-title"
          className="display rise mt-4 text-[clamp(4.5rem,17vw,13rem)] leading-[0.82] tracking-[-0.02em]"
          style={d(80)}
        >
          <span className="block md:inline">Priyanka</span>{" "}
          <span className="block text-signal-ink md:inline">H.</span>
        </h1>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-16">
          <div>
            <p className="display rise max-w-[20ch] text-4xl leading-[0.95] sm:text-5xl lg:text-6xl" style={d(200)}>
              {site.hero.headline}
            </p>
            <p className="prose-measure rise mt-6 text-lg text-graphite" style={d(320)}>
              {site.hero.support}
            </p>
            <div className="rise mt-8 flex flex-wrap items-center gap-3" style={d(440)}>
              <Link
                href="/work"
                className="eyebrow btn inline-flex min-h-12 items-center bg-asphalt px-7 text-porcelain hover:bg-signal-ink"
              >
                Explore my work →
              </Link>
              <ResumeLink className="eyebrow btn inline-flex min-h-12 items-center border border-graphite px-6 text-asphalt hover:border-signal-ink hover:text-signal-ink" />
              <Link href="/about" className="eyebrow link-underline inline-flex min-h-12 items-center px-2">
                About me
              </Link>
            </div>
            <p className="rise mt-2 flex flex-wrap gap-x-2" style={d(520)}>
              <SocialLinks className="eyebrow inline-flex min-h-11 items-center gap-2 pr-4 hover:text-signal-ink" />
            </p>
            <dl className="rise mt-10 grid gap-px border-t border-graphite/30 sm:grid-cols-3" style={d(600)}>
              {site.proof.map((p) => (
                <div key={p.k} className="border-b border-graphite/30 py-4 sm:border-b-0 sm:pr-4">
                  <dt className="eyebrow text-signal-ink">{p.k}</dt>
                  <dd className="m-0 mt-1 text-sm text-graphite">{p.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mx-auto w-full max-w-md lg:max-w-none">
            {media.portrait ? <MediaSlot image={media.portrait} priority /> : <Trajectory />}
          </div>
        </div>
      </div>
    </section>
  );
}
