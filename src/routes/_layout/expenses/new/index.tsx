import { NewExpensesRecordPage } from "@/app/pages/Expenses/NewExpensePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/expenses/new/")({
  component: NewExpensesRecordPage,
});
