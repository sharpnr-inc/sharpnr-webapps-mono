import { PaymentAccountDetails } from "@/app/payments/pages/PaymentAccountDetails";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/payments/$accountId/")({
  component: PaymentAccountDetails,
});
