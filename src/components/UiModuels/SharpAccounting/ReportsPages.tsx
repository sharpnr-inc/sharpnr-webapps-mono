"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

// 🧩 Import the individual report sections
import ProfitAndLossSection from "@/components/AccountingModule/Reports/ProfitAndLossSection";
import BalanceSheetSection from "@/components/AccountingModule/Reports/BalanceSheetSection";
import CashFlowSection from "@/components/AccountingModule/Reports/CashFlowSection";
import GstTaxSummarySection from "@/components/AccountingModule/Reports/GstTaxSummarySection";
import LedgerStatementSection from "@/components/AccountingModule/Reports/LedgerStatementSection";

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
