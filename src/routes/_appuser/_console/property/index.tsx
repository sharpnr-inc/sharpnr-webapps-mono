import { PropertyIndexPage } from "@/_orchestrator/properties/property/PropertyindexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/_console/property/",
)({
  component: RouteComponent,
  staticData: {
    breadcrumb: "Property",
  },
});

function RouteComponent() {
  return (
    <>
      <PropertyIndexPage />
    </>
  );
}
