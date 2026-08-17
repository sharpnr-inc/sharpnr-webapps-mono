import RolesIndexPage from "@/app/authorization/roles/pages/RolesIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/authorization/roles/")({
  component: RolesIndexPage,
});
