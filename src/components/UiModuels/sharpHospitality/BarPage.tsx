import BarInventorySection from "@/components/hospitality_module/bar/BarInventorySection";
import BarMenuSection from "@/components/hospitality_module/bar/BarMenuSection";
import BarOrdersSection from "@/components/hospitality_module/bar/BarOrdersSection";
import BarStaffSection from "@/components/hospitality_module/bar/BarStaffSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function BarPage() {
  return (
    <div className="p-2">
      {/* Tabs Section */}
      <Tabs defaultValue="menu" className="w-full">
        {/* --- Tabs Header --- */}
        <TabsList className="flex flex-wrap gap-2">
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
        </TabsList>

        {/* --- Tabs Content --- */}
        <div className="">
          <TabsContent value="menu">
            <BarMenuSection />
          </TabsContent>

          <TabsContent value="orders">
            <BarOrdersSection />
          </TabsContent>

          <TabsContent value="inventory">
            <BarInventorySection />
          </TabsContent>

          <TabsContent value="staff">
            <BarStaffSection />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
