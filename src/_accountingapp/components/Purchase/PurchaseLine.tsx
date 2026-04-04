import { Fragment } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus, Trash2, Package, Boxes, Info } from "lucide-react";

import {
  usePurchaseInvoiceStore,
  TAX_CATEGORIES,
  INVENTORIES,
  INVENTORY_ITEMS,
} from "./store/purchase.store";
import { useAddLine, useRemoveLine, useUpdateLine } from "./store/actions";
import { selectDebitAccounts, selectInventoryItem } from "./store/selectors";

function fmt(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(n);
}

const DEBIT_ACCOUNTS = selectDebitAccounts();

export function PurchaseLine() {
  const lines = usePurchaseInvoiceStore((s) => s.lines);
  const addLine = useAddLine();
  const removeLine = useRemoveLine();
  const updateLine = useUpdateLine();

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            Line Items
          </span>
          <Badge variant="secondary" className="text-[11px] h-4 px-1.5">
            {lines.length}
          </Badge>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="gap-1.5 h-8 text-xs"
          onClick={addLine}
        >
          <Plus className="h-3.5 w-3.5" /> Add Line
        </Button>
      </div>

      {/* ── Table ── */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="text-[10px] font-bold uppercase tracking-wider min-w-[180px]">
                Description
              </TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-wider w-[150px]">
                Debit Account
              </TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-wider w-[70px] text-right">
                Qty
              </TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-wider w-[110px] text-right">
                Unit Price
              </TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-wider w-[100px]">
                Tax
              </TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-wider w-[50px] text-center">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-center cursor-help">
                      <Boxes className="h-3 w-3" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="text-xs">
                    Add to Inventory on Post
                  </TooltipContent>
                </Tooltip>
              </TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-wider w-[120px] text-right">
                Amount
              </TableHead>
              <TableHead className="w-[36px]" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {lines.map((line) => (
              <Fragment key={line.id}>
                {/* ── Main row ── */}
                <TableRow className="group align-top border-b-0">
                  <TableCell className="py-2 pr-2">
                    <Input
                      className="h-8 text-xs"
                      placeholder="What was purchased…"
                      value={line.description}
                      onChange={(e) =>
                        updateLine(line.id, "description", e.target.value)
                      }
                    />
                  </TableCell>

                  <TableCell className="py-2 pr-2">
                    <Select
                      value={line.debitAccountId}
                      onValueChange={(v) =>
                        updateLine(line.id, "debitAccountId", v)
                      }
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Account…" />
                      </SelectTrigger>
                      <SelectContent>
                        {DEBIT_ACCOUNTS.map((a) => (
                          <SelectItem
                            key={a.id}
                            value={a.id}
                            className="text-xs"
                          >
                            <span className="font-mono text-[10px] text-muted-foreground mr-1">
                              {a.code}
                            </span>
                            {a.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>

                  <TableCell className="py-2 pr-2">
                    <Input
                      type="number"
                      min={0.01}
                      step={0.01}
                      className="h-8 text-xs text-right"
                      value={line.quantity}
                      onChange={(e) =>
                        updateLine(
                          line.id,
                          "quantity",
                          parseFloat(e.target.value) || 0,
                        )
                      }
                    />
                  </TableCell>

                  <TableCell className="py-2 pr-2">
                    <Input
                      type="number"
                      min={0}
                      step={0.01}
                      className="h-8 text-xs text-right"
                      value={line.unitPrice}
                      onChange={(e) =>
                        updateLine(
                          line.id,
                          "unitPrice",
                          parseFloat(e.target.value) || 0,
                        )
                      }
                    />
                  </TableCell>

                  <TableCell className="py-2 pr-2">
                    <Select
                      value={line.taxCategoryId}
                      onValueChange={(v) =>
                        updateLine(line.id, "taxCategoryId", v)
                      }
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {TAX_CATEGORIES.map((t) => (
                          <SelectItem
                            key={t.id}
                            value={t.id}
                            className="text-xs"
                          >
                            {t.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>

                  <TableCell className="py-2 text-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex justify-center">
                          <Switch
                            checked={line.addToInventory}
                            onCheckedChange={(v) =>
                              updateLine(line.id, "addToInventory", v)
                            }
                            className="scale-75"
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="text-xs">
                        {line.addToInventory
                          ? "Will update inventory on Post"
                          : "Enable to link inventory item"}
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>

                  <TableCell className="py-2 text-right text-sm font-medium tabular-nums">
                    <div className="pt-1">{fmt(line.totalAmount)}</div>
                    {line.taxAmount > 0 && (
                      <div className="text-[10px] text-muted-foreground">
                        +{fmt(line.taxAmount)} tax
                      </div>
                    )}
                  </TableCell>

                  <TableCell className="py-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeLine(line.id)}
                      disabled={lines.length === 1}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>

                {/* ── Inventory sub-row ── */}
                {line.addToInventory && (
                  <TableRow className="bg-teal-50/60 dark:bg-teal-950/20 border-b border-teal-100 dark:border-teal-900">
                    <TableCell colSpan={8} className="py-2 px-4">
                      <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-teal-700 dark:text-teal-400 shrink-0">
                          <Boxes className="h-3.5 w-3.5" />
                          Inventory linkage
                        </div>

                        {/* Warehouse */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                            Warehouse
                          </span>
                          <Select
                            value={line.inventoryId}
                            onValueChange={(v) =>
                              updateLine(line.id, "inventoryId", v)
                            }
                          >
                            <SelectTrigger className="h-7 text-xs w-[160px] border-teal-200 bg-white dark:bg-background">
                              <SelectValue placeholder="Select warehouse…" />
                            </SelectTrigger>
                            <SelectContent>
                              {INVENTORIES.map((inv) => (
                                <SelectItem
                                  key={inv.id}
                                  value={inv.id}
                                  className="text-xs"
                                >
                                  {inv.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* SKU */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                            Item / SKU
                          </span>
                          <Select
                            value={line.inventoryItemId}
                            onValueChange={(v) =>
                              updateLine(line.id, "inventoryItemId", v)
                            }
                          >
                            <SelectTrigger className="h-7 text-xs w-[200px] border-teal-200 bg-white dark:bg-background">
                              <SelectValue placeholder="Select item…" />
                            </SelectTrigger>
                            <SelectContent>
                              {INVENTORY_ITEMS.map((item) => (
                                <SelectItem
                                  key={item.id}
                                  value={item.id}
                                  className="text-xs"
                                >
                                  <span className="font-mono text-[10px] text-muted-foreground mr-1">
                                    {item.code}
                                  </span>
                                  {item.name}
                                  <span className="text-muted-foreground ml-1">
                                    · {item.unit}
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Selling price hint */}
                        {line.inventoryItemId &&
                          (() => {
                            const item = selectInventoryItem(
                              line.inventoryItemId,
                            );
                            if (!item) return null;
                            return item.sellingPrice ? (
                              <span className="text-[11px] text-teal-600 dark:text-teal-400 bg-teal-100 dark:bg-teal-900/40 px-2 py-0.5 rounded-full">
                                Selling price on record:{" "}
                                {fmt(item.sellingPrice)}
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-[11px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                                <Info className="h-2.5 w-2.5" />
                                No selling price set — set after posting
                              </span>
                            );
                          })()}

                        {/* Qty preview */}
                        {line.inventoryItemId && line.inventoryId && (
                          <span className="text-[11px] text-teal-600 dark:text-teal-400 bg-teal-100 dark:bg-teal-900/40 px-2 py-0.5 rounded-full ml-auto">
                            +{line.quantity}{" "}
                            {selectInventoryItem(line.inventoryItemId)?.unit ??
                              ""}{" "}
                            on Post
                          </span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ── Footer ── */}
      <div className="px-4 py-2.5 border-t border-border bg-muted/20">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 h-8 text-xs text-muted-foreground hover:text-foreground"
          onClick={addLine}
        >
          <Plus className="h-3.5 w-3.5" /> Add another line
        </Button>
      </div>
    </div>
  );
}
