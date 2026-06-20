/*
 * Lists a property's business operation modules (hospitality + healthcare).
 * Used in ./pages/PropertyDetailsPage.tsx — takes the propertyID and fetches
 * its own data. Cards navigate to the matching module dashboard by module_type.
 */

import type { ElementType } from "react";
import {
  ArrowUpRight,
  ConciergeBell,
  HeartPulse,
  Hospital,
  Hotel,
  Microscope,
  Music,
  Palmtree,
  Pill,
  Plus,
  Soup,
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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@sharpnr/ui";
import { usePropertyBusinessOpModules } from "../api/queries";
import type {
  HealthcareBusinessModule,
  HospitalityBusinessModule,
} from "../api/types";
import { useModal } from "@/hooks/useModal";
import BusinessModuleCatalog from "@/business_operation/shared/BusinessModuleCatalog";

type BusinessModule = HospitalityBusinessModule | HealthcareBusinessModule;

/** Icon per business operation module type (hospitality + healthcare). */
const BUSINESS_ICONS: Record<string, ElementType> = {
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

/** Turn a backend enum (`CLOUD_KITCHEN/TAKEAWAYS`) into a readable label. */
const formatType = (value: string) =>
  value
    .toLowerCase()
    .replace(/[_/]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();

/* ── single module tile ──────────────────────────────── */
function BusinessModuleCard({
  module,
  onOpen,
}: {
  module: BusinessModule;
  onOpen: (module: BusinessModule) => void;
}) {
  const Icon = BUSINESS_ICONS[module.module_type] ?? Store;

  return (
    <Card
      onClick={() => onOpen(module)}
      className="group relative cursor-pointer overflow-hidden border-border/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
    >
      <CardHeader className="flex-row items-start gap-3 space-y-0">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-transform group-hover:scale-105">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <CardTitle className="truncate text-base">
                {module.name}
              </CardTitle>
              <Badge
                variant="outline"
                className="shrink-0 text-[10px] font-medium uppercase tracking-wide"
              >
                {formatType(module.module_type)}
              </Badge>
            </div>
            {module.status && (
              <Badge
                variant="secondary"
                className="shrink-0 gap-1 text-[10px] font-medium"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Active
              </Badge>
            )}
          </div>
          <CardDescription className="line-clamp-2">
            {module.is_configured ? "Configured and ready." : "Not configured yet."}
          </CardDescription>
        </div>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </CardHeader>
    </Card>
  );
}

/* ── grouped section (hospitality / healthcare) ──────── */
function ModuleGroup({
  icon: Icon,
  title,
  subtitle,
  modules,
  onOpen,
  addLabel,
  onAdd,
  isLoading,
  isError,
}: {
  icon: ElementType;
  title: string;
  subtitle: string;
  modules: BusinessModule[];
  onOpen: (module: BusinessModule) => void;
  addLabel: string;
  onAdd?: () => void;
  isLoading?: boolean;
  isError?: boolean;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
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
            <BusinessModuleCard key={m.id} module={m} onOpen={onOpen} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────── */
interface PropertyDetailsBusinessModulesSectionProps {
  propertyID: string;
}

const PropertyDetailsBusinessModulesSection = ({
  propertyID,
}: PropertyDetailsBusinessModulesSectionProps) => {
  const nav = useNavigate();
  const { openModal, closeModal } = useModal();
  const { data, isLoading, isError } = usePropertyBusinessOpModules(propertyID);

  const hospitalityModules =
    data?.data?.hospitality_business_operation_modules ?? [];
  const healthcareModules =
    data?.data?.healthcare_business_operation_modules ?? [];

  // Open the matching module dashboard, keyed off the module type.
  const handleOpen = (module: BusinessModule) => {
    switch (module.module_type) {
      case "RESTAURANT":
        nav({
          to: "/property/$propertyId/business_op_modules/hospitality/restaurant/$restaurantID",
          params: { propertyId: propertyID, restaurantID: module.id },
        });
        break;
      case "HOTEL":
        nav({
          to: "/property/$propertyId/business_op_modules/hospitality/hotel/$hotelID",
          params: { propertyId: propertyID, hotelID: module.id },
        });
        break;
      case "BAR":
        nav({
          to: "/property/$propertyId/business_op_modules/hospitality/bar/$barID",
          params: { propertyId: propertyID, barID: module.id },
        });
        break;
      default:
        break;
    }
  };

  const handleAddBusinessModule = () => {
    openModal({
      content: (
        <BusinessModuleCatalog closeModal={closeModal} propertyID={propertyID} />
      ),
      title: "Business Modules",
      description: "Choose business operation modules",
      size: "xl",
    });
  };

  return (
    <div className="space-y-8">
      <ModuleGroup
        icon={ConciergeBell}
        title="Hospitality"
        subtitle="Food, beverage and lodging operations"
        modules={hospitalityModules}
        onOpen={handleOpen}
        addLabel="Add Business Module"
        onAdd={handleAddBusinessModule}
        isLoading={isLoading}
        isError={isError}
      />

      {/* Healthcare only appears once there are healthcare modules. */}
      {healthcareModules.length > 0 && (
        <>
          <div className="border-t border-dashed" />

          <ModuleGroup
            icon={Stethoscope}
            title="Healthcare"
            subtitle="Clinical and patient-care operations"
            modules={healthcareModules}
            onOpen={handleOpen}
            addLabel="Add Business Module"
          />
        </>
      )}
    </div>
  );
};

export default PropertyDetailsBusinessModulesSection;
