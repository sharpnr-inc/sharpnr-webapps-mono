import { Button, Skeleton, useFormsModal } from "@sharpnr/ui";
import { MapPin, Plus, Building2 } from "lucide-react";
import type { LegalEntityAddressResponseDto } from "../../api/types";
import { getLegalEntityAddressTypeLabel } from "../../utils/entity_type";

interface LegalEntityAddressesTabProps {
  legalEntityID: string;
  data: LegalEntityAddressResponseDto[] | undefined;
}

// ─── Skeleton ──────────────────────────────────────────────────────────────────
function AddressCardSkeleton() {
  return (
    <div className="rounded-xl border p-4 space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5">
          <Skeleton className="h-3.5 w-28" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="h-5 w-14 rounded-full shrink-0" />
      </div>
      <div className="border-t pt-3 space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
        <Skeleton className="h-3 w-2/3" />
      </div>
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
  );
}

// ─── Empty ─────────────────────────────────────────────────────────────────────
function EmptyAddresses({ legalEntityID }: { legalEntityID: string }) {
  const { showModal, closeModal } = useFormsModal();

  const handleAdd = () => {
    // showModal(
    //   "Add Address",
    //   "Add a registered or operational address",
    //   <AddAddressForm legalEntityID={legalEntityID} closeModal={closeModal} />,
    // );
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-2 border-2 border-dotted rounded-xl">
      <div className="w-12 h-12 rounded-2xl border-2 border-dashed flex items-center justify-center mb-2">
        <MapPin className="w-5 h-5 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium">No addresses added yet</p>
      <p className="text-xs text-muted-foreground max-w-xs leading-5">
        Registered office, branch, and operational addresses for this legal
        entity will appear here.
      </p>
      <Button size="sm" onClick={handleAdd}>
        <Plus />
        Add Address
      </Button>
    </div>
  );
}

// ─── Card ──────────────────────────────────────────────────────────────────────
function AddressCard({
  address,
  legalEntityID,
}: {
  address: LegalEntityAddressResponseDto;
  legalEntityID: string;
}) {
  const { showModal, closeModal } = useFormsModal();

  const handleEdit = () => {
    // showModal(
    //   "Edit Address",
    //   "Update address details",
    //   <AddAddressForm
    //     legalEntityID={legalEntityID}
    //     addressID={address.id}
    //     defaultValues={address}
    //     closeModal={closeModal}
    //   />,
    // );
  };

  const lines = [
    address.address_line1,
    address.address_line2,
    address.landmark,
  ].filter(Boolean);

  return (
    <div className="rounded-xl border bg-background p-4 space-y-3">
      {/* Top row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg border flex items-center justify-center shrink-0">
            {address.property_id ? (
              <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
            ) : (
              <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-medium">
                {getLegalEntityAddressTypeLabel(address.type)}
              </p>
              {address.is_primary && (
                <span className="text-xs px-1.5 py-0.5 rounded border text-muted-foreground shrink-0">
                  Primary
                </span>
              )}
            </div>
            {address.gst_state_code && (
              <p className="text-xs text-muted-foreground mt-0.5">
                GST State: {address.gst_state_code}
              </p>
            )}
          </div>
        </div>

        <span className="text-xs px-2.5 py-1 rounded-full border shrink-0 text-muted-foreground">
          {address.property_id ? "Property" : "Entity"}
        </span>
      </div>

      {/* Address lines */}
      <div className="border-t pt-3 space-y-1">
        {lines.map((line, i) => (
          <p key={i} className="text-xs text-muted-foreground">
            {line}
          </p>
        ))}
        <p className="text-xs text-muted-foreground">
          {[address.city, address.state, address.pincode]
            .filter(Boolean)
            .join(", ")}
        </p>
        <p className="text-xs text-muted-foreground">{address.country}</p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3 shrink-0" />
          <span>{address.pincode}</span>
        </div>
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
export function LegalEntityAddressesTab({
  legalEntityID,
  data,
}: LegalEntityAddressesTabProps) {
  const { showModal, closeModal } = useFormsModal();

  const handleAdd = () => {
    showModal(
      "Add Address",
      "Add a registered or operational address",
      <AddAddressForm legalEntityID={legalEntityID} closeModal={closeModal} />,
    );
  };

  // Loading
  if (!data) {
    return (
      <div className="grid gap-3 md:grid-cols-2 pt-4">
        {[...Array(4)].map((_, i) => (
          <AddressCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Empty
  if (data.length === 0) {
    return <EmptyAddresses legalEntityID={legalEntityID} />;
  }

  // Primary first, then by type
  const sorted = [...data].sort((a, b) => {
    if (a.is_primary !== b.is_primary) return a.is_primary ? -1 : 1;
    return a.type.localeCompare(b.type);
  });

  return (
    <div className="pt-4 space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {data.length} address{data.length !== 1 ? "es" : ""}
        </p>
        <Button
          size="sm"
          variant="outline"
          onClick={handleAdd}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Address</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>

      {/* Grid */}
      <div className="grid gap-3 md:grid-cols-2">
        {sorted.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            legalEntityID={legalEntityID}
          />
        ))}
      </div>
    </div>
  );
}
