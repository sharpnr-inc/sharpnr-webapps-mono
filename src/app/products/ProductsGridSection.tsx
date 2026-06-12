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
    href: config.marketingAppUrl,
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

/* ── Shared button ──────────────────────────────────────────────── */

function LearnMoreButton({ href, dark }: { href: string; dark?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group/btn inline-flex items-center gap-1.5 rounded-md border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
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

/* ── Section ────────────────────────────────────────────────────── */

export function ProductsGridSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useProductsGridAnimation({ sectionRef, gridRef });
  useProductCardHoverAnimation({ gridRef });

  return (
    <section ref={sectionRef} className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6"
        >
          {/* ── Hero card: Sharp-Hospitality ─────────────────── */}
          <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface p-7 transition-[border-color,box-shadow] duration-300 will-change-transform hover:border-accent-strong/50 hover:shadow-xl sm:col-span-2 md:p-9 lg:col-span-4 lg:row-span-2">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,oklch(0.97_0_296/0.04)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.97_0_296/0.04)_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_80%_70%_at_100%_0%,black,transparent)]" />
            <div className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-accent/10 blur-3xl transition-opacity duration-500 group-hover:opacity-150" />

            <div className="relative flex items-start justify-between">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary-light">
                <heroCard.icon className="size-6 text-primary" strokeWidth={1.7} />
              </div>
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-text-faint">
                {heroCard.layer}
              </span>
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

            <div className="relative mt-auto flex flex-wrap items-center gap-3 pt-8">
              <a
                href={config.authAppUrl + "/signup"}
                className="group/btn inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-text-light shadow-sm transition-colors duration-200 hover:bg-primary-hover"
              >
                Get Started
                <ArrowUpRight className="size-4 transition-transform duration-200 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
              </a>
              <LearnMoreButton href={config.hospitalityAppUrl} />
              <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-accent-strong">
                Live
              </span>
            </div>
          </div>

          {/* ── Standard cards ───────────────────────────────── */}
          {cards.map((card) => (
            <div
              key={card.name}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-[border-color,box-shadow] duration-300 will-change-transform hover:border-accent-strong/50 hover:shadow-xl md:p-7 ${card.span}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary-light">
                  <card.icon className="size-5 text-primary" strokeWidth={1.7} />
                </div>
                <span className="text-right font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-text-faint">
                  {card.layer}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <h3 className="font-display text-lg font-semibold text-text-dark">
                  {card.name}
                </h3>
                {card.badge && (
                  <span className="rounded-full border border-border bg-background px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-widest text-text-muted">
                    {card.badge}
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-sm font-medium leading-snug text-text-muted">
                {card.lead}
              </p>

              <ul className="mt-4 flex flex-col gap-2">
                {card.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-[13px] leading-snug text-text-muted"
                  >
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-accent-strong" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6">
                {card.href ? (
                  <LearnMoreButton href={card.href} />
                ) : (
                  <span className="inline-flex cursor-default items-center gap-1.5 rounded-md border border-dashed border-border px-4 py-2 text-sm font-medium text-text-faint">
                    Coming Soon
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* ── Full-width dark card: Sharp-Marketplace ──────── */}
          <div className="group relative flex flex-col gap-8 overflow-hidden rounded-2xl border border-ink-border bg-ink p-7 transition-[border-color,box-shadow] duration-300 will-change-transform hover:border-accent/50 hover:shadow-xl sm:col-span-2 md:p-9 lg:col-span-6 lg:flex-row lg:items-center">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,oklch(0.97_0_296/0.035)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.97_0_296/0.035)_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="pointer-events-none absolute -left-16 -top-24 h-56 w-96 rounded-full bg-accent/15 blur-3xl" />

            <div className="relative flex-1">
              <div className="flex items-start justify-between gap-3">
                <div className="flex size-12 items-center justify-center rounded-xl bg-ink-soft">
                  <marketplaceCard.icon
                    className="size-6 text-accent-glow"
                    strokeWidth={1.7}
                  />
                </div>
                <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink-muted">
                  {marketplaceCard.layer}
                </span>
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
                    className="rounded-md border border-ink-border bg-ink-soft/60 px-2.5 py-1 font-mono text-[11px] text-ink-muted"
                  >
                    {chip}
                  </span>
                ))}
              </div>
              <LearnMoreButton href={config.marketplaceAppUrl} dark />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
