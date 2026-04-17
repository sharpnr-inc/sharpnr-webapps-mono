import { AddEmployeeDirectHirePage } from "@/app/pages/AddEmployeeDirectHirePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/employees/direct-hire/")({
  component: AddEmployeeDirectHirePage,
  staticData: {
    breadcrumb: "Direct Hire",
  },
});
