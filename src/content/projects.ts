import { links, isLive, type ApprovedLink } from "./links";

export type ProjectStatus = "live" | "deployed" | "project" | "in-progress";

export type FlowStep = { label: string; detail: string };

export type Screen = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  kind?: "desktop" | "mobile";
};

export type Project = {
  slug: string;
  name: string;
  /** Short category tag, e.g. "Commerce". */
  tag: string;
  status: ProjectStatus;
  statusLabel: string;
  /** Creative framing line used as the case-study subtitle. */
  framing: string;
  /** ~30-word teaser for cards. */
  teaser: string;
  overview: string[];
  role: string;
  stack: string[];
  /** Shown beneath the overview, e.g. why detail is limited. */
  note?: string;
  /** Hostname shown in the browser frame. */
  host?: string;
  /** Approved screenshots of the real, deployed product. */
  screens?: Screen[];
  /** A short excerpt of public source code, with attribution. */
  snippet?: { title: string; source: ApprovedLink; language: string; code: string };
  // Everything below is optional: sections without content are simply not rendered.
  context?: string[];
  contribution?: string[];
  constraints?: { title: string; body: string }[];
  architecture?: { title: string; caption: string; steps: FlowStep[] };
  decisions?: { title: string; body: string }[];
  build?: string[];
  outcome?: string[];
  /** Only links with a real href are ever rendered. */
  links: ApprovedLink[];
  nextSlug: string;
};

