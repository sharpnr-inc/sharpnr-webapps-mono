import { useState, useMemo } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

type Status = "completed" | "pending" | "refunded" | "failed";

interface Sale {
  id: string;
  orderId: string;
  customer: string;
  email: string;
  product: string;
  category: string;
  amount: number;
  status: Status;
  date: string;
  paymentMethod: string;
}

// ── Mock data ────────────────────────────────────────────────────────────────

const SALES: Sale[] = [
  {
    id: "1",
    orderId: "#ORD-8821",
    customer: "Arjun Mehta",
    email: "arjun@example.com",
    product: "Pro Plan (Annual)",
    category: "Subscription",
    amount: 12900,
    status: "completed",
    date: "2025-04-12",
    paymentMethod: "UPI",
  },
  {
    id: "2",
    orderId: "#ORD-8820",
    customer: "Priya Sharma",
    email: "priya@example.com",
    product: "Starter Kit",
    category: "One-time",
    amount: 2499,
    status: "pending",
    date: "2025-04-12",
    paymentMethod: "Net Banking",
  },
  {
    id: "3",
    orderId: "#ORD-8819",
    customer: "Ravi Kulkarni",
    email: "ravi@example.com",
    product: "Enterprise Suite",
    category: "Subscription",
    amount: 49000,
    status: "completed",
    date: "2025-04-11",
    paymentMethod: "Credit Card",
  },
  {
    id: "4",
    orderId: "#ORD-8818",
    customer: "Sneha Iyer",
    email: "sneha@example.com",
    product: "Add-on: Analytics",
    category: "Add-on",
    amount: 3200,
    status: "refunded",
    date: "2025-04-11",
    paymentMethod: "UPI",
  },
  {
    id: "5",
    orderId: "#ORD-8817",
    customer: "Vikram Bose",
    email: "vikram@example.com",
    product: "Team Plan (Monthly)",
    category: "Subscription",
    amount: 5999,
    status: "completed",
    date: "2025-04-10",
    paymentMethod: "Debit Card",
  },
  {
    id: "6",
    orderId: "#ORD-8816",
    customer: "Ananya Gupta",
    email: "ananya@example.com",
    product: "Pro Plan (Annual)",
    category: "Subscription",
    amount: 12900,
    status: "failed",
    date: "2025-04-10",
    paymentMethod: "Credit Card",
  },
  {
    id: "7",
    orderId: "#ORD-8815",
    customer: "Karan Nair",
    email: "karan@example.com",
    product: "Starter Kit",
    category: "One-time",
    amount: 2499,
    status: "completed",
    date: "2025-04-09",
    paymentMethod: "UPI",
  },
  {
    id: "8",
    orderId: "#ORD-8814",
    customer: "Meera Pillai",
    email: "meera@example.com",
    product: "Add-on: Integrations",
    category: "Add-on",
    amount: 1800,
    status: "pending",
    date: "2025-04-09",
    paymentMethod: "Net Banking",
  },
  {
    id: "9",
    orderId: "#ORD-8813",
    customer: "Rohit Desai",
    email: "rohit@example.com",
    product: "Enterprise Suite",
    category: "Subscription",
    amount: 49000,
    status: "completed",
    date: "2025-04-08",
    paymentMethod: "Wire Transfer",
  },
  {
    id: "10",
    orderId: "#ORD-8812",
    customer: "Divya Reddy",
    email: "divya@example.com",
    product: "Team Plan (Monthly)",
    category: "Subscription",
    amount: 5999,
    status: "completed",
    date: "2025-04-08",
    paymentMethod: "Credit Card",
  },
  {
    id: "11",
    orderId: "#ORD-8811",
    customer: "Suresh Agarwal",
    email: "suresh@example.com",
    product: "Pro Plan (Annual)",
    category: "Subscription",
    amount: 12900,
    status: "completed",
    date: "2025-04-07",
    paymentMethod: "UPI",
  },
  {
    id: "12",
    orderId: "#ORD-8810",
    customer: "Kavita Joshi",
    email: "kavita@example.com",
    product: "Starter Kit",
    category: "One-time",
    amount: 2499,
    status: "refunded",
    date: "2025-04-07",
    paymentMethod: "Debit Card",
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n / 100);

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const STATUS_STYLES: Record<Status, string> = {
  completed:
    "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
  pending:
    "bg-amber-500/10   text-amber-600   border-amber-500/20   dark:text-amber-400",
  refunded:
    "bg-sky-500/10     text-sky-600     border-sky-500/20     dark:text-sky-400",
  failed:
    "bg-red-500/10     text-red-600     border-red-500/20     dark:text-red-400",
};

const STATUS_DOT: Record<Status, string> = {
  completed: "bg-emerald-500",
  pending: "bg-amber-500",
  refunded: "bg-sky-500",
  failed: "bg-red-500",
};

const STATUSES: Status[] = ["completed", "pending", "refunded", "failed"];

function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_STYLES[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[status]}`} />
      {status}
    </span>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  // Deterministic hue from name
  const hue = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360;
  return (
    <span
      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
      style={{ background: `hsl(${hue} 60% 50%)` }}
    >
      {initials}
    </span>
  );
}

// ── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: string;
  sub: string;
  trend?: "up" | "down";
  icon: React.ReactNode;
}

function StatCard({ label, value, sub, trend, icon }: StatCardProps) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold tracking-tight text-foreground">
            {value}
          </p>
          <p
            className={`flex items-center gap-1 text-xs font-medium ${trend === "up" ? "text-emerald-600 dark:text-emerald-400" : trend === "down" ? "text-red-500" : "text-muted-foreground"}`}
          >
            {trend === "up" && <TrendUpIcon />}
            {trend === "down" && <TrendDownIcon />}
            {sub}
          </p>
        </div>
        <div className="rounded-lg bg-muted p-2.5 text-muted-foreground">
          {icon}
        </div>
      </div>
    </div>
  );
}

// ── Tiny inline SVG icons ────────────────────────────────────────────────────

const TrendUpIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    className="inline"
  >
    <path
      d="M1 9L4.5 5.5L7 8L11 3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 3H11V6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TrendDownIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    className="inline"
  >
    <path
      d="M1 3L4.5 6.5L7 4L11 9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 9H11V6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RevenueIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
  </svg>
);

const OrdersIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

const AvgIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const RefundIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
  </svg>
);

const SearchIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ChevronIcon = ({ dir }: { dir: "up" | "down" | "left" | "right" }) => {
  const rotate = { up: "-90", down: "90", left: "180", right: "0" }[dir];
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
};

const DownloadIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

// ── Main Page ────────────────────────────────────────────────────────────────

const PAGE_SIZE = 8;

export function SalesHistoryPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatus] = useState<Status | "all">("all");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<{ key: keyof Sale; dir: "asc" | "desc" }>({
    key: "date",
    dir: "desc",
  });

  // ── Derived ──────────────────────────────────────────────────────────────

  const filtered = useMemo(() => {
    let rows = [...SALES];
    if (statusFilter !== "all")
      rows = rows.filter((s) => s.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (s) =>
          s.customer.toLowerCase().includes(q) ||
          s.orderId.toLowerCase().includes(q) ||
          s.product.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q),
      );
    }
    rows.sort((a, b) => {
      const av = a[sort.key] as string | number;
      const bv = b[sort.key] as string | number;
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sort.dir === "asc" ? cmp : -cmp;
    });
    return rows;
  }, [search, statusFilter, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const clampedPage = Math.min(page, totalPages);
  if (clampedPage !== page) setPage(clampedPage);

  const totalRevenue = SALES.filter((s) => s.status === "completed").reduce(
    (a, s) => a + s.amount,
    0,
  );
  const totalRefunded = SALES.filter((s) => s.status === "refunded").reduce(
    (a, s) => a + s.amount,
    0,
  );
  const avgOrder = Math.round(
    totalRevenue / SALES.filter((s) => s.status === "completed").length,
  );

  // ── Sort toggle ───────────────────────────────────────────────────────────

  const toggleSort = (key: keyof Sale) => {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "desc" },
    );
    setPage(1);
  };

  const SortBtn = ({ col }: { col: keyof Sale }) => (
    <button
      onClick={() => toggleSort(col)}
      className="ml-1 text-muted-foreground hover:text-foreground transition-colors"
    >
      {sort.key === col ? (
        <ChevronIcon dir={sort.dir === "asc" ? "up" : "down"} />
      ) : (
        <span className="opacity-30">
          <ChevronIcon dir="down" />
        </span>
      )}
    </button>
  );

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="">
      <div className="mx-auto  space-y-3 p-6 lg:p-8">
        {/* ── Header ── */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Sales History
            </h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Complete record of all transactions · last updated just now
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted">
            <DownloadIcon />
            Export CSV
          </button>
        </div>

        {/* ── Stat Cards ── */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total Revenue"
            value={fmt(totalRevenue)}
            sub="+18.4% vs last month"
            trend="up"
            icon={<RevenueIcon />}
          />
          <StatCard
            label="Total Orders"
            value={String(SALES.length)}
            sub="+5 from yesterday"
            trend="up"
            icon={<OrdersIcon />}
          />
          <StatCard
            label="Avg. Order Value"
            value={fmt(avgOrder)}
            sub="+2.1% vs last month"
            trend="up"
            icon={<AvgIcon />}
          />
          <StatCard
            label="Total Refunded"
            value={fmt(totalRefunded)}
            sub="2 refunds this period"
            trend="down"
            icon={<RefundIcon />}
          />
        </div>

        {/* ── Table Card ── */}
        <div className="rounded-xl border bg-card shadow-sm">
          {/* Toolbar */}
          <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Search orders, customers…"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full rounded-lg border bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Status pills */}
            <div className="flex flex-wrap gap-1.5">
              {(["all", ...STATUSES] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setStatus(s);
                    setPage(1);
                  }}
                  className={`rounded-full border px-3 py-1 text-xs font-medium capitalize transition-colors ${
                    statusFilter === s
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-transparent text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3">
                    <span className="flex items-center">
                      Order <SortBtn col="orderId" />
                    </span>
                  </th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="hidden px-4 py-3 md:table-cell">Product</th>
                  <th className="px-4 py-3">
                    <span className="flex items-center">
                      Amount <SortBtn col="amount" />
                    </span>
                  </th>
                  <th className="px-4 py-3">Status</th>
                  <th className="hidden px-4 py-3 lg:table-cell">
                    <span className="flex items-center">
                      Date <SortBtn col="date" />
                    </span>
                  </th>
                  <th className="hidden px-4 py-3 xl:table-cell">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginated.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-16 text-center text-muted-foreground"
                    >
                      No transactions match your filters.
                    </td>
                  </tr>
                ) : (
                  paginated.map((sale) => (
                    <tr
                      key={sale.id}
                      className="group transition-colors hover:bg-muted/30"
                    >
                      <td className="px-4 py-3.5 font-mono text-xs font-medium text-muted-foreground">
                        {sale.orderId}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <Avatar name={sale.customer} />
                          <div className="min-w-0">
                            <p className="truncate font-medium text-foreground">
                              {sale.customer}
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                              {sale.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="hidden px-4 py-3.5 md:table-cell">
                        <p className="font-medium text-foreground">
                          {sale.product}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {sale.category}
                        </p>
                      </td>
                      <td className="px-4 py-3.5 font-semibold text-foreground">
                        {fmt(sale.amount)}
                      </td>
                      <td className="px-4 py-3.5">
                        <StatusBadge status={sale.status} />
                      </td>
                      <td className="hidden px-4 py-3.5 text-muted-foreground lg:table-cell">
                        {fmtDate(sale.date)}
                      </td>
                      <td className="hidden px-4 py-3.5 text-muted-foreground xl:table-cell">
                        {sale.paymentMethod}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t px-4 py-3">
            <p className="text-xs text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">
                {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–
                {Math.min(page * PAGE_SIZE, filtered.length)}
              </span>{" "}
              of{" "}
              <span className="font-medium text-foreground">
                {filtered.length}
              </span>{" "}
              results
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex h-8 w-8 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
              >
                <ChevronIcon dir="left" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`flex h-8 w-8 items-center justify-center rounded-md border text-xs font-medium transition-colors ${
                    p === page
                      ? "border-foreground bg-foreground text-background"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex h-8 w-8 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
              >
                <ChevronIcon dir="right" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
