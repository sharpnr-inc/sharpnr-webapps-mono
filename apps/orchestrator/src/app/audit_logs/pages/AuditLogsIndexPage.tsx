import { Button, Skeleton, Badge } from "@sharpnr/ui";
import {
  ScrollText,
  ChevronRight,
  Building2,
  AlertCircle,
  Search,
  Download,
  RotateCcw,
  ShieldAlert,
  Monitor,
  Globe,
  Clock,
  UserPlus,
  Pencil,
  Trash2,
  LogIn,
  LogOut,
  KeyRound,
  Settings2,
  X,
} from "lucide-react";
import { useState, useMemo } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { useAppUserStore } from "@/store/AppUserStore";
import { useAuditLogs } from "../api/queries";
import type {
  AuditAction,
  AuditLogEntry,
  AuditSeverity,
} from "../api/types";
import { cn } from "@/lib/utils";

/* ── config / helpers ─────────────────────────────────────── */

const ACTION_META: Record<
  AuditAction,
  { label: string; icon: typeof Pencil }
> = {
  create: { label: "Created", icon: UserPlus },
  update: { label: "Updated", icon: Pencil },
  delete: { label: "Deleted", icon: Trash2 },
  login: { label: "Login", icon: LogIn },
  logout: { label: "Logout", icon: LogOut },
  export: { label: "Exported", icon: Download },
  permission_change: { label: "Permission", icon: KeyRound },
  config_change: { label: "Config", icon: Settings2 },
};

const SEVERITY_STYLES: Record<AuditSeverity, string> = {
  info: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
  warning:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  critical:
    "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/* ── sub-components ────────────────────────────────────────── */

function StatCard({
  label,
  value,
  accentClass,
}: {
  label: string;
  value: number;
  accentClass?: string;
}) {
  return (
    <div className="rounded-xl border bg-card px-4 py-3 flex flex-col gap-1">
      <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <span
        className={cn(
          "text-2xl font-bold tabular-nums leading-none",
          accentClass ?? "text-foreground",
        )}
      >
        {value}
      </span>
    </div>
  );
}

function SeverityBadge({ severity }: { severity: AuditSeverity }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold capitalize",
        SEVERITY_STYLES[severity],
      )}
    >
      {severity === "critical" && <ShieldAlert className="h-3 w-3" />}
      {severity}
    </span>
  );
}

function LogRow({
  entry,
  active,
  onClick,
}: {
  entry: AuditLogEntry;
  active: boolean;
  onClick: () => void;
}) {
  const meta = ACTION_META[entry.action];
  const ActionIcon = meta.icon;
  const isFailure = entry.status === "failure";

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      className={cn(
        "group relative flex items-center gap-3.5 rounded-xl border bg-card px-4 py-3",
        "cursor-pointer transition-all duration-150",
        "hover:border-border/80 hover:bg-accent/40 hover:shadow-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active && "border-foreground/30 bg-accent/40 shadow-sm",
      )}
    >
      {/* Action icon */}
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px]",
          isFailure
            ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
            : "bg-muted text-muted-foreground",
        )}
      >
        <ActionIcon className="h-4 w-4" />
      </div>

      {/* Summary + actor */}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="truncate text-sm font-medium text-foreground leading-tight">
          {entry.summary}
        </p>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground truncate">
          <span className="font-medium text-foreground/70">
            {entry.actor.name}
          </span>
          <span className="opacity-40">·</span>
          <span className="truncate">
            {entry.target.type}: {entry.target.name}
          </span>
        </div>
      </div>

      {/* Severity */}
      <div className="hidden sm:flex shrink-0">
        <SeverityBadge severity={entry.severity} />
      </div>

      {/* Timestamp */}
      <div className="hidden md:flex w-28 shrink-0 flex-col items-end gap-0.5 text-right">
        <span className="text-xs font-medium text-foreground/80 tabular-nums">
          {formatDistanceToNow(new Date(entry.timestamp), { addSuffix: true })}
        </span>
        <span className="text-[10px] text-muted-foreground tabular-nums">
          {format(new Date(entry.timestamp), "MMM d, HH:mm")}
        </span>
      </div>

      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-muted-foreground" />
    </div>
  );
}

