import LegalEntityDetailsPage from "@/_orchestrator/legal_entity/LegalEntityDetailsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/_console/legal_entity/$leID/details",
)({
  component: LegalEntityDetailsPage,
});
