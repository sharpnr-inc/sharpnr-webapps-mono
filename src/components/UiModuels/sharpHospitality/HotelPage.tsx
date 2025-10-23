import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HotelBookingSection from "@/components/hospitality_module/hotel/HotelBookingSection";
import HotelOverviewSection from "@/components/hospitality_module/hotel/HotelOverviewSection";
import HotelRequestSection from "@/components/hospitality_module/hotel/HotelRequestSection";
import HotelRoomMgmSection from "@/components/hospitality_module/hotel/HotelRoomMgmSection";
import React from "react";


export default function SharpHospitalityHotelPage() {
  const [activeTab, setActiveTab] = React.useState("overview");
  // const {success,info} = useToastService();

  // useEffect(() => {
  //   success("You have New Booking")
  // })
  return (
    <div className="p-2">
      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="">
        <TabsList className="w-full h-auto flex-wrap justify-start gap-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="booking">Bookings</TabsTrigger>
          <TabsTrigger value="request">Request</TabsTrigger>
          <TabsTrigger value="rooms_config">Room Management</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <HotelOverviewSection />
        </TabsContent>

        <TabsContent value="booking">
          <HotelBookingSection />
        </TabsContent>

        <TabsContent value="request">
          <HotelRequestSection />
        </TabsContent>

        <TabsContent value="rooms_config">
          <HotelRoomMgmSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
