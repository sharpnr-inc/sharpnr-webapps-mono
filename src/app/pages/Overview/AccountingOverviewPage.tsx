import { motion } from "framer-motion";
import {
  Building2,
  MapPin,
  FileText,
  Hash,
  CreditCard,
  ChevronRight,
  Globe,
  BookOpen,
  Receipt,
  TrendingUp,
  Landmark,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useAccountingStore } from "@/app/store/accounting.store";

/* ─── helpers ─── */
function mask(value: string | null | undefined, keep = 4) {
  if (!value) return null;
  return value.slice(0, keep) + " •••• " + value.slice(-keep);
}

function CompliancePill({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: "emerald" | "sky" | "amber" | "violet";
}) {
  const map = {
    emerald: "bg-emerald-500/10 border-emerald-500/25 text-emerald-400",
    sky: "bg-sky-500/10 border-sky-500/25 text-sky-400",
    amber: "bg-amber-500/10 border-amber-500/25 text-amber-400",
    violet: "bg-violet-500/10 border-violet-500/25 text-violet-400",
  };
  return (
    <div
      className={`flex items-center justify-between gap-4 px-4 py-3 rounded-xl border ${map[color]} transition-colors`}
    >
      <span className="text-xs font-semibold tracking-widest uppercase opacity-70">
        {label}
      </span>
      <span className="text-xs font-mono font-semibold">{value}</span>
    </div>
  );
}

const QUICK_ACTIONS = [
  {
    icon: BookOpen,
    label: "Journal Entries",
    sub: "Record transactions",
    to: "/dashboard/sharp_accounting/journal",
  },
  {
    icon: Receipt,
    label: "Invoices",
    sub: "Manage billing",
    to: "/dashboard/sharp_accounting/invoices",
  },
  {
    icon: TrendingUp,
    label: "P&L Report",
    sub: "Profit & loss",
    to: "/dashboard/sharp_accounting/reports/pl",
  },
  {
    icon: Landmark,
    label: "Balance Sheet",
    sub: "Assets & liabilities",
    to: "/dashboard/sharp_accounting/reports/bs",
  },
];

/* ─── initials avatar ─── */
function EntityAvatar({ name, large }: { name: string; large?: boolean }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  const sz = large ? "size-14 text-base" : "size-9 text-xs";
  return (
    <div
      className={`${sz} rounded-2xl bg-linear-to-br from-primary/30 to-primary/10 border border-primary/20 flex items-center justify-center shrink-0`}
    >
      <span className="font-bold text-primary tracking-wider">{initials}</span>
    </div>
  );
}

