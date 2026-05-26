import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Building2,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  ShoppingCart,
  AlertCircle,
  CheckCircle2,
  Truck,
  Import,
} from "lucide-react";
import { useFormsModal } from "@/hooks/FormModalContext";
import { AddNewSupplierForm } from "@/app/components/forms/AddNewSupplier";
import { useNavigate } from "@tanstack/react-router";
import { useLegalEntitySuppliers } from "@/app/api/queries/suppliers";
import { useAccountingStore } from "@/app/store/accounting.store";

/* ─── dummy supplier type (replace with real API type later) ─── */
type Supplier = {
  id: string;
  name: string;
  gst_number: string | null;
  phone: string;
  email: string;
  city: string;
  state: string;
  outstanding_balance: number;
  balance_is_debit: boolean;
  total_purchases: number;
  payment_status: "CLEAR" | "OUTSTANDING" | "OVERDUE";
};

/* ─── dummy data ─── */
const DUMMY_SUPPLIERS: Supplier[] = [
  {
    id: "1",
    name: "Raj Vegetables & Fruits",
    gst_number: "27AABCR1234A1Z5",
    phone: "+91 98765 43210",
    email: "raj@rajveggies.com",
    city: "Jaipur",
    state: "Rajasthan",
    outstanding_balance: 5000,
    balance_is_debit: false,
    total_purchases: 48200,
    payment_status: "OUTSTANDING",
  },
  {
    id: "2",
    name: "ABC Packaging Supplies",
    gst_number: "27XYZAB5678B2Z1",
    phone: "+91 87654 32109",
    email: "orders@abcpack.in",
    city: "Mumbai",
    state: "Maharashtra",
    outstanding_balance: 0,
    balance_is_debit: false,
    total_purchases: 12600,
    payment_status: "CLEAR",
  },
  {
    id: "3",
    name: "Fresh Dairy Co.",
    gst_number: null,
    phone: "+91 76543 21098",
    email: "supply@freshdairy.com",
    city: "Jaipur",
    state: "Rajasthan",
    outstanding_balance: 8750,
    balance_is_debit: false,
    total_purchases: 31000,
    payment_status: "OVERDUE",
  },
  {
    id: "4",
    name: "National Spice Traders",
    gst_number: "07PQRNS9012C3Z8",
    phone: "+91 65432 10987",
    email: "nst@spicetraders.in",
    city: "Delhi",
    state: "Delhi",
    outstanding_balance: 2200,
    balance_is_debit: false,
    total_purchases: 19500,
    payment_status: "OUTSTANDING",
  },
];

