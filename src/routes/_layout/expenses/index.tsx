import { ExpensesHistoryPage } from "@/app/pages/Expenses/ExpensesHistoryPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/expenses/")({
  component: ExpensesHistoryPage,
});
