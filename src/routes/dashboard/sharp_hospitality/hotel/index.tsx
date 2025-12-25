// In your route file
import SharpHospitalityHotelPage from "@/_hospitalityapp/Hotel/pages/HotelPage";
import { createFileRoute } from "@tanstack/react-router";

// Define the search params type
type HotelSearch = {
  tab: string;
};

export const Route = createFileRoute(
  "/dashboard/sharp_hospitality/hotel/"
)({
  validateSearch: (search: Record<string, unknown>): HotelSearch => ({
    tab: typeof search.tab === 'string' ? search.tab : "booking",
  }),
  component: SharpHospitalityHotelPage,
});