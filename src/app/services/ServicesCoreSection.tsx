import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Calculator,
  Check,
  Database,
  FileText,
  IdCard,
  LayoutDashboard,
  Megaphone,
  MessagesSquare,
  Network,
  ShieldCheck,
  Square,
  Users,
} from "lucide-react";
import { useServicesCoreAnimation } from "./animations/useServicesCoreAnimation";

const modes = [
  {
    icon: Square,
    title: "Run standalone",
    blurb:
      "Every Business Operation App runs completely independently — no other Sharp services required. Sharp-Accounting works on its own as a full accounting solution.",
    points: [
      "Adopt a single app, nothing else",
      "No platform lock-in to get started",
      "Full feature set from day one",
    ],
  },
  {
    icon: Network,
    title: "Or fully connected",
    blurb:
      "Out-of-the-box integration across all Sharp applications. Sales become journal entries, rosters drive payroll, and procurement settles straight into your books.",
    points: [
      "Automatic accounting from operations",
      "Shared customers, staff, and inventory",
      "One command center for everything",
    ],
  },
] as const;

const coreApps = [
  { icon: LayoutDashboard, name: "Orchestrator" },
  { icon: Calculator, name: "Sharp-Accounting" },
  { icon: Users, name: "Sharp-HR" },
  { icon: Megaphone, name: "Sharp-Marketing" },
  { icon: MessagesSquare, name: "Cables" },
  { icon: Database, name: "Silo" },
  { icon: FileText, name: "Folio" },
  { icon: ShieldCheck, name: "Cortex" },
  { icon: IdCard, name: "SharpIAM" },
] as const;

export function ServicesCoreSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const modesRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useServicesCoreAnimation({ sectionRef, headingRef, modesRef, stripRef });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-border bg-surface/60 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div ref={headingRef} className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-strong">
            Your platform, your pace
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-text-dark sm:text-4xl xl:text-5xl">
            Start with one app. Grow into an ecosystem.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-text-muted">
            Modular by design — use only the applications you need, and let
            the platform grow with your organization.
          </p>
        </div>

        {/* ── Two modes ─────────────────────────────────────────── */}
        <div ref={modesRef} className="mt-14 grid gap-4 lg:grid-cols-2">
          {modes.map((mode) => (
            <div
              key={mode.title}
              className="rounded-2xl border border-border bg-background p-8 md:p-10"
            >
              <div className="flex size-11 items-center justify-center rounded-lg bg-primary-light">
                <mode.icon className="size-5 text-primary" strokeWidth={1.7} />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-text-dark sm:text-2xl">
                {mode.title}
              </h3>
              <p className="mt-3 leading-relaxed text-text-muted">
                {mode.blurb}
              </p>
              <ul className="mt-5 flex flex-col gap-2.5">
                {mode.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm text-text-muted"
                  >
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-accent-strong"
                      strokeWidth={2}
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Core services included ────────────────────────────── */}
        <div className="mt-16">
          <p className="text-center font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-text-faint">
            Every industry solution connects to the same core
          </p>
          <div
            ref={stripRef}
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            {coreApps.map((app) => (
              <span
                key={app.name}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-text-muted transition-colors duration-200 hover:border-accent-strong/50 hover:text-text-dark"
              >
                <app.icon className="size-4 text-primary" strokeWidth={1.7} />
                {app.name}
              </span>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 font-medium text-primary transition-colors hover:text-primary-hover"
            >
              Learn More about the core services
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
