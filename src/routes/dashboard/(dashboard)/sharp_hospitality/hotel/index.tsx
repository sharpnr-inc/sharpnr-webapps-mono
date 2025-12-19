import SharpHospitalityHotelPage from "@/_hospitalityapp/pages/hotel/HotelPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/dashboard/(dashboard)/sharp_hospitality/hotel/"
)({
  validateSearch: (search) => ({
    tab: (search.tab as string) ?? "booking",
  }),
  component: SharpHospitalityHotelPage,
});
