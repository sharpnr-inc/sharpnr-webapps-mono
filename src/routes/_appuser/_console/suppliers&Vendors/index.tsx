import { SupplierAndVendorsHomePage } from "@/_orchestrator/suppliers_Vendors/SupplierAndVendorsHomePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/_console/suppliers&Vendors/",
)({
  component: SupplierAndVendorsHomePage,
});

