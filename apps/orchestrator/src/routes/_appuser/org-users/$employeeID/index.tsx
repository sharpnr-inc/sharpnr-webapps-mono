import UserDetailsPage from "@/app/employee_directory/pages/UserDetailsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/org-users/$employeeID/")({
  component: UserDetailsPage,
});
