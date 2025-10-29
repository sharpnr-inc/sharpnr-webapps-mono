import KitchenPage from "@/components/UiModuels/sharpHospitality/KitchenPage";
import { createFileRoute } from "@tanstack/react-router";
import {CookingPotIcon} from "lucide-react"

export const Route = createFileRoute("/dashboard/_layout/sharp_hospitality/kitchen")({
  component: KitchenPage,
  context: () => ({
    heading: "Kitchen",
    subheading: "Manage kitchen operations",
    HeaderIcon:CookingPotIcon
  }),
});
