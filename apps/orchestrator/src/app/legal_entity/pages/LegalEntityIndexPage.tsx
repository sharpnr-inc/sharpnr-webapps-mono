import { Button } from "@sharpnr/ui";
import { Skeleton } from "@sharpnr/ui";
import {
  PlusCircle,
  ChevronRight,
  Building2,
  AlertCircle,
  Search,
} from "lucide-react";
import { useState, useMemo } from "react";
import { CreateLegalEntityForm } from "../components/forms/CreateLegalEntityForm";
import { useAppUserStore } from "@/store/AppUserStore";
import { AboutLegalEntityHelper } from "../components/info_side_panels/AboutLegalEntityHepler";
import { EmptyLegalEntity } from "../components/skeltons_and_empty/EmptyLegalEntity";
import { useAllLegalEntities } from "../api/queries";
import { getLegalEntityTypeLabel } from "../utils/entity_type";
import type { LegalEntityResponseDto } from "../api/types";
import { useNavigate } from "@tanstack/react-router";
import { useModal } from "@/hooks/useModal";
import { cn } from "@/lib/utils";

/* ── helpers ─────────────────────────────────────────────── */

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/* ── sub-components ──────────────────────────────────────── */

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div className="rounded-xl border bg-card px-4 py-3 flex flex-col gap-1">
      <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <span
        className={cn(
          "text-2xl font-bold tabular-nums leading-none",
          accent ? "text-emerald-500" : "text-foreground",
        )}
      >
        {value}
      </span>
    </div>
  );
}

function EntityRow({
  entity,
  onClick,
}: {
  entity: LegalEntityResponseDto;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      className={cn(
        "group relative flex items-center gap-4 rounded-xl border bg-card px-4 py-3.5",
        "cursor-pointer transition-all duration-150",
        "hover:border-border/80 hover:bg-accent/40 hover:shadow-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      )}
    >
      {/* Status stripe */}
      <div
        className={cn(
          "absolute left-0 top-3 bottom-3 w-0.75 rounded-full transition-opacity duration-150",
          entity.status ? "bg-emerald-500" : "bg-border",
          "opacity-0 group-hover:opacity-100",
        )}
      />

      {/* Avatar */}
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px]",
          "text-[12px] font-bold tracking-tight",
          entity.status
            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            : "bg-muted text-muted-foreground",
        )}
      >
        {getInitials(entity.display_name)}
      </div>

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="truncate text-sm font-semibold text-foreground leading-tight">
          {entity.display_name}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {getLegalEntityTypeLabel(entity.entity_type)}
        </p>
      </div>

      {/* Status badge */}
      <span
        className={cn(
          "shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
          entity.status
            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            : "bg-muted text-muted-foreground",
        )}
      >
        {entity.status ? "Active" : "Inactive"}
      </span>

      {/* Arrow */}
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-muted-foreground" />
    </div>
  );
}

function LoadingRows() {
  return (
    <div className="space-y-2.5">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 rounded-xl border bg-card px-4 py-3.5"
        >
          <Skeleton className="h-10 w-10 rounded-[10px]" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3.5 w-2/5" />
            <Skeleton className="h-3 w-1/4" />
          </div>
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
      ))}
    </div>
  );
}

/* ── page ────────────────────────────────────────────────── */

