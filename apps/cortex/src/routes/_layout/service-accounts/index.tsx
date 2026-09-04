import ServiceAccountsIndexPage from "@/app/service-accounts/pages/ServiceAccountsIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/service-accounts/")({
  component: ServiceAccountsIndexPage,
});
