import type { ReactNode } from "react";

export interface Capability {
  id: string;
  eyebrow: string;
  heading: ReactNode;
  lede: string;
  accomplish: string[];
  why: string;
  journey: string[];
  journeyClose: string;
  poweredBy: string[];
  alongside: string[];
  extra?: ReactNode;
}

/* Everyday examples for Knowledge & Intelligence — knowledge is
   useful for everyone, not just leadership. */
const knowledgeAudiences = [
  { who: "Business leaders", what: "Understand performance and identify growth opportunities." },
  { who: "Finance teams", what: "Spot trends, unusual activity and profitability." },
  { who: "Operations teams", what: "Detect bottlenecks and improve everyday efficiency." },
  { who: "Sales & customer teams", what: "Understand behaviour and strengthen relationships." },
  { who: "Technology teams", what: "Find documentation, explain systems, accelerate development." },
  { who: "Every employee", what: "Find answers, summarize meetings, automate routine work." },
] as const;

/**
 * The seven business capabilities — Services page content.
 * Structure per spec: story → outcomes → why it matters →
 * connected experience → powered by.
 */
export const capabilities: Capability[] = [
  {
    id: "financial-management",
    eyebrow: "Financial management",
    heading: "Financial management that moves with your business.",
    lede: "Most businesses record financial activity after it happens — duplicate work, manual reconciliation, delayed reporting. On Sharpnr, business activities naturally become financial records as work happens.",
    accomplish: [
      "Keep financial records aligned with everyday operations",
      "Manage multiple companies and legal entities from one platform",
      "Monitor business performance in real time",
      "Simplify compliance and audit preparation",
      "Gain visibility across the entire organization",
    ],
    why: "Finance teams shouldn't wait until the end of the day to understand the business, and leadership shouldn't wait until the end of the month. When finance stays connected to operations, decisions get faster and every number earns more trust.",
    journey: [
      "A customer order is placed",
      "Operations complete the service",
      "The customer is billed",
      "Financial records update automatically",
      "Management dashboards refresh",
      "IVA surfaces a new insight",
      "Leadership decides with confidence",
    ],
    journeyClose: "One business event. One connected financial outcome.",
    poweredBy: ["Sharp Accounting"],
    alongside: ["Sharp Operations", "Sharp HRMS", "Sharp CRMS", "Sharp Marketplace", "IVA", "Silo"],
  },
  {
    id: "people-workforce",
    eyebrow: "People & workforce",
    heading: (
      <>
        Great organizations are built by great people.
        <br />
        Keep every employee connected.
      </>
    ),
    lede: "From hiring and onboarding to payroll, collaboration and growth, every stage of the employee journey stays connected. Employees don't just belong to HR — they become part of a connected organization.",
    accomplish: [
      "Welcome new employees with structured onboarding",
      "Manage attendance, shifts and payroll with confidence",
      "Keep teams aligned through shared communication",
      "Support growth with continuous feedback and learning",
      "Give every employee secure access to the right tools",
      "Maintain one employee profile across the platform",
    ],
    why: "People shouldn't spend their day switching between disconnected systems, managers shouldn't chase approvals, and HR shouldn't duplicate work. When everyone shares one platform, organizations become more productive and more resilient.",
    journey: [
      "A new employee is welcomed",
      "Their profile is created",
      "Access is securely provisioned",
      "They join the right teams",
      "Onboarding tasks are assigned",
      "Managers see progress as it happens",
      "IVA answers questions along the way",
    ],
    journeyClose: "One employee. One connected experience.",
    poweredBy: ["Sharp HRMS"],
    alongside: ["Sharp IAM", "Tasks", "Cables", "Folio", "IVA", "Sharp Accounting"],
  },
  {
    id: "customer-relationships",
    eyebrow: "Customer relationships",
    heading: (
      <>
        Strong businesses are built on strong relationships.
        <br />
        Keep every customer connected.
      </>
    ),
    lede: "Every customer begins with a first interaction. Most businesses lose that journey across disconnected systems — sales knows one story, support another. Sharpnr keeps every interaction part of one complete relationship.",
    accomplish: [
      "Capture enquiries and opportunities without losing context",
      "Build customer profiles that grow over time",
      "Create personalized experiences across every interaction",
      "Strengthen loyalty through meaningful engagement",
      "Understand customer behaviour and performance",
      "Deliver consistent experiences across every location",
    ],
    why: "Customers don't experience your organization department by department — they experience it as one business. When every team shares the same understanding, you respond faster and relationships last longer.",
    journey: [
      "A customer discovers your business",
      "An enquiry is received",
      "It becomes a booking or a sale",
      "Preferences and history grow over time",
      "Marketing stays relevant",
      "Support already knows the story",
      "IVA spots opportunities to keep them coming back",
    ],
    journeyClose: "One customer. One connected relationship.",
    poweredBy: ["Sharp CRMS"],
    alongside: ["Sharp Operations", "Sharp Accounting", "Cables", "IVA", "Silo"],
  },
  {
    id: "communication-collaboration",
    eyebrow: "Communication & collaboration",
    heading: (
      <>
        Better work starts with better collaboration.
        <br />
        Keep every conversation connected.
      </>
    ),
    lede: "Communication, documentation and execution belong together. Discuss ideas, create knowledge and complete work without switching between disconnected applications — every conversation stays connected to the work it creates.",
    accomplish: [
      "Communicate across teams and departments",
      "Share knowledge where work actually happens",
      "Turn discussions into actionable tasks",
      "Collaborate on documents in real time",
      "Keep projects moving without losing context",
      "Build a knowledge base that grows every day",
    ],
    why: "Great organizations don't succeed because they communicate more. They succeed because information flows naturally — fewer duplicated efforts, better decisions, faster teams.",
    journey: [
      "A project kicks off",
      "The team starts a conversation",
      "Meeting notes become a shared document",
      "Action items become tasks",
      "Progress updates appear automatically",
      "IVA summarizes and highlights next steps",
      "Everyone stays aligned",
    ],
    journeyClose: "One discussion. One connected workflow.",
    poweredBy: ["Cables", "Folio", "Tasks"],
    alongside: ["Sharp IAM", "IVA", "Silo"],
  },
  {
    id: "identity-governance",
    eyebrow: "Identity, security & governance",
    heading: (
      <>
        Secure organizations begin with trusted access.
        <br />
        Governance built into everyday work.
      </>
    ),
    lede: "Employees join, teams change, applications multiply. Sharpnr keeps identity, access and governance connected, so you always know who has access, why they have it and what they're allowed to do.",
    accomplish: [
      "Manage employee identities from one place",
      "Grant access based on role and responsibility",
      "Protect sensitive business information",
      "Apply consistent organizational policies",
      "Maintain complete visibility into business activity",
      "Scale governance as the organization grows",
    ],
    why: "Security should never slow people down, and governance shouldn't need complicated manual processes. Trust becomes part of everyday operations — without friction.",
    journey: [
      "A new employee joins",
      "Their identity is created",
      "The right access is assigned automatically",
      "Apps, documents and channels appear",
      "Roles change; permissions evolve with them",
      "IVA verifies policies before sensitive actions",
      "Leadership keeps complete visibility",
    ],
    journeyClose: "One trusted identity. One secure organization.",
    poweredBy: ["Sharp IAM", "Cortex"],
    alongside: ["Sharp HRMS", "Cables", "Folio", "Tasks", "IVA"],
  },
  {
    id: "knowledge-intelligence",
    eyebrow: "Knowledge & intelligence",
    heading: (
      <>
        Every business creates knowledge.
        <br />
        Turn it into better decisions.
      </>
    ),
    lede: "Organizations don't struggle because they lack information — they struggle because information is disconnected. Sharpnr turns everyday activity into connected knowledge, meaningful insight and intelligent action.",
    accomplish: [
      "Discover trends before they become problems",
      "Understand business performance in real time",
      "Receive recommendations when they matter",
      "Find information instantly across the organization",
      "Reduce repetitive work through intelligent automation",
      "Help every employee decide with shared knowledge",
    ],
    why: "The result isn't more data — it's better decisions. When appropriate permissions exist, IVA can also act: prepare reports, draft communications, complete routine tasks. Every action follows policy. People always stay in control.",
    journey: [
      "“Why has business slowed this week?”",
      "Operations, finance and customers considered",
      "Workforce and trends reviewed",
      "IVA explains what happened",
      "It recommends practical actions",
      "Approved steps are completed securely",
    ],
    journeyClose: "One question. One connected understanding.",
    poweredBy: ["Silo", "IVA"],
    alongside: ["every Sharpnr product"],
    extra: (
      <div className="mt-14">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
          Useful for everyone — not just leadership
        </p>
        <div className="mt-5 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {knowledgeAudiences.map((a) => (
            <div key={a.who}>
              <h3 className="text-sm font-semibold text-slate-900">{a.who}</h3>
              <p className="mt-1 text-sm text-slate-500">{a.what}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "business-network",
    eyebrow: "Business network",
    heading: (
      <>
        Your business is bigger than your organization.
        <br />
        Keep every relationship connected.
      </>
    ),
    lede: "Every purchase begins with a supplier; every service begins with a partner. Instead of relationships scattered across emails and spreadsheets, Sharpnr keeps them connected to the platform your teams already use.",
    accomplish: [
      "Discover and connect with trusted organizations",
      "Simplify procurement and purchasing",
      "Collaborate with suppliers and partners effectively",
      "Keep conversations, documents and approvals together",
      "Strengthen long-term business relationships",
      "Grow a trusted network alongside your organization",
    ],
    why: "Growth happens faster when businesses stay connected. When suppliers, vendors and partners become part of your platform, collaboration improves and procurement becomes part of everyday operations.",
    journey: [
      "Your organization needs new inventory",
      "A trusted supplier is discovered",
      "The conversation begins",
      "Requirements are shared and approved",
      "The order is confirmed",
      "Financial records update automatically",
      "IVA evaluates supplier performance for next time",
    ],
    journeyClose: "One relationship. One connected business journey.",
    poweredBy: ["Sharp Marketplace"],
    alongside: ["Sharp Accounting", "Cables", "Folio", "IVA", "Silo"],
  },
];
