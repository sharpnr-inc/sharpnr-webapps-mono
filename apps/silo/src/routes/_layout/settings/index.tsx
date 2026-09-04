import SettingsIndexPage from "@/app/settings/pages/SettingsIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/settings/")({
  component: SettingsIndexPage,
});
