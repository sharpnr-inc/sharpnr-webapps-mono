import IntegrationsIndexPage from "@/app/integrations/pages/IntegrationsIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/integrations/")({
  component: IntegrationsIndexPage,
});
