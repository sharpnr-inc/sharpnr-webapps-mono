import { TaxRegistrationPage } from "@/app/pages/Taxation/TaxRegistrationPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/taxations/tax_registration")({
  component: TaxRegistrationPage,
});
