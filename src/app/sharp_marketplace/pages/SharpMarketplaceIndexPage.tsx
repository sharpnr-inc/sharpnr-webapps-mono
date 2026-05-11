import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Construction,
  Store,
  Handshake,
  Search,
  FileText,
  Bell,
  ArrowRight,
  Package,
  Cpu,
  Truck,
  Wrench,
} from "lucide-react";

const PREVIEW_FEATURES = [
  {
    icon: Search,
    title: "Discover Services",
    desc: "Browse verified organisations offering services across industries.",
  },
  {
    icon: Handshake,
    title: "Post Requirements",
    desc: "Publish what your org needs and receive proposals from suppliers.",
  },
  {
    icon: FileText,
    title: "RFQ & Proposals",
    desc: "Manage quotes, negotiations, and approvals inside the console.",
  },
  {
    icon: Package,
    title: "List Your Offerings",
    desc: "Showcase your org's services to the Sharp network.",
  },
];

const SAMPLE_CATEGORIES = [
  { icon: Cpu, label: "Technology & IT" },
  { icon: Wrench, label: "Engineering" },
  { icon: Truck, label: "Logistics" },
  { icon: Package, label: "Raw Materials" },
];

export function SharpMarketplaceIndexPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <Store size={20} className="text-amber-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-foreground">
                Sharp Marketplace
              </h1>
              <Badge
                variant="outline"
                className="text-amber-500 border-amber-500/30 bg-amber-500/8 text-[11px] font-semibold tracking-wide gap-1"
              >
                <Construction size={10} />
                Under Development
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">
              B2B service exchange between organisations on the Sharp network
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
            Sharp Marketplace will be available in a future release of Sharp
            Orchestrator.
          </p>
        </div>
        <Badge variant="secondary" className="text-xs shrink-0">
          Q3 2025
        </Badge>
      </div>

      {/* What is it */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">
          What is Sharp Marketplace?
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Sharp Marketplace is a built-in exchange where organisations on the
          Sharp network can discover, offer, and transact services with each
          other — without leaving the console. Think of it as a private B2B
          trade layer: post requirements, receive proposals, and manage vendor
          relationships directly from your orchestrator.
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

      {/* Category Preview */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">
          Service Categories (Preview)
        </h2>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_CATEGORIES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/50 bg-muted/20 text-sm text-muted-foreground opacity-60 cursor-not-allowed select-none"
            >
              <Icon size={13} />
              {label}
            </div>
          ))}
          <div className="flex items-center gap-1 px-3 py-1.5 text-xs text-muted-foreground opacity-40 select-none">
            +91 more <ArrowRight size={11} />
          </div>
        </div>
      </div>
    </div>
  );
}
