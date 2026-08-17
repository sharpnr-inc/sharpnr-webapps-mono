import AddRolePage from "@/app/authorization/roles/pages/AddRolePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/authorization/roles/create")({
  component: AddRolePage,
});
