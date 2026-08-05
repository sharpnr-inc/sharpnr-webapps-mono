import { AnnouncementsPage } from "@/app/Announcements/AnnouncementsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/annoucements/")({
  component: AnnouncementsPage,
});
