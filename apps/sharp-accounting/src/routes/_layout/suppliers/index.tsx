import { AccountingSupplierHomePage } from "@/app/Purchase&Vendors/SuppliersPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/suppliers/")({
  component: AccountingSupplierHomePage,
});
