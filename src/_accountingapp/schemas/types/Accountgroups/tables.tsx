import type { ColumnDef } from "@tanstack/react-table";
import type { AccountingGroup } from "./responses";
import { formatDateTimePretty } from "@/lib/formatDatePretty";

export const accountingGroupColumns: ColumnDef<AccountingGroup>[] = [
  {
    accessorKey: "name",
    header: "Group Name",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      return (
        <span className="rounded bg-muted px-2 py-1 text-xs font-medium">
          {row.original.type}
        </span>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      return formatDateTimePretty(row.original.created_at);
    },
  },
];
