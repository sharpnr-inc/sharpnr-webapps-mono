import { TaxCodesPage } from "@/app/pages/Taxation/TaxCodesPage";
import { useAccountingStore } from "@/app/store/accounting.store";
import { createFileRoute, redirect } from "@tanstack/react-router";

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
