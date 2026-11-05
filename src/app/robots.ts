import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Until a real domain is set in src/content/site.ts, crawlers are told to stay out.
export default function robots(): MetadataRoute.Robots {
  if (!site.domain) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `https://${site.domain}/sitemap.xml`,
  };
}
