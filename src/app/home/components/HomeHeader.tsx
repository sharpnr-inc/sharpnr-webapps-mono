import { format } from "date-fns";
import { CalendarDays } from "lucide-react";

export function HomeHeader() {
  const now = new Date();

  return (
    <header className="space-y-1">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <CalendarDays className="h-4 w-4" />
        <time dateTime={now.toISOString()}>{format(now, "EEEE, d MMMM yyyy")}</time>
      </div>
      <h1 className="text-2xl font-semibold tracking-tight">
        {format(now, "HH") < "12"
          ? "Good morning"
          : format(now, "HH") < "18"
            ? "Good afternoon"
            : "Good evening"}
      </h1>
      <p className="text-sm text-muted-foreground">
        Here's what's happening across your organization today.
      </p>
    </header>
  );
}
