import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
} from "@sharpnr/ui";
import { CalendarClock } from "lucide-react";
import { upcomingEvents } from "./feedData";

export function UpcomingEvents() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <CalendarClock className="h-4 w-4 text-muted-foreground" />
          Upcoming
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-md border bg-muted/40">
              <span className="text-sm font-semibold leading-none">{event.day}</span>
              <span className="text-[10px] uppercase text-muted-foreground">
                {event.month}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{event.title}</p>
              <p className="text-xs text-muted-foreground">{event.time}</p>
            </div>
            <Badge variant="outline" className="shrink-0 font-normal">
              {event.type}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
