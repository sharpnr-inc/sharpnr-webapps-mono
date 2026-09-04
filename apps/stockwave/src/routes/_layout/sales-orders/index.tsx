import SalesOrdersIndexPage from "@/app/sales-orders/pages/SalesOrdersIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/sales-orders/")({
  component: SalesOrdersIndexPage,
});
