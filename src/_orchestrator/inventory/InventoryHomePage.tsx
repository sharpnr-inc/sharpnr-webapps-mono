import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  Warehouse,
  AlertTriangle,
  IndianRupee,
  Plus,
  ChevronRight,
  Layers,
  Share2,
  Lock,
  MoreHorizontal,
  Box,
} from "lucide-react";
import { useInventoryAccounts } from "./api/queries";
import { useFormsModal } from "@/context/FormModalContext";
import { AddNewInventoryAccountForm } from "./forms/AddNewInventoryAccount";

/* ─── type matching API response ─── */
type InventoryAccount = {
  ID: string;
  OrganizationID: string;
  Name: string;
  Type: string; // KITCHEN | WAREHOUSE | STORE
  IsShared: boolean;
  CreatedAt: string;
  UpdatedAt: string;
};

/* ─── helpers ─── */
const TYPE_CONFIG: Record<
  string,
  {
    icon: React.ElementType;
    label: string;
    color: string;
    bar: string;
    section: string;
  }
> = {
  KITCHEN: {
    icon: Box,
    label: "Kitchen",
    color: "bg-amber-400/10 border-amber-400/25 text-amber-400",
    bar: "bg-amber-400",
    section: "from-amber-400/6",
  },
  WAREHOUSE: {
    icon: Warehouse,
    label: "Warehouse",
    color: "bg-sky-400/10 border-sky-400/25 text-sky-400",
    bar: "bg-sky-400",
    section: "from-sky-400/6",
  },
  STORE: {
    icon: Package,
    label: "Store",
    color: "bg-violet-400/10 border-violet-400/25 text-violet-400",
    bar: "bg-violet-400",
    section: "from-violet-400/6",
  },
};

const typeConfig = (t: string) =>
  TYPE_CONFIG[t?.toUpperCase()] ?? {
    icon: Layers,
    label: t,
    color: "bg-muted/30 border-border/40 text-muted-foreground",
    bar: "bg-muted-foreground",
    section: "from-muted/10",
  };

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/* ─── KPI stat card ─── */
function StatCard({
  title,
  value,
  icon: Icon,
  color,
  border,
  bg,
  index,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
  border: string;
  bg: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.06 }}
      className={`flex items-center gap-4 px-5 py-4 rounded-2xl border ${border} ${bg}`}
    >
      <div
        className={`size-9 rounded-xl ${bg} border ${border} flex items-center justify-center shrink-0`}
      >
        <Icon className={`size-4 ${color}`} />
      </div>
      <div>
        <p className="cf-mono text-[10px] tracking-widest uppercase text-muted-foreground/60">
          {title}
        </p>
        <p
          className={`font-display italic text-2xl tabular-nums mt-0.5 ${color}`}
        >
          {value}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── inventory account card ─── */
