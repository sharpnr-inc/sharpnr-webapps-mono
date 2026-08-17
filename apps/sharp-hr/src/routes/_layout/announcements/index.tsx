import { AnnouncementsPage } from "@/app/announcements/pages/AnnouncementsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/announcements/")({
  component: AnnouncementsPage,
});
