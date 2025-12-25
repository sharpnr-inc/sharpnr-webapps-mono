"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

// 🧩 Import the individual report sections
import ProfitAndLossSection from "@/_accountingapp/sections/Reports/ProfitAndLossSection";
import BalanceSheetSection from "@/_accountingapp/sections/Reports/BalanceSheetSection";
import CashFlowSection from "@/_accountingapp/sections/Reports/CashFlowSection";
import GstTaxSummarySection from "@/_accountingapp/sections/Reports/GstTaxSummarySection";
import LedgerStatementSection from "@/_accountingapp/sections/Reports/LedgerStatementSection";

export default function AccountingReportsPage() {
  return (
    <div className="p-2">
      <Tabs defaultValue="pl" className="w-full">
        {/* ---- Tab Headers ---- */}
        <TabsList className="flex flex-wrap mb-4">
          <TabsTrigger value="pl">Profit & Loss</TabsTrigger>
          <TabsTrigger value="bs">Balance Sheet</TabsTrigger>
          <TabsTrigger value="cash">Cash Flow</TabsTrigger>
          <TabsTrigger value="gst">GST / Tax Summary</TabsTrigger>
          <TabsTrigger value="ledger">Ledger Statement</TabsTrigger>
        </TabsList>

        {/* ---- Tab Content ---- */}
        <TabsContent value="pl">
          <ProfitAndLossSection />
        </TabsContent>

        <TabsContent value="bs">
          <BalanceSheetSection />
        </TabsContent>

        <TabsContent value="cash">
          <CashFlowSection />
        </TabsContent>

        <TabsContent value="gst">
          <GstTaxSummarySection />
        </TabsContent>

        <TabsContent value="ledger">
          <LedgerStatementSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
