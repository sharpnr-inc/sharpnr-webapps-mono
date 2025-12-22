import KitchenPage from "@/_hospitalityapp/Kitchen/pages/KitchenPage";
import { createFileRoute } from "@tanstack/react-router";
import {CookingPotIcon} from "lucide-react"

export const Route = createFileRoute("/dashboard/(dashboard)/sharp_hospitality/kitchen")({
  component: KitchenPage,
  context: () => ({
    heading: "Kitchen",
    subheading: "Manage kitchen operations",
    HeaderIcon:CookingPotIcon
  }),
});
