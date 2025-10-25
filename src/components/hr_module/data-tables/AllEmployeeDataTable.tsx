import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { employee_data, type Employee } from "@/dummy_data/employee_data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useFormsModal } from "@/context/FormModalContext";
import HotelOverviewSection from "@/components/hospitality_module/hotel/HotelOverviewSection";
import { useContainerWidth } from "@/hooks/useContainerWidth";

const columns: ColumnDef<Employee>[] = [
  {
    id: "expander",
    header: () => null,
    cell: ({ row }) => (
      <Button
        onClick={row.getToggleExpandedHandler()}
        className="flex items-center h-8 w-8 p-0"
        variant="ghost"
      >
        {row.getIsExpanded() ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>
    ),
  },
  {
    accessorKey: "image",
    header: "Photo",
    cell: ({ row }) => (
      <img
        src={row.getValue("image")}
        alt={row.original.name}
        className="h-10 w-10 rounded-full object-cover"
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-semibold">{row.getValue("name")}</div>
    ),
  },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "department", header: "Department" },
  { accessorKey: "designation", header: "Designation" },
  {
    accessorKey: "joiningDate",
    header: "Joined On",
    cell: ({ row }) =>
      new Date(row.getValue("joiningDate")).toLocaleDateString("en-IN"),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Employee["status"];
      const color =
        status === "Active"
          ? "default"
          : status === "Inactive"
            ? "destructive"
            : status === "On Leave"
              ? "secondary"
              : "outline";
      return (
        <Badge
          variant={color}
          className="px-2 py-1 rounded-md text-xs font-medium"
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "salary",
    header: "Salary (₹)",
    cell: ({ row }) => (
      <div className="font-medium text-green-700">
        ₹{row.getValue("salary")?.toLocaleString()}
      </div>
    ),
  },
  { accessorKey: "performance", header: "Performance" },
];

export default function AllEmployeeDataTable() {

  const data = employee_data.employees;

  const { showModal } = useFormsModal();

  const openForm = () => {
    showModal(
      "User Form",
      "Fill out your details below",
      <HotelOverviewSection />
    );
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,
  });

  return (

      <div className="">
      <Table className="">
        <TableHeader className="bg-muted/50">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="font-semibold px-3 py-3 ">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                <TableRow className="hover:bg-muted/30 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-3 py-2 text-sm"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>

              </React.Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center text-muted-foreground py-8"
              >
                No employees found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      </div>

  );
}
