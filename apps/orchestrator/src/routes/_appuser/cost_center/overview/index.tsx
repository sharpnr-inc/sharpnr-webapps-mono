import CostCenterOverviewPage from "@/app/cost_centers/pages/CostCenterOverviewPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/cost_center/overview/")({
  component: CostCenterOverviewPage,
});