/* ─── page ─── */
export function AccountingOverviewPage() {
  const navigate = useNavigate();
  const entity = useAccountingStore((s) => s.selectedLegalEntity);

  /* ── empty state ── */
  if (!entity) {
    return (
      <>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap'); .font-display{font-family:'Instrument Serif',Georgia,serif;} .font-body{font-family:'DM Sans',system-ui,sans-serif;}`}</style>
        <div className="font-body flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center p-8">
          <div className="size-16 rounded-2xl bg-muted/40 border border-border/50 flex items-center justify-center">
            <Building2 className="size-7 text-muted-foreground" />
          </div>
          <p className="font-display italic text-2xl text-foreground">
            No entity selected
          </p>
          <p className="text-sm text-muted-foreground max-w-xs">
            Go back and choose a legal entity to view its overview.
          </p>
          <button
            onClick={() => navigate({ to: "/" })}
            className="mt-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
          >
            Select Entity
          </button>
        </div>
      </>
    );
  }

  const hasCompliance = entity.gst || entity.cinNumber || entity.panNumber;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        .font-display { font-family: 'Instrument Serif', Georgia, serif; }
        .font-body    { font-family: 'DM Sans', system-ui, sans-serif; }
        .bg-dots {
          background-image: radial-gradient(circle, hsl(var(--foreground)/0.06) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .glow-line {
          background: linear-gradient(90deg, transparent, hsl(var(--primary)/0.55), transparent);
        }
        .action-card:hover .action-arrow { transform: translateX(3px); opacity: 1; }
        .action-arrow { transition: transform 0.2s ease, opacity 0.2s ease; opacity: 0.4; }
      `}</style>

      {/* dot grid */}
      <div className="pointer-events-none fixed inset-0 bg-dots opacity-40 z-0" />

      <div className="font-body relative z-10 p-6 md:p-10 space-y-8 max-w-5xl">
        {/* ── breadcrumb ── */}
        <motion.div
          className="flex items-center gap-2 text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={() => navigate({ to: "/" })}
            className="hover:text-foreground transition-colors"
          >
            Entities
          </button>
          <ChevronRight className="size-3" />
          <span className="text-foreground font-medium">{entity.name}</span>
        </motion.div>

        {/* ── hero header ── */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="flex items-center gap-5">
            <EntityAvatar name={entity.name} large />
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium tracking-widest uppercase">
                Overview
              </p>
              <h1 className="font-display italic text-4xl md:text-5xl text-foreground leading-tight">
                {entity.name}
              </h1>
              <div className="h-px w-24 glow-line mt-1" />
            </div>
          </div>

          {/* entity type badge */}
          <span className="inline-flex items-center gap-2 self-start sm:self-auto px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
            <span className="size-1.5 rounded-full bg-primary animate-pulse" />
            {entity.type}
          </span>
        </motion.div>

        {/* ── two column layout ── */}
        <div className="grid gap-5 lg:grid-cols-3">
          {/* ── left col: details ── */}
          <motion.div
            className="lg:col-span-1 space-y-4"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {/* location card */}
            <div className="rounded-2xl border border-border/60 bg-background/70 backdrop-blur-sm p-5 space-y-4">
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                Location
              </p>

              <div className="space-y-2.5">
                {entity.addressLine && (
                  <div className="flex items-start gap-2.5 text-sm text-foreground">
                    <MapPin className="size-3.5 mt-0.5 shrink-0 text-muted-foreground" />
                    <span className="leading-snug">{entity.addressLine}</span>
                  </div>
                )}
                <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <MapPin className="size-3.5 shrink-0 opacity-0" />
                  <span>
                    {entity.city}, {entity.state} — {entity.pincode}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <Globe className="size-3.5 shrink-0" />
                  <span>{entity.country}</span>
                </div>
              </div>
            </div>

            {/* compliance card */}
            {hasCompliance && (
              <div className="rounded-2xl border border-border/60 bg-background/70 backdrop-blur-sm p-5 space-y-4">
                <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                  Compliance IDs
                </p>
                <div className="space-y-2">
                  {entity.gst && (
                    <CompliancePill
                      label="GST"
                      value={mask(entity.gst) ?? entity.gst}
                      color="emerald"
                    />
                  )}
                  {entity.cinNumber && (
                    <CompliancePill
                      label="CIN"
                      value={mask(entity.cinNumber) ?? entity.cinNumber}
                      color="sky"
                    />
                  )}
                  {entity.panNumber && (
                    <CompliancePill
                      label="PAN"
                      value={mask(entity.panNumber, 3) ?? entity.panNumber}
                      color="amber"
                    />
                  )}
                </div>
              </div>
            )}
          </motion.div>

          {/* ── right col: quick actions ── */}
          <motion.div
            className="lg:col-span-2 space-y-4"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <div className="rounded-2xl border border-border/60 bg-background/70 backdrop-blur-sm p-5 space-y-4">
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                Quick Access
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {QUICK_ACTIONS.map(({ icon: Icon, label, sub, to }, i) => (
                  <motion.button
                    key={label}
                    className="action-card group text-left flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-muted/30 hover:bg-muted/50 hover:border-primary/30 hover:shadow-[0_4px_20px_hsl(var(--primary)/0.08)] transition-all duration-200"
                    onClick={() => navigate({ to })}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + i * 0.07 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="size-9 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                      <Icon className="size-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {label}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {sub}
                      </p>
                    </div>
                    <ChevronRight className="action-arrow size-4 text-muted-foreground shrink-0" />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* ── summary stat placeholders ── */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Total Transactions", value: "—", icon: Hash },
                { label: "Open Invoices", value: "—", icon: FileText },
                { label: "Net Position", value: "—", icon: CreditCard },
              ].map(({ label, value, icon: Icon }, i) => (
                <motion.div
                  key={label}
                  className="rounded-2xl border border-border/60 bg-background/70 backdrop-blur-sm p-4 space-y-3"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.35 + i * 0.07 }}
                >
                  <Icon className="size-4 text-muted-foreground" />
                  <div>
                    <p className="font-display italic text-2xl text-foreground">
                      {value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-tight">
                      {label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
