import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@sharpnr/ui";

interface EmptyStateProps {
  title: string;
  description: string;
  /** What this screen will show once the API is wired up. */
  columns: string[];
}

/**
 * Placeholder for a screen whose backend does not exist yet.
 *
 * Deliberately shows the intended shape rather than fabricated records — a
 * table of invented patients would look finished and mislead anyone reviewing
 * the app.
 */
export function EmptyState({ title, description, columns }: EmptyStateProps) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="text-muted-foreground mt-2 max-w-2xl text-pretty">{description}</p>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-base">Not connected yet</CardTitle>
          <CardDescription>
            This screen is scaffolded. It will list the following once the
            Sharpnr-Engine endpoints are available.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="text-muted-foreground grid gap-2 text-sm sm:grid-cols-2">
            {columns.map((c) => (
              <li key={c} className="flex items-center gap-2">
                <span aria-hidden="true" className="bg-muted-foreground/40 size-1.5 rounded-full" />
                {c}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}
