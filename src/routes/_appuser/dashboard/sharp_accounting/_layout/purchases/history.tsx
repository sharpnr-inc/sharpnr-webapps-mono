import { PurchaseHistoryPage } from "@/_accountingapp/pages/Purchase&Vendors/PurchaseHistoryPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/dashboard/sharp_accounting/_layout/purchases/history",
)({
  component: PurchaseHistoryPage,
});
