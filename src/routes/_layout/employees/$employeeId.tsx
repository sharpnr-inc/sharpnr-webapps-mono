import { EmployeeDetailsPage } from "@/app/pages/Employee/EmployeeDetailsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/employees/$employeeId")({
  component: EmployeeDetailsPage,
  validateSearch: (search) => ({
    emplName: (search.emplName as string) ?? "",
    emplID: (search.emplID as string) ?? "",
  }),
});
