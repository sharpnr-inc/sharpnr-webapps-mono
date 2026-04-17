import { PaymentOrdersPage } from "@/_accountingapp/pages/payments/PaymentOrders";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/dashboard/sharp_accounting/_layout/payments/payment_orders",
)({
  component: PaymentOrdersPage,
});
