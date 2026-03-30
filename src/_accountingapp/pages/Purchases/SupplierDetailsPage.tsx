import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  MapPin,
  Phone,
  Mail,
  FileText,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShoppingCart,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "@/routes/_appuser/dashboard/sharp_accounting/_layout/purchases/$supplierID/details";

/* ─── dummy types ─── */
type SupplierDetail = {
  id: string;
  name: string;
  gst_number: string | null;
  pan_number: string | null;
  phone: string;
  email: string;
  address_line: string;
  city: string;
  state: string;
  pincode: string;
  outstanding_balance: number;
  total_purchases: number;
  payment_status: "CLEAR" | "OUTSTANDING" | "OVERDUE";
};

type PurchaseRecord = {
  id: string;
  reference: string;
  narration: string;
  purchase_date: string;
  total_amount: number;
  payment_status: "UNPAID" | "PARTIAL" | "PAID";
  lines_count: number;
};

type StatementLine = {
  id: string;
  entry_date: string;
  reference: string;
  narration: string;
  debit: number;
  credit: number;
  running_balance: number;
  balance_is_debit: boolean;
};

/* ─── dummy data ─── */
const DUMMY_SUPPLIER: SupplierDetail = {
  id: "1",
  name: "Raj Vegetables & Fruits",
  gst_number: "27AABCR1234A1Z5",
  pan_number: "AABCR1234A",
  phone: "+91 98765 43210",
  email: "raj@rajveggies.com",
  address_line: "Shop 12, Vegetable Market, MI Road",
  city: "Jaipur",
  state: "Rajasthan",
  pincode: "302001",
  outstanding_balance: 5000,
  total_purchases: 48200,
  payment_status: "OUTSTANDING",
};

const DUMMY_PURCHASES: PurchaseRecord[] = [
  {
    id: "p1",
    reference: "BILL-2026-041",
    narration: "Weekly vegetable supply",
    purchase_date: "2026-03-28",
    total_amount: 5000,
    payment_status: "UNPAID",
    lines_count: 4,
  },
  {
    id: "p2",
    reference: "BILL-2026-039",
    narration: "Vegetable supply - bulk order",
    purchase_date: "2026-03-21",
    total_amount: 8200,
    payment_status: "PAID",
    lines_count: 6,
  },
  {
    id: "p3",
    reference: "BILL-2026-031",
    narration: "Weekly vegetable supply",
    purchase_date: "2026-03-14",
    total_amount: 6400,
    payment_status: "PAID",
    lines_count: 5,
  },
  {
    id: "p4",
    reference: "BILL-2026-024",
    narration: "Special order - seasonal stock",
    purchase_date: "2026-03-07",
    total_amount: 12600,
    payment_status: "PAID",
    lines_count: 8,
  },
  {
    id: "p5",
    reference: "BILL-2026-018",
    narration: "Weekly vegetable supply",
    purchase_date: "2026-02-28",
    total_amount: 5800,
    payment_status: "PAID",
    lines_count: 4,
  },
];

const DUMMY_STATEMENT: StatementLine[] = [
  {
    id: "s1",
    entry_date: "2026-03-28T10:00:00+05:30",
    reference: "BILL-2026-041",
    narration: "Vegetable supply received",
    debit: 0,
    credit: 5000,
    running_balance: 5000,
    balance_is_debit: false,
  },
  {
    id: "s2",
    entry_date: "2026-03-21T11:30:00+05:30",
    reference: "PAY-2026-039",
    narration: "Payment made - BILL-039",
    debit: 8200,
    credit: 0,
    running_balance: 0,
    balance_is_debit: false,
  },
  {
    id: "s3",
    entry_date: "2026-03-21T09:00:00+05:30",
    reference: "BILL-2026-039",
    narration: "Vegetable supply received",
    debit: 0,
    credit: 8200,
    running_balance: 8200,
    balance_is_debit: false,
  },
  {
    id: "s4",
    entry_date: "2026-03-14T12:00:00+05:30",
    reference: "PAY-2026-031",
    narration: "Payment made - BILL-031",
    debit: 6400,
    credit: 0,
    running_balance: 0,
    balance_is_debit: false,
  },
  {
    id: "s5",
    entry_date: "2026-03-14T09:30:00+05:30",
    reference: "BILL-2026-031",
    narration: "Vegetable supply received",
    debit: 0,
    credit: 6400,
    running_balance: 6400,
    balance_is_debit: false,
  },
];

/* ─── helpers ─── */
function fmt(n: number) {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(n));
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    time: d.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  };
}

const PURCHASE_STATUS = {
  UNPAID: {
    label: "Unpaid",
    color: "bg-rose-400/10 border-rose-400/25 text-rose-400",
  },
  PARTIAL: {
    label: "Partial",
    color: "bg-amber-400/10 border-amber-400/25 text-amber-400",
  },
  PAID: {
    label: "Paid",
    color: "bg-emerald-400/10 border-emerald-400/25 text-emerald-400",
  },
};

