import PoliciesIndexPage from "@/app/policies/pages/PoliciesIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/policies/")({
  component: PoliciesIndexPage,
});
