import DashboardWelcomePage from "@/components/layouts/DashboardWelcomePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/dashboard/")({
  component: DashboardWelcomePage,
});

