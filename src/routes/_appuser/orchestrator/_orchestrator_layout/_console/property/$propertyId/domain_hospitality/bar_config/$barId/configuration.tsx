import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/orchestrator/_orchestrator_layout/_console/property/$propertyId/domain_hospitality/bar_config/$barId/configuration",
)({
  beforeLoad: ({ params }) => {
    // You can access them here
    const { propertyId, barId } = params;
    console.log(barId)

    return {
      propertyId,
      barId,
    };
  },

  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello
      "/_appuser/orchestrator/_orchestrator_layout/_console/property/$propertyId/domain_hospitality/bar_config/$barId/configuration"!
    </div>
  );
}
