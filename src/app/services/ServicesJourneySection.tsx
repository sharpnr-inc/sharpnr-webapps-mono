import { useRef } from "react";
import {
  Calculator,
  ChefHat,
  LayoutDashboard,
  MessagesSquare,
  Store,
  Users,
} from "lucide-react";
import { useServicesJourneyAnimation } from "./animations/useServicesJourneyAnimation";

/* One operating day on Sharpnr — every handoff is automatic. */
const moments = [
  {
    icon: Users,
    time: "08:00",
    app: "Sharp-HR · SharpIAM",
    title: "The shift begins",
    detail:
      "The morning roster goes live. Staff clock in through SharpIAM, and attendance flows straight into payroll.",
  },
  {
    icon: ChefHat,
    time: "12:30",
    app: "Sharp-Hospitality",
    title: "Service at full speed",
    detail:
      "Orders move from QR menus and the POS to the right kitchen displays — across properties and shared kitchens.",
  },
  {
    icon: Calculator,
    time: "12:31",
    app: "Sharp-Accounting",
    title: "The books write themselves",
    detail:
      "Every closed order posts its own journal entry. No manual ledger work, no end-of-day exports.",
  },
  {
    icon: Store,
    time: "15:00",
    app: "Sharp-Marketplace",
    title: "Stock runs low",
    detail:
      "Procurement sends an RFQ to verified suppliers on the network and compares vendors in one view.",
  },
  {
    icon: MessagesSquare,
    time: "15:20",
    app: "Cables",
    title: "The deal closes in-channel",
    detail:
      "Quotations are negotiated in an org-to-org channel, and the purchase order is created from the conversation.",
  },
  {
    icon: LayoutDashboard,
    time: "18:00",
    app: "Orchestrator",
    title: "The whole day, in one view",
    detail:
      "Stakeholders see every branch, every service, and every number — current, consolidated, and in one place.",
  },
] as const;

export function ServicesJourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useServicesJourneyAnimation({ sectionRef, headingRef, spineRef, itemsRef });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-ink-deep py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,oklch(0.97_0_296/0.025)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.97_0_296/0.025)_1px,transparent_1px)] bg-[size:52px_52px]" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[44rem] -translate-x-1/2 rounded-full bg-accent/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div ref={headingRef} className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-glow">
            One operating day
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-text-light sm:text-4xl xl:text-5xl">
            One shift, fully connected.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-muted">
            Follow a single day through a hospitality business on Sharpnr —
            and watch each application hand work to the next, automatically.
          </p>
        </div>

        <div className="relative mx-auto mt-16 max-w-3xl">
          {/* Timeline spine */}
          <div className="absolute bottom-2 left-[19px] top-2 w-px bg-ink-border md:left-1/2" />
          <div
            ref={spineRef}
            className="absolute bottom-2 left-[19px] top-2 w-px bg-accent md:left-1/2"
          />

          <div ref={itemsRef} className="flex flex-col gap-10 md:gap-14">
            {moments.map((moment, i) => (
              <div
                key={moment.time}
                className={`relative flex gap-6 pl-12 md:w-1/2 md:pl-0 ${
                  i % 2 === 0
                    ? "md:mr-auto md:pr-12 md:text-right"
                    : "md:ml-auto md:pl-12"
                }`}
              >
                {/* Node on the spine */}
                <span
                  className={`absolute left-[8px] top-1 flex size-6 items-center justify-center rounded-full border border-accent/50 bg-ink ${
                    i % 2 === 0
                      ? "md:left-auto md:-right-3"
                      : "md:-left-3"
                  }`}
                >
                  <span className="size-1.5 rounded-full bg-accent-glow" />
                </span>

                <div
                  className={`flex-1 rounded-2xl border border-ink-border bg-ink p-6 ${
                    i % 2 === 0 ? "md:text-left" : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2.5">
                      <span className="flex size-8 items-center justify-center rounded-lg bg-ink-soft">
                        <moment.icon
                          className="size-4 text-accent-glow"
                          strokeWidth={1.7}
                        />
                      </span>
                      <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-accent-glow">
                        {moment.app}
                      </span>
                    </span>
                    <span className="font-mono text-xs text-ink-muted">
                      {moment.time}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-text-light">
                    {moment.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {moment.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-14 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">
          The same flow powers healthcare, retail, and every industry to come
        </p>
      </div>
    </section>
  );
}
