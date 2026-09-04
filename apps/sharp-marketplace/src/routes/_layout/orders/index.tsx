import OrdersPage from "@/marketplace/pages/OrdersPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/orders/")({
  component: OrdersPage,
});
