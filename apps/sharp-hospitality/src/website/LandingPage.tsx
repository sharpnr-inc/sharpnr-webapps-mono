import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "@sharpnr/ui";
import { useTheme } from "@/components/ui/theme-provider";
import {
  ArrowRight,
  ArrowUpRight,
  Hotel,
  UtensilsCrossed,
  Wine,
  Layers,
  Unplug,
  BarChart3,
  Users,
  ClipboardList,
  RefreshCw,
  Shield,
  Boxes,
  Bell,
  Menu,
  X,
  Sun,
  Moon,
  Check,
} from "lucide-react";
import {
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Modules", href: "#modules" },
  { label: "Deployment", href: "#deployment" },
  { label: "Platform", href: "#platform" },
];

const MODULES = [
  {
    id: "restaurant",
    label: "01",
    title: "Restaurant",
    subtitle: "Full-service dining, simplified.",
    icon: UtensilsCrossed,
    tag: "POS + Kitchen",
    description:
      "Orders, tables, menus, kitchen display, billing, and inventory — all synced in real time across every outlet.",
    features: [
      "Table Management",
      "KDS Integration",
      "Menu Builder",
      "Multi-Outlet Billing",
      "Inventory Control",
      "Shift Reports",
    ],
    visual: "restaurant",
  },
  {
    id: "hotel",
    label: "02",
    title: "Hotel",
    subtitle: "Guest experience, front to back.",
    icon: Hotel,
    tag: "Rooms + Guests",
    description:
      "Reservations, check-ins, housekeeping queues, room allocation, invoicing, and multi-property dashboards.",
    features: [
      "PMS Core",
      "Housekeeping Queue",
      "Channel Manager",
      "Folio & Invoicing",
      "Guest Profiles",
      "Multi-Property",
    ],
    visual: "hotel",
  },
  {
    id: "bar",
    label: "03",
    title: "Bar",
    subtitle: "Every pour, perfectly tracked.",
    icon: Wine,
    tag: "Liquor + POS",
    description:
      "Liquor inventory, bar POS workflows, consumption analytics, wastage control, and tab management.",
    features: [
      "Liquor Tracking",
      "Bar POS",
      "Tab Management",
      "Consumption Analytics",
      "Wastage Alerts",
      "Supplier Orders",
    ],
    visual: "bar",
  },
] as const;

const STATS = [
  { value: "10K+", label: "Outlets Running" },
  { value: "3-in-1", label: "Unified Platform" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "< 2s", label: "Sync Latency" },
];

const PLATFORM_FEATURES = [
  {
    icon: Layers,
    title: "Unified Inventory",
    desc: "One stock pool across restaurant, hotel, and bar — no double entries.",
  },
  {
    icon: Users,
    title: "Shared Guest Profiles",
    desc: "A hotel guest is also a restaurant regular. One CRM to know them both.",
  },
  {
    icon: BarChart3,
    title: "Cross-Module Analytics",
    desc: "Revenue, occupancy, and F&B — all in one real-time dashboard.",
  },
  {
    icon: RefreshCw,
    title: "Live Sync",
    desc: "Room charges posted to the restaurant bill. Automatically.",
  },
  {
    icon: Shield,
    title: "Role-Based Access",
    desc: "Barstaff see bar. Front desk sees rooms. SharpIAM-powered.",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    desc: "Low stock, overdue checkout, delayed KDS orders — you'll know before it's a problem.",
  },
  {
    icon: ClipboardList,
    title: "Audit Trails",
    desc: "Every transaction logged. Every edit tracked. Compliant by default.",
  },
  {
    icon: Boxes,
    title: "Multi-Property",
    desc: "Manage 1 location or 100 from the same interface.",
  },
];

