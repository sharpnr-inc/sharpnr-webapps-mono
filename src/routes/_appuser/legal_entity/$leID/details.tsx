import LegalEntityDetailsPage from "@/app/legal_entity/LegalEntityDetailsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/legal_entity/$leID/details")({
  component: LegalEntityDetailsPage,
});
