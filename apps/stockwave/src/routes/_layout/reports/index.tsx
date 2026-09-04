import ReportsIndexPage from "@/app/reports/pages/ReportsIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/reports/")({
  component: ReportsIndexPage,
});
