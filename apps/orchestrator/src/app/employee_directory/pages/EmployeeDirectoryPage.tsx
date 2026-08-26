import { Button, Skeleton } from "@sharpnr/ui";
import {
  Users,
  Search,
  AlertCircle,
  RotateCcw,
  ChevronRight,
} from "lucide-react";
import { useState, useMemo } from "react";
import { useEmployees } from "../api/queries";
import type { EmployeeOfOrganization } from "../api/types";
import { AddSuperAdminButton } from "../components/AddSuperAdminButton";
import { cn } from "@sharpnr/utils";
import { useNavigate } from "@tanstack/react-router";

/* ── config / helpers ─────────────────────────────────────── */

const ROLE_PALETTE = [
  "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "bg-teal-500/10 text-teal-600 dark:text-teal-400",
  "bg-pink-500/10 text-pink-600 dark:text-pink-400",
];

const STATUS_META: Record<string, string> = {
  active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  invited: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  suspended: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

function roleClassName(role: string) {
  let hash = 0;
  for (let i = 0; i < role.length; i++) {
    hash = (hash * 31 + role.charCodeAt(i)) | 0;
  }
  return ROLE_PALETTE[Math.abs(hash) % ROLE_PALETTE.length];
}

function formatLabel(value: string) {
  return value
    .split(/[_\s-]+/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

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
  employee: EmployeeOfOrganization;
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
        {getInitials(employee.name)}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <p className="truncate text-[13px] font-semibold text-foreground leading-tight">
          {employee.name}
        </p>
        {employee.nickname && (
          <p className="truncate text-xs text-muted-foreground">
            @{employee.nickname}
          </p>
        )}
      </div>

      <div className="hidden sm:flex shrink-0">
        <Pill className={roleClassName(employee.role.role)}>
          {formatLabel(employee.role.role)}
        </Pill>
      </div>
      <div className="shrink-0">
        <Pill
          className={
            STATUS_META[employee.status] ?? "bg-muted text-muted-foreground"
          }
        >
          {formatLabel(employee.status)}
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

/* ── page ──────────────────────────────────────────────────── */

export function EmployeeDirectoryPage() {
  const { data, isPending, isError, refetch } = useEmployees();
  const nav = useNavigate();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  const employees = useMemo(() => data?.data ?? [], [data]);

  const roleFilters = useMemo(() => {
    const roles = [...new Set(employees.map((e) => e.role.role))];
    return ["all", ...roles];
  }, [employees]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return employees.filter((e) => {
      const matchesSearch =
        !q ||
        e.name.toLowerCase().includes(q) ||
        e.nickname.toLowerCase().includes(q) ||
        e.role.role.toLowerCase().includes(q);
      const matchesRole = roleFilter === "all" || e.role.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [employees, search, roleFilter]);

  const activeCount = employees.filter((e) => e.status === "active").length;
  const roleCount = roleFilters.length - 1;
  const hasActiveFilters = !!search || roleFilter !== "all";

  const openEmployee = (employee: EmployeeOfOrganization) => {
    nav({
      to: "/org-users/$employeeID",
      params: {
        employeeID: employee.id,
      },
    });
  };

  const resetFilters = () => {
    setSearch("");
    setRoleFilter("all");
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-3 sm:px-6 pb-10">
      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="min-w-0">
          <h1 className="font-bold text-xl sm:text-2xl tracking-tight leading-none flex items-center gap-2">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
            Employees
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Org members, their roles and status.
          </p>
        </div>

        <div className="flex gap-4">
          <AddSuperAdminButton />
          <Button
            onClick={() => nav({ to: "/org-users/add_employees" })}
            size={"sm"}
          >
            Add Employee In Bulk
          </Button>
        </div>
      </div>

      {/* ── Stats ── */}
      {!isPending && !isError && employees.length > 0 && (
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
              Roles
            </p>
            <p className="text-base sm:text-lg font-bold tabular-nums">
              {roleCount}
            </p>
          </div>
        </div>
      )}

      {/* ── Search + Filters ── */}
      {!isPending && !isError && employees.length > 0 && (
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
            {roleFilters.map((f) => (
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
                {f === "all" ? "All" : formatLabel(f)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── States ── */}
      {isPending && <LoadingRows />}

      {isError && !isPending && (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center">
          <AlertCircle className="h-7 w-7 text-destructive/60" />
          <p className="text-sm font-medium text-foreground">
            Failed to load employees
          </p>
          <p className="text-xs text-muted-foreground">
            Please refresh the page or try again.
          </p>
          <button
            onClick={() => refetch()}
            className="mt-1 inline-flex items-center gap-1.5 rounded-lg border bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-accent transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Retry
          </button>
        </div>
      )}

      {!isPending && !isError && employees.length === 0 && (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed p-8 text-center">
          <Users className="h-7 w-7 text-muted-foreground/50" />
          <p className="text-sm font-medium text-foreground">
            No employees yet
          </p>
          <p className="text-xs text-muted-foreground">
            Members of your organization will show up here.
          </p>
        </div>
      )}

      {!isPending && !isError && employees.length > 0 && (
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
            <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed p-8 text-center">
              <Search className="h-6 w-6 text-muted-foreground/50" />
              <p className="text-sm font-medium text-foreground">
                No matches found
              </p>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs font-semibold text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
