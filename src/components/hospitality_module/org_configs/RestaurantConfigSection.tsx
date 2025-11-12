"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RestaurantConfigGst from "./restaurantConfigs/RestaurantConfigGst";
import RestaurantConfigPreview from "./restaurantConfigs/RestaurantConfigPreview";
import RestaurantConfigLayout from "./restaurantConfigs/RestaurantConfigLayout";
import RestaurantConfigLicense from "./restaurantConfigs/RestaurantConfigLicense";
import RestaurantConfigPayment from "./restaurantConfigs/RestaurantConfigPayment";
import RestaurantConfigCharges from "./restaurantConfigs/RestaurantConfigCharges";
import RestaurantConfigGeneral from "./restaurantConfigs/RestaurantConfigGeneral";

export default function RestaurantConfigSection() {
  return (
    <div className=" flex flex-col gap-2">
      <Tabs defaultValue="1">
        <TabsList>
          <TabsTrigger value="0">Preview</TabsTrigger>
          <TabsTrigger value="1">General</TabsTrigger>
          <TabsTrigger value="2">GST&Tax</TabsTrigger>
          <TabsTrigger value="3">layout</TabsTrigger>
          <TabsTrigger value="4">license</TabsTrigger>
          <TabsTrigger value="5">Payment Integration</TabsTrigger>
          <TabsTrigger value="6">charges</TabsTrigger>
        </TabsList>

        <TabsContent value="0">
          <RestaurantConfigPreview />
        </TabsContent>

        <TabsContent value="1">
          <RestaurantConfigGeneral />
        </TabsContent>

        <TabsContent value="2">
          <RestaurantConfigGst />
        </TabsContent>

        <TabsContent value="3">
          <RestaurantConfigLayout />
        </TabsContent>

        <TabsContent value="4">
          <RestaurantConfigLicense />
        </TabsContent>

        <TabsContent value="5">
          <RestaurantConfigPayment />
        </TabsContent>

        <TabsContent value="6">
          <RestaurantConfigCharges />
        </TabsContent>
      </Tabs>
    </div>
  );
}
