import { PurchaseRoot } from "./PurchaseRoot";
import { PurchaseLine } from "./PurchaseLine";
import { PurchaseSummary } from "./PuchaseSummary";
import { PurchaseJournalEntrySummary } from "./PurchaseJournalEntrySummary";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChevronLeft,
  Send,
  FileText,
  Hash,
  CalendarDays,
  Info,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { usePurchaseInvoiceStore, SUPPLIERS } from "./store/purchase.store";
import {
  useSetStatus,
  useSetSupplierId,
  useSetInvoiceNumber,
  useSetOurReference,
  useSetInvoiceDate,
  useSetDueDate,
  useSetPayableAccountId,
  useSetNarration,
} from "./store/actions";
import {
  selectSelectedSupplier,
  selectPayableAccounts,
  useInventoryLines,
} from "./store/selectors";
import { usePurchaseContext } from "./PurchaseContext";

type InvoiceStatus =
  | "DRAFT"
  | "POSTED"
  | "PARTIALLY_PAID"
  | "PAID"
  | "CANCELLED";
type PaymentStatus = "UNPAID" | "PARTIAL" | "PAID";

const STATUS_CFG: Record<InvoiceStatus, { label: string; cls: string }> = {
  DRAFT: {
    label: "Draft",
    cls: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  POSTED: { label: "Posted", cls: "bg-blue-100 text-blue-800 border-blue-200" },
  PARTIALLY_PAID: {
    label: "Partially Paid",
    cls: "bg-purple-100 text-purple-800 border-purple-200",
  },
  PAID: { label: "Paid", cls: "bg-green-100 text-green-800 border-green-200" },
  CANCELLED: {
    label: "Cancelled",
    cls: "bg-red-100 text-red-800 border-red-200",
  },
};

const PAYMENT_STATUS_CFG: Record<
  PaymentStatus,
  { label: string; cls: string }
> = {
  UNPAID: { label: "Unpaid", cls: "bg-red-50 text-red-700 border-red-200" },
  PARTIAL: {
    label: "Partial",
    cls: "bg-orange-50 text-orange-700 border-orange-200",
  },
  PAID: { label: "Paid", cls: "bg-green-50 text-green-700 border-green-200" },
};

const PAYABLE_ACCOUNTS = selectPayableAccounts();

// ── Header ────────────────────────────────────────────────────────────────────

function PurchaseHeader() {
  const { onBack, onPosted, onDraftSaved } = usePurchaseContext();
  const setStatus = useSetStatus();
  const status = usePurchaseInvoiceStore((s) => s.status);
  const paymentStatus = usePurchaseInvoiceStore((s) => s.paymentStatus);
  const ourReference = usePurchaseInvoiceStore((s) => s.ourReference);
  const inventoryLines = useInventoryLines(); // ✅ stable hook, not raw selector

  return (
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-lg border shrink-0"
          onClick={onBack}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            Record Purchase Invoice
          </h1>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="text-xs text-muted-foreground font-mono">
              {ourReference}
            </span>
            <span className="text-muted-foreground/40 text-xs">·</span>
            <span
              className={cn(
                "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border",
                STATUS_CFG[status].cls,
              )}
            >
              {STATUS_CFG[status].label}
            </span>
            <span
              className={cn(
                "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border",
                PAYMENT_STATUS_CFG[paymentStatus].cls,
              )}
            >
              {PAYMENT_STATUS_CFG[paymentStatus].label}
            </span>
            {inventoryLines.length > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border bg-teal-50 text-teal-700 border-teal-200">
                {inventoryLines.length} inventory update
                {inventoryLines.length > 1 ? "s" : ""} on post
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-2 shrink-0">
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={() => {
            setStatus("DRAFT");
            onDraftSaved?.();
          }}
        >
          <FileText className="h-3.5 w-3.5" /> Save Draft
        </Button>
        <Button
          size="sm"
          className="gap-1.5 bg-slate-900 hover:bg-slate-800 text-white"
          onClick={() => {
            setStatus("POSTED");
            onPosted?.();
          }}
        >
          <Send className="h-3.5 w-3.5" /> Post Invoice
        </Button>
      </div>
    </div>
  );
}

// ── Invoice Details card ──────────────────────────────────────────────────────

function PurchaseDetails() {
  const supplierId = usePurchaseInvoiceStore((s) => s.supplierId);
  const invoiceNumber = usePurchaseInvoiceStore((s) => s.invoiceNumber);
  const ourReference = usePurchaseInvoiceStore((s) => s.ourReference);
  const invoiceDate = usePurchaseInvoiceStore((s) => s.invoiceDate);
  const dueDate = usePurchaseInvoiceStore((s) => s.dueDate);
  const payableAccountId = usePurchaseInvoiceStore((s) => s.payableAccountId);
  const selectedSupplier = usePurchaseInvoiceStore(selectSelectedSupplier);

  const setSupplierId = useSetSupplierId();
  const setInvoiceNumber = useSetInvoiceNumber();
  const setOurReference = useSetOurReference();
  const setInvoiceDate = useSetInvoiceDate();
  const setDueDate = useSetDueDate();
  const setPayableAccountId = useSetPayableAccountId();

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2 pb-1 border-b border-border">
        <FileText className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
          Invoice Details
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Supplier */}
        <div className="sm:col-span-2 space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground block">
            Supplier / Vendor <span className="text-destructive">*</span>
          </label>
          <Select value={supplierId} onValueChange={setSupplierId}>
            <SelectTrigger>
              <SelectValue placeholder="Select supplier…" />
            </SelectTrigger>
            <SelectContent>
              {SUPPLIERS.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  <div className="flex flex-col">
                    <span>{s.name}</span>
                    {s.outstanding > 0 && (
                      <span className="text-[11px] text-muted-foreground">
                        Outstanding:{" "}
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(s.outstanding)}
                      </span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedSupplier && (
            <p className="text-[11px] text-muted-foreground font-mono pl-0.5">
              ID: {selectedSupplier.id}
            </p>
          )}
        </div>

        {/* Supplier Invoice No. */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
            Supplier Invoice No. <span className="text-destructive">*</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-3 w-3 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-[200px] text-xs">
                The bill number on the supplier's invoice. Must be unique per
                supplier.
              </TooltipContent>
            </Tooltip>
          </label>
          <Input
            placeholder="e.g. RAJ-2026-041"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
          />
        </div>

        {/* Our Reference */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground block">
            Our Reference
          </label>
          <div className="relative">
            <Hash className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              className="pl-8 font-mono text-sm"
              value={ourReference}
              onChange={(e) => setOurReference(e.target.value)}
            />
          </div>
        </div>

        {/* Invoice Date */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground block">
            Invoice Date <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <CalendarDays className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              type="date"
              className="pl-8"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
            />
          </div>
        </div>

        {/* Due Date */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground block">
            Due Date
          </label>
          <div className="relative">
            <CalendarDays className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              type="date"
              className="pl-8"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>

        {/* Payable Account */}
        <div className="sm:col-span-2 space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
            Accounts Payable Account <span className="text-destructive">*</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-3 w-3 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-[220px] text-xs">
                The liability account credited when this invoice is posted.
              </TooltipContent>
            </Tooltip>
          </label>
          <Select value={payableAccountId} onValueChange={setPayableAccountId}>
            <SelectTrigger className="w-full sm:w-2/3">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAYABLE_ACCOUNTS.map((a) => (
                <SelectItem key={a.id} value={a.id}>
                  <span className="font-mono text-xs text-muted-foreground mr-2">
                    {a.code}
                  </span>
                  {a.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

// ── Narration ─────────────────────────────────────────────────────────────────

function PurchaseNarration() {
  const narration = usePurchaseInvoiceStore((s) => s.narration);
  const setNarration = useSetNarration();

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2 pb-1 border-b border-border">
        <BookOpen className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
          Narration
        </span>
      </div>
      <Textarea
        className="resize-none text-sm"
        rows={2}
        placeholder="Internal narration — appears on the journal entry when posted…"
        value={narration}
        onChange={(e) => setNarration(e.target.value)}
      />
    </div>
  );
}

// ── Compound assembly ─────────────────────────────────────────────────────────

const NewPurchase = Object.assign(PurchaseRoot, {
  Header: PurchaseHeader,
  Details: PurchaseDetails,
  Lines: PurchaseLine,
  Narration: PurchaseNarration,
  JournalPreview: PurchaseJournalEntrySummary,
  Summary: PurchaseSummary,
});

export default NewPurchase;
