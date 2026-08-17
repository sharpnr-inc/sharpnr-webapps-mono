import { useEffect } from "react";
import {
  ArrowLeft,
  ShieldUser,
  Check,
  Sparkles,
  ScrollText,
} from "lucide-react";
import { Input, Textarea, Button, Separator } from "@sharpnr/ui";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@sharpnr/utils";
import { RoleCard } from "../components/RoleCard";
import { useAddRoleStore } from "../store/useAddRoleStore";
import type { OrgRole } from "../api/types";

/* Starter policies a new role can opt into — dummy data for now. */
const STARTER_POLICIES = [
  { id: "pol_view_dashboard", name: "View dashboard", desc: "See the main overview screens." },
  { id: "pol_manage_bookings", name: "Manage bookings", desc: "Create, edit and cancel bookings." },
  { id: "pol_view_reports", name: "View reports", desc: "Read financial and activity reports." },
  { id: "pol_manage_members", name: "Manage members", desc: "Invite and remove organization members." },
];

function FieldLabel({
  children,
  hint,
}: {
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="flex items-baseline justify-between">
      <label className="text-sm font-medium text-foreground">{children}</label>
      {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
    </div>
  );
}

const AddRolePage = () => {
  const nav = useNavigate();
  const {
    name,
    slug,
    description,
    policies,
    setName,
    setSlug,
    setDescription,
    togglePolicy,
    reset,
  } = useAddRoleStore();

  // Start from a clean draft each time the page mounts.
  useEffect(() => {
    reset();
  }, [reset]);

  // Live preview role fed straight from the store.
  const previewRole: OrgRole = {
    id: "preview",
    slug: slug || "new-role",
    name: name.trim() || "New role",
    description:
      description.trim() ||
      "Describe what this role is for so teammates know when to use it.",
  };

  const canCreate = name.trim().length > 0;

  const handleCreate = () => {
    // TODO: wire up to the create-role mutation. For now just log + go back.
    console.log("Create role", { name, slug, description, policies });
    reset();
    nav({ to: "/authorization/roles" });
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-6">
      {/* Back navigation */}
      <button
        type="button"
        onClick={() => nav({ to: "/authorization/roles" })}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to roles
      </button>

      {/* Header */}
      <header className="space-y-1">
        <div className="flex items-center gap-2">
          <ShieldUser className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-semibold text-foreground">
            Create a role
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Give the role a name, describe what it's for, and pick the policies it
          should start with.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        {/* ---- Left: live preview ---- */}
        <div className="space-y-3 md:sticky md:top-6 md:self-start">
          <RoleCard role={previewRole} memberCount={0} hideAction />
          <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            Live preview — updates as you type
          </p>
        </div>

        {/* ---- Right: form ---- */}
        <div className="space-y-6 rounded-2xl border p-5">
          {/* Name */}
          <div className="space-y-1.5">
            <FieldLabel>Role name</FieldLabel>
            <Input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Finance Manager"
            />
          </div>

          {/* Slug */}
          <div className="space-y-1.5">
            <FieldLabel hint="Used internally — auto-filled from the name">
              Identifier
            </FieldLabel>
            <div className="flex items-center rounded-md border bg-muted/40 focus-within:ring-2 focus-within:ring-ring">
              <span className="select-none pl-3 pr-1 text-sm text-muted-foreground">
                role/
              </span>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="new-role"
                className="w-full bg-transparent py-2 pr-3 font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <FieldLabel hint={`${description.length}/160`}>
              Description
            </FieldLabel>
            <Textarea
              value={description}
              maxLength={160}
              rows={3}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What can people with this role do?"
            />
          </div>

          <Separator />

          {/* Starter policies */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <FieldLabel>Starter policies</FieldLabel>
              <span className="text-xs text-muted-foreground">
                {policies.length} selected
              </span>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {STARTER_POLICIES.map((policy) => {
                const selected = policies.includes(policy.id);
                return (
                  <button
                    key={policy.id}
                    type="button"
                    onClick={() => togglePolicy(policy.id)}
                    className={cn(
                      "flex items-start gap-2.5 rounded-lg border p-3 text-left transition-colors",
                      selected
                        ? "border-primary bg-primary/5"
                        : "hover:border-primary/40 hover:bg-muted/40",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                        selected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted-foreground/40",
                      )}
                    >
                      {selected && <Check className="h-3 w-3" />}
                    </span>
                    <span className="min-w-0 space-y-0.5">
                      <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                        <ScrollText className="h-3.5 w-3.5 text-muted-foreground" />
                        {policy.name}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {policy.desc}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => nav({ to: "/authorization/roles" })}
            >
              Cancel
            </Button>
            <Button disabled={!canCreate} onClick={handleCreate}>
              Create role
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRolePage;
