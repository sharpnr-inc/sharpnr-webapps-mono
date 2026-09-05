import { Badge, Card, CardContent } from "@sharpnr/ui";
import {
  Contact,
  Building2,
  GitBranch,
  ListChecks,
  Inbox,
  BarChart3,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { useSharpCrmAccountStatus } from "../api/queries";

const CAPABILITIES = [
  {
    icon: Contact,
    title: "Customer Records",
    desc: "One record per customer, shared by every team that touches them — no more parallel spreadsheets.",
  },
  {
    icon: Building2,
    title: "Accounts",
    desc: "Group contacts under the company they belong to, and see the whole relationship in one place.",
  },
  {
    icon: GitBranch,
    title: "Pipelines",
    desc: "Track opportunities through the stages your organisation actually uses.",
  },
  {
    icon: ListChecks,
    title: "Activity Tracking",
    desc: "Calls, notes, and follow-ups logged against the customer they belong to.",
  },
  {
    icon: Inbox,
    title: "Shared Inbox",
    desc: "Customer conversations land where the rest of the team can see and pick them up.",
  },
  {
    icon: BarChart3,
    title: "Reporting",
    desc: "See what's moving, what's stalled, and where your pipeline is concentrated.",
  },
];

const PRINCIPLES = [
  {
    icon: Building2,
    title: "Scoped to your organisation",
    desc: "Every customer record lives inside your org context — your members, your accounts, your pipelines.",
  },
  {
    icon: ShieldCheck,
    title: "One source of truth",
    desc: "Customers, billing, and business ops read the same record, so the org never has to reconcile two versions of a customer.",
  },
];

function CRMServiceIndexPage() {
  const { data } = useSharpCrmAccountStatus();
  const isActive = data?.data?.isActive ?? false;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20">
          <Contact size={20} className="text-violet-500" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-foreground">SharpCRM</h1>
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
            Customers, accounts, and pipelines for your organisation
          </p>
        </div>
      </div>

      {/* Service Status */}
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-5 py-4 flex items-center gap-4">
        <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">
            SharpCRM Service is Active
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            The service is running for your organisation. Your customer records
            live here.
          </p>
        </div>
      </div>

      {/* What is it */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">
          What is SharpCRM?
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          SharpCRM is the built-in customer layer for your organisation. Every
          contact, account, and deal lives inside the orchestrator — tied to the
          same customer records your billing and business ops already read. No
          external tools, no exports to keep in sync.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {PRINCIPLES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-lg border border-border/50 bg-muted/30 p-4 flex gap-3 items-start"
            >
              <Icon size={16} className="text-violet-500 shrink-0 mt-0.5" />
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
          What SharpCRM Gives Your Org
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

export default CRMServiceIndexPage;
