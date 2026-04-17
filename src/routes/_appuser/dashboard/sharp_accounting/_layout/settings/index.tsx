import AccountingSettingsPage from "@/_accountingapp/pages/settings/SettingsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/dashboard/sharp_accounting/_layout/settings/",
)({
  component: AccountingSettingsPage,
});
