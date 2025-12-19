import SharpHospitalityHotelPage from "@/_hospitalityapp/Hotel/pages/HotelPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/dashboard/(dashboard)/sharp_hospitality/hotel/"
)({
  validateSearch: (search) => ({
    tab: (search.tab as string) ?? "booking",
  }),
  component: SharpHospitalityHotelPage,
});
