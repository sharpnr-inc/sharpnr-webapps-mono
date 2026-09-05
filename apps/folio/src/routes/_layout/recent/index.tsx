import LibraryViewPage from "@/folio/pages/LibraryViewPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/recent/")({
  component: () => (
    <LibraryViewPage
      title="Recent"
      description="Everything you and your team touched most recently."
      filter={{ type: "recent" }}
    />
  ),
});
