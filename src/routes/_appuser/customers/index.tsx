import CustomerIndexPage from "@/app/customers/pages/CustomerIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/customers/")({
  component: CustomerIndexPage,
});
