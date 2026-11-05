export type Experience = {
  role: string;
  org: string;
  period: string;
  summary: string;
  points: string[];
  note?: string;
};

export const experience: Experience[] = [
  {
    role: "Forward Deployed Engineer (Intern)",
    org: "Subhanu Technologies & Solutions Pvt Ltd",
    period: "July 2026 – present",
    summary:
      "Works directly with clients to turn requirements into specifications and scoped tasks, then delivers websites and web applications.",
    points: [
      "Built CampaignOS, an AI marketing automation backend for the company's brand websites.",
      "Reviews and tests all AI-generated code before delivery.",
    ],
  },
  {
    role: "Freelance Full-Stack Developer",
    org: "Self-employed",
    period: "January 2026 – present",
    summary:
      "Handles requirements, design, development, payments integration, deployment and client communication end to end.",
    points: [
      "Built and launched Coorg Coffee Crafted for a client. It is live and receiving orders.",
      "Currently building a website for a second client, KT Villas.",
    ],
  },
  {
    role: "Software Engineering Intern",
    org: "Bosch, Bidadi Plant",
    period: "June – July 2025",
    summary:
      "Worked on generative AI applications in manufacturing and analysed KPIs that support Overall Equipment Effectiveness (OEE) improvements.",
    points: [],
  },
];

export const capabilities: { group: string; items: string[]; evidence: string }[] = [
  {
    group: "Languages",
    items: ["Python", "Java", "JavaScript", "TypeScript", "SQL", "HTML/CSS"],
    evidence: "Across all three flagship projects",
  },
  {
    group: "Web & backend",
    items: [
      "React",
      "TanStack Start",
      "Tailwind CSS",
      "Node.js",
      "FastAPI",
      "REST APIs",
      "JWT authentication",
      "Role-based access control",
    ],
    evidence: "Coorg Coffee Crafted, CampaignOS, VeriFarm",
  },
  {
    group: "Data & cloud",
    items: [
      "Firebase (Firestore, Cloud Functions, Storage, Hosting)",
      "PostgreSQL",
      "Docker",
      "Google Cloud Run",
    ],
    evidence: "Coorg Coffee Crafted, CampaignOS",
  },
  {
    group: "AI & tooling",
    items: [
      "Google ADK",
      "Gemini API",
      "Multi-agent workflows",
      "Prompt design",
      "Model Context Protocol (MCP)",
      "Razorpay",
      "Git/GitHub",
    ],
    evidence: "CampaignOS, Coorg Coffee Crafted",
  },
];

export const education = {
  degree: "B.E., Information Science & Engineering",
  school: "B.N.M. Institute of Technology",
  period: "Sep 2023 – 2027",
  cgpa: "9.79",
};

export const achievements = [
  "Smart India Hackathon (SIH) 2025 — Winner",
  "Adhvaya 2.0 National Level Hackathon — Winner",
  "Vision90 Ideathon — Winner",
];

export const spokenLanguages = ["Kannada", "English", "Hindi"];

/** The FDE delivery loop, as described in the résumé's "spec-driven workflow with human review". */
export const method = [
  { n: "01", title: "Client problem", body: "Sit with the client and get the real requirement, not the first request." },
  { n: "02", title: "Specification", body: "Turn it into a written spec and scoped tasks everyone can point at." },
  { n: "03", title: "Build", body: "Implement against the spec. AI assistance is a tool, not the author." },
  { n: "04", title: "Human review", body: "All AI-assisted output is read and reviewed by a person." },
  { n: "05", title: "Test", body: "Test what was built before it goes anywhere near the client." },
  { n: "06", title: "Deliver", body: "Deploy, hand over, and stay in the conversation with the client." },
];
