import { useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  Input,
  Textarea,
  Button,
  Separator,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sharpnr/ui";
import { cn } from "@/lib/utils";
import {
  usePolicyBuilderStore,
  type PrincipalOp,
  type ResourceOp,
  type ActionOp,
} from "./store/usePolicyBuilderStore";
import { buildPolicyText } from "./utils/buildPolicyText";
import { verifyPolicy } from "./utils/verifyPolicy";

/* -------------------------------------------------------------------------- */
/*                                  Props                                      */
/* -------------------------------------------------------------------------- */

export interface PolicyBuilderProps {
  /** Fired whenever the draft changes, with the generated Cedar text and validity. */
  onChange?: (result: { text: string; valid: boolean }) => void;
  className?: string;
}

const PRINCIPAL_OPS: { value: PrincipalOp; label: string }[] = [
  { value: "All", label: "Any principal" },
  { value: "==", label: "is exactly (==)" },
  { value: "in", label: "is in group (in)" },
  { value: "is", label: "is of type (is)" },
];

const ACTION_OPS: { value: ActionOp; label: string }[] = [
  { value: "All", label: "Any action" },
  { value: "==", label: "is exactly (==)" },
  { value: "in", label: "is in group (in)" },
];

const RESOURCE_OPS: { value: ResourceOp; label: string }[] = [
  { value: "All", label: "Any resource" },
  { value: "==", label: "is exactly (==)" },
  { value: "in", label: "is in group (in)" },
  { value: "is", label: "is of type (is)" },
];

/* -------------------------------------------------------------------------- */
/*                              Scope sub-field                               */
/* -------------------------------------------------------------------------- */

function ScopeField({
  title,
  op,
  ops,
  entityType,
  entityId,
  onOpChange,
  onTypeChange,
  onIdChange,
}: {
  title: string;
  op: string;
  ops: { value: string; label: string }[];
  entityType: string;
  entityId: string;
  onOpChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onIdChange: (value: string) => void;
}) {
  const showType = op !== "All";
  const showId = op === "==" || op === "in";

  return (
    <div className="space-y-2 rounded-lg border p-4">
      <Label className="text-sm font-medium capitalize">{title}</Label>
      <div className="grid gap-2 sm:grid-cols-3">
        <Select value={op} onValueChange={onOpChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Operator" />
          </SelectTrigger>
          <SelectContent>
            {ops.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {showType && (
          <Input
            value={entityType}
            onChange={(e) => onTypeChange(e.target.value)}
            placeholder="Type (e.g. User)"
          />
        )}

        {showId && (
          <Input
            value={entityId}
            onChange={(e) => onIdChange(e.target.value)}
            placeholder='Id (e.g. "alice")'
          />
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Policy Builder                                 */
/* -------------------------------------------------------------------------- */

export default function PolicyBuilder({
  onChange,
  className,
}: PolicyBuilderProps) {
  const state = usePolicyBuilderStore();
  const {
    name,
    description,
    effect,
    principal,
    action,
    resource,
    conditions,
    setName,
    setDescription,
    setEffect,
    setPrincipal,
    setAction,
    setResource,
    addCondition,
    updateCondition,
    removeCondition,
  } = state;

  // Generate + validate the Cedar policy behind the scenes and report it up.
  // Nothing technical is shown to the user — this just drives the parent's
  // "is the policy ready to save?" state.
  useEffect(() => {
    const text = buildPolicyText(state);
    const verification = verifyPolicy(text);
    onChange?.({ text: verification.formatted, valid: verification.ok });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, description, effect, principal, action, resource, conditions]);

  return (
    <div className={cn("mx-auto max-w-2xl space-y-5", className)}>
      {/* Metadata */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Allow staff to view bookings"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Effect</Label>
          <Select
            value={effect}
            onValueChange={(v) => setEffect(v as typeof effect)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="permit">Permit (allow)</SelectItem>
              <SelectItem value="forbid">Forbid (deny)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-sm font-medium">Description</Label>
        <Textarea
          value={description}
          rows={2}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What does this policy do?"
        />
      </div>

      <Separator />

      {/* Scope */}
      <div className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Scope
        </p>
        <ScopeField
          title="principal"
          op={principal.op}
          ops={PRINCIPAL_OPS}
          entityType={principal.entityType}
          entityId={principal.entityId}
          onOpChange={(op) => setPrincipal({ op: op as PrincipalOp })}
          onTypeChange={(entityType) => setPrincipal({ entityType })}
          onIdChange={(entityId) => setPrincipal({ entityId })}
        />
        <ScopeField
          title="action"
          op={action.op}
          ops={ACTION_OPS}
          entityType={action.entityType}
          entityId={action.entityId}
          onOpChange={(op) => setAction({ op: op as ActionOp })}
          onTypeChange={(entityType) => setAction({ entityType })}
          onIdChange={(entityId) => setAction({ entityId })}
        />
        <ScopeField
          title="resource"
          op={resource.op}
          ops={RESOURCE_OPS}
          entityType={resource.entityType}
          entityId={resource.entityId}
          onOpChange={(op) => setResource({ op: op as ResourceOp })}
          onTypeChange={(entityType) => setResource({ entityType })}
          onIdChange={(entityId) => setResource({ entityId })}
        />
      </div>

      <Separator />

      {/* Conditions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Conditions
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => addCondition("when")}
            >
              <Plus className="h-3.5 w-3.5" /> when
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => addCondition("unless")}
            >
              <Plus className="h-3.5 w-3.5" /> unless
            </Button>
          </div>
        </div>

        {conditions.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No conditions — the policy applies to the whole scope above.
          </p>
        )}

        {conditions.map((cond) => (
          <div key={cond.id} className="flex items-start gap-2">
            <span className="mt-2 w-14 shrink-0 font-mono text-xs text-muted-foreground">
              {cond.kind}
            </span>
            <Textarea
              value={cond.expression}
              rows={2}
              className="font-mono text-sm"
              onChange={(e) =>
                updateCondition(cond.id, { expression: e.target.value })
              }
              placeholder="e.g. resource.owner == principal"
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={() => removeCondition(cond.id)}
              aria-label="Remove condition"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
