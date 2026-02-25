"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";


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
    
      </Tabs>
    </div>
  );
}
