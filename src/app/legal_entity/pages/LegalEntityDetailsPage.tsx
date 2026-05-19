import React from "react";
import { Route } from "@/routes/_appuser/legal_entity/$leID/details";
import { LegalEntityDetailsSidePanel } from "../components/LegalEntityDetailsSidePanel";
import { MoveLeft } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { ScrollArea, Skeleton } from "@sharpnr/ui";
import { Building2, FileText, Users, Landmark } from "lucide-react";

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

function Field({ label }: { label: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

const LegalEntityDetailsPage: React.FC = () => {
  const { leID } = Route.useParams();
  const { lename } = Route.useSearch();
  const nav = useNavigate();

  return (
    // ── Outer: locked height, no overflow ────────────────────
    <div className="flex flex-col lg:flex-row h-[calc(100vh-3.5rem)] overflow-hidden">
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
                <Field label="Legal Name" />
                <Field label="Display Name" />
                <Field label="Entity Type" />
                <Field label="Incorporation Date" />
                <Field label="Status" />
                <Field label="Country of Incorporation" />
              </div>
            </Section>

            <Section icon={FileText} title="Tax & Registration">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                <Field label="PAN Number" />
                <Field label="GST Number" />
                <Field label="CIN / Registration No." />
                <Field label="TAN Number" />
                <Field label="Tax Jurisdiction" />
                <Field label="Filing Frequency" />
              </div>
            </Section>

            <Section icon={Landmark} title="Registered Address">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                <Field label="Address Line 1" />
                <Field label="Address Line 2" />
                <Field label="City" />
                <Field label="State" />
                <Field label="PIN Code" />
                <Field label="Country" />
              </div>
            </Section>

            <Section icon={Users} title="Authorized Persons">
              <div className="space-y-3">
                {[...Array(2)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 rounded-lg border p-3"
                  >
                    <Skeleton className="w-9 h-9 rounded-full shrink-0" />
                    <div className="flex flex-col gap-1.5 flex-1">
                      <Skeleton className="h-3.5 w-1/3" />
                      <Skeleton className="h-3 w-1/4" />
                    </div>
                    <Skeleton className="h-5 w-16 rounded-full shrink-0" />
                  </div>
                ))}
                <p className="text-xs text-muted-foreground text-center pt-1">
                  Directors, partners, and authorized signatories will appear
                  here.
                </p>
              </div>
            </Section>
          </div>
        </main>
      </ScrollArea>

      {/* ── Side panel: own scroll column ────────────────────── */}
      <LegalEntityDetailsSidePanel />
    </div>
  );
};

export default LegalEntityDetailsPage;
