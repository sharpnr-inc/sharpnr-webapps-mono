import { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Printer,
  ChevronDown,
  Landmark,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

/* ─── dummy data ─── */
const META = {
  entity: "Sharp Restaurant Pvt. Ltd.",
  asOf: "29 Mar 2026",
  generatedAt: "29 Mar 2026, 08:00 AM",
};

type BSLine = {
  code: string;
  account_name: string;
  amount: number;
  is_debit: boolean;
};

type BSSection = {
  label: string;
  lines: BSLine[];
};

const ASSETS: BSSection[] = [
  {
    label: "Current Assets",
    lines: [
      {
        code: "1100",
        account_name: "Cash in Hand",
        amount: 54400,
        is_debit: true,
      },
      {
        code: "1200",
        account_name: "Bank Account – HDFC",
        amount: 213000,
        is_debit: true,
      },
      {
        code: "1300",
        account_name: "Accounts Receivable",
        amount: 0,
        is_debit: true,
      },
      {
        code: "1400",
        account_name: "Prepaid Expenses",
        amount: 3000,
        is_debit: true,
      },
    ],
  },
  {
    label: "Fixed Assets",
    lines: [
      {
        code: "1500",
        account_name: "Kitchen Equipment",
        amount: 150000,
        is_debit: true,
      },
      {
        code: "1600",
        account_name: "Furniture & Fittings",
        amount: 45000,
        is_debit: true,
      },
      { code: "1700", account_name: "Vehicles", amount: 0, is_debit: true },
    ],
  },
];

const LIABILITIES: BSSection[] = [
  {
    label: "Current Liabilities",
    lines: [
      {
        code: "2100",
        account_name: "Accounts Payable",
        amount: 33000,
        is_debit: false,
      },
      {
        code: "2300",
        account_name: "CGST Payable",
        amount: 230,
        is_debit: false,
      },
      {
        code: "2400",
        account_name: "SGST Payable",
        amount: 230,
        is_debit: false,
      },
      {
        code: "2500",
        account_name: "Accrued Expenses",
        amount: 5000,
        is_debit: false,
      },
    ],
  },
  {
    label: "Long-term Liabilities",
    lines: [
      {
        code: "2700",
        account_name: "Bank Loan",
        amount: 100000,
        is_debit: false,
      },
    ],
  },
];

const EQUITY: BSSection[] = [
  {
    label: "Equity",
    lines: [
      {
        code: "3100",
        account_name: "Owner's Capital",
        amount: 300000,
        is_debit: false,
      },
      {
        code: "3200",
        account_name: "Retained Earnings",
        amount: 70000,
        is_debit: false,
      },
      // net profit from P&L flows here
      {
        code: "3300",
        account_name: "Net Profit (Current Period)",
        amount: 9300,
        is_debit: false,
      },
    ],
  },
];

/* ─── helpers ─── */
function fmt(n: number) {
  if (n === 0) return "—";
  return (
    "₹ " +
    new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(n)
  );
}

function sectionTotal(s: BSSection) {
  return s.lines.reduce((t, l) => t + l.amount, 0);
}
function groupTotal(sections: BSSection[]) {
  return sections.reduce((t, s) => t + sectionTotal(s), 0);
}

const COLORS = {
  asset: {
    bar: "bg-sky-400",
    section: "bg-sky-400/4",
    text: "text-sky-400",
    badge: "bg-sky-400/10 border-sky-400/20 text-sky-400",
  },
  liability: {
    bar: "bg-rose-400",
    section: "bg-rose-400/4",
    text: "text-rose-400",
    badge: "bg-rose-400/10 border-rose-400/20 text-rose-400",
  },
  equity: {
    bar: "bg-violet-400",
    section: "bg-violet-400/4",
    text: "text-violet-400",
    badge: "bg-violet-400/10 border-violet-400/20 text-violet-400",
  },
};

/* ─── section block ─── */
function BSSection({
  section,
  colorKey,
  index,
}: {
  section: BSSection;
  colorKey: keyof typeof COLORS;
  index: number;
}) {
  const [open, setOpen] = useState(true);
  const c = COLORS[colorKey];
  const total = sectionTotal(section);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: index * 0.05 }}
    >
      <button
        onClick={() => setOpen((p) => !p)}
        className={`w-full grid grid-cols-[1fr_180px] gap-0 px-5 py-3 text-left transition-colors ${c.section} hover:brightness-105`}
      >
        <div className="flex items-center gap-2.5">
          <div className={`w-0.5 h-4 rounded-full ${c.bar} shrink-0`} />
          <span className="cf-mono text-xs font-semibold text-foreground uppercase tracking-wide">
            {section.label}
          </span>
          <span className="cf-mono text-[10px] text-muted-foreground/50">
            {section.lines.filter((l) => l.amount > 0).length} accounts
          </span>
        </div>
        <div className="flex items-center justify-end gap-2">
          <span
            className={`cf-mono text-xs font-semibold tabular-nums ${c.text}`}
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

      {open &&
        section.lines.map((line, li) => (
          <motion.div
            key={line.code}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.14, delay: li * 0.03 }}
            className="grid grid-cols-[60px_1fr_180px] gap-0 px-5 py-2.5 border-t border-border/20 hover:bg-muted/25 transition-colors"
          >
            <span className="cf-mono text-[11px] text-muted-foreground/40 self-center">
              {line.code}
            </span>
            <div className="flex items-center gap-2.5 pl-4">
              <div
                className={`w-0.5 h-3 rounded-full ${c.bar} shrink-0 opacity-25`}
              />
              <span
                className={`text-sm ${line.amount === 0 ? "text-muted-foreground/40" : "text-foreground"}`}
              >
                {line.account_name}
              </span>
            </div>
            <span
              className={`cf-mono text-xs text-right self-center tabular-nums ${line.amount === 0 ? "text-muted-foreground/30" : c.text}`}
            >
              {fmt(line.amount)}
            </span>
          </motion.div>
        ))}
    </motion.div>
  );
}

