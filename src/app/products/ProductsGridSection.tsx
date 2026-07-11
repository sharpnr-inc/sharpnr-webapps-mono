import { useRef } from "react";
import {
  ArrowUpRight,
  Calculator,
  Check,
  Database,
  FileText,
  HeartPulse,
  IdCard,
  LayoutDashboard,
  Megaphone,
  MessagesSquare,
  ShieldCheck,
  Store,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { config } from "@/configs/env";
import { useProductsGridAnimation } from "./animations/useProductsGridAnimation";
import { useProductCardHoverAnimation } from "./animations/useProductCardHoverAnimation";

/* ── The four architecture layers — legend + card keys ──────────── */

const layers = [
  { code: "L1", name: "Business Operations" },
  { code: "L2", name: "Organization Control" },
  { code: "L3", name: "Core Services" },
  { code: "L4", name: "B2B Platform" },
] as const;

/* ── Card data — every product from all four layers ─────────────── */

interface ProductCard {
  icon: typeof Check;
  layer: string;
  name: string;
  lead: string;
  features: string[];
  href?: string;
  badge?: string;
  span: string;
}

const cards: ProductCard[] = [
  {
    icon: LayoutDashboard,
    layer: "L2 · Organization Control",
    name: "Orchestrator",
    lead: "Command every Sharp service from one dashboard.",
    features: [
      "Start, stop, and restart services",
      "Service health and status monitoring",
      "Workflow and automation management",
      "Resource usage and session monitoring",
      "Audit logs and administrative activity",
    ],
    href: config.orchestratorAppUrl,
    span: "lg:col-span-2",
  },
  {
    icon: HeartPulse,
    layer: "L1 · Business Operations",
    name: "Lifco",
    lead: "Healthcare operations, unified — patients to billing.",
    features: [
      "Patient management and medical records",
      "Appointment scheduling",
      "Pharmacy and inventory management",
      "Billing and insurance integration",
      "Multi-branch support",
    ],
    badge: "Coming Soon",
    span: "lg:col-span-2",
  },
  {
    icon: Calculator,
    layer: "L3 · Core Services",
    name: "Sharp-Accounting",
    lead: "Books that keep themselves.",
    features: [
      "Double accrual accounting out of the box",
      "Automatic journal entries from business apps",
      "Multi-entity, multi-currency, consolidated statements",
      "Bank reconciliation and cash flow management",
      "Tax calculation, compliance, and audit trails",
      "P&L, balance sheet, cash flow, and custom reports",
    ],
    href: config.accountingAppUrl,
    span: "lg:col-span-3",
  },
  {
    icon: Users,
    layer: "L3 · Core Services",
    name: "Sharp-HR",
    lead: "Your entire workforce in one system.",
    features: [
      "Payroll, attendance, and leave management",
      "Recruitment, onboarding, and offboarding",
      "Shift scheduling and roster management",
      "Performance reviews, goals, and OKRs",
      "Training, assets, and compliance documents",
      "Multi-company and multi-branch support",
    ],
    href: config.hrAppUrl,
    span: "lg:col-span-3",
  },
  {
    icon: Megaphone,
    layer: "L3 · Core Services",
    name: "Sharp-Marketing",
    lead: "From first lead to loyal customer.",
    features: [
      "CRM with pipeline and deal tracking",
      "Email, SMS, and WhatsApp campaigns",
      "Lead capture, scoring, and segmentation",
      "Customer journey automation",
      "Loyalty, rewards, and referral programs",
    ],
    href: config.sharpCRMAppUrl,
    badge: "Soon Sharp-CRM",
    span: "lg:col-span-2",
  },
  {
    icon: MessagesSquare,
    layer: "L3 · Core Services",
    name: "Cables",
    lead: "Communication that moves as fast as your business.",
    features: [
      "Encrypted chat, voice, and video calls",
      "Share invoices and tasks in conversations",
      "Cross-organization collaboration",
      "Guest links — customers need no account",
      "AI-powered summaries and smart search",
    ],
    href: config.cablesAppUrl,
    span: "lg:col-span-2",
  },
  {
    icon: Database,
    layer: "L3 · Core Services",
    name: "Silo",
    lead: "The data foundation for every Sharp app.",
    features: [
      "Object, structured, and file storage",
      "Data lake, warehouse, and lakehouse",
      "API-first, analytics-ready access",
      "Machine learning and AI data storage",
      "Encryption, access control, replication",
    ],
    href: config.siloAppUrl,
    span: "lg:col-span-2",
  },
  {
    icon: FileText,
    layer: "L3 · Core Services",
    name: "Folio",
    lead: "Create, collaborate, and organize knowledge.",
    features: [
      "Docs, sheets, slides, and whiteboards",
      "PDF viewing and annotation",
      "Notes, markdown, and knowledge base",
      "Real-time collaboration and versioning",
      "Shareable workspaces and permissions",
    ],
    href: config.folioAppUrl,
    span: "lg:col-span-2",
  },
  {
    icon: ShieldCheck,
    layer: "L3 · Core Services",
    name: "Cortex",
    lead: "Centralized IT administration and access.",
    features: [
      "Role-based access control",
      "API keys and service accounts",
      "Secret and credential management",
      "Multi-organization administration",
      "Audit logs and security policies",
    ],
    href: config.cortexAppUrl,
    span: "lg:col-span-2",
  },
  {
    icon: IdCard,
    layer: "L3 · Core Services",
    name: "SharpIAM",
    lead: "The portal every employee opens first.",
    features: [
      "Dashboard with tasks and approvals",
      "Leaves, expenses, and payslips",
      "Attendance, timesheets, and shifts",
      "Manager approvals and team views",
      "Org directory and announcements",
    ],
    href: config.iamAppUrl,
    span: "lg:col-span-2",
  },
];

const heroCard = {
  icon: UtensilsCrossed,
  layer: "L1 · Business Operations",
  name: "Sharp-Hospitality",
  lead: "Hotels and restaurants run on chaos. This brings order.",
  description:
    "An all-in-one platform for hotels, restaurants, cafés, bars, and resorts — unified operations, multi-property management, and accounting that records itself.",
  features: [
    "Point of Sale and table management",
    "Kitchen Order Management (KDS)",
    "Room reservations and check-in",
    "Digital menu and QR ordering",
    "Shared kitchens across businesses",
    "Inventory and supplier management",
    "Automatic Sharp-Accounting integration",
    "Multi-branch and multi-property",
  ],
};

const marketplaceCard = {
  icon: Store,
  layer: "L4 · B2B Platform",
  name: "Sharp-Marketplace",
  lead: "Trade org to org. Settle straight into your books.",
  description:
    "A B2B marketplace exclusive to organizations on the Sharp platform — verified suppliers, RFQs, and AI-powered discovery, with purchase orders and invoices created directly from transactions.",
  chips: [
    "Verified suppliers",
    "RFQ and vendor comparison",
    "One-click onboarding",
    "AI-powered discovery",
    "No commissions or charges",
  ],
};

/* ── Helpers ─────────────────────────────────────────────────────── */

const pad = (n: number) => String(n).padStart(2, "0");

/* Cursor-following spotlight orb — animated by useProductCardHoverAnimation */
function SpotlightOrb({
  size = "size-56",
  tone = "bg-accent/25",
}: {
  size?: string;
  tone?: string;
}) {
  return (
    <span
      data-spot
      aria-hidden
      className={`pointer-events-none absolute left-0 top-0 rounded-full opacity-0 blur-3xl will-change-transform ${size} ${tone}`}
    />
  );
}

/* Drawn accent hairline along the top edge — activates on hover */
function TopEdge({ tone = "via-accent" }: { tone?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 top-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100 ${tone}`}
    />
  );
}

/* Material icon tile */
function ModuleIcon({
  icon: Icon,
  lg,
  muted,
}: {
  icon: typeof Check;
  lg?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={`relative flex shrink-0 items-center justify-center rounded-xl border border-border bg-gradient-to-br from-ink-soft to-surface transition-colors duration-300 group-hover:border-accent/40 ${
        lg ? "size-12" : "size-11"
      }`}
    >
      <span className="pointer-events-none absolute inset-x-2 top-0 h-px bg-text-light/10" />
      <Icon
        className={`transition-colors duration-300 ${lg ? "size-6" : "size-5"} ${
          muted ? "text-text-faint" : "text-text-dark group-hover:text-accent"
        }`}
        strokeWidth={1.7}
      />
    </div>
  );
}

/* ── Shared buttons & links ─────────────────────────────────────── */

function LearnMoreButton({ href, dark }: { href: string; dark?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group/btn relative z-10 inline-flex items-center gap-1.5 rounded-md border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
        dark
          ? "border-ink-border text-text-light hover:border-accent/60 hover:bg-ink-soft"
          : "border-border bg-background text-text-dark hover:border-primary hover:bg-primary hover:text-text-light"
      }`}
    >
      Learn More
      <ArrowUpRight className="size-4 transition-transform duration-200 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
    </a>
  );
}

function ModuleLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link relative z-10 inline-flex items-center gap-1.5 text-sm font-semibold text-text-dark transition-colors duration-200 hover:text-accent"
    >
      Learn more
      <ArrowUpRight className="size-4 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
    </a>
  );
}

function ComingSoonTag() {
  return (
    <span className="relative z-10 inline-flex items-center gap-2 text-sm font-medium text-text-faint">
      <span className="size-1.5 animate-pulse rounded-full bg-accent-strong" />
      In development
    </span>
  );
}

/* ── Section ────────────────────────────────────────────────────── */

export function ProductsGridSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useProductsGridAnimation({ sectionRef, headerRef, gridRef });
  useProductCardHoverAnimation({ gridRef });

  return (
    <section ref={sectionRef} className="pb-20 pt-10 md:pb-28 md:pt-14">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* ── System bar: suite spec + layer legend ──────────── */}
        <div
          ref={headerRef}
          className="mb-8 flex flex-col gap-5 border-b border-border pb-7 md:mb-10 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex items-baseline gap-3">
            <span className="font-display text-sm font-semibold text-text-dark">
              The full suite
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-faint">
              12 applications · 4 layers
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
            {layers.map((layer) => (
              <span
                key={layer.code}
                className="flex items-center gap-1.5 font-mono text-[11px] tracking-wide"
              >
                <span className="size-1.5 rounded-full bg-accent-strong" />
                <span className="font-semibold text-accent-strong">
                  {layer.code}
                </span>
                <span className="text-text-faint">{layer.name}</span>
              </span>
            ))}
          </div>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5"
        >
          {/* ── Hero card: Sharp-Hospitality ─────────────────── */}
          <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface p-7 transition-[border-color,box-shadow] duration-300 will-change-transform hover:border-accent-strong/50 hover:shadow-xl sm:col-span-2 md:p-9 lg:col-span-4 lg:row-span-2">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,oklch(0.97_0_296/0.04)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.97_0_296/0.04)_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_80%_70%_at_100%_0%,black,transparent)]" />
            <div className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-accent/10 blur-3xl" />
            <SpotlightOrb size="size-72" tone="bg-accent/20" />
            <TopEdge />

            <div className="relative flex items-start justify-between">
              <ModuleIcon icon={heroCard.icon} lg />
              <div className="flex flex-col items-end gap-1">
                <span className="font-mono text-[11px] font-semibold tracking-[0.1em] text-text-muted">
                  {pad(1)}
                </span>
                <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-text-faint">
                  {heroCard.layer}
                </span>
              </div>
            </div>

            <h2 className="relative mt-6 font-display text-2xl font-bold tracking-tight text-text-dark sm:text-3xl">
              {heroCard.name}
            </h2>
            <p className="relative mt-2 font-display text-base font-semibold text-text-dark sm:text-lg">
              {heroCard.lead}
            </p>
            <p className="relative mt-3 max-w-xl text-sm leading-relaxed text-text-muted">
              {heroCard.description}
            </p>

            <ul className="relative mt-6 grid gap-2.5 border-t border-border pt-6 sm:grid-cols-2">
              {heroCard.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-sm leading-snug text-text-muted"
                >
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-accent-strong"
                    strokeWidth={2}
                  />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="relative z-10 mt-auto flex flex-wrap items-center gap-3 pt-8">
              <a
                href={config.authAppUrl + "/signup"}
                className="group/btn inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-text-light shadow-sm transition-colors duration-200 hover:bg-primary-hover"
              >
                Get Started
                <ArrowUpRight className="size-4 transition-transform duration-200 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
              </a>
              <LearnMoreButton href={config.hospitalityAppUrl} />
              <span className="ml-1 inline-flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-widest text-accent-strong">
                <span className="size-1.5 animate-pulse rounded-full bg-accent-strong" />
                Live
              </span>
            </div>
          </article>

          {/* ── Standard cards ───────────────────────────────── */}
          {cards.map((card, i) => {
            const wide = card.span.includes("lg:col-span-3");
            return (
              <article
                key={card.name}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-[border-color,box-shadow] duration-300 will-change-transform hover:border-accent-strong/50 hover:shadow-xl md:p-7 ${card.span}`}
              >
                <SpotlightOrb />
                <TopEdge />
                {wide && (
                  <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-accent/8 blur-3xl" />
                )}

                <div className="relative flex items-start justify-between gap-3">
                  <ModuleIcon icon={card.icon} muted={!card.href} />
                  <div className="flex flex-col items-end gap-1 pt-0.5">
                    <span className="font-mono text-[11px] font-semibold tracking-[0.1em] text-text-muted">
                      {pad(i + 2)}
                    </span>
                    <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-text-faint">
                      {card.layer}
                    </span>
                  </div>
                </div>

                <div className="relative mt-5 flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-lg font-semibold text-text-dark">
                    {card.name}
                  </h3>
                  {card.badge && (
                    <span className="rounded-full border border-border bg-background/60 px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-widest text-text-muted">
                      {card.badge}
                    </span>
                  )}
                </div>
                <p className="relative mt-1.5 text-sm font-medium leading-snug text-text-muted">
                  {card.lead}
                </p>

                <ul
                  className={`relative mt-5 grid gap-x-5 gap-y-2 border-t border-border/70 pt-5 ${
                    wide ? "lg:grid-cols-2" : ""
                  }`}
                >
                  {card.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-[13px] leading-snug text-text-muted"
                    >
                      <span className="mt-[7px] h-px w-2.5 shrink-0 bg-accent-strong/70 transition-[width] duration-300 group-hover:w-3.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="relative mt-auto pt-6">
                  {card.href ? (
                    <ModuleLink href={card.href} />
                  ) : (
                    <ComingSoonTag />
                  )}
                </div>
              </article>
            );
          })}

          {/* ── Full-width dark card: Sharp-Marketplace ──────── */}
          <article className="group relative flex flex-col gap-8 overflow-hidden rounded-2xl border border-ink-border bg-ink p-7 transition-[border-color,box-shadow] duration-300 will-change-transform hover:border-accent/50 hover:shadow-xl sm:col-span-2 md:p-9 lg:col-span-6 lg:flex-row lg:items-center">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,oklch(0.97_0_296/0.035)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.97_0_296/0.035)_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="pointer-events-none absolute -left-16 -top-24 h-56 w-96 rounded-full bg-accent/15 blur-3xl" />
            <SpotlightOrb size="size-72" tone="bg-accent-glow/20" />
            <TopEdge tone="via-accent-glow" />

            <div className="relative flex-1">
              <div className="flex items-start justify-between gap-3">
                <div className="relative flex size-12 items-center justify-center rounded-xl border border-ink-border bg-gradient-to-br from-ink-soft to-ink transition-colors duration-300 group-hover:border-accent/40">
                  <span className="pointer-events-none absolute inset-x-2 top-0 h-px bg-text-light/10" />
                  <marketplaceCard.icon
                    className="size-6 text-accent-glow"
                    strokeWidth={1.7}
                  />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-mono text-[11px] font-semibold tracking-[0.1em] text-ink-muted">
                    {pad(12)}
                  </span>
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink-muted">
                    {marketplaceCard.layer}
                  </span>
                </div>
              </div>
              <h2 className="mt-6 font-display text-2xl font-bold tracking-tight text-text-light sm:text-3xl">
                {marketplaceCard.name}
              </h2>
              <p className="mt-2 font-display text-base font-semibold text-accent-glow">
                {marketplaceCard.lead}
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
                {marketplaceCard.description}
              </p>
            </div>

            <div className="relative flex flex-col items-start gap-6 lg:w-80 lg:shrink-0">
              <div className="flex flex-wrap gap-2">
                {marketplaceCard.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-md border border-ink-border bg-ink-soft/60 px-2.5 py-1 font-mono text-[11px] text-ink-muted transition-colors duration-300 group-hover:border-accent/30"
                  >
                    {chip}
                  </span>
                ))}
              </div>
              <LearnMoreButton href={config.marketplaceAppUrl} dark />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