export const projects: Project[] = [
  {
    slug: "coorg-coffee-crafted",
    name: "Coorg Coffee Crafted",
    tag: "Commerce",
    status: "live",
    statusLabel: "Live · client project",
    framing: "From client brief to a live commerce platform.",
    teaser:
      "A live e-commerce store for a Coorg coffee brand: server-rendered storefront, multi-variant catalogue, verified Razorpay payments and an admin dashboard for running the business.",
    overview: [
      "Coorg Coffee Crafted is a storefront I built and launched for a client. It sells single-origin and filter coffee online, with products that come in different weights, prices and stock levels.",
      "I handled the project end to end: requirements, design, development, payments integration, deployment and ongoing client communication. It is live and already receiving orders.",
    ],
    role: "Freelance full-stack developer: requirements through to deployment and client communication.",
    stack: ["React", "TypeScript", "TanStack Start", "Firebase", "Razorpay", "Cloud Functions", "Tailwind CSS"],
    host: "coorgcoffees.in",
    screens: [
      {
        src: "/images/projects/coorg-home-desktop.jpg",
        alt: "The Coorg Coffee home page: a dark storefront with the brand name, a tagline about shade-grown estate coffee, Shop Now and Our Story buttons, and a photo of a coffee pouch beside beans and a cup.",
        width: 1440,
        height: 800,
        caption: "Home page, desktop",
      },
      {
        src: "/images/projects/coorg-categories-desktop.jpg",
        alt: "The Coorg Coffee category section: three collections, AA Grade Beans, 100% Coffee Powder and Filter Coffee Powder, with filter tabs and variant counts.",
        width: 1440,
        height: 880,
        caption: "Catalogue by category, desktop",
      },
      {
        src: "/images/projects/coorg-home-mobile.jpg",
        alt: "The Coorg Coffee home page on a phone: stacked headline, trust icons, Shop Now button and the product photo.",
        width: 780,
        height: 1400,
        caption: "Home page, mobile",
        kind: "mobile",
      },
    ],
    snippet: {
      title: "Verifying a payment on the server",
      source: links.coorgRepo,
      language: "ts",
      code: `// src/server/razorpay-handlers.ts · handleVerifyPayment (excerpt)
const { key_secret } = getCredentials();

const expectedSignature = crypto
  .createHmac('sha256', key_secret)
  .update(\`\${orderId}|\${paymentId}\`)
  .digest('hex');

const expectedBuf = Buffer.from(expectedSignature, 'utf-8');
const actualBuf = Buffer.from(signature, 'utf-8');

const isValid =
  expectedBuf.length === actualBuf.length &&
  crypto.timingSafeEqual(expectedBuf, actualBuf);`,
    },
    context: [
      "The client needed to sell coffee online rather than through direct messages. The live catalogue today lists ten products across three categories (whole beans, pure coffee powder and filter coffee powder), each with its own pack sizes and prices.",
      "That shape matters technically: a product is not one price. It is a set of variants, each with its own weight, price and stock.",
    ],
    contribution: [
      "Gathered requirements from the client and turned them into a build plan.",
      "Designed and built the storefront, admin dashboard and backend functions.",
      "Integrated Razorpay payments and deployed the platform.",
      "Stays in contact with the client as the business uses it.",
    ],
    constraints: [
      {
        title: "Money must not be trusted from the browser",
        body: "A customer's browser can be edited. Neither the price of an order nor the claim that a payment succeeded can be taken on its word.",
      },
      {
        title: "Variants, not products",
        body: "Weight, price and stock vary per variant, so the catalogue and the checkout both have to reason about variants.",
      },
      {
        title: "A business has to run it",
        body: "The owner needs to manage orders, stock, reviews and shipping without touching code.",
      },
    ],
    architecture: {
      title: "Storefront → verified payment → fulfilment",
      caption:
        "Conceptual diagram based on the implementation details in my résumé. It shows the shape of the flow, not every service.",
      steps: [
        { label: "Storefront", detail: "Server-rendered React pages with type-safe routing, reading a Firestore catalogue of multi-variant products." },
        { label: "Order & payment", detail: "Pricing is decided on the server. Razorpay handles the payment." },
        { label: "Signature check", detail: "The server verifies the payment's HMAC-SHA256 signature before an order is marked paid." },
        { label: "Automation", detail: "Cloud Functions send order emails, SMS and alerts." },
        { label: "Admin dashboard", detail: "Orders, inventory, review moderation, analytics and DTDC shipping in one place." },
      ],
    },
    decisions: [
      {
        title: "Server-side HMAC-SHA256 payment verification",
        body: "Razorpay signs the result of a payment. The server recomputes that signature with a secret the browser never sees and compares it, using a constant-time comparison. Payment status and pricing are therefore never trusted from the client, so a customer cannot mark their own order as paid or edit what it costs. The excerpt below is from the public repository.",
      },
      {
        title: "A catalogue modelled around variants",
        body: "Products carry multiple variants (weight, price, stock) in Firestore, so stock and price are always tied to the exact thing a customer buys.",
      },
      {
        title: "Server-rendered storefront with type-safe routing",
        body: "TanStack Start renders pages on the server, and TypeScript keeps routes and data shapes consistent from catalogue to checkout.",
      },
      {
        title: "Automation for the boring-but-critical parts",
        body: "Order emails, SMS and alerts are triggered by Cloud Functions, so the owner is told about orders without watching a dashboard.",
      },
    ],
    build: [
      "React, TypeScript and TanStack Start for the storefront.",
      "Firebase: Firestore for the catalogue and orders, Cloud Functions for automation, Storage and Hosting.",
      "Razorpay for payments, with server-side signature verification.",
      "Admin dashboard covering orders, inventory, review moderation, analytics and DTDC shipping.",
    ],
    outcome: ["The platform is live at coorgcoffees.in and is already receiving orders."],
    links: [links.coorgLive, links.coorgRepo],
    nextSlug: "campaignos",
  },
  {
    slug: "campaignos",
    name: "CampaignOS",
    tag: "AI orchestration",
    status: "deployed",
    statusLabel: "Backend deployed · built during FDE internship",
    framing: "Human-guided AI automation for marketing workflows.",
    teaser:
      "An AI marketing operations platform that turns content calendars into poster, video and blog campaigns, with a human approval step before anything is published.",
    overview: [
      "CampaignOS is an AI marketing operations platform I built during my Forward Deployed Engineer internship at Subhanu Technologies. It takes a content calendar in whatever format it arrives (Word, Excel, CSV, PDF or an image) and turns it into poster, video and SEO blog campaigns.",
      "It addresses the weekly effort of planning, designing and scheduling content, and the way pure generative AI misprints text and distorts logos. AI creates the artwork, software handles the details that must be exact, and a person approves the result before anything is published. The backend is deployed on Google Cloud Run.",
    ],
    role: "Built the platform as a Forward Deployed Engineer intern.",
    stack: ["Python", "FastAPI", "Google ADK", "Gemini API", "Firestore", "Docker", "Google Cloud Run"],
    note: "This case study is deliberately limited to an overview. Implementation details belong to the client.",
    links: [],
    nextSlug: "verifarm",
  },
  {
    slug: "verifarm",
    name: "VeriFarm",
    tag: "Blockchain",
    status: "project",
    statusLabel: "Project · design and build",
    framing: "Traceability, fairness and privacy in agricultural supply chains.",
    teaser:
      "A farm-to-consumer crop tracing platform that enforces Minimum Support Price rules in smart contracts on a permissioned blockchain, with anomaly detection and hashed farmer identities.",
    overview: [
      "VeriFarm is a platform I designed to trace crops from farm to consumer. Minimum Support Price (MSP) rules are enforced by smart contracts on a permissioned blockchain, so the rule travels with the data instead of depending on trust.",
      "A FastAPI service flags suspicious quantities and duplicate identities, and only hashed farmer identity data is stored.",
    ],
    role: "Designed the platform and built the anomaly detection service.",
    stack: ["Hyperledger Fabric", "Node.js", "PostgreSQL", "FastAPI"],
    context: [
      "Agricultural supply chains involve many parties, and it is hard for anyone downstream to check where a crop came from or whether the farmer was paid at least the Minimum Support Price.",
    ],
    contribution: [
      "Designed the platform that traces crops from farm to consumer.",
      "Enforced MSP rules through smart contracts on a permissioned blockchain.",
      "Built an anomaly detection service in FastAPI.",
    ],
    constraints: [
      {
        title: "Rules that cannot be quietly bypassed",
        body: "A price floor is only useful if it is applied the same way to every transaction.",
      },
      {
        title: "Dirty data at the edges",
        body: "Quantities can be inflated and identities duplicated, so suspicious entries have to be flagged.",
      },
      {
        title: "Farmer privacy",
        body: "Identity data should not sit on the platform in readable form.",
      },
    ],
    architecture: {
      title: "From producer to consumer",
      caption:
        "Conceptual diagram of the platform as described in my résumé. It does not represent a deployed or government system.",
      steps: [
        { label: "Producer", detail: "A farmer's crop enters the system. Identity is stored only as a hash." },
        { label: "Supply-chain events", detail: "Each hand-over is recorded as an event." },
        { label: "Permissioned ledger", detail: "Hyperledger Fabric holds the shared record among known participants." },
        { label: "MSP smart contract", detail: "Contract logic enforces Minimum Support Price rules." },
        { label: "Anomaly signals", detail: "A FastAPI service flags suspicious quantities and duplicate identities." },
        { label: "Consumer trace", detail: "A crop's journey can be traced from farm to consumer." },
      ],
    },
    decisions: [
      {
        title: "MSP rules in smart contracts",
        body: "Putting the price rule in contract code on a permissioned ledger applies it uniformly to every transaction rather than leaving it to each party.",
      },
      {
        title: "Hashed farmer identity",
        body: "Only hashed identity data is stored, which reduces what a breach could reveal. A hash is a privacy measure, not a guarantee of anonymity.",
      },
      {
        title: "Anomaly detection as a separate service",
        body: "A FastAPI service looks for suspicious quantities and duplicate identities, keeping that logic apart from the ledger.",
      },
    ],
    build: [
      "Hyperledger Fabric for the permissioned blockchain and Node.js for application logic.",
      "PostgreSQL for off-chain data; FastAPI for the anomaly detection service.",
    ],
    outcome: [
      "A working design and implementation of a farm-to-consumer traceability platform. It is a project, not a deployed or production system.",
    ],
    links: [links.verifarmRepo],
    nextSlug: "coorg-coffee-crafted",
  },
];

export const upcoming = {
  name: "KT Villas",
  status: "In progress",
  body: "A website for a second freelance client, currently being built. Details will be added once it launches.",
};

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function liveLinks(p: Project) {
  return p.links.filter(isLive);
}
