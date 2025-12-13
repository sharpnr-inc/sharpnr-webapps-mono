import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

// 🧩 Import the individual tab sections
import BillsSection from "@/_accountingapp/sections/Purchases/BillsSection";
import VendorCreditsSection from "@/_accountingapp/sections/Purchases/VendorCreditsSection";
import SuppliersSection from "@/_accountingapp/sections/Purchases/SuppliersSection";
import PurchaseReportsSection from "@/_accountingapp/sections/Purchases/PurchaseReportsSection";

export default function AccountingPurchasesPage() {
  return (
    <div className="p-2">
      <Tabs defaultValue="bills" className="w-full">
        {/* ---- Tab Headers ---- */}
        <TabsList className="flex flex-wrap mb-4">
          <TabsTrigger value="bills">Bills</TabsTrigger>
          <TabsTrigger value="credits">Vendor Credits</TabsTrigger>
          <TabsTrigger value="vendors">Suppliers & Vendors</TabsTrigger>
          <TabsTrigger value="reports">Purchase Reports</TabsTrigger>
        </TabsList>

        {/* ---- Tab Content ---- */}
        <TabsContent value="bills">
          <BillsSection />
        </TabsContent>

        <TabsContent value="credits">
          <VendorCreditsSection />
        </TabsContent>

        <TabsContent value="vendors">
          <SuppliersSection />
        </TabsContent>

        <TabsContent value="reports">
          <PurchaseReportsSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
