import { useRef } from "react";
import {
  Building2,
  HeartPulse,
  ShoppingBag,
  UtensilsCrossed,
} from "lucide-react";
import { useIndustriesListAnimation } from "./animations/useIndustriesListAnimation";

const industries = [
  {
    icon: UtensilsCrossed,
    name: "Hospitality",
    headline: "From lobby to kitchen, one system.",
    description:
      "Hotels, restaurants, bars, night clubs, and resorts run their entire operation on Sharp-Hospitality — reservations, tables, kitchen displays, QR ordering, and room service — while every sale lands in the books automatically. Shared kitchens and menus work across multiple businesses, and multi-property groups manage every legal entity from one place.",
    segments: ["Hotels", "Restaurants", "Bars", "Night Clubs", "Resorts"],
    apps: ["Sharp-Hospitality", "Sharp-Accounting", "Sharp-HR", "Sharp-Marketing"],
    status: "Serving today",
  },
  {
    icon: HeartPulse,
    name: "Healthcare",
    headline: "Care for patients, not paperwork.",
    description:
      "Hospitals, clinics, pharmacies, and nursing centers get patient management, appointment scheduling, and medical records with Lifco — connected to billing, insurance, pharmacy inventory, payroll, and secure communications across the organization. One platform from the front desk to the dispensary.",
    segments: ["Hospitals", "Clinics", "Pharmacies", "Nursing Centers"],
    apps: ["Lifco (coming soon)", "Sharp-Accounting", "Sharp-HR", "Cables"],
    status: "Coming soon",
  },
  {
    icon: ShoppingBag,
    name: "Retail",
    headline: "Every store, every shelf, one system.",
    description:
      "Retail stores manage operations on the Sharp core today — accounting, staff, marketing, and procurement through Sharp-Marketplace — with Sharp-Retail on the roadmap to bring stores, stock, and sales onto one dedicated operations app.",
    segments: ["Retail Stores", "Store Chains", "Mixed Retail"],
    apps: ["Sharp-Accounting", "Sharp-Marketing", "Sharp-Marketplace", "Sharp-Retail (roadmap)"],
    status: "Expanding",
  },
  {
    icon: Building2,
    name: "Mixed & Multi-Industry",
    headline: "Run a hotel and a hospital from one place.",
    description:
      "Some organizations span industries — a group with a resort, a clinic, and a retail arm. Sharpnr supports multiple legal entities with independent books or consolidated reporting, all orchestrated from a single control layer. This is where the platform's architecture pays off: one organization, many industries, zero duct tape.",
    segments: ["Conglomerates", "Holding Groups", "Multi-Entity Organizations"],
    apps: ["Orchestrator", "Sharp-Accounting", "Full Core Services"],
    status: "Serving today",
  },
] as const;

export function IndustriesListSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useIndustriesListAnimation({ sectionRef, listRef });

  return (
    <section ref={sectionRef} className="py-16 md:py-20">
      <div
        ref={listRef}
        className="mx-auto flex max-w-7xl flex-col gap-8 px-5 md:px-8"
      >
        {industries.map((industry) => (
          <div
            key={industry.name}
            className="grid gap-8 rounded-3xl border border-border bg-surface p-8 md:p-12 lg:grid-cols-[1fr_2fr] lg:gap-16"
          >
            <div>
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary-light">
                <industry.icon
                  className="size-6 text-primary"
                  strokeWidth={1.7}
                />
              </div>
              <h2 className="mt-5 font-display text-2xl font-bold tracking-tight text-text-dark">
                {industry.name}
              </h2>
              <p className="mt-1 font-mono text-[11px] font-medium uppercase tracking-widest text-accent-strong">
                {industry.status}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {industry.segments.map((segment) => (
                  <span
                    key={segment}
                    className="rounded-md border border-border bg-background px-2.5 py-1 font-mono text-xs text-text-muted"
                  >
                    {segment}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:border-l lg:border-border lg:pl-16">
              <h3 className="font-display text-xl font-semibold text-text-dark sm:text-2xl">
                {industry.headline}
              </h3>
              <p className="mt-4 leading-relaxed text-text-muted">
                {industry.description}
              </p>
              <div className="mt-6">
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-text-faint">
                  Key apps
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {industry.apps.map((app) => (
                    <span
                      key={app}
                      className="rounded-md bg-primary-light px-2.5 py-1 font-mono text-xs font-medium text-primary"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        <p className="mt-4 text-center font-mono text-xs uppercase tracking-[0.2em] text-text-faint">
          Manufacturing · and more — the ecosystem keeps expanding
        </p>
      </div>
    </section>
  );
}
