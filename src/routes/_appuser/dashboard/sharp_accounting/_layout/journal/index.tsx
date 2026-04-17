import { JournalPage } from "@/_accountingapp/pages/Journal/JournalPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/dashboard/sharp_accounting/_layout/journal/",
)({
  component: JournalPage,
});
