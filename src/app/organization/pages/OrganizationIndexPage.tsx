import {
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@sharpnr/ui";
import { OrgHeader } from "../components/OrgHeader";
import { SummaryCards } from "../components/SummaryCards";
import { OverviewCharts } from "../components/OverviewCharts";
import { ActivityPanel } from "../components/ActivityPanel";
import { PropertiesPanel } from "../components/PropertiesPanel";
import { EntitiesPanel } from "../components/EntitiesPanel";
import { MembersPanel } from "../components/MembersPanel";
import { SettingsPanel } from "../components/SettingsPanel";

const TABS = [
  { value: "overview", label: "Overview" },
  { value: "properties", label: "Properties" },
  { value: "entities", label: "Legal entities" },
  { value: "members", label: "Members" },
  { value: "settings", label: "Settings" },
] as const;

function OrganizationIndexPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 p-5">
      <OrgHeader />
      <SummaryCards />
      <Separator />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList variant="default" className="w-full justify-start">
          {TABS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="mt-4 flex flex-col gap-4">
          <OverviewCharts />
          <ActivityPanel />
        </TabsContent>
        <TabsContent value="properties" className="mt-4">
          <PropertiesPanel />
        </TabsContent>
        <TabsContent value="entities" className="mt-4">
          <EntitiesPanel />
        </TabsContent>
        <TabsContent value="members" className="mt-4">
          <MembersPanel />
        </TabsContent>
        <TabsContent value="settings" className="mt-4">
          <SettingsPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default OrganizationIndexPage;
