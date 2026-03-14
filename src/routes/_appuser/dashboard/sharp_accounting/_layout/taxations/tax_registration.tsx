import { TaxRegistrationPage } from "@/_accountingapp/pages/Taxation/TaxRegistrationPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/dashboard/sharp_accounting/_layout/taxations/tax_registration",
)({
  component: TaxRegistrationPage,
});
