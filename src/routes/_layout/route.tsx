import AccountingRootLayout from "@/app/components/AccountingRootLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
  component: AccountingRootLayout,
});
