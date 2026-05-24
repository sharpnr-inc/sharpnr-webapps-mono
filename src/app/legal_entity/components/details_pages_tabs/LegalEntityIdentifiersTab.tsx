import { Button, Skeleton } from "@sharpnr/ui";
import {
  ShieldCheck,
  ShieldAlert,
  Calendar,
  Plus,
  Pencil,
  Hash,
} from "lucide-react";
import type { LegalEntityIdentifierResponseDto } from "../../api/types";
import { getLegalEntityIdentifierTypeLabel } from "../../utils/entity_type";
import { useModal } from "@/hooks/useModal";
import { AddIdentifiersForm } from "../forms/AddIdentifersForm";

interface LegalEntityIdentifiersTabProps {
  legalEntityID: string;
  data: LegalEntityIdentifierResponseDto[] | undefined;
}

// ─── Skeleton ──────────────────────────────────────────────────────────────────
function IdentifierCardSkeleton() {
  return (
    <div className="rounded-xl border p-4 space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-9 h-9 rounded-full shrink-0" />
          <div className="space-y-1.5">
            <Skeleton className="h-3.5 w-40" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <Skeleton className="h-5 w-16 rounded-full shrink-0" />
      </div>
      <div className="border-t pt-3 space-y-2">
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-2/5" />
      </div>
      <Skeleton className="h-2.5 w-1/3" />
    </div>
  );
}

// ─── Empty ─────────────────────────────────────────────────────────────────────
function EmptyIdentifiers({ legalEntityID }: { legalEntityID: string }) {
  const { openModal, closeModal } = useModal();

  const handleAdd = () => {
    openModal({
      title: "Add Identity Document",
      description:
        "Attach regulatory registration numbers, compliance tax codes, or official operational identifiers to this legal entity.",
      content: (
        <AddIdentifiersForm
          closeModal={closeModal}
          legalEntityID={legalEntityID}
        />
      ),
    });
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-2 border-2 border-dotted rounded-xl">
      <div className="w-12 h-12 rounded-2xl border-2 border-dashed flex items-center justify-center mb-4">
        <Hash className="w-5 h-5 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium mb-1">No identifiers added yet</p>
      <p className="text-xs text-muted-foreground max-w-xs leading-5">
        Registration numbers, tax identifiers, and compliance codes linked to
        this legal entity will appear here.
      </p>
      <Button size="sm" onClick={handleAdd}>
        <Plus />
        Add Identifier
      </Button>
    </div>
  );
}

// ─── Card ──────────────────────────────────────────────────────────────────────
function IdentifierCard({
  identifier,
  legalEntityID,
}: {
  identifier: LegalEntityIdentifierResponseDto;
  legalEntityID: string;
}) {
  const { openModal, closeModal } = useModal();

  const typeLabel = getLegalEntityIdentifierTypeLabel(identifier.type);

  // Derive short label (e.g. "PAN") from the full label for the avatar
  const shortType = identifier.type ?? "—";

  const handleEdit = () => {
    openModal({
      title: "",
      description: "",
      content: (
        <AddIdentifiersForm
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
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full border flex items-center justify-center text-[10px] font-semibold shrink-0 tracking-tight">
            {shortType}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{typeLabel}</p>
            <p className="text-xs text-muted-foreground mt-0.5 font-mono truncate">
              {identifier.value}
            </p>
          </div>
        </div>

        <span
          className={`text-xs px-2.5 py-1 rounded-full border shrink-0 flex items-center gap-1 ${
            identifier.is_verified
              ? "text-emerald-600 border-emerald-200 bg-emerald-50 dark:text-emerald-400 dark:border-emerald-800 dark:bg-emerald-950"
              : "text-muted-foreground"
          }`}
        >
          {identifier.is_verified ? (
            <ShieldCheck className="w-3 h-3" />
          ) : (
            <ShieldAlert className="w-3 h-3" />
          )}
          {identifier.is_verified ? "Verified" : "Unverified"}
        </span>
      </div>

      {/* Details */}
      <div className="border-t pt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {identifier.verified_at && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>
              Verified{" "}
              {new Date(identifier.verified_at).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        )}
        {identifier.expires_at && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span>
              Expires{" "}
              {new Date(identifier.expires_at).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        )}
        {!identifier.verified_at && !identifier.expires_at && (
          <p className="text-xs text-muted-foreground col-span-2">
            No verification or expiry details available.
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end">
        <button
          onClick={handleEdit}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Pencil className="w-3 h-3" />
          Edit
        </button>
      </div>
    </div>
  );
}

// ─── Tab ──────────────────────────────────────────────────────────────────────
export function LegalEntityIdentifiersTab({
  legalEntityID,
  data,
}: LegalEntityIdentifiersTabProps) {
  const { openModal, closeModal } = useModal();

  const handleAdd = () => {
    openModal({
      title: "Add Identity Document",
      description:
        "Attach regulatory registration numbers, compliance tax codes, or official operational identifiers to this legal entity.",
      content: (
        <AddIdentifiersForm
          closeModal={closeModal}
          legalEntityID={legalEntityID}
        />
      ),
    });
  };

  // Loading
  if (!data) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
        {[...Array(4)].map((_, i) => (
          <IdentifierCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Empty
  if (data.length === 0) {
    return <EmptyIdentifiers legalEntityID={legalEntityID} />;
  }

  // Verified first, then alphabetical by type
  const sorted = [...data].sort((a, b) => {
    if (a.is_verified !== b.is_verified) return a.is_verified ? -1 : 1;
    return a.type.localeCompare(b.type);
  });

  return (
    <div className="pt-4 space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {data.length} identifier{data.length !== 1 ? "s" : ""}
        </p>
        <Button
          size="sm"
          variant="outline"
          onClick={handleAdd}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Identifier</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sorted.map((identifier) => (
          <IdentifierCard
            key={identifier.id}
            identifier={identifier}
            legalEntityID={legalEntityID}
          />
        ))}
      </div>
    </div>
  );
}
