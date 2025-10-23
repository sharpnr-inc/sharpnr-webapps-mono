import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabs = [
  { value: "overview", label: "Overview" },
  { value: "restaurant_config", label: "Restaurant Configs" },
  { value: "bar_config", label: "Bar Configs" },
  { value: "owners", label: "Owners" },
  { value: "reg_license", label: "Registration & Licences" },
  { value: "integration", label: "Integrations" },
  { value: "gst", label: "GST & Taxes" },
  { value: "branding", label: "Branding" },
  { value: "customer_support", label: "Customer Support" },
];

export default function HospitalityOrgConfigPage() {
  const [selectedTab, setSelectedTab] = useState("overview");

  return (
    <div className="p-2">
   


        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="w-full h-auto flex-wrap justify-start gap-1">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <div className="p-4 border rounded-md">
                <h2 className="text-lg font-semibold mb-2">{tab.label}</h2>
                <p>This is the {tab.label} section.</p>
              </div>
            </TabsContent>
          ))}
        </Tabs>

      {/* --- Dropdown content for small screens --- */}
      <div className="md:hidden">
        {tabs.map(
          (tab) =>
            tab.value === selectedTab && (
              <div key={tab.value} className="p-4 border rounded-md mt-2">
                <h2 className="text-lg font-semibold mb-2">{tab.label}</h2>
                <p>This is the {tab.label} section.</p>
              </div>
            )
        )}
      </div>
    </div>
  );
}
