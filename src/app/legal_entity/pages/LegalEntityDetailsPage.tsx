import React from "react";
import { Route } from "@/routes/_appuser/legal_entity/$leID/details";
import { LegalEntityDetailsSidePanel } from "../components/LegalEntityDetailsSidePanel";
import { MoveLeft } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ScrollArea,
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@sharpnr/ui";
import { Building2 } from "lucide-react";
import { LegalEntityAccountsBooksSection } from "../components/LegalEntityAccountsBooksSection";
import { useLegalEntityDetails } from "../api/queries";
import { formatDateTimePretty } from "@/lib/formatDatePretty";
import { getLegalEntityTypeLabel } from "../utils/entity_type";

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-background">
      <div className="flex items-center gap-2 px-4 py-3 border-b">
        <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
        <h2 className="text-sm font-medium">{title}</h2>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs text-muted-foreground">{label}</span>

      {value ? (
        <span className="text-sm font-medium">{value}</span>
      ) : (
        <Skeleton className="h-4 w-2/3" />
      )}
    </div>
  );
}

const LegalEntityDetailsPage: React.FC = () => {
  const { leID } = Route.useParams();
  const { lename } = Route.useSearch();
  const { data: legalEntityDetails } = useLegalEntityDetails(leID);
  const nav = useNavigate();

  return (
    // ── Outer: locked height, no overflow ────────────────────
    <div className="flex flex-col lg:flex-row h-[calc(100vh-6rem)]">
      {/* ── Main: own scroll column ──────────────────────────── */}
      <ScrollArea className="flex-1 lg:w-9/12">
        <main className="px-4 sm:px-6 py-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <button
                onClick={() => nav({ to: "/legal_entity" })}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mb-1"
              >
                <MoveLeft className="w-3 h-3 shrink-0" />
                <span>Back to Legal Entities</span>
              </button>
              <h1 className="font-semibold text-2xl sm:text-3xl">
                {lename ?? leID}
              </h1>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-4">
            <Section icon={Building2} title="Basic Information">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                <Field
                  label="Legal Name"
                  value={legalEntityDetails?.data?.basic_details.legal_name}
                />
                <Field
                  label="Display Name"
                  value={legalEntityDetails?.data?.basic_details.display_name}
                />
                <Field
                  label="Entity Type"
                  value={getLegalEntityTypeLabel(
                    legalEntityDetails?.data?.basic_details.entity_type,
                  )}
                />
                <Field
                  label="Incorporation Date"
                  value={formatDateTimePretty(
                    legalEntityDetails?.data?.basic_details.inc_date,
                  )}
                />
                <Field label="Status" />
              </div>
            </Section>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList variant={"line"}>
                <TabsTrigger value="contacts">Contacts & People</TabsTrigger>
                <TabsTrigger value="docs"> Docs & Licenses</TabsTrigger>
                <TabsTrigger value="tax">Tax Registrations</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
              <TabsContent value="contacts">
                <Card>
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                    <CardDescription>
                      View your key metrics and recent project activity. Track
                      progress across all your active projects.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    You have 12 active projects and 3 pending tasks.
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="docs">
                <Card>
                  <CardHeader>
                    <CardTitle>Analytics</CardTitle>
                    <CardDescription>
                      Track performance and user engagement metrics. Monitor
                      trends and identify growth opportunities.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Page views are up 25% compared to last month.
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="tax">
                <Card>
                  <CardHeader>
                    <CardTitle>Reports</CardTitle>
                    <CardDescription>
                      Generate and download your detailed reports. Export data
                      in multiple formats for analysis.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    You have 5 reports ready and available to export.
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reports">
                <Card>
                  <CardHeader>
                    <CardTitle>Settings</CardTitle>
                    <CardDescription>
                      Manage your account preferences and options. Customize
                      your experience to fit your needs.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Configure notifications, security, and themes.
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            {/* Accounting Books sections start  */}
            <LegalEntityAccountsBooksSection />
            {/* Accounting Books sections ends  */}
          </div>
        </main>
      </ScrollArea>

      {/* ── Side panel: own scroll column ────────────────────── */}
      <LegalEntityDetailsSidePanel />
    </div>
  );
};

export default LegalEntityDetailsPage;
