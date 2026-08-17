import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
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
import { cn } from "@sharpnr/utils";
import {
  usePolicyBuilderStore,
  type PrincipalOp,
  type ResourceOp,
  type ActionOp,
} from "./store/usePolicyBuilderStore";
import { buildPolicyText } from "./utils/buildPolicyText";
import { verifyPolicy } from "./utils/verifyPolicy";

/* -------------------------------------------------------------------------- */
/*                                  Context                                    */
/* -------------------------------------------------------------------------- */

/** The live, generated Cedar policy — shared with every sub-component. */
interface PolicyBuilderContextValue {
  text: string;
  valid: boolean;
}

const PolicyBuilderContext = createContext<PolicyBuilderContextValue | null>(
  null,
);

function usePolicyBuilderContext(component: string) {
  const ctx = useContext(PolicyBuilderContext);
  if (!ctx) {
    throw new Error(
      `<PolicyBuilder.${component}> must be rendered inside <PolicyBuilder>.`,
    );
  }
  return ctx;
}

/* -------------------------------------------------------------------------- */
/*                              Operator presets                              */
/* -------------------------------------------------------------------------- */

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

/** Small uppercase section heading used between groups. */
function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
      {children}
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Sub-components                              */
/* -------------------------------------------------------------------------- */

function Name({ className }: { className?: string }) {
  const name = usePolicyBuilderStore((s) => s.name);
  const setName = usePolicyBuilderStore((s) => s.setName);
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label className="text-sm font-medium">Name</Label>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Allow staff to view bookings"
      />
    </div>
  );
}

function EffectField({ className }: { className?: string }) {
  const effect = usePolicyBuilderStore((s) => s.effect);
  const setEffect = usePolicyBuilderStore((s) => s.setEffect);
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label className="text-sm font-medium">Effect</Label>
      <Select value={effect} onValueChange={(v) => setEffect(v as typeof effect)}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="permit">Permit (allow)</SelectItem>
          <SelectItem value="forbid">Forbid (deny)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function Description({ className }: { className?: string }) {
  const description = usePolicyBuilderStore((s) => s.description);
  const setDescription = usePolicyBuilderStore((s) => s.setDescription);
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label className="text-sm font-medium">Description</Label>
      <Textarea
        value={description}
        rows={2}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="What does this policy do?"
      />
    </div>
  );
}

/** Convenience grouping of Name + Effect + Description. */
function Metadata({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-5", className)}>
      <div className="grid gap-3 sm:grid-cols-2">
        <Name />
        <EffectField />
      </div>
      <Description />
    </div>
  );
}

function Principal() {
  const principal = usePolicyBuilderStore((s) => s.principal);
  const setPrincipal = usePolicyBuilderStore((s) => s.setPrincipal);
  return (
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
  );
}

function Action() {
  const action = usePolicyBuilderStore((s) => s.action);
  const setAction = usePolicyBuilderStore((s) => s.setAction);
  return (
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
  );
}

function Resource() {
  const resource = usePolicyBuilderStore((s) => s.resource);
  const setResource = usePolicyBuilderStore((s) => s.setResource);
  return (
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
  );
}

/**
 * Scope section. Renders principal/action/resource by default, but accepts
 * children so consumers can reorder or omit individual constraints.
 */
function Scope({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      <SectionLabel>Scope</SectionLabel>
      {children ?? (
        <>
          <Principal />
          <Action />
          <Resource />
        </>
      )}
    </div>
  );
}

function Conditions({ className }: { className?: string }) {
  const conditions = usePolicyBuilderStore((s) => s.conditions);
  const addCondition = usePolicyBuilderStore((s) => s.addCondition);
  const updateCondition = usePolicyBuilderStore((s) => s.updateCondition);
  const removeCondition = usePolicyBuilderStore((s) => s.removeCondition);

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <SectionLabel>Conditions</SectionLabel>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => addCondition("when")}>
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
  );
}

/**
 * Renders the live-generated Cedar text from context. Handy for consumers that
 * want to surface a preview alongside the form.
 */
function Preview({ className }: { className?: string }) {
  const { text, valid } = usePolicyBuilderContext("Preview");
  return (
    <pre
      className={cn(
        "overflow-auto rounded-lg border bg-muted/40 p-4 font-mono text-xs",
        !valid && "border-destructive/50",
        className,
      )}
    >
      {text || "// start building to see the generated policy"}
    </pre>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Policy Builder root                           */
/* -------------------------------------------------------------------------- */

export interface PolicyBuilderProps {
  /** Fired whenever the draft changes, with the generated Cedar text and validity. */
  onChange?: (result: { text: string; valid: boolean }) => void;
  /**
   * Compose the builder from its sub-components. When omitted, the default
   * layout (metadata → scope → conditions) is rendered.
   */
  children?: ReactNode;
  className?: string;
}

function PolicyBuilderRoot({
  onChange,
  children,
  className,
}: PolicyBuilderProps) {
  const state = usePolicyBuilderStore();
  const { name, description, effect, principal, action, resource, conditions } =
    state;

  // Generate + validate the Cedar policy behind the scenes. This is recomputed
  // whenever any part of the draft changes and shared via context.
  const result = useMemo(() => {
    const text = buildPolicyText(state);
    const verification = verifyPolicy(text);
    return { text: verification.formatted, valid: verification.ok };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, description, effect, principal, action, resource, conditions]);

  // Report the latest draft up to the parent ("is the policy ready to save?").
  useEffect(() => {
    onChange?.(result);
  }, [result, onChange]);

  return (
    <PolicyBuilderContext.Provider value={result}>
      <div className={cn("mx-auto max-w-2xl space-y-5", className)}>
        {children ?? (
          <>
            <Metadata />
            <Separator />
            <Scope />
            <Separator />
            <Conditions />
          </>
        )}
      </div>
    </PolicyBuilderContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Compound export                               */
/* -------------------------------------------------------------------------- */

const PolicyBuilder = Object.assign(PolicyBuilderRoot, {
  Metadata,
  Name,
  Effect: EffectField,
  Description,
  Scope,
  Principal,
  Action,
  Resource,
  Conditions,
  Separator,
  Preview,
});

export default PolicyBuilder;
