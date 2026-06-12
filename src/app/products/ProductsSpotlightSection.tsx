import { useRef } from "react";
import {
  ArrowUpRight,
  Calculator,
  Check,
  LayoutDashboard,
  MessagesSquare,
} from "lucide-react";
import { config } from "@/configs/env";
import { useProductsSpotlightAnimation } from "./animations/useProductsSpotlightAnimation";

/* ── Spotlight copy ─────────────────────────────────────────────── */

const spotlights = [
  {
    icon: Calculator,
    eyebrow: "Sharp-Accounting",
    headline: "Books that keep themselves.",
    body: "Built on double accrual accounting from day one. When Sharp-Hospitality closes an order or Sharp-Marketplace settles a purchase, the journal entry records itself — no manual ledger work, no end-of-day exports.",
    features: [
      "Automatic journal entries from business apps",
      "Parent, child, and subsidiary entity relationships",
      "Consolidated statements across legal entities",
      "Works in any industry or sector",
    ],
    href: config.accountingAppUrl,
  },
  {
    icon: MessagesSquare,
    eyebrow: "Cables",
    headline: "Conversations with context.",
    body: "Encrypted chat, voice, and video — with the rest of your business inside the conversation. Share invoices, records, and tasks directly in threads, collaborate across organizations, and bring customers in with guest links — no account required.",
    features: [
      "Deep context from every Sharp application",
      "Cross-organization collaboration",
      "Temporary guest links for customers",
      "AI-powered summaries and smart search",
    ],
    href: config.cablesAppUrl,
  },
  {
    icon: LayoutDashboard,
    eyebrow: "Orchestrator",
    headline: "Your organization, at a glance.",
    body: "The command center for the entire ecosystem. Provision applications, monitor service health, manage sessions, and orchestrate workflows across every company and branch — while stakeholders see the whole organization in one place.",
    features: [
      "Enable or disable applications per company",
      "Service health and status monitoring",
      "Workflow and automation management",
      "Audit logs and administrative activity",
    ],
    href: config.orchestratorAppUrl,
  },
] as const;

/* ── Mock UI data ───────────────────────────────────────────────── */

const ledgerRows = [
  { account: "1200 · Accounts Receivable", debit: "1,840.00", credit: "" },
  { account: "4010 · Room Revenue", debit: "", credit: "1,600.00" },
  { account: "2300 · Tax Payable", debit: "", credit: "240.00" },
] as const;

const chatMessages = [
  { from: "them", text: "We need 120 chairs for the new lobby — can you quote?" },
  { from: "me", text: "Sending the RFQ now. Delivery in 3 weeks works." },
  { from: "attachment", text: "RFQ-0042 · Lobby seating · 120 units" },
] as const;

const services = [
  { name: "Sharp-Hospitality", status: "Running" },
  { name: "Sharp-Accounting", status: "Running" },
  { name: "Cables", status: "Running" },
  { name: "Lifco", status: "Provisioning" },
] as const;

/* ── Mock UI panels — code-drawn, no images ─────────────────────── */

function MockChrome({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-ink-border px-4 py-3">
      <span className="size-2 rounded-full bg-ink-border" />
      <span className="size-2 rounded-full bg-ink-border" />
      <span className="size-2 rounded-full bg-ink-border" />
      <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
        {title}
      </span>
    </div>
  );
}

function LedgerMock({ mockRef }: { mockRef: (el: HTMLDivElement | null) => void }) {
  return (
    <div className="overflow-hidden rounded-xl border border-ink-border bg-ink shadow-2xl">
      <MockChrome title="Sharp-Accounting · Journal" />
      <div ref={mockRef} className="flex flex-col gap-2.5 p-5">
        <div className="flex items-center justify-between">
          <span className="rounded-md bg-accent-light px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-widest text-accent-glow">
            Entry · Automatic
          </span>
          <span className="font-mono text-[10px] text-ink-muted">
            From Sharp-Hospitality · Order #2184
          </span>
        </div>
        {ledgerRows.map((row) => (
          <div
            key={row.account}
            className="flex items-center justify-between rounded-lg border border-ink-border bg-ink-soft/50 px-3.5 py-2.5"
          >
            <span className="font-mono text-xs text-ink-muted">{row.account}</span>
            <span className="flex gap-6 font-mono text-xs">
              <span className="w-16 text-right text-text-light">{row.debit}</span>
              <span className="w-16 text-right text-accent-glow">{row.credit}</span>
            </span>
          </div>
        ))}
        <div className="flex items-center justify-between px-3.5 pt-1">
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
            Balanced
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-accent-glow">
            <Check className="size-3" strokeWidth={2.5} /> Posted to ledger
          </span>
        </div>
      </div>
    </div>
  );
}

