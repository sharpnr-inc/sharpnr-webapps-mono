import { HotelRootLayout } from "@/_hospitalityapp/Hotel/components/HotelRootLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/dashboard/sharp_hospitality/hotel",
)({
  beforeLoad: ({}) => {
    return {
      activePropertyId: "44c5706a-50f4-4c30-8802-000c7148aaf4",
      activeHotelID: "ac75bfe4-e526-4bef-aef3-8ca4b92a35e9",
    };
  },
  loader: async () => {
    return {
      propertyID: "44c5706a-50f4-4c30-8802-000c7148aaf4",
      hotelID: "ac75bfe4-e526-4bef-aef3-8ca4b92a35e9",
    };
  },
  component: HotelRootLayout,
  staticData: {
    breadcrumb: "Hotel",
  },
});
