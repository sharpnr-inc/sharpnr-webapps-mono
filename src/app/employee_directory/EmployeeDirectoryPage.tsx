import { Skeleton, useSheet } from "@sharpnr/ui";
import {
  Users,
  Search,
  AlertCircle,
  RotateCcw,
  ChevronRight,
  ShieldCheck,
  Activity,
  Mail,
  Building,
  X,
} from "lucide-react";
import { useState, useMemo } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { useEmployees } from "./api/queries";
import type { Employee, EmployeeRole, EmployeeStatus } from "./api/types";
import { AddSuperAdminButton } from "./components/AddSuperAdminButton";
import { cn } from "@/lib/utils";

/* ── config / helpers ─────────────────────────────────────── */

const ROLE_META: Record<EmployeeRole, { label: string; className: string }> = {
  super_admin: {
    label: "Super Admin",
    className: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  admin: {
    label: "Admin",
    className: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
  manager: {
    label: "Manager",
    className: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  member: { label: "Member", className: "bg-muted text-muted-foreground" },
};

const STATUS_META: Record<
  EmployeeStatus,
  { label: string; className: string }
> = {
  active: {
    label: "Active",
    className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  invited: {
    label: "Invited",
    className: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
  suspended: {
    label: "Suspended",
    className: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  },
};

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
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
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ── sub-components ────────────────────────────────────────── */

function EmployeeRow({
  employee,
  onClick,
}: {
  employee: Employee;
  onClick: () => void;
}) {
  const role = ROLE_META[employee.role];
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
        {getInitials(employee.name)}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-1.5">
          <p className="truncate text-[13px] font-semibold text-foreground leading-tight">
            {employee.name}
          </p>
          {employee.role === "super_admin" && (
            <ShieldCheck className="h-3 w-3 shrink-0 text-violet-500" />
          )}
        </div>
        <p className="truncate text-xs text-muted-foreground">
          {employee.email} · {employee.department}
        </p>
      </div>

      <div className="hidden sm:flex shrink-0">
        <Pill className={role.className}>{role.label}</Pill>
      </div>
      <div className="shrink-0">
        <Pill className={STATUS_META[employee.status].className}>
          {STATUS_META[employee.status].label}
        </Pill>
      </div>

      <ChevronRight className="hidden sm:block h-4 w-4 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}

function LoadingRows() {
  return (
    <div className="space-y-2">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-lg border bg-card px-3 py-2.5"
        >
          <Skeleton className="h-9 w-9 rounded-full" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3 w-2/5" />
            <Skeleton className="h-2.5 w-3/5" />
          </div>
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      ))}
    </div>
  );
}

function EmployeeDetail({
  employee,
  onClose,
}: {
  employee: Employee;
  onClose: () => void;
}) {
  const role = ROLE_META[employee.role];
  return (
    <div className="p-4 sm:p-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold text-muted-foreground">
            {getInitials(employee.name)}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-[15px] font-semibold text-foreground leading-tight">
              {employee.name}
            </h3>
            <div className="mt-1 flex flex-wrap items-center gap-1.5">
              <Pill className={role.className}>{role.label}</Pill>
              <Pill className={STATUS_META[employee.status].className}>
                {STATUS_META[employee.status].label}
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

      {/* Facts */}
      <div className="mt-3 grid gap-1.5 rounded-lg border bg-background px-3 py-2.5 text-xs text-foreground/80">
        <span className="flex items-center gap-2">
          <Mail className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          <span className="truncate">{employee.email}</span>
        </span>
        <span className="flex items-center gap-2">
          <Building className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          {employee.department}
        </span>
        <span className="flex items-center justify-between">
          <span className="text-muted-foreground">
            Joined {format(new Date(employee.joinedAt), "MMM yyyy")}
          </span>
          <span className="text-muted-foreground">
            Active{" "}
            {formatDistanceToNow(new Date(employee.lastActiveAt), {
              addSuffix: true,
            })}
          </span>
        </span>
      </div>

      {/* Activity log */}
      <div className="mt-4">
        <div className="mb-2 flex items-center gap-1.5">
          <Activity className="h-3.5 w-3.5 text-muted-foreground" />
          <h4 className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Activity log
          </h4>
        </div>

        {employee.activity.length > 0 ? (
          <ol className="relative space-y-3 border-l border-border/60 pl-4">
            {employee.activity.map((entry) => (
              <li key={entry.id} className="relative">
                <span className="absolute -left-5.25 top-1 h-2 w-2 rounded-full bg-muted-foreground/40 ring-2 ring-background" />
                <p className="text-[13px] font-medium text-foreground leading-tight">
                  {entry.action}
                </p>
                {entry.target && (
                  <p className="text-xs text-muted-foreground">
                    {entry.target}
                  </p>
                )}
                <p className="mt-0.5 text-[11px] text-muted-foreground/70">
                  {format(new Date(entry.timestamp), "MMM d, yyyy · HH:mm")}
                </p>
              </li>
            ))}
          </ol>
        ) : (
          <p className="rounded-lg border border-dashed p-4 text-center text-xs text-muted-foreground">
            No recorded activity.
          </p>
        )}
      </div>
    </div>
  );
}

/* ── page ──────────────────────────────────────────────────── */

const ROLE_FILTERS: (EmployeeRole | "all")[] = [
  "all",
  "super_admin",
  "admin",
  "manager",
  "member",
];

export function EmployeeDirectoryPage() {
  const { data, isLoading, isError } = useEmployees();
  const { openSheet, closeSheet } = useSheet();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<EmployeeRole | "all">("all");

  const employees = useMemo(() => data?.data ?? [], [data]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return employees.filter((e) => {
      const matchesSearch =
        !q ||
        e.name.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        e.department.toLowerCase().includes(q);
      const matchesRole = roleFilter === "all" || e.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [employees, search, roleFilter]);

  const activeCount = employees.filter((e) => e.status === "active").length;
  const adminCount = employees.filter(
    (e) => e.role === "super_admin" || e.role === "admin",
  ).length;
  const hasActiveFilters = !!search || roleFilter !== "all";

  const openEmployee = (employee: Employee) => {
    openSheet(
      <EmployeeDetail employee={employee} onClose={closeSheet} />,
      "2/4",
    );
  };

  const resetFilters = () => {
    setSearch("");
    setRoleFilter("all");
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-3 sm:px-6 pb-10">
      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="min-w-0">
          <h1 className="font-bold text-xl sm:text-2xl tracking-tight leading-none flex items-center gap-2">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
            Employees
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Org members, roles, and their activity.
          </p>
        </div>

        <AddSuperAdminButton />
      </div>

      {/* ── Stats ── */}
      {!isLoading && !isError && employees.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="rounded-lg border bg-card px-3 py-2">
            <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
              Members
            </p>
            <p className="text-base sm:text-lg font-bold tabular-nums">
              {employees.length}
            </p>
          </div>
          <div className="rounded-lg border bg-card px-3 py-2">
            <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
              Active
            </p>
            <p className="text-base sm:text-lg font-bold tabular-nums text-emerald-500">
              {activeCount}
            </p>
          </div>
          <div className="rounded-lg border bg-card px-3 py-2">
            <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
              Admins
            </p>
            <p className="text-base sm:text-lg font-bold tabular-nums">
              {adminCount}
            </p>
          </div>
        </div>
      )}

      {/* ── Search + Filters ── */}
      {!isLoading && !isError && employees.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Search members…"
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
            {ROLE_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setRoleFilter(f)}
                className={cn(
                  "rounded-lg px-2.5 py-1.5 text-[11px] font-semibold whitespace-nowrap transition-colors",
                  roleFilter === f
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-muted/80",
                )}
              >
                {f === "all" ? "All" : ROLE_META[f].label}
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
            Failed to load employees
          </p>
          <p className="text-xs text-muted-foreground">
            Please refresh the page or try again.
          </p>
        </div>
      )}

      {!isLoading && !isError && employees.length === 0 && (
        <div className="flex flex-col items-center gap-1.5 rounded-xl border border-dashed p-10 text-center">
          <Users className="h-7 w-7 text-muted-foreground/40" />
          <p className="text-sm font-medium text-foreground">No members yet</p>
          <p className="text-xs text-muted-foreground max-w-xs">
            Invite teammates to see them listed here.
          </p>
        </div>
      )}

      {/* ── List ── */}
      {!isLoading && !isError && employees.length > 0 && (
        <>
          {filtered.length > 0 ? (
            <div className="space-y-2">
              {filtered.map((employee) => (
                <EmployeeRow
                  key={employee.id}
                  employee={employee}
                  onClick={() => openEmployee(employee)}
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
              Showing {filtered.length} of {employees.length}
            </p>
          )}
        </>
      )}
    </div>
  );
}
