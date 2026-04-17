import AccountingReportsTrialBalancePage from "@/app/pages/Reports/AccountingReportsTrialBalancePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/reports/trial-balance")({
  component: AccountingReportsTrialBalancePage,
});
