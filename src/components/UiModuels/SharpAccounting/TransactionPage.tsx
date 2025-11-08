"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

// 🧩 Import section components
import AllTransactionsSection from "@/components/AccountingModule/Transactions/AllTransactionsSection";
import ReceiptsSection from "@/components/AccountingModule/Transactions/ReceiptsSection";
import PaymentsSection from "@/components/AccountingModule/Transactions/PaymentsSection";
import TransfersSection from "@/components/AccountingModule/Transactions/TransfersSection";
import JournalEntriesSection from "@/components/AccountingModule/Transactions/JournalEntriesSection";

export default function AccountingTransactionPage() {
  return (
    <div className="p-2">
      <Tabs defaultValue="all" className="w-full">
        {/* ---- Tabs Header ---- */}
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="all">All Transactions</TabsTrigger>
          <TabsTrigger value="receipts">Receipts</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="transfers">Transfers</TabsTrigger>
          <TabsTrigger value="journal">Journal Entries</TabsTrigger>
        </TabsList>

        {/* ---- Tabs Content ---- */}
        <TabsContent value="all">
          <AllTransactionsSection />
        </TabsContent>

        <TabsContent value="receipts">
          <ReceiptsSection />
        </TabsContent>

        <TabsContent value="payments">
          <PaymentsSection />
        </TabsContent>

        <TabsContent value="transfers">
          <TransfersSection />
        </TabsContent>

        <TabsContent value="journal">
          <JournalEntriesSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
