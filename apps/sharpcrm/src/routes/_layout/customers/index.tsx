import CustomersIndexPage from "@/app/customers/pages/CustomersIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/customers/")({
  component: CustomersIndexPage,
});
