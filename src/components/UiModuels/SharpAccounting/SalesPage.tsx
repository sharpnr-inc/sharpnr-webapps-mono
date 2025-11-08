"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

// 🧩 Import section components
import InvoicesSection from "@/components/AccountingModule/Sales/InvoicesSection";
import CreditNotesSection from "@/components/AccountingModule/Sales/CreditNotesSection";
import CustomersSection from "@/components/AccountingModule/Sales/CustomersSection";
import SalesReportsSection from "@/components/AccountingModule/Sales/SalesReportsSection";

export default function AccountingSalesPage() {
  return (
    <div className="p-2">
      <Tabs defaultValue="invoices" className="w-full">
        {/* ---- Tab Headers ---- */}
        <TabsList className="flex flex-wrap mb-4">
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="creditnotes">Credit Notes</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="reports">Sales Reports</TabsTrigger>
        </TabsList>

        {/* ---- Tab Content ---- */}
        <TabsContent value="invoices">
          <InvoicesSection />
        </TabsContent>

        <TabsContent value="creditnotes">
          <CreditNotesSection />
        </TabsContent>

        <TabsContent value="customers">
          <CustomersSection />
        </TabsContent>

        <TabsContent value="reports">
          <SalesReportsSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
