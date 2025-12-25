import InventoryBarInventorySection from "@/_hospitalityapp/shared/Inventory/sections/InventoryBarInventorySection";
import InventoryGeneralInventorySection from "@/_hospitalityapp/shared/Inventory/sections/InventoryGeneralInventorySection";
import InventoryHotelInventorySection from "@/_hospitalityapp/shared/Inventory/sections/InventoryHotelInventorySection";
import InventoryKitchenInventorySection from "@/_hospitalityapp/shared/Inventory/sections/InventoryKitchenInventorySection";
import InventoryRestaurantInventorySection from "@/_hospitalityapp/shared/Inventory/sections/InventoryRestaurantInventorySection";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function InventoryPage() {
  return (
    <Tabs defaultValue="bar_inventory" className="p-2">
      <TabsList className="w-fit h-auto flex-wrap justify-start gap-1">
        <TabsTrigger value="bar_inventory">Bar Inventory</TabsTrigger>
        <TabsTrigger value="hotel_inventory">Hotel Inventory</TabsTrigger>
        <TabsTrigger value="restaurant_inventory">
          Restaurant Inventory
        </TabsTrigger>
        <TabsTrigger value="kitchen_inventory">Kitchen Inventory</TabsTrigger>
        <TabsTrigger value="general_inventory">General Inventory</TabsTrigger>
      </TabsList>

      {/* --- Tabs Contents --- */}
      <TabsContent value="bar_inventory">
        <InventoryBarInventorySection />
      </TabsContent>

      <TabsContent value="hotel_inventory">
        <InventoryHotelInventorySection />
      </TabsContent>

      <TabsContent value="restaurant_inventory">
        <InventoryRestaurantInventorySection />
      </TabsContent>

      <TabsContent value="kitchen_inventory">
        <InventoryKitchenInventorySection />
      </TabsContent>

      <TabsContent value="general_inventory">
        <InventoryGeneralInventorySection />
      </TabsContent>
    </Tabs>
  );
}
