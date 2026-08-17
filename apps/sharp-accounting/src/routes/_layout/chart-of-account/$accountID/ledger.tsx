import LedgerPage from "@/app/chart-of-accounts/LedgerPages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_layout/chart-of-account/$accountID/ledger",
)({
  component: LedgerPage,
});
