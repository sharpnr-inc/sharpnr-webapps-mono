import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmployeesTable } from "../../components/tables/EmployeeTable";
import { useOrgEmployees } from "@/api/queries";

export default function HRAllEmployeePage() {
  const { data } = useOrgEmployees();
  console.log(data);

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* ───────── Page Header ───────── */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold">Employees</h1>
          <p className="text-sm text-muted-foreground">
            Manage all employees in your organization
          </p>
        </div>
      </div>

      {/* ───────── Stats Cards ───────── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Employees</CardDescription>
            <CardTitle className="text-2xl">56</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Employees</CardDescription>
            <CardTitle className="text-2xl">42</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Payroll Only</CardDescription>
            <CardTitle className="text-2xl">10</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>App Access</CardDescription>
            <CardTitle className="text-2xl">32</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* ───────── Table Section ───────── */}
      <Card>
        <CardHeader>
          <CardTitle>Employee List</CardTitle>
          <CardDescription>
            View and manage all registered employees
          </CardDescription>
        </CardHeader>

        <CardContent>
          <EmployeesTable employeeList={data?.data} />
        </CardContent>
      </Card>
    </div>
  );
}
