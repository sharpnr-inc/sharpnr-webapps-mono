import { AccountingOverviewPage } from "@/_accountingapp/pages/Overview/AccountingOverviewPage";
import { useAccountingStore } from "@/_accountingapp/store/accounting.store";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/dashboard/sharp_accounting/_layout/overview/",
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
  component: AccountingOverviewPage,
});
