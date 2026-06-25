import ManageRole from "@/app/authorization/roles/pages/ManageRole";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/authorization/roles/$roleID/")({
  component: ManageRole,
});
