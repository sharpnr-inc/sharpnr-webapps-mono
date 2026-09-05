import LibraryViewPage from "@/folio/pages/LibraryViewPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/markdown/")({
  component: () => (
    <LibraryViewPage
      title="Markdown"
      description="Plain-text writing with structure."
      filter={{ type: "kind", kind: "markdown" }}
    />
  ),
});
