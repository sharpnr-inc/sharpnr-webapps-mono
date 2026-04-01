import { SupplierDetailsPage } from "@/_accountingapp/pages/Purchase&Vendors/SupplierDetailsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/dashboard/sharp_accounting/_layout/suppliers/$supplierID/details",
)({
  component: SupplierDetailsPage,
});
