import { useState, useMemo } from "react";
import { useRouter } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Search,
  FileText,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  SlidersHorizontal,
  Download,
} from "lucide-react";
import { cn } from "@sharpnr/utils";

// ── Types ─────────────────────────────────────────────────────────────────────

type InvoiceStatus =
  | "DRAFT"
  | "POSTED"
  | "PARTIALLY_PAID"
  | "PAID"
  | "CANCELLED";
type PaymentStatus = "UNPAID" | "PARTIAL" | "PAID";

interface PurchaseInvoiceRow {
  id: string;
  ourReference: string;
  invoiceNumber: string;
  supplierName: string;
  supplierId: string;
  invoiceDate: string;
  dueDate: string | null;
  status: InvoiceStatus;
  paymentStatus: PaymentStatus;
  totalAmount: number;
  amountPaid: number;
  amountDue: number;
  lineCount: number;
  hasInventory: boolean;
}

// ── Dummy data ─────────────────────────────────────────────────────────────────

const DUMMY_INVOICES: PurchaseInvoiceRow[] = [
  {
    id: "inv-001",
    ourReference: "PINV-2026-001",
    invoiceNumber: "RAJ-2026-041",
    supplierName: "Reliance Industries Ltd.",
    supplierId: "sup-001",
    invoiceDate: "2026-03-28",
    dueDate: "2026-04-27",
    status: "POSTED",
    paymentStatus: "UNPAID",
    totalAmount: 125080,
    amountPaid: 0,
    amountDue: 125080,
    lineCount: 3,
    hasInventory: true,
  },
  {
    id: "inv-002",
    ourReference: "PINV-2026-002",
    invoiceNumber: "TCS-INV-9920",
    supplierName: "Tata Consultancy Services",
    supplierId: "sup-002",
    invoiceDate: "2026-03-20",
    dueDate: "2026-04-19",
    status: "PARTIALLY_PAID",
    paymentStatus: "PARTIAL",
    totalAmount: 58000,
    amountPaid: 25000,
    amountDue: 33000,
    lineCount: 1,
    hasInventory: false,
  },
  {
    id: "inv-003",
    ourReference: "PINV-2026-003",
    invoiceNumber: "INF-2026-0112",
    supplierName: "Infosys Technologies",
    supplierId: "sup-003",
    invoiceDate: "2026-03-15",
    dueDate: "2026-03-30",
    status: "PAID",
    paymentStatus: "PAID",
    totalAmount: 92750,
    amountPaid: 92750,
    amountDue: 0,
    lineCount: 5,
    hasInventory: true,
  },
  {
    id: "inv-004",
    ourReference: "PINV-2026-004",
    invoiceNumber: "WIP-B-4421",
    supplierName: "Wipro Limited",
    supplierId: "sup-004",
    invoiceDate: "2026-03-10",
    dueDate: "2026-03-25",
    status: "POSTED",
    paymentStatus: "UNPAID",
    totalAmount: 34500,
    amountPaid: 0,
    amountDue: 34500,
    lineCount: 2,
    hasInventory: false,
  },
  {
    id: "inv-005",
    ourReference: "PINV-2026-005",
    invoiceNumber: "HCL-INV-7731",
    supplierName: "HCL Technologies",
    supplierId: "sup-005",
    invoiceDate: "2026-02-28",
    dueDate: null,
    status: "DRAFT",
    paymentStatus: "UNPAID",
    totalAmount: 18200,
    amountPaid: 0,
    amountDue: 18200,
    lineCount: 1,
    hasInventory: false,
  },
  {
    id: "inv-006",
    ourReference: "PINV-2026-006",
    invoiceNumber: "RAJ-2026-055",
    supplierName: "Reliance Industries Ltd.",
    supplierId: "sup-001",
    invoiceDate: "2026-02-20",
    dueDate: "2026-03-22",
    status: "PAID",
    paymentStatus: "PAID",
    totalAmount: 67400,
    amountPaid: 67400,
    amountDue: 0,
    lineCount: 4,
    hasInventory: true,
  },
  {
    id: "inv-007",
    ourReference: "PINV-2026-007",
    invoiceNumber: "TCS-INV-8801",
    supplierName: "Tata Consultancy Services",
    supplierId: "sup-002",
    invoiceDate: "2026-02-14",
    dueDate: "2026-03-15",
    status: "CANCELLED",
    paymentStatus: "UNPAID",
    totalAmount: 12000,
    amountPaid: 0,
    amountDue: 0,
    lineCount: 1,
    hasInventory: false,
  },
];

