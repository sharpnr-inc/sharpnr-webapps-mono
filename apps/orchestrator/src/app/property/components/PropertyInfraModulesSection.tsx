/*
 * Section 2 of PropertyDetailsPage: "Infrastructure".
 * Supporting systems (stations, desks, units) that power the business modules.
 *
 * API: usePropertyInfraModules → fetchInfraModulesResponse
 *   • general_infra_modules      → "General" sub-group
 *   • hospitality_infra_modules  → "Hospitality" sub-group
 *   • healthcare_infra_modules   → "Healthcare" sub-group
 *
 * Takes propertyID, fetches its own data, and navigates to the matching infra
 * dashboard by infra_type.
 */

import type { ElementType } from "react";
import {
  ArrowUpRight,
  BedDouble,
  Bell,
  Building2,
  ChefHat,
  ClipboardList,
  ConciergeBell,
  FlaskConical,
  Package,
  Pill,
  Receipt,
  ScanLine,
  Scissors,
  Server,
  Shield,
  SprayCan,
  Stethoscope,
  UtensilsCrossed,
  Wine,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import {
  Badge,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@sharpnr/ui";
import { usePropertyInfraModules } from "../api/queries";
import type {
  GeneralInfraModule,
  HealthcareInfraModule,
  HospitalityInfraModule,
} from "../api/types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useModal } from "@/hooks/useModal";
import InfraCatalog from "@/business_operation/shared/InfraCatalog";
import { DetailRow, PropertySection, SubGroup } from "./PropertyModulesLayout";

/** Infra types that currently have a dashboard route to navigate into. */
const NAVIGABLE_TYPES = new Set(["KITCHEN"]);

type InfraModule =
  | GeneralInfraModule
  | HospitalityInfraModule
  | HealthcareInfraModule;

/** Icon per infra module type (general + hospitality + healthcare). */
const INFRA_ICONS: Record<string, ElementType> = {
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

/** Turn a backend enum (`WARD_INPATIENT_UNIT`) into a readable label. */
const formatType = (value: string) =>
  value
    .toLowerCase()
    .replace(/[_/]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();

/* ── single infra tile ───────────────────────────────── */
function InfraModuleCard({
  module,
  onOpen,
}: {
  module: InfraModule;
  onOpen: (module: InfraModule) => void;
}) {
  const Icon = INFRA_ICONS[module.infra_type] ?? Server;
  const hasStatus = "status" in module;
  const isActive = hasStatus && module.status;
  const navigable = NAVIGABLE_TYPES.has(module.infra_type);

  return (
    <HoverCard openDelay={150} closeDelay={80}>
      <HoverCardTrigger asChild>
        <Card
          onClick={() => onOpen(module)}
          className="group relative cursor-pointer overflow-hidden border-border/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
        >
          <CardHeader className="flex-row items-start gap-3 space-y-0">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-muted text-muted-foreground transition-transform group-hover:scale-105">
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
                    {formatType(module.infra_type)}
                  </Badge>
                </div>
                {isActive && (
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
                {formatType(module.infra_type)} infrastructure
              </CardDescription>
            </div>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </CardHeader>
        </Card>
      </HoverCardTrigger>

      <HoverCardContent align="start" className="w-72">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground">
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                {module.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatType(module.infra_type)}
              </p>
            </div>
          </div>

          <div className="space-y-1.5 border-t pt-2">
            {hasStatus && (
              <DetailRow label="Status">
                {isActive ? "Active" : "Inactive"}
              </DetailRow>
            )}
            <DetailRow label="Type">{formatType(module.infra_type)}</DetailRow>
            <DetailRow label="Infra ID">
              <span className="font-mono text-[11px]">
                {module.id.slice(0, 8)}…
              </span>
            </DetailRow>
          </div>

          <p className="border-t pt-2 text-[11px] text-muted-foreground">
            {navigable
              ? "Click the card to open its dashboard."
              : "A dashboard for this infrastructure is coming soon."}
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

/* ─────────────────────────────────────────────────────── */
interface PropertyInfraModulesSectionProps {
  propertyID: string;
}

const PropertyInfraModulesSection = ({
  propertyID,
}: PropertyInfraModulesSectionProps) => {
  const nav = useNavigate();
  const { openModal, closeModal } = useModal();
  const { data, isLoading, isError } = usePropertyInfraModules(propertyID);

  const generalModules = data?.data?.general_infra_modules ?? [];
  const hospitalityModules = data?.data?.hospitality_infra_modules ?? [];
  const healthcareModules = data?.data?.healthcare_infra_modules ?? [];
  const total =
    generalModules.length + hospitalityModules.length + healthcareModules.length;

  // Open the matching infra dashboard, keyed off the infra type.
  const handleOpen = (module: InfraModule) => {
    switch (module.infra_type) {
      case "KITCHEN":
        nav({
          to: "/property/$propertyId/infras/hospitality/kitchen/$kitchenID",
          params: { propertyId: propertyID, kitchenID: module.id },
        });
        break;
      default:
        break;
    }
  };

  const handleAddInfra = () => {
    openModal({
      content: <InfraCatalog closeModal={closeModal} propertyID={propertyID} />,
      title: "Infra",
      description: "Choose Infra modules",
      size: "xl",
    });
  };

  return (
    <PropertySection
      icon={Server}
      title="Infrastructure"
      description="Supporting systems that power your business modules"
      count={total}
      accent="infra"
      addLabel="Add Infrastructure"
      onAdd={handleAddInfra}
      isLoading={isLoading}
      isError={isError}
      emptyHint="No infrastructure yet. Use “Add Infrastructure” to get started."
    >
      <SubGroup
        icon={Building2}
        title="General"
        description="Core infrastructure every property needs"
        count={generalModules.length}
      >
        {generalModules.map((m) => (
          <InfraModuleCard key={m.id} module={m} onOpen={handleOpen} />
        ))}
      </SubGroup>

      <SubGroup
        icon={UtensilsCrossed}
        title="Hospitality"
        description="Operational stations for food & beverage service"
        count={hospitalityModules.length}
      >
        {hospitalityModules.map((m) => (
          <InfraModuleCard key={m.id} module={m} onOpen={handleOpen} />
        ))}
      </SubGroup>

      <SubGroup
        icon={Stethoscope}
        title="Healthcare"
        description="Clinical and patient-care infrastructure"
        count={healthcareModules.length}
      >
        {healthcareModules.map((m) => (
          <InfraModuleCard key={m.id} module={m} onOpen={handleOpen} />
        ))}
      </SubGroup>
    </PropertySection>
  );
};

export default PropertyInfraModulesSection;
