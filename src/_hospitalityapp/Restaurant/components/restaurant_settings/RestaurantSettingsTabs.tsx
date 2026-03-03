import MenuSettings from "@/_hospitalityapp/infra/components/MenuSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Route } from "@/routes/_appuser/orchestrator/_orchestrator_layout/_console/property/$propertyId/domain_hospitality/restaurant_dashboard/$restaurantID/index";
import RestaurantGeneralSettingsComp from "./components_forms/RestaurantGeneralSettings";
import { RestaurantLayoutSettings } from "./components_forms/RestaurantLayoutSettings";
import { Settings2 } from "lucide-react";
import { RestaurantLegalEntity } from "./components_forms/RestaurantLegalEntity";
import { usePreferredKitchen } from "../../apis/queries";
import { RestaurantPreferredKitchen } from "./components_forms/RestaurantPreferredKitchen";

const RestaurantSettingsTabs = () => {
  const { restaurantID, propertyId } = Route.useParams();
  const { data } = usePreferredKitchen(restaurantID);

  return (
    <div className="p-2 mt-4">
      <div className="relative overflow-hidden rounded-2xl border bg-background p-6 m-2 shadow-sm">
        {/* subtle background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />

        <div className="relative flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Settings2 className="h-5 w-5 text-primary" />
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Restaurant Settings
            </h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-xl">
              Manage your restaurant configuration including layout, menu,
              operating hours, and other core settings.
            </p>
          </div>
        </div>
      </div>
      <div className="">
        {/* Tabs */}
        <Tabs defaultValue="Generals">
          <TabsList className="w-full">
            <TabsTrigger value="Generals">General</TabsTrigger>
            <TabsTrigger value="Menu">Menu</TabsTrigger>
            <TabsTrigger value="layout">Layouts</TabsTrigger>
            <TabsTrigger value="LegalEntity">Legal Entity</TabsTrigger>
            <TabsTrigger value="Notifications" disabled>
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="Generals">
            <RestaurantGeneralSettingsComp />
          </TabsContent>

          <TabsContent value="Menu">
            <RestaurantPreferredKitchen
              propertyID={propertyId}
              kitchenID={data?.data?.kitchen_id ?? null}
              restaurantID={restaurantID}
            />

            {data?.data?.kitchen_id ? (
              <MenuSettings moduleID={restaurantID} propertyID={propertyId} />
            ) : (
              <div className="mt-4 p-4 rounded-md bg-yellow-50 text-yellow-700 border border-yellow-200">
                First select a preferred kitchen to process orders.
              </div>
            )}
          </TabsContent>

          <TabsContent value="LegalEntity">
            <RestaurantLegalEntity />
          </TabsContent>
          <TabsContent value="layout">
            <RestaurantLayoutSettings />
          </TabsContent>
          <TabsContent value="Notifications">
            Notifications Settings Content
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RestaurantSettingsTabs;
