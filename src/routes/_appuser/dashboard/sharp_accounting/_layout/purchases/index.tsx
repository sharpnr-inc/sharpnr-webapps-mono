import { PurchaseHomePage } from "@/_accountingapp/pages/Purchases/PurchaseHomePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/dashboard/sharp_accounting/_layout/purchases/",
)({
  component: PurchaseHomePage,
});
