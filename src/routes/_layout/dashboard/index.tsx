import { DashBoardPage } from "@/app/pages/Dashboard/DashboardPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/dashboard/")({
  component: DashBoardPage,
});