const MODES = {
  unified: {
    icon: Layers,
    name: "Unified Mode",
    blurb:
      "Connect all three modules. Share inventory, guests, billing, and analytics across your entire operation.",
    title: "One system. Every operation.",
    items: [
      "Shared inventory across all outlets",
      "Single guest profile for hotel, restaurant & bar",
      "Cross-module billing — room charges to restaurant tab",
      "Consolidated reporting across all verticals",
      "Live sync between kitchen, front desk, and bar",
    ],
  },
  independent: {
    icon: Unplug,
    name: "Independent Mode",
    blurb:
      "Run each module standalone. Ideal for single-vertical businesses. Connect more modules as you grow.",
    title: "Each module on its own terms.",
    items: [
      "Standalone restaurant POS — no hotel required",
      "Hotel PMS without F&B complexity",
      "Bar management fully decoupled",
      "Simpler permissions, focused dashboards",
      "Upgrade to Unified anytime — zero migration",
    ],
  },
} as const;

type ModeKey = keyof typeof MODES;

// ─── Primitives ───────────────────────────────────────────────────────────────

/** Dot-grid backdrop. Uses the theme border token so it adapts to light/dark. */
const DOT_GRID: React.CSSProperties = {
  backgroundImage:
    "radial-gradient(circle, var(--border) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
};

/** Fades the dot grid out toward the edges so it never fights the content. */
const VIGNETTE: React.CSSProperties = {
  background:
    "radial-gradient(ellipse at 50% 45%, transparent 25%, var(--background) 80%)",
};

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
      {children}
    </p>
  );
}

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-14 border-t border-border ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-20 md:px-10 md:py-28">
        {children}
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
}) {
  return (
    <div className="mb-14 max-w-2xl">
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-balance text-foreground sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {sub ? (
        <Reveal delay={0.12}>
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
            {sub}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

/** Square tile that holds a lucide icon — used everywhere for visual rhythm. */
function IconTile({
  icon: Icon,
  active = false,
  className = "",
}: {
  icon: typeof Layers;
  active?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`flex size-9 shrink-0 items-center justify-center rounded-md border transition-colors ${
        active
          ? "border-foreground/20 bg-foreground text-background"
          : "border-border bg-muted text-muted-foreground"
      } ${className}`}
    >
      <Icon className="size-4" />
    </span>
  );
}

// ─── Module visuals (SVG) ─────────────────────────────────────────────────────
// Monochrome by design: state is carried by fill/outline and labels, not hue.

function VisualFrame({ children }: { children: ReactNode }) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-border bg-card p-4 sm:p-6">
      <svg
        viewBox="0 0 320 300"
        className="h-auto w-full"
        role="img"
        aria-hidden="true"
      >
        {children}
      </svg>
    </div>
  );
}

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

function RestaurantVisual() {
  const orders = [
    "Pasta, Tiramisu",
    "Steak x2, Wine",
    "Salad, Espresso",
    "Pizza, Gelato",
  ];
  const tables = [
    { x: 4, y: 62 },
    { x: 164, y: 62 },
    { x: 4, y: 146 },
    { x: 164, y: 146 },
  ];
  return (
    <VisualFrame>
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        <rect
          x={4}
          y={4}
          width={312}
          height={38}
          rx={8}
          fill="var(--muted)"
          stroke="var(--border)"
        />
        <text
          x={18}
          y={28}
          fill="var(--foreground)"
          fontSize="10"
          fontFamily={MONO}
          letterSpacing="1.4"
        >
          KITCHEN DISPLAY · 4 ACTIVE
        </text>
      </motion.g>

      {tables.map((t, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 + i * 0.08 }}
        >
          <rect
            x={t.x}
            y={t.y}
            width={152}
            height={68}
            rx={8}
            fill="var(--background)"
            stroke="var(--border)"
          />
          <text
            x={t.x + 14}
            y={t.y + 24}
            fill="var(--muted-foreground)"
            fontSize="8.5"
            fontFamily={MONO}
            letterSpacing="1.2"
          >
            TABLE {i + 1}
          </text>
          <text
            x={t.x + 14}
            y={t.y + 45}
            fill="var(--foreground)"
            fontSize="11"
            fontWeight="500"
          >
            {orders[i]}
          </text>
          {/* Filled = firing, hollow = plated */}
          <circle
            cx={t.x + 136}
            cy={t.y + 20}
            r={4}
            fill={i % 2 === 0 ? "var(--foreground)" : "none"}
            stroke="var(--muted-foreground)"
          />
        </motion.g>
      ))}

      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <rect
          x={4}
          y={244}
          width={312}
          height={40}
          rx={8}
          fill="var(--foreground)"
        />
        <text
          x={18}
          y={269}
          fill="var(--background)"
          fontSize="10"
          fontFamily={MONO}
          letterSpacing="1.2"
        >
          TODAY · ₹48,200 · 22 COVERS
        </text>
      </motion.g>
    </VisualFrame>
  );
}

