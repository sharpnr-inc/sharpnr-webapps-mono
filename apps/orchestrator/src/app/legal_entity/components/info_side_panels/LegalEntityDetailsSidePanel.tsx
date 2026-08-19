import { ScrollArea, Skeleton, useIsMobile } from "@sharpnr/ui";
import {
  Bell,
  Clock,
  Newspaper,
  Zap,
  FileCheck,
  Building2,
  Play,
  ChevronDown,
} from "lucide-react";
import React from "react";

// ─── Section wrapper ───────────────────────────────────────────────────────────
function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-background p-4">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      {children}
    </div>
  );
}

// ─── Content ───────────────────────────────────────────────────────────────────
function Content() {
  return (
    <div className="space-y-6 px-4 py-4">
      {/* Video */}
      <div className="rounded-xl border bg-background overflow-hidden">
        <div className="relative w-full aspect-video bg-muted flex items-center justify-center cursor-pointer">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <div className="w-12 h-12 rounded-full border-2 border-muted-foreground flex items-center justify-center">
              <Play className="w-5 h-5 ml-0.5" />
            </div>
            <span className="text-xs text-center px-4">
              Watch: Managing Legal Entities
            </span>
          </div>
        </div>
        <div className="p-3 space-y-2">
          <div className="h-3 bg-muted rounded w-3/4" />
          <div className="h-3 bg-muted rounded w-1/2" />
          <div className="h-2 bg-muted rounded-full w-full mt-3" />
        </div>
      </div>

      {/* Quick Actions */}
      <Section icon={Zap} title="Quick Actions">
        <div className="grid grid-cols-2 gap-2">
          {[
            "Edit Details",
            "Upload Document",
            "Add Contact",
            "File Return",
            "Generate Report",
            "View Audit Log",
          ].map((action) => (
            <button
              key={action}
              className="rounded-lg border bg-background px-3 py-2 text-left text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {action}
            </button>
          ))}
        </div>
      </Section>

      {/* Compliance Health */}
      <Section icon={FileCheck} title="Compliance Health">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Overall Score</span>
              <Skeleton className="h-3 w-8" />
            </div>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <Skeleton className="h-full w-3/4 rounded-full" />
            </div>
          </div>
          <div className="space-y-2.5">
            {[
              { label: "GST Filing", w: "w-1/3" },
              { label: "Annual Return", w: "w-1/2" },
              { label: "Director KYC", w: "w-2/5" },
              { label: "Income Tax", w: "w-1/4" },
            ].map(({ label, w }) => (
              <div
                key={label}
                className="flex items-center justify-between gap-4"
              >
                <span className="text-xs text-muted-foreground shrink-0">
                  {label}
                </span>
                <Skeleton className={`h-3 ${w}`} />
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center pt-1">
            Compliance status updates as filings are recorded.
          </p>
        </div>
      </Section>

      {/* Reminders */}
      <Section icon={Bell} title="Reminders">
        <div className="space-y-4">
          {[{ w: "w-full" }, { w: "w-2/3" }, { w: "w-5/6" }].map(({ w }, i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" />
              <div className="flex flex-col gap-1.5 flex-1">
                <Skeleton className={`h-3 ${w}`} />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
          <p className="text-xs text-muted-foreground text-center pt-1">
            Compliance deadlines and filing reminders will appear here.
          </p>
        </div>
      </Section>

      {/* Linked Properties */}
      <Section icon={Building2} title="Linked Properties">
        <div className="space-y-3">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-lg border p-2.5"
            >
              <Skeleton className="w-7 h-7 rounded-lg shrink-0" />
              <div className="flex flex-col gap-1.5 flex-1">
                <Skeleton className="h-3 w-2/5" />
                <Skeleton className="h-2.5 w-1/3" />
              </div>
              <Skeleton className="h-4 w-12 rounded-full shrink-0" />
            </div>
          ))}
          <p className="text-xs text-muted-foreground text-center pt-1">
            Business properties operating under this legal entity.
          </p>
        </div>
      </Section>

      {/* Recent Activity */}
      <Section icon={Clock} title="Recent Activity">
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="w-6 h-6 rounded-full shrink-0" />
              <div className="flex flex-col gap-1.5 flex-1">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-2.5 w-1/3" />
              </div>
            </div>
          ))}
          <p className="text-xs text-muted-foreground text-center pt-1">
            Changes made to this entity will be logged here.
          </p>
        </div>
      </Section>

      {/* Industry News */}
      <Section icon={Newspaper} title="Industry News">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
              <Skeleton className="h-2.5 w-1/4" />
              {i < 2 && <div className="border-t mt-1" />}
            </div>
          ))}
          <p className="text-xs text-muted-foreground text-center pt-1">
            Regulatory updates relevant to this entity's industry.
          </p>
        </div>
      </Section>
    </div>
  );
}

// ─── Collapsible mobile wrapper ────────────────────────────────────────────────
function MobileSidePanel() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="border-t w-full">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <span>Activity & Updates</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && <Content />}
    </div>
  );
}

// ─── Panel ─────────────────────────────────────────────────────────────────────
export function LegalEntityDetailsSidePanel() {
  const isMobile = useIsMobile();

  // isMobile is undefined on first render — render nothing until resolved
  if (isMobile === undefined) return null;

  // ── Mobile: collapsible section below main content ────────────────
  if (isMobile) {
    return <MobileSidePanel />;
  }

  // ── Desktop: own independent scroll column ────────────────
  return (
    <aside className="hidden lg:flex lg:flex-col w-3/12 shrink-0 border-l lg:h-[calc(100vh-6rem)]">
      <ScrollArea className="h-full">
        <Content />
      </ScrollArea>
    </aside>
  );
}
