import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import RestaurantTimingSettings from "../components/RestaurantTimingSettings";

interface RestaurantGenSettingsPageProps {}

const RestaurantGenSettingsPage: React.FC<
  RestaurantGenSettingsPageProps
> = () => {
  return (
    <div>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Timing</TabsTrigger>
          <TabsTrigger value="reports">Kitchen</TabsTrigger>
          <TabsTrigger value="settings">Menu</TabsTrigger>
          <TabsTrigger value="settings">Table & Floors</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <RestaurantTimingSettings />
        </TabsContent>
        <TabsContent value="analytics">
          <RestaurantTimingSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RestaurantGenSettingsPage;
