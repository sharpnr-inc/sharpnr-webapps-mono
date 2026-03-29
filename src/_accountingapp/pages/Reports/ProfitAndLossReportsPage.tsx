import { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  TrendingUp,
  TrendingDown,
  Printer,
  ChevronDown,
} from "lucide-react";

/* ─── dummy data ─── */
const META = {
  entity: "Sharp Restaurant Pvt. Ltd.",
  period: "01 Apr 2025 – 29 Mar 2026",
  generatedAt: "29 Mar 2026, 08:00 AM",
};

type PnLLine = {
  code: string;
  account_name: string;
  amount: number;
};

type PnLSection = {
  label: string;
  lines: PnLLine[];
};

const REVENUE: PnLSection[] = [
  {
    label: "Operating Revenue",
    lines: [
      { code: "4100", account_name: "Restaurant Sales", amount: 23060 },
      { code: "4200", account_name: "Catering Revenue", amount: 5000 },
      { code: "4300", account_name: "Delivery Revenue", amount: 8200 },
    ],
  },
  {
    label: "Other Income",
    lines: [
      { code: "4900", account_name: "Miscellaneous Income", amount: 1500 },
    ],
  },
];

const EXPENSES: PnLSection[] = [
  {
    label: "Cost of Goods Sold",
    lines: [
      { code: "5100", account_name: "Raw Material Cost", amount: 8000 },
      { code: "5150", account_name: "Packaging Materials", amount: 1200 },
    ],
  },
  {
    label: "Operating Expenses",
    lines: [
      { code: "5200", account_name: "Staff Salaries", amount: 15000 },
      { code: "5300", account_name: "Rent", amount: 5000 },
      { code: "5400", account_name: "Utilities", amount: 2000 },
      { code: "5500", account_name: "Marketing", amount: 1800 },
      { code: "5600", account_name: "Repairs & Maintenance", amount: 600 },
    ],
  },
  {
    label: "Tax & Compliance",
    lines: [{ code: "5700", account_name: "GST Filed", amount: 460 }],
  },
];

/* ─── helpers ─── */
function fmt(n: number, showSign = false) {
  const s = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(n));
  if (showSign && n < 0) return `(₹ ${s})`;
  return `₹ ${s}`;
}

function sum(sections: PnLSection[]) {
  return sections.reduce(
    (t, s) => t + s.lines.reduce((st, l) => st + l.amount, 0),
    0,
  );
}

function sectionSum(s: PnLSection) {
  return s.lines.reduce((t, l) => t + l.amount, 0);
}

/* ─── collapsible section ─── */
function PnLSectionBlock({
  section,
  color,
  index,
}: {
  section: PnLSection;
  color: "emerald" | "rose";
  index: number;
}) {
  const [open, setOpen] = useState(true);
  const total = sectionSum(section);

  const styles = {
    emerald: {
      bar: "bg-emerald-400",
      section: "bg-emerald-400/4",
      text: "text-emerald-400",
      badge: "bg-emerald-400/10 border-emerald-400/20 text-emerald-400",
    },
    rose: {
      bar: "bg-rose-400",
      section: "bg-rose-400/4",
      text: "text-rose-400",
      badge: "bg-rose-400/10 border-rose-400/20 text-rose-400",
    },
  }[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.06 }}
    >
      {/* section header */}
      <button
        onClick={() => setOpen((p) => !p)}
        className={`w-full grid grid-cols-[1fr_180px] gap-0 px-5 py-3 text-left transition-colors ${styles.section} hover:brightness-105`}
      >
        <div className="flex items-center gap-2.5">
          <div className={`w-0.5 h-4 rounded-full ${styles.bar} shrink-0`} />
          <span className="cf-mono text-xs font-semibold text-foreground uppercase tracking-wide">
            {section.label}
          </span>
          <span className="cf-mono text-[10px] text-muted-foreground/50">
            {section.lines.length} accounts
          </span>
        </div>
        <div className="flex items-center justify-end gap-2">
          <span
            className={`cf-mono text-xs font-semibold tabular-nums ${styles.text}`}
          >
            {fmt(total)}
          </span>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.18 }}
          >
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </motion.div>
        </div>
      </button>

      {/* lines */}
      {open &&
        section.lines.map((line, li) => (
          <motion.div
            key={line.code}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15, delay: li * 0.03 }}
            className="grid grid-cols-[60px_1fr_180px] gap-0 px-5 py-2.5 border-t border-border/20 hover:bg-muted/30 transition-colors"
          >
            <span className="cf-mono text-[11px] text-muted-foreground/40 self-center">
              {line.code}
            </span>
            <div className="flex items-center gap-2.5 pl-4">
              <div
                className={`w-0.5 h-3 rounded-full ${styles.bar} shrink-0 opacity-25`}
              />
              <span className="text-sm text-foreground">
                {line.account_name}
              </span>
            </div>
            <span
              className={`cf-mono text-xs text-right self-center tabular-nums ${styles.text}`}
            >
              {fmt(line.amount)}
            </span>
          </motion.div>
        ))}
    </motion.div>
  );
}

