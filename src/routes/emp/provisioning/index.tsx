import SetPasswordPage from "@/app/employee_provision/SetPasswordPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/emp/provisioning/")({
  component: SetPasswordPage,
});
