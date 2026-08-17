import { JournalPage } from "@/app/general-ledger/JournalPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/journal/")({
  component: JournalPage,
});
