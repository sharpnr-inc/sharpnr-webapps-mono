import { Button, Input, Label, useModal } from "@sharpnr/ui";
import { ShieldPlus, AlertTriangle } from "lucide-react";
import { useState } from "react";

/* ── Modal form ────────────────────────────────────────────── */

function AddSuperAdminForm({ closeModal }: { closeModal: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSubmit = name.trim().length > 1 && emailValid && !submitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      // TODO: wire to real mutation, e.g. addSuperAdminMutation({ name, email })
      await new Promise((resolve) => setTimeout(resolve, 600));
      closeModal();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Warning notice */}
      <div className="flex items-start gap-2.5 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2.5">
        <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
        <p className="text-xs text-muted-foreground">
          Super Admins have full, unrestricted access to the organization —
          including billing, members, and security settings. Only grant this to
          people you fully trust.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="sa-name">Full name</Label>
        <Input
          id="sa-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Jordan Rivera"
          autoFocus
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="sa-email">Email address</Label>
        <Input
          id="sa-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@company.com"
        />
        {email.length > 0 && !emailValid && (
          <span className="text-xs text-destructive">
            Enter a valid email address.
          </span>
        )}
      </div>

      <div className="flex items-center justify-end gap-2 pt-2">
        <Button type="button" variant="ghost" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit" disabled={!canSubmit}>
          <ShieldPlus className="h-4 w-4" />
          {submitting ? "Adding…" : "Add Super Admin"}
        </Button>
      </div>
    </form>
  );
}

/* ── Trigger button ────────────────────────────────────────── */

export function AddSuperAdminButton() {
  const { openModal, closeModal } = useModal();

  const handleClick = () => {
    openModal({
      title: "Add Super Admin",
      description:
        "Grant a person full administrative control over this organization.",
      size: "sm",
      content: <AddSuperAdminForm closeModal={closeModal} />,
    });
  };

  return (
    <Button size="sm" onClick={handleClick} className="shrink-0">
      <ShieldPlus className="h-4 w-4" />
      <span className="hidden sm:inline">Add Super Admin</span>
      <span className="sm:hidden">Add</span>
    </Button>
  );
}
