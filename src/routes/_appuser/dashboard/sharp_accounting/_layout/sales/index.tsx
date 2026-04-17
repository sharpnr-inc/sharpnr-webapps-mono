import { SalesHistoryPage } from "@/_accountingapp/pages/Sales/SalesHistoryPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/dashboard/sharp_accounting/_layout/sales/",
)({
  component: SalesHistoryPage,
});
