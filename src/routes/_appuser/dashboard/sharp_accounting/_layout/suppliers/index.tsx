import { AccountingSupplierHomePage } from "@/_accountingapp/pages/Purchase&Vendors/SuppliersPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/dashboard/sharp_accounting/_layout/suppliers/",
)({
  component: AccountingSupplierHomePage,
});
