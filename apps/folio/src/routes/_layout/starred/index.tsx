import LibraryViewPage from "@/folio/pages/LibraryViewPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/starred/")({
  component: () => (
    <LibraryViewPage
      title="Starred"
      description="The files you marked to come back to."
      filter={{ type: "starred" }}
    />
  ),
});
