import LibraryViewPage from "@/folio/pages/LibraryViewPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/boards/")({
  component: () => (
    <LibraryViewPage
      title="Whiteboards"
      description="Visual collaboration for diagrams and planning."
      filter={{ type: "kind", kind: "board" }}
    />
  ),
});
