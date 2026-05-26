import { SupplierDetailsPage } from "@/app/Purchase&Vendors/SupplierDetailsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/suppliers/$supplierID/details")({
  component: SupplierDetailsPage,
});
