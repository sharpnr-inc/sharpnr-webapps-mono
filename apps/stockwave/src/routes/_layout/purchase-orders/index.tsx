import PurchaseOrdersIndexPage from "@/app/purchase-orders/pages/PurchaseOrdersIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/purchase-orders/")({
  component: PurchaseOrdersIndexPage,
});
