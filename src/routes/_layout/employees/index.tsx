import HRAllEmployeePage from "@/app/pages/EmployeePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/employees/")({
  component: HRAllEmployeePage,
  staticData: {
    breadcrumb: "All Employees",
  },
});
