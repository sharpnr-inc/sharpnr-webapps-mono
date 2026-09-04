import RolesIndexPage from "@/app/roles/pages/RolesIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/roles/")({
  component: RolesIndexPage,
});