/* ─── group block ─── */
function BSGroup({
  title,
  sections,
  colorKey,
  startIndex,
}: {
  title: string;
  sections: BSSection[];
  colorKey: keyof typeof COLORS;
  startIndex: number;
}) {
  const c = COLORS[colorKey];
  const total = groupTotal(sections);

  return (
    <div className="rounded-2xl border border-border/60 bg-background/70 backdrop-blur-sm overflow-hidden">
      {/* group title */}
      <div className={`px-5 py-3 border-b border-border/50 ${c.section}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-1 h-5 rounded-full ${c.bar}`} />
            <span className="cf-mono text-xs font-bold uppercase tracking-[0.15em] text-foreground">
              {title}
            </span>
          </div>
          <span
            className={`cf-mono text-[10px] font-medium px-2.5 py-1 rounded-lg border ${c.badge}`}
          >
            {fmt(total)}
          </span>
        </div>
      </div>

      {/* col header */}
      <div className="grid grid-cols-[1fr_180px] gap-0 px-5 py-2 bg-muted/20 border-b border-border/30">
        <span className="cf-mono text-[10px] tracking-widest uppercase text-muted-foreground/50">
          Account
        </span>
        <span className="cf-mono text-[10px] tracking-widest uppercase text-muted-foreground/50 text-right">
          Amount
        </span>
      </div>

      {/* sections */}
      <div className="divide-y divide-border/30">
        {sections.map((s, i) => (
          <BSSection
            key={s.label}
            section={s}
            colorKey={colorKey}
            index={startIndex + i}
          />
        ))}
      </div>

      {/* subtotal */}
      <div
        className={`grid grid-cols-[1fr_180px] gap-0 px-5 py-3.5 border-t border-border/60 ${c.section}`}
      >
        <span className="cf-mono text-xs font-bold text-foreground uppercase tracking-wider self-center">
          Total {title}
        </span>
        <span
          className={`cf-mono text-sm font-bold text-right self-center tabular-nums ${c.text}`}
        >
          {fmt(total)}
        </span>
      </div>
    </div>
  );
}

