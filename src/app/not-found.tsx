import Link from "next/link";

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="wrap py-24 md:py-36">
      <p className="eyebrow text-signal-ink">404</p>
      <h1 id="nf-title" className="display mt-3 text-[clamp(4rem,14vw,11rem)] leading-[0.85]">
        Off the route.
      </h1>
      <p className="prose-measure mt-6 text-lg text-graphite">That page doesn&apos;t exist. Here are the ones that do.</p>
      <p className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
        <Link href="/" className="eyebrow inline-flex min-h-12 items-center bg-asphalt px-7 text-porcelain hover:bg-signal-ink">
          Home
        </Link>
        <Link href="/work" className="eyebrow link-underline inline-flex min-h-12 items-center">
          Work
        </Link>
      </p>
    </section>
  );
}
