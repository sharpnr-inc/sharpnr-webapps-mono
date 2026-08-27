import { Card, CardContent } from "@sharpnr/ui";
import {
  Building2,
  ShieldX,
  ShieldUser,
  Users,
  UsersRound,
} from "lucide-react";

/** Everything an org-wide policy is evaluated against. */
const TARGETS = [
  {
    icon: Users,
    title: "Every user",
    desc: "Each person in the organization, however they sign in.",
  },
  {
    icon: ShieldUser,
    title: "Every role",
    desc: "Owner, Manager, Finance — and any role you add later.",
  },
  {
    icon: UsersRound,
    title: "Every group",
    desc: "All user groups, including ones created after the policy.",
  },
] as const;

/** Explains that policies on this page are organization-wide and who they hit. */
export function PoliciesOverview() {
  return (
    <Card className="border-primary/20 bg-primary/3">
      <CardContent className="space-y-4 p-5">
        <div className="flex gap-2">
          <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div className="space-y-1">
            <h2 className="text-sm font-semibold text-foreground">
              These rules belong to your organization
            </h2>
            <p className="text-sm text-muted-foreground">
              A <span className="font-medium text-foreground">policy</span> is a
              single rule, like <em>"managers can edit the menu"</em>. Each one
              either{" "}
              <span className="font-medium text-emerald-600 dark:text-emerald-400">
                allows
              </span>{" "}
              or{" "}
              <span className="font-medium text-red-600 dark:text-red-400">
                denies
              </span>{" "}
              an action on a resource. Policies are kept at the organization
              level, so the whole set below is evaluated on every request — no
              matter who makes it.
            </p>
          </div>
        </div>

        {/* Who they apply to */}
        <div className="grid gap-2 sm:grid-cols-3">
          {TARGETS.map((target) => (
            <div
              key={target.title}
              className="flex gap-2.5 rounded-md border bg-card p-3"
            >
              <target.icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-foreground">
                  {target.title}
                </p>
                <p className="text-xs text-muted-foreground">{target.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-2.5 rounded-md border border-red-500/20 bg-red-500/5 p-3">
          <ShieldX className="mt-0.5 h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">
              Deny always wins.
            </span>{" "}
            If one policy denies an action, nothing else — no role, group or
            other policy — can allow it back. Switch a policy off to pause it
            without deleting it.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
