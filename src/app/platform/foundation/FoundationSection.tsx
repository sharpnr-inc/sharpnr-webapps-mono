import { useRef } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { useFoundationAnimation } from "./animations/useFoundationAnimation";

const pillars = [
  {
    name: "Sharp Accounting",
    role: "The financial foundation",
    items: [
      "General ledger",
      "Receivables & payables",
      "Banking & reconciliation",
      "Taxation",
      "Financial statements",
      "Multi-company accounting",
    ],
  },
  {
    name: "Sharp HRMS",
    role: "The people foundation",
    items: [
      "Recruitment",
      "Attendance & leave",
      "Payroll",
      "Shift planning",
      "Performance & training",
      "Multi-branch workforce",
    ],
  },
  {
    name: "Sharp CRMS",
    role: "The customer foundation",
    items: [
      "Lead management",
      "Sales pipeline",
      "Customer profiles",
      "Campaigns",
      "Loyalty programs",
      "Customer insights",
    ],
  },
  {
    name: "Sharp IAM",
    role: "The identity foundation",
    items: [
      "Authentication",
      "Role-based access",
      "Single sign-on",
      "Employee portal",
      "Approvals",
      "Organization directory",
    ],
  },
  {
    name: "Cortex",
    role: "The governance foundation",
    items: [
      "Organization policies",
      "Audit logs",
      "Security rules",
      "API keys",
      "Monitoring",
      "Administration",
    ],
  },
] as const;

/**
 * Section 04 — Every business starts here. Not five products: one
 * connected foundation beneath the operational experience, like
 * roots beneath a tree.
 */
export function FoundationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useFoundationAnimation({ sectionRef, introRef });

  return (
    <section ref={sectionRef} className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div ref={introRef}>
          <SectionIntro
            eyebrow="The business foundation"
            heading={
              <>
                Every business is different.
                <br />
                Every business starts here.
              </>
            }
            lede="Behind every operational experience is one connected foundation — finance, people, customers, identity and governance. Shared once. Connected everywhere."
          />
        </div>

        {/* One structure: the experience above, the foundation beneath */}
        <div className="mt-14 overflow-hidden rounded-2xl border border-slate-200">
          <div className="border-b border-slate-200 bg-soft px-6 py-5 text-center">
            <p className="text-sm font-medium text-slate-500">
              Your operational experience — hospitality today, more industries
              to come
            </p>
          </div>
          <div className="grid divide-y divide-slate-200 md:grid-cols-5 md:divide-x md:divide-y-0">
            {pillars.map((pillar) => (
              <div key={pillar.name} className="foundation-pillar px-6 py-7">
                <h3 className="text-base font-semibold text-navy">
                  {pillar.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{pillar.role}</p>
                <ul className="mt-4 space-y-2">
                  {pillar.items.map((item) => (
                    <li key={item} className="text-sm text-slate-600">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-xl text-center text-base text-slate-600">
          These aren't separate systems. Every business event can automatically
          become a financial record, an employee update or a customer moment —
          because the foundation is one.
        </p>
      </div>
    </section>
  );
}
