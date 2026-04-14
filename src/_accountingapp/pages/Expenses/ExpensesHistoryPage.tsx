import { useState, useMemo } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

type Status = "approved" | "pending" | "rejected" | "reimbursed";

interface Expense {
  id: string;
  expenseId: string;
  submittedBy: string;
  email: string;
  vendor: string;
  category: string;
  description: string;
  amount: number;
  status: Status;
  date: string;
  paymentMethod: string;
  receipt: boolean;
}

// ── Mock Data ────────────────────────────────────────────────────────────────

const EXPENSES: Expense[] = [
  {
    id: "1",
    expenseId: "#EXP-4401",
    submittedBy: "Arjun Mehta",
    email: "arjun@company.com",
    vendor: "AWS",
    category: "Software & Cloud",
    description: "EC2 instance — April",
    amount: 18500,
    status: "approved",
    date: "2025-04-12",
    paymentMethod: "Corporate Card",
    receipt: true,
  },
  {
    id: "2",
    expenseId: "#EXP-4400",
    submittedBy: "Priya Sharma",
    email: "priya@company.com",
    vendor: "IndiGo Airlines",
    category: "Travel",
    description: "BLR → DEL — Client visit",
    amount: 9200,
    status: "pending",
    date: "2025-04-12",
    paymentMethod: "Personal Card",
    receipt: true,
  },
  {
    id: "3",
    expenseId: "#EXP-4399",
    submittedBy: "Ravi Kulkarni",
    email: "ravi@company.com",
    vendor: "Figma",
    category: "Software & Cloud",
    description: "Team plan — Apr",
    amount: 4800,
    status: "reimbursed",
    date: "2025-04-11",
    paymentMethod: "UPI",
    receipt: true,
  },
  {
    id: "4",
    expenseId: "#EXP-4398",
    submittedBy: "Sneha Iyer",
    email: "sneha@company.com",
    vendor: "Taj Hotels",
    category: "Accommodation",
    description: "2-night stay, Pune",
    amount: 12600,
    status: "rejected",
    date: "2025-04-11",
    paymentMethod: "Personal Card",
    receipt: false,
  },
  {
    id: "5",
    expenseId: "#EXP-4397",
    submittedBy: "Vikram Bose",
    email: "vikram@company.com",
    vendor: "Staples India",
    category: "Office Supplies",
    description: "Printer cartridges + paper",
    amount: 2300,
    status: "approved",
    date: "2025-04-10",
    paymentMethod: "Petty Cash",
    receipt: true,
  },
  {
    id: "6",
    expenseId: "#EXP-4396",
    submittedBy: "Ananya Gupta",
    email: "ananya@company.com",
    vendor: "Slack",
    category: "Software & Cloud",
    description: "Pro plan renewal",
    amount: 6700,
    status: "approved",
    date: "2025-04-10",
    paymentMethod: "Corporate Card",
    receipt: true,
  },
  {
    id: "7",
    expenseId: "#EXP-4395",
    submittedBy: "Karan Nair",
    email: "karan@company.com",
    vendor: "Swiggy Business",
    category: "Meals & Dining",
    description: "Team lunch — sprint close",
    amount: 3850,
    status: "approved",
    date: "2025-04-09",
    paymentMethod: "Corporate Card",
    receipt: true,
  },
  {
    id: "8",
    expenseId: "#EXP-4394",
    submittedBy: "Meera Pillai",
    email: "meera@company.com",
    vendor: "Ola Corporate",
    category: "Travel",
    description: "Client commute — weekly",
    amount: 1640,
    status: "pending",
    date: "2025-04-09",
    paymentMethod: "Corporate Card",
    receipt: false,
  },
  {
    id: "9",
    expenseId: "#EXP-4393",
    submittedBy: "Rohit Desai",
    email: "rohit@company.com",
    vendor: "Notion",
    category: "Software & Cloud",
    description: "Team workspace — Apr",
    amount: 3200,
    status: "reimbursed",
    date: "2025-04-08",
    paymentMethod: "UPI",
    receipt: true,
  },
  {
    id: "10",
    expenseId: "#EXP-4392",
    submittedBy: "Divya Reddy",
    email: "divya@company.com",
    vendor: "WeWork",
    category: "Office & Rent",
    description: "Hot-desk — 4 days",
    amount: 8000,
    status: "approved",
    date: "2025-04-08",
    paymentMethod: "Corporate Card",
    receipt: true,
  },
  {
    id: "11",
    expenseId: "#EXP-4391",
    submittedBy: "Suresh Agarwal",
    email: "suresh@company.com",
    vendor: "Air India",
    category: "Travel",
    description: "DEL → MUM — Conference",
    amount: 11200,
    status: "pending",
    date: "2025-04-07",
    paymentMethod: "Personal Card",
    receipt: true,
  },
  {
    id: "12",
    expenseId: "#EXP-4390",
    submittedBy: "Kavita Joshi",
    email: "kavita@company.com",
    vendor: "Google Workspace",
    category: "Software & Cloud",
    description: "Business plan — Apr",
    amount: 2900,
    status: "reimbursed",
    date: "2025-04-07",
    paymentMethod: "UPI",
    receipt: true,
  },
  {
    id: "13",
    expenseId: "#EXP-4389",
    submittedBy: "Arjun Mehta",
    email: "arjun@company.com",
    vendor: "Courtyard Marriott",
    category: "Accommodation",
    description: "Client offsite — 3 nights",
    amount: 22500,
    status: "approved",
    date: "2025-04-06",
    paymentMethod: "Corporate Card",
    receipt: true,
  },
  {
    id: "14",
    expenseId: "#EXP-4388",
    submittedBy: "Priya Sharma",
    email: "priya@company.com",
    vendor: "Zoom",
    category: "Software & Cloud",
    description: "Pro plan — Apr",
    amount: 1500,
    status: "rejected",
    date: "2025-04-06",
    paymentMethod: "Personal Card",
    receipt: false,
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
  approved:
    "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
  pending:
    "bg-amber-500/10   text-amber-600   border-amber-500/20   dark:text-amber-400",
  reimbursed:
    "bg-sky-500/10     text-sky-600     border-sky-500/20     dark:text-sky-400",
  rejected:
    "bg-red-500/10     text-red-600     border-red-500/20     dark:text-red-400",
};

const STATUS_DOT: Record<Status, string> = {
  approved: "bg-emerald-500",
  pending: "bg-amber-500",
  reimbursed: "bg-sky-500",
  rejected: "bg-red-500",
};

const STATUSES: Status[] = ["approved", "pending", "rejected", "reimbursed"];
const CATEGORIES = [
  "Software & Cloud",
  "Travel",
  "Accommodation",
  "Office Supplies",
  "Meals & Dining",
  "Office & Rent",
];

// ── Tiny SVG icons ───────────────────────────────────────────────────────────

function CloudIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />
    </svg>
  );
}
function PlaneIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19.5 2.5S18 2 16.5 3.5L13 7 4.8 5.2C4.3 5.1 3.8 5.4 3.6 5.9L3 8c-.2.5 0 1 .5 1.3L9 13l-2 3.5c-.2.3-.1.7.2.9l1 .6c.3.2.7.1.9-.2L11 15l4.2 4.2c.3.3.7.4 1 .2l2.1-1.3c.5-.2.6-.7.5-1.1z" />
    </svg>
  );
}
function HotelIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 22V7l9-5 9 5v15" />
      <path d="M9 22v-4h6v4" />
      <path d="M9 14h.01M15 14h.01M9 10h.01M15 10h.01" />
    </svg>
  );
}
function BoxIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    </svg>
  );
}
function ForkIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
    </svg>
  );
}
function BuildingIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
    </svg>
  );
}
function SearchIcon() {
  return (
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
}
function DownloadIcon() {
  return (
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
}
function FilterIcon() {
  return (
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}
function ReceiptIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z" />
      <line x1="8" y1="10" x2="16" y2="10" />
      <line x1="8" y1="14" x2="16" y2="14" />
    </svg>
  );
}
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

const CATEGORY_ICON: Record<string, React.ReactNode> = {
  "Software & Cloud": <CloudIcon />,
  Travel: <PlaneIcon />,
  Accommodation: <HotelIcon />,
  "Office Supplies": <BoxIcon />,
  "Meals & Dining": <ForkIcon />,
  "Office & Rent": <BuildingIcon />,
};

// ── Sub-components ───────────────────────────────────────────────────────────

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
  const hue = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360;
  return (
    <span
      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
      style={{ background: `hsl(${hue} 55% 48%)` }}
    >
      {initials}
    </span>
  );
}

