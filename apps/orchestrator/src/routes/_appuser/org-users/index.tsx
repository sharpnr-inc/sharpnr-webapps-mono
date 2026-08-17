import { EmployeeDirectoryPage } from "@/app/employee_directory/pages/EmployeeDirectoryPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/org-users/")({
  component: EmployeeDirectoryPage,
});
