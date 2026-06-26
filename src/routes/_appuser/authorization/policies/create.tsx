import CreateNewPolicyPage from "@/app/authorization/policies/pages/CreateNewPolicyPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/authorization/policies/create")(
  {
    component: CreateNewPolicyPage,
  },
);
