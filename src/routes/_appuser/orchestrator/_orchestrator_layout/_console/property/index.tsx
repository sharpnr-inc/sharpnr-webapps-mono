import { PropertyIndexPage } from "@/_orchestrator/OrchestDashboard/property/PropertyindexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/orchestrator/_orchestrator_layout/_console/property/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <PropertyIndexPage />
    </>
  );
}
