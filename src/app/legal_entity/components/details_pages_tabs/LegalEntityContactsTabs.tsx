import { Button, Skeleton, useFormsModal } from "@sharpnr/ui";
import { Mail, Phone, User, Plus, Pencil } from "lucide-react";
import type { LegalEntityContactResponseDto } from "../../api/types";
import { LegalEntityContactTypeLabel } from "../../utils/entity_type";
import { AddContactsForm } from "../forms/AddContactsForm";

interface LegalEntityContactsAndPeopleTabProps {
  legalEntityID?: string;
  data: LegalEntityContactResponseDto[] | undefined;
}

// ─── Skeleton ──────────────────────────────────────────────────────────────────
function ContactCardSkeleton() {
  return (
    <div className="rounded-xl border p-4 space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-9 h-9 rounded-full shrink-0" />
          <div className="space-y-1.5">
            <Skeleton className="h-3.5 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <Skeleton className="h-5 w-16 rounded-full shrink-0" />
      </div>
      <div className="border-t pt-3 space-y-2">
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-2/5" />
      </div>
      <Skeleton className="h-2.5 w-1/3" />
    </div>
  );
}

// ─── Empty ─────────────────────────────────────────────────────────────────────
function EmptyContacts({ legalEntityID }: { legalEntityID: string }) {
  const { showModal, closeModal } = useFormsModal();

  const handleAddContact = () => {
    showModal(
      "Add Contact",
      "Add contacts in Legal Entity",
      <AddContactsForm legalEntityID={legalEntityID} closeModal={closeModal} />,
    );
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-2 border-2 border-dotted rounded-xl">
      <div className="w-12 h-12 rounded-2xl border-2 border-dashed flex items-center justify-center mb-4">
        <User className="w-5 h-5 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium mb-1">No contacts added yet</p>
      <p className="text-xs text-muted-foreground max-w-xs leading-5">
        Directors, authorized signatories, and key personnel linked to this
        legal entity will appear here.
      </p>
      <Button size="sm" onClick={handleAddContact}>
        <Plus />
        Add Contacts
      </Button>
    </div>
  );
}

// ─── Card ──────────────────────────────────────────────────────────────────────
function ContactCard({
  contact,
  legalEntityID,
}: {
  contact: LegalEntityContactResponseDto;
  legalEntityID?: string;
}) {
  const { showModal, closeModal } = useFormsModal();

  const fullName = `${contact.first_name} ${contact.last_name}`;
  const initials =
    `${contact.first_name[0] ?? ""}${contact.last_name[0] ?? ""}`.toUpperCase();

  const handleEdit = () => {
    showModal(
      "Edit Contact",
      "Update contact details",
      <AddContactsForm
        legalEntityID={legalEntityID ?? ""}
        closeModal={closeModal}
      />,
    );
  };

  return (
    <div className="rounded-xl border bg-background p-4 space-y-3">
      {/* Top row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full border flex items-center justify-center text-xs font-medium shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-medium truncate">{fullName}</p>
              {contact.is_primary && (
                <span className="text-xs px-1.5 py-0.5 rounded border text-muted-foreground shrink-0">
                  Primary
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 truncate">
              {contact.designation}
            </p>
          </div>
        </div>

        <span className="text-xs px-2.5 py-1 rounded-full border shrink-0 text-muted-foreground">
          {contact.is_active ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Details */}
      <div className="border-t pt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Mail className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{contact.email}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Phone className="w-3.5 h-3.5 shrink-0" />
          <span>{contact.mobile}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <User className="w-3.5 h-3.5 shrink-0" />
          <span>{LegalEntityContactTypeLabel[contact.type]}</span>
        </div>
        {contact.din && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-medium text-foreground shrink-0">DIN</span>
            <span className="font-mono">{contact.din}</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Added{" "}
          {new Date(contact.added_on).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
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
export function LegalEntityContactsAndPeopleTab({
  legalEntityID,
  data,
}: LegalEntityContactsAndPeopleTabProps) {
  const { showModal, closeModal } = useFormsModal();

  const handleAddContact = () => {
    showModal(
      "Add Contact",
      "Add contacts in Legal Entity",
      <AddContactsForm
        legalEntityID={legalEntityID ?? ""}
        closeModal={closeModal}
      />,
    );
  };

  // Loading
  if (!data) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
        {[...Array(4)].map((_, i) => (
          <ContactCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Empty
  if (data.length === 0 && legalEntityID) {
    return <EmptyContacts legalEntityID={legalEntityID} />;
  }

  // Primary first, then alphabetical
  const sorted = [...data].sort((a, b) => {
    if (a.is_primary !== b.is_primary) return a.is_primary ? -1 : 1;
    return a.first_name.localeCompare(b.first_name);
  });

  return (
    <div className="pt-4 space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {data.length} contact{data.length !== 1 ? "s" : ""}
        </p>
        <Button
          size="sm"
          variant="outline"
          onClick={handleAddContact}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Contact</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sorted.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            legalEntityID={legalEntityID}
          />
        ))}
      </div>
    </div>
  );
}
