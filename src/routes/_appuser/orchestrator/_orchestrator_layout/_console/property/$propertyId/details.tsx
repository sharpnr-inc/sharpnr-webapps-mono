import { PropertyDetailsPage } from "@/_orchestrator/OrchestDashboard/properties/PropertyDetailsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/orchestrator/_orchestrator_layout/_console/property/$propertyId/details",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { propertyId } = Route.useParams();
  return (
    <div>
      <PropertyDetailsPage propertyId={propertyId} />
    </div>
  );
}
