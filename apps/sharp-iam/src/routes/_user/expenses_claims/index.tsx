import ExpenseAndClaimsPage from "@/app/expense_claims/pages/ExpenseAndClaimsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/expenses_claims/")({
  component: ExpenseAndClaimsPage,
});
