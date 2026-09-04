import { Badge, Card, CardContent } from "@sharpnr/ui";
import {
  MessageSquare,
  Video,
  Hash,
  Users,
  AtSign,
  PhoneCall,
  CheckCircle2,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { useCablesAccountStatus } from "../api/queries";

const CAPABILITIES = [
  {
    icon: MessageSquare,
    title: "Org Chat",
    desc: "Message individuals or groups within your organisation, all scoped to your org context.",
  },
  {
    icon: Hash,
    title: "Channels",
    desc: "Create topic-based channels for teams, departments, or projects.",
  },
  {
    icon: Video,
    title: "Meetings",
    desc: "Schedule and host video meetings directly inside the orchestrator.",
  },
  {
    icon: PhoneCall,
    title: "Quick Calls",
    desc: "Start an instant voice or video call with any online org member.",
  },
  {
    icon: AtSign,
    title: "Mentions & Threads",
    desc: "Keep conversations focused with threaded replies and direct mentions.",
  },
  {
    icon: Users,
    title: "Org Directory",
    desc: "See who's in your org, their role, and their availability at a glance.",
  },
];

const PRINCIPLES = [
  {
    icon: Building2,
    title: "Scoped to your organisation",
    desc: "Every conversation lives inside your org context — your members, your departments, your projects.",
  },
  {
    icon: ShieldCheck,
    title: "No external tools",
    desc: "Chat, calls, and meetings run in the orchestrator, so communication stays where the work already is.",
  },
];

export function CablesIndexPage() {
  const { data } = useCablesAccountStatus();
  const isActive = data?.data?.isActive ?? false;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <MessageSquare size={20} className="text-blue-500" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-foreground">Cables</h1>
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
            Chat and meetings for everyone in your organisation
          </p>
        </div>
      </div>

      {/* Service Status */}
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-5 py-4 flex items-center gap-4">
        <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">
            Cables Service is Active
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            The service is running for your organisation. Every member can be
            reached from here.
          </p>
        </div>
      </div>

      {/* What is it */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">
          What is Cables?
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Cables is the built-in communication layer for your organisation.
          Every message, call, and meeting happens inside the orchestrator —
          tied to your org context, your members, and your projects. No external
          tools, no switching tabs.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {PRINCIPLES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-lg border border-border/50 bg-muted/30 p-4 flex gap-3 items-start"
            >
              <Icon size={16} className="text-blue-500 shrink-0 mt-0.5" />
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
          What Cables Gives Your Org
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