function ChatMock({ mockRef }: { mockRef: (el: HTMLDivElement | null) => void }) {
  return (
    <div className="overflow-hidden rounded-xl border border-ink-border bg-ink shadow-2xl">
      <MockChrome title="Cables · Org-to-Org Channel" />
      <div ref={mockRef} className="flex flex-col gap-3 p-5">
        {chatMessages.map((message) =>
          message.from === "attachment" ? (
            <div
              key={message.text}
              className="flex items-center gap-2.5 self-end rounded-lg border border-accent/40 bg-accent-light px-3.5 py-2.5"
            >
              <span className="flex size-7 items-center justify-center rounded-md bg-ink font-mono text-[9px] font-bold text-accent-glow">
                RFQ
              </span>
              <span className="font-mono text-[11px] text-text-light">
                {message.text}
              </span>
            </div>
          ) : (
            <div
              key={message.text}
              className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                message.from === "me"
                  ? "self-end rounded-br-sm bg-primary text-text-light"
                  : "self-start rounded-bl-sm bg-ink-soft text-ink-muted"
              }`}
            >
              {message.text}
            </div>
          ),
        )}
        <div className="flex items-center gap-2 pt-1">
          <span className="size-1.5 animate-pulse rounded-full bg-accent-glow" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
            Verified organization · encrypted
          </span>
        </div>
      </div>
    </div>
  );
}

function ConsoleMock({ mockRef }: { mockRef: (el: HTMLDivElement | null) => void }) {
  return (
    <div className="overflow-hidden rounded-xl border border-ink-border bg-ink shadow-2xl">
      <MockChrome title="Orchestrator · Services" />
      <div ref={mockRef} className="flex flex-col gap-2.5 p-5">
        {services.map((service) => (
          <div
            key={service.name}
            className="flex items-center justify-between rounded-lg border border-ink-border bg-ink-soft/50 px-3.5 py-2.5"
          >
            <span className="flex items-center gap-2.5">
              <span
                className={`size-2 rounded-full ${
                  service.status === "Running"
                    ? "bg-accent-glow"
                    : "animate-pulse bg-text-faint"
                }`}
              />
              <span className="font-mono text-xs text-text-light">
                {service.name}
              </span>
            </span>
            <span
              className={`font-mono text-[10px] uppercase tracking-widest ${
                service.status === "Running"
                  ? "text-accent-glow"
                  : "text-ink-muted"
              }`}
            >
              {service.status}
            </span>
          </div>
        ))}
        <div className="flex items-center justify-between px-3.5 pt-1">
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
            2 companies · 5 branches
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-accent-glow">
            All systems healthy
          </span>
        </div>
      </div>
    </div>
  );
}

const mocks = [LedgerMock, ChatMock, ConsoleMock] as const;

/* ── Section ────────────────────────────────────────────────────── */

export function ProductsSpotlightSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const mockRefs = useRef<Array<HTMLDivElement | null>>([]);

  useProductsSpotlightAnimation({ sectionRef, headingRef, panelRefs, mockRefs });

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
            In the flow of work
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-text-light sm:text-4xl xl:text-5xl">
            See the ecosystem at work.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-muted">
            Not screenshots — these are the moments where Sharpnr applications
            hand work to each other, automatically.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-20 lg:gap-24">
          {spotlights.map((spotlight, i) => {
            const Mock = mocks[i];
            return (
              <div
                key={spotlight.eyebrow}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-ink-soft">
                      <spotlight.icon
                        className="size-5 text-accent-glow"
                        strokeWidth={1.7}
                      />
                    </div>
                    <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-glow">
                      {spotlight.eyebrow}
                    </p>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-text-light sm:text-3xl">
                    {spotlight.headline}
                  </h3>
                  <p className="mt-4 leading-relaxed text-ink-muted">
                    {spotlight.body}
                  </p>
                  <ul className="mt-6 flex flex-col gap-2.5">
                    {spotlight.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm leading-snug text-ink-muted"
                      >
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-accent-glow"
                          strokeWidth={2}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={spotlight.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-7 inline-flex items-center gap-1.5 rounded-md border border-ink-border px-4 py-2 text-sm font-medium text-text-light transition-colors duration-200 hover:border-accent/60 hover:bg-ink-soft"
                  >
                    Learn More
                    <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>

                <Mock
                  mockRef={(el) => {
                    mockRefs.current[i] = el;
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