function AccountCard({
  account,
  index,
}: {
  account: InventoryAccount;
  index: number;
}) {
  const cfg = typeConfig(account.Type);
  const Icon = cfg.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group relative rounded-2xl border border-border/60 bg-background/70 backdrop-blur-sm overflow-hidden cursor-pointer hover:border-primary/30 hover:shadow-[0_8px_28px_hsl(var(--primary)/0.1)] transition-all duration-200"
    >
      {/* gradient top wash */}
      <div
        className={`absolute inset-x-0 top-0 h-16 bg-gradient-to-b ${cfg.section} to-transparent pointer-events-none`}
      />

      {/* hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl" />

      <div className="relative p-5 space-y-4">
        {/* top row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`size-10 rounded-xl border flex items-center justify-center shrink-0 ${cfg.color}`}
            >
              <Icon className="size-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground leading-tight">
                {account.Name}
              </p>
              <span
                className={`cf-mono text-[10px] font-medium px-1.5 py-0.5 rounded border mt-0.5 inline-block ${cfg.color}`}
              >
                {cfg.label}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {account.IsShared ? (
              <span className="cf-mono text-[10px] flex items-center gap-1 px-2 py-0.5 rounded-lg border bg-emerald-400/10 border-emerald-400/20 text-emerald-400">
                <Share2 className="size-2.5" /> Shared
              </span>
            ) : (
              <span className="cf-mono text-[10px] flex items-center gap-1 px-2 py-0.5 rounded-lg border bg-muted/30 border-border/40 text-muted-foreground/50">
                <Lock className="size-2.5" /> Private
              </span>
            )}
          </div>
        </div>

        {/* divider */}
        <div className="h-px bg-border/40" />

        {/* meta row */}
        <div className="flex items-center justify-between">
          <div>
            <p className="cf-mono text-[10px] text-muted-foreground/50 uppercase tracking-widest">
              Created
            </p>
            <p className="cf-mono text-xs text-muted-foreground mt-0.5">
              {fmtDate(account.CreatedAt)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="size-7 rounded-lg border border-border/50 flex items-center justify-center text-muted-foreground hover:bg-muted/40 transition-colors opacity-0 group-hover:opacity-100">
              <MoreHorizontal className="size-3.5" />
            </button>
            <div className="size-7 rounded-lg border border-border/50 flex items-center justify-center text-muted-foreground/30 group-hover:text-primary/60 group-hover:border-primary/30 transition-colors">
              <ChevronRight className="size-3.5" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── quick action card ─── */
function QuickAction({
  title,
  description,
  icon: Icon,
  color,
  border,
  bg,
  onClick,
  index,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  border: string;
  bg: string;
  onClick?: () => void;
  index: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: 0.3 + index * 0.07 }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`text-left w-full flex items-center gap-4 px-5 py-4 rounded-2xl border ${border} ${bg} hover:brightness-105 transition-all`}
    >
      <div
        className={`size-9 rounded-xl ${bg} border ${border} flex items-center justify-center shrink-0`}
      >
        <Icon className={`size-4 ${color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold ${color}`}>{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
          {description}
        </p>
      </div>
      <ChevronRight className={`size-4 ${color} opacity-50 shrink-0`} />
    </motion.button>
  );
}

/* ─── page ─── */
export function InventoryHomePage() {
  const { data: inventoryRes, isLoading } = useInventoryAccounts();
  const { showModal } = useFormsModal();

  const accounts: InventoryAccount[] = inventoryRes?.data ?? [];

  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  const uniqueTypes = [
    ...new Set(accounts.map((a) => a.Type?.toUpperCase()).filter(Boolean)),
  ];

  const filtered = accounts.filter(
    (a) => !typeFilter || a.Type?.toUpperCase() === typeFilter,
  );

  const handleNewAccount = () =>
    showModal(
      "New Inventory Account",
      "Add a new inventory account to your organisation",
      <AddNewInventoryAccountForm />,
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
      `}</style>

      <div className="pointer-events-none fixed inset-0 bg-dots opacity-35 z-0" />

      <div className="cf-font relative z-10 flex flex-col p-4 md:p-10 gap-8">
        {/* ── hero ── */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-5"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary cf-mono text-[10px] tracking-widest uppercase">
              <Layers className="size-3" /> Inventory
            </span>
            <h1 className="font-display italic text-5xl md:text-6xl text-foreground leading-none">
              Inventory Dashboard
            </h1>
            <div className="h-px w-28 bg-gradient-to-r from-primary/50 via-primary/20 to-transparent" />
            <p className="text-sm text-muted-foreground max-w-lg">
              Overview of your inventory accounts, warehouse activity, and stock
              performance.
            </p>
          </div>

          <button
            onClick={handleNewAccount}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors shadow-[0_2px_14px_hsl(var(--primary)/0.3)] shrink-0 self-start sm:self-auto"
          >
            <Plus className="size-3.5" />
            New Inventory Account
          </button>
        </motion.div>

        {/* ── KPI stats ── */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
        >
          {[
            {
              title: "Inventory Accounts",
              value: isLoading ? "—" : `${accounts.length}`,
              icon: Layers,
              color: "text-primary",
              border: "border-primary/20",
              bg: "bg-primary/5",
            },
            {
              title: "Total Items",
              value: "—",
              icon: Package,
              color: "text-sky-400",
              border: "border-sky-400/20",
              bg: "bg-sky-400/5",
            },
            {
              title: "Low Stock",
              value: "—",
              icon: AlertTriangle,
              color: "text-amber-400",
              border: "border-amber-400/20",
              bg: "bg-amber-400/5",
            },
            {
              title: "Inventory Value",
              value: "—",
              icon: IndianRupee,
              color: "text-emerald-400",
              border: "border-emerald-400/20",
              bg: "bg-emerald-400/5",
            },
          ].map((s, i) => (
            <StatCard key={s.title} {...s} index={i} />
          ))}
        </motion.div>

        {/* ── quick actions ── */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <p className="cf-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
            Quick Actions
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            <QuickAction
              title="Add Inventory Item"
              description="Create a new item inside an inventory account"
              icon={Package}
              color="text-sky-400"
              border="border-sky-400/20"
              bg="bg-sky-400/5"
              index={0}
            />
            <QuickAction
              title="Stock Transfer"
              description="Move stock between inventory accounts"
              icon={Share2}
              color="text-violet-400"
              border="border-violet-400/20"
              bg="bg-violet-400/5"
              index={1}
            />
            <QuickAction
              title="Raise Purchase Order"
              description="Order items from a supplier"
              icon={Warehouse}
              color="text-amber-400"
              border="border-amber-400/20"
              bg="bg-amber-400/5"
              index={2}
            />
          </div>
        </motion.div>

        {/* ── inventory accounts ── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <p className="cf-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground flex items-center gap-1.5">
              <Layers className="size-3" /> Inventory Accounts
              <span className="ml-1 opacity-50">({accounts.length})</span>
            </p>

            {/* type filter pills */}
            {uniqueTypes.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={() => setTypeFilter(null)}
                  className={`cf-mono text-[10px] font-medium px-3 py-1.5 rounded-lg border transition-all ${
                    !typeFilter
                      ? "bg-primary/10 border-primary/25 text-primary"
                      : "border-border/40 text-muted-foreground hover:border-border/70"
                  }`}
                >
                  All
                </button>
                {uniqueTypes.map((t) => {
                  const cfg = typeConfig(t);
                  return (
                    <button
                      key={t}
                      onClick={() => setTypeFilter(typeFilter === t ? null : t)}
                      className={`cf-mono text-[10px] font-medium px-3 py-1.5 rounded-lg border transition-all ${
                        typeFilter === t
                          ? cfg.color
                          : "border-border/40 text-muted-foreground hover:border-border/70"
                      }`}
                    >
                      {cfg.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* loading skeleton */}
          {isLoading && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-border/40 bg-background/60 p-5 space-y-4 animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex gap-3">
                    <div className="size-10 rounded-xl bg-muted/40 shrink-0" />
                    <div className="space-y-2 flex-1">
                      <div className="h-3 bg-muted/40 rounded w-3/4" />
                      <div className="h-2 bg-muted/30 rounded w-1/3" />
                    </div>
                  </div>
                  <div className="h-px bg-border/30" />
                  <div className="h-2 bg-muted/20 rounded w-1/2" />
                </div>
              ))}
            </div>
          )}

          {/* empty */}
          {!isLoading && filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16 gap-4"
            >
              <div className="size-14 rounded-2xl bg-muted/30 border border-border/50 flex items-center justify-center">
                <Layers className="size-6 text-muted-foreground/30" />
              </div>
              <div className="text-center">
                <p className="font-display italic text-xl text-foreground">
                  No inventory accounts yet
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Create your first inventory account to start tracking stock.
                </p>
              </div>
              <button
                onClick={handleNewAccount}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
              >
                <Plus className="size-3.5" /> New Inventory Account
              </button>
            </motion.div>
          )}

          {/* accounts grid */}
          {!isLoading && filtered.length > 0 && (
            <AnimatePresence mode="popLayout">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((account, i) => (
                  <AccountCard key={account.ID} account={account} index={i} />
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>

        {/* footer */}
        <div className="flex items-center justify-between pt-2 pb-4 border-t border-border/30">
          <span className="cf-mono text-[10px] text-muted-foreground/40 uppercase tracking-widest">
            {accounts.length} inventory{" "}
            {accounts.length === 1 ? "account" : "accounts"} registered
          </span>
          <span className="cf-mono text-[10px] text-muted-foreground/30 uppercase tracking-widest">
            Sharpnr Inventory Engine v1.0
          </span>
        </div>
      </div>
    </>
  );
}
