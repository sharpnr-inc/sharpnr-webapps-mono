import { HREmployeeDetailsPage } from "@/app/pages/Employee/EmployeeDetailsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/employees/$employeeId")({
  component: HREmployeeDetailsPage,
  staticData: {
    breadcrumb: "Employee Details",
  },
});
