import LibraryViewPage from "@/folio/pages/LibraryViewPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/shared/")({
  component: () => (
    <LibraryViewPage
      title="Shared with me"
      description="Files other people in your organization shared with you."
      filter={{ type: "shared" }}
    />
  ),
});
