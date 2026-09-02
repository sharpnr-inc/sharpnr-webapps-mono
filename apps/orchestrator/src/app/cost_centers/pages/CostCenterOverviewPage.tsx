import {
  AlertTriangle,
  Building2,
  ChevronRight,
  Layers,
  MapPin,
  Plus,
} from "lucide-react";
import { Badge, Button, Skeleton, useModal } from "@sharpnr/ui";
import { useNavigate } from "@tanstack/react-router";
import { useAppUserStore } from "@/store/AppUserStore";
import WhatIsCostCenterPanel from "../components/WhatIsCostCenterPanel";
import { AddCostCenterForm } from "../components/AddCostCenterForm";
import { useOrgCostCenters } from "../api/queries";
import type { CostCenterResponseDto } from "../api/types";

/* ── card ─────────────────────────────────────────────────── */

function CostCenterCard({
  costCenter,
  onClick,
}: {
  costCenter: CostCenterResponseDto;
  onClick: () => void;
}) {
  const location = [costCenter.city, costCenter.state, costCenter.country]
    .filter(Boolean)
    .join(", ");

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      className="group flex items-center gap-3.5 rounded-xl border bg-card px-4 py-3 cursor-pointer transition-all duration-150 hover:border-border/80 hover:bg-accent/40 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-muted text-muted-foreground">
        <Layers className="h-4 w-4" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex items-center gap-2 min-w-0">
          <p className="truncate text-sm font-medium text-foreground leading-tight">
            {costCenter.name}
          </p>
          {costCenter.code && (
            <Badge variant="secondary" className="shrink-0">
              {costCenter.code}
            </Badge>
          )}
        </div>

        <p className="truncate text-xs text-muted-foreground">
          {costCenter.description || "No description added yet."}
        </p>
      </div>

      {location && (
        <span className="hidden sm:flex items-center gap-1.5 shrink-0 text-xs text-muted-foreground max-w-48">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{location}</span>
        </span>
      )}

      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-muted-foreground" />
    </div>
  );
}

/* ── page ─────────────────────────────────────────────────── */

const CostCenterOverviewPage = () => {
  const { user } = useAppUserStore();
  const { openModal, closeModal } = useModal();
  const { data, isLoading, isError } = useOrgCostCenters();
  const nav = useNavigate();

  const costCenters = data?.data ?? [];

  const handleAddNewCostCenter = () => {
    openModal({
      title: "Add New Cost Center",
      description:
        "A branch, property or project that spend is tracked against.",
      content: <AddCostCenterForm closeModal={closeModal} />,
    });
  };

  const openCostCenter = (costCenter: CostCenterResponseDto) => {
    nav({
      to: "/cost_center/overview/$cost_centerID",
      params: { cost_centerID: costCenter.id },
    });
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 pb-10 space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Building2 className="w-3.5 h-3.5 shrink-0" />
            <span>{user?.org_data?.org_name ?? "Organization"}</span>
            <ChevronRight className="w-3 h-3 shrink-0 opacity-50" />
            <span className="text-foreground font-medium">Cost Centers</span>
          </div>

          <h1 className="font-bold text-2xl sm:text-[28px] tracking-tight leading-none flex items-center gap-2">
            <Layers className="w-6 h-6 text-muted-foreground" />
            Cost Centers
          </h1>

          <p className="text-sm text-muted-foreground mt-1">
            Group spend by branch, property or project — each with its own
            departments, budgets and expenses.
          </p>
        </div>

        <Button className="gap-1 shrink-0" onClick={handleAddNewCostCenter}>
          <Plus className="h-4 w-4" />
          Add Cost Center
        </Button>
      </div>

      {/* ── What is a cost center ── */}
      <WhatIsCostCenterPanel />

      {/* ── Cost centers list ── */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-foreground">
            Your cost centers
          </h2>
          {!isLoading && !isError && (
            <span className="text-sm text-muted-foreground">
              ({costCenters.length})
            </span>
          )}
        </div>

        {isLoading ? (
          <div className="space-y-2.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-xl" />
            ))}
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center">
            <AlertTriangle className="h-6 w-6 text-destructive/60" />
            <p className="text-sm font-medium text-foreground">
              Failed to load cost centers
            </p>
            <p className="text-xs text-muted-foreground">
              Please refresh the page or try again.
            </p>
          </div>
        ) : costCenters.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed p-12 text-center">
            <Layers className="h-8 w-8 text-muted-foreground/40" />
            <p className="text-sm font-medium text-foreground">
              No cost centers yet
            </p>
            <p className="text-xs text-muted-foreground max-w-xs">
              Add a branch, property or project as a cost center and its
              departments and spend will show up here.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 gap-1"
              onClick={handleAddNewCostCenter}
            >
              <Plus className="h-3.5 w-3.5" />
              Add Cost Center
            </Button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {costCenters.map((costCenter) => (
              <CostCenterCard
                key={costCenter.id}
                costCenter={costCenter}
                onClick={() => openCostCenter(costCenter)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default CostCenterOverviewPage;
