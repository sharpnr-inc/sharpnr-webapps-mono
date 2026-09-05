import { Badge, Card, CardContent } from "@sharpnr/ui";
import {
  HardDrive,
  Boxes,
  Database,
  Warehouse,
  FolderOpen,
  Library,
  History,
  CheckCircle2,
  Construction,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { useSiloAccountStatus } from "../api/queries";

const CAPABILITIES = [
  {
    icon: Boxes,
    title: "Buckets",
    desc: "S3-compatible object storage for files, media, and backups — the raw storage layer everything else is built on.",
  },
  {
    icon: Database,
    title: "Managed Databases",
    desc: "Provisioned Postgres for your applications, without standing up and patching servers of your own.",
  },
  {
    icon: Warehouse,
    title: "Warehouses",
    desc: "Modelled, query-ready data for analytics and reporting, fed from the lake rather than from production.",
  },
  {
    icon: FolderOpen,
    title: "Org Drive",
    desc: "The human side of storage: folders, previews, and sharing for your people — on the same storage as everything else.",
  },
  {
    icon: Library,
    title: "Datasets",
    desc: "The catalogue of what data exists, what shape it is in, and who owns it — so data is findable rather than folklore.",
  },
  {
    icon: History,
    title: "Backups & Restores",
    desc: "Copies of your data that exist somewhere else — and, more importantly, restores you have actually tested.",
  },
];

const PRINCIPLES = [
  {
    icon: Building2,
    title: "Scoped to your organisation",
    desc: "Every bucket, database, and folder lives inside your org context — no external drives, no third-party accounts to reconcile.",
  },
  {
    icon: ShieldCheck,
    title: "Governed by Cortex, enforced by Silo",
    desc: "Access is role-based and resource-scoped, defined once in Cortex, so there is no separate permission system per storage service to keep in sync.",
  },
];

export function SiloIndexPage() {
  const { data } = useSiloAccountStatus();
  const isActive = data?.data?.isActive ?? false;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20">
          <HardDrive size={20} className="text-sky-500" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-foreground">Silo</h1>
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
            Storage and data infrastructure for your organisation
          </p>
        </div>
      </div>

      {/* Service Status */}
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-5 py-4 flex items-center gap-4">
        <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">
            Silo Service is Active
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            The service is provisioned for your organisation. Storage and data
            resources are managed from here.
          </p>
        </div>
      </div>

      {/* What is it */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">
          What is Silo?
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Silo is your organisation's storage and data layer — object buckets,
          managed databases, warehouses, and a shared drive, all built into the
          orchestrator. Everything stays inside your org, on one access model
          rather than a separate login per service.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {PRINCIPLES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-lg border border-border/50 bg-muted/30 p-4 flex gap-3 items-start"
            >
              <Icon size={16} className="text-sky-500 shrink-0 mt-0.5" />
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
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
            What Silo Gives Your Org
          </h2>
          {/* The account is real and provisioned; the resources under it are
              still landing, so the page says so rather than implying every
              surface below is already clickable. */}
          <Badge
            variant="outline"
            className="text-amber-500 border-amber-500/30 bg-amber-500/8 text-[10px] font-semibold tracking-wide gap-1"
          >
            <Construction size={9} />
            Rolling out
          </Badge>
        </div>
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
