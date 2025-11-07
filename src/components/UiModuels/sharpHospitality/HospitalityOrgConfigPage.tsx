"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// ✅ Import all section components
import OverviewSection from "@/components/hospitality_module/org_configs/OverviewSection";

import BarConfigSection from "@/components/hospitality_module/org_configs/BarConfigSection";
import HotelConfigSection from "@/components/hospitality_module/org_configs/HotelConfigSection";
import OwnersSection from "@/components/hospitality_module/org_configs/OwnersSection";
import RegLicenseSection from "@/components/hospitality_module/org_configs/RegLicenseSection";
import IntegrationSection from "@/components/hospitality_module/org_configs/IntegrationSection";
import GstSection from "@/components/hospitality_module/org_configs/GstSection";
import BrandingSection from "@/components/hospitality_module/org_configs/BrandingSection";
import CustomerSupportSection from "@/components/hospitality_module/org_configs/CustomerSupportSection";
import RestaurantConfigSection from "@/components/hospitality_module/org_configs/RestaurantConfigSection";


export default function HospitalityOrgConfigPage() {
  const [tab, setTab] = useState("overview");

  return (
    <div className="p-2">
      <Tabs value={tab} onValueChange={setTab}>
        {/* ---- Tab List ---- */}
        <TabsList className="w-full h-full flex flex-wrap gap-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="restaurant_config">Restaurant Configs</TabsTrigger>
          <TabsTrigger value="bar_config">Bar Configs</TabsTrigger>
          <TabsTrigger value="hotel_config">Hotel Configs</TabsTrigger>
          <TabsTrigger value="owners">Owners</TabsTrigger>
          <TabsTrigger value="reg_license">Registration & Licenses</TabsTrigger>
          <TabsTrigger value="integration">Integrations</TabsTrigger>
          <TabsTrigger value="gst">GST & Taxes</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="customer_support">Customer Support</TabsTrigger>
        </TabsList>

        {/* ---- Tab Contents ---- */}
        <TabsContent value="overview">
          <OverviewSection />
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

        <TabsContent value="integration">
          <IntegrationSection />
        </TabsContent>

        <TabsContent value="gst">
          <GstSection />
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
