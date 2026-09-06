import FolioIndexPage from "@/app/folio/pages/FolioIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/folio/")({
  component: FolioIndexPage,
});