function HotelVisual() {
  const statuses = [
    "OCC",
    "FREE",
    "OCC",
    "CLEAN",
    "OCC",
    "FREE",
    "OCC",
    "OCC",
    "CLEAN",
    "FREE",
    "OCC",
    "OCC",
  ];
  return (
    <VisualFrame>
      <motion.text
        x={4}
        y={20}
        fill="var(--foreground)"
        fontSize="10"
        fontFamily={MONO}
        letterSpacing="1.4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        ROOM STATUS · FLOOR 1–3
      </motion.text>

      {statuses.map((status, i) => {
        const x = 4 + (i % 4) * 79;
        const y = 42 + Math.floor(i / 4) * 68;
        const occupied = status === "OCC";
        return (
          <motion.g
            key={i}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ transformOrigin: `${x + 35}px ${y + 28}px` }}
            transition={{ delay: 0.15 + i * 0.04 }}
          >
            <rect
              x={x}
              y={y}
              width={71}
              height={56}
              rx={8}
              fill={occupied ? "var(--muted)" : "var(--background)"}
              stroke="var(--border)"
              strokeDasharray={status === "CLEAN" ? "3 3" : undefined}
            />
            <text
              x={x + 12}
              y={y + 24}
              fill="var(--foreground)"
              fontSize="12"
              fontWeight="600"
              fontFamily={MONO}
            >
              {101 + i}
            </text>
            <text
              x={x + 12}
              y={y + 42}
              fill="var(--muted-foreground)"
              fontSize="8"
              fontFamily={MONO}
              letterSpacing="1"
            >
              {status}
            </text>
          </motion.g>
        );
      })}

      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <rect
          x={4}
          y={252}
          width={312}
          height={36}
          rx={8}
          fill="var(--foreground)"
        />
        <text
          x={18}
          y={275}
          fill="var(--background)"
          fontSize="10"
          fontFamily={MONO}
          letterSpacing="1.2"
        >
          8 OCC · 2 CLEAN · 2 FREE · 75%
        </text>
      </motion.g>
    </VisualFrame>
  );
}

function BarVisual() {
  const stock = [
    { name: "Johnnie Walker", pct: 78 },
    { name: "Grey Goose", pct: 42 },
    { name: "Bacardi", pct: 91 },
    { name: "Hendrick's", pct: 23 },
    { name: "Patron", pct: 67 },
    { name: "Aperol", pct: 55 },
  ];
  return (
    <VisualFrame>
      <motion.text
        x={4}
        y={20}
        fill="var(--foreground)"
        fontSize="10"
        fontFamily={MONO}
        letterSpacing="1.4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        STOCK LEVELS · BAR 1
      </motion.text>

      {stock.map((s, i) => {
        const y = 54 + i * 36;
        const low = s.pct < 30;
        return (
          <motion.g
            key={s.name}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.07 }}
          >
            <text x={4} y={y + 4} fill="var(--foreground)" fontSize="11">
              {s.name}
            </text>
            {low ? (
              <text
                x={132}
                y={y + 4}
                fill="var(--muted-foreground)"
                fontSize="8"
                fontFamily={MONO}
                letterSpacing="1"
              >
                LOW
              </text>
            ) : null}
            <rect
              x={172}
              y={y - 7}
              width={116}
              height={8}
              rx={4}
              fill="var(--muted)"
            />
            <motion.rect
              x={172}
              y={y - 7}
              height={8}
              rx={4}
              fill={low ? "var(--muted-foreground)" : "var(--foreground)"}
              initial={{ width: 0 }}
              animate={{ width: (116 * s.pct) / 100 }}
              transition={{ delay: 0.35 + i * 0.07, duration: 0.6 }}
            />
            <text
              x={316}
              y={y + 3}
              fill="var(--muted-foreground)"
              fontSize="9"
              fontFamily={MONO}
              textAnchor="end"
            >
              {s.pct}%
            </text>
          </motion.g>
        );
      })}

      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
      >
        <rect
          x={4}
          y={252}
          width={312}
          height={36}
          rx={8}
          fill="var(--foreground)"
        />
        <text
          x={18}
          y={275}
          fill="var(--background)"
          fontSize="10"
          fontFamily={MONO}
          letterSpacing="1.2"
        >
          WASTAGE · 3.2L · 1 LOW-STOCK ALERT
        </text>
      </motion.g>
    </VisualFrame>
  );
}

