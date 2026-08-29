import { useMemo, useState } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Button } from "@sharpnr/ui";
import { useNavigate } from "@tanstack/react-router";
import {
  DEMO_CATALOG,
  DEMO_PALETTE,
  DEMO_ROLES,
  PermissionMatrix,
  type RolePermissionsPayload,
} from "@sharpnr/policy-builder";

/**
 * Role permissions.
 *
 * This page used to host the Cedar-shaped <PolicyBuilder> — effect, three scope
 * constraints of operator plus entity type plus entity id, and a free-text
 * Cedar `when` expression. Those are the right controls for someone who knows
 * Cedar and the wrong ones for the office administrators who actually manage
 * an organization's access.
 *
 * The matrix asks one kind of question instead — is this box ticked, and does
 * it cover every property or only these — and the SERVER turns the answer into
 * Cedar. The old builder is still exported from @sharpnr/policy-builder for the
 * advanced/developer path; it is simply no longer what this screen shows.
 *
 * Running on DEMO_CATALOG / DEMO_ROLES until the two backend endpoints exist:
 *   GET  /orchestrator/sentinel/roles/:roleID/permissions
 *   PUT  /orchestrator/sentinel/roles/:roleID/permissions
 * Drop the `catalog` prop and swap the demo state for useRolePermissions /
 * useSaveRolePermissions to go live.
 */
const CreateNewPolicyPage = () => {
  const nav = useNavigate();

  // Stands in for the server's stored permissions, so Save visibly persists
  // and switching roles shows a different set of boxes.
  const [roles, setRoles] = useState(DEMO_ROLES);
  const [activeId, setActiveId] = useState(DEMO_ROLES[1]!.id);

  const active = useMemo(
    () => roles.find((r) => r.id === activeId) ?? roles[0]!,
    [roles, activeId],
  );

  const handleSave = (payload: RolePermissionsPayload) => {
    setRoles((prev) =>
      prev.map((r) =>
        r.id === active.id
          ? { ...r, actions: payload.actions, rules: payload.rules }
          : r,
      ),
    );
    console.log("PUT /roles/" + active.id + "/permissions", payload);
  };

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-5">
      <button
        type="button"
        onClick={() => nav({ to: "/authorization/policies" })}
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 self-start text-sm transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to policies
      </button>

      <header className="space-y-1">
        <div className="flex items-center gap-2">
          <ShieldCheck className="text-primary h-5 w-5" />
          <h1 className="text-foreground text-xl font-semibold">
            Role permissions
          </h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Choose what each role can do. Grants can be limited to specific
          properties, and restricted to when they apply.
        </p>
      </header>

      {/* Role switcher — a stand-in for the roles list this screen will hang off. */}
      <div className="flex flex-wrap gap-2">
        {roles.map((role) => (
          <Button
            key={role.id}
            size="sm"
            variant={role.id === active.id ? "default" : "outline"}
            onClick={() => setActiveId(role.id)}
          >
            {role.name}
          </Button>
        ))}
      </div>

      <div className="rounded-2xl border p-5">
        <PermissionMatrix
          // `key` remounts the matrix on a role change so the draft is reloaded
          // from that role's stored permissions rather than carried across.
          key={active.id}
          roleName={active.name}
          catalog={DEMO_CATALOG}
          initialActions={active.actions}
          initialRules={active.rules}
          palette={DEMO_PALETTE}
          onSave={handleSave}
          className="max-w-none"
        >
          <PermissionMatrix.Toolbar roleName={active.name} />
          <PermissionMatrix.Groups />
          <PermissionMatrix.Preview />
          <PermissionMatrix.Footer />
        </PermissionMatrix>
      </div>
    </div>
  );
};

export default CreateNewPolicyPage;
