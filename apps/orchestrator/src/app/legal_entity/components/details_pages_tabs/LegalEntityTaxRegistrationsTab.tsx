import { Button, Skeleton, useModal } from "@sharpnr/ui";
import { Plus, Receipt, Globe, Calendar, MapPin } from "lucide-react";
import type { LegalEntityTaxRegistrationResponseDto } from "../../api/types";
import { AddTaxRegistrationForm } from "../forms/AddTaxRegistrationForm";

interface LegalEntityTaxRegistrationsTabProps {
  legalEntityID: string;
  data: LegalEntityTaxRegistrationResponseDto[] | undefined;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
const TaxTypeLabel: Record<string, string> = {
  GST: "GST",
  VAT: "VAT",
};

const GstRegistrationTypeLabel: Record<string, string> = {
  REGULAR: "Regular",
  COMPOSITION: "Composition Scheme",
  CASUAL: "Casual Taxable Person",
  NON_RESIDENT: "Non-Resident Taxable Person",
  INPUT_SERVICE_DISTRIBUTOR: "Input Service Distributor",
  SEZ: "SEZ Unit / Developer",
  GOVERNMENT: "Government Entity",
  UNREGISTERED: "Unregistered",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ─── Skeleton ──────────────────────────────────────────────────────────────────
function TaxCardSkeleton() {
  return (
    <div className="rounded-xl border p-4 space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-8 h-8 rounded-lg shrink-0" />
          <div className="space-y-1.5">
            <Skeleton className="h-3.5 w-32" />
            <Skeleton className="h-3 w-40 font-mono" />
          </div>
        </div>
        <Skeleton className="h-5 w-14 rounded-full shrink-0" />
      </div>
      <div className="border-t pt-3 space-y-2">
        <Skeleton className="h-3 w-2/5" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-3/5" />
      </div>
      <div className="flex items-center justify-between pt-1">
        <Skeleton className="h-3 w-1/4" />
        <Skeleton className="h-3 w-10" />
      </div>
    </div>
  );
}

// ─── Empty ─────────────────────────────────────────────────────────────────────
function EmptyTaxRegistrations({ legalEntityID }: { legalEntityID: string }) {
  const { openModal, closeModal } = useModal();

  const handleAdd = () => {
    openModal({
      title: "Add Tax Registration",
      description: "Add Tax Registration",
      size: "lg",
      content: (
        <AddTaxRegistrationForm
          closeModal={closeModal}
          legalEntityID={legalEntityID}
        />
      ),
    });
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-2 border-2 border-dotted rounded-xl">
      <div className="w-12 h-12 rounded-2xl border-2 border-dashed flex items-center justify-center mb-2">
        <Receipt className="w-5 h-5 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium">No tax registrations added yet</p>
      <p className="text-xs text-muted-foreground max-w-xs leading-5">
        GST, VAT, and other tax registrations linked to this legal entity will
        appear here.
      </p>
      <Button size="sm" onClick={handleAdd}>
        <Plus />
        Add Tax Registration
      </Button>
    </div>
  );
}

// ─── Card ──────────────────────────────────────────────────────────────────────
function TaxCard({
  registration,
  legalEntityID,
}: {
  registration: LegalEntityTaxRegistrationResponseDto;
  legalEntityID: string;
}) {
  const { openModal, closeModal } = useModal();

  const handleEdit = () => {
    openModal({
      title: "Add Tax Registration",
      description: "Add Tax Registration",
      size: "lg",
      content: (
        <AddTaxRegistrationForm
          closeModal={closeModal}
          legalEntityID={legalEntityID}
        />
      ),
    });
  };

  return (
    <div className="rounded-xl border bg-background p-4 space-y-3">
      {/* Top row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg border flex items-center justify-center shrink-0">
            <Receipt className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-medium">
                {TaxTypeLabel[registration.tax_type] ?? registration.tax_type}
              </p>
              <span className="text-xs px-1.5 py-0.5 rounded border text-muted-foreground shrink-0">
                {GstRegistrationTypeLabel[registration.gst_registration_type] ??
                  registration.gst_registration_type}
              </span>
            </div>
            <p className="text-xs text-muted-foreground font-mono mt-0.5 truncate">
              {registration.registration_number}
            </p>
          </div>
        </div>

        {/* Active status */}
        <span className="text-xs px-2.5 py-1 rounded-full border shrink-0 text-muted-foreground">
          {registration.is_active ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Details */}
      <div className="border-t pt-3 space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Globe className="w-3.5 h-3.5 shrink-0" />
          <span>{registration.country}</span>
        </div>

        {registration.state && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>
              {registration.state}
              {registration.gst_state_code && (
                <span className="ml-1.5 font-mono">
                  ({registration.gst_state_code})
                </span>
              )}
            </span>
          </div>
        )}

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="w-3.5 h-3.5 shrink-0" />
          <span>
            {formatDate(registration.effective_from)}
            {registration.effective_to
              ? ` → ${formatDate(registration.effective_to)}`
              : " → Present"}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end pt-1">
        <button
          onClick={handleEdit}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Edit
        </button>
      </div>
    </div>
  );
}

// ─── Tab ──────────────────────────────────────────────────────────────────────
export function LegalEntityTaxRegistrationsTab({
  legalEntityID,
  data,
}: LegalEntityTaxRegistrationsTabProps) {
  const { openModal, closeModal } = useModal();

  const handleAdd = () => {
    openModal({
      title: "Add Tax Registration",
      description: "Add Tax Registration",
      size: "lg",
      content: (
        <AddTaxRegistrationForm
          closeModal={closeModal}
          legalEntityID={legalEntityID}
        />
      ),
    });
  };

  // Loading
  if (!data) {
    return (
      <div className="grid gap-3 md:grid-cols-2 pt-4">
        {[...Array(4)].map((_, i) => (
          <TaxCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Empty
  if (data.length === 0) {
    return <EmptyTaxRegistrations legalEntityID={legalEntityID} />;
  }

  // Active first, then by effective_from desc
  const sorted = [...data].sort((a, b) => {
    if (a.is_active !== b.is_active) return a.is_active ? -1 : 1;
    return (
      new Date(b.effective_from).getTime() -
      new Date(a.effective_from).getTime()
    );
  });

  return (
    <div className="pt-4 space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {data.length} registration{data.length !== 1 ? "s" : ""}
        </p>
        <Button
          size="sm"
          variant="outline"
          onClick={handleAdd}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Registration</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>

      {/* Grid */}
      <div className="grid gap-3 md:grid-cols-2">
        {sorted.map((registration) => (
          <TaxCard
            key={registration.id}
            registration={registration}
            legalEntityID={legalEntityID}
          />
        ))}
      </div>
    </div>
  );
}
