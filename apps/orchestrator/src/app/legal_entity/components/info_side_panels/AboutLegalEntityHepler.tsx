import { Alert, ScrollArea, useIsMobile } from "@sharpnr/ui";
import { Play } from "lucide-react";

export function AboutLegalEntityHelper() {
  const isMobile = useIsMobile();

  const content = (
    <div className="space-y-6 p-4 lg:p-0">
      {/* Placeholder Video Card */}
      <div className="rounded-xl border bg-background overflow-hidden">
        <div className="relative w-full aspect-video bg-muted flex items-center justify-center cursor-pointer">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <div className="w-12 h-12 rounded-full border-2 border-muted-foreground flex items-center justify-center">
              <Play className="w-5 h-5 ml-0.5" />
            </div>
            <span className="text-xs text-center px-4">
              Watch: Understanding Legal Entities
            </span>
          </div>
        </div>
        <div className="p-3 space-y-2">
          <div className="h-3 bg-muted rounded w-3/4" />
          <div className="h-3 bg-muted rounded w-1/2" />
          <div className="flex items-center gap-2 mt-3">
            <div className="h-2 bg-muted rounded-full w-full" />
          </div>
        </div>
      </div>

      {/* What is */}
      <div>
        <h2 className="text-base font-semibold">What is a Legal Entity?</h2>
        <p className="text-sm text-muted-foreground mt-2 leading-6">
          A legal entity is a formally recognized organization that can
          independently own assets, enter into contracts, employ people, and
          fulfill tax obligations. It acts as a distinct unit — separate from
          its owners or parent organization — giving your business a defined
          identity under the law.
        </p>
      </div>

      {/* Entity types */}
      <div className="rounded-xl border bg-background p-4">
        <h3 className="font-medium mb-3 text-sm">Common Entity Types</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {[
            "Private Limited Company (Pvt. Ltd.)",
            "Sole Proprietorship",
            "Partnership Firm",
            "Limited Liability Partnership (LLP)",
            "Corporation / Subsidiary",
            "Public Limited Company",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-0.5 shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Why it matters */}
      <div className="rounded-xl border bg-background p-4">
        <h3 className="font-medium mb-3 text-sm">Why does this matter?</h3>
        <ul className="space-y-4 text-sm">
          {[
            {
              label: "Tax & Compliance",
              desc: "Each entity can have its own GST, PAN, and filing obligations, keeping your tax footprint clean.",
            },
            {
              label: "Business Separation",
              desc: "Isolate financial risk and operations across business units, regions, or product lines.",
            },
            {
              label: "Ownership Tracking",
              desc: "Clearly define who owns what across holding structures, subsidiaries, or joint ventures.",
            },
            {
              label: "Multi-Company Payroll",
              desc: "Run payroll, invoicing, and reporting independently per entity without cross-contamination.",
            },
          ].map(({ label, desc }) => (
            <li key={label} className="flex gap-2.5">
              <span className="mt-0.5 shrink-0 text-foreground">✓</span>
              <span className="text-muted-foreground">
                <strong className="font-medium text-foreground">{label}</strong>{" "}
                — {desc}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Alert>
        <p className="text-sm leading-6">
          <strong>Good to know:</strong> Large organizations routinely maintain
          multiple legal entities — one per country, region, or business
          division — to meet local compliance requirements and simplify
          financial reporting.
        </p>
      </Alert>
    </div>
  );

  // ── Mobile: render inline below main content ──────────────
  if (isMobile) {
    return (
      <div className="border-t mt-2">
        <div className="px-4 py-3 text-sm font-medium text-muted-foreground">
          About Legal Entities
        </div>
        {content}
      </div>
    );
  }

  // ── Desktop: sticky scrollable sidebar ────────────────────
  return (
    <aside className="hidden lg:block w-3/12 shrink-0">
      <ScrollArea className="h-[calc(100vh-6rem)]">
        <div className="py-4 pr-4">{content}</div>
      </ScrollArea>
    </aside>
  );
}
