import { BalanceSheetPage } from "@/app/Reports/BalanceSheetPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/reports/balance-sheet")({
  component: BalanceSheetPage,
});
