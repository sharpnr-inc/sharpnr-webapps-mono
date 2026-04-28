import { SettingsPage } from "@/app/pages/Settings/SettingPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/settings/")({
  component: SettingsPage,
});
