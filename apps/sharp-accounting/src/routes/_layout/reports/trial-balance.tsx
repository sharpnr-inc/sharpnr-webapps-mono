import AccountingReportsTrialBalancePage from "@/app/trial-balance/AccountingReportsTrialBalancePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/reports/trial-balance")({
  component: AccountingReportsTrialBalancePage,
});
