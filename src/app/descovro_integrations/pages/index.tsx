import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Construction,
  Bell,
  ShoppingBag,
  PlugZap,
  BarChart3,
  Package,
  RefreshCw,
  Tag,
  Webhook,
} from "lucide-react";

const PREVIEW_FEATURES = [
  {
    icon: PlugZap,
    title: "Connect Your Store",
    desc: "Link your Descovro storefront directly to the orchestrator in a few steps.",
  },
  {
    icon: Package,
    title: "Order Management",
    desc: "View and manage Descovro orders without leaving the console.",
  },
  {
    icon: BarChart3,
    title: "Sales Analytics",
    desc: "Track revenue, conversions, and product performance from your dashboard.",
  },
  {
    icon: RefreshCw,
    title: "Inventory Sync",
    desc: "Keep stock levels in sync between Descovro and your org's operations.",
  },
  {
    icon: Tag,
    title: "Product Catalogue",
    desc: "Browse and manage your Descovro product listings from the orchestrator.",
  },
  {
    icon: Webhook,
    title: "Event Webhooks",
    desc: "Trigger org workflows automatically on Descovro events like new orders or refunds.",
  },
];

export function DescovroIntegrationIndexPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <ShoppingBag size={20} className="text-emerald-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-foreground">
                Descovro
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
              Connect and manage your Descovro store from the orchestrator
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
            Descovro integration will be available in a future release of Sharp
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
          What is Descovro Integration?
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Descovro is a standalone ecommerce platform. This integration brings
          it into the orchestrator — so your org can manage orders, track sales,
          sync inventory, and trigger internal workflows based on storefront
          activity, all from one place.
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
