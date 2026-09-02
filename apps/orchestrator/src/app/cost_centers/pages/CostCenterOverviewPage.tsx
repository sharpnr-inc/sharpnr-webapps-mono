import { Building2, ChevronRight, Layers } from "lucide-react";
import { useAppUserStore } from "@/store/AppUserStore";
import WhatIsCostCenterPanel from "../components/WhatIsCostCenterPanel";

const CostCenterOverviewPage = () => {
  const { user } = useAppUserStore();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 pb-10 space-y-6">
      {/* ── Header ── */}
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

      {/* ── What is a cost center ── */}
      <WhatIsCostCenterPanel />

      {/* ── Cost centers list ── */}
      <section className="space-y-3">
        <h2 className="text-base font-semibold text-foreground">
          Your cost centers
        </h2>

        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed p-12 text-center">
          <Layers className="h-8 w-8 text-muted-foreground/40" />
          <p className="text-sm font-medium text-foreground">
            No cost centers yet
          </p>
          <p className="text-xs text-muted-foreground max-w-xs">
            Once a branch, property or project is set up as a cost center, it
            will appear here with its departments and spend.
          </p>
        </div>
      </section>
    </div>
  );
};

export default CostCenterOverviewPage;
