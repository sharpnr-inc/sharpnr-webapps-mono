"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

// 🧩 Import section components
import FiscalYearSection from "@/_accountingapp/sections/Settings/FiscalYearSection";
import TaxesSection from "@/_accountingapp/sections/Settings/TaxesSection";
import DocumentNumberingSection from "@/_accountingapp/sections/Settings/DocumentNumberingSection";
import DefaultAccountsSection from "@/_accountingapp/sections/Settings/DefaultAccountsSection";
import AccountingBooksSection from "@/_accountingapp/sections/Settings/AccountingBooksSection";

export default function AccountingSettingsPage() {
  return (
    <div className="p-2">
      <Tabs defaultValue="fiscal" className="w-full">
        {/* ---- Tabs Header ---- */}
        <TabsList className="flex flex-wrap mb-4">
          <TabsTrigger value="fiscal">Fiscal Year</TabsTrigger>
          <TabsTrigger value="tax">Taxes / GST Config</TabsTrigger>
          <TabsTrigger value="docs">Document Numbering</TabsTrigger>
          <TabsTrigger value="defaults">Default Accounts</TabsTrigger>
          <TabsTrigger value="books">Accounting Books</TabsTrigger>
        </TabsList>

        {/* ---- Tabs Content ---- */}
        <TabsContent value="fiscal">
          <FiscalYearSection />
        </TabsContent>

        <TabsContent value="tax">
          <TaxesSection />
        </TabsContent>

        <TabsContent value="docs">
          <DocumentNumberingSection />
        </TabsContent>

        <TabsContent value="defaults">
          <DefaultAccountsSection />
        </TabsContent>

        <TabsContent value="books">
          <AccountingBooksSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
