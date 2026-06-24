import { Card, CardContent, Button } from "@sharpnr/ui";
import { UsersRound, Users, ScrollText, Pencil, Plus } from "lucide-react";
import type { UserGroup } from "../data/dummyGroups";

interface GroupCardProps {
  group: UserGroup;
}

function StatChip({
  icon: Icon,
  children,
}: {
  icon: typeof Users;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
      <Icon className="h-3.5 w-3.5" />
      {children}
    </span>
  );
}

export function GroupCard({ group }: GroupCardProps) {
  return (
    <Card className="flex flex-col transition-colors hover:border-primary/40 hover:shadow-sm">
      <CardContent className="flex flex-1 flex-col gap-3 p-4">
        {/* Title */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <UsersRound className="h-4.5 w-4.5" />
          </div>
          <span className="font-semibold text-foreground">{group.name}</span>
        </div>

        {/* Description */}
        <p className="flex-1 text-sm text-muted-foreground">
          {group.description}
        </p>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <StatChip icon={Users}>
            {group.memberCount} {group.memberCount === 1 ? "person" : "people"}
          </StatChip>
          <StatChip icon={ScrollText}>
            {group.policyCount}{" "}
            {group.policyCount === 1 ? "policy" : "policies"}
          </StatChip>
        </div>
      </CardContent>

      {/* Actions */}
      <div className="flex items-center gap-2 border-t p-3">
        <Button variant="outline" size="sm" className="flex-1 gap-1">
          <Pencil className="h-3.5 w-3.5" /> Edit
        </Button>
        <Button size="sm" className="flex-1 gap-1">
          <Plus className="h-3.5 w-3.5" /> Add Policies
        </Button>
      </div>
    </Card>
  );
}
