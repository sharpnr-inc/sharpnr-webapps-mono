import { TaxRatePage } from "@/app/tax-codes/TaxRatePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/taxations/tax_rates")({
  // beforeLoad: () => {
  //   const selectedLegalEntity =
  //     useAccountingStore.getState().selectedLegalEntity;

  //   if (!selectedLegalEntity) {
  //     throw redirect({
  //       to: "/dashboard/sharp_accounting",
  //     });
  //   }
  // },
  component: TaxRatePage,
});
