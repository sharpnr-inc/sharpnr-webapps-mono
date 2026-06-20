/*
 * Lists a property's infra modules (general + hospitality + healthcare).
 * Used in ./pages/PropertyDetailsPage.tsx — takes the propertyID and fetches
 * its own data. Cards navigate to the matching infra dashboard by infra_type.
 */

import type { ElementType } from "react";
import {
  ArrowUpRight,
  BedDouble,
  Bell,
  ChefHat,
  ClipboardList,
  ConciergeBell,
  FlaskConical,
  Package,
  Pill,
  Plus,
  Receipt,
  ScanLine,
  Scissors,
  Server,
  Shield,
  SprayCan,
  UtensilsCrossed,
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
import { usePropertyInfraModules } from "../api/queries";
import type {
  GeneralInfraModule,
  HealthcareInfraModule,
  HospitalityInfraModule,
} from "../api/types";
import { useModal } from "@/hooks/useModal";
import InfraCatalog from "@/business_operation/shared/InfraCatalog";

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
  const isActive = "status" in module && module.status;

  return (
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

  // Flatten general + hospitality + healthcare infra into one list.
  const infraModules: InfraModule[] = [
    ...(data?.data?.general_infra_modules ?? []),
    ...(data?.data?.hospitality_infra_modules ?? []),
    ...(data?.data?.healthcare_infra_modules ?? []),
  ];

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
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground">
          <Server className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            Infrastructure
          </h2>
          <p className="text-xs text-muted-foreground">
            Supporting systems for your business modules
          </p>
        </div>
        <Badge variant="outline" className="ml-auto font-mono text-[10px]">
          {infraModules.length}
        </Badge>
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddInfra}
          className="shrink-0 gap-1.5"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Infrastructure
        </Button>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading modules…</p>
      ) : isError ? (
        <p className="text-sm text-destructive">Failed to load modules.</p>
      ) : infraModules.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No infrastructure yet. Use “Add Infrastructure” to get started.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {infraModules.map((m) => (
            <InfraModuleCard key={m.id} module={m} onOpen={handleOpen} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyInfraModulesSection;
