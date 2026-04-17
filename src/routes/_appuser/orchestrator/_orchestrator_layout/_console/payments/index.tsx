import { PaymentsHomePage } from "@/_orchestrator/payments/pages/PaymentsHomePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/orchestrator/_orchestrator_layout/_console/payments/",
)({
  component: PaymentsHomePage,
});
