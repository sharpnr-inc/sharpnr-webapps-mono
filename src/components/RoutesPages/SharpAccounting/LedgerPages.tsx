"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

// 🧩 Import section components
import ChartOfAccountsSection from "@/_accountingapp/sections/Ledger/ChartOfAccountsSection";
import AccountGroupsSection from "@/_accountingapp/sections/Ledger/AccountGroupsSection"; 
import ReconcileSection from "@/_accountingapp/sections/Ledger/ReconcileSection";
import TrialBalanceSection from "@/_accountingapp/sections/Ledger/TrialBalanceSection"; 

export default function AccountingLedgerPage() {
  return (
    <div className="p-2">
      <Tabs defaultValue="chart" className="w-full">
        {/* ---- Tabs Header ---- */}
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="chart">Chart of Accounts</TabsTrigger>
          <TabsTrigger value="groups">Account Groups</TabsTrigger>
          <TabsTrigger value="reconcile">Reconcile</TabsTrigger>
          <TabsTrigger value="trial">Trial Balance</TabsTrigger>
        </TabsList>

        {/* ---- Tabs Content ---- */}
        <TabsContent value="chart">
          <ChartOfAccountsSection />
        </TabsContent>

        <TabsContent value="groups">
          <AccountGroupsSection />
        </TabsContent>

        <TabsContent value="reconcile">
          <ReconcileSection />
        </TabsContent>

        <TabsContent value="trial">
          <TrialBalanceSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
