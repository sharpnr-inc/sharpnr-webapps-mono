import { Button } from "@sharpnr/ui";
import { useFormsModal } from "@sharpnr/ui";
import { MoveRight, PlusCircle } from "lucide-react";
import { CreateLegalEntityForm } from "../components/forms/CreateLegalEntityForm";
import { useAppUserStore } from "@/store/AppUserStore";
import { AboutLegalEntityHelper } from "../components/info_side_panels/AboutLegalEntityHepler";
import { EmptyLegalEntity } from "../components/skeltons_and_empty/EmptyLegalEntity";
import { useAllLegalEntities } from "../api/queries";
import { LegalEntityTypeLabel } from "../utils/entity_type";
import { Skeleton } from "@sharpnr/ui";
import { useNavigate } from "@tanstack/react-router";

export function LegalEntityIndexPage() {
  const { showModal, closeModal } = useFormsModal();
  const { user } = useAppUserStore();
  const { data, isLoading, isError } = useAllLegalEntities();
  const legalEntities = data?.data ?? [];
  const nav = useNavigate();

  const handleCreateLegalEntity = () => {
    showModal(
      "Add Legal Entity",
      "Add Legal Entity",
      <CreateLegalEntityForm closeModal={closeModal} />,
    );
  };

  return (
    <div className="flex flex-col lg:flex-row lg:gap-3">
      <main className="flex-1 lg:w-9/12 px-4 sm:px-6">
        {/* Top bar */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <span>{user?.org_data.org_name}</span>
              <MoveRight className="w-3 h-3 shrink-0" />
              <span>Legal Entities</span>
            </div>
            <h1 className="font-semibold text-2xl sm:text-3xl">
              Legal Entities
            </h1>
          </div>

          <Button onClick={handleCreateLegalEntity} className="shrink-0 mt-1">
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Add New Legal Entity</span>
            <span className="sm:hidden">Add New</span>
          </Button>
        </div>

        {/* ── Content ──────────────────────────────────────────── */}

        {/* Loading */}
        {isLoading && (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="rounded-xl border p-4 flex items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {isError && !isLoading && (
          <div className="rounded-xl border p-6 text-center text-sm text-muted-foreground">
            Something went wrong while fetching legal entities. Please try
            again.
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && legalEntities.length === 0 && (
          <EmptyLegalEntity onCreateClick={handleCreateLegalEntity} />
        )}

        {/* List */}
        {!isLoading && !isError && legalEntities.length > 0 && (
          <div className="space-y-3">
            {legalEntities.map((entity) => (
              <div
                key={entity.id}
                onClick={() => {
                  nav({
                    to: "/legal_entity/$leID/details",
                    from: "/legal_entity",
                    search: {
                      lename: entity.legal_name,
                      le__type: entity.display_name,
                    },
                    params: {
                      leID: entity.id,
                    },
                  });
                }}
                className="rounded-xl border p-4 flex items-center justify-between gap-4 cursor-pointer"
              >
                <div>
                  <p className="text-sm font-medium">{entity.display_name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {LegalEntityTypeLabel[entity.entity_type]}
                  </p>
                </div>

                <span
                  className={`text-xs px-2.5 py-1 rounded-full border ${
                    entity.status
                      ? "text-foreground border-border"
                      : "text-muted-foreground border-border"
                  }`}
                >
                  {entity.status ? "Active" : "Inactive"}
                </span>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ── Side Panel ───────────────────────────────────────── */}
      <AboutLegalEntityHelper />
    </div>
  );
}
