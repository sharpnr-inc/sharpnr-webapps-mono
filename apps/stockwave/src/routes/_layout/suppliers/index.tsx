import SuppliersIndexPage from "@/app/suppliers/pages/SuppliersIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/suppliers/")({
  component: SuppliersIndexPage,
});
