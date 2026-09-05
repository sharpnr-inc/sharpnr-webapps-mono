import { Badge, Card, CardContent } from "@sharpnr/ui";
import {
  Brain,
  ShieldCheck,
  KeyRound,
  Lock,
  Bot,
  Laptop,
  ScrollText,
  ClipboardCheck,
  CheckCircle2,
  Building2,
} from "lucide-react";
import { useCortexAccountStatus } from "../api/queries";

const CAPABILITIES = [
  {
    icon: ShieldCheck,
    title: "Roles & Permissions",
    desc: "Permissions are granted to roles, not to people one at a time. A role defined here holds across every Sharpnr app.",
  },
  {
    icon: ScrollText,
    title: "Policies",
    desc: "Your security posture expressed centrally — who may hold which roles, and what access needs review.",
  },
  {
    icon: KeyRound,
    title: "API Keys",
    desc: "Credentials for programmatic access, issued and revoked centrally so IT always knows what keys exist.",
  },
  {
    icon: Lock,
    title: "Secrets",
    desc: "One governed place for sensitive values, instead of secrets scattered across apps, scripts, and config files.",
  },
  {
    icon: Bot,
    title: "Service Accounts",
    desc: "Identities for machine-to-machine access — the integrations that act without a human behind them.",
  },
  {
    icon: Laptop,
    title: "Devices & Assets",
    desc: "The hardware your organisation issues — enrolled, configured, and tied to the person responsible for it.",
  },
];

const PRINCIPLES = [
  {
    icon: Building2,
    title: "One control plane",
    desc: "Access is governed centrally in Cortex and enforced by each service, so there is no separate permission system per app to keep in sync.",
  },
  {
    icon: ClipboardCheck,
    title: "Asked for, not assumed",
    desc: "Sensitive access queues for sign-off, and every grant leaves an audit trail your reviewers and auditors can read.",
  },
];

function CotrexServiceIndexPage() {
  const { data } = useCortexAccountStatus();
  const isActive = data?.data?.isActive ?? false;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <Brain size={20} className="text-amber-500" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-foreground">Cortex</h1>
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
            IT controls and access management for your organisation
          </p>
        </div>
      </div>

      {/* Service Status */}
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-5 py-4 flex items-center gap-4">
        <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">
            Cortex Service is Active
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            The service is running for your organisation. Roles, credentials,
            and access reviews are governed from here.
          </p>
        </div>
      </div>

      {/* What is it */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">
          What is Cortex?
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Cortex is the IT control plane for your organisation. Roles,
          policies, credentials, and the devices your people work on are
          defined once here and enforced everywhere else — so access is a
          decision your administrators make deliberately, not something that
          accumulates app by app.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {PRINCIPLES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-lg border border-border/50 bg-muted/30 p-4 flex gap-3 items-start"
            >
              <Icon size={16} className="text-amber-500 shrink-0 mt-0.5" />
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
          What Cortex Gives Your Org
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

export default CotrexServiceIndexPage;
