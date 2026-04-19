import { SupplierAndVendorsHomePage } from "@/app/suppliers_Vendors/SupplierAndVendorsHomePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/suppliers&Vendors/")({
  component: SupplierAndVendorsHomePage,
});
