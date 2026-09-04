import {
  Badge,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
  useModal,
} from "@sharpnr/ui";
import {
  ScrollText,
  ChevronRight,
  ChevronLeft,
  Building2,
  AlertCircle,
  Search,
  Download,
  RotateCcw,
} from "lucide-react";
import { useState, useMemo } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { useAppUserStore } from "@/store/AppUserStore";
import { useAuditLogs } from "../api/queries";
import type { AuditLogEntry } from "../api/types";
import LogDetailViewModal from "../components/LogDetailViewModal";
import {
  DESTRUCTIVE_ACTION,
  actionIcon,
  actorLabel,
  entryTitle,
  formatAction,
} from "../utils/format";
import { cn } from "@sharpnr/utils";

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];
const DEFAULT_PAGE_SIZE = 25;

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

function LogRow({
  entry,
  onClick,
}: {
  entry: AuditLogEntry;
  onClick: () => void;
}) {
  const ActionIcon = actionIcon(entry.action);
  const isDestructive = DESTRUCTIVE_ACTION.test(entry.action);

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
      )}
    >
      {/* Action icon */}
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px]",
          isDestructive
            ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
            : "bg-muted text-muted-foreground",
        )}
      >
        <ActionIcon className="h-4 w-4" />
      </div>

      {/* Summary + actor */}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="truncate text-sm font-medium text-foreground leading-tight">
          {entryTitle(entry)}
        </p>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground truncate">
          <span className="font-medium text-foreground/70">
            {actorLabel(entry)}
          </span>
          <span className="opacity-40">·</span>
          <span className="truncate">
            {entry.resourceType
              ? `${entry.module}: ${entry.resourceType}`
              : entry.module}
          </span>
        </div>
      </div>

      {/* Module */}
      <div className="hidden sm:flex shrink-0">
        <Badge variant="secondary" className="capitalize">
          {entry.module}
        </Badge>
      </div>

      {/* Timestamp */}
      <div className="hidden md:flex w-28 shrink-0 flex-col items-end gap-0.5 text-right">
        <span className="text-xs font-medium text-foreground/80 tabular-nums">
          {formatDistanceToNow(new Date(entry.createdAt), { addSuffix: true })}
        </span>
        <span className="text-[10px] text-muted-foreground tabular-nums">
          {format(new Date(entry.createdAt), "MMM d, HH:mm")}
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

/* ── page ──────────────────────────────────────────────────── */

