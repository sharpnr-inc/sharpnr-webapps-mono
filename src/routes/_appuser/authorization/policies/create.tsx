import CreatePolicyPage from "@/app/authorization/policies/pages/CreatePolicyPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/authorization/policies/create")({
  component: CreatePolicyPage,
});
