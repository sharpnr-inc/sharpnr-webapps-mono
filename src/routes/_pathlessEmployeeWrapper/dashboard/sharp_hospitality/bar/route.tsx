import { BarSideBarWrapper } from "@/_hospitalityapp/Bar/components/BarSideBarWrapper";
import { createFileRoute } from "@tanstack/react-router";
import { GlassWaterIcon } from "lucide-react";

export const Route = createFileRoute("/_pathlessEmployeeWrapper/dashboard/sharp_hospitality/bar")({
  component: BarSideBarWrapper,
  context: () => ({
    heading: "Dearie Bar",
    subheading: "Manage Bar operations",
    HeaderIcon: GlassWaterIcon,
  }),
});
