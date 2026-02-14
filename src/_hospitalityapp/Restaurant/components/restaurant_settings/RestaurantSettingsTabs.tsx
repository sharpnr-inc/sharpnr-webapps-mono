import MenuSettings from "@/_hospitalityapp/infra/Menu/components/MenuSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Route } from "@/routes/_appuser/orchestrator/_orchestrator_layout/_console/property/$propertyId/domain_hospitality/restaurant_dashboard/$restaurantID/index";
import RestaurantGeneralSettingsComp from "./components_forms/RestaurantGeneralSettings";

const RestaurantSettingsTabs = () => {
  const { restaurantID, propertyId } = Route.useParams();
  return (
    <div className="p-4 mt-4">
      <div>
        <h2 className="text-xl font-semibold">Restaurant Settings</h2>
        <p className="text-gray-600">
          Manage your restaurant settings, including menu, hours, and more.
        </p>
      </div>
      <div className="">
        {/* Tabs */}
        <Tabs defaultValue="Generals">
          <TabsList className="w-full">
            <TabsTrigger value="Generals">General</TabsTrigger>
            <TabsTrigger value="Menu">Menu</TabsTrigger>
            <TabsTrigger value="Hours">Hours</TabsTrigger>
            <TabsTrigger value="Staff">Staff</TabsTrigger>
          </TabsList>
          <TabsContent value="Generals">
            <RestaurantGeneralSettingsComp />
          </TabsContent>
          <TabsContent value="Menu">
            <MenuSettings moduleID={restaurantID} propertyID={propertyId} />
          </TabsContent>
          <TabsContent value="Hours">Hours Settings Content</TabsContent>
          <TabsContent value="Staff">Staff Settings Content</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RestaurantSettingsTabs;
