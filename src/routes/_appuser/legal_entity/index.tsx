import { LegalEntityIndexPage } from "@/app/legal_entity/pages/LegalEntityIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/legal_entity/")({
  component: LegalEntityIndexPage,
});
