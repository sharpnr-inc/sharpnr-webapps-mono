import { Skeleton } from "@sharpnr/ui";
import { Mail, Phone, User } from "lucide-react";
import type { LegalEntityContactResponseDto } from "../api/types";
import { LegalEntityContactTypeLabel } from "../utils/entity_type";

interface LegalEntityContactsAndPeopleTabProps {
  data: LegalEntityContactResponseDto[] | undefined;
}

// ─── Skeleton loader ───────────────────────────────────────────────────────────
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
      </div>
    </div>
  );
}

// ─── Contact card ──────────────────────────────────────────────────────────────
function ContactCard({ contact }: { contact: LegalEntityContactResponseDto }) {
  const fullName = `${contact.first_name} ${contact.last_name}`;
  const initials =
    `${contact.first_name[0] ?? ""}${contact.last_name[0] ?? ""}`.toUpperCase();

  return (
    <div className="rounded-xl border bg-background p-4 space-y-3">
      {/* Top row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full border flex items-center justify-center text-xs font-medium shrink-0">
            {initials}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">{fullName}</p>
              {contact.is_primary && (
                <span className="text-xs px-1.5 py-0.5 rounded border text-muted-foreground">
                  Primary
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {contact.designation}
            </p>
          </div>
        </div>

        {/* Status */}
        <span
          className={`text-xs px-2.5 py-1 rounded-full border shrink-0 ${
            contact.is_active
              ? "text-foreground border-border"
              : "text-muted-foreground border-border"
          }`}
        >
          {contact.is_active ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Divider + details */}
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
            <span className="font-medium text-foreground">DIN</span>
            <span>{contact.din}</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-xs text-muted-foreground">
        Added{" "}
        {new Date(contact.added_on).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </div>
    </div>
  );
}

// ─── Empty state ───────────────────────────────────────────────────────────────
function EmptyContacts() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-12 h-12 rounded-2xl border-2 border-dashed flex items-center justify-center mb-4">
        <User className="w-5 h-5 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium mb-1">No contacts added yet</p>
      <p className="text-xs text-muted-foreground max-w-xs leading-5">
        Directors, authorized signatories, and key personnel linked to this
        legal entity will appear here.
      </p>
    </div>
  );
}

// ─── Tab ──────────────────────────────────────────────────────────────────────
export function LegalEntityContactsAndPeopleTab({
  data,
}: LegalEntityContactsAndPeopleTabProps) {
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
  if (data.length === 0) {
    return <EmptyContacts />;
  }

  // Primary contact first, then alphabetical
  const sorted = [...data].sort((a, b) => {
    if (a.is_primary !== b.is_primary) return a.is_primary ? -1 : 1;
    return a.first_name.localeCompare(b.first_name);
  });

  return (
    <div className="pt-4 space-y-4">
      {/* Count */}
      <p className="text-xs text-muted-foreground">
        {data.length} contact{data.length !== 1 ? "s" : ""}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sorted.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
  );
}
