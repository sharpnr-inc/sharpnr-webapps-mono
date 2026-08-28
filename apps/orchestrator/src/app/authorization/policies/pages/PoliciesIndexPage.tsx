import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowUpDown,
  Building2,
  ChevronRight,
  Globe2,
  Plus,
  ScrollText,
  Search,
  ShieldCheck,
  ShieldUser,
  ShieldX,
  User,
  UsersRound,
  X,
} from "lucide-react";
import {
  Badge,
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsList,
  TabsTrigger,
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
import type { PolicyView } from "../api/types";
import { PoliciesOverview } from "../components/PoliciesOverview";
import { PolicyStats } from "../components/PolicyStats";
import { cn } from "@sharpnr/utils";
import { useAllResourcesOfOrg } from "../../cedarPolicybuilder/api/query";
import { useAllOrgPolicies } from "../api/queries";
import { policyEffect, policyPrincipal } from "../utils/policyStatement";

/** Icon shown next to a policy's principal scope. */
const PRINCIPAL_ICON = {
  everyone: Globe2,
  role: ShieldUser,
  group: UsersRound,
  user: User,
  other: ScrollText,
} as const;

type StatusFilter = "all" | "active" | "paused";
type EffectFilter = "all" | "permit" | "forbid";

const PoliciesIndexPage = () => {
  // Warms the org resources cache for the policy builder opened from this page.
  useAllResourcesOfOrg();

  const { data: allPolices, isLoading, isError } = useAllOrgPolicies();

  const nav = useNavigate();

  const [globalFilter, setGlobalFilter] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [effect, setEffect] = useState<EffectFilter>("all");
  const [sorting, setSorting] = useState<SortingState>([
    { id: "name", desc: false },
  ]);

  const data = useMemo<PolicyView[]>(
    () => allPolices?.data ?? [],
    [allPolices],
  );
  const activeCount = data.filter((p) => p.enabled).length;

  // Status and effect narrow the row set before the table's own search runs.
  const visible = useMemo(
    () =>
      data.filter((policy) => {
        if (status === "active" && !policy.enabled) return false;
        if (status === "paused" && policy.enabled) return false;
        if (effect !== "all" && policyEffect(policy.policy) !== effect)
          return false;
        return true;
      }),
    [data, status, effect],
  );

  const columns = useMemo<ColumnDef<PolicyView>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <button
            type="button"
            className="inline-flex items-center gap-1 hover:text-foreground"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Policy
            <ArrowUpDown className="h-3 w-3" />
          </button>
        ),
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
        accessorFn: (row) => policyEffect(row.policy),
        cell: ({ getValue }) => {
          const value = getValue<"permit" | "forbid">();
          return value === "permit" ? (
            <Badge className="gap-1 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10 dark:text-emerald-400">
              <ShieldCheck className="h-3 w-3" /> Allow
            </Badge>
          ) : (
            <Badge className="gap-1 bg-red-500/10 text-red-600 hover:bg-red-500/10 dark:text-red-400">
              <ShieldX className="h-3 w-3" /> Deny
            </Badge>
          );
        },
      },
      {
        id: "appliesTo",
        header: "Applies to",
        accessorFn: (row) => policyPrincipal(row.policy).label,
        cell: ({ row }) => {
          const principal = policyPrincipal(row.original.policy);
          const Icon = PRINCIPAL_ICON[principal.kind];
          return (
            <span
              className={cn(
                "inline-flex max-w-[12rem] items-center gap-1.5 rounded-md border px-2 py-1 text-xs",
                principal.kind === "everyone"
                  ? "border-primary/20 bg-primary/5 text-primary"
                  : "bg-muted/40 text-muted-foreground",
              )}
            >
              <Icon className="h-3 w-3 shrink-0" />
              <span className="truncate">{principal.label}</span>
            </span>
          );
        },
      },
      {
        accessorKey: "enabled",
        header: "Status",
        cell: ({ row }) =>
          row.original.enabled ? (
            <Badge className="gap-1 bg-sky-500/10 text-sky-600 hover:bg-sky-500/10 dark:text-sky-400">
              Active
            </Badge>
          ) : (
            <Badge variant="secondary" className="gap-1">
              Paused
            </Badge>
          ),
      },
      {
        id: "open",
        header: () => <span className="sr-only">Open</span>,
        cell: () => (
          <ChevronRight className="h-4 w-4 text-muted-foreground/50 transition-colors group-hover/row:text-foreground" />
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: visible,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const rows = table.getRowModel().rows;
  const isFiltered =
    status !== "all" || effect !== "all" || globalFilter !== "";

  const clearFilters = () => {
    setStatus("all");
    setEffect("all");
    setGlobalFilter("");
  };

  const header = (
    <header className="flex flex-wrap items-start justify-between gap-4">
      <div className="flex min-w-0 gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
          <ScrollText className="h-5 w-5" />
        </span>
        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-semibold text-foreground">
              Organization Policies
            </h1>
            <Badge
              variant="outline"
              className="gap-1 border-primary/20 bg-primary/5 text-primary"
            >
              <Building2 className="h-3 w-3" /> Org-wide
            </Badge>
            <span className="text-sm text-muted-foreground">
              {data.length} total
            </span>
          </div>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Rules that decide who is allowed to do what — applied across every
            user, role and group in your organization.
          </p>
        </div>
      </div>

      <Button
        className="gap-1"
        onClick={() => nav({ to: "/authorization/policies/create" })}
      >
        <Plus className="h-4 w-4" /> New Policy
      </Button>
    </header>
  );

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-6xl space-y-6 p-6">
        {header}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto w-full max-w-6xl space-y-6 p-6">
        {header}
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed py-16 text-center">
          <AlertTriangle className="h-6 w-6 text-destructive" />
          <p className="text-sm text-muted-foreground">
            Couldn't load policies. Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-6">
      {header}

      {/* At-a-glance counts */}
      <PolicyStats policies={data} />

      {/* What org-wide policies are, and who they reach */}
      <PoliciesOverview />

      {/* Filters */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <Tabs
          value={status}
          onValueChange={(value) => setStatus(value as StatusFilter)}
        >
          <TabsList>
            <TabsTrigger value="all">All ({data.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({activeCount})</TabsTrigger>
            <TabsTrigger value="paused">
              Paused ({data.length - activeCount})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={effect}
            onValueChange={(value) => setEffect(value as EffectFilter)}
          >
            <SelectTrigger className="w-[9.5rem]">
              <SelectValue placeholder="Effect" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All effects</SelectItem>
              <SelectItem value="permit">Allow only</SelectItem>
              <SelectItem value="forbid">Deny only</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search policies..."
              className="pl-9"
            />
          </div>

          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-muted-foreground"
              onClick={clearFilters}
            >
              <X className="h-3.5 w-3.5" /> Clear
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border bg-card">
        <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-2.5">
          <p className="text-xs text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">{rows.length}</span>{" "}
            of {data.length} policies
          </p>
          <p className="hidden text-xs text-muted-foreground sm:block">
            Evaluated together on every request
          </p>
        </div>

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
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
            {rows.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={columns.length} className="h-40">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <ScrollText className="h-5 w-5" />
                    </span>
                    <p className="text-sm font-medium text-foreground">
                      No policies to show
                    </p>
                    <p className="max-w-xs text-xs text-muted-foreground">
                      {isFiltered
                        ? "Nothing matches these filters. Try widening your search."
                        : "Create your first org-wide policy to start controlling access."}
                    </p>
                    {isFiltered ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-1"
                        onClick={clearFilters}
                      >
                        Clear filters
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="mt-1 gap-1"
                        onClick={() =>
                          nav({ to: "/authorization/policies/create" })
                        }
                      >
                        <Plus className="h-4 w-4" /> New Policy
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() =>
                    nav({
                      to: "/authorization/policies/$policyID",
                      params: { policyID: row.original.id },
                    })
                  }
                  className={cn(
                    "group/row cursor-pointer transition-colors hover:bg-muted/40",
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
