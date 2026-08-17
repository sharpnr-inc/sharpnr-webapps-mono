import AddEmployeeInBulkPage from "@/app/employee_directory/pages/AddEmployeeInBulkPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/org-users/add_employees")({
  component: AddEmployeeInBulkPage,
});