function LoadingRows() {
  return (
    <div className="space-y-2.5">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3.5 rounded-xl border bg-card px-4 py-3"
        >
          <Skeleton className="h-9 w-9 rounded-[10px]" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3.5 w-3/5" />
            <Skeleton className="h-3 w-2/5" />
          </div>
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-8 w-20" />
        </div>
      ))}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 py-2 border-b border-border/50 last:border-0">
      <span className="text-xs text-muted-foreground shrink-0">{label}</span>
      <span className="text-xs font-medium text-foreground text-right break-all">
        {value}
      </span>
    </div>
  );
}

function DetailPanel({
  entry,
  onClose,
}: {
  entry: AuditLogEntry;
  onClose: () => void;
}) {
  const meta = ACTION_META[entry.action];
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex items-start justify-between gap-2 mb-4">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            Event detail
          </span>
          <h3 className="text-sm font-semibold text-foreground leading-snug">
            {entry.summary}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="shrink-0 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label="Close detail panel"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <SeverityBadge severity={entry.severity} />
        <Badge variant={entry.status === "failure" ? "destructive" : "secondary"}>
          {entry.status}
        </Badge>
        <Badge variant="outline">{meta.label}</Badge>
      </div>

      {/* Actor */}
      <div className="flex items-center gap-3 rounded-lg border bg-background px-3 py-2.5 mb-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-bold text-muted-foreground">
          {getInitials(entry.actor.name)}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">
            {entry.actor.name}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {entry.actor.email} · {entry.actor.role}
          </p>
        </div>
      </div>

      {/* Meta facts */}
      <div className="space-y-0">
        <DetailRow label="Target" value={`${entry.target.type} — ${entry.target.name}`} />
        <DetailRow
          label="When"
          value={format(new Date(entry.timestamp), "PPpp")}
        />
        <DetailRow label="IP address" value={entry.ipAddress} />
        <DetailRow label="Device" value={entry.device} />
        {entry.metadata &&
          Object.entries(entry.metadata).map(([k, v]) => (
            <DetailRow
              key={k}
              label={k.replace(/_/g, " ")}
              value={v}
            />
          ))}
      </div>
    </div>
  );
}

/* ── page ──────────────────────────────────────────────────── */

const ACTION_FILTERS: (AuditAction | "all")[] = [
  "all",
  "create",
  "update",
  "delete",
  "permission_change",
  "config_change",
  "login",
  "export",
];

const SEVERITY_FILTERS: (AuditSeverity | "all")[] = [
  "all",
  "info",
  "warning",
  "critical",
];

