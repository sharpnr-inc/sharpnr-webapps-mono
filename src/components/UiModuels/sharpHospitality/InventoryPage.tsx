import InventoryBarInventorySection from "@/components/hospitality_module/inventory/InventoryBarInventorySection";
import InventoryGeneralInventorySection from "@/components/hospitality_module/inventory/InventoryGeneralInventorySection";
import InventoryHotelInventorySection from "@/components/hospitality_module/inventory/InventoryHotelInventorySection";
import InventoryKitchenInventorySection from "@/components/hospitality_module/inventory/InventoryKitchenInventorySection";
import InventoryRestaurantInventorySection from "@/components/hospitality_module/inventory/InventoryRestaurantInventorySection";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function InventoryPage() {
  return (
    <div>
      {/* Header */}
      <div className="p-2 border-b">
        <div className="text-3xl font-semibold">Inventory</div>
        <small className="text-gray-500">
          Manage organisation collective inventory
        </small>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="bar_inventory" className="p-2">
        <TabsList className="flex flex-wrap gap-2">
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
    </div>
  );
}
