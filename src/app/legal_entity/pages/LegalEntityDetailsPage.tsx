import React from "react";
// import { Route } from "@/routes/_appuser/legal_entity/$leID/details";
import { LegalEntityDetailsSidePanel } from "../components/LegalEntityDetailsSidePanel";
import { MoveLeft, MoveRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

const LegalEntityDetailsPage: React.FC = () => {
  // const { leID } = Route.useParams();
  const nav = useNavigate();

  return (
    <div className="flex flex-col lg:flex-row">
      {/* ── Main Content ─────────────────────────────────────── */}
      <main className="flex-1 lg:w-9/12 px-4 sm:px-6 py-4">
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
              Entity Details
            </h1>

            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
              <span>Legal Entities</span>
              <MoveRight className="w-3 h-3 shrink-0" />
            </div>
          </div>
        </div>

        {/* ── Content goes here ─────────────────────────────── */}
        <div className="space-y-6">{/* placeholder */}</div>
      </main>

      {/* ── Side Panel ───────────────────────────────────────── */}
      <LegalEntityDetailsSidePanel />
    </div>
  );
};

export default LegalEntityDetailsPage;
