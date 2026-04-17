import { BalanceSheetPage } from "@/_accountingapp/pages/Reports/BalanceSheetPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/dashboard/sharp_accounting/_layout/reports/balance-sheet",
)({
  component: BalanceSheetPage,
});
