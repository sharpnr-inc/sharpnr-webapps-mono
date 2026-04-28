import { DepartmentsPage } from "@/app/pages/Departments/DepartmentsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/departments/")({
  component: DepartmentsPage,
});
