import MenuSettings from "@/_hospitalityapp/infra/components/MenuSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Route } from "@/routes/_appuser/_console/property/$propertyId/domain_hospitality/restaurant_dashboard/$restaurantID/index";
import RestaurantGeneralSettingsComp from "./components_forms/RestaurantGeneralSettings";
import { RestaurantLayoutSettings } from "./components_forms/RestaurantLayoutSettings";
import { AlertTriangle, Plus, Settings2 } from "lucide-react";
import { RestaurantLegalEntity } from "./components_forms/RestaurantLegalEntity";
import { usePropertyDetails } from "@/_orchestrator/properties/property/api/queries";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { useRestaurantGeneralInfo } from "../../apis/queries";

const RestaurantSettingsTabs = () => {
  const { restaurantID, propertyId } = Route.useParams();
  const { data: properyDetails } = usePropertyDetails(propertyId);
  const { data: restaurantDetails } = useRestaurantGeneralInfo(restaurantID!);

  const navigate = useNavigate();
  const handleNav = () => {
    navigate({
      to: "/orchestrator/property/$propertyId/details",
      params: {
        propertyId,
      },
    });
  };

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

          <TabsContent value="Menu" className="space-y-4">
            {(() => {
              const hasKitchen = properyDetails?.data?.infra?.some(
                (infra) => infra.infra_type === "KITCHEN",
              );

              if (!hasKitchen) {
                return (
                  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-14 text-center">
                    <AlertTriangle className="mb-4 h-10 w-10 text-red-300" />

                    <h3 className="text-lg font-semibold">No Kitchen Found</h3>

                    <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                      You need to create a kitchen before configuring the menu.
                    </p>

                    <Button
                      onClick={() => handleNav()}
                      size="sm"
                      className="mt-6 gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add Kitchen
                    </Button>
                  </div>
                );
              }

              return (
                <MenuSettings
                  moduleID={restaurantID}
                  propertyID={propertyId}
                  owners_legal_entityID={
                    restaurantDetails?.data?.resturant_legal_entity_id
                  }
                />
              );
            })()}
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
