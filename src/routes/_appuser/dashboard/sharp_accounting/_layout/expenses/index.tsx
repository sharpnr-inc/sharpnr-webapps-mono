import { ExpensesHistoryPage } from "@/_accountingapp/pages/Expenses/ExpensesHistoryPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/dashboard/sharp_accounting/_layout/expenses/",
)({
  component: ExpensesHistoryPage,
});
