import { SupplierAndVendorsHomePage } from "@/app/suppliers_Vendors/page/SupplierAndVendorsHomePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/suppliers&Vendors/")({
  component: SupplierAndVendorsHomePage,
});
