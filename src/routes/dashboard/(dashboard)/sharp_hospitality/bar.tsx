import BarPage from "@/_hospitalityapp/pages/bar/BarPage";
import { createFileRoute } from "@tanstack/react-router";
import {GlassWaterIcon} from "lucide-react"

export const Route = createFileRoute("/dashboard/(dashboard)/sharp_hospitality/bar")({
  component: BarPage,
  context: () => ({
    heading: "Dearie Bar",
    subheading: "Manage Bar operations",
    HeaderIcon:GlassWaterIcon
  }),
});
