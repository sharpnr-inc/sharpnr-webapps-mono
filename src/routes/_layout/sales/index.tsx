import { SalesHistoryPage } from "@/app/pages/Sales/SalesHistoryPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/sales/")({
  component: SalesHistoryPage,
});
