import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Badge } from "@sharpnr/ui";
import {
  Building2,
  ChevronDown,
  Info,
  Layers,
  Network,
  Receipt,
  Wallet,
} from "lucide-react";
import { cn } from "@sharpnr/utils";

/* ── hierarchy strip ──────────────────────────────────────── */

const HIERARCHY = [
  {
    icon: Building2,
    label: "Organization",
    caption: "Your company",
  },
  {
    icon: Layers,
    label: "Cost Center",
    caption: "A branch, property, outlet or project",
  },
  {
    icon: Network,
    label: "Departments",
    caption: "Live inside one cost center",
  },
];

function HierarchyStrip() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-stretch gap-2">
      {HIERARCHY.map((step, i) => (
        <div key={step.label} className="flex items-center gap-2 flex-1">
          <div className="flex-1 rounded-lg border bg-background px-3 py-2.5">
            <div className="flex items-center gap-2">
              <step.icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span className="text-xs font-semibold text-foreground">
                {step.label}
              </span>
            </div>
            <p className="mt-0.5 text-[11px] text-muted-foreground leading-snug">
              {step.caption}
            </p>
          </div>

          {i < HIERARCHY.length - 1 && (
            <span
              aria-hidden
              className="text-muted-foreground/40 shrink-0 rotate-90 sm:rotate-0"
            >
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── panel ────────────────────────────────────────────────── */

function WhatIsCostCenterPanel({ className }: { className?: string }) {
  const [open, setOpen] = useState(true);

  return (
    <section
      className={cn("rounded-xl border bg-card overflow-hidden", className)}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-accent/40"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-muted text-muted-foreground">
          <Info className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold text-foreground">
            What is a Cost Center?
          </h2>
          <p className="text-xs text-muted-foreground">
            How spend, budgets and departments are grouped.
          </p>
        </div>

        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div className="border-t px-5 py-5 space-y-5">
          <p className="text-sm text-muted-foreground leading-relaxed">
            A <span className="font-medium text-foreground">cost center</span> is
            a part of your organization that money is tracked against rather than
            earned by — a branch, a property, an outlet, or a project. Every
            budget, expense and department underneath it rolls up to that one
            unit, so you can answer "what did this branch actually cost us?"
            without untangling company-wide totals.
          </p>

          <HierarchyStrip />

          {/* The distinction that trips people up */}
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
            <p className="text-xs font-semibold text-foreground mb-3">
              Departments here are not the same as organization departments
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border bg-background p-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <Network className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs font-semibold text-foreground">
                    Organization departments
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Company-wide functions that exist once for the whole business
                  — Engineering, HR, Finance. Managed under{" "}
                  <Link
                    to="/deparments"
                    className="font-medium text-foreground underline underline-offset-2"
                  >
                    Departments
                  </Link>
                  .
                </p>
              </div>

              <div className="rounded-lg border bg-background p-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <Layers className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs font-semibold text-foreground">
                    Cost center departments
                  </span>
                  <Badge variant="secondary" className="text-[10px]">
                    scoped
                  </Badge>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Local units that exist only inside one cost center — the
                  kitchen at the Bengaluru branch, housekeeping at one property.
                  Each cost center keeps its own list, and their spend rolls up
                  to that cost center, not to the company.
                </p>
              </div>
            </div>
          </div>

          {/* What a cost center holds */}
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="flex items-start gap-2.5">
              <Network className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-foreground">
                  Departments
                </p>
                <p className="text-[11px] text-muted-foreground leading-snug">
                  The teams operating inside this cost center.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Wallet className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-foreground">Budgets</p>
                <p className="text-[11px] text-muted-foreground leading-snug">
                  What it is allowed to spend over a period.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Receipt className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-foreground">Expenses</p>
                <p className="text-[11px] text-muted-foreground leading-snug">
                  What it actually spent, charged back to it.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default WhatIsCostCenterPanel;
