import { TaxRatePage } from "@/app/tax-codes/TaxRatePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/taxations/tax_rates")({
  component: TaxRatePage,
});
