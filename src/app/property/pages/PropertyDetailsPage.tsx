import {
  usePropertyBusinessOpModules,
  usePropertyDetails,
  usePropertyInfraModules,
} from "../api/queries";
import {
  ArrowLeft,
  ArrowUpRight,
  BedDouble,
  Bell,
  Boxes,
  Building2,
  ChefHat,
  ClipboardList,
  ConciergeBell,
  FlaskConical,
  Hash,
  HeartPulse,
  Hospital,
  Hotel,
  MapPin,
  Microscope,
  Music,
  Navigation,
  Package,
  Palmtree,
  Pill,
  Plus,
  Receipt,
  ScanLine,
  Scissors,
  Server,
  Settings,
  Shield,
  Soup,
  SprayCan,
  Stethoscope,
  Store,
  UtensilsCrossed,
  Video,
  Wine,
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
import { Route } from "@/routes/_appuser/property/$propertyId/details";

/* ── icon maps ───────────────────────────────────────── */
/** Icon per business operation module type (hospitality + healthcare). */
const BUSINESS_ICONS: Record<string, React.ElementType> = {
  RESTAURANT: UtensilsCrossed,
  HOTEL: Hotel,
  BAR: Wine,
  NIGHT_CLUB: Music,
  RESORT: Palmtree,
  "CLOUD_KITCHEN/TAKEAWAYS": Soup,
  HOSPITAL: Hospital,
  CLINIC: Stethoscope,
  PHARMACY: Pill,
  DIAGNOSTICS: Microscope,
  TELEMEDICINE: Video,
  HOME_CARE: HeartPulse,
};

/** Icon per infra module type (general + hospitality + healthcare). */
const INFRA_ICONS: Record<string, React.ElementType> = {
  "Front Desk / Reception": Bell,
  "Billing Counter": Receipt,
  "Security Desk": Shield,
  KITCHEN: ChefHat,
  BAR_COUNTER: Wine,
  DINING_HALL: UtensilsCrossed,
  INVENTORY_STORE: Package,
  RECEPTION_FRONT_DESK: ConciergeBell,
  HOUSEKEEPING: SprayCan,
  WARD_INPATIENT_UNIT: BedDouble,
  OPERATION_THEATRE: Scissors,
  LABORATORY: FlaskConical,
  PHARMACY_COUNTER: Pill,
  RECEPTION_REGISTRATION: ClipboardList,
  RADIOLOGY_IMAGING: ScanLine,
};

/** Turn a backend enum (`CLOUD_KITCHEN/TAKEAWAYS`) into a readable label. */
const formatType = (value: string) =>
  value
    .toLowerCase()
    .replace(/[_/]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();

/* ── module tile ─────────────────────────────────────── */
interface ModuleItem {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  status?: string;
  /** Module-type label, shown as a distinguishing badge on the card. */
  badge?: string;
  moduleType?: string;
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
  const nav = useNavigate();
  const handleNav = (m: ModuleItem) => {
    if (m?.moduleType === "RESTAURANT") {
      nav({
        to: "/property/$propertyId/business_op_modules/hospitality/restaurant/$restaurantID",
        params: {
          propertyId: "",
          restaurantID: m.id,
        },
      });
    }
  };

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
            <div className="flex min-w-0 items-center gap-2">
              <CardTitle className="truncate text-base">
                {module.title}
              </CardTitle>
              {module.badge && (
                <Badge
                  variant="outline"
                  className="shrink-0 text-[10px] font-medium uppercase tracking-wide"
                >
                  {module.badge}
                </Badge>
              )}
            </div>
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
  isLoading,
  isError,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  accent: "business" | "infra";
  modules: ModuleItem[];
  addLabel: string;
  onAdd?: () => void;
  isLoading?: boolean;
  isError?: boolean;
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
        {onAdd && (
          <Button
            variant="outline"
            size="sm"
            onClick={onAdd}
            className="shrink-0 gap-1.5"
          >
            <Plus className="h-3.5 w-3.5" />
            {addLabel}
          </Button>
        )}
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading modules…</p>
      ) : isError ? (
        <p className="text-sm text-destructive">Failed to load modules.</p>
      ) : modules.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No modules yet. Use “{addLabel}” to get started.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {modules.map((m) => (
            <ModuleCard key={m.id} module={m} accent={accent} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────── */

interface PropertyDetailsPageProps {
  propertyId: string;
}

export function PropertyDetailsPage({ propertyId }: PropertyDetailsPageProps) {
  // Api Hooks
  const { data } = usePropertyDetails(propertyId);
  const property = data?.data;

  // Query Hooks For Fetching properties's business modules
  const {
    data: propertyBusinessOpModules,
    isLoading: isPropertyBusinessOpModulesLoading,
    isError: isErr,
  } = usePropertyBusinessOpModules(propertyId);

  // Query Hooks For Fetching properties's Infra modules
  const {
    data: propertyInfraModules,
    isLoading: isPropertyInfraModulesLoading,
    isError: isErrOnInfra,
  } = usePropertyInfraModules(propertyId);

  const nav = useNavigate();

  const handlePropertySettingPage = () =>
    nav({
      to: "/property/$propertyId/settings",
      params: { propertyId },
    });

  const { openModal, closeModal } = useModal();

  const handleAddBusinessModule = () => {
    openModal({
      content: (
        <BusinessModuleCatalog
          closeModal={closeModal}
          propertyID={propertyId}
        />
      ),
      title: "Business Modules",
      description: "Choose business operation modules",
      size: "xl",
    });
  };
  const handleAddInfra = () => {
    openModal({
      content: <InfraCatalog closeModal={closeModal} propertyID={propertyId} />,
      title: "Infra",
      description: "Choose Infra modules",
      size: "xl",
    });
  };

  const shortLocation = [property?.city, property?.state, property?.country]
    .filter(Boolean)
    .join(", ");

  // Map a business operation module to a card tile, badged by its type.
  const toBusinessItem = (m: {
    id: string;
    name: string;
    module_type: string;
    status: boolean;
    is_configured: boolean;
  }): ModuleItem => ({
    id: m.id,
    icon: BUSINESS_ICONS[m.module_type] ?? Store,
    title: m.name,
    description: m.is_configured
      ? "Configured and ready."
      : "Not configured yet.",
    status: m.status ? "Active" : undefined,
    badge: formatType(m.module_type),
    moduleType: m.module_type,
  });

  // Business operation modules, kept in separate sectors.
  const hospitalityModules: ModuleItem[] = (
    propertyBusinessOpModules?.data?.hospitality_business_operation_modules ??
    []
  ).map(toBusinessItem);

  const healthcareModules: ModuleItem[] = (
    propertyBusinessOpModules?.data?.healthcare_business_operation_modules ?? []
  ).map(toBusinessItem);

  // Flatten general + hospitality + healthcare infra modules into tiles.
  const infraModules: ModuleItem[] = [
    ...(propertyInfraModules?.data?.general_infra_modules ?? []),
    ...(propertyInfraModules?.data?.hospitality_infra_modules ?? []),
    ...(propertyInfraModules?.data?.healthcare_infra_modules ?? []),
  ].map((m) => ({
    id: m.id,
    icon: INFRA_ICONS[m.infra_type] ?? Server,
    title: m.name,
    description: `${formatType(m.infra_type)} infrastructure`,
    status: "status" in m && m.status ? "Active" : undefined,
  }));

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
          {/* Hospitality business modules */}
          <ModuleSection
            icon={ConciergeBell}
            title="Hospitality"
            subtitle="Food, beverage and lodging operations"
            accent="business"
            modules={hospitalityModules}
            addLabel="Add Business Module"
            onAdd={handleAddBusinessModule}
            isLoading={isPropertyBusinessOpModulesLoading}
            isError={isErr}
          />

          <div className="border-t border-dashed" />

          {/* Healthcare business modules */}
          <ModuleSection
            icon={Stethoscope}
            title="Healthcare"
            subtitle="Clinical and patient-care operations"
            accent="business"
            modules={healthcareModules}
            addLabel="Add Business Module"
            isLoading={isPropertyBusinessOpModulesLoading}
            isError={isErr}
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
            isLoading={isPropertyInfraModulesLoading}
            isError={isErrOnInfra}
          />
        </CardContent>
      </Card>
    </div>
  );
}