export function LegalEntityIndexPage() {
  const { openModal, closeModal } = useModal();
  const { user } = useAppUserStore();
  const { data, isLoading, isError } = useAllLegalEntities();
  const nav = useNavigate();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");

  const legalEntities = useMemo(() => data?.data ?? [], [data]);

  const filtered = useMemo(() => {
    return legalEntities.filter((e) => {
      const matchesSearch =
        e.display_name.toLowerCase().includes(search.toLowerCase()) ||
        getLegalEntityTypeLabel(e.entity_type)
          ?.toLowerCase()
          .includes(search.toLowerCase());
      const matchesFilter =
        filter === "all" ||
        (filter === "active" && e.status) ||
        (filter === "inactive" && !e.status);
      return matchesSearch && matchesFilter;
    });
  }, [legalEntities, search, filter]);

  const activeCount = legalEntities.filter((e) => e.status).length;
  const inactiveCount = legalEntities.length - activeCount;

  const handleCreateLegalEntity = () => {
    openModal({
      title: "Create Legal Entity",
      description:
        "Set up a new legal entity by providing the required registration and compliance details.",
      size: "lg",
      content: <CreateLegalEntityForm closeModal={closeModal} />,
    });
  };

  const handleNavigate = (entity: LegalEntityResponseDto) => {
    nav({
      to: "/legal_entity/$leID/details",
      from: "/legal_entity",
      search: { lename: entity.legal_name, le__type: entity.display_name },
      params: { leID: entity.id },
    });
  };

  return (
    <div className="flex flex-col lg:flex-row lg:gap-4">
      <main className="flex-1 lg:w-9/12 px-4 sm:px-6 pb-10">
        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex flex-col gap-1">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Building2 className="w-3.5 h-3.5 shrink-0" />
              <span>{user?.org_data.org_name}</span>
              <ChevronRight className="w-3 h-3 shrink-0 opacity-50" />
              <span className="text-foreground font-medium">
                Legal Entities
              </span>
            </div>
            <h1 className="font-bold text-2xl sm:text-[28px] tracking-tight leading-none">
              Legal Entities
            </h1>
          </div>

          <Button onClick={handleCreateLegalEntity} className="shrink-0 mt-1">
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Add Legal Entity</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>

        {/* ── Stats strip (only when data exists) ── */}
        {!isLoading && !isError && legalEntities.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            <StatCard label="Total" value={legalEntities.length} />
            <StatCard label="Active" value={activeCount} accent />
            <StatCard label="Inactive" value={inactiveCount} />
          </div>
        )}

        {/* ── Search + Filter bar ── */}
        {!isLoading && !isError && legalEntities.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search entities…"
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

            {/* Filter chips */}
            <div className="flex items-center gap-1.5 shrink-0">
              {(["all", "active", "inactive"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "rounded-lg px-3 py-2 text-xs font-semibold capitalize transition-all duration-150",
                    filter === f
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

        {/* ── Loading ── */}
        {isLoading && <LoadingRows />}

        {/* ── Error ── */}
        {isError && !isLoading && (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center">
            <AlertCircle className="h-8 w-8 text-destructive/60" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Failed to load entities
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Something went wrong. Please refresh the page or try again.
              </p>
            </div>
          </div>
        )}

        {/* ── Empty (no data at all) ── */}
        {!isLoading && !isError && legalEntities.length === 0 && (
          <EmptyLegalEntity onCreateClick={handleCreateLegalEntity} />
        )}

        {/* ── List ── */}
        {!isLoading && !isError && legalEntities.length > 0 && (
          <>
            {filtered.length > 0 ? (
              <div className="space-y-2.5">
                {filtered.map((entity) => (
                  <EntityRow
                    key={entity.id}
                    entity={entity}
                    onClick={() => handleNavigate(entity)}
                  />
                ))}
              </div>
            ) : (
              /* No search results */
              <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed p-10 text-center">
                <Search className="h-7 w-7 text-muted-foreground/40" />
                <p className="text-sm font-medium text-foreground">
                  No results
                </p>
                <p className="text-xs text-muted-foreground">
                  No entities match{" "}
                  <span className="font-medium">"{search}"</span>. Try a
                  different search term.
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setFilter("all");
                  }}
                  className="mt-1 text-xs font-semibold text-foreground underline underline-offset-2"
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* Result count */}
            {(search || filter !== "all") && filtered.length > 0 && (
              <p className="mt-3 text-xs text-muted-foreground text-right">
                Showing {filtered.length} of {legalEntities.length} entities
              </p>
            )}
          </>
        )}
      </main>

      {/* ── Side Panel ── */}
      <AboutLegalEntityHelper />
    </div>
  );
}
