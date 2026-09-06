import { Badge, Card, CardContent } from "@sharpnr/ui";
import {
  BookOpenText,
  FileText,
  Sheet,
  Presentation,
  Shapes,
  FileType2,
  LayoutTemplate,
  History,
  CheckCircle2,
  Building2,
} from "lucide-react";
import { useFolioAccountStatus } from "../api/queries";

const CAPABILITIES = [
  {
    icon: FileText,
    title: "Docs",
    desc: "Rich text editing with real-time collaboration, comments, and version history.",
  },
  {
    icon: Sheet,
    title: "Sheets",
    desc: "Spreadsheets with formulas, pivot tables, and data that stays in sync.",
  },
  {
    icon: Presentation,
    title: "Slides",
    desc: "Presentations with transitions and a built-in asset library your org shares.",
  },
  {
    icon: Shapes,
    title: "Whiteboards",
    desc: "An infinite canvas for brainstorming, diagrams, wireframes, and flowcharts.",
  },
  {
    icon: FileType2,
    title: "PDFs",
    desc: "Annotate, fill, sign, and edit PDFs without leaving the orchestrator.",
  },
  {
    icon: LayoutTemplate,
    title: "Templates",
    desc: "Start from your organisation's own formats instead of a blank page each time.",
  },
];

const PRINCIPLES = [
  {
    icon: Building2,
    title: "Scoped to your organisation",
    desc: "Every document lives inside your org context — your members, your departments, your projects.",
  },
  {
    icon: History,
    title: "Nothing is lost",
    desc: "Version history is kept as people edit, so a document can be walked back to any earlier state.",
  },
];

function FolioIndexPage() {
  const { data } = useFolioAccountStatus();
  const isActive = data?.data?.isActive ?? false;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20">
          <BookOpenText size={20} className="text-rose-500" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-foreground">Folio</h1>
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
            Docs, sheets, slides, and whiteboards for your organisation
          </p>
        </div>
      </div>

      {/* Service Status */}
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-5 py-4 flex items-center gap-4">
        <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">
            Folio Service is Active
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            The service is running for your organisation. Every member can
            create and share documents from here.
          </p>
        </div>
      </div>

      {/* What is it */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">
          What is Folio?
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Folio is the built-in document suite for your organisation. Docs,
          sheets, slides, whiteboards, and PDFs all live inside the orchestrator
          — beside the work they describe, on your org's own access model. No
          external tools, no exports to keep in sync.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {PRINCIPLES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-lg border border-border/50 bg-muted/30 p-4 flex gap-3 items-start"
            >
              <Icon size={16} className="text-rose-500 shrink-0 mt-0.5" />
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
          What Folio Gives Your Org
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

export default FolioIndexPage;
