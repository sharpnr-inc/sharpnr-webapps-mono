import React, { useState } from "react";
import { useSelectedRestaurantID } from "../store/selectors";
import SaleTerminalMenu from "../components/SalePosTerminal/Menu/SaleTerminalMenu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  ChefHat,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Receipt,
  Clock,
  Users,
  Bike,
  UtensilsCrossed,
} from "lucide-react";

// ─── Dummy data ───────────────────────────────────────────────────────────────

const ORDER_TYPE_TABS = [
  { id: "dine-in", label: "Dine In", icon: UtensilsCrossed },
  { id: "takeaway", label: "Takeaway", icon: ShoppingCart },
  { id: "delivery", label: "Delivery", icon: Bike },
];

const ACTIVE_TABLES = [
  { id: "t1", label: "T-01", guests: 2, time: "12m", amount: 480 },
  { id: "t2", label: "T-02", guests: 4, time: "34m", amount: 1240 },
  { id: "t3", label: "T-04", guests: 1, time: "8m", amount: 320 },
  { id: "t5", label: "T-05", guests: 6, time: "52m", amount: 2100 },
  { id: "t6", label: "T-07", guests: 3, time: "21m", amount: 870 },
  { id: "t7", label: "T-08", guests: 2, time: "5m", amount: 250 },
  { id: "t8", label: "T-09", guests: 5, time: "41m", amount: 1680 },
];

const EMPTY_TABLES = ["T-03", "T-06", "T-10", "T-11", "T-12"];

const DUMMY_ORDER_ITEMS = [
  { id: 1, name: "Paneer Tikka", price: 250, qty: 1, variant: "Full Plate" },
  { id: 2, name: "Chicken Tikka", price: 320, qty: 2, variant: "Half" },
  { id: 3, name: "Margherita Pizza", price: 370, qty: 1, variant: "Medium" },
  { id: 4, name: "Cappuccino", price: 140, qty: 2, variant: "Large" },
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
          "min-w-[90px] h-[72px] rounded-lg border border-dashed border-border/50",
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
        "min-w-[100px] h-[72px] rounded-lg border p-2.5",
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

// ─── Order line item ──────────────────────────────────────────────────────────

function OrderLineItem({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}: {
  item: (typeof DUMMY_ORDER_ITEMS)[0];
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="group flex flex-col gap-1 rounded-lg border border-border/60 bg-card p-2.5 transition-colors hover:border-border">
      {/* Name + remove */}
      <div className="flex items-start justify-between gap-1">
        <span className="text-xs font-medium leading-snug text-foreground line-clamp-1">
          {item.name}
        </span>
        <button
          onClick={onRemove}
          className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>

      {/* Variant */}
      <span className="text-[10px] text-muted-foreground">{item.variant}</span>

      {/* Qty controls + price */}
      <div className="flex items-center justify-between mt-0.5">
        <div className="flex items-center gap-1 rounded-md border border-border overflow-hidden">
          <button
            onClick={onDecrement}
            className="px-1.5 py-0.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="text-xs font-semibold w-5 text-center tabular-nums">
            {item.qty}
          </span>
          <button
            onClick={onIncrement}
            className="px-1.5 py-0.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
        <span className="text-xs font-bold tabular-nums">
          ₹{item.price * item.qty}
        </span>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const RestaurantSaleTerminalPage: React.FC = () => {
  const restaurantID = useSelectedRestaurantID();
  const [activeTable, setActiveTable] = useState<string | null>("t2");
  const [orderType, setOrderType] = useState("dine-in");
  const [orderItems, setOrderItems] = useState(DUMMY_ORDER_ITEMS);

  const subtotal = orderItems.reduce((s, i) => s + i.price * i.qty, 0);
  const cgst = Math.round(subtotal * 0.06);
  const sgst = Math.round(subtotal * 0.06);
  const total = subtotal + cgst + sgst;

  const increment = (id: number) =>
    setOrderItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)),
    );

  const decrement = (id: number) =>
    setOrderItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0),
    );

  const remove = (id: number) =>
    setOrderItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <div className="mt-3 h-[85vh] flex flex-col gap-3">
      {/* ── Order type bar ── */}
      <div className="flex items-center gap-2">
        {ORDER_TYPE_TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setOrderType(id)}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-150 border",
              orderType === id
                ? "bg-foreground text-background border-foreground"
                : "bg-card text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground",
            )}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

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

                {/* Empty tables */}
                {EMPTY_TABLES.map((label) => (
                  <TableCard
                    key={label}
                    isEmpty
                    table={{ id: label, label, guests: 0, time: "", amount: 0 }}
                  />
                ))}
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
        <div className="flex flex-col w-[280px] shrink-0 border border-border rounded-xl bg-card shadow-sm min-h-0">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
            <div className="flex items-center gap-2">
              <Receipt className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-semibold">Order</span>
            </div>
            {activeTable && (
              <span className="text-xs font-medium bg-muted text-muted-foreground px-2 py-0.5 rounded-md">
                {ACTIVE_TABLES.find((t) => t.id === activeTable)?.label}
              </span>
            )}
          </div>

          {/* Items list */}
          <ScrollArea className="flex-1 min-h-0">
            <div className="p-3 space-y-2">
              {orderItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
                  <ShoppingCart className="w-8 h-8 text-muted-foreground/30" />
                  <p className="text-xs text-muted-foreground">
                    No items added yet
                  </p>
                </div>
              ) : (
                orderItems.map((item) => (
                  <OrderLineItem
                    key={item.id}
                    item={item}
                    onIncrement={() => increment(item.id)}
                    onDecrement={() => decrement(item.id)}
                    onRemove={() => remove(item.id)}
                  />
                ))
              )}
            </div>
          </ScrollArea>

          {/* Bill summary + checkout */}
          {orderItems.length > 0 && (
            <div className="border-t border-border p-3 space-y-3 shrink-0">
              {/* Breakdown */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>
                    Subtotal ({orderItems.reduce((s, i) => s + i.qty, 0)} items)
                  </span>
                  <span className="tabular-nums">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>CGST (6%)</span>
                  <span className="tabular-nums">₹{cgst}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>SGST (6%)</span>
                  <span className="tabular-nums">₹{sgst}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center pt-2 border-t border-border">
                <span className="text-sm font-bold">Total</span>
                <span className="text-base font-bold tabular-nums">
                  ₹{total}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => setOrderItems([])}
                  className="flex items-center justify-center w-9 h-9 rounded-lg border border-border text-muted-foreground hover:border-destructive/50 hover:text-destructive transition-colors shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button className="flex-1 bg-foreground text-background text-sm font-semibold py-2 rounded-lg hover:opacity-90 active:scale-[0.98] transition-all">
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantSaleTerminalPage;
