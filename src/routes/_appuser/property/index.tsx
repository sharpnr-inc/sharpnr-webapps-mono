import { PropertyIndexPage } from "@/app/property/pages/PropertyindexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/property/")({
  component: RouteComponent,
  staticData: {
    breadcrumb: "Property Home",
  },
});

function RouteComponent() {
  return (
    <>
      <PropertyIndexPage />
    </>
  );
}
