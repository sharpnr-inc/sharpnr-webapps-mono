import { ChartOfAccountingPage } from "@/app/chart-of-accounts/ChartOfAccountsPage";
import { createFileRoute } from "@tanstack/react-router";

// The legal entity guard lives in the `_layout` route -- see overview/index.tsx.
export const Route = createFileRoute("/_layout/chart-of-account/")({
  component: ChartOfAccountingPage,
});
