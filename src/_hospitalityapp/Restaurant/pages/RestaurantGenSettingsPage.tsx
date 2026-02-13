import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import RestaurantTimingSettings from "../components/GeneralSettings/RestaurantTimingSettings";
import RestaurantKitchenSettings from "../components/GeneralSettings/RestaurantKitchenSettings";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MenuSettings from "@/_hospitalityapp/infra/Menu/components/MenuSettings";
import { Route } from "@/routes/_appuser/dashboard/sharp_hospitality/restaurant/route";
import { ScrollArea } from "@/components/ui/scroll-area";

interface RestaurantGenSettingsPageProps {}

const RestaurantGenSettingsPage: React.FC<
  RestaurantGenSettingsPageProps
> = () => {
  const { properties } = Route.useLoaderData();
  const selectedProperty = properties?.[0];
  const restaurantID = selectedProperty?.Restaurents;
  return (
    <div className="w-full mt-4 space-y-2">
      <Card>
        <CardHeader>
          <CardTitle>Restaurant's General Settings</CardTitle>
          <CardDescription>
            Here you can Configure Restaurant General Setting,
          </CardDescription>
        </CardHeader>
      </Card>
      <Tabs defaultValue="operation_timings" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="operation_timings">Operation Timing</TabsTrigger>
          <TabsTrigger value="Kitchen_Settings">Kitchen Settings</TabsTrigger>
          <TabsTrigger value="Legal_Entity">Legal Entity</TabsTrigger>
          <TabsTrigger value="tables_floor">Table & Floors</TabsTrigger>
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="app_settings">App Settings</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="operation_timings">
          <ScrollArea className="h-[70vh]">
            <RestaurantTimingSettings />
          </ScrollArea>
        </TabsContent>

        <TabsContent value="Kitchen_Settings">
          <RestaurantKitchenSettings />
        </TabsContent>

        <TabsContent value="Legal_Entity">
          <div className="p-4">Legal Entity settings coming soon</div>
        </TabsContent>

        <TabsContent value="tables_floor">
          <div className="p-4">Table & Floor configuration coming soon</div>
        </TabsContent>

        <TabsContent value="menu">
          <MenuSettings
            moduleID={restaurantID}
            propertyID={selectedProperty.PropertyID}
          />
        </TabsContent>

        <TabsContent value="app_settings">
          <div className="p-4">App settings coming soon</div>
        </TabsContent>

        <TabsContent value="integrations">
          <div className="p-4">Integrations setup coming soon</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RestaurantGenSettingsPage;
