import { AccountingOverviewPage } from "@/app/dashboard/AccountingOverviewPage";
import { createFileRoute } from "@tanstack/react-router";

// No entity guard here: the `_layout` route already sends anyone without a
// selected legal entity to the chooser, for every page in the workspace.
export const Route = createFileRoute("/_layout/overview/")({
  component: AccountingOverviewPage,
});
