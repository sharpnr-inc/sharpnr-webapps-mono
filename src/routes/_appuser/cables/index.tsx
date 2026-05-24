import { CablesIndexPage } from "@/app/cables/pages/CablesIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/cables/")({
  component: CablesIndexPage,
});
