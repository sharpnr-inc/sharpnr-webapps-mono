import { LegalEntityTaxCategoryPage } from "@/app/legal_entity/pages/LegalEntityTaxCategoryPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/legal_entity/$leID/tax_category",
)({
  component: LegalEntityTaxCategoryPage,
});
