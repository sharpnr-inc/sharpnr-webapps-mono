import { useMemo, useState } from "react";
import {
  Button,
  Input,
  Label,
  Textarea,
  Switch,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@sharpnr/ui";
import { ShieldCheck, ShieldX, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  buildPolicyText,
  formatPolicy,
  parsePolicy,
  policyToJsonObject,
  type ScopeOp,
  type ConditionInput,
} from "../../cederbuilder/service";
import { ConditionBuilder } from "./ConditionBuilder";
import { JsonView } from "./JsonView";
import {
  ENTITY_TYPES,
  ACTIONS,
  GROUPS,
  PRINCIPAL_OPS,
  RESOURCE_OPS,
} from "../data/policyOptions";

interface CreatePolicyFormProps {
  onSubmit?: (policy: { name: string; statement: string; enabled: boolean }) => void;
  onCancel?: () => void;
}

const NONE = "__none__";

function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "") || "policy"
  );
}

export function CreatePolicyForm({ onSubmit, onCancel }: CreatePolicyFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [effect, setEffect] = useState<"permit" | "forbid">("permit");

  // Principal
  const [principalOp, setPrincipalOp] = useState<ScopeOp>("All");
  const [principalType, setPrincipalType] = useState<string>(ENTITY_TYPES[0]);
  const [principalGroup, setPrincipalGroup] = useState<string>(GROUPS[0]);
  const [principalEntityType, setPrincipalEntityType] = useState<string>(
    ENTITY_TYPES[0],
  );
  const [principalEntityId, setPrincipalEntityId] = useState("");

  // Action
  const [action, setAction] = useState<string>(NONE);

  // Resource
  const [resourceOp, setResourceOp] = useState<ScopeOp>("All");
  const [resourceType, setResourceType] = useState<string>(ENTITY_TYPES[0]);
  const [resourceEntityType, setResourceEntityType] = useState<string>(
    ENTITY_TYPES[0],
  );
  const [resourceEntityId, setResourceEntityId] = useState("");

  const [conditions, setConditions] = useState<ConditionInput[]>([]);

  const statement = useMemo(() => {
    const id = name ? slugify(name) : undefined;

    return buildPolicyText({
      id,
      effect,
      principal: {
        op: principalOp,
        entityType: principalType,
        entityNamespace: principalOp === "in" ? "Group" : principalEntityType,
        entityId: principalOp === "in" ? principalGroup : principalEntityId,
      },
      action: action === NONE ? undefined : action,
      resource: {
        op: resourceOp,
        entityType: resourceType,
        entityNamespace: resourceEntityType,
        entityId: resourceEntityId,
      },
      conditions,
    });
  }, [
    name,
    effect,
    principalOp,
    principalType,
    principalGroup,
    principalEntityType,
    principalEntityId,
    action,
    resourceOp,
    resourceType,
    resourceEntityType,
    resourceEntityId,
    conditions,
  ]);

  const parsed = useMemo(() => parsePolicy(statement), [statement]);
  const formatted = useMemo(() => formatPolicy(statement), [statement]);
  const json = useMemo(() => policyToJsonObject(statement), [statement]);
  const isValid = parsed !== null;
  const [view, setView] = useState<"cedar" | "json">("cedar");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || !name.trim()) return;
    onSubmit?.({ name: name.trim(), statement: formatted, enabled });
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_minmax(320px,420px)]">
      {/* ── Form fields ─────────────────────────────────────────── */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="policy-name">Name</Label>
              <Input
                id="policy-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Admins full access"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="policy-desc">Description</Label>
              <Textarea
                id="policy-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What does this policy do?"
                rows={2}
              />
            </div>

            <div className="flex items-center justify-between rounded-md border p-3">
              <div className="space-y-0.5">
                <Label htmlFor="policy-enabled">Enabled</Label>
                <p className="text-xs text-muted-foreground">
                  Disabled policies are stored but not evaluated.
                </p>
              </div>
              <Switch
                id="policy-enabled"
                checked={enabled}
                onCheckedChange={setEnabled}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Effect</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1.5">
              <Label>Decision</Label>
              <Select
                value={effect}
                onValueChange={(v) => setEffect(v as "permit" | "forbid")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="permit">Permit (allow)</SelectItem>
                    <SelectItem value="forbid">Forbid (deny)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Scope</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Principal */}
            <div className="space-y-1.5">
              <Label>Principal</Label>
              <Select
                value={principalOp}
                onValueChange={(v) => setPrincipalOp(v as ScopeOp)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {PRINCIPAL_OPS.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {principalOp === "is" && (
                <Select value={principalType} onValueChange={setPrincipalType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Entity type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {ENTITY_TYPES.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}

              {principalOp === "in" && (
                <Select value={principalGroup} onValueChange={setPrincipalGroup}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {GROUPS.map((g) => (
                        <SelectItem key={g} value={g}>
                          {g}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}

              {principalOp === "==" && (
                <div className="flex gap-2">
                  <Select
                    value={principalEntityType}
                    onValueChange={setPrincipalEntityType}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {ENTITY_TYPES.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Input
                    value={principalEntityId}
                    onChange={(e) => setPrincipalEntityId(e.target.value)}
                    placeholder='id, e.g. "alice"'
                  />
                </div>
              )}
            </div>

            {/* Action */}
            <div className="space-y-1.5">
              <Label>Action</Label>
              <Select value={action} onValueChange={setAction}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={NONE}>Any action</SelectItem>
                    {ACTIONS.map((a) => (
                      <SelectItem key={a} value={a}>
                        {a}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Resource */}
            <div className="space-y-1.5">
              <Label>Resource</Label>
              <Select
                value={resourceOp}
                onValueChange={(v) => setResourceOp(v as ScopeOp)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {RESOURCE_OPS.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {resourceOp === "is" && (
                <Select value={resourceType} onValueChange={setResourceType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Entity type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {ENTITY_TYPES.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}

              {resourceOp === "==" && (
                <div className="flex gap-2">
                  <Select
                    value={resourceEntityType}
                    onValueChange={setResourceEntityType}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {ENTITY_TYPES.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Input
                    value={resourceEntityId}
                    onChange={(e) => setResourceEntityId(e.target.value)}
                    placeholder='id, e.g. "doc1"'
                  />
                </div>
              )}
            </div>

          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Conditions</CardTitle>
            <p className="text-sm text-muted-foreground">
              Optional <code className="font-mono">when</code> /{" "}
              <code className="font-mono">unless</code> clauses that further
              restrict when the policy applies.
            </p>
          </CardHeader>
          <CardContent>
            <ConditionBuilder
              conditions={conditions}
              onChange={setConditions}
            />
          </CardContent>
        </Card>
      </div>

      {/* ── Live preview ────────────────────────────────────────── */}
      <div className="space-y-4 lg:sticky lg:top-6 lg:self-start">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Cedar preview</CardTitle>
            {isValid ? (
              <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                <ShieldCheck className="h-3.5 w-3.5" /> Valid
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs text-destructive">
                <ShieldX className="h-3.5 w-3.5" /> Invalid
              </span>
            )}
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="inline-flex rounded-md border p-0.5 text-xs">
              {(["cedar", "json"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  className={cn(
                    "rounded px-2.5 py-1 font-medium transition-colors",
                    view === v
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {v === "cedar" ? "Cedar" : "JSON"}
                </button>
              ))}
            </div>
            {view === "cedar" ? (
              <pre
                className={cn(
                  "overflow-x-auto rounded-md bg-muted p-3 text-xs font-mono text-foreground",
                  !isValid && "ring-1 ring-destructive/40",
                )}
              >
                {formatted}
              </pre>
            ) : json ? (
              <JsonView data={json} />
            ) : (
              <pre className="rounded-md bg-muted p-3 text-xs font-mono text-destructive ring-1 ring-destructive/40">
                // invalid Cedar policy
              </pre>
            )}
            {!isValid && (
              <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-destructive" />
                The current selection produces invalid Cedar — adjust the fields
                above (a custom condition is the usual culprit).
              </p>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={!isValid || !name.trim()}>
            Create policy
          </Button>
        </div>
      </div>
    </form>
  );
}
