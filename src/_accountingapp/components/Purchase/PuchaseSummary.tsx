import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Send, FileText } from "lucide-react";
import {
  useSubmit,
  useInvoiceTotal,
  useIsSubmitting,
  useLines,
} from "./store/PurchaseForm.selectors";

function fmt(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(n);
}

export function PurchaseSummary() {
  const submit = useSubmit();
  const isSubmitting = useIsSubmitting();
  const lines = useLines();
  const total = useInvoiceTotal();

  // computed
  const subTotal = lines.reduce((sum, l) => sum + l.qty * l.unit_price, 0);
  const taxAmount = total - subTotal;
  const amountDue = total; // replace with total - amountPaid when you have it

  // ✅ correct — pass an async callback to submit
  const handlePost = () => {
    submit(async (values) => {
      console.log("✅ Purchase Invoice Values:", values);
    });
  };

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
          <span className="tabular-nums">{fmt(taxAmount)}</span>
        </div>

        <Separator />

        <div className="flex justify-between font-bold text-base">
          <span>Total Amount</span>
          <span className="tabular-nums">{fmt(total)}</span>
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
            type="button"
            onClick={handlePost}
            // disabled={isSubmitting}
            className="w-full gap-2 bg-slate-900 hover:bg-slate-800 text-white"
            size="sm"
          >
            <Send className="h-3.5 w-3.5" />
            {isSubmitting ? "Posting…" : "Post Invoice"}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full gap-2"
            size="sm"
          >
            <FileText className="h-3.5 w-3.5" /> Save Draft
          </Button>
        </div>
      </div>

      {/* ── Line breakdown ── */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-sm space-y-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
          Line Breakdown
        </p>
        <div className="space-y-2">
          {lines.map((line, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span className="text-muted-foreground truncate max-w-[60%]">
                {line.description || `Line ${i + 1}`}
              </span>
              <span className="tabular-nums">
                {fmt(line.qty * line.unit_price)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
