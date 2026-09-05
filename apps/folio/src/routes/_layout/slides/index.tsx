import LibraryViewPage from "@/folio/pages/LibraryViewPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/slides/")({
  component: () => (
    <LibraryViewPage
      title="Presentations"
      description="Slide decks built and delivered on the platform."
      filter={{ type: "kind", kind: "slides" }}
    />
  ),
});
