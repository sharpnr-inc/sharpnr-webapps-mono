import { Fragment, useRef } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  HeartPulse,
  Store,
  UtensilsCrossed,
} from "lucide-react";
import { useIndustriesUseCasesAnimation } from "./animations/useIndustriesUseCasesAnimation";

/* ── Scenario data — concrete cross-app workflows ───────────────── */

interface Step {
  label: string;
  app: string;
  result?: boolean;
}

interface Scenario {
  icon: typeof Check;
  industry: string;
  status: string;
  title: string;
  setup: string;
  steps: Step[];
}

const scenarios: Scenario[] = [
  {
    icon: UtensilsCrossed,
    industry: "Hospitality",
    status: "Serving today",
    title: "A table orders — and the books close themselves.",
    setup:
      "A guest scans the QR code at table 12. From that single tap, the whole platform moves in sync.",
    steps: [
      { label: "Order placed at the table", app: "QR & POS" },
      { label: "Tickets route to the right kitchen", app: "KDS" },
      { label: "Stock decrements as it's plated", app: "Inventory" },
      {
        label: "The sale posts to the ledger",
        app: "Sharp-Accounting",
        result: true,
      },
    ],
  },
  {
    icon: HeartPulse,
    industry: "Healthcare",
    status: "Coming soon",
    title: "A patient checks in — care and billing stay in step.",
    setup:
      "From the front desk to the dispensary, every step writes to one connected record.",
    steps: [
      { label: "Appointment booked", app: "Scheduling" },
      { label: "Visit and records captured", app: "Lifco" },
      { label: "Pharmacy dispenses, stock updates", app: "Pharmacy" },
      {
        label: "Billing and insurance, booked",
        app: "Sharp-Accounting",
        result: true,
      },
    ],
  },
  {
    icon: Store,
    industry: "Retail & Mixed",
    status: "Serving today",
    title: "A purchase order clears — straight into inventory and books.",
    setup:
      "Source from a verified organization on the marketplace, and let the transaction settle itself.",
    steps: [
      { label: "Source from a verified supplier", app: "Sharp-Marketplace" },
      { label: "Quote arrives in chat", app: "Cables" },
      { label: "Purchase order created", app: "Sharp-Marketplace" },
      {
        label: "Purchase-to-inventory, booked",
        app: "Sharp-Accounting",
        result: true,
      },
    ],
  },
];

/* ── Sub-components ──────────────────────────────────────────────── */

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

function StepNode({ step, index }: { step: Step; index: number }) {
  return (
    <div
      data-node
      className={`relative flex flex-1 flex-col gap-3 overflow-hidden rounded-xl border p-4 transition-colors duration-300 ${
        step.result
          ? "border-accent-strong/40 bg-accent-light/40"
          : "border-border bg-background hover:border-accent-strong/30"
      }`}
    >
      {step.result && (
        <span
          data-glow
          aria-hidden
          className="pointer-events-none absolute -right-6 -top-6 size-20 rounded-full bg-accent/25 opacity-30 blur-2xl"
        />
      )}

      <div className="relative flex items-center justify-between">
        <span
          className={`flex size-7 items-center justify-center rounded-lg border font-mono text-xs font-semibold ${
            step.result
              ? "border-accent-strong/50 bg-background text-accent-strong"
              : "border-border bg-surface text-text-muted"
          }`}
        >
          {index + 1}
        </span>
        {step.result && (
          <span className="inline-flex items-center gap-1 font-mono text-[9px] font-semibold uppercase tracking-widest text-accent-strong">
            <Check className="size-3" strokeWidth={2.5} />
            Automatic
          </span>
        )}
      </div>

      <p className="relative text-sm font-semibold leading-snug text-text-dark">
        {step.label}
      </p>
      <span
        className={`relative mt-auto inline-flex w-fit rounded-md px-2 py-0.5 font-mono text-[10px] font-medium ${
          step.result
            ? "bg-accent-strong/15 text-accent-strong"
            : "bg-primary-light text-primary"
        }`}
      >
        {step.app}
      </span>
    </div>
  );
}

function Connector() {
  return (
    <div
      data-conn
      className="flex shrink-0 items-center justify-center py-1 lg:w-10 lg:py-0"
    >
      <ChevronDown className="size-4 text-text-faint lg:hidden" strokeWidth={2} />
      <ArrowRight
        className="hidden size-4 text-text-faint lg:block"
        strokeWidth={2}
      />
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────────── */

export function IndustriesUseCasesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const scenariosRef = useRef<HTMLDivElement>(null);

  useIndustriesUseCasesAnimation({ sectionRef, headingRef, scenariosRef });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-border bg-surface/40 py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,oklch(0.97_0_296/0.03)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.97_0_296/0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[40rem] -translate-x-1/2 rounded-full bg-accent/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div ref={headingRef} className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-strong">
            Use cases
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-text-dark sm:text-4xl xl:text-5xl">
            One moment. The whole platform responds.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-text-muted">
            Not features in isolation — real moments where one action ripples
            across every connected app, and the work finishes itself.
          </p>
        </div>

        <div ref={scenariosRef} className="mt-16 flex flex-col gap-8 md:gap-10">
          {scenarios.map((scenario) => (
            <article
              key={scenario.industry}
              data-scenario
              className="relative overflow-hidden rounded-3xl border border-border bg-surface p-7 md:p-10"
            >
              <div
                data-sc-header
                className="border-b border-border pb-7"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl border border-border bg-gradient-to-br from-ink-soft to-surface">
                    <scenario.icon
                      className="size-5 text-text-dark"
                      strokeWidth={1.7}
                    />
                  </div>
                  <span className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent-strong">
                    {scenario.industry}
                  </span>
                  <StatusPill status={scenario.status} />
                </div>
                <h3 className="mt-4 max-w-2xl font-display text-xl font-bold tracking-tight text-text-dark sm:text-2xl">
                  {scenario.title}
                </h3>
                <p className="mt-2 max-w-2xl leading-relaxed text-text-muted">
                  {scenario.setup}
                </p>
              </div>

              <div className="mt-7 flex flex-col gap-1 lg:flex-row lg:items-stretch lg:gap-0">
                {scenario.steps.map((step, i) => (
                  <Fragment key={step.label}>
                    <StepNode step={step} index={i} />
                    {i < scenario.steps.length - 1 && <Connector />}
                  </Fragment>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
