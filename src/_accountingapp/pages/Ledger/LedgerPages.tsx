"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";


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
      </Tabs>
    </div>
  );
}
