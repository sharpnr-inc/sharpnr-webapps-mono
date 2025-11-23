import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewSection from "@/components/hospitality_module/org_configs/OverviewSection";
import BarConfigSection from "@/components/hospitality_module/org_configs/BarConfigSection";
import HotelConfigSection from "@/components/hospitality_module/org_configs/HotelConfigSection";
import OwnersSection from "@/components/hospitality_module/org_configs/OwnersSection";
import RegLicenseSection from "@/components/hospitality_module/org_configs/RegLicenseSection";
import BrandingSection from "@/components/hospitality_module/org_configs/BrandingSection";
import CustomerSupportSection from "@/components/hospitality_module/org_configs/CustomerSupportSection";
import RestaurantConfigSection from "@/components/hospitality_module/org_configs/RestaurantConfigSection";
import ORGConfigSection from "@/components/hospitality_module/org_configs/ORGconfig";

export default function HospitalityOrgConfigPage() {
  const [tab, setTab] = useState("overview");

  /*
    TODO : Complete the API integrations

    *1. Create An API to Fetching the Data
    *2. Create an Tanstack From and set default data from the Step 1
    
  */

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
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="customer_support">Customer Support</TabsTrigger>
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

        <TabsContent value="owners">
          <OwnersSection />
        </TabsContent>

        <TabsContent value="reg_license">
          <RegLicenseSection />
        </TabsContent>

        <TabsContent value="branding">
          <BrandingSection />
        </TabsContent>

        <TabsContent value="customer_support">
          <CustomerSupportSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
