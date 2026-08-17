import { useMemo, useState } from "react";
import {
  ScrollText,
  Plus,
  Search,
  ShieldCheck,
  ShieldX,
  ArrowUpDown,
  Info,
} from "lucide-react";
import {
  Button,
  Input,
  Badge,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@sharpnr/ui";
import { useNavigate } from "@tanstack/react-router";
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { SentinelPolicy } from "../api/types";
import { MOCK_POLICIES, policyEffect } from "../data/policies.mock";
import { cn } from "@sharpnr/utils";
import { useAllResourcesOfOrg } from "../../cedarPolicybuilder/api/query";

/** Relative-ish friendly date, e.g. "18 Jun 2026". */
const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const PoliciesIndexPage = () => {
  // Warms the org resources cache for the policy builder opened from this page.
  useAllResourcesOfOrg();

  const nav = useNavigate();
  const [data, setData] = useState<SentinelPolicy[]>(MOCK_POLICIES);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const toggleEnabled = (id: string) =>
    setData((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)),
    );

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
            <p className="truncate text-xs text-muted-foreground">
              {row.original.description}
            </p>
          </div>
        ),
      },
      {
        id: "effect",
        header: "Effect",
        accessorFn: (row) => policyEffect(row.statement),
        cell: ({ getValue }) => {
          const effect = getValue<"permit" | "forbid">();
          return effect === "permit" ? (
            <Badge className="gap-1 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10">
              <ShieldCheck className="h-3 w-3" /> Allow
            </Badge>
          ) : (
            <Badge className="gap-1 bg-red-500/10 text-red-600 hover:bg-red-500/10">
              <ShieldX className="h-3 w-3" /> Deny
            </Badge>
          );
        },
      },
      {
        accessorKey: "updatedAt",
        header: ({ column }) => (
          <button
            type="button"
            className="inline-flex items-center gap-1 hover:text-foreground"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Last updated
            <ArrowUpDown className="h-3 w-3" />
          </button>
        ),
        cell: ({ getValue }) => (
          <span className="text-sm text-muted-foreground">
            {fmtDate(getValue<string>())}
          </span>
        ),
      },
      {
        accessorKey: "enabled",
        header: "Status",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Switch
              checked={row.original.enabled}
              onCheckedChange={() => toggleEnabled(row.original.id)}
              onClick={(e) => e.stopPropagation()}
              aria-label="Toggle policy"
            />
            <span className="text-xs text-muted-foreground">
              {row.original.enabled ? "On" : "Off"}
            </span>
          </div>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-6">
      {/* Header */}
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ScrollText className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold text-foreground">Policies</h1>
            <span className="text-sm text-muted-foreground">
              ({data.length})
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Rules that decide who is allowed to do what across your
            organization.
          </p>
        </div>

        <Button
          className="gap-1"
          onClick={() => nav({ to: "/authorization/policies/create" })}
        >
          <Plus className="h-4 w-4" /> New Policy
        </Button>
      </header>

      {/* What are policies? — compact explainer */}
      <div className="flex items-start gap-3 rounded-xl border bg-muted/30 p-4">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p className="text-sm text-muted-foreground">
          A <span className="font-medium text-foreground">policy</span> is a
          single rule, like <em>"managers can edit the menu"</em>. Each one
          either <span className="font-medium text-emerald-600">allows</span> or{" "}
          <span className="font-medium text-red-600">denies</span> an action on
          a resource. Turn a policy off to pause it without deleting it.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search policies..."
          className="pl-9"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-muted/40">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-sm text-muted-foreground"
                >
                  No policies match your search.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() =>
                    nav({
                      to: "/authorization/policies/$policyID",
                      params: { policyID: row.original.id },
                    })
                  }
                  className={cn(
                    "cursor-pointer transition-colors hover:bg-muted/40",
                    !row.original.enabled && "opacity-60",
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PoliciesIndexPage;
