import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Json =
  | string
  | number
  | boolean
  | null
  | Json[]
  | { [key: string]: Json };

interface JsonViewProps {
  data: unknown;
  /** Depth that stays expanded on first render. */
  defaultExpandedDepth?: number;
}

/** A syntax-highlighted, collapsible JSON tree. */
export function JsonView({ data, defaultExpandedDepth = 3 }: JsonViewProps) {
  return (
    <div className="overflow-x-auto rounded-md border bg-muted/40 p-3 font-mono text-xs leading-relaxed">
      <JsonNode
        value={data as Json}
        depth={0}
        defaultExpandedDepth={defaultExpandedDepth}
        isLast
      />
    </div>
  );
}

function Primitive({ value }: { value: string | number | boolean | null }) {
  if (value === null)
    return <span className="text-muted-foreground italic">null</span>;
  switch (typeof value) {
    case "string":
      return (
        <span className="text-emerald-600 dark:text-emerald-400 break-all">
          "{value}"
        </span>
      );
    case "number":
      return <span className="text-amber-600 dark:text-amber-400">{value}</span>;
    case "boolean":
      return (
        <span className="text-violet-600 dark:text-violet-400">
          {String(value)}
        </span>
      );
    default:
      return null;
  }
}

interface JsonNodeProps {
  value: Json;
  depth: number;
  defaultExpandedDepth: number;
  /** Object key this node is rendered under, if any. */
  nodeKey?: string;
  /** Whether this is the last entry in its parent (controls trailing comma). */
  isLast: boolean;
}

function JsonNode({
  value,
  depth,
  defaultExpandedDepth,
  nodeKey,
  isLast,
}: JsonNodeProps) {
  const isObject = value !== null && typeof value === "object";
  const [open, setOpen] = useState(depth < defaultExpandedDepth);

  const keyLabel = nodeKey !== undefined && (
    <span className="text-sky-600 dark:text-sky-400">"{nodeKey}"</span>
  );
  const comma = !isLast && <span className="text-muted-foreground">,</span>;

  // Leaf value
  if (!isObject) {
    return (
      <div className="whitespace-pre">
        {keyLabel}
        {keyLabel && <span className="text-muted-foreground">: </span>}
        <Primitive value={value as string | number | boolean | null} />
        {comma}
      </div>
    );
  }

  const isArray = Array.isArray(value);
  const entries: [string, Json][] = isArray
    ? (value as Json[]).map((v, i) => [String(i), v])
    : Object.entries(value as { [k: string]: Json });

  const open_b = isArray ? "[" : "{";
  const close_b = isArray ? "]" : "}";

  // Empty container
  if (entries.length === 0) {
    return (
      <div className="whitespace-pre">
        {keyLabel}
        {keyLabel && <span className="text-muted-foreground">: </span>}
        <span className="text-muted-foreground">
          {open_b}
          {close_b}
        </span>
        {comma}
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group inline-flex items-center gap-0.5 hover:bg-muted rounded -ml-3.5 pl-3.5"
      >
        <ChevronRight
          className={cn(
            "h-3 w-3 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-90",
          )}
        />
        {keyLabel}
        {keyLabel && <span className="text-muted-foreground">: </span>}
        <span className="text-muted-foreground">{open_b}</span>
        {!open && (
          <span className="text-muted-foreground">
            {" "}
            {entries.length} {entries.length === 1 ? "item" : "items"}{" "}
            {close_b}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="border-l border-border/60 pl-4 ml-1.5">
            {entries.map(([k, v], i) => (
              <JsonNode
                key={k}
                value={v}
                depth={depth + 1}
                defaultExpandedDepth={defaultExpandedDepth}
                nodeKey={isArray ? undefined : k}
                isLast={i === entries.length - 1}
              />
            ))}
          </div>
          <div className="whitespace-pre">
            <span className="text-muted-foreground">{close_b}</span>
            {comma}
          </div>
        </>
      )}
    </div>
  );
}
