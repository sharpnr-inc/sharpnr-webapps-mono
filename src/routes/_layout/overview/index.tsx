import { AccountingOverviewPage } from "@/app/pages/Overview/AccountingOverviewPage";
import { useAccountingStore } from "@/app/store/accounting.store";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/overview/")({
  beforeLoad: () => {
    const selectedLegalEntity =
      useAccountingStore.getState().selectedLegalEntity;

    if (!selectedLegalEntity) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: AccountingOverviewPage,
});
