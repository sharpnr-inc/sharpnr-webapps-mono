import OrgDeparmentsDetailsPage from "@/app/departments/pages/OrgDeparmentsDetailsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/deparments/$departmentID/")({
  component: OrgDeparmentsDetailsPage,
});
