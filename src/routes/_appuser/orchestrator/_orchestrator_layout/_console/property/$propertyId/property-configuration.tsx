import { PropertyConfigurationPage } from "@/_orchestrator/OrchestDashboard/property/property_configuration/Property_ConfigPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/orchestrator/_orchestrator_layout/_console/property/$propertyId/property-configuration",
)({
  validateSearch: (search) => ({
    p_name: typeof search.p_name === "string" ? search.p_name : undefined,
  }),
  component: PropertyConfigurationPage,
  staticData:{
    breadcrumb:"Property Configuration"
  }
});
