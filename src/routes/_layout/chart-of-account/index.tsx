import { ChartOfAccountingPage } from "@/app/pages/ChartOfAccounts/ChartOfAccountsPage";
import { useAccountingStore } from "@/app/store/accounting.store";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/chart-of-account/")({
  beforeLoad: () => {
    const selectedLegalEntity =
      useAccountingStore.getState().selectedLegalEntity;

    if (!selectedLegalEntity) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: ChartOfAccountingPage,
});
