import { NewExpensesRecordPage } from "@/_accountingapp/pages/Expenses/NewExpensePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/dashboard/sharp_accounting/_layout/expenses/new/",
)({
  component: NewExpensesRecordPage,
});
