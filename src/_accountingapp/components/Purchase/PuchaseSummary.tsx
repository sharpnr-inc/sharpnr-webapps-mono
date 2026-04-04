import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Send, FileText, Boxes } from "lucide-react";
import { cn } from "@/lib/utils";

import { usePurchaseInvoiceStore } from "./store/purchase.store";
import { useSetStatus } from "./store/actions";
import {
  selectSubTotal,
  selectTaxTotal,
  selectGrandTotal,
  selectAmountDue,
  selectSelectedSupplier,
  selectInventoryItem,
  selectInventoryWarehouse,
  useInventoryLines,
} from "./store/selectors";
import { usePurchaseContext } from "./PurchaseContext";

function fmt(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(n);
}

export function PurchaseSummary() {
  const { onPosted, onDraftSaved } = usePurchaseContext();
  const setStatus = useSetStatus();
  const subTotal = usePurchaseInvoiceStore(selectSubTotal);
  const taxTotal = usePurchaseInvoiceStore(selectTaxTotal);
  const grandTotal = usePurchaseInvoiceStore(selectGrandTotal);
  const amountDue = usePurchaseInvoiceStore(selectAmountDue);
  const selectedSupplier = usePurchaseInvoiceStore(selectSelectedSupplier);
  const inventoryLines = useInventoryLines();
  const lineCount = usePurchaseInvoiceStore((s) => s.lines.length);
  const totalQty = usePurchaseInvoiceStore((s) =>
    s.lines.reduce((acc, l) => acc + l.quantity, 0).toFixed(2),
  );

  const lineStats = [
    { label: "Lines", value: lineCount },
    { label: "Total Qty", value: totalQty },
  ];

  function handlePost() {
    setStatus("POSTED");
    onPosted?.();
  }

  function handleDraft() {
    setStatus("DRAFT");
    onDraftSaved?.();
  }

  return (
    <div className="space-y-4">
      {/* ── Totals ── */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-3 sticky top-6">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Invoice Summary
        </p>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Sub Total</span>
          <span className="tabular-nums">{fmt(subTotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax Amount</span>
          <span className="tabular-nums">{fmt(taxTotal)}</span>
        </div>

        <Separator />

        <div className="flex justify-between font-bold text-base">
          <span>Total Amount</span>
          <span className="tabular-nums">{fmt(grandTotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Amount Paid</span>
          <span className="tabular-nums text-green-600">{fmt(0)}</span>
        </div>
        <div className="flex justify-between text-sm font-semibold">
          <span>Amount Due</span>
          <span className="tabular-nums text-red-600">{fmt(amountDue)}</span>
        </div>

        <div className="pt-1 space-y-2">
          <Button
            className="w-full gap-2 bg-slate-900 hover:bg-slate-800 text-white"
            size="sm"
            onClick={handlePost}
          >
            <Send className="h-3.5 w-3.5" /> Post Invoice
          </Button>
          <Button
            variant="outline"
            className="w-full gap-2"
            size="sm"
            onClick={handleDraft}
          >
            <FileText className="h-3.5 w-3.5" /> Save Draft
          </Button>
        </div>
      </div>

      {/* ── Supplier card ── */}
      {selectedSupplier && (
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            Supplier
          </p>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold shrink-0">
              {selectedSupplier.name
                .split(" ")
                .slice(0, 2)
                .map((w) => w[0])
                .join("")}
            </div>
            <div>
              <p className="text-sm font-medium leading-tight">
                {selectedSupplier.name}
              </p>
              <p className="text-[11px] text-muted-foreground font-mono">
                {selectedSupplier.id}
              </p>
            </div>
          </div>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Existing outstanding
              </span>
              <span
                className={cn(
                  "font-medium",
                  selectedSupplier.outstanding > 0
                    ? "text-red-600"
                    : "text-green-600",
                )}
              >
                {fmt(selectedSupplier.outstanding)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">After this invoice</span>
              <span className="font-semibold">
                {fmt(selectedSupplier.outstanding + amountDue)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── Inventory update summary ── */}
      {inventoryLines.length > 0 && (
        <div className="rounded-xl border border-teal-200 bg-teal-50/60 dark:bg-teal-950/20 dark:border-teal-900 p-4 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Boxes className="h-4 w-4 text-teal-600" />
            <p className="text-xs font-semibold text-teal-700 dark:text-teal-400 uppercase tracking-widest">
              Inventory Updates on Post
            </p>
          </div>
          <p className="text-[11px] text-teal-700/80 dark:text-teal-400/80">
            These quantities will be added to stock when the invoice is{" "}
            <strong>Posted</strong>.
          </p>
          <div className="space-y-2">
            {inventoryLines.map((l) => {
              const item = selectInventoryItem(l.inventoryItemId);
              const warehouse = selectInventoryWarehouse(l.inventoryId);
              return (
                <div
                  key={l.id}
                  className="flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-medium text-foreground">
                      {item?.name ?? "—"}
                    </span>
                    <span className="text-muted-foreground ml-1">
                      → {warehouse?.name ?? "—"}
                    </span>
                  </div>
                  <span className="font-semibold text-teal-700 dark:text-teal-400">
                    +{l.quantity} {item?.unit ?? ""}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Line breakdown ── */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-sm space-y-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
          Line Breakdown
        </p>
        <div className="grid grid-cols-2 gap-2">
          {lineStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-muted/50 rounded-lg p-3 text-center"
            >
              <p className="text-[11px] text-muted-foreground">{stat.label}</p>
              <p className="text-lg font-semibold mt-0.5">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
