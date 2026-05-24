import { PropertyConfigurationPage } from "@/app/property/components/Property_ConfigPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/property/$propertyId/property-configuration",
)({
  validateSearch: (search) => ({
    p_name: typeof search.p_name === "string" ? search.p_name : undefined,
    p_domain: typeof search.p_domain === "string" ? search.p_domain : "",
  }),
  component: PropertyConfigurationPage,
  staticData: {
    breadcrumb: "Property Configuration",
  },
});
