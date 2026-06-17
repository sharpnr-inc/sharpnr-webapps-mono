import { Card, CardContent, CardHeader, CardTitle } from "@sharpnr/ui";
import { ACTIVITY } from "./orgData";

export function ActivityPanel() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Recent activity</CardTitle>
      </CardHeader>
      <CardContent className="pt-1">
        <ol className="relative space-y-4 border-l border-border pl-4">
          {ACTIVITY.map((event) => (
            <li key={event.id} className="relative">
              <span className="absolute -left-5.25 top-1 h-2 w-2 rounded-full border-2 border-background bg-foreground" />
              <p className="text-sm leading-snug">{event.description}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {event.timestamp} · {event.actor}
              </p>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