/* ─── page ─── */
export function ProfitAndLossReportsPage() {
  const totalRevenue = sum(REVENUE);
  const totalExpenses = sum(EXPENSES);
  const netProfit = totalRevenue - totalExpenses;
  const isProfit = netProfit >= 0;
  const margin =
    totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(1) : "0.0";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@400;500&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
        .font-display { font-family: 'Instrument Serif', Georgia, serif; }
        .cf-font  { font-family: 'DM Sans', system-ui, sans-serif; }
        .cf-mono  { font-family: 'DM Mono', monospace; }
        .bg-dots {
          background-image: radial-gradient(circle, hsl(var(--foreground)/0.055) 1px, transparent 1px);
          background-size: 24px 24px;
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 bg-dots opacity-35 z-0" />

      <div className="cf-font relative z-10 flex flex-col min-h-screen p-6 md:p-10 gap-8">
        {/* ── hero ── */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-5"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary cf-mono text-[10px] tracking-widest uppercase">
              {isProfit ? (
                <TrendingUp className="size-3" />
              ) : (
                <TrendingDown className="size-3" />
              )}
              Profit & Loss
            </span>
            <h1 className="font-display italic text-5xl md:text-6xl text-foreground leading-none">
              {META.entity}
            </h1>
            <div className="h-px w-28 bg-gradient-to-r from-primary/50 via-primary/20 to-transparent" />
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <span className="cf-mono text-xs text-muted-foreground">
                Period: <span className="text-foreground">{META.period}</span>
              </span>
              <span className="size-1 rounded-full bg-border/60" />
              <span className="cf-mono text-xs text-muted-foreground">
                Generated:{" "}
                <span className="text-foreground">{META.generatedAt}</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border/60 text-muted-foreground hover:bg-muted/40 transition-colors text-xs">
              <Printer className="size-3.5" /> Print
            </button>
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border/60 text-muted-foreground hover:bg-muted/40 transition-colors text-xs">
              <Download className="size-3.5" /> Export
            </button>
          </div>
        </motion.div>

        {/* ── KPI cards ── */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
        >
          {[
            {
              label: "Total Revenue",
              value: fmt(totalRevenue),
              color: "text-emerald-400",
              border: "border-emerald-400/20",
              bg: "bg-emerald-400/5",
            },
            {
              label: "Total Expenses",
              value: fmt(totalExpenses),
              color: "text-rose-400",
              border: "border-rose-400/20",
              bg: "bg-rose-400/5",
            },
            {
              label: isProfit ? "Net Profit" : "Net Loss",
              value: fmt(Math.abs(netProfit)),
              color: isProfit ? "text-sky-400" : "text-amber-400",
              border: isProfit ? "border-sky-400/20" : "border-amber-400/20",
              bg: isProfit ? "bg-sky-400/5" : "bg-amber-400/5",
            },
            {
              label: "Profit Margin",
              value: `${margin}%`,
              color: isProfit ? "text-sky-400" : "text-amber-400",
              border: isProfit ? "border-sky-400/20" : "border-amber-400/20",
              bg: isProfit ? "bg-sky-400/5" : "bg-amber-400/5",
            },
          ].map(({ label, value, color, border, bg }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.15 + i * 0.06 }}
              className={`flex flex-col px-4 py-3.5 rounded-2xl border ${border} ${bg}`}
            >
              <span className="cf-mono text-[10px] tracking-widest uppercase text-muted-foreground/60">
                {label}
              </span>
              <span
                className={`font-display italic text-2xl mt-1 tabular-nums ${color}`}
              >
                {value}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── main table ── */}
        <motion.div
          className="rounded-2xl border border-border/60 bg-background/70 backdrop-blur-sm overflow-hidden"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {/* col headers */}
          <div className="grid grid-cols-[1fr_180px] gap-0 px-5 py-2.5 bg-muted/30 border-b border-border/50">
            <span className="cf-mono text-[10px] tracking-widest uppercase text-muted-foreground/60">
              Account
            </span>
            <span className="cf-mono text-[10px] tracking-widest uppercase text-muted-foreground/60 text-right">
              Amount
            </span>
          </div>

          {/* ── REVENUE ── */}
          <div className="px-5 py-2.5 border-b border-border/40 bg-muted/10">
            <span className="cf-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50 flex items-center gap-1.5">
              <TrendingUp className="size-3" /> Revenue
            </span>
          </div>
          <div className="divide-y divide-border/30">
            {REVENUE.map((s, i) => (
              <PnLSectionBlock
                key={s.label}
                section={s}
                color="emerald"
                index={i}
              />
            ))}
          </div>

          {/* Revenue subtotal */}
          <div className="grid grid-cols-[1fr_180px] gap-0 px-5 py-3.5 border-t border-border/60 bg-emerald-400/6">
            <span className="cf-mono text-xs font-bold text-foreground uppercase tracking-wider self-center">
              Total Revenue
            </span>
            <span className="cf-mono text-sm font-bold text-emerald-400 text-right self-center tabular-nums">
              {fmt(totalRevenue)}
            </span>
          </div>

          {/* ── EXPENSES ── */}
          <div className="px-5 py-2.5 border-t-2 border-border/50 bg-muted/10">
            <span className="cf-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50 flex items-center gap-1.5">
              <TrendingDown className="size-3" /> Expenses
            </span>
          </div>
          <div className="divide-y divide-border/30">
            {EXPENSES.map((s, i) => (
              <PnLSectionBlock
                key={s.label}
                section={s}
                color="rose"
                index={i}
              />
            ))}
          </div>

          {/* Expenses subtotal */}
          <div className="grid grid-cols-[1fr_180px] gap-0 px-5 py-3.5 border-t border-border/60 bg-rose-400/6">
            <span className="cf-mono text-xs font-bold text-foreground uppercase tracking-wider self-center">
              Total Expenses
            </span>
            <span className="cf-mono text-sm font-bold text-rose-400 text-right self-center tabular-nums">
              {fmt(totalExpenses)}
            </span>
          </div>

          {/* ── NET PROFIT / LOSS ── */}
          <div
            className={`grid grid-cols-[1fr_180px] gap-0 px-5 py-5 border-t-2 ${
              isProfit
                ? "border-sky-400/30 bg-sky-400/6"
                : "border-amber-400/30 bg-amber-400/6"
            }`}
          >
            <div className="flex items-center gap-3">
              {isProfit ? (
                <TrendingUp className="size-5 text-sky-400" />
              ) : (
                <TrendingDown className="size-5 text-amber-400" />
              )}
              <div>
                <p
                  className={`cf-mono text-sm font-bold uppercase tracking-widest ${isProfit ? "text-sky-400" : "text-amber-400"}`}
                >
                  {isProfit ? "Net Profit" : "Net Loss"}
                </p>
                <p className="cf-mono text-[10px] text-muted-foreground/50 mt-0.5">
                  Revenue − Expenses · Margin {margin}%
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end justify-center gap-1">
              <span
                className={`font-display italic text-3xl tabular-nums ${isProfit ? "text-sky-400" : "text-amber-400"}`}
              >
                {fmt(Math.abs(netProfit))}
              </span>
              {!isProfit && (
                <span className="cf-mono text-[10px] text-amber-400/70">
                  (Loss)
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* footer */}
        <div className="flex items-center justify-between pb-4">
          <span className="cf-mono text-[10px] text-muted-foreground/40 uppercase tracking-widest">
            {REVENUE.reduce((t, s) => t + s.lines.length, 0) +
              EXPENSES.reduce((t, s) => t + s.lines.length, 0)}{" "}
            accounts
          </span>
          <span className="cf-mono text-[10px] text-muted-foreground/30 uppercase tracking-widest">
            Sharpnr Accounting Engine v1.0
          </span>
        </div>
      </div>
    </>
  );
}
