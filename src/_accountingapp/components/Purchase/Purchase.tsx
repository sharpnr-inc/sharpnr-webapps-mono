import { PurchaseRoot } from "./PurchaseRoot";
import { PurchaseLine } from "./PurchaseLine";
import { PurchaseSummary } from "./PuchaseSummary";
import { PurchaseJournalEntrySummary } from "./PurchaseJournalEntrySummary";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FileText, Hash, CalendarDays, Info, BookOpen } from "lucide-react";
import {
  useDueDate,
  useInvoiceDate,
  useInvoiceNumber,
  useReference,
  useSetField,
} from "./store/PurchaseForm.selectors";
import { PurchaseHeader } from "./PurchaseHeader";
import { usePurchaseContext } from "./PurchaseContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ── Invoice Details card ──────────────────────────────────────────────────────

function PurchaseDetails() {
  const setField = useSetField();
  const invoiceNumber = useInvoiceNumber();
  const invoiceDate = useInvoiceDate();
  const ourReference = useReference();
  const dueDate = useDueDate();
  const { suppliers } = usePurchaseContext();

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
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select supplier…" />
            </SelectTrigger>
            <SelectContent>
              {suppliers?.map((s: any) => (
                <SelectItem key={s.suppliers_id} value={s.suppliers_id}>
                  <div className="flex flex-col leading-tight">
                    {/* Supplier Name */}
                    <span className="font-medium">{s.suppliers_name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
            onChange={(e) => setField("invoice_number", e.target.value)}
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
              onChange={(e) => setField("reference", e.target.value)}
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
              onChange={(e) => setField("invoice_date", e.target.value)}
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
              onChange={(e) => setField("due_date", e.target.value)}
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
          {/* <Select value={payableAccountId} onValueChange={setPayableAccountId}>
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
          </Select> */}
        </div>
      </div>
    </div>
  );
}

// ── Narration ─────────────────────────────────────────────────────────────────

function PurchaseNarration() {
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
