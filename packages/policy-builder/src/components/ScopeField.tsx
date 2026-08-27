import {
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sharpnr/ui";

/**
 * One `principal` / `action` / `resource` row: an operator picker plus the
 * entity type and id inputs the chosen operator actually needs.
 */
export function ScopeField({
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
