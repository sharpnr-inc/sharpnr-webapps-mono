import { JournalPage } from "@/app/pages/Journal/JournalPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/journal/")({
  component: JournalPage,
});
