import { PaymentOrdersPage } from "@/app/pages/payments/PaymentOrders";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/payments/payment_orders")({
  component: PaymentOrdersPage,
});
