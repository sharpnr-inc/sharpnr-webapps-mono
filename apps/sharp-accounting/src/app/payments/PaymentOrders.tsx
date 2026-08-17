import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { usePaymentOrders } from "@/app/api/queries/payments";
import { useAccountingStore } from "@/store/accounting.store";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@sharpnr/ui";

import { Badge } from "@sharpnr/ui";
import { Skeleton } from "@sharpnr/ui";
import { formatDateTimePretty } from "@sharpnr/utils";

type PaymentOrder = {
  id: string;
  order_number: string;
  payer_name: string;
  currency: string;
  total_amount: number;
  paid_amount: number;
  status: string;
  source: string;
  created_at: string;
};

const columns: ColumnDef<PaymentOrder>[] = [
  {
    accessorKey: "order_number",
    header: "Order Number",
  },
  {
    accessorKey: "payer_name",
    header: "Payer",
  },
  {
    accessorKey: "total_amount",
    header: "Total Amount",
    cell: ({ row }) => {
      const amount = row.original.total_amount;
      return `₹${amount}`;
    },
  },
  {
    accessorKey: "paid_amount",
    header: "Paid Amount",
    cell: ({ row }) => {
      const amount = row.original.paid_amount;
      return `₹${amount}`;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      return <Badge variant="outline">{status}</Badge>;
    },
  },
  {
    accessorKey: "source",
    header: "Source",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const date = formatDateTimePretty(row.original.created_at);
      return date.toLocaleString();
    },
  },
];

export function PaymentOrdersPage() {
  const selectedLegalEntity = useAccountingStore((s) => s.selectedLegalEntity);

  const { data, isLoading } = usePaymentOrders(selectedLegalEntity?.id);

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-2xl">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No payment orders found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
