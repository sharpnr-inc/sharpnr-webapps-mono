import { TaxCodesPage } from "@/app/tax-codes/TaxCodesPage";
// import { useAccountingStore } from "@/app/store/accounting.store";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/taxations/tax_codes")({
  // beforeLoad: () => {
  //   const selectedLegalEntity =
  //     useAccountingStore.getState().selectedLegalEntity;

  //   if (!selectedLegalEntity) {
  //     throw redirect({
  //       to: "/dashboard/sharp_accounting",
  //     });
  //   }
  // },
  component: TaxCodesPage,
});
