import { ProfitAndLossReportsPage } from "@/_accountingapp/pages/Reports/ProfitAndLossReportsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/dashboard/sharp_accounting/_layout/reports/profit-loss",
)({
  component: ProfitAndLossReportsPage,
});
