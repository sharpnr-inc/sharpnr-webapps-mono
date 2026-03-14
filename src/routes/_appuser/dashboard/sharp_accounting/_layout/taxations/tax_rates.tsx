import { TaxRatePage } from "@/_accountingapp/pages/Taxation/TaxRatePage";
import { useAccountingStore } from "@/_accountingapp/store/accounting.store";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/dashboard/sharp_accounting/_layout/taxations/tax_rates",
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
  component: TaxRatePage,
});
