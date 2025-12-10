import React from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { employee_data, type Employee } from "@/dummy_data/employee_data";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
// import { useFormsModal } from "@/context/FormModalContext";
// import HotelOverviewSection from "@/components/hospitality_module/hotel/HotelOverviewSection";

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
          ? "bg-green-100 text-green-700"
          : status === "Inactive"
            ? "bg-red-100 text-red-700"
            : status === "On Leave"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-100 text-gray-700";
      return (
        <span className={`px-2 py-1 rounded-md text-xs font-medium ${color}`}>
          {status}
        </span>
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
  // const { showModal } = useFormsModal();

  // const openForm = () => {
  //   showModal(
  //     "User Form",
  //     "Fill out your details below",
  //     <HotelOverviewSection />
  //   );
  // };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,
    columnResizeMode: "onChange", // or "onEnd"
  });

  return (
    <div className=" overflow-x-auto">
       <table className="min-w-max border-collapse border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    width: header.getSize(),
                  }}
                  className="relative border border-gray-200 px-3 py-3 text-left font-semibold text-gray-700"
                >
                  <div className="flex items-center justify-between group select-none">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className={`
        absolute right-0 top-0 h-full w-1 cursor-col-resize 
        bg-transparent hover:bg-gray-400 
        group-hover:bg-gray-300
      `}
                    />
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                <tr className="hover:bg-gray-50 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="border border-gray-200 px-3 py-2 align-middle"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center text-gray-500 py-8"
              >
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
