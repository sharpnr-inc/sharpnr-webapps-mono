import PolicyDetailsPage from "@/app/authorization/policies/pages/PolicyDetailsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/authorization/policies/$policyID/",
)({
  component: PolicyDetailsPage,
});
