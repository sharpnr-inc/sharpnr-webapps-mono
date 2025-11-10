import { createFileRoute } from "@tanstack/react-router";
import SharpHospitalitySettings from "@/components/RoutesPages/sharpHospitality/SettingsPage";
import { Settings2Icon } from "lucide-react";

export const Route = createFileRoute("/dashboard/_layout/sharp_hospitality/settings")({
  component: SharpHospitalitySettings,
  context: () => ({
    heading: "Settings",
    subheading: "Configure the Organisations",
    HeaderIcon: Settings2Icon,
  }),
});
