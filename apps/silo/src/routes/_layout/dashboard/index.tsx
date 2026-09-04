import DashboardIndexPage from "@/app/dashboard/pages/DashboardIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/dashboard/")({
  component: DashboardIndexPage,
});
