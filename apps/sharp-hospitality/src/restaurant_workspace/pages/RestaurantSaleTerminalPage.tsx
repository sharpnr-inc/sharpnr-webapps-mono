import React, { useState } from "react";
import SaleTerminalMenu from "../components/SalePosTerminal/Menu/SaleTerminalMenu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ChefHat, Receipt, Clock, Users } from "lucide-react";
import { SalePosTerminalOrderSummary } from "../components/SalePosTerminal/OrderSummary/PosOrderSummary";
import { Route } from "@/routes/workspace/_modules/restaurant/$restaurantID/sales-terminal/index";

// ─── Dummy data ───────────────────────────────────────────────────────────────

const ACTIVE_TABLES = [
  { id: "t1", label: "T-01", guests: 2, time: "12m", amount: 480 },
  { id: "t2", label: "T-02", guests: 4, time: "34m", amount: 1240 },
  { id: "t3", label: "T-04", guests: 1, time: "8m", amount: 320 },
  { id: "t5", label: "T-05", guests: 6, time: "52m", amount: 2100 },
  { id: "t6", label: "T-07", guests: 3, time: "21m", amount: 870 },
  { id: "t7", label: "T-08", guests: 2, time: "5m", amount: 250 },
  { id: "t8", label: "T-09", guests: 5, time: "41m", amount: 1680 },
];

// ─── Table card ───────────────────────────────────────────────────────────────

function TableCard({
  table,
  isActive,
  isEmpty,
  onClick,
}: {
  table?: (typeof ACTIVE_TABLES)[0];
  isActive?: boolean;
  isEmpty?: boolean;
  onClick?: () => void;
}) {
  if (isEmpty) {
    return (
      <button
        onClick={onClick}
        className={cn(
          "min-w-22.5 h-18 rounded-lg border border-dashed border-border/50",
          "flex flex-col items-center justify-center gap-1",
          "text-muted-foreground/40 hover:border-border hover:text-muted-foreground",
          "transition-all duration-150",
        )}
      >
        <span className="text-xs font-medium">{table?.label ?? "Empty"}</span>
        <span className="text-[10px]">Available</span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "min-w-25 h-18 rounded-lg border p-2.5",
        "flex flex-col justify-between text-left",
        "transition-all duration-150 active:scale-[0.97]",
        isActive
          ? "border-foreground bg-foreground text-background shadow-md"
          : "border-border bg-card hover:border-foreground/30 hover:shadow-sm",
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold tracking-wide">{table!.label}</span>
        <span
          className={cn(
            "flex items-center gap-0.5 text-[10px]",
            isActive ? "text-background/70" : "text-muted-foreground",
          )}
        >
          <Clock className="w-2.5 h-2.5" />
          {table!.time}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "flex items-center gap-0.5 text-[10px]",
            isActive ? "text-background/70" : "text-muted-foreground",
          )}
        >
          <Users className="w-2.5 h-2.5" />
          {table!.guests}
        </span>
        <span className="text-xs font-semibold tabular-nums">
          ₹{table!.amount}
        </span>
      </div>
    </button>
  );
}

const RestaurantSaleTerminalPage: React.FC = () => {
  const [activeTable, setActiveTable] = useState<string | null>("t2");
  const { restaurantID } = Route.useParams();

  return (
    <div className="mt-3 h-[85vh] flex flex-col gap-3">
      {/* ── Main layout ── */}
      <div className="flex gap-3 flex-1 min-h-0">
        {/* ─── LEFT ─── */}
        <div className="flex flex-col gap-3 flex-1 min-w-0">
          {/* Table strip */}
          <div className="border border-border rounded-xl bg-card shadow-sm">
            <ScrollArea className="w-full">
              <div className="flex gap-2 p-3 w-max">
                {/* Active tables */}
                {ACTIVE_TABLES.map((t) => (
                  <TableCard
                    key={t.id}
                    table={t}
                    isActive={activeTable === t.id}
                    onClick={() =>
                      setActiveTable(activeTable === t.id ? null : t.id)
                    }
                  />
                ))}

                {/* Separator */}
                <div className="w-px bg-border/50 mx-1 self-stretch" />
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          {/* Menu section */}
          <div className="flex flex-col border border-border rounded-xl bg-card shadow-sm flex-1 min-h-0 overflow-hidden">
            {/* Menu section header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border shrink-0">
              <ChefHat className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-semibold">Menu</span>
            </div>

            <div className="flex-1 overflow-auto p-4">
              {restaurantID ? (
                <SaleTerminalMenu restaurantID={restaurantID}>
                  <div className="flex flex-col gap-3">
                    <SaleTerminalMenu.MenuHeader />
                    <SaleTerminalMenu.CategoryTabs />
                    <SaleTerminalMenu.SubCategoryTabs />
                    <SaleTerminalMenu.MenuItems />
                  </div>
                </SaleTerminalMenu>
              ) : (
                <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                  Loading or select a restaurant…
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ─── RIGHT — Order summary ─── */}
        <div className="flex flex-col shrink-0 border border-border rounded-xl bg-card shadow-sm ">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
            <div className="flex items-center gap-2">
              <Receipt className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-semibold">Order</span>
            </div>
          </div>
          <SalePosTerminalOrderSummary />
        </div>
      </div>
    </div>
  );
};

export default RestaurantSaleTerminalPage;
