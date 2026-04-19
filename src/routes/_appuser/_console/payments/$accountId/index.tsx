import { PaymentAccountDetails } from "@/_orchestrator/payments/pages/PaymentAccountDetails";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/_console/payments/$accountId/",
)({
  component: PaymentAccountDetails,
});
