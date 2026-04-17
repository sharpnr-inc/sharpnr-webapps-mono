import { BalanceSheetPage } from "@/app/pages/Reports/BalanceSheetPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/reports/balance-sheet")({
  component: BalanceSheetPage,
});
