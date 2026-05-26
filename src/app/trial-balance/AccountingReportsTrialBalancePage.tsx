import { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  CheckCircle2,
  AlertCircle,
  Scale,
  ChevronDown,
  Printer,
} from "lucide-react";

/* ─── dummy data ─── */
const DUMMY_ENTITY = {
  name: "Sharp Restaurant Pvt. Ltd.",
  period: "01 Apr 2025 – 29 Mar 2026",
  generatedAt: "29 Mar 2026, 08:00 AM",
};

type TrialBalanceLine = {
  code: string;
  account_name: string;
  group_name: string;
  group_type: "ASSET" | "LIABILITY" | "EQUITY" | "INCOME" | "EXPENSE";
  opening_balance: number;
  opening_is_debit: boolean;
  total_debit: number;
  total_credit: number;
  net_balance: number;
  net_is_debit: boolean;
};

const DUMMY_LINES: TrialBalanceLine[] = [
  // ASSETS
  {
    code: "1100",
    account_name: "Cash in Hand",
    group_name: "Current Assets",
    group_type: "ASSET",
    opening_balance: 50000,
    opening_is_debit: true,
    total_debit: 4400,
    total_credit: 0,
    net_balance: 54400,
    net_is_debit: true,
  },
  {
    code: "1200",
    account_name: "Bank Account – HDFC",
    group_name: "Current Assets",
    group_type: "ASSET",
    opening_balance: 200000,
    opening_is_debit: true,
    total_debit: 18000,
    total_credit: 5000,
    net_balance: 213000,
    net_is_debit: true,
  },
  {
    code: "1300",
    account_name: "Accounts Receivable",
    group_name: "Current Assets",
    group_type: "ASSET",
    opening_balance: 0,
    opening_is_debit: true,
    total_debit: 0,
    total_credit: 0,
    net_balance: 0,
    net_is_debit: true,
  },
  {
    code: "1500",
    account_name: "Kitchen Equipment",
    group_name: "Fixed Assets",
    group_type: "ASSET",
    opening_balance: 150000,
    opening_is_debit: true,
    total_debit: 0,
    total_credit: 0,
    net_balance: 150000,
    net_is_debit: true,
  },

  // LIABILITIES
  {
    code: "2100",
    account_name: "Accounts Payable",
    group_name: "Current Liabilities",
    group_type: "LIABILITY",
    opening_balance: 30000,
    opening_is_debit: false,
    total_debit: 5000,
    total_credit: 8000,
    net_balance: 33000,
    net_is_debit: false,
  },
  {
    code: "2300",
    account_name: "CGST Payable",
    group_name: "Tax Liabilities",
    group_type: "LIABILITY",
    opening_balance: 0,
    opening_is_debit: false,
    total_debit: 0,
    total_credit: 230,
    net_balance: 230,
    net_is_debit: false,
  },
  {
    code: "2400",
    account_name: "SGST Payable",
    group_name: "Tax Liabilities",
    group_type: "LIABILITY",
    opening_balance: 0,
    opening_is_debit: false,
    total_debit: 0,
    total_credit: 230,
    net_balance: 230,
    net_is_debit: false,
  },

  // EQUITY
  {
    code: "3100",
    account_name: "Owner's Capital",
    group_name: "Equity",
    group_type: "EQUITY",
    opening_balance: 300000,
    opening_is_debit: false,
    total_debit: 0,
    total_credit: 0,
    net_balance: 300000,
    net_is_debit: false,
  },
  {
    code: "3200",
    account_name: "Retained Earnings",
    group_name: "Equity",
    group_type: "EQUITY",
    opening_balance: 70000,
    opening_is_debit: false,
    total_debit: 0,
    total_credit: 0,
    net_balance: 70000,
    net_is_debit: false,
  },

  // INCOME
  {
    code: "4100",
    account_name: "Restaurant Sales",
    group_name: "Revenue",
    group_type: "INCOME",
    opening_balance: 10000,
    opening_is_debit: false,
    total_debit: 0,
    total_credit: 13060,
    net_balance: 23060,
    net_is_debit: false,
  },
  {
    code: "4200",
    account_name: "Catering Revenue",
    group_name: "Revenue",
    group_type: "INCOME",
    opening_balance: 0,
    opening_is_debit: false,
    total_debit: 0,
    total_credit: 5000,
    net_balance: 5000,
    net_is_debit: false,
  },

  // EXPENSES
  {
    code: "5100",
    account_name: "Raw Material Cost",
    group_name: "Cost of Goods",
    group_type: "EXPENSE",
    opening_balance: 0,
    opening_is_debit: true,
    total_debit: 8000,
    total_credit: 0,
    net_balance: 8000,
    net_is_debit: true,
  },
  {
    code: "5200",
    account_name: "Staff Salaries",
    group_name: "Operating Expenses",
    group_type: "EXPENSE",
    opening_balance: 0,
    opening_is_debit: true,
    total_debit: 15000,
    total_credit: 0,
    net_balance: 15000,
    net_is_debit: true,
  },
  {
    code: "5300",
    account_name: "Rent",
    group_name: "Operating Expenses",
    group_type: "EXPENSE",
    opening_balance: 0,
    opening_is_debit: true,
    total_debit: 5000,
    total_credit: 0,
    net_balance: 5000,
    net_is_debit: true,
  },
  {
    code: "5400",
    account_name: "Utilities",
    group_name: "Operating Expenses",
    group_type: "EXPENSE",
    opening_balance: 0,
    opening_is_debit: true,
    total_debit: 2000,
    total_credit: 0,
    net_balance: 2000,
    net_is_debit: true,
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

const GROUP_TYPE_COLORS: Record<
  string,
  { badge: string; bar: string; section: string }
> = {
  ASSET: {
    badge: "bg-sky-400/10 border-sky-400/25 text-sky-400",
    bar: "bg-sky-400",
    section: "bg-sky-400/4",
  },
  LIABILITY: {
    badge: "bg-rose-400/10 border-rose-400/25 text-rose-400",
    bar: "bg-rose-400",
    section: "bg-rose-400/4",
  },
  EQUITY: {
    badge: "bg-violet-400/10 border-violet-400/25 text-violet-400",
    bar: "bg-violet-400",
    section: "bg-violet-400/4",
  },
  INCOME: {
    badge: "bg-emerald-400/10 border-emerald-400/25 text-emerald-400",
    bar: "bg-emerald-400",
    section: "bg-emerald-400/4",
  },
  EXPENSE: {
    badge: "bg-amber-400/10 border-amber-400/25 text-amber-400",
    bar: "bg-amber-400",
    section: "bg-amber-400/4",
  },
};

function groupLines(lines: TrialBalanceLine[]) {
  const map: Record<string, TrialBalanceLine[]> = {};
  for (const line of lines) {
    const key = `${line.group_type}__${line.group_name}`;
    if (!map[key]) map[key] = [];
    map[key].push(line);
  }
  return Object.entries(map).map(([key, items]) => ({
    type: key.split("__")[0] as TrialBalanceLine["group_type"],
    name: key.split("__")[1],
    items,
  }));
}

/* ─── page ─── */
export default function AccountingReportsTrialBalancePage() {
  const lines = DUMMY_LINES;
  const groups = groupLines(lines);

  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const toggle = (key: string) =>
    setCollapsed((p) => ({ ...p, [key]: !p[key] }));

  /* totals */
  const totalDr = lines.reduce(
    (s, l) => s + (l.net_is_debit ? l.net_balance : 0),
    0,
  );
  const totalCr = lines.reduce(
    (s, l) => s + (!l.net_is_debit ? l.net_balance : 0),
    0,
  );
  const diff = Math.abs(totalDr - totalCr);
  const balanced = diff < 0.01;

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
        .row-hover:hover { background: hsl(var(--muted)/0.4); }
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
              <Scale className="size-3" /> Trial Balance
            </span>
            <h1 className="font-display italic text-5xl md:text-6xl text-foreground leading-none">
              {DUMMY_ENTITY.name}
            </h1>
            <div className="h-px w-28 bg-linear-to-r from-primary/50 via-primary/20 to-transparent" />
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <span className="cf-mono text-xs text-muted-foreground">
                Period:{" "}
                <span className="text-foreground">{DUMMY_ENTITY.period}</span>
              </span>
              <span className="size-1 rounded-full bg-border/60" />
              <span className="cf-mono text-xs text-muted-foreground">
                Generated:{" "}
                <span className="text-foreground">
                  {DUMMY_ENTITY.generatedAt}
                </span>
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

        {/* ── balance status banner ── */}
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
                  ? "Trial Balance is Balanced"
                  : "Trial Balance is Unbalanced"}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {balanced
                  ? "Total debits equal total credits. Your books are in order."
                  : `Difference of ₹ ${fmt(diff)} detected. Check your journal entries.`}
              </p>
            </div>
          </div>

          {/* Dr / Cr totals */}
          <div className="flex items-center gap-6 shrink-0">
            <div>
              <p className="cf-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                Total Dr
              </p>
              <p className="cf-mono text-sm font-semibold text-sky-400 tabular-nums mt-0.5">
                ₹{" "}
                {new Intl.NumberFormat("en-IN", {
                  minimumFractionDigits: 2,
                }).format(totalDr)}
              </p>
            </div>
            <div className="w-px h-8 bg-border/50" />
            <div>
              <p className="cf-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                Total Cr
              </p>
              <p className="cf-mono text-sm font-semibold text-emerald-400 tabular-nums mt-0.5">
                ₹{" "}
                {new Intl.NumberFormat("en-IN", {
                  minimumFractionDigits: 2,
                }).format(totalCr)}
              </p>
            </div>
            {!balanced && (
              <>
                <div className="w-px h-8 bg-border/50" />
                <div>
                  <p className="cf-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                    Difference
                  </p>
                  <p className="cf-mono text-sm font-semibold text-amber-400 tabular-nums mt-0.5">
                    ₹{" "}
                    {new Intl.NumberFormat("en-IN", {
                      minimumFractionDigits: 2,
                    }).format(diff)}
                  </p>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* ── table ── */}
        <motion.div
          className="rounded-2xl border border-border/60 bg-background/70 backdrop-blur-sm overflow-hidden"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {/* column headers */}
          <div className="grid grid-cols-[60px_1fr_120px_140px_140px_160px] gap-0 px-5 py-2.5 bg-muted/30 border-b border-border/50">
            {[
              "Code",
              "Account",
              "Type",
              "Debit (Dr)",
              "Credit (Cr)",
              "Net Balance",
            ].map((h, i) => (
              <span
                key={h}
                className={`cf-mono text-[10px] tracking-widest uppercase text-muted-foreground/60 ${i >= 3 ? "text-right" : ""}`}
              >
                {h}
              </span>
            ))}
          </div>

          {/* groups */}
          <div className="divide-y divide-border/30">
            {groups.map((group, gi) => {
              const c = GROUP_TYPE_COLORS[group.type];
              const key = `${group.type}__${group.name}`;
              const isOpen = collapsed[key] !== true;
              const grpDr = group.items.reduce(
                (s, l) => s + (l.net_is_debit ? l.net_balance : 0),
                0,
              );
              const grpCr = group.items.reduce(
                (s, l) => s + (!l.net_is_debit ? l.net_balance : 0),
                0,
              );

              return (
                <div key={key}>
                  {/* group header */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: gi * 0.05 }}
                    onClick={() => toggle(key)}
                    className={`w-full grid grid-cols-[60px_1fr_120px_140px_140px_160px] gap-0 px-5 py-3 text-left transition-colors hover:brightness-105 ${c.section}`}
                  >
                    <span className="cf-mono text-[10px] text-muted-foreground/40">
                      —
                    </span>

                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-0.5 h-4 rounded-full ${c.bar} shrink-0`}
                      />
                      <span className="cf-mono text-xs font-semibold text-foreground uppercase tracking-wide">
                        {group.name}
                      </span>
                      <span className="cf-mono text-[10px] text-muted-foreground/50">
                        {group.items.length} accounts
                      </span>
                    </div>

                    <span
                      className={`cf-mono text-[10px] font-medium px-2 py-0.5 rounded-lg border self-center justify-self-start ${c.badge}`}
                    >
                      {group.type}
                    </span>

                    <span className="cf-mono text-xs text-sky-400 text-right self-center tabular-nums">
                      {grpDr > 0 ? fmt(grpDr) : "—"}
                    </span>
                    <span className="cf-mono text-xs text-emerald-400 text-right self-center tabular-nums">
                      {grpCr > 0 ? fmt(grpCr) : "—"}
                    </span>

                    <div className="flex items-center justify-end gap-2">
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.18 }}
                      >
                        <ChevronDown className="size-3.5 text-muted-foreground" />
                      </motion.div>
                    </div>
                  </motion.button>

                  {/* account rows */}
                  {isOpen &&
                    group.items.map((line, li) => (
                      <motion.div
                        key={line.code}
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.15, delay: li * 0.03 }}
                        className="row-hover grid grid-cols-[60px_1fr_120px_140px_140px_160px] gap-0 px-5 py-3 transition-colors border-t border-border/20"
                      >
                        {/* code */}
                        <span className="cf-mono text-[11px] text-muted-foreground/50 self-center">
                          {line.code}
                        </span>

                        {/* name */}
                        <div className="flex items-center gap-2.5 pl-4">
                          <div
                            className={`w-0.5 h-3 rounded-full ${c.bar} shrink-0 opacity-30`}
                          />
                          <span className="text-sm text-foreground">
                            {line.account_name}
                          </span>
                        </div>

                        {/* type — empty for accounts */}
                        <span />

                        {/* debit */}
                        <span
                          className={`cf-mono text-xs text-right self-center tabular-nums ${line.net_is_debit ? "text-sky-400" : "text-muted-foreground/30"}`}
                        >
                          {line.net_is_debit ? fmt(line.net_balance) : "—"}
                        </span>

                        {/* credit */}
                        <span
                          className={`cf-mono text-xs text-right self-center tabular-nums ${!line.net_is_debit ? "text-emerald-400" : "text-muted-foreground/30"}`}
                        >
                          {!line.net_is_debit ? fmt(line.net_balance) : "—"}
                        </span>

                        {/* net balance with badge */}
                        <div className="flex items-center justify-end gap-1.5">
                          <span
                            className={`cf-mono text-xs tabular-nums ${line.net_is_debit ? "text-sky-400" : "text-emerald-400"}`}
                          >
                            {line.net_balance === 0
                              ? "—"
                              : fmt(line.net_balance)}
                          </span>
                          {line.net_balance > 0 && (
                            <span
                              className={`cf-mono text-[10px] px-1.5 py-0.5 rounded border ${
                                line.net_is_debit
                                  ? "bg-sky-400/10 border-sky-400/20 text-sky-400"
                                  : "bg-emerald-400/10 border-emerald-400/20 text-emerald-400"
                              }`}
                            >
                              {line.net_is_debit ? "Dr" : "Cr"}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                </div>
              );
            })}
          </div>

          {/* ── grand total row ── */}
          <div className="grid grid-cols-[60px_1fr_120px_140px_140px_160px] gap-0 px-5 py-4 border-t-2 border-border/60 bg-muted/25">
            <span />
            <span className="cf-mono text-xs font-bold text-foreground uppercase tracking-widest self-center">
              Grand Total
            </span>
            <span />
            <span className="cf-mono text-sm font-bold text-sky-400 text-right self-center tabular-nums">
              ₹{" "}
              {new Intl.NumberFormat("en-IN", {
                minimumFractionDigits: 2,
              }).format(totalDr)}
            </span>
            <span className="cf-mono text-sm font-bold text-emerald-400 text-right self-center tabular-nums">
              ₹{" "}
              {new Intl.NumberFormat("en-IN", {
                minimumFractionDigits: 2,
              }).format(totalCr)}
            </span>
            <div className="flex items-center justify-end">
              {balanced ? (
                <span className="cf-mono text-[10px] px-2.5 py-1 rounded-lg bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="size-3" /> Balanced
                </span>
              ) : (
                <span className="cf-mono text-[10px] px-2.5 py-1 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center gap-1.5">
                  <AlertCircle className="size-3" /> Off by {fmt(diff)}
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* footer */}
        <div className="flex items-center justify-between pb-4">
          <span className="cf-mono text-[10px] text-muted-foreground/40 uppercase tracking-widest">
            {lines.length} accounts · {groups.length} groups
          </span>
          <span className="cf-mono text-[10px] text-muted-foreground/30 uppercase tracking-widest">
            Sharpnr Accounting Engine v1.0
          </span>
        </div>
      </div>
    </>
  );
}
