import { Alert, ScrollArea } from "@sharpnr/ui";
import { Skeleton } from "@sharpnr/ui";
import { Bell, Lightbulb, Layers, Play } from "lucide-react";

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
    <div className="grid gap-4 px-4 py-4 md:grid-cols-2 md:gap-5 lg:grid-cols-1">
      {/* Placeholder Video Card */}
      <div className="rounded-xl border bg-background overflow-hidden md:col-span-2 lg:col-span-1">
        <div className="relative w-full aspect-video bg-muted flex items-center justify-center cursor-pointer">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <div className="w-12 h-12 rounded-full border-2 border-muted-foreground flex items-center justify-center">
              <Play className="w-5 h-5 ml-0.5" />
            </div>
            <span className="text-xs text-center px-4">
              Watch: How Properties Work
            </span>
          </div>
        </div>
        <div className="p-3 space-y-2">
          <div className="h-3 bg-muted rounded w-3/4" />
          <div className="h-3 bg-muted rounded w-1/2" />
          <div className="h-2 bg-muted rounded-full w-full mt-3" />
        </div>
      </div>

      {/* About */}
      <div className="md:col-span-2 lg:col-span-1">
        <h2 className="text-base font-semibold">What is a Property?</h2>
        <p className="text-sm text-muted-foreground mt-2 leading-6">
          A property is the physical or virtual location where your business
          operations run. It acts as the bridge between your front-of-house
          operations and back-end services — connecting a POS terminal to a
          kitchen, a reception desk to hotel rooms, or a booking system to a
          clinic's appointment calendar.
        </p>
        <p className="text-sm text-muted-foreground mt-2 leading-6">
          Each property operates independently, with its own staff, services,
          schedules, and workflows, while still rolling up into your
          organization's overall structure.
        </p>
      </div>

      {/* Alerts & Reminders */}
      <Section icon={Bell} title="Alerts & Reminders">
        <div className="space-y-4">
          {[{ w: "w-full" }, { w: "w-3/4" }, { w: "w-5/6" }].map(({ w }, i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" />
              <div className="flex flex-col gap-1.5 flex-1">
                <Skeleton className={`h-3 ${w}`} />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
          <p className="text-xs text-muted-foreground text-center pt-1">
            Operational alerts and upcoming reminders for this property will
            appear here.
          </p>
        </div>
      </Section>

      {/* Connected Services */}
      <Section icon={Layers} title="Connected Services">
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-lg border p-3"
            >
              <Skeleton className="w-8 h-8 rounded-lg shrink-0" />
              <div className="flex flex-col gap-1.5 flex-1">
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-2.5 w-1/3" />
              </div>
              <Skeleton className="h-5 w-14 rounded-full shrink-0" />
            </div>
          ))}
          <p className="text-xs text-muted-foreground text-center pt-1">
            Services linked to this property — such as POS, kitchen, or booking
            systems — will be listed here.
          </p>
        </div>
      </Section>

      {/* Suggestions */}
      <Section icon={Lightbulb} title="Suggestions">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
              {i < 2 && <div className="border-t mt-1" />}
            </div>
          ))}
          <p className="text-xs text-muted-foreground text-center pt-1">
            Recommended actions and optimizations for this property.
          </p>
        </div>
      </Section>

      <Alert className="md:col-span-2 lg:col-span-1">
        <p className="text-sm leading-6">
          <strong>Good to know:</strong> A single legal entity can run multiple
          properties — a restaurant chain with five outlets, a clinic with
          multiple branches, or a hotel group across cities. Each property
          manages its own operations independently.
        </p>
      </Alert>
    </div>
  );
}

// ─── Panel ─────────────────────────────────────────────────────────────────────
export function PropoertyIndexSidePanel() {
  return (
    <>
      {/* ── Mobile + Tablet: inline below main content (< lg) ── */}
      <div className="border-t lg:hidden">
        <div className="px-4 py-3 text-sm font-medium text-muted-foreground">
          About Properties
        </div>
        <Content />
      </div>

      {/* ── Desktop: own independent scroll column (lg+) ── */}
      <aside className="hidden w-3/12 shrink-0 border-l lg:flex lg:flex-col">
        <ScrollArea className="h-[calc(100vh-5.5rem)]">
          <Content />
        </ScrollArea>
      </aside>
    </>
  );
}
