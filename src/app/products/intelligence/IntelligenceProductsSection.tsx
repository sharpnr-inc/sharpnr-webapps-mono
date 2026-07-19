import { useRef } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { useIntelligenceProductsAnimation } from "./animations/useIntelligenceProductsAnimation";

const chain = [
  "Business activity",
  "Connected knowledge",
  "Understanding",
  "Recommendations",
  "Secure actions",
  "Continuous learning",
] as const;

const ivaRoles = [
  {
    title: "Business assistant",
    line: "Ask questions in natural language.",
    examples: [
      "Why were restaurant sales lower this weekend?",
      "Which inventory is blocking working capital?",
      "Summarize today's business performance.",
    ],
  },
  {
    title: "Business advisor",
    line: "Recommendations arrive when they matter.",
    examples: [
      "Room price suggestions based on demand",
      "Dead inventory identification",
      "Staffing and procurement recommendations",
    ],
  },
  {
    title: "Intelligent business agent",
    line: "Work gets done — securely, on your behalf.",
    examples: [
      "Generate reports and documents",
      "Create purchase requests and tasks",
      "Automate repetitive business processes",
    ],
  },
  {
    title: "Policy-aware execution",
    line: "Every action follows organizational governance.",
    examples: [
      "Identity, role and policy checks before acting",
      "Approval requests routed automatically",
      "Every action transparent and auditable",
    ],
  },
] as const;

/**
 * Section 05 — Knowledge & intelligence. Silo remembers, IVA
 * understands and acts. The business — not AI — stays the hero.
 */
export function IntelligenceProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useIntelligenceProductsAnimation({ sectionRef, introRef });

  return (
    <section ref={sectionRef} className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div ref={introRef}>
          <SectionIntro
            align="center"
            eyebrow="Knowledge & intelligence"
            heading={
              <>
                Every business creates knowledge.
                <br />
                Smart businesses put it to work.
              </>
            }
            lede="Every order, customer interaction, financial transaction, project and conversation contributes to a connected understanding of your organization — and that understanding becomes action."
          />
        </div>

        {/* The chain — always forward */}
        <ol className="mt-14 flex flex-wrap items-center justify-center gap-x-3 gap-y-2.5">
          {chain.map((step, i) => (
            <li key={step} className="intel-chain flex items-center gap-3">
              <span className="rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600 md:text-sm">
                {step}
              </span>
              {i < chain.length - 1 && (
                <span className="hidden h-px w-4 bg-slate-300 md:block" />
              )}
            </li>
          ))}
        </ol>

        {/* Silo */}
        <div className="intel-block mx-auto mt-20 max-w-3xl">
          <h3 className="text-heading-sm font-bold text-navy">Silo</h3>
          <p className="mt-2 text-title-md font-medium text-slate-800">
            The knowledge foundation of your organization.
          </p>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Instead of maintaining separate databases, document repositories
            and analytics systems, Silo brings your organization's information
            together into one trusted foundation. Every product reads from the
            same source of truth, and every business event enriches what your
            organization knows.
          </p>
          <p className="mt-4 border-l-2 border-cyan/60 pl-4 text-sm leading-relaxed text-slate-500">
            Silo doesn't simply store information. It becomes your
            organization's memory.
          </p>
        </div>

        {/* IVA */}
        <div className="intel-block mx-auto mt-16 max-w-3xl">
          <h3 className="text-heading-sm font-bold text-navy">IVA</h3>
          <p className="mt-2 text-title-md font-medium text-slate-800">
            Your intelligent business agent.
          </p>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Because every Sharpnr product shares the same connected knowledge,
            IVA understands relationships — not isolated applications. It knows
            how your business operates, respects your policies, and helps your
            teams get meaningful work done faster.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-x-12 gap-y-10 md:grid-cols-2">
          {ivaRoles.map((role) => (
            <div key={role.title} className="intel-role">
              <h4 className="text-base font-semibold text-slate-900">
                {role.title}
              </h4>
              <p className="mt-1 text-sm text-slate-500">{role.line}</p>
              <ul className="mt-3 space-y-1.5">
                {role.examples.map((e) => (
                  <li key={e} className="border-l-2 border-slate-200 pl-3 text-sm text-slate-600">
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* One honest scenario — governance never bypassed */}
        <div className="intel-scenario mx-auto mt-16 max-w-2xl rounded-2xl border border-slate-200 bg-soft p-6 md:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
            How a request actually flows
          </p>
          <div className="mt-4 space-y-3 text-sm leading-relaxed">
            <p className="font-medium text-slate-900">
              "Give Sarah access to Financial Reports."
            </p>
            <p className="text-slate-600">
              IVA verifies identity, role and organizational policies. If the
              requester is authorized, access is granted and audit logs update
              automatically.
            </p>
            <p className="text-slate-600">
              If approval is required, IVA routes the request to the right
              administrator — and completes the action once it's granted.
            </p>
            <p className="font-medium text-navy">
              Governance never slows the business. The business never bypasses
              governance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
