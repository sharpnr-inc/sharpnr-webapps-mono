import CompaniesIndexPage from "@/app/companies/pages/CompaniesIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/companies/")({
  component: CompaniesIndexPage,
});
