import { useMemo, useState } from "react";
import {
  useLocation,
  useNavigate,
  type HistoryState,
} from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";

// typed cubic-bezier so TS is happy with the Easing type
const CUBIC: [number, number, number, number] = [0.16, 1, 0.3, 1];
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import RoleBadge from "../ui/RoleBadge";

import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import type { OrgEmployeeList } from "@/api/types";

// ─── Types ───────────────────────────────────────────────────────────────────
interface EmployeeTableProps {
  employeeList: OrgEmployeeList[] | undefined;
}

// ─── Sort Icon helper ─────────────────────────────────────────────────────────
function SortIcon({ direction }: { direction: "asc" | "desc" | false }) {
  if (direction === "asc")
    return <ArrowUp className="ml-1.5 h-3.5 w-3.5 text-primary" />;
  if (direction === "desc")
    return <ArrowDown className="ml-1.5 h-3.5 w-3.5 text-primary" />;
  return (
    <ArrowUpDown className="ml-1.5 h-3.5 w-3.5 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
  );
}

// ─── Sortable Header ──────────────────────────────────────────────────────────
function SortableHeader({
  label,
  isSorted,
  onSort,
}: {
  label: string;
  isSorted: "asc" | "desc" | false;
  onSort: () => void;
}) {
  return (
    <button
      onClick={onSort}
      className="group flex items-center text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors select-none"
    >
      {label}
      <SortIcon direction={isSorted} />
    </button>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const isActive = status === "ACTIVE";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset transition-colors ${
        isActive
          ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-500/30"
          : "bg-muted text-muted-foreground ring-border"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isActive ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground/50"
        }`}
      />
      {status}
    </span>
  );
}

// ─── Main Table ───────────────────────────────────────────────────────────────
export function EmployeesTable({ employeeList }: EmployeeTableProps) {
  const navigate = useNavigate();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const location = useLocation();

  const columns = useMemo<ColumnDef<OrgEmployeeList>[]>(
    () => [
      {
        accessorKey: "employeeID",
        header: ({ column }) => (
          <SortableHeader
            label="Employee ID"
            isSorted={column.getIsSorted()}
            onSort={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        ),
        cell: ({ getValue }) => (
          <span className="font-mono text-xs text-muted-foreground">
            {getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: "employeeName",
        header: ({ column }) => (
          <SortableHeader
            label="Name"
            isSorted={column.getIsSorted()}
            onSort={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        ),
        cell: ({ getValue }) => (
          <span className="font-medium text-sm">{getValue<string>()}</span>
        ),
      },
      {
        id: "role",
        header: () => (
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Role
          </span>
        ),
        cell: () => (
          <RoleBadge role="SUPER_ADMIN" glow={true} showDot={false} />
        ),
        enableSorting: false,
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <SortableHeader
            label="Status"
            isSorted={column.getIsSorted()}
            onSort={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        ),
        cell: ({ getValue }) => <StatusBadge status={getValue<string>()} />,
      },
      {
        id: "actions",
        header: () => (
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right block">
            Action
          </span>
        ),
        cell: ({ row }) => (
          <div className="flex justify-end">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 px-3 text-xs font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
                  onClick={() =>
                    navigate({
                      to: "/employees/$employeeId",
                      params: { employeeId: row.original.id },
                      search: {
                        emplName: row.original.employeeName,
                        emplID: row.original.employeeID,
                      },
                      hash: "overview",
                      state: {
                        openedFrom: "employee_table",
                      } as HistoryState & { openedFrom: string },
                      _fromLocation: location,
                    })
                  }
                >
                  View
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" align="end">
                View details of {row.original.employeeName}
              </TooltipContent>
            </Tooltip>
          </div>
        ),
        enableSorting: false,
      },
    ],
    [navigate, location],
  );

  // TanStack Table returns functions React Compiler can't memoize; expected.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: employeeList ?? [],
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  // ── Empty state ──
  if (!employeeList?.length) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center gap-3 py-16 text-center"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
          <Search className="h-5 w-5" />
        </div>
        <p className="text-sm font-medium">No employees found</p>
        <p className="text-xs text-muted-foreground">
          Add employees to see them listed here.
        </p>
      </motion.div>
    );
  }

  const rows = table.getRowModel().rows;

  return (
    <div className="flex flex-col">
      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-border/50">
        <div className="relative max-w-xs flex-1">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search employees…"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="h-8 pl-8 text-sm bg-muted/40 border-border/60 placeholder:text-muted-foreground/60 focus-visible:ring-1"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
          <span>
            {table.getFilteredRowModel().rows.length} employee
            {table.getFilteredRowModel().rows.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow
                key={hg.id}
                className="hover:bg-transparent border-border/50"
              >
                {hg.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="h-10 px-4 bg-muted/20"
                    style={{ width: header.getSize() }}
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
            <AnimatePresence mode="popLayout" initial={false}>
              {rows.length ? (
                rows.map((row, idx) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{
                      duration: 0.25,
                      delay: idx * 0.03,
                      ease: CUBIC,
                    }}
                    className="group border-b border-border/40 hover:bg-muted/30 transition-colors duration-150"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-4 py-2.5">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </motion.tr>
                ))
              ) : (
                <motion.tr
                  key="no-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <TableCell
                    colSpan={columns.length}
                    className="py-10 text-center text-sm text-muted-foreground"
                  >
                    No results match your search.
                  </TableCell>
                </motion.tr>
              )}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>

      {/* ── Pagination ── */}
      <div className="flex items-center justify-between gap-4 border-t border-border/50 px-4 py-3">
        {/* rows per page */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="hidden sm:inline">Rows per page</span>
          <Select
            value={String(table.getState().pagination.pageSize)}
            onValueChange={(v) => table.setPageSize(Number(v))}
          >
            <SelectTrigger className="h-7 w-16 text-xs border-border/60 bg-muted/40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 50].map((n) => (
                <SelectItem key={n} value={String(n)} className="text-xs">
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* page info + nav */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>

          <div className="flex items-center gap-0.5 ml-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeft className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
