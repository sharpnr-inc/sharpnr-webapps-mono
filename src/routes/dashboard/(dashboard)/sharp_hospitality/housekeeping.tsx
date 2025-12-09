import HouseKeepingPage from "@/components/RoutesPages/sharpHospitality/HouseKeepingPage";
import { createFileRoute } from "@tanstack/react-router";
import { Hotel } from "lucide-react";

export const Route = createFileRoute(
  "/dashboard/(dashboard)/sharp_hospitality/housekeeping"
)({
  component: HouseKeepingPage,
  context: () => ({
    heading: "House Keeping",
    subheading: "Manage Hotel operations",
    HeaderIcon: Hotel,
  }),
});
