import { AddPurchaseInvoicePage } from "@/app/pages/Purchase&Vendors/NewPurchasePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/purchases/")({
  component: AddPurchaseInvoicePage,
});
