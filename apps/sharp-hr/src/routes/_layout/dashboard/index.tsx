import { DashBoardPage } from "@/app/dashboard/pages/DashboardPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/dashboard/")({
  component: DashBoardPage,
});
