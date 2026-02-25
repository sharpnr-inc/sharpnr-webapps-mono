import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

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

      </Tabs>
    </div>
  );
}
