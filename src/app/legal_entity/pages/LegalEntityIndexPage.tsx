import { Button } from "@sharpnr/ui";
import { useFormsModal } from "@sharpnr/ui";
import { MoveRight, PlusCircle } from "lucide-react";
import { CreateLegalEntityForm } from "../components/CreateLegalEntityForm";
import { useAppUserStore } from "@/store/AppUserStore";
import { AboutLegalEntityHelper } from "../components/AboutLegalEntityHepler";
import { EmptyLegalEntity } from "../components/EmptyLegalEntity";

export function LegalEntityIndexPage() {
  const { showModal, closeModal } = useFormsModal();
  const { user } = useAppUserStore();

  const handleCreateLegalEntity = () => {
    showModal(
      "Add Legal Entity",
      "Add Legal Entity",
      <CreateLegalEntityForm closeModal={closeModal} />,
    );
  };

  return (
    <div className="flex flex-col lg:flex-row lg:gap-3">
      {/* ── Main Content ─────────────────────────────────────── */}
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

        {/* Content area */}
        <div>
          <EmptyLegalEntity onCreateClick={handleCreateLegalEntity} />
        </div>
      </main>

      {/* ── Side Panel ───────────────────────────────────────── */}
      <AboutLegalEntityHelper />
    </div>
  );
}
