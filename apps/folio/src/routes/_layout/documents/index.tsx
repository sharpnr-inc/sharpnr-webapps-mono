import LibraryViewPage from "@/folio/pages/LibraryViewPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/documents/")({
  component: () => (
    <LibraryViewPage
      title="Documents"
      description="Rich text documents — notes, policies, proposals."
      filter={{ type: "kind", kind: "doc" }}
    />
  ),
});
