import { TaxCodesPage } from "@/app/tax-codes/TaxCodesPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/taxations/tax_codes")({
  component: TaxCodesPage,
});
