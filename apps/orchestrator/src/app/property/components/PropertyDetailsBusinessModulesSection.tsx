/*
 * Section 1 of PropertyDetailsPage: "Business Operation Modules".
 * These are the revenue-generating operations running at the property.
 *
 * API: usePropertyBusinessOpModules → fetchBusinessOperationModulesResponseType
 *   • hospitality_business_operation_modules  → "Hospitality" sub-group
 *   • healthcare_business_operation_modules   → "Healthcare" sub-group
 *
 * Takes propertyID, fetches its own data, and navigates to the matching module
 * dashboard by module_type.
 */

import type { ElementType } from "react";
import {
  ArrowUpRight,
  Boxes,
  ConciergeBell,
  HeartPulse,
  Hospital,
  Hotel,
  Microscope,
  Music,
  Palmtree,
  Pill,
  Soup,
  Stethoscope,
  Store,
  UtensilsCrossed,
  Video,
  Wine,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Badge, Card, CardDescription, CardHeader, CardTitle, useModal } from "@sharpnr/ui";
import { usePropertyBusinessOpModules } from "../api/queries";
import type {
  HealthcareBusinessModule,
  HospitalityBusinessModule,
} from "../api/types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@sharpnr/ui";
import BusinessModuleCatalog from "@/business_operation/shared/BusinessModuleCatalog";
import { DetailRow, PropertySection, SubGroup } from "./PropertyModulesLayout";

type BusinessModule = HospitalityBusinessModule | HealthcareBusinessModule;

/** Module types that currently have a dashboard route to navigate into. */
const NAVIGABLE_TYPES = new Set(["RESTAURANT", "HOTEL", "BAR"]);

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
  const navigable = NAVIGABLE_TYPES.has(module.module_type);

  return (
    <HoverCard openDelay={150} closeDelay={80}>
      <HoverCardTrigger asChild>
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
                {module.is_configured
                  ? "Configured and ready."
                  : "Not configured yet."}
              </CardDescription>
            </div>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </CardHeader>
        </Card>
      </HoverCardTrigger>

      <HoverCardContent align="start" className="w-72">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                {module.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatType(module.module_type)}
              </p>
            </div>
          </div>

          <div className="space-y-1.5 border-t pt-2">
            <DetailRow label="Status">
              {module.status ? "Active" : "Inactive"}
            </DetailRow>
            <DetailRow label="Configured">
              {module.is_configured ? "Yes" : "No"}
            </DetailRow>
            <DetailRow label="Module ID">
              <span className="font-mono text-[11px]">
                {module.id.slice(0, 8)}…
              </span>
            </DetailRow>
          </div>

          <p className="border-t pt-2 text-[11px] text-muted-foreground">
            {navigable
              ? "Click the card to open its dashboard."
              : "A dashboard for this module is coming soon."}
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
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
  const total = hospitalityModules.length + healthcareModules.length;

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
    <PropertySection
      icon={Boxes}
      title="Business Operation Modules"
      description="Revenue-generating operations running at this property"
      count={total}
      accent="business"
      addLabel="Add Business Module"
      onAdd={handleAddBusinessModule}
      isLoading={isLoading}
      isError={isError}
      emptyHint="No business modules yet. Use “Add Business Module” to get started."
    >
      <SubGroup
        icon={ConciergeBell}
        title="Hospitality"
        description="Food, beverage and lodging operations"
        count={hospitalityModules.length}
      >
        {hospitalityModules.map((m) => (
          <BusinessModuleCard key={m.id} module={m} onOpen={handleOpen} />
        ))}
      </SubGroup>

      <SubGroup
        icon={Stethoscope}
        title="Healthcare"
        description="Clinical and patient-care operations"
        count={healthcareModules.length}
      >
        {healthcareModules.map((m) => (
          <BusinessModuleCard key={m.id} module={m} onOpen={handleOpen} />
        ))}
      </SubGroup>
    </PropertySection>
  );
};

export default PropertyDetailsBusinessModulesSection;
