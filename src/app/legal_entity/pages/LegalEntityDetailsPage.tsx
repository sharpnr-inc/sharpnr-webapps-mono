import React from "react";
import { Route } from "@/routes/_appuser/legal_entity/$leID/details";
import { LegalEntityDetailsSidePanel } from "../components/info_side_panels/LegalEntityDetailsSidePanel";
import { MoveLeft } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import {
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@sharpnr/ui";
import { Building2 } from "lucide-react";
import { LegalEntityAccountsBooksSection } from "../components/accounting_sections/LegalEntityAccountsBooksSection";
import { useLegalEntityDetails } from "../api/queries";
import { formatDateTimePretty } from "@/lib/formatDatePretty";
import { getLegalEntityTypeLabel } from "../utils/entity_type";
import { LegalEntityContactsAndPeopleTab } from "../components/details_pages_tabs/LegalEntityContactsTabs";
import { LegalEntityBankAccountsTab } from "../components/details_pages_tabs/LegalEntityBankAccountsTab";
import { LegalEntityTaxRegistrationsTab } from "../components/details_pages_tabs/LegalEntityTaxRegistrationsTab";
import { LegalEntityLicenseComplianceTab } from "../components/details_pages_tabs/LegalEntityLicenseComplianceTab";
import { LegalEntityTaxCategoriesSection } from "../components/details_pages_tabs/LegalEntityTaxCategoriesSection";
import { LegalEntityAddressesTab } from "../components/details_pages_tabs/LegalEntityAddressesTab";
import { LegalEntityIdentifiersTab } from "../components/details_pages_tabs/LegalEntityIdentifiersTab";

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

const TAB_OPTIONS = [
  { value: "contacts", label: "Contacts & People" },
  { value: "bank_accounts", label: "Bank Accounts" },
  { value: "address", label: "Addresses" },
  { value: "identifiers", label: "Identifiers" },
  { value: "license_compliance", label: "Licence & Compliance" },
  { value: "tax_registrations", label: "Tax Registration" },
] as const;

const LegalEntityDetailsPage: React.FC = () => {
  const { leID } = Route.useParams();
  const { lename } = Route.useSearch();
  const { data: legalEntityDetails } = useLegalEntityDetails(leID);
  const nav = useNavigate();

  type TabValue = (typeof TAB_OPTIONS)[number]["value"];

  const [activeTab, setActiveTab] = React.useState<TabValue>("contacts");

  return (
    // ── Outer: full-height two-column on desktop, natural flow on mobile ──
    <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-6rem)]">
      {/* ── Main: scrollable on desktop, natural on mobile ───────────────── */}
      <ScrollArea className="flex-1 lg:w-9/12 min-h-0">
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
              <h1 className="font-semibold text-2xl sm:text-3xl wrap-break-word">
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

            <Tabs
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as TabValue)}
              className="w-full"
            >
              {/* Mobile: select dropdown */}
              <div className="sm:hidden mb-2">
                <Select
                  value={activeTab}
                  onValueChange={(v) => setActiveTab(v as TabValue)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TAB_OPTIONS.map((tab) => (
                      <SelectItem key={tab.value} value={tab.value}>
                        {tab.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Desktop: line tabs */}
              <TabsList variant="line" className="hidden sm:flex">
                {TAB_OPTIONS.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="contacts">
                <LegalEntityContactsAndPeopleTab
                  legalEntityID={leID}
                  data={legalEntityDetails?.data?.contacts_and_people}
                />
              </TabsContent>

              <TabsContent value="bank_accounts">
                <LegalEntityBankAccountsTab
                  legalEntityID={leID}
                  data={legalEntityDetails?.data?.bank_accounts}
                />
              </TabsContent>

              <TabsContent value="address">
                <LegalEntityAddressesTab
                  legalEntityID={leID}
                  data={legalEntityDetails?.data?.addresses}
                />
              </TabsContent>

              <TabsContent value="license_compliance">
                <LegalEntityLicenseComplianceTab
                  legalEntityID={leID}
                  data={legalEntityDetails?.data?.licences_and_compliance}
                />
              </TabsContent>

              <TabsContent value="tax_registrations">
                <LegalEntityTaxRegistrationsTab
                  legalEntityID={leID}
                  data={legalEntityDetails?.data?.tax_registrations}
                />
              </TabsContent>

              <TabsContent value="identifiers">
                <LegalEntityIdentifiersTab
                  legalEntityID={leID}
                  data={legalEntityDetails?.data?.identifiers}
                />
              </TabsContent>
            </Tabs>

            <Separator orientation="horizontal" />

            <LegalEntityTaxCategoriesSection
              legalEntityID={leID}
              tax_registration_length={
                legalEntityDetails?.data?.tax_registrations.length
              }
              data={legalEntityDetails?.data?.tax_categories}
            />

            <Separator orientation="horizontal" />

            {/* Accounting Books sections start */}
            <LegalEntityAccountsBooksSection />
            {/* Accounting Books sections ends */}
          </div>
        </main>
      </ScrollArea>

      {/* ── Side panel: own scroll column on desktop, inline on mobile ────── */}
      <LegalEntityDetailsSidePanel />
    </div>
  );
};

export default LegalEntityDetailsPage;
