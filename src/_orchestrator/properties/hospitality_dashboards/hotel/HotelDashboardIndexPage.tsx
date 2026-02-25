import { HotelOpTimingConfiguration } from "@/_orchestrator/properties/hospitality_configs/hotel/components/HotelOpTimingConfiguration";
import CreateHotelFloorConfig from "@/_orchestrator/properties/hospitality_configs/hotel/forms/CreateFloorConfig";
import CreateHotelAmenitiesForm from "@/_orchestrator/properties/hospitality_configs/hotel/forms/CreateHotelAmenitiesForm";
import CreateHotelRoomAddonForm from "@/_orchestrator/properties/hospitality_configs/hotel/forms/CreateHotelRoomAddonForm";
import CreateHotelRoomTypes from "@/_orchestrator/properties/hospitality_configs/hotel/forms/CreateHotelRoomTypes";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent, TabsList } from "@radix-ui/react-tabs";
import {
  ArrowLeft,
  BedDouble,
  Clock,
  Layers,
  PlusCircle,
  Sparkles,
} from "lucide-react";

interface HotelDashboardIndexPageProps {
  hotelID: string;
  propertyID: string;
}

const HotelDashboardIndexPage: React.FC<HotelDashboardIndexPageProps> = ({
  hotelID,
  propertyID,
}) => {
  return (
    <div className="">
      {/* Header Section */}
      <div className="p-2 space-y-1.5">
        <Button variant={"link"}>
          <ArrowLeft></ArrowLeft>Back to Property
        </Button>
        <div className="text-2xl font-semibold tracking-tight">Hotel Name</div>
        <div className="text-green-500 text-sm font-medium">Active</div>
        <Separator className="my-2" />
      </div>

      {/* Configuration Tabs */}
      <Tabs defaultValue="timing">
        <TabsList>
          <TabsTrigger value="timing">
            <Clock size={16} />
            <span className="hidden md:inline">Timing</span>
          </TabsTrigger>

          <TabsTrigger value="room-types">
            <BedDouble size={16} />
            <span className="hidden md:inline">Rooms</span>
          </TabsTrigger>

          <TabsTrigger value="floors">
            <Layers size={16} />
            <span className="hidden md:inline">Floors</span>
          </TabsTrigger>

          <TabsTrigger value="amenities">
            <Sparkles size={16} />
            <span className="hidden md:inline">Amenities</span>
          </TabsTrigger>

          <TabsTrigger value="addons">
            <PlusCircle size={16} />
            Add-ons
          </TabsTrigger>
        </TabsList>

        {/* Tab Contents */}

        <TabsContent value="timing">
          <HotelOpTimingConfiguration
            hotelID={hotelID}
            propertyID={propertyID}
          />
        </TabsContent>

        <TabsContent value="room-types">
          <CreateHotelRoomTypes hotelID={hotelID} propertyID={propertyID} />
        </TabsContent>

        <TabsContent value="floors">
          <CreateHotelFloorConfig hotelID={hotelID} propertyID={propertyID} />
        </TabsContent>

        <TabsContent value="amenities">
          <CreateHotelAmenitiesForm hotelID={hotelID} propertyID={propertyID} />
        </TabsContent>

        <TabsContent value="addons">
          <CreateHotelRoomAddonForm hotelID={hotelID} propertyID={propertyID} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HotelDashboardIndexPage;
