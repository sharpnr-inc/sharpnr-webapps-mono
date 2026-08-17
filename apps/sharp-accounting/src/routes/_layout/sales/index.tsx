import { SalesHistoryPage } from "@/app/invoices/SalesHistoryPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/sales/")({
  component: SalesHistoryPage,
});
