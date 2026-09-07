import { Badge, Card, CardContent } from "@sharpnr/ui";
import {
  Users,
  UserPlus,
  CalendarCheck,
  Wallet,
  Briefcase,
  FileBadge,
  CheckCircle2,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { useHrmsAccountStatus } from "../api/queries";

const CAPABILITIES = [
  {
    icon: Users,
    title: "Employee Records",
    desc: "One record per person, shared with the rest of the orchestrator rather than kept in an HR silo of its own.",
  },
  {
    icon: UserPlus,
    title: "Onboarding & Offboarding",
    desc: "Bring someone in — or out — with their access, cost centre, and paperwork handled in one flow.",
  },
  {
    icon: CalendarCheck,
    title: "Attendance & Leave",
    desc: "Shifts, attendance, and leave balances tracked against the cost centre the person actually works in.",
  },
  {
    icon: Wallet,
    title: "Payroll Inputs",
    desc: "The attendance, leave, and pay data your payroll run needs, prepared where the records already live.",
  },
  {
    icon: Briefcase,
    title: "Recruitment",
    desc: "Openings, candidates, and offers that become an employee record without being re-keyed.",
  },
  {
    icon: FileBadge,
    title: "Documents & Compliance",
    desc: "Contracts, identity documents, and the retention rules employment law puts on them.",
  },
];

const PRINCIPLES = [
  {
    icon: Building2,
    title: "One employee record",
    desc: "HR, cost centres, and access control all read the same person — so the org never reconciles two versions of an employee.",
  },
  {
    icon: ShieldCheck,
    title: "Scoped access by design",
    desc: "HR data is cost-centre scoped and governed by Sentinel policy, so central and local HR see exactly what their role allows.",
  },
];

function HrServiceIndexPage() {
  const { data } = useHrmsAccountStatus();
  const isActive = data?.data?.isActive ?? false;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/20">
          <Users size={20} className="text-teal-500" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-foreground">SharpHR</h1>
            {isActive && (
              <Badge
                variant="outline"
                className="text-emerald-500 border-emerald-500/30 bg-emerald-500/8 text-[11px] font-semibold tracking-wide gap-1"
              >
                <CheckCircle2 size={10} />
                Active
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">
            People, attendance, and payroll for your organisation
          </p>
        </div>
      </div>

      {/* Service Status */}
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-5 py-4 flex items-center gap-4">
        <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">
            SharpHR Service is Active
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            The service is running for your organisation. Your people records
            are managed from here.
          </p>
        </div>
      </div>

      {/* What is it */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">
          What is SharpHR?
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          SharpHR is the people layer for your organisation. Onboarding,
          attendance, leave, and payroll all run against the same employee
          records the rest of the orchestrator uses — so an employee's cost
          centre, access, and pay never drift apart across three systems.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {PRINCIPLES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-lg border border-border/50 bg-muted/30 p-4 flex gap-3 items-start"
            >
              <Icon size={16} className="text-teal-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">{title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Capabilities */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">
          What SharpHR Gives Your Org
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CAPABILITIES.map(({ icon: Icon, title, desc }) => (
            <Card key={title} className="border-border/50 bg-muted/30">
              <CardContent className="p-4 flex gap-3 items-start">
                <div className="p-1.5 rounded-md bg-muted border border-border/50 shrink-0">
                  <Icon size={16} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HrServiceIndexPage;
