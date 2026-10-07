import AccountingServiceIndexPage from "@/app/sharp-accounting/pages/AccountingServiceIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/sharp-accounting/")({
  component: AccountingServiceIndexPage,
});
