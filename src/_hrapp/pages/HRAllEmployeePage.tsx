import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { EmployeesTable } from "../components/employee/EmployeeTable";
import { PlusIcon } from "lucide-react";
import { useRouter } from "@tanstack/react-router";

export default function HRAllEmployeePage() {
  const router = useRouter();
  const handleCreateEmployee = () => {
    router.navigate({ to: "/dashboard/sharp_hr/employees/direct-hire" });
  };
  return (
    <div className="p-2 space-y-2">
      <div className="grid grig-cols-1 md:grid-cols-4 gap-5">
        <Card>
          <CardHeader>
            <CardTitle>All Employee</CardTitle>
            <CardDescription>
              all the List of employee in the organization
            </CardDescription>
            <CardContent>56</CardContent>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>All Employee</CardTitle>
            <CardDescription>
              all the List of employee in the organization
            </CardDescription>
            <CardContent>56</CardContent>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>All Employee</CardTitle>
            <CardDescription>
              all the List of employee in the organization
            </CardDescription>
            <CardContent>56</CardContent>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>All Employee</CardTitle>
            <CardDescription>
              all the List of employee in the organization
            </CardDescription>
            <CardContent>56</CardContent>
          </CardHeader>
        </Card>
      </div>
      <Button onClick={() => handleCreateEmployee()} className="">
        {" "}
        <PlusIcon /> Add Employee
      </Button>
      <EmployeesTable />
    </div>
  );
}
