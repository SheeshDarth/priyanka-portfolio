export const site = {
  name: "Priyanka H.",
  shortName: "Priyanka",
  title: "Forward Deployed Engineer Intern",
  description:
    "Priyanka H. is a Forward Deployed Engineer intern who turns client requirements into working websites, web apps and AI-backed backend systems.",
  /** Set only when a real domain exists. Used for canonical URLs, sitemap and OG. */
  domain: undefined as string | undefined,
  hero: {
    headline: "I turn real-world requirements into working software.",
    support:
      "I'm a Forward Deployed Engineer intern who works directly with clients: gathering requirements, writing the spec, building the product, and testing what ships. From a live e-commerce store to a multi-agent AI backend.",
  },
  proof: [
    { k: "Role", v: "FDE intern, Subhanu Technologies" },
    { k: "Live", v: "Client e-commerce store taking orders" },
    { k: "Backend", v: "Multi-agent AI system on Cloud Run" },
  ],
  nav: [
    { href: "/work", label: "Work" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
} as const;
