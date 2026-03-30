import { SupplierDetailsPage } from "@/_accountingapp/pages/Purchases/SupplierDetailsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/dashboard/sharp_accounting/_layout/purchases/$supplierID/details",
)({
  component: SupplierDetailsPage,
});
