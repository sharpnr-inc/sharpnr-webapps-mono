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
import RestaurantMenuSettings from "../components/GeneralSettings/RestaurantMenuSettings";

interface RestaurantGenSettingsPageProps {}

const RestaurantGenSettingsPage: React.FC<
  RestaurantGenSettingsPageProps
> = () => {
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
          <RestaurantTimingSettings />
        </TabsContent>
        <TabsContent value="Kitchen_Settings">
          <RestaurantKitchenSettings />
        </TabsContent>
           <TabsContent value="menu">
          <RestaurantMenuSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RestaurantGenSettingsPage;
