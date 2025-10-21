import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

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
      {/* --- Small Screen: Shadcn Dropdown --- */}
      <div className="md:hidden mb-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full flex justify-between items-center border rounded-md p-2">
            {tabs.find((tab) => tab.value === selectedTab)?.label}
            <ChevronDown className="w-4 h-4 ml-2" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            {tabs.map((tab) => (
              <DropdownMenuItem
                key={tab.value}
                onClick={() => setSelectedTab(tab.value)}
              >
                {tab.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* --- Tabs for medium+ screens --- */}
      <div className="hidden lg:block">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="flex flex-wrap gap-2 mb-2">
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
      </div>

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
