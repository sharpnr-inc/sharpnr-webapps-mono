import { NewSalesRecordPage } from "@/_accountingapp/pages/Sales/NewSaleRecordPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/dashboard/sharp_accounting/_layout/sales/new/",
)({
  component: NewSalesRecordPage,
});
