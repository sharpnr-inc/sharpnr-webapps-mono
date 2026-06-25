import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Badge,
} from "@sharpnr/ui";
import {
  ShieldCheck,
  ShieldX,
  ShieldOff,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/formatDatePretty";
import { parsePolicy } from "../../cederbuilder/service";
import { PolicyDetailsDialog } from "./PolicyDetailsDialog";
import type { SentinelPolicy } from "../api/types";

type Effect = "permit" | "forbid" | "invalid";

interface PoliciesTableProps {
  policies: SentinelPolicy[];
}

function effectTone(effect: Effect) {
  switch (effect) {
    case "forbid":
      return {
        label: "forbid",
        Icon: ShieldX,
        badge: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
      };
    case "invalid":
      return {
        label: "invalid",
        Icon: ShieldX,
        badge:
          "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
      };
    default:
      return {
        label: "permit",
        Icon: ShieldCheck,
        badge:
          "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
      };
  }
}

export function PoliciesTable({ policies }: PoliciesTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selected, setSelected] = useState<SentinelPolicy | null>(null);
  const [open, setOpen] = useState(false);

  // Parse each policy once to know its effect.
  const effectById = useMemo(() => {
    const map: Record<string, Effect> = {};
    for (const p of policies) {
      const parsed = parsePolicy(p.statement);
      map[p.id] = parsed === null ? "invalid" : parsed.effect;
    }
    return map;
  }, [policies]);

  const columns = useMemo<ColumnDef<SentinelPolicy>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Policy",
        cell: ({ row }) => (
          <div className="min-w-0">
            <p className="truncate font-medium text-foreground">
              {row.original.name}
            </p>
            {row.original.description && (
              <p className="truncate text-xs text-muted-foreground">
                {row.original.description}
              </p>
            )}
          </div>
        ),
      },
      {
        id: "effect",
        accessorFn: (row) => effectById[row.id],
        header: "Effect",
        cell: ({ getValue }) => {
          const tone = effectTone(getValue<Effect>());
          const ToneIcon = tone.Icon;
          return (
            <Badge
              variant="secondary"
              className={cn("gap-1 capitalize", tone.badge)}
            >
              <ToneIcon className="h-3.5 w-3.5" />
              {tone.label}
            </Badge>
          );
        },
      },
      {
        accessorKey: "enabled",
        header: "Status",
        cell: ({ getValue }) =>
          getValue<boolean>() ? (
            <span className="inline-flex items-center gap-1.5 text-sm text-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Enabled
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50" />
              Disabled
            </span>
          ),
      },
      {
        accessorKey: "updatedAt",
        header: "Updated",
        cell: ({ getValue }) => (
          <span className="whitespace-nowrap text-sm text-muted-foreground">
            {formatDate(getValue<string>())}
          </span>
        ),
      },
      {
        id: "chevron",
        header: "",
        enableSorting: false,
        cell: () => (
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        ),
      },
    ],
    [effectById],
  );

  const table = useReactTable({
    data: policies,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (policies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-16 text-center">
        <ShieldOff className="h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">No policies found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-muted/40">
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sorted = header.column.getIsSorted();
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : canSort ? (
                        <button
                          type="button"
                          onClick={header.column.getToggleSortingHandler()}
                          className="inline-flex items-center gap-1 font-medium hover:text-foreground"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {sorted === "asc" ? (
                            <ArrowUp className="h-3.5 w-3.5" />
                          ) : sorted === "desc" ? (
                            <ArrowDown className="h-3.5 w-3.5" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />
                          )}
                        </button>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => {
                  setSelected(row.original);
                  setOpen(true);
                }}
                className={cn(
                  "cursor-pointer",
                  !row.original.enabled && "opacity-60",
                )}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <PolicyDetailsDialog
        policy={selected}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
