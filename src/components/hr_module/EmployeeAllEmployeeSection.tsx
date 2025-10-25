import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { employee_data, type Employee } from "@/dummy_data/employee_data";
import { Badge } from "../ui/badge";
import React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useFormsModal } from "@/context/FormModalContext";
import HotelOverviewSection from "../hospitality_module/hotel/HotelOverviewSection";

const columns: ColumnDef<Employee>[] = [
  {
    id: "expander",
    header: () => null,
    cell: ({ row }) => (
      <Button
        onClick={row.getToggleExpandedHandler()}
        className="flex items-center"
      >
        {row.getIsExpanded() ? (
          <ChevronDown className="h-4 w-4 " />
        ) : (
          <ChevronRight className="h-4 w-4 " />
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
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "designation",
    header: "Designation",
  },
  {
    accessorKey: "joiningDate",
    header: "Joined On",
    cell: ({ row }) => {
      const date = new Date(row.getValue("joiningDate"));
      return <div>{date.toLocaleDateString("en-IN")}</div>;
    },
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
          className={`px-2 py-1 rounded-md text-xs font-medium`}
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
  {
    accessorKey: "performance",
    header: "Performance",
  },
];

export default function EmployeeAllEmployeeSection() {
  const { showModal } = useFormsModal();

  const openForm = () => {
    showModal(
      "User Form",
      "Fill out your details below",
      <HotelOverviewSection />
    );
  };
  const data = employee_data.employees;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,
  });
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">All Employees</h2>

      {/* Scrollable container */}
      <div className="overflow-x-auto rounded-md border">
        <div className="min-w-[800px]">
          {" "}
          {/* Adjust min-width as needed */}
          <Table>
            <TableHeader className="sticky top-0 bg-background z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="font-semibold whitespace-nowrap"
                    >
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
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <React.Fragment key={row.id}>
                    {/* Regular Row */}
                    <TableRow>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="whitespace-nowrap">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>

                    {/* Expanded Row */}
                    {row.getIsExpanded() && (
                      <TableRow className="bg-muted/30">
                        <TableCell
                          colSpan={columns.length}
                          className="p-4 text-sm"
                        >
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <Button size="sm" onClick={openForm}>
                              Edit
                            </Button>
                            <div>
                              <p className="font-medium">Email:</p>
                              <p>{row.original.email}</p>
                            </div>
                            <div>
                              <p className="font-medium">Phone:</p>
                              <p>{row.original.phone}</p>
                            </div>
                            <div>
                              <p className="font-medium">Joining Date:</p>
                              <p>
                                {new Date(
                                  row.original.joiningDate
                                ).toLocaleDateString("en-IN")}
                              </p>
                            </div>
                            <div>
                              <p className="font-medium">Performance:</p>
                              <p>{row.original.performance}</p>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center text-gray-500"
                  >
                    No employees found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
