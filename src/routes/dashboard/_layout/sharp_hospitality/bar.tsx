import BarPage from "@/components/RoutesPages/sharpHospitality/BarPage";
import { createFileRoute } from "@tanstack/react-router";
import {GlassWaterIcon} from "lucide-react"

export const Route = createFileRoute("/dashboard/_layout/sharp_hospitality/bar")({
  component: BarPage,
  context: () => ({
    heading: "Dearie Bar",
    subheading: "Manage Bar operations",
    HeaderIcon:GlassWaterIcon
  }),
});
