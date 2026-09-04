import PermissionsIndexPage from "@/app/permissions/pages/PermissionsIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/permissions/")({
  component: PermissionsIndexPage,
});
