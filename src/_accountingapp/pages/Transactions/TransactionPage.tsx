import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

import AllTransactionsSection from "@/_accountingapp/sections/Transactions/AllTransactionsSection";
import ReceiptsSection from "@/_accountingapp/sections/Transactions/ReceiptsSection";
import PaymentsSection from "@/_accountingapp/sections/Transactions/PaymentsSection";
import TransfersSection from "@/_accountingapp/sections/Transactions/TransfersSection";
import JournalEntriesSection from "@/_accountingapp/sections/Transactions/JournalEntriesSection";

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
