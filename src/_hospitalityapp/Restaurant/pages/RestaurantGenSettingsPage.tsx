import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import RestaurantTimingSettings from "../components/GeneralSettings/RestaurantTimingSettings";
import RestaurantKitchenSettings from "../components/GeneralSettings/RestaurantKitchenSettings";

interface RestaurantGenSettingsPageProps {}

const RestaurantGenSettingsPage: React.FC<
  RestaurantGenSettingsPageProps
> = () => {
  return (
    <div>
      <Tabs defaultValue="operation_timings">
        <TabsList>
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
      </Tabs>
    </div>
  );
};

export default RestaurantGenSettingsPage;
