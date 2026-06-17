import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Avatar,
  AvatarFallback,
} from "@sharpnr/ui";
import { UserPlus, Check, X } from "lucide-react";
import { MEMBERS, INTEGRATIONS, roleLabel } from "./orgData";

export function MembersPanel() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Team members</CardTitle>
          <Button size="sm" variant="outline" className="h-8 gap-1.5 text-xs">
            <UserPlus className="h-3.5 w-3.5" />
            Invite
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {MEMBERS.map((m) => (
              <div key={m.id} className="flex items-center gap-3 px-5 py-3">
                <Avatar size="sm">
                  <AvatarFallback className="text-xs">{m.initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{m.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{m.email}</p>
                </div>
                <Badge variant="secondary" className="shrink-0 font-normal">
                  {roleLabel(m.role)}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Integrations</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {INTEGRATIONS.map((integ) => {
            const active = integ.status === "active";
            return (
              <div
                key={integ.id}
                className="flex items-start gap-2 rounded-lg border p-3"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium">{integ.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{integ.scope}</p>
                </div>
                <Badge
                  variant="outline"
                  className="ml-auto shrink-0 gap-1 font-normal text-muted-foreground"
                >
                  {active ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <X className="h-3 w-3" />
                  )}
                  {active ? "Active" : "Inactive"}
                </Badge>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
