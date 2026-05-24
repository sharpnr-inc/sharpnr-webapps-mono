import { DescovroIntegrationIndexPage } from "@/app/descovro_integrations/pages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/descovro_integrations/")({
  component: DescovroIntegrationIndexPage,
});
