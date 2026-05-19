import { ScrollArea, Skeleton } from "@sharpnr/ui";
import { Bell, Clock, Newspaper } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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

function Content() {
  return (
    <div className="space-y-6 px-4 py-4">
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

export function LegalEntityDetailsSidePanel() {
  const isMobile = useIsMobile();

  // ── Mobile: inline below main content ────────────────────
  if (isMobile) {
    return (
      <div className="border-t">
        <div className="px-4 py-3 text-sm font-medium text-muted-foreground">
          Activity & Updates
        </div>
        <Content />
      </div>
    );
  }

  // ── Desktop: own independent scroll column ────────────────
  return (
    <aside className="hidden lg:flex lg:flex-col w-3/12 shrink-0 border-l overflow-hidden">
      <ScrollArea className="flex-1">
        <Content />
      </ScrollArea>
    </aside>
  );
}
