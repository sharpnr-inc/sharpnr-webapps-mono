import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import SettingOverviewSection from "@/components/hospitality_module/settings/SettingsOverviewSection";
import SettingsNotificationSection from "@/components/hospitality_module/settings/SettingsNotificationSection";
import SettingsUserSection from "@/components/hospitality_module/settings/SettingsUserSection";
import SettingPaymentsSection from "@/components/hospitality_module/settings/SettingsPaymentsSection";
import SettingRoomConfiguration from "@/components/hospitality_module/settings/SettingsRoomConfiguration";
import SettingsRestaurantConfigSection from "@/components/hospitality_module/settings/SettingsRestraurantConfigSection";

export default function SharpHospitalitySettings() {
  const [activeTab, setActiveTab] = React.useState("general");

  return (
    <div className="p-2 space-y-6">
      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full h-auto flex-wrap justify-start gap-1 sticky top-18 left-0 right-0">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="rooms_config">Room Configuration</TabsTrigger>
          <TabsTrigger value="restaurant_config">
            Restaurant Configuration
          </TabsTrigger>
        </TabsList>


        {/* --- GENERAL --- */}
        <TabsContent value="general">
          <SettingOverviewSection />
        </TabsContent>

        {/* --- NOTIFICATIONS --- */}
        <TabsContent value="notifications">
          <SettingsNotificationSection />
        </TabsContent>

        {/* --- USERS --- */}
        <TabsContent value="users">
          <SettingsUserSection />
        </TabsContent>

        {/* --- PAYMENTS --- */}
        <TabsContent value="payments">
          <SettingPaymentsSection />
        </TabsContent>

        {/* --- ROOMS CONFIG --- */}
        <TabsContent value="rooms_config">
          <SettingRoomConfiguration />
        </TabsContent>

        {/* --- RESTAURANT CONFIG --- */}
        <TabsContent value="restaurant_config">
          <SettingsRestaurantConfigSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
