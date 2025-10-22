import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import React from "react";
import SettingOverviewSection from "@/components/hospitality_module/settings/SettingsOverviewSection";
import SettingsNotificationSection from "@/components/hospitality_module/settings/SettingsNotificationSection";
import SettingsUserSection from "@/components/hospitality_module/settings/SettingsUserSection";
import SettingPaymentsSection from "@/components/hospitality_module/settings/SettingsPaymentsSection";
import SettingRoomConfiguration from "@/components/hospitality_module/settings/SettingsRoomConfiguration";
import SettingsRestaurantConfigSection from "@/components/hospitality_module/settings/SettingsRestraurantConfigSection";

export default function SharpHospitalitySettings() {
  const [activeTab, setActiveTab] = React.useState("general");

  const handleSelect = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="p-2 space-y-6">
      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-max hidden xl:flex p-1 space-x-2 max-w-full">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="rooms_config">Room Configuration</TabsTrigger>
          <TabsTrigger value="restaurant_config">
            Restaurant Configuration
          </TabsTrigger>
        </TabsList>

        {/* --- Mobile Dropdown --- */}
        <div className="xl:hidden mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full capitalize">
                {activeTab.replaceAll("_", " ")}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Settings Sections</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => handleSelect("general")}>
                General
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleSelect("notifications")}>
                Notifications
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleSelect("users")}>
                Users
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleSelect("payments")}>
                Payments
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleSelect("rooms_config")}>
                Room Configuration
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => handleSelect("restaurant_config")}
              >
                Restaurant Configuration
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

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
