import { createFileRoute } from "@tanstack/react-router";
import SharpHospitalitySettings from "@/_hospitalityapp/pages/settings/SettingsPage";
import { Settings2Icon } from "lucide-react";

export const Route = createFileRoute("/dashboard/(dashboard)/sharp_hospitality/settings")({
  component: SharpHospitalitySettings,
  context: () => ({
    heading: "Settings",
    subheading: "Configure the Organisations",
    HeaderIcon: Settings2Icon,
  }),
});
