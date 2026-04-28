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
import type { OrgEmployeeList } from "@/api/types";

interface EmployeeTableProps {
  employeeList: OrgEmployeeList[] | undefined;
}

export function EmployeesTable({ employeeList }: EmployeeTableProps) {
  const navigate = useNavigate();

  if (!employeeList?.length) {
    return (
      <div className="text-sm text-muted-foreground p-4">
        No employees found.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {employeeList.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell className="font-mono">
                {emp.employeeID}
              </TableCell>

              <TableCell>{emp.employeeName}</TableCell>

              <TableCell>{emp.employeeRole}</TableCell>

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
  );
}