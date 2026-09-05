import LibraryViewPage from "@/folio/pages/LibraryViewPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/sheets/")({
  component: () => (
    <LibraryViewPage
      title="Spreadsheets"
      description="Calculations, lists and lightweight data work."
      filter={{ type: "kind", kind: "sheet" }}
    />
  ),
});