const AuditLogsIndexPage = () => {
  const { user } = useAppUserStore();
  const { data, isLoading, isError } = useAuditLogs();

  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState<AuditAction | "all">("all");
  const [severityFilter, setSeverityFilter] = useState<AuditSeverity | "all">(
    "all",
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const logs = useMemo(() => data?.data ?? [], [data]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return logs.filter((e) => {
      const matchesSearch =
        !q ||
        e.summary.toLowerCase().includes(q) ||
        e.actor.name.toLowerCase().includes(q) ||
        e.actor.email.toLowerCase().includes(q) ||
        e.target.name.toLowerCase().includes(q) ||
        e.target.type.toLowerCase().includes(q);
      const matchesAction =
        actionFilter === "all" || e.action === actionFilter;
      const matchesSeverity =
        severityFilter === "all" || e.severity === severityFilter;
      return matchesSearch && matchesAction && matchesSeverity;
    });
  }, [logs, search, actionFilter, severityFilter]);

  const selected = useMemo(
    () => logs.find((e) => e.id === selectedId) ?? null,
    [logs, selectedId],
  );

  const criticalCount = logs.filter((e) => e.severity === "critical").length;
  const failureCount = logs.filter((e) => e.status === "failure").length;
  const hasActiveFilters =
    !!search || actionFilter !== "all" || severityFilter !== "all";

  const resetFilters = () => {
    setSearch("");
    setActionFilter("all");
    setSeverityFilter("all");
  };

  return (
    <div className="flex flex-col lg:flex-row lg:gap-4">
      <main className="flex-1 lg:w-8/12 px-4 sm:px-6 pb-10">
        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Building2 className="w-3.5 h-3.5 shrink-0" />
              <span>{user?.org_data?.org_name ?? "Organization"}</span>
              <ChevronRight className="w-3 h-3 shrink-0 opacity-50" />
              <span className="text-foreground font-medium">Audit Log</span>
            </div>
            <h1 className="font-bold text-2xl sm:text-[28px] tracking-tight leading-none flex items-center gap-2">
              <ScrollText className="w-6 h-6 text-muted-foreground" />
              Audit Log
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              A chronological record of activity across your organization.
            </p>
          </div>

          <Button variant="outline" className="shrink-0 mt-1" disabled={isLoading}>
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>

        {/* ── Stats ── */}
        {!isLoading && !isError && logs.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            <StatCard label="Total events" value={logs.length} />
            <StatCard
              label="Critical"
              value={criticalCount}
              accentClass="text-rose-500"
            />
            <StatCard
              label="Failures"
              value={failureCount}
              accentClass="text-amber-500"
            />
          </div>
        )}

        {/* ── Search + Filters ── */}
        {!isLoading && !isError && logs.length > 0 && (
          <div className="flex flex-col gap-3 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search by actor, action, or resource…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={cn(
                  "w-full rounded-lg border bg-background pl-9 pr-3 py-2 text-sm",
                  "placeholder:text-muted-foreground/50",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
                  "transition-shadow duration-150",
                )}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Action filter */}
              <div className="flex flex-wrap items-center gap-1.5">
                {ACTION_FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setActionFilter(f)}
                    className={cn(
                      "rounded-lg px-2.5 py-1.5 text-[11px] font-semibold capitalize transition-all duration-150",
                      actionFilter === f
                        ? "bg-foreground text-background"
                        : "bg-muted text-muted-foreground hover:bg-muted/80",
                    )}
                  >
                    {f === "all"
                      ? "All actions"
                      : ACTION_META[f as AuditAction].label}
                  </button>
                ))}
              </div>

              <div className="h-4 w-px bg-border hidden sm:block" />

              {/* Severity filter */}
              <div className="flex items-center gap-1.5">
                {SEVERITY_FILTERS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSeverityFilter(s)}
                    className={cn(
                      "rounded-lg px-2.5 py-1.5 text-[11px] font-semibold capitalize transition-all duration-150",
                      severityFilter === s
                        ? "bg-foreground text-background"
                        : "bg-muted text-muted-foreground hover:bg-muted/80",
                    )}
                  >
                    {s === "all" ? "All severity" : s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Loading ── */}
        {isLoading && <LoadingRows />}

        {/* ── Error ── */}
        {isError && !isLoading && (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center">
            <AlertCircle className="h-8 w-8 text-destructive/60" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Failed to load audit log
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Something went wrong. Please refresh the page or try again.
              </p>
            </div>
          </div>
        )}

        {/* ── Empty (no events at all) ── */}
        {!isLoading && !isError && logs.length === 0 && (
          <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed p-12 text-center">
            <ScrollText className="h-8 w-8 text-muted-foreground/40" />
            <p className="text-sm font-medium text-foreground">No activity yet</p>
            <p className="text-xs text-muted-foreground max-w-xs">
              Audit events will appear here as members take actions across your
              organization.
            </p>
          </div>
        )}

        {/* ── List ── */}
        {!isLoading && !isError && logs.length > 0 && (
          <>
            {filtered.length > 0 ? (
              <div className="space-y-2.5">
                {filtered.map((entry) => (
                  <LogRow
                    key={entry.id}
                    entry={entry}
                    active={entry.id === selectedId}
                    onClick={() =>
                      setSelectedId((prev) =>
                        prev === entry.id ? null : entry.id,
                      )
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed p-10 text-center">
                <Search className="h-7 w-7 text-muted-foreground/40" />
                <p className="text-sm font-medium text-foreground">No results</p>
                <p className="text-xs text-muted-foreground">
                  No events match your current filters.
                </p>
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
                Showing {filtered.length} of {logs.length} events
              </p>
            )}
          </>
        )}
      </main>

      {/* ── Side panel ── */}
      <aside className="lg:w-4/12 px-4 sm:px-6 lg:px-0 lg:pr-6 pb-10">
        <div className="lg:sticky lg:top-4">
          {selected ? (
            <DetailPanel
              entry={selected}
              onClose={() => setSelectedId(null)}
            />
          ) : (
            <div className="rounded-xl border border-dashed bg-card/50 p-6">
              <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                Event detail
              </span>
              <p className="mt-2 text-sm text-muted-foreground">
                Select an event to inspect its actor, target, and metadata.
              </p>
              <div className="mt-4 space-y-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5" />
                  Precise timestamps
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-3.5 w-3.5" />
                  IP address & origin
                </div>
                <div className="flex items-center gap-2">
                  <Monitor className="h-3.5 w-3.5" />
                  Device & before/after values
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default AuditLogsIndexPage;
