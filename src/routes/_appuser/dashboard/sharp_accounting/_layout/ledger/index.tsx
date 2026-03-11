import LedgerPage from "@/_accountingapp/pages/Ledger/LedgerPages";
import { useAccountingStore } from "@/_accountingapp/store/accounting.store";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/dashboard/sharp_accounting/_layout/ledger/",
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
  component: LedgerPage,
});
