import OrgDepartmentsIndexPage from "@/app/departments/pages/OrgDepartmentsIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/deparments/")({
  component: OrgDepartmentsIndexPage,
});
