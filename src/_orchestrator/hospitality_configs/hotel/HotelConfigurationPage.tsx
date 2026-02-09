// This page is for configuring the hotel of hospitality domain
// This is page implement the multiple phases for the setting up the hotel
// So this page when user first arrives to setup or configure the hotel

import { HotelOpTimingConfiguration } from "./components/HotelOpTimingConfiguration";

import CreateHotelAmenitiesForm from "./forms/CreateHotelAmenitiesForm";
import CreateHotelRoomTypes from "./forms/CreateHotelRoomTypes";
import { Route } from "@/routes/_appuser/orchestrator/_orchestrator_layout/_console/property/$propertyId/domain_hospitality/hotel_config/$hotelId/configuration";
import CreateHotelRoomAddonForm from "./forms/CreateHotelRoomAddonForm";
import CreateMenuForm from "./forms/CreateMenuForm";
import CreateHotelFloorConfig from "./forms/CreateFloorConfig";


export function HotelConfigurationPage() {
  const { hotelId, propertyId } = Route.useParams();
  console.log(hotelId);
  console.log(propertyId);

  return (
    <div className="space-y-2 p-4">
      <HotelOpTimingConfiguration hotelID={hotelId} propertyID={propertyId} />
      <CreateHotelAmenitiesForm hotelID={hotelId} propertyID={propertyId} />
      <CreateHotelRoomAddonForm hotelID={hotelId} propertyID={propertyId} />
      <CreateHotelRoomTypes hotelID={hotelId} propertyID={propertyId} />
      <CreateHotelFloorConfig hotelID={hotelId} propertyID={propertyId} />
      {/* <CreateMenuForm hotelID={hotelId} propertyID={propertyId} /> */}
    </div>
  );
}
