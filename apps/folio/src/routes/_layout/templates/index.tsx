import TemplatesIndexPage from "@/folio/pages/TemplatesIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/templates/")({
  component: TemplatesIndexPage,
});