/* ─── helpers ─── */
function fmt(n: number) {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

const STATUS_MAP = {
  CLEAR: {
    label: "Clear",
    dot: "bg-emerald-400",
    badge: "bg-emerald-400/10 border-emerald-400/20 text-emerald-400",
  },
  OUTSTANDING: {
    label: "Outstanding",
    dot: "bg-amber-400",
    badge: "bg-amber-400/10 border-amber-400/20 text-amber-400",
  },
  OVERDUE: {
    label: "Overdue",
    dot: "bg-rose-400",
    badge: "bg-rose-400/10 border-rose-400/20 text-rose-400",
  },
};

/* ─── supplier card ─── */
function SupplierCard({
  supplier,
  index,
}: {
  supplier: Supplier;
  index: number;
}) {
  const nav = useNavigate();

  const handleSupplierClick = (supplier: Supplier) => {
    nav({
      to: "/suppliers/$supplierID/details",
      params: { supplierID: supplier.id },
    });
  };
  const status = STATUS_MAP[supplier.payment_status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => handleSupplierClick(supplier)}
      className="group relative rounded-2xl border border-border/60 bg-background/70 backdrop-blur-sm p-5 cursor-pointer hover:border-primary/30 hover:shadow-[0_8px_28px_hsl(var(--primary)/0.1)] transition-all duration-200 overflow-hidden"
    >
      {/* hover gradient wash */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl" />

      {/* top row */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          {/* avatar */}
          <div className="size-10 rounded-xl bg-linear-to-br from-primary/25 to-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <span className="cf-mono text-xs font-bold text-primary">
              {supplier.name
                .split(" ")
                .slice(0, 2)
                .map((w) => w[0])
                .join("")
                .toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground leading-tight">
              {supplier.name}
            </p>
            {supplier.gst_number ? (
              <p className="cf-mono text-[10px] text-muted-foreground/60 mt-0.5">
                {supplier.gst_number}
              </p>
            ) : (
              <p className="cf-mono text-[10px] text-muted-foreground/40 mt-0.5">
                No GST
              </p>
            )}
          </div>
        </div>

        <ArrowUpRight className="size-4 text-muted-foreground/30 group-hover:text-primary/60 transition-colors shrink-0 mt-0.5" />
      </div>

      {/* divider */}
      <div className="h-px bg-border/40 mb-4" />

      {/* contact */}
      <div className="space-y-1.5 mb-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin className="size-3 shrink-0" />
          <span className="truncate">
            {supplier.city}, {supplier.state}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Phone className="size-3 shrink-0" />
          <span className="cf-mono truncate">{supplier.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Mail className="size-3 shrink-0" />
          <span className="truncate">{supplier.email}</span>
        </div>
      </div>

      {/* divider */}
      <div className="h-px bg-border/40 mb-3" />

      {/* financial row */}
      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="cf-mono text-[10px] text-muted-foreground/50 uppercase tracking-widest">
            Outstanding
          </p>
          <p
            className={`cf-mono text-sm font-semibold tabular-nums mt-0.5 ${
              supplier.outstanding_balance > 0
                ? "text-rose-400"
                : "text-emerald-400"
            }`}
          >
            {supplier.outstanding_balance > 0
              ? `₹ ${fmt(supplier.outstanding_balance)}`
              : "Nil"}
          </p>
        </div>

        <div className="text-right">
          <p className="cf-mono text-[10px] text-muted-foreground/50 uppercase tracking-widest">
            Total Purchases
          </p>
          <p className="cf-mono text-xs text-muted-foreground tabular-nums mt-0.5">
            ₹ {fmt(supplier.total_purchases)}
          </p>
        </div>
      </div>

      {/* status badge */}
      <div className="mt-3 flex items-center gap-1.5">
        <span className={`size-1.5 rounded-full ${status.dot} shrink-0`} />
        <span
          className={`cf-mono text-[10px] font-medium px-2 py-0.5 rounded-lg border ${status.badge}`}
        >
          {status.label}
        </span>
      </div>
    </motion.div>
  );
}

/* ─── page ─── */
export function AccountingSupplierHomePage() {
  const selectedLegalEntity = useAccountingStore((s) => s.selectedLegalEntity);
  const { data } = useLegalEntitySuppliers(selectedLegalEntity?.id);
  console.log(data);

  const { showModal } = useFormsModal();
  const [query, setQuery] = useState("");

  const suppliers = DUMMY_SUPPLIERS; // replace with useSuppliers() hook later

  const filtered = suppliers.filter(
    (s) =>
      !query ||
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.city.toLowerCase().includes(query.toLowerCase()) ||
      s.gst_number?.toLowerCase().includes(query.toLowerCase()),
  );

  /* summary stats */
  const totalOutstanding = suppliers.reduce(
    (t, s) => t + s.outstanding_balance,
    0,
  );
  const overdueCount = suppliers.filter(
    (s) => s.payment_status === "OVERDUE",
  ).length;
  const totalPurchases = suppliers.reduce((t, s) => t + s.total_purchases, 0);

  const handleAddSupplier = () =>
    showModal(
      "Add New Supplier",
      "Add a new supplier to your system",
      <AddNewSupplierForm />,
    );

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
        .search-ring:focus-within { box-shadow: 0 0 0 3px hsl(var(--primary)/0.12); }
      `}</style>

      <div className="pointer-events-none fixed inset-0 bg-dots opacity-35 z-0" />

      <div className="cf-font relative z-10 flex flex-col p-6 md:p-10 gap-8">
        {/* ── hero ── */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-5"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary cf-mono text-[10px] tracking-widest uppercase">
              <Truck className="size-3" /> Purchases
            </span>
            <h1 className="font-display italic text-5xl md:text-6xl text-foreground leading-none">
              Suppliers
            </h1>
            <div className="h-px w-28 bg-linear-to-r from-primary/50 via-primary/20 to-transparent" />

            {/* stat pills */}
            <div className="flex flex-wrap items-center gap-5 pt-1">
              {[
                { label: "Suppliers", value: `${suppliers.length}`, color: "" },
                {
                  label: "Total Owed",
                  value: `₹ ${fmt(totalOutstanding)}`,
                  color: "text-rose-400",
                },
                {
                  label: "Total Purchased",
                  value: `₹ ${fmt(totalPurchases)}`,
                  color: "text-sky-400",
                },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex items-baseline gap-1.5">
                  <span
                    className={`font-display italic text-2xl tabular-nums ${color || "text-foreground"}`}
                  >
                    {value}
                  </span>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}

              {/* overdue warning */}
              {overdueCount > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-400/10 border border-rose-400/20">
                  <AlertCircle className="size-3 text-rose-400" />
                  <span className="cf-mono text-[10px] text-rose-400">
                    {overdueCount} overdue
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-3.5">
            <button
              onClick={handleAddSupplier}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors shadow-[0_2px_14px_hsl(var(--primary)/0.3)] shrink-0"
            >
              <Plus className="size-3.5" />
              New Supplier
            </button>

            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors shadow-[0_2px_14px_hsl(var(--primary)/0.3)] shrink-0 self-start sm:self-auto">
              <Import className="size-3.5" />
              Import from ORG
            </button>
          </div>
        </motion.div>

        {/* ── summary cards ── */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
        >
          {[
            {
              label: "Total Outstanding",
              value: `₹ ${fmt(totalOutstanding)}`,
              sub: "Payable to suppliers",
              icon: AlertCircle,
              color: "text-rose-400",
              border: "border-rose-400/20",
              bg: "bg-rose-400/5",
            },
            {
              label: "Cleared Suppliers",
              value: `${suppliers.filter((s) => s.payment_status === "CLEAR").length}`,
              sub: "No outstanding dues",
              icon: CheckCircle2,
              color: "text-emerald-400",
              border: "border-emerald-400/20",
              bg: "bg-emerald-400/5",
            },
            {
              label: "Total Purchases",
              value: `₹ ${fmt(totalPurchases)}`,
              sub: "All time purchases",
              icon: ShoppingCart,
              color: "text-sky-400",
              border: "border-sky-400/20",
              bg: "bg-sky-400/5",
            },
          ].map(({ label, value, sub, icon: Icon, color, border, bg }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, delay: 0.15 + i * 0.06 }}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl border ${border} ${bg}`}
            >
              <div
                className={`size-9 rounded-xl ${bg} border ${border} flex items-center justify-center shrink-0`}
              >
                <Icon className={`size-4 ${color}`} />
              </div>
              <div>
                <p className="cf-mono text-[10px] tracking-widest uppercase text-muted-foreground/60">
                  {label}
                </p>
                <p
                  className={`font-display italic text-xl tabular-nums mt-0.5 ${color}`}
                >
                  {value}
                </p>
                <p className="text-[10px] text-muted-foreground/50 mt-0.5">
                  {sub}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── search + grid ── */}
        <div className="space-y-5">
          {/* search */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex items-center justify-between gap-4"
          >
            <div className="search-ring flex items-center gap-2 px-3 py-2 rounded-xl border border-border/60 bg-background/60 backdrop-blur-sm w-full sm:w-72 transition-all">
              <Search className="size-3.5 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Search suppliers…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="cf-mono bg-transparent text-xs w-full outline-none text-foreground placeholder:text-muted-foreground/50"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-[10px] text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              )}
            </div>

            <span className="cf-mono text-[10px] text-muted-foreground/50 shrink-0">
              {filtered.length} of {suppliers.length} suppliers
            </span>
          </motion.div>

          {/* grid */}
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 gap-4"
              >
                <div className="size-14 rounded-2xl bg-muted/30 border border-border/50 flex items-center justify-center">
                  <Building2 className="size-6 text-muted-foreground/30" />
                </div>
                <div className="text-center">
                  <p className="font-display italic text-xl text-foreground">
                    {query ? `No results for "${query}"` : "No suppliers yet"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {query
                      ? "Try a different name or GST number."
                      : "Add your first supplier to get started."}
                  </p>
                </div>
                {!query && (
                  <button
                    onClick={handleAddSupplier}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
                  >
                    <Plus className="size-3.5" /> Add Supplier
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {filtered.map((supplier, i) => (
                  <SupplierCard
                    key={supplier.id}
                    supplier={supplier}
                    index={i}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* footer */}
        <div className="flex items-center justify-between pt-2 pb-4 border-t border-border/30">
          <span className="cf-mono text-[10px] text-muted-foreground/40 uppercase tracking-widest">
            Sharpnr Accounting Engine v1.0
          </span>
        </div>
      </div>
    </>
  );
}
