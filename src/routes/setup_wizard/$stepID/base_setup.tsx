import { OperationSetUpPage } from "@/setup_wizard/pages/OperationSetupPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/setup_wizard/$stepID/base_setup")({
  component: OperationSetUpPage,
});
