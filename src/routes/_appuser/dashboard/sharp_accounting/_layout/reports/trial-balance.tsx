import AccountingReportsTrialBalancePage from "@/_accountingapp/pages/Reports/AccountingReportsTrialBalancePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/dashboard/sharp_accounting/_layout/reports/trial-balance",
)({
  component: AccountingReportsTrialBalancePage,
});
