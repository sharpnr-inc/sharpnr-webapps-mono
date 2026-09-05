import LibraryViewPage from "@/folio/pages/LibraryViewPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/trash/")({
  component: () => (
    <LibraryViewPage
      title="Trash"
      description="Deleted items, recoverable until they are purged."
      filter={{ type: "trash" }}
    />
  ),
});
