import { useState } from "react";
import {
  ArrowLeft,
  Plus,
  ScrollText,
  Trash2,
  Calendar,
  Hash,
  Users,
  ShieldCheck,
} from "lucide-react";
import {
  Button,
  Badge,
  Separator,
  Switch,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Textarea,
} from "@sharpnr/ui";
import { useNavigate, useParams } from "@tanstack/react-router";
import { RoleCard } from "../components/RoleCard";
import type { OrgRole } from "../api/types";

/* -------------------------------------------------------------------------- */
/*  Dummy data — replace with real queries once the API is wired up.          */
/* -------------------------------------------------------------------------- */

const DUMMY_ROLE: OrgRole = {
  id: "role_finance",
  slug: "finance",
  name: "Finance",
  description:
    "Handles billing, invoices and payouts. Can view financial reports and manage payment methods, but cannot change organization settings.",
};

interface DummyPolicy {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

const INITIAL_POLICIES: DummyPolicy[] = [
  {
    id: "pol_view_invoices",
    name: "View invoices",
    description: "Read access to all invoices and billing history.",
    enabled: true,
  },
  {
    id: "pol_manage_payments",
    name: "Manage payment methods",
    description: "Add, update or remove organization payment methods.",
    enabled: true,
  },
  {
    id: "pol_export_reports",
    name: "Export financial reports",
    description: "Download revenue, tax and payout reports as CSV/PDF.",
    enabled: false,
  },
];

/* A small bordered key/value row for the details panel. */
function DetailRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Hash;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3">
      <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="h-4 w-4" />
        {label}
      </span>
      <span className="text-sm font-medium text-foreground">{children}</span>
    </div>
  );
}

const ManageRole = () => {
  const nav = useNavigate();
  const { roleID } = useParams({
    from: "/_appuser/authorization/roles/$roleID/",
  });

  // In a real build this would be fetched by `roleID`. For now: dummy data.
  const role: OrgRole = { ...DUMMY_ROLE, id: roleID || DUMMY_ROLE.id };
  const isDefault = ["owner", "admin"].includes(role.slug);

  const [policies, setPolicies] = useState<DummyPolicy[]>(INITIAL_POLICIES);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [draftDesc, setDraftDesc] = useState("");

  const togglePolicy = (id: string) =>
    setPolicies((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)),
    );

  const removePolicy = (id: string) =>
    setPolicies((prev) => prev.filter((p) => p.id !== id));

  const addPolicy = () => {
    if (!draftName.trim()) return;
    setPolicies((prev) => [
      ...prev,
      {
        id: `pol_${Date.now()}`,
        name: draftName.trim(),
        description: draftDesc.trim() || "No description provided.",
        enabled: true,
      },
    ]);
    setDraftName("");
    setDraftDesc("");
    setDialogOpen(false);
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

      {/* ---- Top: role card (left) + details (right) ---- */}
      <section className="grid gap-5 md:grid-cols-[minmax(0,300px)_1fr]">
        <RoleCard role={role} memberCount={8} hideAction />

        <div className="flex flex-col rounded-2xl border">
          <div className="flex items-start justify-between gap-3 p-4">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-foreground">
                {role.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                {role.description}
              </p>
            </div>
            <Badge variant={isDefault ? "default" : "secondary"}>
              {isDefault ? "Default" : "Custom"}
            </Badge>
          </div>

          <Separator />

          {/* Bordered detail rows */}
          <div className="divide-y">
            <DetailRow icon={Hash} label="Slug">
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                {role.slug}
              </code>
            </DetailRow>
            <DetailRow icon={Users} label="Members">
              8 people
            </DetailRow>
            <DetailRow icon={ShieldCheck} label="Policies">
              {policies.filter((p) => p.enabled).length} active
            </DetailRow>
            <DetailRow icon={Calendar} label="Created">
              Jan 12, 2026
            </DetailRow>
          </div>
        </div>
      </section>

      {/* ---- Policies ---- */}
      <section className="space-y-3 rounded-2xl border p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-0.5">
            <h2 className="inline-flex items-center gap-2 text-base font-semibold text-foreground">
              <ScrollText className="h-4 w-4 text-primary" />
              Policies
            </h2>
            <p className="text-sm text-muted-foreground">
              Rules that decide what this role can and can't do.
            </p>
          </div>

          {/* Add policy feature */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <Plus className="h-4 w-4" /> Add Policy
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a policy</DialogTitle>
                <DialogDescription>
                  Attach a new permission rule to the {role.name} role.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3 py-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Policy name
                  </label>
                  <Input
                    value={draftName}
                    onChange={(e) => setDraftName(e.target.value)}
                    placeholder="e.g. Approve refunds"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Description
                  </label>
                  <Textarea
                    value={draftDesc}
                    onChange={(e) => setDraftDesc(e.target.value)}
                    placeholder="What does this policy allow?"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={addPolicy} disabled={!draftName.trim()}>
                  Add Policy
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Separator />

        {policies.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed py-10 text-center">
            <ScrollText className="h-6 w-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No policies attached yet.
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {policies.map((policy) => (
              <li
                key={policy.id}
                className="flex items-center justify-between gap-4 rounded-lg border p-3.5 transition-colors hover:border-primary/40"
              >
                <div className="min-w-0 space-y-0.5">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium text-foreground">
                      {policy.name}
                    </p>
                    {!policy.enabled && (
                      <Badge variant="secondary" className="text-[10px]">
                        Disabled
                      </Badge>
                    )}
                  </div>
                  <p className="truncate text-xs text-muted-foreground">
                    {policy.description}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <Switch
                    checked={policy.enabled}
                    onCheckedChange={() => togglePolicy(policy.id)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => removePolicy(policy.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default ManageRole;
