import { PurchaseHistoryPage } from "@/app/pages/Purchase&Vendors/PurchaseHistoryPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/purchases/history")({
  component: PurchaseHistoryPage,
});
