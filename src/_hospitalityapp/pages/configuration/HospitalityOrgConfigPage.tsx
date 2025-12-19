import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewSection from "@/_hospitalityapp/sections/org_configs/OverviewSection";
import BarConfigSection from "@/_hospitalityapp/sections/org_configs/BarConfigSection";
import HotelConfigSection from "@/_hospitalityapp/sections/org_configs/HotelConfigSection";
import RestaurantConfigSection from "@/_hospitalityapp/sections/org_configs/RestaurantConfigSection";
import ORGConfigSection from "@/_hospitalityapp/sections/org_configs/ORGconfig";

export default function HospitalityOrgConfigPage() {
  /************
   *  Hooks *
   ************/
  const [tab, setTab] = useState("overview");

  return (
    <div className="p-2">
      <Tabs value={tab} onValueChange={setTab}>
        {/* ---- Tab List ---- */}
        <TabsList className="w-full h-full flex flex-wrap gap-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="2">ORG</TabsTrigger>
          <TabsTrigger value="restaurant_config">
            Restaurant Configs
          </TabsTrigger>
          <TabsTrigger value="bar_config">Bar Configs</TabsTrigger>
          <TabsTrigger value="hotel_config">Hotel Configs</TabsTrigger>
        </TabsList>

        {/* ---- Tab Contents ---- */}
        <TabsContent value="overview">
          <OverviewSection />
        </TabsContent>

        <TabsContent value="2">
          <ORGConfigSection />
        </TabsContent>

        <TabsContent value="restaurant_config">
          <RestaurantConfigSection />
        </TabsContent>

        <TabsContent value="bar_config">
          <BarConfigSection />
        </TabsContent>

        <TabsContent value="hotel_config">
          <HotelConfigSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
