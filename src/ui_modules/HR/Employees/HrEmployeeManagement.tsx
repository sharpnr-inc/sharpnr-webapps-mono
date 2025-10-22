import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PlusCircle,
  ArrowUpDown,
  Search,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { SHAAddEmployeeForm } from "@/components/UiModuels/SHRAddEmployeeForm";
import { useFormModal } from "@/context/FormsModalContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Employee type definition
interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  status: "On Duty" | "On Leave" | "Remote";
  salary: string;
  joinDate: string;
}

// Dummy employee data
const employeeData: Employee[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    department: "Engineering",
    position: "Senior Developer",
    status: "On Duty",
    salary: "$95,000",
    joinDate: "2021-03-15",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.c@company.com",
    department: "Marketing",
    position: "Marketing Manager",
    status: "On Duty",
    salary: "$78,000",
    joinDate: "2020-07-22",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.r@company.com",
    department: "HR",
    position: "HR Specialist",
    status: "On Leave",
    salary: "$65,000",
    joinDate: "2022-01-10",
  },
  {
    id: 4,
    name: "James Wilson",
    email: "james.w@company.com",
    department: "Engineering",
    position: "Frontend Developer",
    status: "On Duty",
    salary: "$82,000",
    joinDate: "2021-11-05",
  },
  {
    id: 5,
    name: "Priya Patel",
    email: "priya.p@company.com",
    department: "Sales",
    position: "Sales Director",
    status: "On Duty",
    salary: "$110,000",
    joinDate: "2019-05-18",
  },
  {
    id: 6,
    name: "David Kim",
    email: "david.k@company.com",
    department: "Engineering",
    position: "DevOps Engineer",
    status: "On Duty",
    salary: "$88,000",
    joinDate: "2022-03-30",
  },
  {
    id: 7,
    name: "Amanda Foster",
    email: "amanda.f@company.com",
    department: "Finance",
    position: "Financial Analyst",
    status: "On Duty",
    salary: "$72,000",
    joinDate: "2021-09-12",
  },
  {
    id: 8,
    name: "Robert Martinez",
    email: "robert.m@company.com",
    department: "Engineering",
    position: "Backend Developer",
    status: "Remote",
    salary: "$85,000",
    joinDate: "2020-12-08",
  },
  {
    id: 9,
    name: "Lisa Thompson",
    email: "lisa.t@company.com",
    department: "Design",
    position: "UX Designer",
    status: "On Duty",
    salary: "$76,000",
    joinDate: "2022-06-25",
  },
  {
    id: 10,
    name: "Kevin O'Brien",
    email: "kevin.o@company.com",
    department: "Sales",
    position: "Sales Representative",
    status: "On Duty",
    salary: "$58,000",
    joinDate: "2023-02-14",
  },
];

export default function HrEmployeesManagementSection() {
  const { openModal } = useFormModal();

  const handleAddEmployee = (option: string) => {
    if (option === "Online Access") {
      openModal(
        <SHAAddEmployeeForm />, // modal content
        "Add New Employee", // modal title
        "Fill out the form below to add a new employee." // modal description
      );
    }
  };

  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <button
          className="flex items-center gap-2 font-semibold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="h-4 w-4" />
        </button>
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="text-sm text-gray-600">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "department",
      header: ({ column }) => (
        <button
          className="flex items-center gap-2 font-semibold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Department
          <ArrowUpDown className="h-4 w-4" />
        </button>
      ),
    },
    {
      accessorKey: "position",
      header: "Position",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as Employee["status"];
        const statusColors: Record<Employee["status"], string> = {
          "On Duty": "bg-green-100 text-green-800",
          "On Leave": "bg-yellow-100 text-yellow-800",
          Remote: "bg-blue-100 text-blue-800",
        };
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: "salary",
      header: ({ column }) => (
        <button
          className="flex items-center gap-2 font-semibold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Salary
          <ArrowUpDown className="h-4 w-4" />
        </button>
      ),
    },
    {
      accessorKey: "joinDate",
      header: "Join Date",
      cell: ({ row }) =>
        new Date(row.getValue("joinDate")).toLocaleDateString(),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const employee = row.original;
        return (
          <div className="flex items-center gap-2">
            <button
              onClick={() => console.log("View", employee)}
              className="p-2 hover:bg-blue-50 rounded-md transition-colors"
              title="View Details"
            >
              <Eye className="h-4 w-4 text-blue-600" />
            </button>
            <button
              onClick={() => console.log("Edit", employee)}
              className="p-2 hover:bg-green-50 rounded-md transition-colors"
              title="Edit Employee"
            >
              <Edit className="h-4 w-4 text-green-600" />
            </button>
            <button
              onClick={() => console.log("Delete", employee)}
              className="p-2 hover:bg-red-50 rounded-md transition-colors"
              title="Delete Employee"
            >
              <Trash2 className="h-4 w-4 text-red-600" />
            </button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: employeeData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    initialState: {
      pagination: {
        pageSize: 7,
      },
    },
  });

  const onDutyCount = employeeData.filter(
    (emp) => emp.status === "On Duty"
  ).length;
  const onLeaveCount = employeeData.filter(
    (emp) => emp.status === "On Leave"
  ).length;
  const remoteCount = employeeData.filter(
    (emp) => emp.status === "Remote"
  ).length;

  return (
    <Tabs className="p-2">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="onBoarding">OnBoarding</TabsTrigger>
        <TabsTrigger value="Requests">Requests</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <div className="p-2 space-y-4">
          <div className="grid grid-cols-3 gap-5">
            <Card>
              <CardHeader>
                <CardTitle>On Duty</CardTitle>
                <CardDescription>Employees Currently Working</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{onDutyCount}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>On Leave</CardTitle>
                <CardDescription>Employees On Leave</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{onLeaveCount}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Remote</CardTitle>
                <CardDescription>Employees Working Remotely</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{remoteCount}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Employees</CardTitle>
              <CardDescription>
                Here we have all the List of employees
              </CardDescription>
              <div className="flex items-center gap-2 mt-2">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search employees..."
                    value={globalFilter ?? ""}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id} className="border-b">
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            className="px-4 py-3 text-left text-sm"
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map((row) => (
                      <tr
                        key={row.id}
                        className="border-b hover:bg-gray-50 transition-colors"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="px-4 py-3 text-sm">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-600">
                  Showing{" "}
                  {table.getState().pagination.pageIndex *
                    table.getState().pagination.pageSize +
                    1}{" "}
                  to{" "}
                  {Math.min(
                    (table.getState().pagination.pageIndex + 1) *
                      table.getState().pagination.pageSize,
                    employeeData.length
                  )}{" "}
                  of {employeeData.length} employees
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="onBoarding">
        <div className="p-2">
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Employee
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuItem
                  onClick={() => handleAddEmployee("Online Access")}
                >
                  Online Access
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleAddEmployee("Record Purpose")}
                >
                  Record Purpose
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </TabsContent>
    </Tabs>
  );
}
