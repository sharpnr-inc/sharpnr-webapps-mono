import { ProfitAndLossReportsPage } from "@/app/pages/Reports/ProfitAndLossReportsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/reports/profit-loss")({
  component: ProfitAndLossReportsPage,
});
