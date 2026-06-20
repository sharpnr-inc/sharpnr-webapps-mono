import {
  Button,
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  useSheet,
} from "@sharpnr/ui";
import {
  Users,
  ChevronRight,
  AlertCircle,
  Search,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Wrench,
  RotateCcw,
  Crown,
  Receipt,
  X,
} from "lucide-react";
import { useState, useMemo } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { useCustomers } from "../api/queries";
import type {
  Customer,
  CustomerStatus,
  CustomerTier,
  PurchaseStatus,
  ServiceStatus,
} from "../api/types";
import { cn } from "@/lib/utils";

/* ── config / helpers ─────────────────────────────────────── */

const STATUS_STYLES: Record<CustomerStatus, string> = {
  active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  inactive: "bg-muted text-muted-foreground",
  prospect: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
};

const TIER_STYLES: Record<CustomerTier, string> = {
  standard: "bg-muted text-muted-foreground",
  silver: "bg-slate-400/15 text-slate-600 dark:text-slate-300",
  gold: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  platinum: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
};

const PURCHASE_STATUS_STYLES: Record<PurchaseStatus, string> = {
  paid: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  refunded: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

const SERVICE_STATUS_STYLES: Record<ServiceStatus, string> = {
  open: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  in_progress: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  resolved: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  cancelled: "bg-muted text-muted-foreground",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function formatMoney(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      notation: amount >= 10000 ? "compact" : "standard",
      maximumFractionDigits: amount >= 10000 ? 1 : 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString()}`;
  }
}

function Pill({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ── sub-components ────────────────────────────────────────── */

function StatCard({
  label,
  value,
  accentClass,
}: {
  label: string;
  value: string | number;
  accentClass?: string;
}) {
  return (
    <div className="rounded-lg border bg-card px-3 py-2">
      <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground truncate">
        {label}
      </p>
      <p
        className={cn(
          "text-base sm:text-lg font-bold tabular-nums leading-tight truncate",
          accentClass ?? "text-foreground",
        )}
      >
        {value}
      </p>
    </div>
  );
}

function CustomerRow({
  customer,
  onClick,
}: {
  customer: Customer;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex w-full items-center gap-3 rounded-lg border bg-card px-3 py-2.5 text-left",
        "transition-colors duration-150 hover:bg-accent/40",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      )}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-bold text-muted-foreground">
        {getInitials(customer.name)}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-1.5">
          <p className="truncate text-[13px] font-semibold text-foreground leading-tight">
            {customer.name}
          </p>
          {customer.tier === "platinum" && (
            <Crown className="h-3 w-3 shrink-0 text-violet-500" />
          )}
        </div>
        <p className="truncate text-xs text-muted-foreground">
          {customer.email}
        </p>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-0.5">
        <span className="text-[13px] font-semibold text-foreground tabular-nums">
          {formatMoney(customer.lifetimeValue, customer.currency)}
        </span>
        <Pill className={STATUS_STYLES[customer.status]}>{customer.status}</Pill>
      </div>

      <ChevronRight className="hidden sm:block h-4 w-4 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}

function LoadingRows() {
  return (
    <div className="space-y-2">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-lg border bg-card px-3 py-2.5"
        >
          <Skeleton className="h-9 w-9 rounded-full" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3 w-2/5" />
            <Skeleton className="h-2.5 w-3/5" />
          </div>
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
      ))}
    </div>
  );
}

function HistoryItem({
  icon: Icon,
  title,
  meta,
  trailing,
}: {
  icon: typeof Receipt;
  title: string;
  meta: string;
  trailing: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg border bg-card px-2.5 py-2">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-medium text-foreground leading-tight">
          {title}
        </p>
        <p className="truncate text-[11px] text-muted-foreground">{meta}</p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1">{trailing}</div>
    </div>
  );
}

function EmptyHistory({
  icon: Icon,
  title,
  hint,
}: {
  icon: typeof ShoppingBag;
  title: string;
  hint: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-lg border border-dashed p-6 text-center">
      <Icon className="h-5 w-5 text-muted-foreground/40" />
      <p className="text-[13px] font-medium text-foreground">{title}</p>
      <p className="text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}

function CustomerDetail({
  customer,
  onClose,
}: {
  customer: Customer;
  onClose: () => void;
}) {
  const openServices = customer.services.filter(
    (s) => s.status === "open" || s.status === "in_progress",
  ).length;

  return (
    <div className="p-4 sm:p-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold text-muted-foreground">
            {getInitials(customer.name)}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-[15px] font-semibold text-foreground leading-tight">
              {customer.name}
            </h3>
            <div className="mt-1 flex flex-wrap items-center gap-1.5">
              <Pill className={STATUS_STYLES[customer.status]}>
                {customer.status}
              </Pill>
              <Pill className={TIER_STYLES[customer.tier]}>
                {customer.tier === "platinum" && <Crown className="h-3 w-3" />}
                {customer.tier}
              </Pill>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="shrink-0 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Contact */}
      <div className="mt-3 grid gap-1.5 rounded-lg border bg-background px-3 py-2.5 text-xs text-foreground/80">
        <span className="flex items-center gap-2">
          <Mail className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          <span className="truncate">{customer.email}</span>
        </span>
        <span className="flex items-center gap-2">
          <Phone className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          {customer.phone}
        </span>
        <span className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          {customer.location}
        </span>
      </div>

      {/* Mini stats */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        <div className="rounded-lg border bg-background px-2.5 py-1.5">
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
            Lifetime
          </p>
          <p className="text-[13px] font-bold text-foreground tabular-nums truncate">
            {formatMoney(customer.lifetimeValue, customer.currency)}
          </p>
        </div>
        <div className="rounded-lg border bg-background px-2.5 py-1.5">
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
            Orders
          </p>
          <p className="text-[13px] font-bold text-foreground tabular-nums">
            {customer.purchases.length}
          </p>
        </div>
        <div className="rounded-lg border bg-background px-2.5 py-1.5">
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
            Open
          </p>
          <p
            className={cn(
              "text-[13px] font-bold tabular-nums",
              openServices > 0 ? "text-amber-500" : "text-foreground",
            )}
          >
            {openServices}
          </p>
        </div>
      </div>

      {/* History tabs */}
      <Tabs defaultValue="purchases" className="mt-3 w-full">
        <TabsList variant="default" className="w-full justify-start">
          <TabsTrigger value="purchases">
            <ShoppingBag className="h-3.5 w-3.5" />
            Purchases
          </TabsTrigger>
          <TabsTrigger value="services">
            <Wrench className="h-3.5 w-3.5" />
            Services
          </TabsTrigger>
        </TabsList>

        <TabsContent value="purchases" className="mt-2.5">
          {customer.purchases.length > 0 ? (
            <div className="space-y-1.5">
              {customer.purchases.map((p) => (
                <HistoryItem
                  key={p.id}
                  icon={Receipt}
                  title={p.summary}
                  meta={`${p.reference} · ${p.channel} · ${format(new Date(p.date), "MMM d, yyyy")}`}
                  trailing={
                    <>
                      <span className="text-[13px] font-semibold text-foreground tabular-nums">
                        {formatMoney(p.amount, customer.currency)}
                      </span>
                      <Pill className={PURCHASE_STATUS_STYLES[p.status]}>
                        {p.status}
                      </Pill>
                    </>
                  }
                />
              ))}
            </div>
          ) : (
            <EmptyHistory
              icon={ShoppingBag}
              title="No purchases yet"
              hint="This customer hasn't placed any orders."
            />
          )}
        </TabsContent>

        <TabsContent value="services" className="mt-2.5">
          {customer.services.length > 0 ? (
            <div className="space-y-1.5">
              {customer.services.map((s) => (
                <HistoryItem
                  key={s.id}
                  icon={Wrench}
                  title={s.subject}
                  meta={`${s.reference} · ${s.handler} · ${format(new Date(s.date), "MMM d, yyyy")}`}
                  trailing={
                    <Pill className={SERVICE_STATUS_STYLES[s.status]}>
                      {s.status.replace(/_/g, " ")}
                    </Pill>
                  }
                />
              ))}
            </div>
          ) : (
            <EmptyHistory
              icon={Wrench}
              title="No service records"
              hint="No support tickets on file."
            />
          )}
        </TabsContent>
      </Tabs>

      {/* Footer meta */}
      <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-2.5 text-[11px] text-muted-foreground">
        <span>Joined {format(new Date(customer.joinedAt), "MMM yyyy")}</span>
        <span>
          Active{" "}
          {formatDistanceToNow(new Date(customer.lastActivityAt), {
            addSuffix: true,
          })}
        </span>
      </div>
    </div>
  );
}

/* ── page ──────────────────────────────────────────────────── */

const STATUS_FILTERS: (CustomerStatus | "all")[] = [
  "all",
  "active",
  "inactive",
  "prospect",
];

const CustomerIndexPage = () => {
  const { data, isLoading, isError } = useCustomers();
  const { openSheet, closeSheet } = useSheet();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<CustomerStatus | "all">(
    "all",
  );

  const customers = useMemo(() => data?.data ?? [], [data]);

  const openCustomer = (customer: Customer) => {
    openSheet(
      <CustomerDetail customer={customer} onClose={closeSheet} />,
      "2/4",
    );
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return customers.filter((c) => {
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "all" || c.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [customers, search, statusFilter]);

  const activeCount = customers.filter((c) => c.status === "active").length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.lifetimeValue, 0);
  const currency = customers[0]?.currency ?? "USD";
  const hasActiveFilters = !!search || statusFilter !== "all";

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("all");
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-3 sm:px-6 pb-10">
      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="min-w-0">
          <h1 className="font-bold text-xl sm:text-2xl tracking-tight leading-none flex items-center gap-2">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
            Customers
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Purchase and service history at a glance.
          </p>
        </div>

        <Button size="sm" className="shrink-0" disabled={isLoading}>
          <UserPlus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Customer</span>
        </Button>
      </div>

      {/* ── Stats ── */}
      {!isLoading && !isError && customers.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          <StatCard label="Customers" value={customers.length} />
          <StatCard
            label="Active"
            value={activeCount}
            accentClass="text-emerald-500"
          />
          <StatCard
            label="Lifetime"
            value={formatMoney(totalRevenue, currency)}
          />
        </div>
      )}

      {/* ── Search + Filters ── */}
      {!isLoading && !isError && customers.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Search customers…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={cn(
                "w-full rounded-lg border bg-background pl-9 pr-3 py-2 text-sm",
                "placeholder:text-muted-foreground/50",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
              )}
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto -mx-1 px-1 sm:mx-0 sm:px-0 shrink-0">
            {STATUS_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={cn(
                  "rounded-lg px-2.5 py-1.5 text-[11px] font-semibold capitalize whitespace-nowrap transition-colors",
                  statusFilter === f
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-muted/80",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── States ── */}
      {isLoading && <LoadingRows />}

      {isError && !isLoading && (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center">
          <AlertCircle className="h-7 w-7 text-destructive/60" />
          <p className="text-sm font-medium text-foreground">
            Failed to load customers
          </p>
          <p className="text-xs text-muted-foreground">
            Please refresh the page or try again.
          </p>
        </div>
      )}

      {!isLoading && !isError && customers.length === 0 && (
        <div className="flex flex-col items-center gap-1.5 rounded-xl border border-dashed p-10 text-center">
          <Users className="h-7 w-7 text-muted-foreground/40" />
          <p className="text-sm font-medium text-foreground">No customers yet</p>
          <p className="text-xs text-muted-foreground max-w-xs">
            Customers appear here once added or after their first order.
          </p>
        </div>
      )}

      {/* ── List ── */}
      {!isLoading && !isError && customers.length > 0 && (
        <>
          {filtered.length > 0 ? (
            <div className="space-y-2">
              {filtered.map((customer) => (
                <CustomerRow
                  key={customer.id}
                  customer={customer}
                  onClick={() => openCustomer(customer)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1.5 rounded-xl border border-dashed p-8 text-center">
              <Search className="h-6 w-6 text-muted-foreground/40" />
              <p className="text-sm font-medium text-foreground">No results</p>
              <button
                onClick={resetFilters}
                className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-foreground underline underline-offset-2"
              >
                <RotateCcw className="h-3 w-3" />
                Clear filters
              </button>
            </div>
          )}

          {hasActiveFilters && filtered.length > 0 && (
            <p className="mt-3 text-xs text-muted-foreground text-right">
              Showing {filtered.length} of {customers.length}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default CustomerIndexPage;
