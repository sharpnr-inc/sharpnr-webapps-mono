import { PropertyDetailsPage } from "@/_orchestrator/properties/property/PropertyDetailsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/property/$propertyId/details")({
  component: RouteComponent,
  staticData: {
    breadcrumb: "Property Detail",
  },
});

function RouteComponent() {
  const { propertyId } = Route.useParams();
  return (
    <div>
      <PropertyDetailsPage propertyId={propertyId} />
    </div>
  );
}
