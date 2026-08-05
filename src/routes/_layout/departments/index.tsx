import { DepartmentsPage } from "@/app/departments/DepartmentsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/departments/")({
  component: DepartmentsPage,
});