const AuditLogsIndexPage = () => {
  const { user } = useAppUserStore();
  const { openModal } = useModal();

  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isError, isFetching } = useAuditLogs({
    limit: pageSize,
    offset,
  });

  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [moduleFilter, setModuleFilter] = useState("all");

  // Newest first, regardless of the order the endpoint hands back.
  const logs = useMemo(
    () =>
      [...(data?.data?.logs ?? [])].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [data],
  );

  const pagination = data?.data?.pagination;
  const totalEvents = pagination?.total ?? logs.length;
  const hasMore = pagination?.hasMore ?? false;
  const rangeStart = logs.length === 0 ? 0 : offset + 1;
  const rangeEnd = offset + logs.length;

  // Filter chips are derived from what actually came back, since `action` and
  // `module` are open-ended strings. Search and chips narrow the current page
  // only — the endpoint paginates but takes no filter params yet.
  const actionFilters = useMemo(
    () => ["all", ...new Set(logs.map((e) => e.action))].sort(),
    [logs],
  );

  const moduleFilters = useMemo(
    () => ["all", ...new Set(logs.map((e) => e.module))].sort(),
    [logs],
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return logs.filter((e) => {
      const matchesSearch =
        !q ||
        (e.description ?? "").toLowerCase().includes(q) ||
        actorLabel(e).toLowerCase().includes(q) ||
        e.action.toLowerCase().includes(q) ||
        e.module.toLowerCase().includes(q) ||
        (e.resourceType ?? "").toLowerCase().includes(q);
      const matchesAction = actionFilter === "all" || e.action === actionFilter;
      const matchesModule = moduleFilter === "all" || e.module === moduleFilter;
      return matchesSearch && matchesAction && matchesModule;
    });
  }, [logs, search, actionFilter, moduleFilter]);

  const moduleCount = useMemo(
    () => new Set(logs.map((e) => e.module)).size,
    [logs],
  );

  const actorCount = useMemo(
    () => new Set(logs.map((e) => e.actor.id ?? actorLabel(e))).size,
    [logs],
  );

  const hasActiveFilters =
    !!search || actionFilter !== "all" || moduleFilter !== "all";

  const resetFilters = () => {
    setSearch("");
    setActionFilter("all");
    setModuleFilter("all");
  };

  const goToPage = (nextOffset: number) => {
    setOffset(Math.max(0, nextOffset));
    resetFilters();
  };

  // A bigger or smaller window invalidates the current offset, so start over.
  const changePageSize = (value: string) => {
    setPageSize(Number(value));
    setOffset(0);
    resetFilters();
  };

  const openLogDetail = (entry: AuditLogEntry) => {
    openModal({
      title: entryTitle(entry),
      description: `${formatAction(entry.action)} · ${entry.module}`,
      content: <LogDetailViewModal entry={entry} />,
      size: "md",
    });
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 pb-10">
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
          <StatCard label="Total events" value={totalEvents} />
          <StatCard label="Modules" value={moduleCount} />
          <StatCard label="Actors" value={actorCount} />
        </div>
      )}

      {/* ── Search + Filters ── */}
      {!isLoading && !isError && logs.length > 0 && (
        <div className="flex flex-col gap-3 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Search this page by actor, action, module, or resource…"
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
              {actionFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActionFilter(f)}
                  className={cn(
                    "rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition-all duration-150",
                    actionFilter === f
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground hover:bg-muted/80",
                  )}
                >
                  {f === "all" ? "All actions" : formatAction(f)}
                </button>
              ))}
            </div>

            {moduleFilters.length > 2 && (
              <>
                <div className="h-4 w-px bg-border hidden sm:block" />

                {/* Module filter */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {moduleFilters.map((m) => (
                    <button
                      key={m}
                      onClick={() => setModuleFilter(m)}
                      className={cn(
                        "rounded-lg px-2.5 py-1.5 text-[11px] font-semibold capitalize transition-all duration-150",
                        moduleFilter === m
                          ? "bg-foreground text-background"
                          : "bg-muted text-muted-foreground hover:bg-muted/80",
                      )}
                    >
                      {m === "all" ? "All modules" : m}
                    </button>
                  ))}
                </div>
              </>
            )}
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
          <div className={cn(isFetching && "opacity-60 transition-opacity")}>
            {filtered.length > 0 ? (
              <div className="space-y-2.5">
                {filtered.map((entry) => (
                  <LogRow
                    key={entry.id}
                    entry={entry}
                    onClick={() => openLogDetail(entry)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed p-10 text-center">
                <Search className="h-7 w-7 text-muted-foreground/40" />
                <p className="text-sm font-medium text-foreground">No results</p>
                <p className="text-xs text-muted-foreground">
                  No events on this page match your current filters.
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
          </div>

          {/* ── Pagination ── */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  Rows per page
                </span>
                <Select
                  value={String(pageSize)}
                  onValueChange={changePageSize}
                  disabled={isFetching}
                >
                  <SelectTrigger size="sm" className="w-[72px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PAGE_SIZE_OPTIONS.map((size) => (
                      <SelectItem key={size} value={String(size)}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <p className="text-xs text-muted-foreground tabular-nums">
                {hasActiveFilters
                  ? `Showing ${filtered.length} of ${logs.length} on this page`
                  : `Showing ${rangeStart}–${rangeEnd} of ${totalEvents} events`}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={offset === 0 || isFetching}
                onClick={() => goToPage(offset - pageSize)}
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={!hasMore || isFetching}
                onClick={() => goToPage(offset + pageSize)}
              >
                Next
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AuditLogsIndexPage;
