import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Calculator,
  Database,
  FileText,
  IdCard,
  LayoutDashboard,
  Megaphone,
  MessagesSquare,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useAppsAnimation } from "./animations/useAppsAnimation";

const apps = [
  {
    icon: LayoutDashboard,
    name: "Orchestrator",
    tagline: "The command center — monitor, configure, and control every Sharp service from one dashboard.",
  },
  {
    icon: Calculator,
    name: "Sharp-Accounting",
    tagline: "Double accrual accounting with automatic journal entries from your business apps.",
  },
  {
    icon: Users,
    name: "Sharp-HR",
    tagline: "Employees, payroll, attendance, and recruitment — the entire workforce in one system.",
  },
  {
    icon: Megaphone,
    name: "Sharp-Marketing",
    tagline: "CRM, campaigns, and customer journeys — from first lead to loyal customer.",
  },
  {
    icon: MessagesSquare,
    name: "Cables",
    tagline: "Communication that moves as fast as your business — chat, calls, and conferencing.",
  },
  {
    icon: Database,
    name: "Silo",
    tagline: "The unified data foundation — object storage, warehouse, and lakehouse in one.",
  },
  {
    icon: FileText,
    name: "Folio",
    tagline: "Documents, spreadsheets, presentations, and whiteboards — created together, in real time.",
  },
  {
    icon: ShieldCheck,
    name: "Cortex",
    tagline: "Centralized IT administration — access control, audit logs, and security policies.",
  },
  {
    icon: IdCard,
    name: "SharpIAM",
    tagline: "The self-service portal where every employee finds tasks, payslips, and approvals.",
  },
] as const;

export function AppsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useAppsAnimation({ sectionRef, headingRef, gridRef });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-ink py-24 md:py-32">
      {/* Faint grid texture */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,oklch(0.97_0_296/0.03)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.97_0_296/0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div ref={headingRef} className="max-w-2xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-glow">
            Sharpnr Core Services
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-text-light sm:text-4xl xl:text-5xl">
            Every tool your organization needs.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-muted">
            Nine connected services, one growing ecosystem. Use only the
            applications you need — each runs on its own, and every one works
            better together.
          </p>
        </div>

        <div
          ref={gridRef}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {apps.map((app) => (
            <div
              key={app.name}
              className="group rounded-xl border border-ink-border bg-ink-soft/60 p-6 transition-colors duration-300 hover:border-accent/50 hover:bg-ink-soft"
            >
              <app.icon className="size-6 text-accent-glow" strokeWidth={1.6} />
              <h3 className="mt-4 font-display text-lg font-semibold text-text-light">
                {app.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {app.tagline}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 font-medium text-accent-glow transition-colors hover:text-text-light"
          >
            Learn More about every product
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
