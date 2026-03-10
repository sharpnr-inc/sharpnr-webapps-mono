import { AccountingOverviewPage } from "@/_accountingapp/pages/Overview/AccountingOverviewPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/dashboard/sharp_accounting/_layout/overview/",
)({
  component: AccountingOverviewPage,
});