const SUPPLIER_STATUS = {
  CLEAR: { label: "Clear", dot: "bg-emerald-400", text: "text-emerald-400" },
  OUTSTANDING: {
    label: "Outstanding",
    dot: "bg-amber-400",
    text: "text-amber-400",
  },
  OVERDUE: { label: "Overdue", dot: "bg-rose-400", text: "text-rose-400" },
};

/* ─── tab type ─── */
type Tab = "purchases" | "statement";

/* ─── page ─── */
export function SupplierDetailsPage() {
  const { supplierID } = Route.useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("purchases");

  // replace with real API hooks:
  // const { data } = useSupplierDetail(supplierID)
  const supplier = DUMMY_SUPPLIER;
  const purchases = DUMMY_PURCHASES;
  const statement = DUMMY_STATEMENT;

  const status = SUPPLIER_STATUS[supplier.payment_status];

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
        {/* ── breadcrumb ── */}
        <motion.div
          className="flex items-center gap-2 text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={() =>
              navigate({ to: "/dashboard/sharp_accounting/purchases" })
            }
            className="hover:text-foreground transition-colors flex items-center gap-1"
          >
            <ChevronLeft className="size-3" /> Suppliers
          </button>
          <span>/</span>
          <span className="text-foreground font-medium">{supplier.name}</span>
        </motion.div>

        {/* ── hero ── */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-5">
            {/* avatar */}
            <div className="size-16 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <span className="cf-mono text-lg font-bold text-primary">
                {supplier.name
                  .split(" ")
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join("")
                  .toUpperCase()}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="cf-mono text-[10px] tracking-widest uppercase text-muted-foreground">
                  Supplier
                </span>
                <span
                  className={`cf-mono text-[10px] flex items-center gap-1 ${status.text}`}
                >
                  <span className={`size-1.5 rounded-full ${status.dot}`} />
                  {status.label}
                </span>
              </div>
              <h1 className="font-display italic text-4xl md:text-5xl text-foreground leading-tight">
                {supplier.name}
              </h1>
              <div className="h-px w-24 bg-gradient-to-r from-primary/50 via-primary/20 to-transparent" />
            </div>
          </div>

          {/* action button */}
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors shadow-[0_2px_14px_hsl(var(--primary)/0.3)] shrink-0 self-start lg:self-auto">
            <ShoppingCart className="size-3.5" />
            New Purchase
          </button>
        </motion.div>

        {/* ── two column: info + kpis ── */}
        <div className="grid gap-5 lg:grid-cols-3">
          {/* ── left: supplier info ── */}
          <motion.div
            className="lg:col-span-1 space-y-4"
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {/* contact card */}
            <div className="rounded-2xl border border-border/60 bg-background/70 backdrop-blur-sm p-5 space-y-4">
              <p className="cf-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                Contact & Address
              </p>
              <div className="space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <MapPin className="size-3.5 text-muted-foreground shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground leading-snug">
                    {supplier.address_line}, {supplier.city},<br />
                    {supplier.state} – {supplier.pincode}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="size-3.5 text-muted-foreground shrink-0" />
                  <span className="cf-mono text-sm text-foreground">
                    {supplier.phone}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="size-3.5 text-muted-foreground shrink-0" />
                  <span className="text-sm text-foreground truncate">
                    {supplier.email}
                  </span>
                </div>
              </div>
            </div>

            {/* compliance card */}
            <div className="rounded-2xl border border-border/60 bg-background/70 backdrop-blur-sm p-5 space-y-3">
              <p className="cf-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                Compliance
              </p>
              {supplier.gst_number && (
                <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-emerald-400/8 border border-emerald-400/20">
                  <span className="cf-mono text-[10px] uppercase tracking-widest text-emerald-400/70">
                    GST
                  </span>
                  <span className="cf-mono text-xs font-semibold text-emerald-400">
                    {supplier.gst_number}
                  </span>
                </div>
              )}
              {supplier.pan_number && (
                <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-amber-400/8 border border-amber-400/20">
                  <span className="cf-mono text-[10px] uppercase tracking-widest text-amber-400/70">
                    PAN
                  </span>
                  <span className="cf-mono text-xs font-semibold text-amber-400">
                    {supplier.pan_number}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-muted/30 border border-border/40">
                <span className="cf-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
                  ID
                </span>
                <span className="cf-mono text-[10px] text-muted-foreground">
                  {supplierID.slice(0, 12)}…
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── right: kpi cards ── */}
          <motion.div
            className="lg:col-span-2 grid grid-cols-2 gap-3 content-start"
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            {[
              {
                label: "Outstanding Balance",
                value:
                  supplier.outstanding_balance > 0
                    ? `₹ ${fmt(supplier.outstanding_balance)}`
                    : "Nil",
                sub:
                  supplier.outstanding_balance > 0
                    ? "Amount owed to supplier"
                    : "No pending dues",
                icon:
                  supplier.outstanding_balance > 0 ? AlertCircle : CheckCircle2,
                color:
                  supplier.outstanding_balance > 0
                    ? "text-rose-400"
                    : "text-emerald-400",
                border:
                  supplier.outstanding_balance > 0
                    ? "border-rose-400/20"
                    : "border-emerald-400/20",
                bg:
                  supplier.outstanding_balance > 0
                    ? "bg-rose-400/5"
                    : "bg-emerald-400/5",
              },
              {
                label: "Total Purchases",
                value: `₹ ${fmt(supplier.total_purchases)}`,
                sub: "All time purchase value",
                icon: ShoppingCart,
                color: "text-sky-400",
                border: "border-sky-400/20",
                bg: "bg-sky-400/5",
              },
              {
                label: "Total Orders",
                value: `${purchases.length}`,
                sub: "Purchase orders raised",
                icon: FileText,
                color: "text-violet-400",
                border: "border-violet-400/20",
                bg: "bg-violet-400/5",
              },
              {
                label: "Last Purchase",
                value: new Date(purchases[0]?.purchase_date).toLocaleDateString(
                  "en-IN",
                  { day: "2-digit", month: "short", year: "numeric" },
                ),
                sub: purchases[0]?.reference ?? "—",
                icon: Clock,
                color: "text-amber-400",
                border: "border-amber-400/20",
                bg: "bg-amber-400/5",
              },
            ].map(({ label, value, sub, icon: Icon, color, border, bg }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, delay: 0.2 + i * 0.06 }}
                className={`flex flex-col px-5 py-4 rounded-2xl border ${border} ${bg}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="cf-mono text-[10px] tracking-widest uppercase text-muted-foreground/60">
                    {label}
                  </span>
                  <Icon className={`size-3.5 ${color} opacity-60`} />
                </div>
                <span
                  className={`font-display italic text-2xl tabular-nums ${color}`}
                >
                  {value}
                </span>
                <span className="text-[10px] text-muted-foreground/50 mt-1">
                  {sub}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── tabs: purchases / statement ── */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          {/* tab switcher */}
          <div className="flex items-center gap-1 p-1 rounded-xl border border-border/50 bg-muted/20 w-fit">
            {(["purchases", "statement"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`cf-mono text-xs font-medium px-4 py-2 rounded-lg transition-all capitalize ${
                  tab === t
                    ? "bg-background border border-border/60 text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t === "purchases" ? "Purchase History" : "Account Statement"}
              </button>
            ))}
          </div>

          {/* ── purchase history tab ── */}
          <AnimatePresence mode="wait">
            {tab === "purchases" && (
              <motion.div
                key="purchases"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="rounded-2xl border border-border/60 bg-background/70 backdrop-blur-sm overflow-hidden"
              >
                {/* col headers */}
                <div className="grid grid-cols-[1fr_140px_120px_100px_80px] gap-0 px-5 py-2.5 bg-muted/30 border-b border-border/50">
                  {["Reference", "Date", "Amount", "Status", "Lines"].map(
                    (h, i) => (
                      <span
                        key={h}
                        className={`cf-mono text-[10px] tracking-widest uppercase text-muted-foreground/60 ${i >= 2 ? "text-right" : ""}`}
                      >
                        {h}
                      </span>
                    ),
                  )}
                </div>

                <div className="divide-y divide-border/30">
                  {purchases.map((p, i) => {
                    const ps = PURCHASE_STATUS[p.payment_status];
                    return (
                      <motion.div
                        key={p.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.18, delay: i * 0.04 }}
                        className="row-hover grid grid-cols-[1fr_140px_120px_100px_80px] gap-0 px-5 py-3.5 transition-colors cursor-pointer"
                      >
                        <div>
                          <p className="cf-mono text-xs font-semibold text-foreground">
                            {p.reference}
                          </p>
                          <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                            {p.narration}
                          </p>
                        </div>
                        <span className="cf-mono text-xs text-muted-foreground self-center">
                          {new Date(p.purchase_date).toLocaleDateString(
                            "en-IN",
                            { day: "2-digit", month: "short", year: "numeric" },
                          )}
                        </span>
                        <span className="cf-mono text-xs text-foreground text-right self-center tabular-nums">
                          ₹ {fmt(p.total_amount)}
                        </span>
                        <div className="flex justify-end self-center">
                          <span
                            className={`cf-mono text-[10px] font-medium px-2 py-0.5 rounded-lg border ${ps.color}`}
                          >
                            {ps.label}
                          </span>
                        </div>
                        <span className="cf-mono text-xs text-muted-foreground/50 text-right self-center">
                          {p.lines_count}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ── statement tab ── */}
            {tab === "statement" && (
              <motion.div
                key="statement"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="rounded-2xl border border-border/60 bg-background/70 backdrop-blur-sm overflow-hidden"
              >
                {/* col headers */}
                <div className="grid grid-cols-[160px_1fr_1fr_120px_120px_150px] gap-0 px-5 py-2.5 bg-muted/30 border-b border-border/50">
                  {[
                    "Date",
                    "Reference",
                    "Narration",
                    "Debit",
                    "Credit",
                    "Balance",
                  ].map((h, i) => (
                    <span
                      key={h}
                      className={`cf-mono text-[10px] tracking-widest uppercase text-muted-foreground/60 ${i >= 3 ? "text-right" : ""}`}
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <div className="divide-y divide-border/30">
                  {statement.map((line, i) => {
                    const { date, time } = formatDate(line.entry_date);
                    return (
                      <motion.div
                        key={line.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.15, delay: i * 0.04 }}
                        className="row-hover grid grid-cols-[160px_1fr_1fr_120px_120px_150px] gap-0 px-5 py-3 transition-colors"
                      >
                        <div>
                          <p className="cf-mono text-xs text-foreground">
                            {date}
                          </p>
                          <p className="cf-mono text-[10px] text-muted-foreground/50">
                            {time}
                          </p>
                        </div>
                        <span className="cf-mono text-xs font-medium text-foreground self-center truncate pr-3">
                          {line.reference}
                        </span>
                        <span className="cf-mono text-xs text-muted-foreground self-center truncate pr-3">
                          {line.narration}
                        </span>

                        {/* debit */}
                        <div className="flex items-center justify-end gap-1">
                          {line.debit > 0 ? (
                            <>
                              <ArrowDownLeft className="size-3 text-sky-400" />
                              <span className="cf-mono text-xs text-sky-400 tabular-nums">
                                ₹ {fmt(line.debit)}
                              </span>
                            </>
                          ) : (
                            <span className="cf-mono text-xs text-muted-foreground/25">
                              —
                            </span>
                          )}
                        </div>

                        {/* credit */}
                        <div className="flex items-center justify-end gap-1">
                          {line.credit > 0 ? (
                            <>
                              <ArrowUpRight className="size-3 text-rose-400" />
                              <span className="cf-mono text-xs text-rose-400 tabular-nums">
                                ₹ {fmt(line.credit)}
                              </span>
                            </>
                          ) : (
                            <span className="cf-mono text-xs text-muted-foreground/25">
                              —
                            </span>
                          )}
                        </div>

                        {/* running balance */}
                        <div className="flex items-center justify-end gap-1.5">
                          <span
                            className={`cf-mono text-xs tabular-nums ${line.balance_is_debit ? "text-sky-400" : "text-rose-400"}`}
                          >
                            ₹ {fmt(line.running_balance)}
                          </span>
                          <span
                            className={`cf-mono text-[10px] px-1.5 py-0.5 rounded border ${
                              line.balance_is_debit
                                ? "bg-sky-400/10 border-sky-400/20 text-sky-400"
                                : "bg-rose-400/10 border-rose-400/20 text-rose-400"
                            }`}
                          >
                            {line.balance_is_debit ? "Dr" : "Cr"}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* outstanding footer */}
                <div className="grid grid-cols-[160px_1fr_1fr_120px_120px_150px] gap-0 px-5 py-3.5 border-t-2 border-border/60 bg-muted/20">
                  <span className="cf-mono text-xs text-muted-foreground/40">
                    —
                  </span>
                  <span className="cf-mono text-xs font-bold text-foreground uppercase tracking-wider col-span-4 self-center">
                    Outstanding Balance
                  </span>
                  <div className="flex items-center justify-end gap-1.5">
                    <span className="cf-mono text-sm font-bold text-rose-400 tabular-nums">
                      ₹ {fmt(supplier.outstanding_balance)}
                    </span>
                    <span className="cf-mono text-[10px] px-1.5 py-0.5 rounded border bg-rose-400/10 border-rose-400/20 text-rose-400">
                      Cr
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* footer */}
        <div className="flex items-center justify-between pt-2 pb-4 border-t border-border/30">
          <span className="cf-mono text-[10px] text-muted-foreground/40 uppercase tracking-widest">
            Supplier ID: {supplierID}
          </span>
          <span className="cf-mono text-[10px] text-muted-foreground/30 uppercase tracking-widest">
            Sharpnr Accounting Engine v1.0
          </span>
        </div>
      </div>
    </>
  );
}
