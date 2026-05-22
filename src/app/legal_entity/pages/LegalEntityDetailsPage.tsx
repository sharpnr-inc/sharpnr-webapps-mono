import React from "react";
import { Route } from "@/routes/_appuser/legal_entity/$leID/details";
import { LegalEntityDetailsSidePanel } from "../components/info_side_panels/LegalEntityDetailsSidePanel";
import { MoveLeft } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import {
  ScrollArea,
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
import { LegalEntityTaxCategoriesTab } from "../components/details_pages_tabs/LegalEntityTaxCategoriesTab";
import { LegalEntityAddressesTab } from "../components/details_pages_tabs/LegalEntityAddressesTab";

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

            <Tabs defaultValue="contacts" className="w-full">
              <TabsList variant={"line"}>
                <TabsTrigger value="contacts">Contacts & People</TabsTrigger>
                <TabsTrigger value="bank_accounts">Bank Accounts</TabsTrigger>
                <TabsTrigger value="address">Addresses</TabsTrigger>
                <TabsTrigger value="license_compliance">
                  Licence & Compliance
                </TabsTrigger>
                <TabsTrigger value="tax_registrations">
                  Tax Regsitration
                </TabsTrigger>
                <TabsTrigger value="tax_categories">Tax Categories</TabsTrigger>
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

              <TabsContent value="tax_categories">
                <LegalEntityTaxCategoriesTab
                  legalEntityID={leID}
                  data={legalEntityDetails?.data?.tax_categories}
                />
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