function CategoryPill({ category }: { category: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
      {CATEGORY_ICON[category] ?? null}
      {category}
    </span>
  );
}

const TotalIcon = () => (
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
const PendingIcon = () => (
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
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const ApprovedIcon = () => (
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
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
const RejectedIcon = () => (
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
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

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

// ── Main Page ────────────────────────────────────────────────────────────────

const PAGE_SIZE = 8;

export function ExpensesHistoryPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatus] = useState<Status | "all">("all");
  const [categoryFilter, setCategory] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<{ key: keyof Expense; dir: "asc" | "desc" }>(
    { key: "date", dir: "desc" },
  );

  const filtered = useMemo(() => {
    let rows = [...EXPENSES];
    if (statusFilter !== "all")
      rows = rows.filter((e) => e.status === statusFilter);
    if (categoryFilter !== "all")
      rows = rows.filter((e) => e.category === categoryFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (e) =>
          e.submittedBy.toLowerCase().includes(q) ||
          e.expenseId.toLowerCase().includes(q) ||
          e.vendor.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q),
      );
    }
    rows.sort((a, b) => {
      const av = a[sort.key] as string | number | boolean;
      const bv = b[sort.key] as string | number | boolean;
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sort.dir === "asc" ? cmp : -cmp;
    });
    return rows;
  }, [search, statusFilter, categoryFilter, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const clampedPage = Math.min(page, totalPages);
  if (clampedPage !== page) setPage(clampedPage);

  const totalSpend = EXPENSES.filter((e) => e.status !== "rejected").reduce(
    (a, e) => a + e.amount,
    0,
  );
  const pendingAmount = EXPENSES.filter((e) => e.status === "pending").reduce(
    (a, e) => a + e.amount,
    0,
  );
  const approvedCount = EXPENSES.filter((e) => e.status === "approved").length;
  const rejectedCount = EXPENSES.filter((e) => e.status === "rejected").length;

  const toggleSort = (key: keyof Expense) => {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "desc" },
    );
    setPage(1);
  };

  const SortBtn = ({ col }: { col: keyof Expense }) => (
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

  const activeFilterCount = [
    statusFilter !== "all",
    categoryFilter !== "all",
  ].filter(Boolean).length;

  return (
    <div className="">
      <div className="mx-auto space-y-3 p-4 lg:p-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Expenses History
            </h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Track, review, and manage all submitted expenses
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted">
            <DownloadIcon />
            Export CSV
          </button>
        </div>

        {/* Stat Cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total Spend"
            value={fmt(totalSpend)}
            sub="+11.2% vs last month"
            trend="down"
            icon={<TotalIcon />}
          />
          <StatCard
            label="Pending Approval"
            value={fmt(pendingAmount)}
            sub={`${EXPENSES.filter((e) => e.status === "pending").length} awaiting review`}
            icon={<PendingIcon />}
          />
          <StatCard
            label="Approved Expenses"
            value={String(approvedCount)}
            sub="this billing period"
            trend="up"
            icon={<ApprovedIcon />}
          />
          <StatCard
            label="Rejected Expenses"
            value={String(rejectedCount)}
            sub="2 missing receipts"
            trend="down"
            icon={<RejectedIcon />}
          />
        </div>

        {/* Table Card */}
        <div className="rounded-xl border bg-card shadow-sm">
          {/* Toolbar */}
          <div className="space-y-3 border-b p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-sm">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  placeholder="Search expenses, vendors…"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="w-full rounded-lg border bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <button
                onClick={() => setShowFilters((v) => !v)}
                className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${showFilters ? "border-foreground bg-foreground text-background" : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground"}`}
              >
                <FilterIcon />
                Filters
                {activeFilterCount > 0 && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="flex flex-col gap-4 rounded-lg border bg-muted/30 p-3 sm:flex-row sm:items-start">
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Status
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {(["all", ...STATUSES] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setStatus(s);
                          setPage(1);
                        }}
                        className={`rounded-full border px-3 py-1 text-xs font-medium capitalize transition-colors ${statusFilter === s ? "border-foreground bg-foreground text-background" : "border-border bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground"}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="hidden h-auto w-px bg-border sm:block" />

                <div className="space-y-1.5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Category
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {(["all", ...CATEGORIES] as const).map((c) => (
                      <button
                        key={c}
                        onClick={() => {
                          setCategory(c);
                          setPage(1);
                        }}
                        className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${categoryFilter === c ? "border-foreground bg-foreground text-background" : "border-border bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground"}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {activeFilterCount > 0 && (
                  <button
                    onClick={() => {
                      setStatus("all");
                      setCategory("all");
                    }}
                    className="ml-auto self-start text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
                  >
                    Clear all
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3">
                    <span className="flex items-center">
                      Expense <SortBtn col="expenseId" />
                    </span>
                  </th>
                  <th className="px-4 py-3">Submitted By</th>
                  <th className="hidden px-4 py-3 md:table-cell">
                    Vendor & Description
                  </th>
                  <th className="hidden px-4 py-3 lg:table-cell">Category</th>
                  <th className="px-4 py-3">
                    <span className="flex items-center">
                      Amount <SortBtn col="amount" />
                    </span>
                  </th>
                  <th className="px-4 py-3">Status</th>
                  <th className="hidden px-4 py-3 xl:table-cell">
                    <span className="flex items-center">
                      Date <SortBtn col="date" />
                    </span>
                  </th>
                  <th className="hidden px-4 py-3 xl:table-cell">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginated.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="py-16 text-center text-muted-foreground"
                    >
                      No expenses match your filters.
                    </td>
                  </tr>
                ) : (
                  paginated.map((expense) => (
                    <tr
                      key={expense.id}
                      className="group transition-colors hover:bg-muted/30"
                    >
                      <td className="px-4 py-3.5 font-mono text-xs font-medium text-muted-foreground">
                        {expense.expenseId}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <Avatar name={expense.submittedBy} />
                          <div className="min-w-0">
                            <p className="truncate font-medium text-foreground">
                              {expense.submittedBy}
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                              {expense.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="hidden px-4 py-3.5 md:table-cell">
                        <p className="font-medium text-foreground">
                          {expense.vendor}
                        </p>
                        <p className="max-w-[200px] truncate text-xs text-muted-foreground">
                          {expense.description}
                        </p>
                      </td>
                      <td className="hidden px-4 py-3.5 lg:table-cell">
                        <CategoryPill category={expense.category} />
                      </td>
                      <td className="px-4 py-3.5 font-semibold text-foreground">
                        {fmt(expense.amount)}
                      </td>
                      <td className="px-4 py-3.5">
                        <StatusBadge status={expense.status} />
                      </td>
                      <td className="hidden px-4 py-3.5 text-muted-foreground xl:table-cell">
                        {fmtDate(expense.date)}
                      </td>
                      <td className="hidden px-4 py-3.5 xl:table-cell">
                        {expense.receipt ? (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                            <ReceiptIcon /> Attached
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-red-500">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />{" "}
                            Missing
                          </span>
                        )}
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
              expenses
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
                  className={`flex h-8 w-8 items-center justify-center rounded-md border text-xs font-medium transition-colors ${p === page ? "border-foreground bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
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
