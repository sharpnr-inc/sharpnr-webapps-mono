"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RestaurantConfigGst from "./restaurantConfigs/RestaurantConfigGst";
import RestaurantConfigLayout from "./restaurantConfigs/RestaurantConfigLayout";
import RestaurantConfigLicense from "./restaurantConfigs/RestaurantConfigLicense";
import RestaurantConfigPayment from "./restaurantConfigs/RestaurantConfigPayment";
import RestaurantConfigCharges from "./restaurantConfigs/RestaurantConfigCharges";
import RestaurantConfigGeneral from "./restaurantConfigs/RestaurantConfigGeneral";
import { useRestaurantDetails } from "@/api_service/queries/HospitalityQueries/Restaurant";

export default function RestaurantConfigSection() {
  const { data, error, fetchStatus } = useRestaurantDetails();
  console.log(data?.data);

  return (
    <div className=" flex flex-col gap-2">
      <Tabs defaultValue="1">
        <TabsList>
          <TabsTrigger value="1">General</TabsTrigger>
          <TabsTrigger value="2">GST&Tax</TabsTrigger>
          <TabsTrigger value="3">layout</TabsTrigger>
          <TabsTrigger value="4">license</TabsTrigger>
          <TabsTrigger value="5">Payment Integration</TabsTrigger>
          <TabsTrigger value="6">charges</TabsTrigger>
        </TabsList>

        <TabsContent value="1">
          <RestaurantConfigGeneral dta={data?.data}/>
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
