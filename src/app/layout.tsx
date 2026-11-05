import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RideGuide } from "@/components/mascot/RideGuide";
import { site } from "@/content/site";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});
const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  // Canonical/metadataBase only once a real domain is supplied (src/content/site.ts).
  ...(site.domain ? { metadataBase: new URL(`https://${site.domain}`) } : {}),
  title: { default: `${site.name} — ${site.title}`, template: `%s — ${site.name}` },
  description: site.description,
  // Keep previews out of search indexes until a domain is set.
  robots: site.domain ? undefined : { index: false, follow: false },
  openGraph: {
    title: `${site.name} — ${site.title}`,
    description: site.description,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#0b1220", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlow.variable} ${plex.variable} ${plexMono.variable}`}>
      <body>
        <a
          href="#main"
          className="eyebrow sr-only z-50 bg-asphalt px-4 py-3 text-porcelain focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <RideGuide />
      </body>
    </html>
  );
}
