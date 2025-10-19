import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HotelBookingSection from "@/components/hospitality_module/hotel/HotelBookingSection";
import HotelOverviewSection from "@/components/hospitality_module/hotel/HotelOverviewSection";
import HotelRequestSection from "@/components/hospitality_module/hotel/HotelRequestSection";
import HotelRoomMgmSection from "@/components/hospitality_module/hotel/HotelRoomMgmSection";

export default function SharpHospitalityHotelPage() {
  return (
    <div>
      <div className="p-2 border-b-2">
        <div className="text-3xl font-semibold">Hotel</div>
        <p className="">THis is Hotel Page</p>
      </div>{" "}
      <div className="mt-2">
        {/* Tabs Section */}
        <Tabs defaultValue="overview" className="w-full">
          <div className="">
            <TabsList className=" w-max p-1 space-x-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="booking">Bookings</TabsTrigger>
              <TabsTrigger value="request">Request</TabsTrigger>
              <TabsTrigger value="rooms_config">Room Management</TabsTrigger>
            </TabsList>
          </div>

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
    </div>
  );
}
