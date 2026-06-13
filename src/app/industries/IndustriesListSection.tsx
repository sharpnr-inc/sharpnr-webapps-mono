import { useRef } from "react";
import {
  ArrowUpRight,
  Building2,
  HeartPulse,
  ShoppingBag,
  UtensilsCrossed,
} from "lucide-react";
import { config } from "@/configs/env";
import { useIndustriesListAnimation } from "./animations/useIndustriesListAnimation";

interface Industry {
  icon: typeof Building2;
  name: string;
  headline: string;
  description: string;
  outcome: string;
  segments: string[];
  apps: string[];
  status: string;
  href?: string;
  hrefLabel?: string;
  note?: string;
}

const industries: Industry[] = [
  {
    icon: UtensilsCrossed,
    name: "Hospitality",
    headline: "From lobby to kitchen, one system.",
    description:
      "Hotels, restaurants, bars, night clubs, and resorts run their entire operation on Sharp-Hospitality — reservations, tables, kitchen displays, QR ordering, and room service — while every sale lands in the books automatically. Shared kitchens and menus work across multiple businesses, and multi-property groups manage every legal entity from one place.",
    outcome: "Every sale lands in the books automatically.",
    segments: ["Hotels", "Restaurants", "Bars", "Night Clubs", "Resorts"],
    apps: ["Sharp-Hospitality", "Sharp-Accounting", "Sharp-HR", "Sharp-Marketing"],
    status: "Serving today",
    href: config.hospitalityAppUrl,
    hrefLabel: "Explore Sharp-Hospitality",
  },
  {
    icon: HeartPulse,
    name: "Healthcare",
    headline: "Care for patients, not paperwork.",
    description:
      "Hospitals, clinics, pharmacies, and nursing centers get patient management, appointment scheduling, and medical records with Lifco — connected to billing, insurance, pharmacy inventory, payroll, and secure communications across the organization. One platform from the front desk to the dispensary.",
    outcome: "One connected record, front desk to dispensary.",
    segments: ["Hospitals", "Clinics", "Pharmacies", "Nursing Centers"],
    apps: ["Lifco (coming soon)", "Sharp-Accounting", "Sharp-HR", "Cables"],
    status: "Coming soon",
    note: "Lifco — coming soon",
  },
  {
    icon: ShoppingBag,
    name: "Retail",
    headline: "Every store, every shelf, one system.",
    description:
      "Retail stores manage operations on the Sharp core today — accounting, staff, marketing, and procurement through Sharp-Marketplace — with Sharp-Retail on the roadmap to bring stores, stock, and sales onto one dedicated operations app.",
    outcome: "Procurement and books, already connected.",
    segments: ["Retail Stores", "Store Chains", "Mixed Retail"],
    apps: ["Sharp-Accounting", "Sharp-Marketing", "Sharp-Marketplace", "Sharp-Retail (roadmap)"],
    status: "Expanding",
    note: "Sharp-Retail on the roadmap",
  },
  {
    icon: Building2,
    name: "Mixed & Multi-Industry",
    headline: "Run a hotel and a hospital from one place.",
    description:
      "Some organizations span industries — a group with a resort, a clinic, and a retail arm. Sharpnr supports multiple legal entities with independent books or consolidated reporting, all orchestrated from a single control layer. This is where the platform's architecture pays off: one organization, many industries, zero duct tape.",
    outcome: "One organization, many industries, zero duct tape.",
    segments: ["Conglomerates", "Holding Groups", "Multi-Entity Organizations"],
    apps: ["Orchestrator", "Sharp-Accounting", "Full Core Services"],
    status: "Serving today",
    href: config.orchestratorAppUrl,
    hrefLabel: "Explore Orchestrator",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

function StatusPill({ status }: { status: string }) {
  const soon = status === "Coming soon";
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-widest text-text-muted">
      <span
        className={`size-1.5 rounded-full ${
          soon ? "bg-text-faint" : "animate-pulse bg-accent-strong"
        }`}
      />
      {status}
    </span>
  );
}

export function IndustriesListSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useIndustriesListAnimation({ sectionRef, listRef });

  return (
    <section ref={sectionRef} className="py-16 md:py-20">
      <div
        ref={listRef}
        className="mx-auto flex max-w-7xl flex-col gap-6 px-5 md:px-8"
      >
        {industries.map((industry, i) => (
          <article
            key={industry.name}
            className="group relative overflow-hidden rounded-3xl border border-border bg-surface p-8 transition-[border-color,box-shadow] duration-300 hover:border-accent-strong/40 hover:shadow-xl md:p-12 lg:grid lg:grid-cols-[minmax(0,1fr)_2fr] lg:gap-16"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100"
            />
            <div className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-accent/8 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

            {/* Left rail */}
            <div className="relative">
              <div className="flex items-start justify-between">
                <div className="flex size-12 items-center justify-center rounded-xl border border-border bg-gradient-to-br from-ink-soft to-surface transition-colors duration-300 group-hover:border-accent/40">
                  <industry.icon
                    className="size-6 text-text-dark transition-colors duration-300 group-hover:text-accent"
                    strokeWidth={1.7}
                  />
                </div>
                <span className="font-mono text-xs font-semibold tracking-[0.1em] text-text-faint">
                  {pad(i + 1)}
                </span>
              </div>
              <h2 className="mt-5 font-display text-2xl font-bold tracking-tight text-text-dark">
                {industry.name}
              </h2>
              <div className="mt-3">
                <StatusPill status={industry.status} />
              </div>
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

            {/* Right content */}
            <div className="relative mt-8 lg:mt-0 lg:border-l lg:border-border lg:pl-16">
              <h3 className="font-display text-xl font-semibold text-text-dark sm:text-2xl">
                {industry.headline}
              </h3>
              <p className="mt-4 leading-relaxed text-text-muted">
                {industry.description}
              </p>

              <div className="mt-6 border-l-2 border-accent-strong/70 pl-4">
                <p className="font-display text-sm font-semibold text-text-dark">
                  {industry.outcome}
                </p>
              </div>

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

              <div className="mt-7">
                {industry.href ? (
                  <a
                    href={industry.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-text-dark transition-colors duration-200 hover:text-accent"
                  >
                    {industry.hrefLabel}
                    <ArrowUpRight className="size-4 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-text-faint">
                    <span className="size-1.5 rounded-full bg-text-faint" />
                    {industry.note}
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}

        <p className="mt-4 text-center font-mono text-xs uppercase tracking-[0.2em] text-text-faint">
          Manufacturing · and more — the ecosystem keeps expanding
        </p>
      </div>
    </section>
  );
}
