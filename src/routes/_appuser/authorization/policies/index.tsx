import PoliciesIndexPage from "@/app/authorization/policies/pages/PoliciesIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/authorization/policies/")({
  component: PoliciesIndexPage,
});
