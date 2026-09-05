import LibraryViewPage from "@/folio/pages/LibraryViewPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/pdfs/")({
  component: () => (
    <LibraryViewPage
      title="PDFs"
      description="Contracts, reports and scans — reviewed and annotated in place."
      filter={{ type: "kind", kind: "pdf" }}
    />
  ),
});
