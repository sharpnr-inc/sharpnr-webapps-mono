import DriveIndexPage from "@/app/drive/pages/DriveIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/drive/")({
  component: DriveIndexPage,
});
