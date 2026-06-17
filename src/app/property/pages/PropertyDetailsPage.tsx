import { usePropertyDetails } from "../api/queries";
import {
  ArrowLeft,
  ArrowUpRight,
  Boxes,
  Building2,
  ChefHat,
  Hash,
  MapPin,
  Navigation,
  Plus,
  Server,
  Settings,
  Store,
  UtensilsCrossed,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@sharpnr/ui";
import { useModal } from "@/hooks/useModal";
import BusinessModuleCatalog from "@/business_operation/shared/BusinessModuleCatalog";
import InfraCatalog from "@/business_operation/shared/InfraCatalog";

/* ── module tile ─────────────────────────────────────── */
interface ModuleItem {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  status?: string;
}

function ModuleCard({
  module,
  accent,
}: {
  module: ModuleItem;
  accent: "business" | "infra";
}) {
  const Icon = module.icon;
  const iconTone =
    accent === "business"
      ? "border-primary/20 bg-primary/10 text-primary"
      : "border-border bg-muted text-muted-foreground";

  return (
    <Card className="group relative overflow-hidden border-border/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
      <CardHeader className="flex-row items-start gap-3 space-y-0">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${iconTone} transition-transform group-hover:scale-105`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="truncate text-base">{module.title}</CardTitle>
            {module.status && (
              <Badge
                variant="secondary"
                className="shrink-0 gap-1 text-[10px] font-medium"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {module.status}
              </Badge>
            )}
          </div>
          <CardDescription className="line-clamp-2">
            {module.description}
          </CardDescription>
        </div>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </CardHeader>
    </Card>
  );
}

/* ── module section ──────────────────────────────────── */
function ModuleSection({
  icon: Icon,
  title,
  subtitle,
  accent,
  modules,
  addLabel,
  onAdd,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  accent: "business" | "infra";
  modules: ModuleItem[];
  addLabel: string;
  onAdd: () => void;
}) {
  const headerTone =
    accent === "business"
      ? "border-primary/20 bg-primary/10 text-primary"
      : "border-border bg-muted text-muted-foreground";

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${headerTone}`}
        >
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            {title}
          </h2>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <Badge variant="outline" className="ml-auto font-mono text-[10px]">
          {modules.length}
        </Badge>
        <Button
          variant="outline"
          size="sm"
          onClick={onAdd}
          className="shrink-0 gap-1.5"
        >
          <Plus className="h-3.5 w-3.5" />
          {addLabel}
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {modules.map((m) => (
          <ModuleCard key={m.id} module={m} accent={accent} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────── */

interface PropertyDetailsPageProps {
  propertyId: string;
}

export function PropertyDetailsPage({ propertyId }: PropertyDetailsPageProps) {
  const { data } = usePropertyDetails(propertyId);
  const property = data?.data;
  const nav = useNavigate();

  const handlePropertySettingPage = () =>
    nav({
      to: "/property/$propertyId/settings",
      params: { propertyId },
    });

  const { openModal, closeModal } = useModal();

  const handleAddBusinessModule = () => {
    openModal({
      content: <BusinessModuleCatalog closeModal={closeModal} />,
      title: "Business Modules",
      description: "Choose business operation modules",
      size: "xl",
    });
  };
  const handleAddInfra = () => {
    openModal({
      content: <InfraCatalog closeModal={closeModal} />,
      title: "Infra",
      description: "Choose Infra modules",
      size: "xl",
    });
  };

  const shortLocation = [property?.city, property?.state, property?.country]
    .filter(Boolean)
    .join(", ");

  // TODO: replace placeholder modules with data from the property modules API.
  const businessModules: ModuleItem[] = [
    {
      id: "restaurant",
      icon: UtensilsCrossed,
      title: "Shyam Sunder Restaurant",
      description:
        "Dine-in restaurant with menus, tables and order management.",
      status: "Active",
    },
    {
      id: "restaurant",
      icon: UtensilsCrossed,
      title: "Shyam Sunder Restaurant",
      description:
        "Dine-in restaurant with menus, tables and order management.",
      status: "Active",
    },
    {
      id: "restaurant",
      icon: UtensilsCrossed,
      title: "Shyam Sunder Restaurant",
      description:
        "Dine-in restaurant with menus, tables and order management.",
      status: "Active",
    },
  ];

  const infraModules: ModuleItem[] = [
    {
      id: "kitchen",
      icon: ChefHat,
      title: "Kitchen",
      description: "Kitchen display system used for preparing food orders.",
      status: "Active",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
      {/* ── Back nav ───────────────────────────────── */}
      <button
        onClick={() => nav({ to: "/property" })}
        className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All Properties
      </button>

      {/* ── Hero + overview ────────────────────────── */}
      <div className="rounded-xl border bg-card shadow-sm">
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-muted">
              <Building2 className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="min-w-0 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="truncate text-xl font-bold tracking-tight text-foreground">
                  {property?.name ?? "—"}
                </h1>
                {property?.code && (
                  <Badge variant="secondary" className="font-mono">
                    {property.code}
                  </Badge>
                )}
              </div>
              {/* compact inline metadata */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                {shortLocation && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    {shortLocation}
                  </span>
                )}
                {property?.address_line && (
                  <span className="flex items-center gap-1.5">
                    <Navigation className="h-3.5 w-3.5 shrink-0" />
                    {property.address_line}
                  </span>
                )}
                {property?.code && (
                  <span className="flex items-center gap-1.5">
                    <Hash className="h-3.5 w-3.5 shrink-0" />
                    {property.code}
                  </span>
                )}
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={handlePropertySettingPage}
            className="w-full shrink-0 gap-2 sm:w-auto"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>
      {/* ── Modules ────────────────────────────────── */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <CardTitle className="text-base">Modules</CardTitle>
              <CardDescription>
                Business operations running at this property and the
                infrastructure that powers them.
              </CardDescription>
            </div>
            <Boxes className="h-5 w-5 shrink-0 text-muted-foreground" />
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Business modules — the operations themselves */}
          <ModuleSection
            icon={Store}
            title="Business Modules"
            subtitle="Revenue-generating operations"
            accent="business"
            modules={businessModules}
            addLabel="Add Business Module"
            onAdd={handleAddBusinessModule}
          />

          <div className="border-t border-dashed" />

          {/* Infra modules — the supporting backbone */}
          <ModuleSection
            icon={Server}
            title="Infrastructure"
            subtitle="Supporting systems for your business modules"
            accent="infra"
            modules={infraModules}
            addLabel="Add Infrastructure"
            onAdd={handleAddInfra}
          />
        </CardContent>
      </Card>
    </div>
  );
}
