import LibraryViewPage from "@/folio/pages/LibraryViewPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/notes/")({
  component: () => (
    <LibraryViewPage
      title="Notes"
      description="Quick capture that becomes your knowledge base."
      filter={{ type: "kind", kind: "note" }}
    />
  ),
});
