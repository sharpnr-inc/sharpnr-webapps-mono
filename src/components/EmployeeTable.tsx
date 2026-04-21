import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Employee = {
  id: string;
  name: string;
  status: "ACTIVE" | "INACTIVE";
};

const MOCK_EMPLOYEES: Employee[] = [
  {
    id: "emp_001",
    name: "John Doe",
    status: "ACTIVE",
  },
  {
    id: "emp_002",
    name: "Jane Smith",
    status: "ACTIVE",
  },
  {
    id: "emp_003",
    name: "Rahul Verma",
    status: "INACTIVE",
  },
];

export function EmployeesTable() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {/* Header */}
      {/* <div>
        <h1 className="text-xl font-semibold">Employees</h1>
        <p className="text-sm text-muted-foreground">
          Employee directory (route test)
        </p>
      </div> */}

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {MOCK_EMPLOYEES.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell className="font-mono">
                  {emp.id}
                </TableCell>

                <TableCell>{emp.name}</TableCell>

                <TableCell>
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-medium ${
                      emp.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {emp.status}
                  </span>
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      navigate({
                        to: "/employees/$employeeId",
                        params: { employeeId: emp.id },
                      })
                    }
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
