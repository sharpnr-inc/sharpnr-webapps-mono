import { SuppliersAndVendorsDetailsPage } from "@/app/suppliers_Vendors/SuppliersAndVendorsDetailsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/suppliers&Vendors/$suppliersID/details",
)({
  component: SuppliersAndVendorsDetailsPage,
});
