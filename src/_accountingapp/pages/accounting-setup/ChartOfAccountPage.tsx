import { useAccountingGroupOfBook } from "@/_accountingapp/api/queries/accounting_groups";
import { useOrgAccountingBooks } from "@/_accountingapp/api/queries/books";
import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  flexRender,
  getExpandedRowModel,
  getFilteredRowModel,
  type ExpandedState,
} from "@tanstack/react-table";
import type {
  AccountingGroup,
  Accounts,
} from "@/_accountingapp/schemas/types/Accountgroups/responses";
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
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { formatDateTimePretty } from "@/lib/formatDatePretty";
import { ChevronDown, ChevronRight, PlusIcon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useFormsModal } from "@/context/FormModalContext";
import { CreateAccountForm } from "@/_accountingapp/forms/Accounts/CreateAccountForm";



type TableRowData = AccountingGroup | Accounts;
const columnHelper = createColumnHelper<TableRowData>();

const columns = [
  columnHelper.accessor((row) => ("name" in row ? row.name : row.Name), {
    id: "name",
    header: "Name",
    cell: ({ row, getValue }) => (
      <div
        style={{ paddingLeft: `${row.depth * 2}rem` }}
        className="flex items-center gap-2"
      >
        {row.getCanExpand() ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              row.getToggleExpandedHandler()();
            }}
            className="p-1 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
          >
            {row.getIsExpanded() ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        ) : (
          <span className="w-6" />
        )}
        <span className={row.depth > 0 ? "font-medium" : "font-bold"}>
          {getValue()}
        </span>
      </div>
    ),
  }),

  columnHelper.accessor((row) => ("type" in row ? row.type : "ACCOUNT"), {
    id: "type",
    header: "Type",
    cell: (info) => (
      <span className="text-[10px] font-bold uppercase tracking-wider border px-2 py-0.5 rounded">
        {info.getValue()}
      </span>
    ),
  }),

  columnHelper.accessor(
    (row) => ("updated_at" in row ? row.updated_at : null),
    {
      id: "updated_at",
      header: "Last Updated",
      cell: (info) => {
        const val = info.getValue();
        return val ? (
          formatDateTimePretty(val)
        ) : (
          <span className="opacity-50">—</span>
        );
      },
    }
  ),
];

// ⭐⭐⭐⭐⭐⭐
// 🟢--> Main Component
export function ChartOfAccountPage() {
  const [selectedBookID, setBookId] = useState<string | undefined>(undefined);
  const [globalFilter, setGlobalFilter] = useState("");
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const { showModal } = useFormsModal();

  const handleCreateAccount = () => {
    showModal("", "", <CreateAccountForm />);
  };

  const { data: books } = useOrgAccountingBooks();
  const { data: booksGroups, isLoading } =
    useAccountingGroupOfBook(selectedBookID);

  const tableData = useMemo(() => {
    return booksGroups?.data.account_groups ?? [];
  }, [booksGroups]);

  const tableInstance = useReactTable({
    data: tableData,
    columns,
    state: {
      expanded,
      globalFilter,
    },
    onExpandedChange: setExpanded,
    onGlobalFilterChange: setGlobalFilter,
    getSubRows: (row) => ("accounts" in row ? row.accounts : undefined),
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    filterFromLeafRows: true,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Chart of Accounts</h1>
        <p className="text-muted-foreground text-sm">
          Select an accounting book to view hierarchy.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center justify-between">
        <div className="w-full sm:w-[300px] flex gap-5">
          <Select onValueChange={setBookId}>
            <SelectTrigger>
              <SelectValue placeholder="Select Book" />
            </SelectTrigger>
            <SelectContent>
              {books?.data.account_books.map((ab: any) => (
                <SelectGroup key={ab.id}>
                  <SelectLabel>{ab.sub_module}</SelectLabel>
                  <SelectItem value={ab.id}>{ab.name}</SelectItem>
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={handleCreateAccount}>
            <PlusIcon></PlusIcon>Add Accounts
          </Button>
        </div>

        <div className="relative w-full sm:w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            {tableInstance.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : tableInstance.getRowModel().rows?.length ? (
              tableInstance.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No accounts found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
