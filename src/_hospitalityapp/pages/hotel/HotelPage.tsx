import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HotelBookingSection from "@/_hospitalityapp/sections/hotel/HotelBookingSection";
import HotelOverviewSection from "@/_hospitalityapp/sections/hotel/HotelOverviewSection";
import HotelRequestSection from "@/_hospitalityapp/sections/hotel/HotelRequestSection";
import React from "react";
import { useUIRenderer } from "@/context/ui-rendererContext";


// This is the page we need Apis for the fetching the Details 
export default function SharpHospitalityHotelPage() {
  const [activeTab, setActiveTab] = React.useState("overview");

  const { hasSubSectionAccess } = useUIRenderer();
  return (
    <div className="p-2">
      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="">
        <TabsList className="w-full h-auto flex-wrap justify-start gap-1">
          {hasSubSectionAccess("sharp_hospitality", "hotel", "overview") && (
            <TabsTrigger defaultValue={"overview"} value="overview">
              Overview
            </TabsTrigger>
          )}
          <TabsTrigger value="booking">Bookings</TabsTrigger>
          <TabsTrigger value="request">Request</TabsTrigger>
          {/* <TabsTrigger value="rooms_config">Room Management</TabsTrigger> */}
        </TabsList>

        {hasSubSectionAccess("sharp_hospitality", "hotel", "overview") && (
          <TabsContent value="overview">
            <HotelOverviewSection />
          </TabsContent>
        )}

        <TabsContent value="booking">
          <HotelBookingSection />
        </TabsContent>

        <TabsContent value="request">
          <HotelRequestSection />
        </TabsContent>

        {/* <TabsContent value="rooms_config">
          <HotelRoomMgmSection />
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
