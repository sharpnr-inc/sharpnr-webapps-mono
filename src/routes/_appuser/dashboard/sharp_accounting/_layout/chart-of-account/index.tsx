import { ChartOfAccountingPage } from "@/_accountingapp/pages/ChartOfAccounts/ChartOfAccountsPage";
import { useAccountingStore } from "@/_accountingapp/store/accounting.store";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/dashboard/sharp_accounting/_layout/chart-of-account/",
)({
  beforeLoad: () => {
    const selectedLegalEntity =
      useAccountingStore.getState().selectedLegalEntity;

    if (!selectedLegalEntity) {
      throw redirect({
        to: "/dashboard/sharp_accounting",
      });
    }
  },
  component: ChartOfAccountingPage,
});
