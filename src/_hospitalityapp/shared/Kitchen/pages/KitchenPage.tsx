import KitchenInventorySection from "@/_hospitalityapp/shared/Kitchen/schemas/KitchenInventorySection";
import KitchenMenuSection from "@/_hospitalityapp/shared/Kitchen/schemas/KitchenMenuSection";
import KitchenOrdersSection from "@/_hospitalityapp/shared/Kitchen/schemas/KitchenOrdersSection";
import KitchenStaffSection from "@/_hospitalityapp/shared/Kitchen/schemas/KitchenStaffSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default function KitchenPage() {
  return (
    <div className="p-2">

      {/* --- Tabs --- */}
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="w-fit h-auto flex-wrap justify-start gap-1">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
        </TabsList>

        {/* --- Tab Contents --- */}
        <div className="">
          <TabsContent value="orders">
            <KitchenOrdersSection />
          </TabsContent>

          <TabsContent value="menu">
            <KitchenMenuSection />
          </TabsContent>

          <TabsContent value="inventory">
            <KitchenInventorySection />
          </TabsContent>

          <TabsContent value="staff">
            <KitchenStaffSection />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
