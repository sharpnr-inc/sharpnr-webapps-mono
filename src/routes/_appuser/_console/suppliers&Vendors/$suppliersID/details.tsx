import { SuppliersAndVendorsDetailsPage } from "@/_orchestrator/suppliers_Vendors/SuppliersAndVendorsDetailsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/_console/suppliers&Vendors/$suppliersID/details",
)({
  component: SuppliersAndVendorsDetailsPage,
});