const VISUALS: Record<string, ReactNode> = {
  restaurant: <RestaurantVisual />,
  hotel: <HotelVisual />,
  bar: <BarVisual />,
};

// ─── Navbar ───────────────────────────────────────────────────────────────────

const DARK_QUERY = "(prefers-color-scheme: dark)";

/** Tracks the OS preference so "system" resolves to a concrete icon/label. */
function usePrefersDark() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(DARK_QUERY);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(DARK_QUERY).matches,
    () => false,
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const prefersDark = usePrefersDark();
  const isDark = theme === "dark" || (theme === "system" && prefersDark);

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
}

function Wordmark() {
  return (
    <a href="#top" className="flex items-baseline gap-2">
      <span className="text-base font-semibold tracking-[-0.02em] text-foreground">
        Sharp<span className="text-muted-foreground">Hospitality</span>
      </span>
      <span className="hidden font-mono text-[9px] tracking-[0.18em] text-muted-foreground uppercase sm:inline">
        by SharpNR
      </span>
    </a>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-border bg-background/80 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-6 px-6 md:px-10"
      >
        <Wordmark />

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden h-7 px-3 sm:inline-flex">
            <a href="#cta">Get Started</a>
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden border-t border-border bg-background md:hidden"
          >
            <div className="flex flex-col px-6 py-2">
              {[...NAV_LINKS, { label: "Get Started", href: "#cta" }].map(
                (link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-border py-3 text-sm font-medium text-muted-foreground last:border-0 hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ),
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0" style={DOT_GRID} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={VIGNETTE}
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 pt-32 pb-20 md:px-10 md:pt-44 md:pb-28">
        <motion.div
          {...rise(0)}
          className="flex flex-wrap items-center gap-x-3 gap-y-2"
        >
          <span className="inline-flex items-center rounded-full border border-border bg-card px-2.5 py-1 font-mono text-[9.5px] tracking-[0.22em] text-muted-foreground uppercase">
            SharpNR Suite
          </span>
          <span aria-hidden className="h-px w-8 bg-border" />
          {MODULES.map((m) => (
            <span
              key={m.id}
              className="inline-flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground"
            >
              <m.icon className="size-3.5" />
              {m.title}
            </span>
          ))}
        </motion.div>

        <motion.h1
          {...rise(0.08)}
          className="mt-8 max-w-3xl text-[clamp(2.75rem,8vw,5.25rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-balance text-foreground"
        >
          One platform.
          <br />
          <span className="text-muted-foreground">Every guest.</span>
        </motion.h1>

        <motion.div
          {...rise(0.16)}
          className="mt-10 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
        >
          <div>
            <p className="max-w-lg text-[15px] leading-relaxed text-muted-foreground md:text-base">
              SharpHospitality unifies Restaurant, Hotel, and Bar operations
              under one intelligent platform — purpose-built for modern
              hospitality groups. Run them together or independently. Scale from
              one outlet to a hundred.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="h-10 px-5 text-sm">
                <a href="#cta">
                  Launch Platform <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button asChild variant="outline" className="h-10 px-5 text-sm">
                <a href="#platform">
                  View Documentation <ArrowUpRight className="size-4" />
                </a>
              </Button>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              {["GST Ready", "Multi-currency", "Offline Mode", "PCI-DSS"].map(
                (b) => (
                  <li
                    key={b}
                    className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground uppercase"
                  >
                    {b}
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="flex flex-col gap-2.5">
            {MODULES.map((m) => (
              <div
                key={m.id}
                className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-foreground/25 sm:p-5"
              >
                <IconTile icon={m.icon} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">
                    {m.title}{" "}
                    <span className="font-normal text-muted-foreground">
                      Management
                    </span>
                  </p>
                  <p className="mt-0.5 font-mono text-[9.5px] tracking-[0.16em] text-muted-foreground uppercase">
                    {m.tag}
                  </p>
                </div>
                <span className="font-mono text-xl font-semibold text-border transition-colors group-hover:text-muted-foreground">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────

function StatsBar() {
  return (
    <section className="border-t border-border">
      {/* Hairlines live on the cells: 2-up on mobile, 4-up from md. */}
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 px-6 md:grid-cols-4 md:px-10">
        {STATS.map((s, i) => {
          const lastInMobileRow = i % 2 === 1;
          const lastOverall = i === STATS.length - 1;
          return (
            <Reveal
              key={s.label}
              delay={i * 0.07}
              className={[
                "px-2 py-10 text-center md:py-14",
                lastInMobileRow ? "md:border-r md:border-border" : "border-r",
                lastOverall ? "md:border-r-0" : "",
                i < 2 ? "border-b md:border-b-0" : "",
              ].join(" ")}
            >
              <div className="text-3xl font-semibold tracking-[-0.03em] text-foreground md:text-4xl">
                {s.value}
              </div>
              <div className="mt-2 font-mono text-[9.5px] tracking-[0.2em] text-muted-foreground uppercase">
                {s.label}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

// ─── Deployment modes ─────────────────────────────────────────────────────────

function ModeSection() {
  const [mode, setMode] = useState<ModeKey>("unified");
  const active = MODES[mode];

  return (
    <Section id="deployment">
      <SectionHeading
        eyebrow="Deployment Architecture"
        title="Your platform, your rules."
        sub="Start with a single vertical or connect everything from day one. The data model is the same either way — switching modes never means a migration."
      />

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="flex flex-col gap-3">
          {(Object.keys(MODES) as ModeKey[]).map((key) => {
            const m = MODES[key];
            const selected = mode === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setMode(key)}
                aria-pressed={selected}
                className={`rounded-xl border p-5 text-left transition-colors sm:p-6 ${
                  selected
                    ? "border-foreground/25 bg-muted"
                    : "border-border bg-card hover:border-foreground/15"
                }`}
              >
                <div className="flex items-center gap-3">
                  <IconTile icon={m.icon} active={selected} />
                  <span
                    className={`text-sm font-semibold ${
                      selected ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {m.name}
                  </span>
                  {selected ? (
                    <span className="ml-auto font-mono text-[9px] tracking-[0.18em] text-muted-foreground uppercase">
                      Active
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
                  {m.blurb}
                </p>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
            className="rounded-xl border border-border bg-card p-6 sm:p-8"
          >
            <Eyebrow>
              {mode === "unified" ? "Unified benefits" : "Standalone benefits"}
            </Eyebrow>
            <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-foreground sm:text-2xl">
              {active.title}
            </h3>
            <ul className="mt-6 flex flex-col gap-3.5">
              {active.items.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <span className="text-[14px] leading-relaxed text-foreground">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}

// ─── Modules ──────────────────────────────────────────────────────────────────

function ModulesSection() {
  const [active, setActive] = useState(0);
  const m = MODULES[active];

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next =
      e.key === "ArrowRight"
        ? (active + 1) % MODULES.length
        : (active - 1 + MODULES.length) % MODULES.length;
    setActive(next);
    document.getElementById(`tab-${MODULES[next].id}`)?.focus();
  };

  return (
    <Section id="modules">
      <SectionHeading
        eyebrow="Core Modules"
        title="The three pillars."
        sub="Each module is a complete product on its own. Together they share one inventory, one guest, and one ledger."
      />

      <div
        role="tablist"
        aria-label="Modules"
        onKeyDown={onKeyDown}
        className="inline-flex w-full max-w-md overflow-hidden rounded-lg border border-border sm:w-auto"
      >
        {MODULES.map((mod, i) => {
          const selected = active === i;
          return (
            <button
              key={mod.id}
              id={`tab-${mod.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`panel-${mod.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`flex flex-1 items-center justify-center gap-2 border-r border-border px-4 py-2.5 text-[13px] font-medium transition-colors last:border-r-0 sm:px-8 ${
                selected
                  ? "bg-foreground text-background"
                  : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <mod.icon className="size-4" />
              {mod.title}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={m.id}
          id={`panel-${m.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${m.id}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28 }}
          className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
        >
          <div>
            <span className="font-mono text-3xl font-semibold text-border">
              {m.label}
            </span>
            <h3 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
              {m.title}
            </h3>
            <p className="mt-2 text-lg text-muted-foreground">{m.subtitle}</p>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
              {m.description}
            </p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {m.features.map((f) => (
                <li
                  key={f}
                  className="rounded-full border border-border bg-muted px-3 py-1.5 text-[12.5px] font-medium text-muted-foreground"
                >
                  {f}
                </li>
              ))}
            </ul>

            <Button asChild variant="outline" className="mt-8 h-9 px-4 text-sm">
              <a href="#cta">
                Explore {m.title} <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>

          <div className="order-first lg:order-0">{VISUALS[m.visual]}</div>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}

// ─── Platform grid ────────────────────────────────────────────────────────────

function PlatformFeaturesSection() {
  return (
    <Section id="platform">
      <SectionHeading
        eyebrow="Platform Capabilities"
        title={
          <>
            Built for hospitality.
            <br />
            <span className="text-muted-foreground">
              Obsessed with operations.
            </span>
          </>
        }
      />

      <div className="grid grid-cols-1 border-t border-l border-border sm:grid-cols-2 lg:grid-cols-4">
        {PLATFORM_FEATURES.map((f, i) => (
          <Reveal
            key={f.title}
            delay={(i % 4) * 0.06}
            className="border-r border-b border-border p-6 transition-colors hover:bg-muted/60 md:p-7"
          >
            <IconTile icon={f.icon} />
            <h3 className="mt-5 text-sm font-semibold text-foreground">
              {f.title}
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
              {f.desc}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section
      id="cta"
      className="relative scroll-mt-14 overflow-hidden border-t border-border"
      style={DOT_GRID}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={VIGNETTE}
      />
      <div className="relative mx-auto w-full max-w-3xl px-6 py-24 text-center md:py-32">
        <Reveal>
          <Eyebrow>Ready to begin</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-5 text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.98] font-semibold tracking-[-0.045em] text-balance text-foreground">
            Hospitality,{" "}
            <span className="text-muted-foreground">reimagined.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            From a single outlet to a multi-property group — SharpHospitality
            scales with your ambition. Set up in an afternoon. Run for years.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button className="h-10 px-5 text-sm">
              Start Free Trial <ArrowRight className="size-4" />
            </Button>
            <Button variant="outline" className="h-10 px-5 text-sm">
              Book a Demo
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
        <Wordmark />
        <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <p className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
          A SharpNR product · Powered by SharpIAM
        </p>
      </div>
    </footer>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export function SharpHospitalityWebsite() {
  return (
    <div className="min-h-screen scroll-smooth bg-background text-foreground antialiased">
      <Navbar />
      <main>
        <HeroSection />
        <StatsBar />
        <ModeSection />
        <ModulesSection />
        <PlatformFeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
