import { Badge, Card, CardContent, CardHeader, Separator } from "@sharpnr/ui";
import { Hammer } from "lucide-react";

export interface FeaturePlaceholderProps {
  /** The nav icon for this screen, so the page reads as the same destination. */
  icon: React.ElementType;
  title: string;
  /** One or two sentences on what the screen is for. */
  description: string;
  /** What this screen will do once built. */
  capabilities: string[];
}

/**
 * The stand-in every unbuilt Folio screen renders.
 *
 * It exists so the unbuilt screens share one layout rather than a pile of
 * near-identical copies: each page supplies only its own copy, and a
 * change to how "not built yet" looks happens in one place.
 */
export function FeaturePlaceholder({
  icon: Icon,
  title,
  description,
  capabilities,
}: FeaturePlaceholderProps) {
  return (
    // min-h-full rather than h-full: the card centres in the empty space, but
    // if it ever outgrows the viewport the container grows and scrolls instead
    // of clipping the top of the card.
    <div className="flex min-h-full w-full items-center justify-center">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="flex aspect-square size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Icon className="size-5" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-semibold tracking-tight">
                  {title}
                </h1>
                <Badge variant="secondary">Coming soon</Badge>
              </div>

              <p className="mt-1.5 text-sm text-muted-foreground">
                {description}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Separator className="mb-5" />

          <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Planned capabilities
          </h2>

          <ul className="mt-3 grid gap-2">
            {capabilities.map((capability) => (
              <li key={capability} className="flex items-start gap-2.5 text-sm">
                <span
                  aria-hidden
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/60"
                />
                <span>{capability}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center gap-2.5 rounded-lg border border-dashed px-4 py-3 text-sm text-muted-foreground">
            <Hammer className="size-4 shrink-0" />
            <span>
              This screen is in active development and is not available yet.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default FeaturePlaceholder;
