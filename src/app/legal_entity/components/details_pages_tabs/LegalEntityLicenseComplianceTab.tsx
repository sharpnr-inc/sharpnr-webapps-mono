import { Button, Skeleton, useFormsModal } from "@sharpnr/ui";
import {
  ShieldCheck,
  ShieldX,
  ShieldAlert,
  FileText,
  Calendar,
  Building2,
  ExternalLink,
  Plus,
} from "lucide-react";
import type { LegalEntityComplianceResponseDto } from "../../api/types";
import { getLegalEntityLicenseTypeLabel } from "../../utils/entity_type";

interface LegalEntityLicenseComplianceTabProps {
  legalEntityID: string;
  data: LegalEntityComplianceResponseDto[] | undefined;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
function getExpiryStatus(validTo: string | null, reminderDays: number) {
  if (!validTo) return "perpetual" as const;
  const now = new Date();
  const expiry = new Date(validTo);
  const daysLeft = Math.ceil(
    (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (daysLeft < 0) return "expired" as const;
  if (daysLeft <= reminderDays) return "expiring" as const;
  return "valid" as const;
}

function ExpiryBadge({
  validTo,
  reminderDays,
}: {
  validTo: string | null;
  reminderDays: number;
}) {
  const status = getExpiryStatus(validTo, reminderDays);

  if (status === "perpetual") {
    return (
      <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border text-muted-foreground">
        <ShieldCheck className="w-3 h-3" />
        No Expiry
      </span>
    );
  }

  if (status === "expired") {
    return (
      <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border text-muted-foreground">
        <ShieldX className="w-3 h-3" />
        Expired
      </span>
    );
  }

  if (status === "expiring") {
    return (
      <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border text-muted-foreground">
        <ShieldAlert className="w-3 h-3" />
        Expiring Soon
      </span>
    );
  }

  return (
    <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border text-muted-foreground">
      <ShieldCheck className="w-3 h-3" />
      Valid
    </span>
  );
}

// ─── Skeleton ──────────────────────────────────────────────────────────────────
function LicenseCardSkeleton() {
  return (
    <div className="rounded-xl border p-4 space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-8 h-8 rounded-lg shrink-0" />
          <div className="space-y-1.5">
            <Skeleton className="h-3.5 w-36" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <Skeleton className="h-5 w-20 rounded-full shrink-0" />
      </div>
      <div className="border-t pt-3 space-y-2">
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-2/5" />
        <Skeleton className="h-3 w-3/5" />
      </div>
      <div className="flex items-center justify-between pt-1">
        <Skeleton className="h-3 w-1/4" />
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
  );
}

// ─── Empty ─────────────────────────────────────────────────────────────────────
function EmptyCompliance({ legalEntityID }: { legalEntityID: string }) {
  const { showModal, closeModal } = useFormsModal();

  const handleAdd = () => {
    // showModal(
    //   "Add License / Compliance",
    //   "Add a license or compliance record",
    //   <AddComplianceForm
    //     legalEntityID={legalEntityID}
    //     closeModal={closeModal}
    //   />,
    // );
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-2 border-2 border-dotted rounded-xl">
      <div className="w-12 h-12 rounded-2xl border-2 border-dashed flex items-center justify-center mb-2">
        <ShieldCheck className="w-5 h-5 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium">No licenses or compliance records</p>
      <p className="text-xs text-muted-foreground max-w-xs leading-5">
        Trade licenses, GST registrations, FSSAI, liquor permits, and other
        compliance records linked to this entity will appear here.
      </p>
      <Button size="sm" onClick={handleAdd}>
        <Plus />
        Add License
      </Button>
    </div>
  );
}

// ─── Card ──────────────────────────────────────────────────────────────────────
function LicenseCard({
  license,
  legalEntityID,
}: {
  license: LegalEntityComplianceResponseDto;
  legalEntityID: string;
}) {
  const { showModal, closeModal } = useFormsModal();

  const handleEdit = () => {
    // showModal(
    //   "Edit License",
    //   "Update license or compliance record",
    //   <AddComplianceForm
    //     legalEntityID={legalEntityID}
    //     licenseID={license.id}
    //     defaultValues={license}
    //     closeModal={closeModal}
    //   />,
    // );
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="rounded-xl border bg-background p-4 space-y-3">
      {/* Top row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg border flex items-center justify-center shrink-0">
            <FileText className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">
              {getLegalEntityLicenseTypeLabel(license.type)}
            </p>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">
              {license.license_number}
            </p>
          </div>
        </div>

        <ExpiryBadge
          validTo={license.valid_to}
          reminderDays={license.renewal_reminder_days}
        />
      </div>

      {/* Details */}
      <div className="border-t pt-3 space-y-2">
        {license.issuing_authority && (
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <Building2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span>{license.issuing_authority}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="w-3.5 h-3.5 shrink-0" />
          <span>
            {formatDate(license.valid_from)}
            {license.valid_to
              ? ` → ${formatDate(license.valid_to)}`
              : " → No expiry"}
          </span>
        </div>

        {license.renewal_reminder_days > 0 && license.valid_to && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
            <span>
              Reminder {license.renewal_reminder_days} days before expiry
            </span>
          </div>
        )}

        {/* Tags row */}
        <div className="flex items-center gap-2 flex-wrap pt-1">
          {license.module && (
            <span className="text-xs px-1.5 py-0.5 rounded border text-muted-foreground">
              {license.module}
            </span>
          )}
          {license.property_id && (
            <span className="text-xs px-1.5 py-0.5 rounded border text-muted-foreground">
              Property
            </span>
          )}
          <span className="text-xs px-1.5 py-0.5 rounded border text-muted-foreground">
            {license.is_active ? "Active" : "Inactive"}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Tab ──────────────────────────────────────────────────────────────────────
export function LegalEntityLicenseComplianceTab({
  legalEntityID,
  data,
}: LegalEntityLicenseComplianceTabProps) {
  const { showModal, closeModal } = useFormsModal();

  const handleAdd = () => {
    // showModal(
    //   "Add License / Compliance",
    //   "Add a license or compliance record",
    //   <AddComplianceForm
    //     legalEntityID={legalEntityID}
    //     closeModal={closeModal}
    //   />,
    // );
  };

  // Loading
  if (!data) {
    return (
      <div className="grid gap-3 md:grid-cols-2 pt-4">
        {[...Array(4)].map((_, i) => (
          <LicenseCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Empty
  if (data.length === 0) {
    return <EmptyCompliance legalEntityID={legalEntityID} />;
  }

  // Expired last, then by valid_from desc
  const sorted = [...data].sort((a, b) => {
    const aStatus = getExpiryStatus(a.valid_to, a.renewal_reminder_days);
    const bStatus = getExpiryStatus(b.valid_to, b.renewal_reminder_days);
    const order = { expiring: 0, valid: 1, perpetual: 2, expired: 3 };
    if (order[aStatus] !== order[bStatus])
      return order[aStatus] - order[bStatus];
    return new Date(b.valid_from).getTime() - new Date(a.valid_from).getTime();
  });

  return (
    <div className="pt-4 space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {data.length} record{data.length !== 1 ? "s" : ""}
        </p>
        <Button
          size="sm"
          variant="outline"
          onClick={handleAdd}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add License</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>

      {/* Grid */}
      <div className="grid gap-3 md:grid-cols-2">
        {sorted.map((license) => (
          <LicenseCard
            key={license.id}
            license={license}
            legalEntityID={legalEntityID}
          />
        ))}
      </div>
    </div>
  );
}
