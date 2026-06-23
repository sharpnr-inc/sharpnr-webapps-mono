import { Card, CardContent } from "@sharpnr/ui";
import { Users, ShieldUser, KeyRound, ArrowRight, Info } from "lucide-react";

const STEPS = [
  {
    icon: Users,
    title: "Your people",
    desc: "Everyone who works in your organization.",
  },
  {
    icon: ShieldUser,
    title: "Their role",
    desc: "The job they do, like Owner or Finance.",
  },
  {
    icon: KeyRound,
    title: "What they can do",
    desc: "Each role unlocks the right tools and screens.",
  },
] as const;

export function RolesOverview() {
  return (
    <Card className="border-primary/20 bg-primary/[0.03]">
      <CardContent className="space-y-4 p-5">
        <div className="flex gap-2">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div className="space-y-1">
            <h2 className="text-sm font-semibold text-foreground">
              What are roles?
            </h2>
            <p className="text-sm text-muted-foreground">
              A role is simply the job someone does in your organization. Instead
              of setting up access for each person one by one, you give them a
              role — like <strong>Owner</strong> or <strong>Finance</strong> —
              and they instantly get everything that job needs. Change someone's
              role later and their access updates on its own.
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
          {STEPS.map((step, i) => (
            <div key={step.title} className="flex flex-1 items-stretch gap-2">
              <div className="flex flex-1 gap-2.5 rounded-md border bg-background p-3">
                <step.icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-foreground">
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{step.desc}</p>
                </div>
              </div>
              {i < STEPS.length - 1 && (
                <div className="hidden items-center sm:flex">
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">
          Tip: give people the role that matches their job, and they'll only see
          the parts of the app they actually need — keeping things simple and
          your information safe.
        </p>
      </CardContent>
    </Card>
  );
}