// ── Config ────────────────────────────────────────────────────────────────────

const STATUS_CFG: Record<InvoiceStatus, { label: string; cls: string }> = {
  DRAFT: {
    label: "Draft",
    cls: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800",
  },
  POSTED: {
    label: "Posted",
    cls: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
  },
  PARTIALLY_PAID: {
    label: "Partially Paid",
    cls: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800",
  },
  PAID: {
    label: "Paid",
    cls: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
  },
  CANCELLED: {
    label: "Cancelled",
    cls: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
  },
};

const PAYMENT_STATUS_CFG: Record<
  PaymentStatus,
  { label: string; cls: string }
> = {
  UNPAID: {
    label: "Unpaid",
    cls: "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800",
  },
  PARTIAL: {
    label: "Partial",
    cls: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800",
  },
  PAID: {
    label: "Paid",
    cls: "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800",
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function isOverdue(row: PurchaseInvoiceRow) {
  if (!row.dueDate || row.paymentStatus === "PAID") return false;
  return new Date(row.dueDate) < new Date();
}

// ── Stat Card ─────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: React.ElementType;
  accent: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm flex items-start gap-3">
      <div
        className={cn(
          "h-8 w-8 rounded-lg flex items-center justify-center shrink-0",
          accent,
        )}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">
          {label}
        </p>
        <p className="text-lg font-bold text-foreground mt-0.5 tabular-nums">
          {value}
        </p>
        {sub && (
          <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>
        )}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export function PurchaseHistoryPage() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [filterPayment, setFilterPayment] = useState<string>("ALL");
  const [filterSupplier, setFilterSupplier] = useState<string>("ALL");

  // ── Filtered rows
  const rows = useMemo(() => {
    return DUMMY_INVOICES.filter((inv) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        inv.ourReference.toLowerCase().includes(q) ||
        inv.invoiceNumber.toLowerCase().includes(q) ||
        inv.supplierName.toLowerCase().includes(q);

      const matchesStatus =
        filterStatus === "ALL" || inv.status === filterStatus;
      const matchesPayment =
        filterPayment === "ALL" || inv.paymentStatus === filterPayment;
      const matchesSupplier =
        filterSupplier === "ALL" || inv.supplierId === filterSupplier;

      return (
        matchesSearch && matchesStatus && matchesPayment && matchesSupplier
      );
    });
  }, [search, filterStatus, filterPayment, filterSupplier]);

  // ── Summary stats
  const totalInvoiced = DUMMY_INVOICES.reduce((s, i) => s + i.totalAmount, 0);
  const totalOutstanding = DUMMY_INVOICES.filter(
    (i) => i.paymentStatus !== "PAID" && i.status !== "CANCELLED",
  ).reduce((s, i) => s + i.amountDue, 0);
  const totalOverdue = DUMMY_INVOICES.filter(isOverdue).reduce(
    (s, i) => s + i.amountDue,
    0,
  );
  const overdueCount = DUMMY_INVOICES.filter(isOverdue).length;

  const uniqueSuppliers = Array.from(
    new Map(
      DUMMY_INVOICES.map((i) => [i.supplierId, i.supplierName]),
    ).entries(),
  );

  return (
    <div className="p-6 space-y-6">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            Purchase Invoices
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {DUMMY_INVOICES.length} invoices ·{" "}
            {DUMMY_INVOICES.filter((i) => i.status !== "CANCELLED").length}{" "}
            active
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="h-3.5 w-3.5" /> Export
          </Button>
          <Button
            size="sm"
            className="gap-1.5 bg-slate-900 hover:bg-slate-800 text-white"
            onClick={() => router.history.push("/accounting/purchases/new")}
          >
            <Plus className="h-3.5 w-3.5" /> New Invoice
          </Button>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          label="Total Invoiced"
          value={fmt(totalInvoiced)}
          sub={`${DUMMY_INVOICES.length} invoices`}
          icon={FileText}
          accent="bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
        />
        <StatCard
          label="Outstanding"
          value={fmt(totalOutstanding)}
          sub="across all suppliers"
          icon={TrendingUp}
          accent="bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
        />
        <StatCard
          label="Overdue"
          value={fmt(totalOverdue)}
          sub={`${overdueCount} invoice${overdueCount !== 1 ? "s" : ""} past due`}
          icon={AlertCircle}
          accent="bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400"
        />
        <StatCard
          label="Paid This Month"
          value={fmt(
            DUMMY_INVOICES.filter((i) => i.paymentStatus === "PAID").reduce(
              (s, i) => s + i.totalAmount,
              0,
            ),
          )}
          sub={`${DUMMY_INVOICES.filter((i) => i.paymentStatus === "PAID").length} invoices cleared`}
          icon={CheckCircle2}
          accent="bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400"
        />
      </div>

      {/* ── Filters ── */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              className="pl-8 h-8 text-sm"
              placeholder="Search by reference, invoice no., or supplier…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {/* Status */}
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="h-8 text-xs w-32.5">
                <SlidersHorizontal className="h-3 w-3 mr-1.5 text-muted-foreground" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL" className="text-xs">
                  All Statuses
                </SelectItem>
                {Object.entries(STATUS_CFG).map(([k, v]) => (
                  <SelectItem key={k} value={k} className="text-xs">
                    {v.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Payment Status */}
            <Select value={filterPayment} onValueChange={setFilterPayment}>
              <SelectTrigger className="h-8 text-xs w-30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL" className="text-xs">
                  All Payments
                </SelectItem>
                {Object.entries(PAYMENT_STATUS_CFG).map(([k, v]) => (
                  <SelectItem key={k} value={k} className="text-xs">
                    {v.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Supplier */}
            <Select value={filterSupplier} onValueChange={setFilterSupplier}>
              <SelectTrigger className="h-8 text-xs w-42.5">
                <SelectValue placeholder="All Suppliers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL" className="text-xs">
                  All Suppliers
                </SelectItem>
                {uniqueSuppliers.map(([id, name]) => (
                  <SelectItem key={id} value={id} className="text-xs">
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active filter chips */}
        {(filterStatus !== "ALL" ||
          filterPayment !== "ALL" ||
          filterSupplier !== "ALL" ||
          search) && (
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className="text-[11px] text-muted-foreground">Filters:</span>
            {filterStatus !== "ALL" && (
              <button
                onClick={() => setFilterStatus("ALL")}
                className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-muted border border-border hover:bg-muted/70"
              >
                {STATUS_CFG[filterStatus as InvoiceStatus]?.label} ×
              </button>
            )}
            {filterPayment !== "ALL" && (
              <button
                onClick={() => setFilterPayment("ALL")}
                className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-muted border border-border hover:bg-muted/70"
              >
                {PAYMENT_STATUS_CFG[filterPayment as PaymentStatus]?.label} ×
              </button>
            )}
            {filterSupplier !== "ALL" && (
              <button
                onClick={() => setFilterSupplier("ALL")}
                className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-muted border border-border hover:bg-muted/70"
              >
                {uniqueSuppliers.find(([id]) => id === filterSupplier)?.[1]} ×
              </button>
            )}
            {search && (
              <button
                onClick={() => setSearch("")}
                className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-muted border border-border hover:bg-muted/70"
              >
                "{search}" ×
              </button>
            )}
            <button
              onClick={() => {
                setFilterStatus("ALL");
                setFilterPayment("ALL");
                setFilterSupplier("ALL");
                setSearch("");
              }}
              className="text-[11px] text-muted-foreground underline underline-offset-2 hover:text-foreground"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* ── Table ── */}
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        {/* Result count */}
        <div className="px-5 py-3 border-b border-border flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">{rows.length}</span>{" "}
            of {DUMMY_INVOICES.length} invoices
          </span>
          {rows.some(isOverdue) && (
            <span className="flex items-center gap-1 text-[11px] text-red-600 font-medium">
              <AlertCircle className="h-3 w-3" />
              {rows.filter(isOverdue).length} overdue
            </span>
          )}
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="text-[10px] font-bold uppercase tracking-wider w-35">
                  Our Ref.
                </TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-wider w-35">
                  Supplier Bill No.
                </TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-wider">
                  Supplier
                </TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-wider w-25">
                  Invoice Date
                </TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-wider w-25">
                  Due Date
                </TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-wider w-27.5">
                  Status
                </TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-wider w-22.5">
                  Payment
                </TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-wider w-27.5 text-right">
                  Total
                </TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-wider w-27.5 text-right">
                  Due
                </TableHead>
                <TableHead className="w-9" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="h-32 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <FileText className="h-8 w-8 text-muted-foreground/40" />
                      <p className="text-sm text-muted-foreground">
                        No invoices found
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Try adjusting your filters
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row) => {
                  const overdue = isOverdue(row);
                  return (
                    <TableRow
                      key={row.id}
                      className={cn(
                        "cursor-pointer transition-colors",
                        overdue &&
                          "bg-red-50/40 dark:bg-red-950/10 hover:bg-red-50/60 dark:hover:bg-red-950/20",
                      )}
                      onClick={() =>
                        router.history.push(`/accounting/purchases/${row.id}`)
                      }
                    >
                      {/* Our Reference */}
                      <TableCell className="py-3">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs font-medium">
                            {row.ourReference}
                          </span>
                          {row.hasInventory && (
                            <span
                              className="inline-block w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0"
                              title="Has inventory linkage"
                            />
                          )}
                        </div>
                      </TableCell>

                      {/* Supplier Bill No. */}
                      <TableCell className="py-3">
                        <span className="font-mono text-xs text-muted-foreground">
                          {row.invoiceNumber}
                        </span>
                      </TableCell>

                      {/* Supplier */}
                      <TableCell className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 text-[10px] font-bold shrink-0 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400">
                            {row.supplierName
                              .split(" ")
                              .slice(0, 2)
                              .map((w) => w[0])
                              .join("")}
                          </div>
                          <span className="text-sm">{row.supplierName}</span>
                        </div>
                      </TableCell>

                      {/* Invoice Date */}
                      <TableCell className="py-3 text-xs text-muted-foreground">
                        {fmtDate(row.invoiceDate)}
                      </TableCell>

                      {/* Due Date */}
                      <TableCell className="py-3">
                        {row.dueDate ? (
                          <span
                            className={cn(
                              "text-xs",
                              overdue
                                ? "text-red-600 font-medium"
                                : "text-muted-foreground",
                            )}
                          >
                            {overdue && (
                              <AlertCircle className="inline h-3 w-3 mr-0.5 mb-0.5" />
                            )}
                            {fmtDate(row.dueDate)}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground/40">
                            —
                          </span>
                        )}
                      </TableCell>

                      {/* Status */}
                      <TableCell className="py-3">
                        <span
                          className={cn(
                            "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border",
                            STATUS_CFG[row.status].cls,
                          )}
                        >
                          {STATUS_CFG[row.status].label}
                        </span>
                      </TableCell>

                      {/* Payment Status */}
                      <TableCell className="py-3">
                        <span
                          className={cn(
                            "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border",
                            PAYMENT_STATUS_CFG[row.paymentStatus].cls,
                          )}
                        >
                          {PAYMENT_STATUS_CFG[row.paymentStatus].label}
                        </span>
                      </TableCell>

                      {/* Total */}
                      <TableCell className="py-3 text-right text-sm font-medium tabular-nums">
                        {fmt(row.totalAmount)}
                        <div className="text-[10px] text-muted-foreground font-normal">
                          {row.lineCount} line{row.lineCount !== 1 ? "s" : ""}
                        </div>
                      </TableCell>

                      {/* Amount Due */}
                      <TableCell className="py-3 text-right tabular-nums">
                        {row.amountDue > 0 ? (
                          <span
                            className={cn(
                              "text-sm font-semibold",
                              overdue ? "text-red-600" : "text-foreground",
                            )}
                          >
                            {fmt(row.amountDue)}
                          </span>
                        ) : (
                          <span className="text-sm text-green-600 font-medium">
                            Cleared
                          </span>
                        )}
                        {row.amountPaid > 0 && row.amountDue > 0 && (
                          <div className="text-[10px] text-muted-foreground">
                            {fmt(row.amountPaid)} paid
                          </div>
                        )}
                      </TableCell>

                      {/* Arrow */}
                      <TableCell className="py-3">
                        <ChevronRight className="h-4 w-4 text-muted-foreground/40" />
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* ── Table footer ── */}
        {rows.length > 0 && (
          <div className="px-5 py-3 border-t border-border bg-muted/20 flex items-center justify-between flex-wrap gap-2">
            <span className="text-[11px] text-muted-foreground">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-500 mr-1 mb-0.5" />
              Teal dot = has inventory linkage
            </span>
            <div className="flex gap-4 text-[11px]">
              <span className="text-muted-foreground">
                Filtered total:{" "}
                <span className="font-semibold text-foreground tabular-nums">
                  {fmt(rows.reduce((s, r) => s + r.totalAmount, 0))}
                </span>
              </span>
              <span className="text-muted-foreground">
                Filtered due:{" "}
                <span className="font-semibold text-red-600 tabular-nums">
                  {fmt(rows.reduce((s, r) => s + r.amountDue, 0))}
                </span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
