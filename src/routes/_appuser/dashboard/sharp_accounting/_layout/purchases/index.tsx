import { AddPurchaseInvoicePage } from "@/_accountingapp/pages/Purchase&Vendors/NewPurchasePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/dashboard/sharp_accounting/_layout/purchases/",
)({
  component: AddPurchaseInvoicePage,
});
