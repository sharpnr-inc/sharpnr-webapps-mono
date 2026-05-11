import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Construction,
  Bell,
  HardDrive,
  FolderOpen,
  Users,
  History,
  Search,
  Upload,
  Lock,
} from "lucide-react";

const PREVIEW_FEATURES = [
  {
    icon: FolderOpen,
    title: "Org File Storage",
    desc: "Store and organise all your organisation's files in one place, scoped to your org.",
  },
  {
    icon: Users,
    title: "Shared Workspaces",
    desc: "Create shared folders for teams, departments, or projects with role-based access.",
  },
  {
    icon: Upload,
    title: "Upload & Manage",
    desc: "Upload documents, images, and assets — then manage them from the orchestrator.",
  },
  {
    icon: Search,
    title: "Search Across Files",
    desc: "Find any file instantly by name, type, or content across your entire org storage.",
  },
  {
    icon: History,
    title: "Version History",
    desc: "Track changes and restore previous versions of any file at any point.",
  },
  {
    icon: Lock,
    title: "Access Control",
    desc: "Set granular permissions per file or folder — view, edit, or admin.",
  },
];

export function SiloIndexPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20">
            <HardDrive size={20} className="text-violet-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-foreground">Silo</h1>
              <Badge
                variant="outline"
                className="text-amber-500 border-amber-500/30 bg-amber-500/8 text-[11px] font-semibold tracking-wide gap-1"
              >
                <Construction size={10} />
                Under Development
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">
              Secure file storage and sharing for your organisation
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          disabled
          className="gap-1.5 opacity-50 cursor-not-allowed"
        >
          <Bell size={14} />
          Notify Me
        </Button>
      </div>

      {/* Coming Soon Banner */}
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-5 py-4 flex items-center gap-4">
        <Construction size={18} className="text-amber-500 shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">
            This feature is under active development.
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Silo will be available in a future release of Sharp Orchestrator.
          </p>
        </div>
        <Badge variant="secondary" className="text-xs shrink-0">
          Q3 2025
        </Badge>
      </div>

      {/* What is it */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">
          What is Silo?
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Silo is your organisation's private file system — built into the
          orchestrator. Store, share, and collaborate on documents without
          relying on external drives or third-party tools. Everything stays
          inside your org, with access controls that match your team structure.
        </p>
      </div>

      {/* Feature Preview Cards */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">
          What You'll Be Able To Do
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PREVIEW_FEATURES.map(({ icon: Icon, title, desc }) => (
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