/* ─── page ─── */
export function BalanceSheetPage() {
  const totalAssets = groupTotal(ASSETS);
  const totalLiabilities = groupTotal(LIABILITIES);
  const totalEquity = groupTotal(EQUITY);
  const liabPlusEquity = totalLiabilities + totalEquity;
  const balanced = Math.abs(totalAssets - liabPlusEquity) < 0.01;

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
              <Landmark className="size-3" /> Balance Sheet
            </span>
            <h1 className="font-display italic text-5xl md:text-6xl text-foreground leading-none">
              {META.entity}
            </h1>
            <div className="h-px w-28 bg-linear-to-r from-primary/50 via-primary/20 to-transparent" />
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <span className="cf-mono text-xs text-muted-foreground">
                As of: <span className="text-foreground">{META.asOf}</span>
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

        {/* ── accounting equation banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 py-4 rounded-2xl border ${
            balanced
              ? "bg-emerald-400/6 border-emerald-400/25"
              : "bg-amber-400/6 border-amber-400/25"
          }`}
        >
          <div className="flex items-center gap-3">
            {balanced ? (
              <CheckCircle2 className="size-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="size-5 text-amber-400  shrink-0" />
            )}
            <div>
              <p
                className={`text-sm font-semibold ${balanced ? "text-emerald-400" : "text-amber-400"}`}
              >
                {balanced
                  ? "Balance Sheet Balances"
                  : "Balance Sheet is Out of Balance"}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Assets = Liabilities + Equity &nbsp;·&nbsp;
                {balanced
                  ? "The fundamental accounting equation holds."
                  : "Check your journal entries for errors."}
              </p>
            </div>
          </div>

          {/* equation display */}
          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <div className="text-center">
              <p className="cf-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                Assets
              </p>
              <p className="cf-mono text-sm font-bold text-sky-400 tabular-nums">
                ₹{" "}
                {new Intl.NumberFormat("en-IN", {
                  minimumFractionDigits: 2,
                }).format(totalAssets)}
              </p>
            </div>
            <span className="cf-mono text-lg text-muted-foreground">=</span>
            <div className="text-center">
              <p className="cf-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                Liabilities
              </p>
              <p className="cf-mono text-sm font-bold text-rose-400 tabular-nums">
                ₹{" "}
                {new Intl.NumberFormat("en-IN", {
                  minimumFractionDigits: 2,
                }).format(totalLiabilities)}
              </p>
            </div>
            <span className="cf-mono text-lg text-muted-foreground">+</span>
            <div className="text-center">
              <p className="cf-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                Equity
              </p>
              <p className="cf-mono text-sm font-bold text-violet-400 tabular-nums">
                ₹{" "}
                {new Intl.NumberFormat("en-IN", {
                  minimumFractionDigits: 2,
                }).format(totalEquity)}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── two column layout on large screens ── */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* left — assets */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <BSGroup
              title="Assets"
              sections={ASSETS}
              colorKey="asset"
              startIndex={0}
            />
          </motion.div>

          {/* right — liabilities + equity */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <BSGroup
              title="Liabilities"
              sections={LIABILITIES}
              colorKey="liability"
              startIndex={0}
            />

            <BSGroup
              title="Equity"
              sections={EQUITY}
              colorKey="equity"
              startIndex={0}
            />

            {/* liabilities + equity total */}
            <div className="flex items-center justify-between px-5 py-3.5 rounded-2xl border border-border/60 bg-muted/20">
              <span className="cf-mono text-xs font-bold text-foreground uppercase tracking-wider">
                Total Liabilities + Equity
              </span>
              <span
                className={`cf-mono text-sm font-bold tabular-nums ${balanced ? "text-emerald-400" : "text-amber-400"}`}
              >
                ₹{" "}
                {new Intl.NumberFormat("en-IN", {
                  minimumFractionDigits: 2,
                }).format(liabPlusEquity)}
              </span>
            </div>
          </motion.div>
        </div>

        {/* footer */}
        <div className="flex items-center justify-between pb-4">
          <span className="cf-mono text-[10px] text-muted-foreground/40 uppercase tracking-widest">
            {[...ASSETS, ...LIABILITIES, ...EQUITY].reduce(
              (t, s) => t + s.lines.length,
              0,
            )}{" "}
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
