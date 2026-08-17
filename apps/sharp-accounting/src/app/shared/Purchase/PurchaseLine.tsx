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
import { Plus, Trash2, Package, Boxes } from "lucide-react";
import {
  useAddLine,
  useLines,
  useRemoveLine,
  useSetLineField,
} from "./store/PurchaseForm.selectors";
import { usePurchaseContext } from "./PurchaseContext";

export function PurchaseLine() {
  const { accountingBooks, inventories } = usePurchaseContext();

  const lines = useLines();
  // const errors = useFormErrors();
  const setLineField = useSetLineField();
  const addLine = useAddLine();
  const removeLine = useRemoveLine();

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
            {lines.map((line, i) => (
              <Fragment>
                {/* ── Main row ── */}
                <TableRow className="group align-top border-b-0">
                  <TableCell className="py-2 pr-2">
                    <Input
                      className="h-8 text-xs"
                      placeholder="What was purchased…"
                      value={line.description}
                      onChange={(e) =>
                        setLineField(i, "description", e.target.value)
                      }
                    />
                  </TableCell>

                  <TableCell className="py-2 pr-2">
                    <Select>
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Account…" />
                      </SelectTrigger>

                      <SelectContent>
                        {accountingBooks?.groups?.map((group: any) => (
                          <div key={group.id}>
                            {/* Group label */}
                            <div className="px-2 py-1 text-[10px] font-semibold text-muted-foreground uppercase">
                              {group.type}
                            </div>

                            {/* Accounts */}
                            {group.accounts.map((account: any) => (
                              <SelectItem
                                key={account.id}
                                value={account.id}
                                className="text-xs"
                              >
                                <span className="font-mono text-[10px] text-muted-foreground mr-1">
                                  {account.code}
                                </span>
                                {account.account_name}
                              </SelectItem>
                            ))}
                          </div>
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
                      value={line.qty}
                      onChange={(e) =>
                        setLineField(i, "qty", parseFloat(e.target.value) || 0)
                      }
                    />
                  </TableCell>

                  <TableCell className="py-2 pr-2">
                    <Input
                      type="number"
                      min={0}
                      step={0.01}
                      className="h-8 text-xs text-right"
                      value={line.unit_price}
                      onChange={(e) =>
                        setLineField(
                          i,
                          "unit_price",
                          parseFloat(e.target.value) || 0,
                        )
                      }
                    />
                  </TableCell>

                  <TableCell className="py-2 pr-2">
                    <Select
                      value={line.tax_category_id}
                      onValueChange={(v) =>
                        setLineField(i, "tax_category_id", v)
                      }
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent></SelectContent>
                    </Select>
                  </TableCell>

                  <TableCell className="py-2 text-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex justify-center">
                          <Switch className="scale-75" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="text-xs"></TooltipContent>
                    </Tooltip>
                  </TableCell>

                  <TableCell className="py-2 text-right text-sm font-medium tabular-nums"></TableCell>

                  <TableCell className="py-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                      disabled={lines.length === 1}
                      onClick={() => removeLine(i)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>

                {/* ── Inventory sub-row ── */}

                <TableRow className="bg-teal-50/60 dark:bg-teal-950/20 border-b border-teal-100 dark:border-teal-900">
                  <TableCell colSpan={8} className="py-2 px-4">
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="flex items-center gap-1.5 text-[11px] font-medium text-teal-700 dark:text-teal-400 shrink-0">
                        <Boxes className="h-3.5 w-3.5" />
                        Inventory linkage
                      </div>

                      {/* SKU */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                          Inventory
                        </span>
                        <Select>
                          <SelectTrigger className="h-7 text-xs w-[200px] border-teal-200 bg-white dark:bg-background">
                            <SelectValue placeholder="Select item…" />
                          </SelectTrigger>

                          <SelectContent>
                            {inventories?.map((inv: any) => (
                              <SelectItem
                                key={inv.ID}
                                value={inv.ID}
                                className="text-xs"
                              >
                                <div className="flex flex-col">
                                  <span>{inv.Name}</span>
                                  <span className="text-[10px] text-muted-foreground">
                                    {inv.Location}
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
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
