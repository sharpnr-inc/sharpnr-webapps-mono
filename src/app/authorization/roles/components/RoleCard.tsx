import { Card, CardContent, Button } from "@sharpnr/ui";
import { ShieldUser, Users, KeyRound, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OrgRole } from "../api/types";

interface RoleCardProps {
  role: OrgRole;
  /** Number of people assigned this role, when known. */
  memberCount?: number;
}

/** Roles that come built-in with every organization. */
const DEFAULT_ROLE_SLUGS = ["owner", "admin"];

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

export function RoleCard({ role, memberCount }: RoleCardProps) {
  const isDefault = DEFAULT_ROLE_SLUGS.includes(role.slug);

  return (
    <Card className="flex flex-col transition-colors hover:border-primary/40 hover:shadow-sm">
      <CardContent className="flex flex-1 flex-col gap-3 p-4">
        {/* Title */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <ShieldUser className="h-4.5 w-4.5" />
          </div>
          <span className="font-semibold text-foreground">{role.name}</span>
        </div>

        {/* Description */}
        <p className="flex-1 text-sm text-muted-foreground">
          {role.description}
        </p>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          {memberCount !== undefined && (
            <StatChip icon={Users}>
              {memberCount} {memberCount === 1 ? "person" : "people"}
            </StatChip>
          )}
          <StatChip icon={KeyRound}>
            <span
              className={cn(
                "font-medium",
                isDefault ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {isDefault ? "Default" : "Custom"}
            </span>
          </StatChip>
        </div>
      </CardContent>

      {/* Action */}
      <div className="border-t p-3">
        <Button variant="outline" className="w-full justify-between">
          Manage role
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
