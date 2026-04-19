import { PaymentsHomePage } from "@/app/payments/pages/PaymentsHomePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/payments/")({
  component: PaymentsHomePage,
});
