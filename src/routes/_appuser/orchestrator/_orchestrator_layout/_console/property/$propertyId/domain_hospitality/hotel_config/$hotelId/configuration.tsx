import { HotelConfigurationPage } from "@/_orchestrator/properties/hospitality_configs/hotel/HotelConfigurationPage";
import { createFileRoute } from "@tanstack/react-router";

// TODO Create the Query for the fetching data if Hotel is configured or not via hotelID in Params
// If not configured then continue or else throw the to /hotel_dash
// LINK http://192.168.1.33:5173/orchestrator/property/ml59n04g-k2khpzgs/domain_hospitality/hotel_config/ml59v3qk-5q79ufs7/configuration
export const Route = createFileRoute(
  "/_appuser/orchestrator/_orchestrator_layout/_console/property/$propertyId/domain_hospitality/hotel_config/$hotelId/configuration",
)({
  beforeLoad: ({ params }) => {
    // You can access them here
    const { propertyId, hotelId } = params;

    return {
      propertyId,
      hotelId,
    };
  },
  component: HotelConfigurationPage,
});
