import HouseKeepingPage from "@/components/UiModuels/sharpHospitality/HouseKeepingPage";
import { createFileRoute } from "@tanstack/react-router";
import { Hotel } from "lucide-react";

export const Route = createFileRoute(
  "/dashboard/_layout/sharp_hospitality/housekeeping"
)({
  component: HouseKeepingPage,
  context: () => ({
    heading: "House Keeping",
    subheading: "Manage Hotel operations",
    HeaderIcon: Hotel,
  }),
});
