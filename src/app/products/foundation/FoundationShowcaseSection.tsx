import { useRef } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { useFoundationShowcaseAnimation } from "./animations/useFoundationShowcaseAnimation";

interface Showcase {
  name: string;
  positioning: string;
  story: string;
  capabilities: string[];
  connected: string;
  glyph: React.ReactNode;
}

/* Small conceptual glyphs — purpose, not implementation. */
const glyphStroke = { fill: "none", stroke: "#0077b6", strokeOpacity: 0.55, strokeWidth: 1.4 } as const;

const showcases: Showcase[] = [
  {
    name: "Sharp Accounting",
    positioning: "Modern accounting built into your business — not added afterwards.",
    story:
      "Accounting shouldn't begin after work is complete. Every reservation, order, invoice, payroll run and purchase naturally becomes part of your financial records, on double-entry accrual accounting from day one.",
    capabilities: [
      "General ledger",
      "Receivables & payables",
      "Banking & reconciliation",
      "Tax & GST",
      "Budgeting & cash flow",
      "Fixed assets",
      "Financial statements",
      "Multi-company & consolidation",
    ],
    connected:
      "Every transaction across Sharpnr automatically becomes part of your books. No exports. No duplicate entries. No end-of-day reconciliation.",
    glyph: (
      <svg viewBox="0 0 160 160" aria-hidden="true" className="size-32">
        {/* Connected ledger entries */}
        <g {...glyphStroke}>
          <path d="M36 44 H92" />
          <path d="M36 72 H124" />
          <path d="M36 100 H104" />
          <path d="M36 128 H116" />
          <path d="M124 72 Q136 86 104 100" />
        </g>
        <circle cx="28" cy="44" r="4" fill="#0077b6" />
        <circle cx="28" cy="72" r="4" fill="#0077b6" />
        <circle cx="28" cy="100" r="4" fill="#0077b6" />
        <circle cx="28" cy="128" r="4" fill="#0077b6" />
      </svg>
    ),
  },
  {
    name: "Sharp HRMS",
    positioning: "Everything your workforce needs.",
    story:
      "People are more than payroll. Manage every stage of the employee journey — from hiring and onboarding to attendance, payroll, performance and growth — whether you have ten employees or ten thousand.",
    capabilities: [
      "Recruitment",
      "Employee profiles",
      "Attendance & leave",
      "Payroll",
      "Shift scheduling",
      "Performance & goals",
      "Training & assets",
      "Multi-company workforce",
    ],
    connected:
      "Employees automatically connect to operations, tasks, identity and IVA — every team works from the same employee profile.",
    glyph: (
      <svg viewBox="0 0 160 160" aria-hidden="true" className="size-32">
        {/* Connected people forming one organization */}
        <g {...glyphStroke}>
          <path d="M80 62 L44 108" />
          <path d="M80 62 L116 108" />
          <path d="M44 108 L116 108" />
        </g>
        <circle cx="80" cy="50" r="12" fill="#caf0f8" stroke="#0077b6" strokeOpacity="0.55" strokeWidth="1.4" />
        <circle cx="44" cy="116" r="10" fill="#ffffff" stroke="#0077b6" strokeOpacity="0.55" strokeWidth="1.4" />
        <circle cx="116" cy="116" r="10" fill="#ffffff" stroke="#0077b6" strokeOpacity="0.55" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    name: "Sharp CRMS",
    positioning: "Build lasting customer relationships.",
    story:
      "Every interaction matters. Track leads, customers, communication, loyalty and marketing journeys in one connected customer platform — and understand every customer, not just every transaction.",
    capabilities: [
      "Lead management",
      "Sales pipeline",
      "Customer profiles",
      "Campaigns",
      "Loyalty programs",
      "Segmentation",
      "Communication timeline",
      "Customer analytics",
    ],
    connected:
      "Customer history follows every reservation, purchase, support request and campaign across Sharpnr.",
    glyph: (
      <svg viewBox="0 0 160 160" aria-hidden="true" className="size-32">
        {/* A relationship growing around one customer */}
        <g {...glyphStroke}>
          <circle cx="80" cy="80" r="26" />
          <circle cx="80" cy="80" r="48" strokeDasharray="4 7" />
        </g>
        <circle cx="80" cy="80" r="8" fill="#0077b6" />
        <circle cx="80" cy="32" r="5" fill="#00b4d8" />
        <circle cx="122" cy="104" r="5" fill="#00b4d8" />
        <circle cx="38" cy="104" r="5" fill="#00b4d8" />
      </svg>
    ),
  },
  {
    name: "Sharp IAM",
    positioning: "Secure identity for every employee.",
    story:
      "Identity is the gateway to your organization. Manage authentication, permissions and access from one place, while every employee gets a self-service workspace of their own.",
    capabilities: [
      "Authentication",
      "Role-based access",
      "Single sign-on",
      "Employee portal",
      "Approvals",
      "Self service",
      "Organization directory",
      "Permission management",
    ],
    connected:
      "Employees sign in once and securely reach every Sharpnr product they're authorized to use.",
    glyph: (
      <svg viewBox="0 0 160 160" aria-hidden="true" className="size-32">
        {/* One identity, the right access flowing outward */}
        <g {...glyphStroke}>
          <path d="M80 80 L36 40" />
          <path d="M80 80 L124 40" />
          <path d="M80 80 L36 122" />
          <path d="M80 80 L124 122" />
        </g>
        <circle cx="80" cy="80" r="16" fill="#caf0f8" stroke="#0077b6" strokeOpacity="0.55" strokeWidth="1.4" />
        <circle cx="80" cy="80" r="5" fill="#0077b6" />
        <rect x="26" y="30" width="20" height="20" rx="6" fill="#ffffff" stroke="#0077b6" strokeOpacity="0.5" strokeWidth="1.3" />
        <rect x="114" y="30" width="20" height="20" rx="6" fill="#ffffff" stroke="#0077b6" strokeOpacity="0.5" strokeWidth="1.3" />
        <rect x="26" y="112" width="20" height="20" rx="6" fill="#ffffff" stroke="#0077b6" strokeOpacity="0.5" strokeWidth="1.3" />
        <rect x="114" y="112" width="20" height="20" rx="6" fill="#ffffff" stroke="#0077b6" strokeOpacity="0.5" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    name: "Cortex",
    positioning: "Governance without complexity.",
    story:
      "As organizations grow, so do responsibilities. Cortex provides centralized administration, security and governance across the ecosystem — control for IT teams without slowing down the business.",
    capabilities: [
      "Organization policies",
      "Audit logs",
      "Security controls",
      "API management",
      "Service accounts",
      "Monitoring",
      "Compliance",
      "Central administration",
    ],
    connected:
      "Every policy, permission and audit event is managed from one place across the entire platform.",
    glyph: (
      <svg viewBox="0 0 160 160" aria-hidden="true" className="size-32">
        {/* Structured governance — order in rings, not locks */}
        <g {...glyphStroke}>
          <circle cx="80" cy="80" r="20" />
          <circle cx="80" cy="80" r="38" />
          <circle cx="80" cy="80" r="56" strokeDasharray="3 8" />
        </g>
        <circle cx="80" cy="80" r="6" fill="#0077b6" />
        <circle cx="80" cy="42" r="4" fill="#00b4d8" />
        <circle cx="118" cy="80" r="4" fill="#00b4d8" />
        <circle cx="80" cy="118" r="4" fill="#00b4d8" />
        <circle cx="42" cy="80" r="4" fill="#00b4d8" />
      </svg>
    ),
  },
];

/**
 * Section 03 — The business foundation. Five premium showcases in
 * alternating rhythm — one connected foundation, not five products.
 */
export function FoundationShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useFoundationShowcaseAnimation({ sectionRef, introRef });

  return (
    <section ref={sectionRef} className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div ref={introRef}>
          <SectionIntro
            align="center"
            eyebrow="Business foundation"
            heading="The foundation every business depends on."
            lede="Finance, people, customers, identity and governance — brought together into one connected foundation, shared across every product, every team and every industry."
          />
        </div>

        <div className="mt-20 space-y-20 md:space-y-28">
          {showcases.map((product, i) => (
            <article
              key={product.name}
              className={`showcase-row grid items-center gap-10 lg:grid-cols-12 lg:gap-16 ${
                i % 2 === 1 ? "" : ""
              }`}
            >
              {/* Conceptual glyph */}
              <div
                className={`flex justify-center lg:col-span-4 ${
                  i % 2 === 1 ? "lg:order-last" : ""
                }`}
              >
                <div className="flex size-48 items-center justify-center rounded-2xl border border-slate-200 bg-soft md:size-56">
                  {product.glyph}
                </div>
              </div>

              {/* The product */}
              <div className="lg:col-span-8">
                <h3 className="text-heading-sm font-bold text-navy">
                  {product.name}
                </h3>
                <p className="mt-2 text-title-md font-medium text-slate-800">
                  {product.positioning}
                </p>
                <p className="prose-width mt-4 text-base leading-relaxed text-slate-600">
                  {product.story}
                </p>
                <ul className="mt-6 grid max-w-xl grid-cols-2 gap-x-8 gap-y-2">
                  {product.capabilities.map((cap) => (
                    <li key={cap} className="text-sm text-slate-600">
                      {cap}
                    </li>
                  ))}
                </ul>
                <p className="prose-width mt-6 border-l-2 border-cyan/60 pl-4 text-sm leading-relaxed text-slate-500">
                  {product.connected}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
