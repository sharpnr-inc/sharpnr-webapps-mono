import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Avatar,
  AvatarFallback,
} from "@sharpnr/ui";
import { Activity } from "lucide-react";
import { activityFeed } from "./feedData";

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Activity className="h-4 w-4 text-muted-foreground" />
          Recent activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        {activityFeed.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <Avatar size="sm">
              <AvatarFallback className="text-xs">{item.initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 text-sm">
              <p className="leading-snug">
                <span className="font-medium">{item.actor}</span>{" "}
                <span className="text-muted-foreground">{item.action}</span>{" "}
                <span className="font-medium">{item.target}</span>
              </p>
              <p className="text-xs text-muted-foreground">{item.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
