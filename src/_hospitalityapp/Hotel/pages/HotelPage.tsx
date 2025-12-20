import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HotelBookingSection from "../sections/HotelBookingSection";
import HotelOverviewSection from "../sections/HotelOverviewSection";
import HotelRequestSection from "../sections/HotelRequestSection";
import { useUIRenderer } from "@/context/ui-rendererContext";
import { Route } from "@/routes/dashboard/(dashboard)/sharp_hospitality/hotel";

// This is the page we need APIs for fetching the details
export default function SharpHospitalityHotelPage() {
   const search = Route.useSearch() as { tab: string };
    const { tab } = search;
  const navigate = Route.useNavigate();


  const { hasSubSectionAccess } = useUIRenderer();

  const activeTab = tab;

  return (
    <div className="p-2">
      <Tabs
        value={activeTab}
        onValueChange={(nextTab) =>
          navigate({
            search: {
              tab: nextTab,
            },
            replace: true,
          })
        }
      >
        <TabsList className="w-full">
          {hasSubSectionAccess("sharp_hospitality", "hotel", "overview") && (
            <TabsTrigger value="overview">Overview</TabsTrigger>
          )}
          <TabsTrigger value="booking">Bookings</TabsTrigger>
          <TabsTrigger value="request">Request</TabsTrigger>
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
      </Tabs>
    </div>
  );
}
