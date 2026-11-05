import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

// Empty until a real domain exists, so no guessed URLs are published.
export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.domain) return [];
  const base = `https://${site.domain}`;
  return [
    "",
    "/work",
    "/about",
    "/contact",
    ...projects.map((p) => `/work/${p.slug}`),
  ].map((path) => ({ url: `${base}${path}` }));
}
